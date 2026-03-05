import type { CustomNodeType } from '../types/node-types';

/**
 * Hard limit on how many of each node type can exist in a single canvas.
 * undefined = unlimited.
 * Template preset loading bypasses these limits (only manual adds are blocked).
 */
export const NODE_CANVAS_LIMITS: Partial<Record<CustomNodeType, number>> = {
  // Video nodes — most expensive (~$0.50+/call)
  videoGenerator: 1,
  videoRepainting: 1,
  videoExtension: 1,

  // Image generation/edit nodes — moderate cost (~$0.04/call)
  imageGenerator: 2,
  inpainting: 2,
  imageUpscaler: 2,
  backgroundRemover: 2,
  backgroundReplacer: 2,
  faceCrop: 2,
  objectRemover: 2,
  styleTransfer: 2,

  // Text nodes are unlimited (cheap, ~$0.005/call)
};

export function getNodeCanvasLimit(type: CustomNodeType): number | null {
  return NODE_CANVAS_LIMITS[type] ?? null;
}
