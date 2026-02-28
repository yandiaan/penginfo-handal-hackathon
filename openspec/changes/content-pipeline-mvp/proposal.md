## Why

The existing node-based canvas (`@xyflow/react`) has 7 display-only nodes with no execution engine, no port typing, and no AI integration. Nodes cannot actually run — edges are cosmetic, any node connects to any other, and the mock AI service is not wired to the pipeline. The platform needs a functional content generation pipeline where nodes execute real AI workloads (Alibaba Model Studio: Qwen for text, Wan for image/video) and produce shareable image/video content targeting Indonesian cultural contexts (Ramadan, Lebaran, etc.).

## What Changes

- **BREAKING**: Replace all 7 existing node types (`trendSeed`, `textInput`, `aiTextGenerator`, `humorStyle`, `variantBatch`, `canvasRender`, `export`) with 10 new MVP node types organized into 5 categories: Input (TextPrompt, ImageUpload, TemplatePreset), Transform (PromptEnhancer, StyleConfig), Generate (ImageGenerator, VideoGenerator), Compose (TextOverlay), Output (Preview, Export)
- **BREAKING**: Introduce typed port system (`text`, `prompt`, `image`, `video`, `style`, `media`) with connection validation — replaces current untyped Handle connections
- Add pipeline execution engine with topology sort, per-node state machine (`idle` → `ready` → `running` → `done` → `error`), full pipeline run, and per-node run
- Add server-side API routes for AI execution: `POST /api/pipeline/run`, `POST /api/node/:type/run`, `GET /api/pipeline/status` (SSE for progress)
- Integrate Alibaba Model Studio: Qwen (qwen-plus) for prompt enhancement/translation, Qwen-VL for image-to-text, Wan for image/video generation
- Add template preset system on `/templates` page — pre-configured pipelines for Ramadan Wishes, Holiday Memes, AI Pets, Custom Avatars

## Capabilities

### New Capabilities

- `port-type-system`: Typed port definitions (text, prompt, image, video, style, media) with connection validation rules, visual feedback (color-coded ports, green/red glow on drag), and compatibility matrix enforcement
- `node-catalog`: 10 MVP node type definitions with configs, port schemas, UI components (compact node + drawer panel), and default configs. Categories: input, transform, generate, compose, output
- `execution-engine`: Pipeline execution engine — topology sort, node state machine, full-pipeline run (toolbar button), per-node run (node button), SSE progress streaming, error handling and partial re-run
- `alibaba-ai-integration`: Server-side integration with Alibaba Model Studio — Qwen text API (prompt enhancement, translation), Qwen-VL (image captioning), Wan image generation (text2img, img2img), Wan video generation (text2video, img2video)
- `template-presets`: Pre-configured pipeline templates (Ramadan Wishes, Holiday Memes, AI Pets, Custom Avatars) that auto-populate canvas with connected nodes and default configs

### Modified Capabilities

_(No existing specs to modify — this is the first spec-driven change)_

## Impact

- **Frontend (`apps/web`)**: Complete rewrite of `src/components/canvas/` — node types, type system, config, hooks, drawer panels, toolbar, styles. New execution state management. New template picker UI.
- **Backend (`apps/server`)**: New route modules for pipeline execution and AI proxy. New Alibaba Model Studio SDK integration. New SSE endpoint for streaming progress.
- **Shared (`packages/validators`)**: Potentially new Zod schemas for pipeline/node validation shared between frontend and backend.
- **Dependencies**: Add Alibaba Cloud SDK (`@alicloud/dashscope` or REST API client). Possibly add `eventsource` for SSE client-side.
- **Environment**: New env vars for Alibaba Model Studio API keys (`DASHSCOPE_API_KEY`).
