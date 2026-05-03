<?php

namespace App\Controller;

use App\Entity\Card;
use App\Repository\CardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class CardController extends AbstractController
{
    #[Route('/cards', methods: ['GET'])]
    public function index(CardRepository $repository): JsonResponse
    {
        $cards = $repository->findAllGroupedByStatus();

        $grouped = [];
        foreach ($cards as $card) {
            $grouped[$card->getStatus()][] = $this->serializeCard($card);
        }

        return $this->json($grouped);
    }

    #[Route('/cards/{id}/move', methods: ['PATCH'])]
    public function move(
        Card $card,
        Request $request,
        EntityManagerInterface $em,
        CardRepository $repository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['status']) || !isset($data['position'])) {
            return $this->json(['error' => 'status and position are required'], Response::HTTP_BAD_REQUEST);
        }

        $newStatus = $data['status'];
        $newPosition = (int) $data['position'];

        $card->setStatus($newStatus);
        $card->setPosition($newPosition);

        // Reorder other cards in the target column
        $cardsInColumn = $repository->findBy(
            ['status' => $newStatus],
            ['position' => 'ASC']
        );

        $pos = 0;
        foreach ($cardsInColumn as $c) {
            if ($c->getId() === $card->getId()) {
                continue;
            }
            if ($pos === $newPosition) {
                $pos++;
            }
            $c->setPosition($pos);
            $pos++;
        }

        $em->flush();

        return $this->json(['success' => true]);
    }

    private function serializeCard(Card $card): array
    {
        return [
            'id' => $card->getId(),
            'title' => $card->getTitle(),
            'status' => $card->getStatus(),
            'label' => $card->getLabel(),
            'labelColor' => $card->getLabelColor(),
            'cardKey' => $card->getCardKey(),
            'points' => $card->getPoints(),
            'position' => $card->getPosition(),
            'avatarInitials' => $card->getAvatarInitials(),
            'avatarColor' => $card->getAvatarColor(),
        ];
    }
}
