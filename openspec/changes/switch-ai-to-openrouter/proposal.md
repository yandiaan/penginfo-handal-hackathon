## Why

Project ini menggunakan Alibaba DashScope (Qwen untuk text, Wan untuk image/video generation), namun API key DashScope belum tersedia. Untuk memungkinkan development dan testing berjalan, perlu pengganti sementara menggunakan OpenRouter yang menyediakan akses gratis ke berbagai AI model — termasuk text generation, image generation, dan video generation.

## What Changes

- Tambah service baru `openrouter.ts` yang mengimplementasikan `generateText`, `generateImage`, dan `generateVideo` menggunakan OpenRouter API (OpenAI-compatible endpoint)
- Buat abstraction layer `ai-service.ts` yang memilih antara OpenRouter dan DashScope berdasarkan environment variable yang tersedia
- Tambah `OPENROUTER_API_KEY`, `OPENROUTER_TEXT_MODEL`, `OPENROUTER_IMAGE_MODEL`, `OPENROUTER_VIDEO_MODEL` ke `.env.example`
- Jika `OPENROUTER_API_KEY` tersedia → gunakan OpenRouter untuk semua AI operations (text, image, video)
- Jika `DASHSCOPE_API_KEY` tersedia → gunakan DashScope (behavior saat ini)
- Prioritas: OpenRouter > DashScope (karena OpenRouter sementara untuk development)

## Capabilities

### New Capabilities

- `openrouter-ai-service`: Service layer untuk text generation, image generation, dan video generation via OpenRouter API. Menggunakan OpenAI-compatible endpoint (`https://openrouter.ai/api/v1`) dengan support chat completions untuk text, image generation models, dan video generation models yang tersedia di OpenRouter.

### Modified Capabilities

<!-- Tidak ada existing specs yang berubah requirement-nya -->

## Impact

- **Files**: `apps/server/src/services/dashscope.ts`, `apps/server/.env.example`, `apps/server/src/routes/nodeRoutes.ts`
- **New Files**: `apps/server/src/services/openrouter.ts`, `apps/server/src/services/ai-service.ts`
- **Dependencies**: Tidak ada package baru (menggunakan native `fetch`)
- **API Routes**: `/api/node/prompt-enhancer/run`, `/api/node/image-generator/run`, `/api/node/video-generator/run` akan otomatis menggunakan OpenRouter jika key tersedia
- **Breaking**: Tidak ada — interface tetap sama, hanya backend provider yang berubah
