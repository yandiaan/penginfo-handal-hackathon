## ADDED Requirements

### Requirement: Qwen text API integration for prompt enhancement
The server SHALL integrate with Alibaba Model Studio's Qwen text model (qwen-plus or qwen-max) via the DashScope API. The integration SHALL accept a raw text input, optional style context, and content type hint, and return an optimized prompt suitable for Wan image/video generation. The API key SHALL be read from `DASHSCOPE_API_KEY` environment variable.

#### Scenario: Prompt enhancement succeeds
- **WHEN** the server receives a prompt enhancement request with text "kucing orange pakai kacamata" and contentType "character"
- **THEN** the server SHALL call Qwen API with a system prompt for image prompt engineering and return an enhanced English prompt describing the visual scene in detail

#### Scenario: API key missing
- **WHEN** the server attempts to call Qwen but `DASHSCOPE_API_KEY` is not set
- **THEN** the server SHALL return HTTP 500 with error message "DASHSCOPE_API_KEY not configured"

#### Scenario: Qwen API rate limit or error
- **WHEN** the Qwen API returns a rate limit (429) or server error (5xx)
- **THEN** the server SHALL retry once after 2 seconds, and if still failing, return HTTP 502 with the upstream error message

### Requirement: Qwen-VL integration for image-to-text
The server SHALL integrate with Qwen-VL (vision-language model) for describing uploaded images. The integration SHALL accept an image (as base64 or URL) and return a text description. Config options: `descriptionType` (detailed|brief|tags) and `focus` (general|face|style|mood).

#### Scenario: Image description succeeds
- **WHEN** the server receives an image and descriptionType "detailed"
- **THEN** it SHALL call Qwen-VL and return a multi-sentence description of the image contents, composition, and visual characteristics

#### Scenario: Brief description mode
- **WHEN** descriptionType is "brief"
- **THEN** the server SHALL return a 1-2 sentence summary of the image

### Requirement: Wan image generation integration
The server SHALL integrate with Alibaba's Wan model for image generation. The integration SHALL support two modes: `text2img` (prompt → image) and `img2img` (prompt + reference image → image). Parameters SHALL include: `prompt` (string), `dimensions` (width×height), `steps` (number), `seed` (number|null), and `referenceImage` (base64|null for img2img). The server SHALL return the generated image as a URL or base64 data.

#### Scenario: Text-to-image generation
- **WHEN** the server receives a text2img request with prompt and dimensions square-1024
- **THEN** it SHALL call the Wan image API and return the generated image data within 30 seconds

#### Scenario: Image-to-image generation
- **WHEN** the server receives an img2img request with prompt and referenceImage
- **THEN** it SHALL call the Wan img2img API and return a stylized version of the reference image

#### Scenario: Generation progress reporting
- **WHEN** an image generation is in progress
- **THEN** the server SHALL poll the async task status and emit progress percentage via the SSE channel

### Requirement: Wan video generation integration
The server SHALL integrate with Alibaba's Wan model for video generation. The integration SHALL support: `text2video` (prompt → video) and `img2video` (prompt + image → video). Parameters SHALL include: `prompt` (string), `duration` (3s|5s|10s), `resolution` (480p|720p), `fps` (24|30), `referenceImage` (base64|null). The server SHALL return the generated video as a URL.

#### Scenario: Text-to-video generation
- **WHEN** the server receives a text2video request with prompt and duration 5s
- **THEN** it SHALL call the Wan video API and return the generated video URL

#### Scenario: Image-to-video generation
- **WHEN** the server receives an img2video request with a reference image
- **THEN** it SHALL call the Wan img2video API using the image as the first frame and return the generated video URL

#### Scenario: Long-running video generation
- **WHEN** a video generation takes longer than 30 seconds
- **THEN** the server SHALL use async task polling (submit → poll status → retrieve result) and stream progress to the client via SSE

### Requirement: Server API route structure
The server SHALL expose the following REST endpoints:
- `POST /api/node/prompt-enhancer/run` — execute PromptEnhancer (Qwen)
- `POST /api/node/image-generator/run` — execute ImageGenerator (Wan)
- `POST /api/node/video-generator/run` — execute VideoGenerator (Wan)
- `POST /api/pipeline/run` — execute full pipeline (accepts graph topology + node configs)
- `GET /api/pipeline/status/:runId` — SSE stream for pipeline progress

All endpoints SHALL validate request body with Zod schemas. All AI-calling endpoints SHALL require `DASHSCOPE_API_KEY` to be configured.

#### Scenario: Single node execution endpoint
- **WHEN** the frontend calls `POST /api/node/prompt-enhancer/run` with `{text, style, config}`
- **THEN** the server SHALL execute the prompt enhancement and return `{output: {type: "prompt", data: "..."}, duration_ms: number}`

#### Scenario: Full pipeline execution endpoint
- **WHEN** the frontend calls `POST /api/pipeline/run` with the full graph (nodes, edges, configs)
- **THEN** the server SHALL return `{runId: string}` immediately and begin async execution, streaming progress on `GET /api/pipeline/status/:runId`

### Requirement: Image upload handling
The server SHALL accept image uploads via multipart form data on `POST /api/upload/image`. Uploaded images SHALL be validated for: file type (jpg, png, webp), file size (max 10MB), and dimensions. Images SHALL be stored temporarily for the duration of the pipeline run and cleaned up after export.

#### Scenario: Valid image upload
- **WHEN** a user uploads a 5MB JPEG image
- **THEN** the server SHALL accept it, store it temporarily, and return `{imageId: string, url: string, width: number, height: number}`

#### Scenario: Image too large
- **WHEN** a user uploads a 15MB image
- **THEN** the server SHALL reject with HTTP 413 and error "Image exceeds 10MB limit"
