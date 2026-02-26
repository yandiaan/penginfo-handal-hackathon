import { useCallback, useRef } from 'react';
import {
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Node,
  type OnConnect,
} from '@xyflow/react';
import { initialEdges, initialNodes } from '../config/initialElements';
import type { NodeKind } from '../config/nodeTypes';

export function useFlowNodes() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const idCounter = useRef(initialNodes.length + 1);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const addNode = useCallback(
    (type: NodeKind, label: string) => {
      const id = String(++idCounter.current);
      const position = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
      const newNode: Node = {
        id,
        type,
        data: { label: `${label} ${id}` },
        position,
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes],
  );

  return { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } as const;
}
