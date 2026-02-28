import { useEffect, useRef } from 'react';
import type { Node, Edge } from '@xyflow/react';
import { loadTemplate } from '../templates';

/**
 * Hook that reads template ID from URL params and loads
 * template nodes/edges into the canvas on mount.
 */
export function useTemplateLoader(
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    const params = new URLSearchParams(window.location.search);
    const templateId = params.get('template');

    if (templateId) {
      const { nodes, edges } = loadTemplate(templateId);
      if (nodes.length > 0) {
        setNodes(nodes);
        setEdges(edges);
        loaded.current = true;
      }
    }
  }, [setNodes, setEdges]);
}
