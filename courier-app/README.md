# Courier App

Android-приложение для курьеров с записью треков, картой и выгрузкой маршрутов на бекенд.

## API выгрузки треков

Настройки подключения находятся в файле:
`app/src/main/java/com/courier/app/ApiConfig.kt`

### POST /api/tracks/start

Отправляется при начале записи трека.

```json
{
  "event": "track_started",
  "latitude": 59.9426,
  "longitude": 30.3183,
  "timestamp": 1715760000000
}
```

### POST /api/tracks/upload

Отправляется при выгрузке записанного трека.

```json
{
  "trackId": 1,
  "startTime": 1715760000000,
  "comment": "Доставка на Невский",
  "pointsCount": 5,
  "points": [
    [59.9426, 30.3183],
    [59.9430, 30.3190],
    [59.9435, 30.3200],
    [59.9440, 30.3210],
    [59.9445, 30.3220]
  ]
}
```

Каждая точка в массиве `points` — это `[latitude, longitude]`.

---

## Symfony Mapping Request Data

### DTO классы

```php
// src/Dto/TrackStartRequest.php

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
```

```php
// src/Dto/GeoPoint.php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class GeoPoint
{
    #[Assert\NotNull]
    #[Assert\Range(min: -90, max: 90)]
    public float $latitude;

    #[Assert\NotNull]
    #[Assert\Range(min: -180, max: 180)]
    public float $longitude;
}
```

```php
// src/Dto/TrackUploadRequest.php

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

    #[Assert\NotBlank(allowNull: true)]
    public string $comment = '';

    #[Assert\NotNull]
    #[Assert\PositiveOrZero]
    public int $pointsCount;

    /** @var array<array{0: float, 1: float}> */
    #[Assert\NotNull]
    #[Assert\Count(min: 1)]
    public array $points = [];
}
```

### Контроллер

```php
// src/Controller/TrackController.php

namespace App\Controller;

use App\Dto\TrackStartRequest;
use App\Dto\TrackUploadRequest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/tracks')]
class TrackController extends AbstractController
{
    #[Route('/start', methods: ['POST'])]
    public function start(
        #[MapRequestPayload] TrackStartRequest $request
    ): JsonResponse {
        // $request->event     — "track_started"
        // $request->latitude  — 59.9426
        // $request->longitude — 30.3183
        // $request->timestamp — 1715760000000

        return $this->json([
            'status' => 'ok',
            'message' => 'Track started',
        ]);
    }

    #[Route('/upload', methods: ['POST'])]
    public function upload(
        #[MapRequestPayload] TrackUploadRequest $request
    ): JsonResponse {
        // $request->trackId     — 1
        // $request->startTime   — 1715760000000
        // $request->comment     — "Доставка на Невский"
        // $request->pointsCount — 5
        // $request->points      — [[59.9426, 30.3183], ...]

        return $this->json([
            'status' => 'ok',
            'trackId' => $request->trackId,
            'pointsReceived' => count($request->points),
        ]);
    }
}
```

`#[MapRequestPayload]` автоматически десериализует JSON тело запроса в DTO и валидирует через Symfony Validator (требуется `symfony/serializer` и `symfony/validator`).
