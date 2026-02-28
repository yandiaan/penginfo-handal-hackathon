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
import type { CustomNodeType, CustomNodeData } from '../types/node-types';
import { defaultConfigs } from '../types/node-types';
import { NODE_TYPE_CONFIGS } from '../config/nodeCategories';
import { validateConnection } from './useConnectionValidation';

// Create default node data for a given node type
function createDefaultNodeData(nodeType: CustomNodeType): CustomNodeData {
  const nodeConfig = NODE_TYPE_CONFIGS.find((c) => c.type === nodeType);
  const label = nodeConfig?.label || nodeType;

  const baseData = {
    label,
  };

  const config = defaultConfigs[nodeType];
  if (config) {
    return { ...baseData, config: { ...config } } as CustomNodeData;
  }
  return { ...baseData, config: {} } as unknown as CustomNodeData;
}

export function useFlowNodes() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, getNode } = useReactFlow();
  const idCounter = useRef(initialNodes.length + 1);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const { source, target, sourceHandle, targetHandle } = connection;
      if (!source || !target || !sourceHandle || !targetHandle) return;

      const sourceNode = getNode(source);
      const targetNode = getNode(target);
      if (!sourceNode?.type || !targetNode?.type) return;

      const valid = validateConnection(
        sourceNode.type as CustomNodeType,
        targetNode.type as CustomNodeType,
        sourceHandle,
        targetHandle,
      );

      if (valid) {
        setEdges((eds) => addEdge(connection, eds));
      }
    },
    [setEdges, getNode],
  );

  const addNode = useCallback(
    (type: CustomNodeType) => {
      const id = String(++idCounter.current);
      const position = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
      const data = createDefaultNodeData(type);
      const newNode: Node = {
        id,
        type,
        data,
        position,
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes],
  );

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
  } as const;
}
