## 1. Foundation — Port Type System & Core Types

- [x] 1.1 Create `types/port-types.ts` — define `PortDataType` enum (text, prompt, image, video, style, media), `PortDefinition` interface (id, type, label, required), `NodeOutput` interface with typed data containers (TextData, PromptData, ImageData, VideoData, StyleData)
- [x] 1.2 Create `config/port-compatibility.ts` — define compatibility matrix `COMPATIBILITY: Record<PortDataType, PortDataType[]>` and `isConnectionValid(sourceType, targetType)` function
- [x] 1.3 Create `config/port-colors.ts` — define `PORT_COLORS: Record<PortDataType, string>` with color assignments (text=#4ade80, prompt=#a78bfa, image=#60a5fa, video=#f472b6, style=#f59e0b, media=#e2e8f0)
- [x] 1.4 Update `types/node-types.ts` — replace all existing node type definitions with new 10 MVP node types (TextPrompt, ImageUpload, TemplatePreset, PromptEnhancer, StyleConfig, ImageGenerator, VideoGenerator, TextOverlay, Preview, Export) and their config interfaces. Define `NodePortSchema` for each node type declaring input/output ports
- [x] 1.5 Update `config/nodeCategories.ts` — replace 6 categories with 5 new categories (input, transform, generate, compose, output) with updated colors and icons

## 2. Node UI Components — Compact Nodes

- [x] 2.1 Update `nodes/CompactNode.tsx` — add typed port handle rendering (multiple Handle components with unique ids, positioned vertically, color-coded by port type, labels on hover)
- [x] 2.2 Create `nodes/input/TextPromptNode.tsx` — compact view with textarea preview, char count subtitle, 0 inputs, 1 text output
- [x] 2.3 Create `nodes/input/ImageUploadNode.tsx` — compact view with thumbnail preview, file size subtitle, 0 inputs, 1 image output
- [x] 2.4 Create `nodes/input/TemplatePresetNode.tsx` — compact view with template name, 0 inputs, 2 outputs (text + style)
- [x] 2.5 Create `nodes/transform/PromptEnhancerNode.tsx` — compact view with creativity indicator, run button, 2 inputs (text req, style opt), 1 prompt output. Show enhanced prompt preview when done
- [x] 2.6 Create `nodes/transform/StyleConfigNode.tsx` — compact view with art style + mood chips, 0 inputs, 1 style output
- [x] 2.7 Create `nodes/generate/ImageGeneratorNode.tsx` — compact view with dimensions subtitle, run button, thumbnail result preview, 3 inputs (prompt req, style opt, image opt), 1 image output
- [x] 2.8 Create `nodes/generate/VideoGeneratorNode.tsx` — compact view with duration/resolution subtitle, run button, video thumbnail, 3 inputs (prompt req, style opt, image opt), 1 video output
- [x] 2.9 Create `nodes/compose/TextOverlayNode.tsx` — compact view with text preview + position, 2 inputs (image req, text opt), 1 image output
- [x] 2.10 Create `nodes/output/PreviewNode.tsx` — compact view with dimension preset chip, live preview thumbnail, 1 media input, 1 media output
- [x] 2.11 Create `nodes/output/ExportNode.tsx` — compact view with format badge, download/share buttons, 1 media input, 0 outputs
- [x] 2.12 Update `nodes/index.ts` — replace node type registry with new 10 node components, remove old node exports
- [ ] 2.13 Delete old node files — remove TrendSeedNode, AITextGeneratorNode, HumorStyleNode, VariantBatchNode, CanvasRenderNode, and old ExportNode/TextInputNode

## 3. Node Drawer Panels

- [x] 3.1 Create `drawer/panels/TextPromptPanel.tsx` — full textarea with char counter, placeholder config
- [x] 3.2 Create `drawer/panels/ImageUploadPanel.tsx` — dropzone with drag-drop, file picker button, thumbnail preview, file size display, clear button
- [x] 3.3 Create `drawer/panels/TemplatePresetPanel.tsx` — template card selector grid (ramadan-wishes, holiday-meme, ai-pet, custom-avatar, blank), locale toggle
- [x] 3.4 Create `drawer/panels/PromptEnhancerPanel.tsx` — creativity selector (precise/balanced/creative), content type selector, tone selector, language selector, "▶ Run" button, output preview area showing enhanced prompt
- [x] 3.5 Create `drawer/panels/StyleConfigPanel.tsx` — art style button group (8 options), color palette picker, mood selector, cultural theme selector
- [x] 3.6 Create `drawer/panels/ImageGeneratorPanel.tsx` — mode display (auto text2img/img2img), dimension presets, steps slider, seed input, "🚀 Generate" button, result image display
- [x] 3.7 Create `drawer/panels/VideoGeneratorPanel.tsx` — mode display, duration selector, resolution selector, fps toggle, "🎬 Generate" button, video player for result
- [x] 3.8 Create `drawer/panels/TextOverlayPanel.tsx` — text input (or "from port" indicator), position selector, font picker, font size slider, color picker, stroke toggle, effect selector
- [x] 3.9 Create `drawer/panels/PreviewPanel.tsx` — platform preset buttons (IG Square, IG Story, TikTok, Twitter, WA Status, Custom), width/height inputs, fit selector, backgroundColor picker, live preview display
- [x] 3.10 Create `drawer/panels/ExportPanel.tsx` — format selector (png/jpg/webp/mp4/gif), quality slider, share target buttons (download/whatsapp/clipboard), action buttons
- [x] 3.11 Update `drawer/NodeDetailDrawer.tsx` — replace old panel switch/case with new 10 panels, add run button in drawer header for runnable nodes

## 4. Connection Validation & Canvas Wiring

- [x] 4.1 Create `hooks/useConnectionValidation.ts` — implement `isValidConnection` callback that reads source/target handle IDs, looks up their port types from node schemas, and checks against compatibility matrix. Return false + visual feedback for invalid connections
- [x] 4.2 Update `hooks/useFlowNodes.ts` — replace `createDefaultNodeData` switch with new 10 node types, update `addNode` function, integrate connection validation into `onConnect`, remove old initial elements
- [x] 4.3 Update `FlowCanvas.tsx` — pass `isValidConnection` prop to ReactFlow, add visual feedback styles for valid/invalid connection drag (green glow / red shake on target handles)
- [x] 4.4 Update `config/initialElements.ts` — replace demo pipeline with a simple blank canvas or minimal example using new node types

## 5. Execution Engine — Frontend

- [x] 5.1 Create `execution/types.ts` — define `NodeExecutionState` (status, output, error, progress, lastRunAt), `ExecutionStore` interface, `PipelineRunResult`
- [x] 5.2 Create `execution/topology.ts` — implement `topologySort(nodes, edges)` function that returns execution order array, with cycle detection (throws error on cycle)
- [x] 5.3 Create `execution/store.ts` — implement Zustand store (or React context) for execution state management: `nodeStates` map, `setNodeState`, `getNodeOutput`, `resetPipeline`, computed `readyNodes` list
- [x] 5.4 Create `execution/runner.ts` — implement `runPipeline(nodes, edges, configs, store)` that: topology-sorts, collects inputs per node from upstream outputs, calls server API per runnable node, updates store states, handles errors. Implement `runNode(nodeId, nodes, edges, store)` for per-node execution
- [x] 5.5 Create `execution/inputCollector.ts` — implement `collectNodeInputs(nodeId, edges, executionStore)` that reads output data from all upstream connected nodes and maps them to the target node's input ports
- [x] 5.6 Update node components to read execution state — each node reads from execution store to display: state glow (idle/ready/running/done/error), progress bar (running), output preview (done), error message (error)
- [x] 5.7 Add "▶ Run Pipeline" button to `FlowToolbar.tsx` — triggers full pipeline execution, disabled during run, shows spinner while running
- [x] 5.8 Add "▶ Run" button to runnable nodes (PromptEnhancer, ImageGenerator, VideoGenerator) — visible on compact node when state=ready, triggers per-node execution

## 6. Server — API Routes & AI Integration

- [x] 6.1 Create `apps/server/src/services/dashscope.ts` — DashScope service class with methods: `generateText(params)` (Qwen), `generateImage(params)` (Wan text2img/img2img), `generateVideo(params)` (Wan text2video/img2video), `pollTask(taskId)`. Read API key from `DASHSCOPE_API_KEY` env var
- [x] 6.2 Create `apps/server/src/routes/nodeRoutes.ts` — implement `POST /api/node/prompt-enhancer/run`, `POST /api/node/image-generator/run`, `POST /api/node/video-generator/run`. Each route: validates input with Zod, calls DashScope service, returns `{output, duration_ms}`
- [x] 6.3 Create `apps/server/src/routes/uploadRoutes.ts` — implement `POST /api/upload/image` with multipart form handling, file validation (type, size ≤10MB), temp storage, returns `{imageId, url, width, height}`
- [x] 6.4 Create `apps/server/src/routes/pipelineRoutes.ts` — implement `POST /api/pipeline/run` (accept full graph, return runId) and `GET /api/pipeline/status/:runId` (SSE endpoint streaming node state changes and progress)
- [x] 6.5 Add Zod validation schemas in `packages/validators/` — define request/response schemas for all API endpoints: `PromptEnhancerRequest`, `ImageGeneratorRequest`, `VideoGeneratorRequest`, `PipelineRunRequest`, `ImageUploadResponse`
- [x] 6.6 Update `apps/server/src/app.ts` — register new route modules, add multipart middleware (multer), configure CORS for SSE
- [x] 6.7 Update `apps/server/.env.example` — add `DASHSCOPE_API_KEY=your_key_here`

## 7. Template Presets

- [x] 7.1 Create `apps/web/src/components/canvas/templates/types.ts` — define `PipelineTemplate` interface (id, name, description, thumbnail, nodes[], edges[])
- [x] 7.2 Create `apps/web/src/components/canvas/templates/ramadan-wishes.ts` — define Ramadan Wishes template with pre-configured TemplatePreset → PromptEnhancer → ImageGenerator, TextPrompt → TextOverlay, with Islamic art defaults
- [x] 7.3 Create `apps/web/src/components/canvas/templates/holiday-meme.ts` — define Holiday Memes template with TextPrompt → PromptEnhancer → ImageGenerator → TextOverlay → Preview → Export, pop-art/funny defaults
- [x] 7.4 Create `apps/web/src/components/canvas/templates/ai-pet.ts` — define AI Pet template with TextPrompt → PromptEnhancer → ImageGenerator → Preview → Export, cartoon/cute defaults
- [x] 7.5 Create `apps/web/src/components/canvas/templates/custom-avatar.ts` — define Custom Avatar template with ImageUpload + TextPrompt → PromptEnhancer → ImageGenerator(img2img) → Preview → Export, anime defaults
- [x] 7.6 Create `apps/web/src/components/canvas/templates/index.ts` — export all templates, blank canvas template, and `loadTemplate(templateId)` helper that returns nodes/edges
- [x] 7.7 Update `apps/web/src/pages/templates.astro` — replace current canvas-only layout with template gallery UI showing cards for each template + Blank Canvas option. Clicking a card navigates to canvas with template loaded via URL param

## 8. Integration & Toolbar Updates

- [x] 8.1 Update `FlowToolbar.tsx` — replace category order with new 5 categories (input, transform, generate, compose, output), update node type dropdowns with new 10 node types, add "▶ Run Pipeline" button, add template picker shortcut
- [x] 8.2 Create `hooks/useTemplateLoader.ts` — hook that reads template ID from URL params, loads template nodes/edges into canvas on mount
- [x] 8.3 Wire frontend execution to server API — update `execution/runner.ts` to call actual `POST /api/node/:type/run` endpoints with proper request bodies, handle response, parse output into `NodeOutput`
- [x] 8.4 Update `services/mockAI.ts` — keep as fallback when server is not available (dev mode without API key), add mock implementations for all new node types

## 9. Cleanup & Polish

- [x] 9.1 Remove old node type files — delete `TrendSeedNode`, `AITextGeneratorNode`, `HumorStyleNode`, `VariantBatchNode`, old `CanvasRenderNode`, old `ExportNode`, old `TextInputNode` and their drawer panels
- [x] 9.2 Remove old type definitions — clean up `types/node-types.ts` removing TrendSeedConfig, AITextGeneratorConfig, HumorStyleConfig, VariantBatchConfig, old CanvasRenderConfig, old ExportConfig
- [x] 9.3 Update `config/nodeTypes.ts` — remove old `NODE_TYPES` array, replace with new registry compatible with updated categories
- [x] 9.4 Verify build — run `pnpm build` to ensure no TypeScript errors or broken imports across the monorepo
- [x] 9.5 Manual smoke test — verify: canvas loads, nodes can be added from toolbar, typed connections validate correctly, drawer panels open and edit configs, template loading works from /templates page
