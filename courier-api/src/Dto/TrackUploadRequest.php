<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TrackUploadRequest
{
    #[Assert\NotNull]
    #[Assert\Positive]
    public int $trackId;

    #[Assert\NotNull]
    #[Assert\Positive]
    public int $startTime;

    public string $comment = '';

    #[Assert\NotNull]
    #[Assert\PositiveOrZero]
    public int $pointsCount;

    /** @var array<array{0: float, 1: float}> */
    #[Assert\NotNull]
    public array $points = [];
}
