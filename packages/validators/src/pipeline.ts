import { z } from 'zod';

// --- Node execution request schemas ---

export const promptEnhancerRequestSchema = z.object({
  config: z.object({
    creativity: z.enum(['precise', 'balanced', 'creative']),
    contentType: z.enum(['wishes', 'meme', 'character', 'avatar', 'general']),
    tone: z.enum(['formal', 'casual', 'funny', 'heartfelt']),
    language: z.enum(['id', 'en', 'mixed']),
  }),
  inputs: z.object({
    text: z
      .object({
        type: z.literal('text'),
        data: z.object({ text: z.string() }),
      })
      .optional(),
    style: z
      .object({
        type: z.literal('style'),
        data: z.record(z.unknown()),
      })
      .optional(),
  }),
});

export type PromptEnhancerRequest = z.infer<typeof promptEnhancerRequestSchema>;

export const imageGeneratorRequestSchema = z.object({
  config: z.object({
    mode: z.enum(['text2img', 'img2img']),
    dimensions: z.enum([
      'square-1024',
      'portrait-768x1024',
      'landscape-1024x768',
      'story-576x1024',
    ]),
    steps: z.number().min(10).max(50),
    seed: z.number().nullable(),
  }),
  inputs: z.object({
    prompt: z
      .object({
        type: z.literal('prompt'),
        data: z.object({
          prompt: z.string(),
          negativePrompt: z.string().optional(),
        }),
      })
      .optional(),
    style: z.record(z.unknown()).optional(),
    image: z
      .object({
        type: z.literal('image'),
        data: z.object({ url: z.string() }),
      })
      .optional(),
  }),
});

export type ImageGeneratorRequest = z.infer<typeof imageGeneratorRequestSchema>;

export const videoGeneratorRequestSchema = z.object({
  config: z.object({
    mode: z.enum(['text2video', 'img2video']),
    duration: z.enum(['3s', '5s', '10s']),
    resolution: z.enum(['480p', '720p']),
    fps: z.union([z.literal(24), z.literal(30)]),
  }),
  inputs: z.object({
    prompt: z
      .object({
        type: z.literal('prompt'),
        data: z.object({
          prompt: z.string(),
          negativePrompt: z.string().optional(),
        }),
      })
      .optional(),
    style: z.record(z.unknown()).optional(),
    image: z
      .object({
        type: z.literal('image'),
        data: z.object({ url: z.string() }),
      })
      .optional(),
  }),
});

export type VideoGeneratorRequest = z.infer<typeof videoGeneratorRequestSchema>;

export const pipelineRunRequestSchema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      data: z.record(z.unknown()),
    }),
  ),
  edges: z.array(
    z.object({
      source: z.string(),
      target: z.string(),
      sourceHandle: z.string().optional(),
      targetHandle: z.string().optional(),
    }),
  ),
});

export type PipelineRunRequest = z.infer<typeof pipelineRunRequestSchema>;

export const imageUploadResponseSchema = z.object({
  imageId: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export type ImageUploadResponse = z.infer<typeof imageUploadResponseSchema>;
