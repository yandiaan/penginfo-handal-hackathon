## Context

Project ini menggunakan `apps/server/src/services/dashscope.ts` sebagai satu-satunya AI service, yang memanggil Alibaba DashScope API secara langsung via `fetch`. Service ini meng-export 4 fungsi: `generateText`, `generateImage`, `generateVideo`, dan `pollTask`. Fungsi-fungsi ini diimpor langsung di `nodeRoutes.ts`.

Saat ini DashScope API key belum tersedia. Dibutuhkan pengganti sementara menggunakan OpenRouter agar development bisa berjalan. OpenRouter menyediakan SDK TypeScript (`@openrouter/sdk`) dengan OpenAI-compatible API yang mendukung text generation (chat completions). Untuk image generation, OpenRouter menyediakan endpoint OpenAI-compatible `/v1/images/generations` yang bisa diakses oleh model-model image generation yang tersedia di platform mereka.

## Goals / Non-Goals

**Goals:**

- Semua AI operations (text, image, video) bisa berjalan via OpenRouter jika `OPENROUTER_API_KEY` tersedia
- Tidak ada perubahan pada API routes — interface tetap sama dari sisi consumer
- DashScope tetap bisa digunakan jika `DASHSCOPE_API_KEY` tersedia (backward compatible)
- Provider selection otomatis berdasarkan environment variables
- Menggunakan `@openrouter/sdk` untuk text generation (type-safe, `callModel` pattern)
- Image generation via OpenRouter menggunakan OpenAI-compatible images endpoint
- Video generation di-skip dari OpenRouter jika tidak ada model yang support — fallback ke DashScope atau throw error yang jelas

**Non-Goals:**

- Tidak migrate ke abstraction layer permanen — ini solusi sementara
- Tidak mengubah schema/interface API routes yang sudah ada
- Tidak support multiple providers aktif bersamaan (satu provider per runtime)
- Tidak implement streaming — existing code menggunakan non-streaming responses

## Decisions

### 1. Gunakan `@openrouter/sdk` untuk text generation

**Rationale**: SDK ini menyediakan type-safe `callModel` pattern, auto tool execution, dan error handling bawaan. Lebih robust daripada raw fetch ke OpenAI-compatible endpoint.

**Alternative considered**: Raw fetch ke `https://openrouter.ai/api/v1/chat/completions` — lebih simple tapi kehilangan type safety dan error handling.

**Pilihan**: `@openrouter/sdk` karena sudah ada skill reference dan lebih maintainable.

### 2. Image generation via raw fetch ke OpenRouter OpenAI-compatible endpoint

**Rationale**: SDK `@openrouter/sdk` tidak menyediakan image generation method secara eksplisit. Namun OpenRouter meng-expose OpenAI-compatible endpoint, sehingga bisa hit `/v1/images/generations` langsung.

**Alternative considered**: Skip image generation di OpenRouter, tetap require DashScope. Tapi user ingin full OpenRouter jika memungkinkan.

**Pilihan**: Raw fetch ke `https://openrouter.ai/api/v1/images/generations` dengan fallback error yang jelas jika model/endpoint tidak tersedia.

### 3. Video generation — graceful degradation

**Rationale**: OpenRouter saat ini tidak memiliki dedicated video generation endpoint. Video generation tetap memerlukan DashScope atau skip.

**Pilihan**: Jika `OPENROUTER_API_KEY` set tapi DashScope tidak tersedia, `generateVideo` throw error dengan pesan jelas bahwa video generation tidak didukung OpenRouter. Jika `DASHSCOPE_API_KEY` juga tersedia, fallback ke DashScope untuk video saja.

### 4. Provider selection via `ai-service.ts` facade

**Rationale**: Daripada modify `dashscope.ts` langsung (mixing concerns), buat file baru `ai-service.ts` yang menjadi single entry point. File ini memilih provider berdasarkan env vars.

**Logic**:
```
OPENROUTER_API_KEY set → OpenRouter (text + image), DashScope fallback (video)
DASHSCOPE_API_KEY set → DashScope (all)
Neither → throw config error
```

**Alternative considered**: Modify `dashscope.ts` langsung dengan if/else — tapi ini mengotori existing code dan sulit revert nanti.

### 5. Route import change — minimal

**Rationale**: `nodeRoutes.ts` saat ini import dari `@/services/dashscope`. Ubah ke import dari `@/services/ai-service` yang re-export fungsi dengan interface yang sama.

Ini satu-satunya perubahan di file existing — minimal dan mudah revert.

## Risks / Trade-offs

- **[OpenRouter image gen tidak stabil]** → Mitigation: Error handling yang jelas, log warning jika image gen gagal via OpenRouter
- **[Video gen tidak tersedia di OpenRouter]** → Mitigation: Graceful error message, dokumentasi bahwa video memerlukan DashScope
- **[Free tier rate limits]** → Mitigation: Implement retry dengan backoff di openrouter.ts mengikuti pattern dari SDK error handling
- **[Temporary solution becomes permanent]** → Mitigation: `ai-service.ts` dibuat simple, mudah dihapus. Cukup revert import di routes ke dashscope langsung
- **[Tambah dependency `@openrouter/sdk`]** → Trade-off yang acceptable karena memberikan type safety. Bisa dihapus saat revert ke DashScope
