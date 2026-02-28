import type { PipelineTemplate } from './types';
import { ramadanWishesTemplate } from './ramadan-wishes';
import { holidayMemeTemplate } from './holiday-meme';
import { aiPetTemplate } from './ai-pet';
import { customAvatarTemplate } from './custom-avatar';
import type { Node, Edge } from '@xyflow/react';

// Blank canvas template
export const blankTemplate: PipelineTemplate = {
  id: 'blank',
  name: 'Blank Canvas',
  description: 'Start from scratch with an empty canvas',
  thumbnail: '📄',
  category: 'general',
  nodes: [],
  edges: [],
};

// All available templates
export const ALL_TEMPLATES: PipelineTemplate[] = [
  ramadanWishesTemplate,
  holidayMemeTemplate,
  aiPetTemplate,
  customAvatarTemplate,
  blankTemplate,
];

// Template registry by ID
const templateMap = new Map(ALL_TEMPLATES.map((t) => [t.id, t]));

/**
 * Load a template by ID. Returns nodes and edges for the canvas.
 * Returns blank canvas if template not found.
 */
export function loadTemplate(templateId: string): { nodes: Node[]; edges: Edge[] } {
  const template = templateMap.get(templateId) || blankTemplate;
  return {
    nodes: structuredClone(template.nodes),
    edges: structuredClone(template.edges),
  };
}

export { ramadanWishesTemplate, holidayMemeTemplate, aiPetTemplate, customAvatarTemplate };
export type { PipelineTemplate } from './types';
