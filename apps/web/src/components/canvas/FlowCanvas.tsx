import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  SelectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowNodes } from './hooks/useFlowNodes';
import { useMouseMode } from './hooks/useMouseMode';
import { FlowToolbar } from './FlowToolbar';

export function FlowCanvasInner() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useFlowNodes();
  const { mode, setMode } = useMouseMode();

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
    </div>
  );
}
