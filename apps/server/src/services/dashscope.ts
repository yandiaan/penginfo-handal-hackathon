/**
 * DashScope (Alibaba Model Studio) service.
 * Integrates with Qwen for text generation and Wan for image/video generation.
 */

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY || '';
const DASHSCOPE_BASE_URL = 'https://dashscope.aliyuncs.com/api/v1';

interface QwenMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface QwenParams {
  model?: string;
  messages: QwenMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface WanImageParams {
  model?: string;
  prompt: string;
  negative_prompt?: string;
  size?: string;
  n?: number;
  steps?: number;
  seed?: number;
  ref_image_url?: string;
}

interface WanVideoParams {
  model?: string;
  prompt: string;
  negative_prompt?: string;
  duration?: string;
  resolution?: string;
  fps?: number;
  ref_image_url?: string;
}

interface TaskResponse {
  request_id: string;
  output: {
    task_id: string;
    task_status: string;
  };
}

interface TaskStatusResponse {
  request_id: string;
  output: {
    task_id: string;
    task_status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
    results?: Array<{ url: string }>;
    task_metrics?: {
      TOTAL: number;
      SUCCEEDED: number;
      FAILED: number;
    };
    message?: string;
  };
}

function getHeaders() {
  if (!DASHSCOPE_API_KEY) {
    throw new Error('DASHSCOPE_API_KEY not configured');
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${DASHSCOPE_API_KEY}`,
  };
}

function getAsyncHeaders() {
  return {
    ...getHeaders(),
    'X-DashScope-Async': 'enable',
  };
}

/**
 * Generate text using Qwen model.
 */
export async function generateText(params: QwenParams): Promise<string> {
  const model = params.model || 'qwen-max';
  const response = await fetch(`${DASHSCOPE_BASE_URL}/services/aigc/text-generation/generation`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      model,
      input: { messages: params.messages },
      parameters: {
        temperature: params.temperature ?? 0.7,
        max_tokens: params.max_tokens ?? 1500,
        result_format: 'message',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Qwen API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as Record<string, any>;
  return data.output?.choices?.[0]?.message?.content || '';
}

/**
 * Submit image generation task using Wan model.
 * Returns a task ID for polling.
 */
export async function generateImage(params: WanImageParams): Promise<string> {
  const model = params.model || 'wanx-v1';
  const body: Record<string, unknown> = {
    model,
    input: {
      prompt: params.prompt,
      negative_prompt: params.negative_prompt || '',
    },
    parameters: {
      size: params.size || '1024*1024',
      n: params.n || 1,
      steps: params.steps || 30,
      ...(params.seed != null && { seed: params.seed }),
    },
  };

  if (params.ref_image_url) {
    body.input = {
      ...(body.input as object),
      ref_img: params.ref_image_url,
    };
  }

  const response = await fetch(`${DASHSCOPE_BASE_URL}/services/aigc/text2image/image-synthesis`, {
    method: 'POST',
    headers: getAsyncHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Wan Image API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as TaskResponse;
  return data.output.task_id;
}

/**
 * Submit video generation task using Wan model.
 * Returns a task ID for polling.
 */
export async function generateVideo(params: WanVideoParams): Promise<string> {
  const model = params.model || 'wanx-v1';
  const body: Record<string, unknown> = {
    model,
    input: {
      prompt: params.prompt,
      negative_prompt: params.negative_prompt || '',
      ...(params.ref_image_url && { img_url: params.ref_image_url }),
    },
    parameters: {
      duration: params.duration || '5',
      resolution: params.resolution || '720p',
      fps: params.fps || 24,
    },
  };

  const response = await fetch(`${DASHSCOPE_BASE_URL}/services/aigc/video-synthesis/generation`, {
    method: 'POST',
    headers: getAsyncHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Wan Video API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as TaskResponse;
  return data.output.task_id;
}

/**
 * Poll a DashScope async task until completion.
 * Returns result URLs on success, throws on failure.
 */
export async function pollTask(
  taskId: string,
  maxAttempts = 60,
  intervalMs = 3000,
): Promise<string[]> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch(`${DASHSCOPE_BASE_URL}/tasks/${taskId}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Task poll error (${response.status})`);
    }

    const data = (await response.json()) as TaskStatusResponse;
    const status = data.output.task_status;

    if (status === 'SUCCEEDED') {
      return (data.output.results || []).map((r) => r.url);
    }

    if (status === 'FAILED') {
      throw new Error(`Task failed: ${data.output.message || 'Unknown error'}`);
    }

    // Still running — wait and retry
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Task ${taskId} timed out after ${maxAttempts} attempts`);
}
