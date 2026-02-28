// Mock AI service for generating placeholder content
// Used as fallback when server/API key is not available

import type { NodeOutput } from '../types/port-types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ENHANCED_PROMPTS: Record<string, string[]> = {
  wishes: [
    'A serene Ramadan night scene with golden crescent moon over a mosque, intricate Islamic geometric patterns in the sky, warm lantern light, greeting card composition, elegant Arabic calligraphy border',
    'Beautiful Eid Mubarak celebration scene, joyful family gathering, traditional Indonesian batik elements, warm golden lighting, festive atmosphere, photorealistic rendering',
  ],
  meme: [
    'Expressive cartoon character with exaggerated surprised face, holding an empty wallet, Indonesian street food stall background, vibrant pop art colors, comic book style',
    'Funny illustration of a person sleeping through sahur alarm, comedic facial expression, bedroom scene with multiple alarm clocks, bright colorful cartoon style',
  ],
  character: [
    'Adorable fantasy cat creature with butterfly wings, soft pastel watercolor style, big sparkling eyes, fluffy fur with rainbow highlights, magical forest background, kawaii aesthetic',
    'Cute baby dragon character with tiny wings, sitting on a cloud, wearing a small crown, soft gradient colors, chibi art style, adorable expression',
  ],
  avatar: [
    'Anime-style portrait, detailed eyes with light reflection, soft shading, clean linework, pastel color palette, slight smile, flowing hair, studio Ghibli inspired',
    'Modern digital avatar, stylized proportions, vibrant neon accents, clean vector art style, confident expression, trendy hairstyle',
  ],
  general: [
    'High quality digital artwork, detailed composition, professional lighting, vibrant colors, trending on artstation, masterpiece quality',
    'Beautiful scenic illustration, atmospheric lighting, rich details, cinematic composition, concept art quality',
  ],
};

export const mockAI = {
  /**
   * Mock prompt enhancement (simulates Qwen)
   */
  enhancePrompt: async (text: string, contentType: string): Promise<NodeOutput> => {
    await delay(600 + Math.random() * 400);
    const prompts = ENHANCED_PROMPTS[contentType] || ENHANCED_PROMPTS.general;
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    return {
      type: 'prompt',
      data: {
        prompt: `${prompt}. Based on: ${text.slice(0, 50)}`,
        negativePrompt: 'low quality, blurry, text',
      },
      timestamp: Date.now(),
    };
  },

  /**
   * Mock image generation (simulates Wan)
   */
  generateImage: async (_prompt: string, dimensions: string): Promise<NodeOutput> => {
    await delay(1500 + Math.random() * 500);
    const [w, h] = (dimensions || '1024*1024').split('*').map(Number);
    return {
      type: 'image',
      data: {
        url: `https://via.placeholder.com/${w || 1024}x${h || 1024}/1e1e2e/4ade80?text=AI+Generated`,
        width: w || 1024,
        height: h || 1024,
      },
      timestamp: Date.now(),
    };
  },

  /**
   * Mock video generation (simulates Wan)
   */
  generateVideo: async (_prompt: string, duration: string): Promise<NodeOutput> => {
    await delay(2000 + Math.random() * 1000);
    const dur = parseInt(duration) || 5;
    return {
      type: 'video',
      data: {
        url: 'https://via.placeholder.com/1280x720/1e1e2e/f472b6?text=AI+Video',
        duration: dur,
        width: 1280,
        height: 720,
      },
      timestamp: Date.now(),
    };
  },
};
