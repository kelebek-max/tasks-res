<?php

namespace App\Controller;

use App\Dto\TrackStartRequest;
use App\Dto\TrackUploadRequest;
use App\Entity\Track;
use App\Entity\TrackEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/tracks')]
class TrackController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $em,
    ) {
    }

    #[Route('/start', methods: ['POST'])]
    public function start(
        #[MapRequestPayload] TrackStartRequest $request,
    ): JsonResponse {
        $event = new TrackEvent();
        $event->setEvent($request->event);
        $event->setLatitude($request->latitude);
        $event->setLongitude($request->longitude);
        $event->setTimestamp((string) $request->timestamp);

        $this->em->persist($event);
        $this->em->flush();

        return $this->json([
            'status' => 'ok',
            'message' => 'Track started',
            'eventId' => $event->getId(),
        ]);
    }

    #[Route('/upload', methods: ['POST'])]
    public function upload(
        #[MapRequestPayload] TrackUploadRequest $request,
    ): JsonResponse {
        $track = new Track();
        $track->setTrackId($request->trackId);
        $track->setStartTime((string) $request->startTime);
        $track->setComment($request->comment);
        $track->setPointsCount($request->pointsCount);
        $track->setPoints($request->points);

        $this->em->persist($track);
        $this->em->flush();

        return $this->json([
            'status' => 'ok',
            'trackId' => $request->trackId,
            'pointsReceived' => count($request->points),
            'id' => $track->getId(),
        ]);
    }

    #[Route('', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $tracks = $this->em->getRepository(Track::class)->findBy([], ['id' => 'DESC']);

        $result = array_map(fn(Track $t) => [
            'id' => $t->getId(),
            'trackId' => $t->getTrackId(),
            'startTime' => $t->getStartTime(),
            'comment' => $t->getComment(),
            'pointsCount' => $t->getPointsCount(),
            'createdAt' => $t->getCreatedAt()->format('Y-m-d H:i:s'),
        ], $tracks);

        return $this->json($result);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $track = $this->em->getRepository(Track::class)->find($id);

        if (!$track) {
            return $this->json(['error' => 'Track not found'], 404);
        }

        return $this->json([
            'id' => $track->getId(),
            'trackId' => $track->getTrackId(),
            'startTime' => $track->getStartTime(),
            'comment' => $track->getComment(),
            'pointsCount' => $track->getPointsCount(),
            'points' => $track->getPoints(),
            'createdAt' => $track->getCreatedAt()->format('Y-m-d H:i:s'),
        ]);
    }
}
