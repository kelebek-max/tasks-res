<?php

namespace App\Entity;

use App\Repository\CardRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CardRepository::class)]
class Card
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title;

    #[ORM\Column(length: 50)]
    private string $status;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $label = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $labelColor = null;

    #[ORM\Column(length: 20)]
    private string $cardKey;

    #[ORM\Column(nullable: true)]
    private ?int $points = null;

    #[ORM\Column]
    private int $position;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $avatarInitials = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $avatarColor = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;
        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;
        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): static
    {
        $this->label = $label;
        return $this;
    }

    public function getLabelColor(): ?string
    {
        return $this->labelColor;
    }

    public function setLabelColor(?string $labelColor): static
    {
        $this->labelColor = $labelColor;
        return $this;
    }

    public function getCardKey(): string
    {
        return $this->cardKey;
    }

    public function setCardKey(string $cardKey): static
    {
        $this->cardKey = $cardKey;
        return $this;
    }

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(?int $points): static
    {
        $this->points = $points;
        return $this;
    }

    public function getPosition(): int
    {
        return $this->position;
    }

    public function setPosition(int $position): static
    {
        $this->position = $position;
        return $this;
    }

    public function getAvatarInitials(): ?string
    {
        return $this->avatarInitials;
    }

    public function setAvatarInitials(?string $avatarInitials): static
    {
        $this->avatarInitials = $avatarInitials;
        return $this;
    }

    public function getAvatarColor(): ?string
    {
        return $this->avatarColor;
    }

    public function setAvatarColor(?string $avatarColor): static
    {
        $this->avatarColor = $avatarColor;
        return $this;
    }
}
