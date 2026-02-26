import { ReactFlowProvider } from '@xyflow/react';
import { FlowCanvasInner } from './FlowCanvas';

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
