## Context

The project is a monorepo (`pnpm` + `turbo`) with an Astro+React frontend (`apps/web`) and Express+Sequelize backend (`apps/server`). The canvas uses `@xyflow/react` for node-based visual editing. Currently, 7 node types exist but are display-only — no execution engine, no port typing, no AI integration. The mockAI service exists but is not wired to the pipeline. All node connections are unvalidated (any-to-any).

The target is a **webpage-based content generator** producing image/video content for Indonesian cultural contexts (Ramadan, Lebaran, etc.) using **Alibaba Model Studio** (Qwen for text/reasoning, Wan for image/video generation).

## Goals / Non-Goals

**Goals:**
- Replace existing 7 display-only nodes with 10 functional MVP nodes
- Implement typed port system with connection validation
- Build pipeline execution engine with topology sort and state management
- Integrate Alibaba Model Studio (Qwen + Wan) via server-side API routes
- Provide 4 template presets for quick-start workflows
- Support per-node run and full-pipeline run with SSE progress

**Non-Goals:**
- Monetization / payment system (deferred)
- User accounts / auth (deferred)
- MVP+ nodes (ColorPalette, ImageToText, TranslateText, BackgroundRemover, Inpainting, ImageUpscaler, FrameBorder, ColorFilter) — designed but not implemented in this change
- v2 nodes (FaceCrop, StickerLayer, CollageLayout, Watermark) — deferred
- VariantBatch / batch generation — deferred
- Real-time collaboration — deferred
- Mobile-optimized layout — deferred

## Decisions

### D1: Port type system implementation approach

**Decision**: Implement port types as a type registry with a compatibility matrix function.

```typescript
// Port type enum
type PortDataType = 'text' | 'prompt' | 'image' | 'video' | 'style' | 'media';

// Port definition on each node
interface PortDefinition {
  id: string;
  type: PortDataType;
  label: string;
  required: boolean;
}

// Static compatibility matrix
const COMPATIBILITY: Record<PortDataType, PortDataType[]> = {
  text:   ['text'],
  prompt: ['prompt'],
  image:  ['image', 'media'],
  video:  ['video', 'media'],
  style:  ['style'],
  media:  ['media'],
};

function isConnectionValid(sourceType: PortDataType, targetType: PortDataType): boolean {
  return COMPATIBILITY[sourceType]?.includes(targetType) ?? false;
}
```

**Rationale**: Static matrix is simple, predictable, and fast. No runtime type inference needed. Easy to extend when adding new port types in the future.

**Alternative considered**: Dynamic type coercion (auto-convert text→prompt, image→media). Rejected because it adds implicit behavior that makes pipelines harder to debug.

### D2: ReactFlow handle mapping for multiple typed ports

**Decision**: Use `Handle` components with `id` prop matching port definition IDs. Position handles vertically on node sides using CSS transforms.

```tsx
// Each port = one Handle with unique id
<Handle type="target" position={Position.Left} id="prompt" style={{ top: '33%', background: PORT_COLORS.prompt }} />
<Handle type="target" position={Position.Left} id="style" style={{ top: '66%', background: PORT_COLORS.style }} />
<Handle type="source" position={Position.Right} id="output" style={{ top: '50%', background: PORT_COLORS.image }} />
```

Connection validation via `onConnect` callback and `isValidConnection` prop on ReactFlow.

**Rationale**: ReactFlow natively supports multiple handles per node with `id` props. The `isValidConnection` callback is the official way to validate connections before they're created.

**Alternative considered**: Custom edge components with validation. Rejected — more complex, ReactFlow's built-in validation is sufficient.

### D3: Execution engine architecture — client-orchestrated, server-executed

**Decision**: The **frontend** owns the execution graph (topology sort, state management, execution ordering). The **server** is a stateless executor for individual nodes.

```
Frontend (orchestrator):           Server (executor):
┌──────────────────────────┐      ┌──────────────────────────┐
│ 1. Topology sort graph   │      │                          │
│ 2. Walk execution order  │ ───→ │ POST /api/node/:type/run │
│ 3. For each node:        │      │   - Validates input      │
│    - Collect input data  │      │   - Calls AI API         │
│    - POST to server      │ ←─── │   - Returns output       │
│    - Update node state   │      │                          │
│ 4. Pass output to next   │      │ (Stateless, one call     │
│                          │      │  per node execution)     │
└──────────────────────────┘      └──────────────────────────┘
```

**Rationale**: 
- Simpler server (stateless, no graph knowledge needed)
- Frontend has full control over execution flow and can update UI instantly
- No need for server-side graph storage or session management
- Per-node endpoints are independently testable
- Long-running operations (Wan) use polling: server returns `taskId`, frontend polls until complete

**Alternative considered**: Server-orchestrated (send full graph, server runs everything, streams back). Rejected for MVP — adds server complexity (state management, task queuing, recovery), and the frontend already has the graph in memory.

### D4: Node state management

**Decision**: Use a Zustand store (or React context + useReducer) separate from ReactFlow's node state for execution states. ReactFlow manages positions/connections, the execution store manages `idle/ready/running/done/error` and output data.

```typescript
interface NodeExecutionState {
  status: 'idle' | 'ready' | 'running' | 'done' | 'error';
  output: NodeOutput | null;     // result data after execution
  error: string | null;          // error message if failed
  progress: number | null;       // 0-100 for running nodes
  lastRunAt: number | null;      // timestamp
}

// Execution store (Zustand)
interface ExecutionStore {
  nodeStates: Record<string, NodeExecutionState>;
  setNodeState: (nodeId: string, state: Partial<NodeExecutionState>) => void;
  getNodeOutput: (nodeId: string) => NodeOutput | null;
  resetPipeline: () => void;
}
```

**Rationale**: Separation of concerns. ReactFlow manages visual state (position, selection, connections). Execution store manages pipeline state. This prevents interference between drag/drop operations and execution updates.

**Alternative considered**: Store execution state in ReactFlow's node `data` field. Rejected — causes excessive re-renders of all nodes when any execution state changes, and mixes presentation with execution concerns.

### D5: Alibaba Model Studio API integration pattern

**Decision**: Use direct HTTP REST calls to DashScope API (not SDK) for simplicity. Wrap in a service layer with typed interfaces.

```typescript
// Server: src/services/dashscope.ts
class DashScopeService {
  async generateText(params: QwenRequest): Promise<QwenResponse>;
  async describeImage(image: Buffer, config: VLConfig): Promise<string>;
  async generateImage(params: WanImageRequest): Promise<WanImageResponse>;
  async generateVideo(params: WanVideoRequest): Promise<WanVideoResponse>;
  async pollTask(taskId: string): Promise<TaskStatus>;
}
```

Wan image/video generation is async:
1. Submit generation request → get `taskId`
2. Poll `GET /tasks/:taskId` every 2-3 seconds
3. When complete, retrieve result URL

**Rationale**: REST calls are simpler than SDK, fewer dependencies, easier to debug. The DashScope API is well-documented REST. Polling is simpler than WebSocket for async tasks.

**Alternative considered**: Official `@alicloud/dashscope` SDK. Evaluated but adds dependency weight and may not be necessary for 4 endpoints.

### D6: Node data flow — typed output containers

**Decision**: Each node produces a `NodeOutput` object that carries typed data through edges.

```typescript
interface NodeOutput {
  type: PortDataType;
  data: TextData | ImageData | VideoData | StyleData | PromptData;
  timestamp: number;
}

interface TextData { text: string; }
interface PromptData { prompt: string; negativePrompt?: string; }
interface ImageData { url: string; width: number; height: number; blob?: Blob; }
interface VideoData { url: string; duration: number; width: number; height: number; }
interface StyleData { artStyle: string; colorPalette: string[]; mood: string; culturalTheme: string | null; }
```

**Rationale**: Typed output containers make it safe to read data from upstream nodes. Each node knows exactly what data shape to expect from each input port type.

### D7: Template presets — JSON-serialized pipeline configs

**Decision**: Templates are static JSON files defining nodes (type, position, config) and edges. Stored in `apps/web/src/components/canvas/templates/`.

```typescript
interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  nodes: Array<{ id: string; type: CustomNodeType; position: {x, y}; data: NodeData; }>;
  edges: Array<{ id: string; source: string; sourceHandle: string; target: string; targetHandle: string; }>;
}
```

Loading a template = replacing current canvas nodes/edges with template's.

**Rationale**: JSON templates are easy to author, version, and extend. No runtime generation needed. Static files can be lazy-loaded.

## Risks / Trade-offs

- **[Risk: Wan API latency]** Image generation may take 10-30s, video 30-120s. → Mitigation: Progress polling with visual feedback (progress bar on node). Cancel button for long-running jobs.
- **[Risk: API costs]** Each pipeline run calls Qwen + Wan = paid API calls. → Mitigation: Show estimated cost before run. Implement per-node run so users iterate cheaply on PromptEnhancer before committing to image generation.
- **[Risk: Breaking change to existing canvas]** All 7 existing node types are removed. → Mitigation: This is intentional — existing nodes are display-only and non-functional. No user data to migrate.
- **[Risk: Client-side orchestration reliability]** If user closes tab during pipeline run, execution is lost. → Mitigation: Acceptable for MVP. Server-side orchestration can be added in v2 if needed.
- **[Trade-off: Stateless server]** Server doesn't know about pipeline graph — can't optimize execution order. → Acceptable: frontend handles ordering, server stays simple.
- **[Trade-off: No caching]** Same prompt generates different results each time. → Acceptable for MVP. Seed parameter provides reproducibility when needed.
