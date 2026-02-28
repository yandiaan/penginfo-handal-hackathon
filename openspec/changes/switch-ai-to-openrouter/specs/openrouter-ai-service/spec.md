## ADDED Requirements

### Requirement: OpenRouter text generation
The system SHALL provide text generation via OpenRouter API using the `@openrouter/sdk` package with the `callModel` pattern. The service MUST accept the same message format as the existing DashScope `generateText` function (role, content, temperature, max_tokens).

#### Scenario: Successful text generation via OpenRouter
- **WHEN** `OPENROUTER_API_KEY` environment variable is set and `generateText` is called with messages
- **THEN** the system calls OpenRouter's `callModel` with the configured text model and returns the generated text string

#### Scenario: Text model selection
- **WHEN** `OPENROUTER_TEXT_MODEL` environment variable is set
- **THEN** the system uses that model for text generation
- **WHEN** `OPENROUTER_TEXT_MODEL` is not set
- **THEN** the system uses a default free model (e.g., `meta-llama/llama-3.1-8b-instruct:free`)

#### Scenario: Text generation error handling
- **WHEN** OpenRouter API returns an error (401, 402, 429, 5xx)
- **THEN** the system throws an error with a descriptive message including the status code

### Requirement: OpenRouter image generation
The system SHALL provide image generation via OpenRouter's OpenAI-compatible images endpoint. The service MUST accept prompt, negative_prompt, and size parameters matching the existing DashScope `generateImage` interface.

#### Scenario: Successful image generation via OpenRouter
- **WHEN** `OPENROUTER_API_KEY` is set and `generateImage` is called with a prompt
- **THEN** the system calls OpenRouter's `/v1/images/generations` endpoint and returns the generated image URL directly (no polling required)

#### Scenario: Image model selection
- **WHEN** `OPENROUTER_IMAGE_MODEL` environment variable is set
- **THEN** the system uses that model for image generation
- **WHEN** `OPENROUTER_IMAGE_MODEL` is not set
- **THEN** the system uses a default image model (e.g., `openai/dall-e-3`)

#### Scenario: Image generation not supported
- **WHEN** the OpenRouter image endpoint returns a 404 or unsupported model error
- **THEN** the system throws an error with message indicating image generation is not available via OpenRouter

### Requirement: OpenRouter video generation fallback
The system SHALL attempt video generation via DashScope as fallback when OpenRouter is the primary provider, since OpenRouter does not natively support video generation.

#### Scenario: Video generation with DashScope fallback
- **WHEN** `OPENROUTER_API_KEY` is set as primary provider AND `DASHSCOPE_API_KEY` is also set AND `generateVideo` is called
- **THEN** the system delegates video generation to DashScope service

#### Scenario: Video generation unavailable
- **WHEN** `OPENROUTER_API_KEY` is set as primary provider AND `DASHSCOPE_API_KEY` is NOT set AND `generateVideo` is called
- **THEN** the system throws an error with message: "Video generation requires DASHSCOPE_API_KEY — not supported via OpenRouter"

### Requirement: AI service provider selection
The system SHALL provide a unified `ai-service.ts` module that exports `generateText`, `generateImage`, `generateVideo`, and `pollTask` functions. Provider selection MUST be automatic based on environment variables.

#### Scenario: OpenRouter as primary provider
- **WHEN** `OPENROUTER_API_KEY` environment variable is set
- **THEN** the system uses OpenRouter for text and image generation, DashScope fallback for video (if available)

#### Scenario: DashScope as provider
- **WHEN** `OPENROUTER_API_KEY` is NOT set AND `DASHSCOPE_API_KEY` is set
- **THEN** the system uses DashScope for all AI operations (existing behavior)

#### Scenario: No provider configured
- **WHEN** neither `OPENROUTER_API_KEY` nor `DASHSCOPE_API_KEY` is set
- **THEN** the system throws a configuration error on any AI function call

### Requirement: Environment variables for OpenRouter
The system SHALL support the following environment variables for OpenRouter configuration.

#### Scenario: Required environment variable
- **WHEN** OpenRouter is selected as provider
- **THEN** `OPENROUTER_API_KEY` MUST be set, otherwise throw an error

#### Scenario: Optional model override variables
- **WHEN** `OPENROUTER_TEXT_MODEL`, `OPENROUTER_IMAGE_MODEL`, or `OPENROUTER_VIDEO_MODEL` are set
- **THEN** the system uses those values as model identifiers for the respective operations
- **WHEN** these variables are NOT set
- **THEN** the system uses sensible defaults

### Requirement: Route import compatibility
The `nodeRoutes.ts` file SHALL import AI functions from `@/services/ai-service` instead of `@/services/dashscope`. The exported function signatures MUST remain identical to the existing DashScope exports.

#### Scenario: Seamless route migration
- **WHEN** `nodeRoutes.ts` imports from `@/services/ai-service`
- **THEN** all existing route handlers (`/prompt-enhancer/run`, `/image-generator/run`, `/video-generator/run`) continue to work without any changes to their logic
