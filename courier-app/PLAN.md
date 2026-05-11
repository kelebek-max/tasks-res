# План доработки проекта Courier App

## Текущее состояние

Проект успешно собирается (BUILD SUCCESSFUL), но содержит несколько незавершенных компонентов.

## Незавершенные функции

### 1. Сохранение треков в базу данных
**Файлы:** [`TrackDatabase`](app/src/main/java/com/courier/app/data/database/TrackDatabase.kt:1), [`TrackDao`](app/src/main/java/com/courier/app/data/dao/TrackDao.kt:1)

**Проблема:** База данных и DAO объявлены, но не используются. Треки хранятся только в памяти ([`MainActivity.completedTracks`](app/src/main/java/com/courier/app/MainActivity.kt:23)), что приведет к потере данных при перезапуске приложения.

**Решение:** Интегрировать Room database для сохранения завершенных треков.

---

### 2. Привязка UI элементов
**Файлы:** [`TracksFragment`](app/src/main/java/com/courier/app/ui/tracks/TracksFragment.kt:1), [`fragment_tracks.xml`](app/src/main/res/layout/fragment_tracks.xml:42)

**Проблема:** В коде используется `binding.tracksListContainer`, но в layout файле id указан как `tracks_list_container` (snake_case). Это может вызвать проблемы привязки из-за несоответствия соглашений об именовании.

**Решение:** Привести имена id к единому стилю (camelCase).

---

### 3. Сохранение комментариев
**Файлы:** [`MapFragment.showCommentBottomSheet()`](app/src/main/java/com/courier/app/ui/map/MapFragment.kt:183), [`fragment_comment_sheet.xml`](app/src/main/res/layout/fragment_comment_sheet.xml:59)

**Проблема:** Кнопка "Сохранить" ([`btn_save_comment`](app/src/main/res/layout/fragment_comment_sheet.xml:59)) не реализует логику сохранения комментария. Комментарий просто закрывает bottom sheet без сохранения.

**Решение:** Реализовать сохранение комментариев (в базу данных или как часть трека).

---

### 4. ProfileFragment
**Файлы:** [`ProfileFragment`](app/src/main/java/com/courier/app/ui/profile/ProfileFragment.kt:1), [`fragment_profile.xml`](app/src/main/res/layout/fragment_profile.xml:1)

**Проблема:** Пустой фрагмент без какой-либо логики или привязки к данным пользователя. UI существует, но не функционирует.

**Решение:** Добавить логику отображения статистики курьера (количество доставок, рейтинг и т.д.).

---

### 5. Использование устаревших API
**Файлы:** 
- [`MainActivity.kt:59`](app/src/main/java/com/courier/app/MainActivity.kt:59) - `getParcelableArrayList()`
- [`MapFragment.kt:380-381`](app/src/main/java/com/courier/app/ui/map/MapFragment.kt:380) - `setWidth()` и `color`

**Проблема:** Используются устаревшие методы, которые могут быть удалены в будущих версиях Android.

**Решение:** Заменить на современные аналоги:
- `getParcelableArrayList()` → `getParcelableArrayList()` с явным типом или использовать `Bundle.get()` с кастомной сериализацией
- `Polyline` API обновления для osmdroid

---

## Приоритеты доработок

1. **Высокий приоритет:**
   - Сохранение треков в базу данных (потеря данных)
   - Исправление привязки UI элементов

2. **Средний приоритет:**
   - Реализация сохранения комментариев
   - Заполнение ProfileFragment функционалом

3. **Низкий приоритет:**
   - Обновление устаревших API (не критично, но рекомендуется)
