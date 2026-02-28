## 1. Setup & Dependencies

- [x] 1.1 Install `@openrouter/sdk` package di `apps/server` — SKIPPED: SDK is ESM-only, project uses CommonJS. Using raw fetch instead (consistent with dashscope.ts pattern)
- [x] 1.2 Tambah environment variables ke `apps/server/.env.example`: `OPENROUTER_API_KEY`, `OPENROUTER_TEXT_MODEL`, `OPENROUTER_IMAGE_MODEL`, `OPENROUTER_VIDEO_MODEL`

## 2. OpenRouter Service

- [x] 2.1 Buat `apps/server/src/services/openrouter.ts` — inisialisasi OpenRouter client dari `@openrouter/sdk`
- [x] 2.2 Implement `generateText` di openrouter.ts menggunakan `callModel` pattern dengan support messages, temperature, max_tokens
- [x] 2.3 Implement `generateImage` di openrouter.ts via raw fetch ke OpenRouter `/v1/images/generations` endpoint
- [x] 2.4 Implement error handling: retry logic untuk 429/5xx, descriptive error messages untuk 401/402

## 3. AI Service Facade

- [x] 3.1 Buat `apps/server/src/services/ai-service.ts` — provider selection logic berdasarkan environment variables
- [x] 3.2 Export `generateText` yang delegate ke OpenRouter atau DashScope
- [x] 3.3 Export `generateImage` yang delegate ke OpenRouter atau DashScope
- [x] 3.4 Export `generateVideo` yang delegate ke DashScope (fallback) atau throw error jelas jika tidak tersedia
- [x] 3.5 Export `pollTask` yang delegate ke DashScope (hanya diperlukan untuk DashScope async tasks)

## 4. Route Integration

- [x] 4.1 Update import di `apps/server/src/routes/nodeRoutes.ts` dari `@/services/dashscope` ke `@/services/ai-service`

## 5. Verification

- [x] 5.1 Verify TypeScript compilation tanpa error (`pnpm run build` atau `tsc --noEmit`)
- [x] 5.2 Verify existing DashScope path masih intact (no breaking changes pada interface)
