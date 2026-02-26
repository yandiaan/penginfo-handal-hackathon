import { useState, useCallback } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  SelectionMode,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowNodes } from './hooks/useFlowNodes';
import { useMouseMode } from './hooks/useMouseMode';
import { FlowToolbar } from './FlowToolbar';
import { nodeTypes } from './nodes';
import { NodeDetailDrawer } from './drawer/NodeDetailDrawer';
import type { CustomNodeData } from './types/node-types';

export function FlowCanvasInner() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useFlowNodes();
  const { mode, setMode } = useMouseMode();
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(null);

  const handleNodeClick: NodeMouseHandler<Node<CustomNodeData>> = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Keep drawer in sync with node data changes
  const currentSelectedNode = selectedNode
    ? nodes.find((n) => n.id === selectedNode.id) || null
    : null;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
        panOnDrag={mode === 'pan'}
        selectionOnDrag={mode === 'select'}
        selectionMode={SelectionMode.Partial}
        panOnScroll={mode === 'select'}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <FlowToolbar mode={mode} onModeChange={setMode} onAddNode={addNode} />
      </ReactFlow>

      {/* Node Detail Drawer */}
      <NodeDetailDrawer
        selectedNode={currentSelectedNode as Node<CustomNodeData> | null}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
