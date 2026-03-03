import type { PortDataType } from '../types/port-types';

// Static compatibility matrix: source type → allowed target types
export const PORT_COMPATIBILITY: Record<PortDataType, PortDataType[]> = {
  text: ['text'],
  prompt: ['prompt', 'text'], // legacy: prompt outputs can feed text inputs
  image: ['image', 'media'],
  video: ['video', 'media'],
  style: ['style'],
  media: ['media'],
};

// Check if a connection from sourceType to targetType is valid
export function isConnectionValid(sourceType: PortDataType, targetType: PortDataType): boolean {
  return PORT_COMPATIBILITY[sourceType]?.includes(targetType) ?? false;
}
