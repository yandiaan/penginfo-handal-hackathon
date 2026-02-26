export type NodeKind = 'input' | 'output' | undefined;

export type NodeTypeConfig = {
  type: NodeKind;
  label: string;
  color: string;
};

export const NODE_TYPES: NodeTypeConfig[] = [
  { type: 'input', label: '▶ Input', color: '#4ade80' },
  { type: undefined, label: '⬡ Process', color: '#60a5fa' },
  { type: 'output', label: '⏹ Output', color: '#f87171' },
];
