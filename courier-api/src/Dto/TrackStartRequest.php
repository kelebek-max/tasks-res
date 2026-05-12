<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TrackStartRequest
{
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['track_started'])]
    public string $event;

    #[Assert\NotNull]
    #[Assert\Range(min: -90, max: 90)]
    public float $latitude;

    #[Assert\NotNull]
    #[Assert\Range(min: -180, max: 180)]
    public float $longitude;

    #[Assert\NotNull]
    #[Assert\Positive]
    public int $timestamp;
}
