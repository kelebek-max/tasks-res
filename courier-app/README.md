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
