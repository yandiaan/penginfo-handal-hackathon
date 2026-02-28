# 🧩 Complete Node Catalog (22 Nodes)

## 📌 Node Catalog Overview

| #          | NODE              | TIER | ROLE                      | EXEC   |
| ---------- | ----------------- | ---- | ------------------------- | ------ |
| **━━━━━**  | **📥 INPUT**      |      |                           |        |
| 1          | TextPrompt        | MVP  | User text/description     | —      |
| 2          | ImageUpload       | MVP  | Upload reference image    | —      |
| 3          | TemplatePreset    | MVP  | Pre-made pipeline starter | —      |
| 4 **NEW**  | ColorPalette      | MVP+ | Pick colors & palette     | —      |
| **━━━━━**  | **⚙️ TRANSFORM**  |      |                           |        |
| 5          | PromptEnhancer    | MVP  | Raw text → AI-optimized   | Qwen   |
| 6          | StyleConfig       | MVP  | Art style + mood config   | —      |
| 7 **NEW**  | ImageToText       | MVP+ | Describe image → text     | QwenVL |
| 8 **NEW**  | TranslateText     | MVP+ | Translate between langs   | Qwen   |
| 9 **NEW**  | BackgroundRemover | MVP+ | Remove image background   | Server |
| 10 **NEW** | FaceCrop          | v2   | Detect & extract face     | Server |
| **━━━━━**  | **🤖 GENERATE**   |      |                           |        |
| 11         | ImageGenerator    | MVP  | text2img / img2img        | Wan    |
| 12         | VideoGenerator    | MVP  | text2video / img2video    | Wan    |
| 13 **NEW** | Inpainting        | MVP+ | Edit masked region of img | Wan    |
| 14 **NEW** | ImageUpscaler     | MVP+ | Upscale resolution        | Server |
| **━━━━━**  | **🎨 COMPOSE**    |      |                           |        |
| 15         | TextOverlay       | MVP  | Text on image             | Client |
| 16 **NEW** | FrameBorder       | MVP+ | Decorative frames         | Client |
| 17 **NEW** | StickerLayer      | MVP+ | Emoji/sticker overlay     | Client |
| 18 **NEW** | ColorFilter       | MVP+ | Color grading / filters   | Client |
| 19 **NEW** | CollageLayout     | v2   | Multi-image arrangement   | Client |
| **━━━━━**  | **📤 OUTPUT**     |      |                           |        |
| 20         | Preview           | MVP  | View at target dimensions | Client |
| 21         | Export            | MVP  | Download / share          | Server |
| 22 **NEW** | Watermark         | v2   | Brand/attribution stamp   | Client |

### 🏷️ Tier Legend

- **MVP** (10 nodes): Core pipeline, launch-ready
- **MVP+** (+8 nodes): Valuable additions post-launch
- **v2** (+4 nodes): Power features for later

---

## 🔥 New Node Deep-Dives

### 📥 1. ColorPalette (#4)

- **Category:** `input`
- **Exec:** `none` (pure input)
- **In:** —
- **Out:** `[style]`

**Kenapa Perlu:**
`StyleConfig` udah punya `colorPalette`, tapi `ColorPalette` sebagai standalone node bikin user bisa:

- Reuse 1 palette across multiple branches.
- Feed palette ke `PromptEnhancer` (inject color words into prompt: _"emerald green and gold tones"_).
- Feed ke `FrameBorder` + `TextOverlay` (consistent colors).

**Config:**

- `mode`: `'preset' | 'custom' | 'extract'`
- `presets`:
  - `'ramadan'` → `#1b5e20, #ffd700, #ffffff, #004d40`
  - `'lebaran'` → `#4caf50, #ff9800, #f44336, #ffeb3b`
  - `'christmas'` → `#c62828, #2e7d32, #ffd54f, #ffffff`
  - `'imlek'` → `#d32f2f, #ffd600, #ff6f00, #b71c1c`
  - `'pastel'` → `#f8bbd0, #b3e5fc, #c8e6c9, #fff9c4`
  - `'cyberpunk'` → `#00e5ff, #e040fb, #1a1a2e, #0f0f23`
  - `'earth'` → `#795548, #4caf50, #ff9800, #3e2723`
- `custom`: `string[]` (user picks via color picker)
- `extract`: from connected image (auto-extract palette)

**Use-Case Mapping:**

- **Ramadan Wishes:** `'ramadan'` preset
- **Holiday Memes:** `'lebaran'` preset
- **AI Pets:** `'pastel'` preset
- **Avatars:** `'cyberpunk'` or custom

---

### ⚙️ 2. ImageToText (#7) 🔵 RUNNABLE

- **Category:** `transform`
- **Exec:** `Qwen-VL` (server-side)
- **In:** `[image]` (required)
- **Out:** `[text]`

**Kenapa Perlu:**
Ini merupakan bridge antara image input dan text pipeline. Tanpa ini, kalau user upload image, pipeline ga tau apa isinya — cuma bisa pakai blind img2img.

> `ImageUpload` → `ImageToText` → `PromptEnhancer` → `ImageGenerator`  
> _"Here's my photo"_ → _"A young woman with short hair, wearing glasses, smiling"_ → _"Anime-style avatar of young woman with short hair and glasses, wearing traditional batik, vibrant colors, Studio Ghibli style"_ → **[GENERATED AVATAR]**

**Config:**

- `descriptionType`: `'detailed' | 'brief' | 'tags'`
- `focus`: `'general' | 'face' | 'style' | 'mood' | 'objects'`
- `language`: `'en' | 'id'`

**Killer Use-Case:**
Upload ANY image → AI describes it → enhance prompt → generate STYLIZED VERSION of that image (_"Photo → Anime"_, _"Photo → Watercolor"_, _"Photo → Islamic Art Style"_).

---

### ⚙️ 3. TranslateText (#8) 🔵 RUNNABLE

- **Category:** `transform`
- **Exec:** `Qwen` (server-side)
- **In:** `[text]` (required)
- **Out:** `[text]`

**Kenapa Perlu:**
Content creator Indonesia sering butuh bilingual content (Ramadan wishes in Arabic + Indonesian, meme captions bilingual ID+EN). Juga, `PromptEnhancer` outputs English prompts, tapi user mau `TextOverlay` pakai Bahasa Indonesia.

**Config:**

- `from`: `'auto' | 'id' | 'en' | 'ar' | 'ja' | 'zh'`
- `to`: `'id' | 'en' | 'ar' | 'ja' | 'zh'`
- `tone`: `'formal' | 'casual' | 'poetic'`
- `preserveEmoji`: `boolean`

**Example Pipeline:**

- `TextPrompt("Selamat Ramadan, semoga berkah")` → `TranslateText(to: 'ar')` → `TextOverlay (Arabic calligraphy)`
- `TextPrompt(Indonesian)` → `TranslateText(to: 'en')` → `PromptEnhancer` → `ImageGenerator`

---

### ⚙️ 4. BackgroundRemover (#9) 🔵 RUNNABLE

- **Category:** `transform`
- **Exec:** server-side (AI model)
- **In:** `[image]` (required)
- **Out:** `[image]` (transparent PNG)

**Kenapa Perlu:**
Essential untuk Avatar creation, sticker creation, meme creation, auto-extract subject.

**Config:**

- `model`: `'auto' | 'portrait' | 'general'`
- `refinement`: `'fast' | 'precise'`
- `edgeSoftness`: `number` (0-100, feathering)
- `replaceBg`: `string | null`

**Pipeline Examples:**

- **Avatar:** `ImageUpload` → `BackgroundRemover` → `ImageToText` → `PromptEnhancer` → `ImageGenerator`
- **Sticker:** `ImageGenerator` → `BackgroundRemover` → `FrameBorder` → `Export`

---

### ⚙️ 5. FaceCrop (#10) 🔵 RUNNABLE

- **Category:** `transform`
- **Exec:** server-side
- **In:** `[image]` (required)
- **Out:** `[image]` (cropped face region)

**Kenapa Perlu:**
Avatar workflow seringkali dimulai dari group photo atau full-body shot. `FaceCrop` auto-detects wajah dan crop area wajah saja — jadi img2img fokus ke wajah.

**Config:**

- `padding`: `number` (% extra space around face)
- `shape`: `'square' | 'circle' | 'original'`
- `faceIndex`: `number` (if multiple faces detected)
- `detectMultiple`: `boolean` (output multiple crops?)

_(Tier: v2 - BackgroundRemover covers 80% use cases first)_

---

### 🤖 6. Inpainting (#13) 🔵 RUNNABLE

- **Category:** `generate`
- **Exec:** `Wan` (server-side)
- **In:** `[image]` (required), `[text]` (optional edit instruction)
- **Out:** `[image]`

**Kenapa Perlu:**
ImageGenerator menghasilkan 90% bagus, tapi ada 1 area yang kurang. Tanpa Inpainting, user harus re-generate SELURUH gambar. `Inpainting = surgical edit`.

**Config:**

- `mask`: `MaskData` (user draws mask on drawer UI)
- `instruction`: `string` ("replace with", "remove", "change")
- `strength`: `number` (0-100)
- `preserveContext`: `boolean`

**Use Cases:**

- **Ramadan card:** Inpaint to add/change Islamic motifs.
- **Meme:** Change facial expression on character.
- **AI Pet:** Fix weird AI artifacts on paws/ears.

---

### 🤖 7. ImageUpscaler (#14) 🔵 RUNNABLE

- **Category:** `generate`
- **Exec:** server-side (AI upscale)
- **In:** `[image]` (required)
- **Out:** `[image]` (high-res)

**Kenapa Perlu:**
`Wan` generates at fixed resolutions. Sosial media butuh higher res: IG Story (1080x1920), Print (2400x3000+). Upscaler preserves detail better than simple resize.

**Config:**

- `scale`: `'2x' | '4x'`
- `model`: `'general' | 'face' | 'anime'`
- `denoise`: `number` (0-100)
- `targetDimension`: `{ width: number, height: number } | null`

---

### 🎨 8. FrameBorder (#16)

- **Category:** `compose`
- **Exec:** client-side (Canvas API)
- **In:** `[image]` (required), `[style]` (optional)
- **Out:** `[image]`

**Kenapa Perlu:**
Content greeting/wishes BUTUH frame decoratif. Ini pembeda antara "gambar AI mentah" vs "konten siap share".

**Config:**

- `frameType`: `'solid' | 'gradient' | 'ornamental' | 'islamic' | 'floral' | 'polaroid' | 'torn-paper' | 'neon'`
- `thickness`: `number` (px)
- `cornerStyle`: `'square' | 'rounded' | 'ornate'`
- `color`: `string | gradient` (from ColorPalette)
- `innerShadow`: `boolean`
- `pattern`: `string | null`

**Built-In Frame Presets / Use-Cases:**

- **Islamic Geometric:** Ramadan wishes
- **Floral Garden:** General wishes
- **Polaroid:** Aesthetic/retro (Cute AI Pets)
- **Neon Glow:** Gen-Z/aesthetic (Avatars)
- **Torn-paper:** Holiday Memes

---

### 🎨 9. StickerLayer (#17)

- **Category:** `compose`
- **Exec:** client-side (Canvas API)
- **In:** `[image]` (required)
- **Out:** `[image]`

**Kenapa Perlu:**
Social media content tanpa sticker/emoji = kurang expressive. Ini layer terakhir untuk bikin konten terasa "social media native".

**Config:**

- `stickers`: Array of `{ id, src, x, y, scale, rotation, opacity }`
- `pack`: `'emoji' | 'ramadan' | 'lebaran' | 'cute' | 'meme-faces' | 'sparkles'`

**Packs:**

- **Ramadan:** 🌙 ⭐ 🕌 🏮 📿 🤲 ☪️ 🌃
- **Lebaran:** 🎆 🎊 💰 🧧 🎉 🤝 🎂 🏠
- **Cute:** ✨ 💖 🌈 ⭐ 🎀 🌸 💫 🦋
- **Meme:** 😂 💀 😭 🔥 💯 ⚡ 👀 🗿 😤

---

### 🎨 10. ColorFilter (#18)

- **Category:** `compose`
- **Exec:** client-side (CSS/Canvas)
- **In:** `[image]` (required)
- **Out:** `[image]`

**Kenapa Perlu:**
AI-generated images often look "too clean" or inconsistent in color. `ColorFilter` = Instagram-like finishing pass yang bikin konten look cohesive. INSTANT preview, no API call needed.

**Config:**

- `filter`: `'none' | preset`
- `brightness` / `contrast` / `saturation` / `warmth` / `vignette` / `grain`

**Filter Presets:**
| Preset | Effect |
|---|---|
| **Warm** | +warmth, +saturation, slight vignt |
| **Cool** | -warmth, +contrast, blue tint |
| **Vintage** | -saturation, +warmth, +grain |
| **Dramatic**| +contrast, +vignette, -brightness |
| **Dreamy** | -contrast, +brightness, soft |
| **Neon** | +saturation, +contrast, vibrant |
| **Matte** | lifted blacks, -contrast, flat |
| **B&W** | saturation: -100 |
| **Sepia** | B&W + warm tint |
| **Eid Gold**| warm, golden highlights, rich 🔥 |
| **Sahur** | cool blue-purple, low light mood 🔥 |

---

### 🎨 11. CollageLayout (#19)

- **Category:** `compose`
- **Exec:** client-side (Canvas API)
- **In:** `[image]` (multi — accepts 2-6 image connections)
- **Out:** `[image]`

**Kenapa Perlu:**
Membuka output tipe baru: Before/After comparison, Expectation vs Reality, "POV" multi-panel, Pet evolution, Avatar variations.

**Config:**

- `layout`:
  - `'grid-2x1'` `[■][■]`
  - `'grid-1x2'` `[■]` `[■]`
  - `'grid-2x2'`, `'grid-3x1'`, `'triptych'`, `'comic-4'`, `'freeform'`
- `gap` / `borderRadius` / `backgroundColor` / `labels`

_(Tier: v2 - complex UI, multi-input requires port system changes)_

---

### 📤 12. Watermark (#22)

- **Category:** `output`
- **Exec:** client-side (Canvas API)
- **In:** `[image]` (required)
- **Out:** `[image]`

**Kenapa Perlu:**

- Attribution: "Made with [AppName]"
- Creator branding, Anti-theft, Professional business look.

**Config:**

- `type`: `'text' | 'image'`
- `position`: `'bottom-right' | 'bottom-left' | 'center' | 'top-right' | 'tiled'`
- `opacity` / `size` / `color`

---

## 🔌 Updated Connection Matrix

### Full Port Compatibility Map

| FROM NODE             | OUT TYPE   | VALID TARGETS                                                                                                                                                                                                                                                   |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TextPrompt**        | `[text]`   | `PromptEnhancer.text`, `TranslateText.text`, `TextOverlay.text`, `Inpainting.text`                                                                                                                                                                              |
| **ImageUpload**       | `[image]`  | `ImageToText.image`, `BackgroundRemover.image`, `FaceCrop.image`, `ImageGenerator.image` (img2img), `VideoGenerator.image` (img2vid), `TextOverlay.image`, `Inpainting.image`, `ColorFilter.image`, `FrameBorder.image`, `CollageLayout.image`, `Preview.media` |
| **TemplatePreset**    | `[text]`   | _(same as TextPrompt)_                                                                                                                                                                                                                                          |
| **TemplatePreset**    | `[style]`  | `PromptEnhancer.style`, `ImageGenerator.style`, `VideoGenerator.style`, `FrameBorder.style`                                                                                                                                                                     |
| **ColorPalette**      | `[style]`  | _(same as TemplatePreset.style)_                                                                                                                                                                                                                                |
| **PromptEnhancer**    | `[prompt]` | `ImageGenerator.prompt`, `VideoGenerator.prompt` <br>_(❌ textOverlay: prompt ≠ text)_                                                                                                                                                                          |
| **ImageToText**       | `[text]`   | _(same as TextPrompt)_                                                                                                                                                                                                                                          |
| **TranslateText**     | `[text]`   | _(same as TextPrompt)_                                                                                                                                                                                                                                          |
| **StyleConfig**       | `[style]`  | _(same as TemplatePreset.style)_                                                                                                                                                                                                                                |
| **BackgroundRemover** | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **FaceCrop**          | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **ImageGenerator**    | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **ImageUpscaler**     | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **Inpainting**        | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **TextOverlay**       | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **FrameBorder**       | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **StickerLayer**      | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **ColorFilter**       | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **CollageLayout**     | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **Watermark**         | `[image]`  | _(same as ImageUpload)_                                                                                                                                                                                                                                         |
| **VideoGenerator**    | `[video]`  | `Preview.media`, `Export.media` <br>_(❌ textOverlay: video ≠ image)_                                                                                                                                                                                           |
| **Preview**           | `[media]`  | `Export.media`, `Watermark.image` (if image)                                                                                                                                                                                                                    |
| **Export**            | `—`        | _(terminal node, no output)_                                                                                                                                                                                                                                    |

---

## 🎯 Use-Cases With Full Node Catalog

### 1️⃣ Ramadan Wishes _(Advanced)_

- **Nodes Used:** 11
- **Flow:**
  1. `TemplatePreset("ramadan")` → `TranslateText(to: 'ar')` → `TextOverlay(1)`
  2. `TemplatePreset("ramadan")` → `PromptEnhancer` (style)
  3. `TextPrompt("warm family")` → `PromptEnhancer` (text)
  4. `PromptEnhancer` → `ImageGenerator`
  5. `ImageGenerator` → `FrameBorder`
  6. `ColorPalette("ramadan")` → `FrameBorder("islamic")`
  7. `FrameBorder` → `StickerLayer(🌙⭐🏮)`
  8. `StickerLayer` → `ColorFilter("Eid Gold")`
  9. `ColorFilter` → `Preview` → `Export`

### 2️⃣ Holiday Meme _(Comparison Meme)_

- **Nodes Used:** 10 (Multi-branch pipeline)
- **Flow:**
  1. `TextPrompt("luxury mudik")` → `PromptEnhancer` → `ImageGenerator(1)`
  2. `TextPrompt("real mudik")` → `PromptEnhancer` → `ImageGenerator(2)`
  3. `ImageGenerator(1)` & `ImageGenerator(2)` → `CollageLayout`
  4. `TextPrompt("Ekspektasi | Realita")` → `TextOverlay`
  5. `StyleConfig(pop-art)` → `ColorFilter("Dramatic")`
  6. `CollageLayout` → `TextOverlay` → `ColorFilter`
  7. `ColorFilter` → `Preview` → `Export`

### 3️⃣ AI Pet → Sticker Pack

- **Nodes Used:** 8 (Output = ready-to-use sticker)
- **Flow:**
  1. `TextPrompt("orange tabby, chibi")` & `StyleConfig(cartoon, cute)` → `PromptEnhancer`
  2. `PromptEnhancer` → `ImageGenerator`
  3. `ImageGenerator` → `BackgroundRemover`
  4. `BackgroundRemover` → `FrameBorder("sticker outline")`
  5. `FrameBorder` → `StickerLayer(✨💖)`
  6. `StickerLayer` → `Preview` → `Export(png, transparent)`

### 4️⃣ Custom Avatar _(Face-Aware Pipeline)_

- **Nodes Used:** 10
- **Flow:**
  1. `ImageUpload(selfie)` → `FaceCrop` → `ImageToText`
  2. `ImageToText("young woman...")` & `TextPrompt("anime, batik")` → `PromptEnhancer`
  3. `PromptEnhancer` & `FaceCrop` → `ImageGenerator(img2img)`
  4. `ImageGenerator` → `BackgroundRemover`
  5. `BackgroundRemover` → `ImageUpscaler(2x)`
  6. `ImageUpscaler` → `FrameBorder("neon glow")`
  7. `FrameBorder` → `Preview` → `Export(png)`

---

## 📊 Final Summary

**TOTAL: 22 nodes across 6 categories**

### 📥 INPUT (4)

- TextPrompt
- ImageUpload
- TemplatePreset
- ColorPalette

### ⚙️ TRANSFORM (6)

- PromptEnhancer 🔵
- StyleConfig
- ImageToText 🔵
- TranslateText 🔵
- BackgroundRmv 🔵
- FaceCrop 🔵

### 🤖 GENERATE (4)

- ImageGenerator 🔵
- VideoGenerator 🔵
- Inpainting 🔵
- ImageUpscaler 🔵

### 🎨 COMPOSE (5)

- TextOverlay
- FrameBorder
- StickerLayer
- ColorFilter
- CollageLayout

### 📤 OUTPUT (3)

- Preview
- Export
- Watermark

_(🔵 = RUNNABLE)_
