import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type OnConnect,
  type Node,
  type Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    data: { label: 'Process A' },
    position: { x: 100, y: 200 },
  },
  {
    id: '3',
    data: { label: 'Process B' },
    position: { x: 400, y: 200 },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'End' },
    position: { x: 250, y: 350 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
];

const NODE_TYPES: { type: any | undefined; label: string; color: string }[] = [
  { type: 'input', label: '▶ Input', color: '#4ade80' },
  { type: undefined, label: '⬡ Process', color: '#60a5fa' },
  { type: 'output', label: '⏹ Output', color: '#f87171' },
];

function FlowCanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const idCounter = useRef(initialNodes.length + 1);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const addNode = useCallback(
    (type: any | undefined, label: string) => {
      const id = String(++idCounter.current);
      // place new node near the center of the visible viewport
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

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />

        <Panel position="top-center">
          <div style={toolbarStyle}>
            <span style={toolbarLabelStyle}>Add node</span>
            {NODE_TYPES.map(({ type, label, color }) => (
              <button
                key={label}
                onClick={() => addNode(type, label.replace(/^.+? /, ''))}
                style={{ ...btnStyle, borderColor: color, color }}
              >
                {label}
              </button>
            ))}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 14px',
  background: 'rgba(15, 15, 15, 0.85)',
  backdropFilter: 'blur(8px)',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
};

const toolbarLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginRight: '4px',
  fontFamily: 'system-ui, sans-serif',
};

const btnStyle: React.CSSProperties = {
  padding: '5px 12px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: 'system-ui, sans-serif',
  background: 'transparent',
  border: '1px solid',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.15s',
};

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
