import type { Node, Edge } from '@xyflow/react';

export interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string; // emoji or URL
  category: string;
  nodes: Node[];
  edges: Edge[];
}
