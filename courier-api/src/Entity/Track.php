<?php

namespace App\Entity;

use App\Repository\TrackRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TrackRepository::class)]
#[ORM\Table(name: 'tracks')]
class Track
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private int $trackId;

    #[ORM\Column(type: Types::BIGINT)]
    private string $startTime;

    #[ORM\Column(type: Types::TEXT)]
    private string $comment = '';

    #[ORM\Column]
    private int $pointsCount = 0;

    #[ORM\Column(type: Types::JSON)]
    private array $points = [];

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private \DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTrackId(): int
    {
        return $this->trackId;
    }

    public function setTrackId(int $trackId): static
    {
        $this->trackId = $trackId;
        return $this;
    }

    public function getStartTime(): string
    {
        return $this->startTime;
    }

    public function setStartTime(string $startTime): static
    {
        $this->startTime = $startTime;
        return $this;
    }

    public function getComment(): string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;
        return $this;
    }

    public function getPointsCount(): int
    {
        return $this->pointsCount;
    }

    public function setPointsCount(int $pointsCount): static
    {
        $this->pointsCount = $pointsCount;
        return $this;
    }

    public function getPoints(): array
    {
        return $this->points;
    }

    public function setPoints(array $points): static
    {
        $this->points = $points;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}
