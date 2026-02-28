import { Router, type Router as RouterType } from 'express';
import { z } from 'zod';
import { generateText, generateImage, generateVideo, pollTask } from '@/services/dashscope';

const router: RouterType = Router();

// --- Prompt Enhancer ---
const promptEnhancerSchema = z.object({
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
        data: z.any(),
      })
      .optional(),
  }),
});

router.post('/prompt-enhancer/run', async (req, res, next) => {
  try {
    const startTime = Date.now();
    const { config, inputs } = promptEnhancerSchema.parse(req.body);

    const inputText = (inputs.text?.data as { text: string })?.text || '';
    const styleData = inputs.style?.data;

    const temperatureMap = { precise: 0.3, balanced: 0.7, creative: 1.0 };
    const temperature = temperatureMap[config.creativity];

    const systemPrompt = buildPromptEnhancerSystem(config, styleData);

    const enhancedText = await generateText({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: inputText },
      ],
      temperature,
      max_tokens: 1500,
    });

    res.json({
      output: {
        type: 'prompt',
        data: { prompt: enhancedText, negativePrompt: '' },
        timestamp: Date.now(),
      },
      duration_ms: Date.now() - startTime,
    });
  } catch (err) {
    next(err);
  }
});

function buildPromptEnhancerSystem(
  config: z.infer<typeof promptEnhancerSchema>['config'],
  styleData?: unknown,
): string {
  let prompt = `You are an expert AI image/video prompt engineer. 
Enhance the user's description into a detailed, high-quality prompt for image/video generation.
Content type: ${config.contentType}. Tone: ${config.tone}.`;

  if (config.language === 'id') {
    prompt +=
      '\nThe user writes in Indonesian. Output the prompt in English for the AI model, but keep Indonesian cultural references.';
  } else if (config.language === 'mixed') {
    prompt += '\nThe user may write in mixed Indonesian/English. Output the prompt in English.';
  }

  if (styleData && typeof styleData === 'object') {
    const s = styleData as Record<string, unknown>;
    if (s.artStyle) prompt += `\nArt style: ${s.artStyle}`;
    if (s.mood) prompt += `\nMood: ${s.mood}`;
    if (s.culturalTheme) prompt += `\nCultural theme: ${s.culturalTheme}`;
  }

  prompt += '\nOutput ONLY the enhanced prompt text, nothing else.';
  return prompt;
}

// --- Image Generator ---
const imageGeneratorSchema = z.object({
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
        data: z.object({ prompt: z.string(), negativePrompt: z.string().optional() }),
      })
      .optional(),
    style: z.any().optional(),
    image: z
      .object({
        type: z.literal('image'),
        data: z.object({ url: z.string() }),
      })
      .optional(),
  }),
});

const dimensionMap: Record<string, string> = {
  'square-1024': '1024*1024',
  'portrait-768x1024': '768*1024',
  'landscape-1024x768': '1024*768',
  'story-576x1024': '576*1024',
};

router.post('/image-generator/run', async (req, res, next) => {
  try {
    const startTime = Date.now();
    const { config, inputs } = imageGeneratorSchema.parse(req.body);

    const promptData = inputs.prompt?.data as
      | { prompt: string; negativePrompt?: string }
      | undefined;
    if (!promptData?.prompt) {
      res.status(400).json({ error: 'Prompt input required' });
      return;
    }

    const taskId = await generateImage({
      prompt: promptData.prompt,
      negative_prompt: promptData.negativePrompt,
      size: dimensionMap[config.dimensions] || '1024*1024',
      steps: config.steps,
      seed: config.seed ?? undefined,
      ref_image_url: (inputs.image?.data as { url: string })?.url,
    });

    const urls = await pollTask(taskId);
    const imageUrl = urls[0];
    if (!imageUrl) throw new Error('No image generated');

    const [w, h] = (dimensionMap[config.dimensions] || '1024*1024').split('*').map(Number);

    res.json({
      output: {
        type: 'image',
        data: { url: imageUrl, width: w, height: h },
        timestamp: Date.now(),
      },
      duration_ms: Date.now() - startTime,
    });
  } catch (err) {
    next(err);
  }
});

// --- Video Generator ---
const videoGeneratorSchema = z.object({
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
        data: z.object({ prompt: z.string(), negativePrompt: z.string().optional() }),
      })
      .optional(),
    style: z.any().optional(),
    image: z
      .object({
        type: z.literal('image'),
        data: z.object({ url: z.string() }),
      })
      .optional(),
  }),
});

router.post('/video-generator/run', async (req, res, next) => {
  try {
    const startTime = Date.now();
    const { config, inputs } = videoGeneratorSchema.parse(req.body);

    const promptData = inputs.prompt?.data as
      | { prompt: string; negativePrompt?: string }
      | undefined;
    if (!promptData?.prompt) {
      res.status(400).json({ error: 'Prompt input required' });
      return;
    }

    const durationNum = config.duration.replace('s', '');

    const taskId = await generateVideo({
      prompt: promptData.prompt,
      negative_prompt: promptData.negativePrompt,
      duration: durationNum,
      resolution: config.resolution,
      fps: config.fps,
      ref_image_url: (inputs.image?.data as { url: string })?.url,
    });

    const urls = await pollTask(taskId, 120, 5000); // Videos take longer
    const videoUrl = urls[0];
    if (!videoUrl) throw new Error('No video generated');

    const durationSec = parseInt(durationNum, 10);
    const [w, h] = config.resolution === '720p' ? [1280, 720] : [854, 480];

    res.json({
      output: {
        type: 'video',
        data: { url: videoUrl, duration: durationSec, width: w, height: h },
        timestamp: Date.now(),
      },
      duration_ms: Date.now() - startTime,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
