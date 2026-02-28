/**
 * AI service facade — delegates AI operations to DashScope (Alibaba Model Studio).
 * Uses Qwen for text generation and Wan for image/video generation.
 */

import * as dashscope from '@/services/dashscope';

/**
 * Generate text using Qwen model.
 */
export async function generateText(params: {
  model?: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  temperature?: number;
  max_tokens?: number;
}): Promise<string> {
  return dashscope.generateText(params);
}

/**
 * Generate image using Wan model.
 * Returns a task ID for polling.
 */
export async function generateImage(params: {
  model?: string;
  prompt: string;
  negative_prompt?: string;
  size?: string;
  n?: number;
  steps?: number;
  seed?: number;
  ref_image_url?: string;
}): Promise<string> {
  return dashscope.generateImage(params);
}

/**
 * Generate video using Wan model.
 * Returns a task ID for polling.
 */
export async function generateVideo(params: {
  model?: string;
  prompt: string;
  negative_prompt?: string;
  duration?: string;
  resolution?: string;
  fps?: number;
  ref_image_url?: string;
}): Promise<string> {
  return dashscope.generateVideo(params);
}

/**
 * Poll a DashScope async task until completion.
 * Returns result URLs on success, throws on failure.
 */
export async function pollTask(
  taskId: string,
  maxAttempts?: number,
  intervalMs?: number,
): Promise<string[]> {
  return dashscope.pollTask(taskId, maxAttempts, intervalMs);
}
