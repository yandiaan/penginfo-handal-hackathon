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

// Create default node data for a given node type
function createDefaultNodeData(nodeType: CustomNodeType): CustomNodeData {
  const nodeConfig = NODE_TYPE_CONFIGS.find((c) => c.type === nodeType);
  const label = nodeConfig?.label || nodeType;

  const baseData = {
    label,
    isExpanded: true,
  };

  switch (nodeType) {
    case 'trendSeed':
      return { ...baseData, config: { ...defaultConfigs.trendSeed } };
    case 'textInput':
      return { ...baseData, config: { ...defaultConfigs.textInput } };
    case 'aiTextGenerator':
      return { ...baseData, config: { ...defaultConfigs.aiTextGenerator } };
    case 'humorStyle':
      return { ...baseData, config: { ...defaultConfigs.humorStyle } };
    case 'variantBatch':
      return { ...baseData, config: { ...defaultConfigs.variantBatch } };
    case 'canvasRender':
      return { ...baseData, config: { ...defaultConfigs.canvasRender } };
    case 'export':
      return { ...baseData, config: { ...defaultConfigs.export } };
    default:
      return { ...baseData, config: {} };
  }
}

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

  return { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } as const;
}
