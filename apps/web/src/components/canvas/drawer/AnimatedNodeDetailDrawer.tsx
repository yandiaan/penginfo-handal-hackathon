import { useEffect, useRef, useState } from 'react';
import type { Node } from '@xyflow/react';
import type { CustomNodeData } from '../types/node-types';
import { NodeDetailDrawer } from './NodeDetailDrawer';

type Props = {
  selectedNode: Node<CustomNodeData> | null;
  onClose: () => void;
};

export function AnimatedNodeDetailDrawer({ selectedNode, onClose }: Props) {
  const [displayNode, setDisplayNode] = useState<Node<CustomNodeData> | null>(selectedNode);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (selectedNode) {
      setDisplayNode(selectedNode);
      setClosing(false);
      return;
    }

    if (displayNode) {
      setClosing(true);
      timerRef.current = window.setTimeout(() => {
        setDisplayNode(null);
        setClosing(false);
      }, 150);
    }
  }, [selectedNode, displayNode]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return <NodeDetailDrawer selectedNode={displayNode} onClose={onClose} closing={closing} />;
}
