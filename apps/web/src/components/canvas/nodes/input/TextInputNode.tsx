import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { TextInputData } from '../../types/node-types';

export function TextInputNode({ data, selected }: NodeProps<TextInputData>) {
  const config = data.config;
  const charCount = config.text.length;
  const preview = config.text.slice(0, 30) || 'No text';
  const subtitle = charCount > 0 ? `${charCount} chars` : 'Empty';

  return (
    <CompactNode
      nodeType="textInput"
      icon="📝"
      title="Text Input"
      subtitle={subtitle}
      inputs={0}
      outputs={1}
      selected={selected}
    >
      <div
        style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '11px',
          fontStyle: config.text ? 'normal' : 'italic',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {preview}
        {config.text.length > 30 && '...'}
      </div>
    </CompactNode>
  );
}
