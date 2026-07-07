# A School — Design System «Арка»

Визуальная система сайта A School. Мотив — арка буквы «A» из логотипа: арочные рамки фото, арочные иконки-«окна», контурные арки на фонах, нарисованная дуга-подчёркивание в заголовках. Тепло передаётся формой (скругления, арки), экспертность — типографской сеткой и порядком, энергия — дозированными цветовыми панелями и motion.

## Color

Бренд зафиксирован (не менять без решения владельца):

| Token | Value | Role |
|---|---|---|
| `--bg` | `#FDFCFF` | фон страницы (холодно-белый с фиолетовым подтоном) |
| `--ink` | `#241E38` | основной текст, фон футера |
| `--ink-2` | `#4A4460` | вторичный текст |
| `--muted` | `#625B7B` | приглушённый текст (контраст ≥4.5:1 на --bg) |
| `--faint` | `#8D87A3` | только декор/крупный текст, НЕ для мелкого текста |
| `--purple` | `#6C4BC7` | бренд-фиолетовый (акценты, ссылки, hl-слова) |
| `--purple-dark` | `#4C2A85` | тёмный фиолетовый |
| `--purple-deep` | `#331D5C` | низ градиента drench-панели «10 в 1» |
| `--green` | `#1F8A5B` | ГЛАВНЫЙ CTA (все кнопки записи), арка-подчёркивание |
| `--green-dark` / `--green-deep` | `#1F6B49` / `#14503A` | hover CTA / drench-панель лагеря |
| `--amber` | `#E8913A`, star `#F5A623` | тёплый акцент, звёзды |
| `--lav-1` / `--lav-2` | `#F4F0FC` / `#EAE3F8` | лавандовые поверхности |
| `--mint-1` | `#E9F5EF` | мятная поверхность |

Стратегия: светлая страница + committed-цветовые панели (`.band--green` лагерь, `.band--purple` «10 в 1») как энергетические пики. Секции чередуют `--bg` / `.surface-lav` / `.surface-mint`.

## Typography

- Display: **Nunito 900** (h1–h3, цифры, цены). Body: **Manrope 400–800**. Оба self-hosted (assets/fonts, cyrillic+latin сабсеты).
- h1 `clamp(2.35rem, 5.2vw, 3.9rem)` lh 1.06 ls −0.015em; страницы программ `clamp(2.1rem, 4.4vw, 3.3rem)`; h2 `clamp(1.75rem, 3.3vw, 2.7rem)`.
- `text-wrap: balance` на заголовках, `.lead` с `text-wrap: pretty`, ≤60ch.
- Акцент в заголовке: одно слово в `<span class="hl">` (фиолетовый) или `.hl--green`. НЕ градиентный текст.
- Подпись бренда: `.arc-word` — рисованная дуга (SVG data-uri) под ключевым словом h1; `.arc-word--purple` вариант.
- Никаких uppercase-«глазков» над секциями. Заголовок секции = `.sec-head` (h2 + `.lead`), центр — `.sec-head--center`.

## Signature: арка

- `--r-arch: 999px 999px 26px 26px` — арочная форма.
- `.hero-arch` — большая арка hero с прозрачным PNG; `.arch-photo` — арочные фото-слоты (педагоги, программы); `.arch-ic`, `.ric`, `.cic`, `.nic` — маленькие арки-иконки; `.modal-badge`, `.modal-sent-check` — арки в модалке; `.hero-grid::before`, `.band::before` — контурные арки на фоне (без нижней границы, уходят за край).
- В `.photo-grid` нечётные слоты арочные — ритм чередования.

## Components (assets/css/style.css)

Кнопки: `.btn-green` (главный CTA — всегда зелёный), `.btn-ghost`, `.btn-purple`, `.btn-soft`, `.btn-white(--purple)`, `.btn-outline-light`, `.btn-submit`, `.wa-btn`, `.link-more`.
Панели: `.band .band--green/--purple` (+ `.band-badge`, `.band-list`, `.band-actions`, `.band-split` с `.lead-card`), `.ten-grid`/`.ten-chip`/`.ten-numeral`.
Списки: `.reason-list`/`.reason` (почему мы), `.curriculum`/`.curr-item` (учебный план), `.result-list`/`.result-item` (чек-лист), `.fact-strip`/`.fact` (факты программы), `.belt` (лента фактов hero).
Карточки: `.prog-feature` (флагман), `.prog-card --green/--purple/--ink`, `.plan(--hot)`, `.teacher-card`, `.review-card`, `.wa-shot` (WhatsApp-переписка — фирменный элемент доверия).
Прочее: `.steps`/`.step` (пунктирная линия-связка ≥920px; номера только для настоящих последовательностей), `.faq-list` (grid-rows анимация, разметка `.faq-a-wrap > .faq-a > p`), `.contact-grid`/`.contact-row`, `.crumbs`, `.floating-cta`, модалка.

## Layout & Spacing

- Контейнеры 1240px (`.container`) / 1100px (`.container-narrow`), падинги `clamp(20px, 4vw, 32px)`.
- Секции `.section` `clamp(56px, 9vw, 104px)` / `.section--tight`.
- Радиусы: 12 / 18 / 26 / 34 / pill / arch. Тени: `--shadow-1..3`. Z-scale: header 50 → fab 60 → overlay 70 → drawer 80 → modal 90.
- Брейкпоинты: 980px (сетки → 1 колонка), 900px (бургер), 600px (full-width CTA).

## Motion

- Hero: время-базированная хореография `.hero-enter --1..--4/--media` (opacity+rise, каскад 50–350ms).
- Scroll: `.reveal` / `.reveal-stagger` — ТОЛЬКО transform (translateY 24px→0), без opacity: контент всегда виден без JS/observer/в headless. Включается классом `js` на `<html>` (ставится в head-скрипте), IO в main.js.
- Изинг `--ease-out` (quint), длительности 0.22s / 0.55s. Плавучие чипы `floaty` 6s, пульс точки WhatsApp.
- `prefers-reduced-motion: reduce` глушит всё.

## Rules

- Один h1; главный CTA «Бесплатный пробный день» — только зелёный; вторичные действия никогда не зелёные.
- Иконки Material Symbols Rounded — САБСЕТ (~60 имён): новую иконку нельзя добавить без пересборки woff2 (см. README).
- Мелкий текст ≥ `--muted`; `--faint` запрещён для текста <15px.
- Запрещено: градиентный текст, uppercase-eyebrow над секциями, боковые цветные полосы-бордеры, стекло-эффекты по умолчанию, одинаковые сетки карточек без причины.
- Все пути относительные (сайт живёт в /aschool/ на GitHub Pages).
