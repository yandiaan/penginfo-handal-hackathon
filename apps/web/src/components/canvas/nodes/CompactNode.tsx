import { Handle, Position } from '@xyflow/react';
import type { ReactNode, CSSProperties } from 'react';
import { getCategoryForNodeType } from '../config/nodeCategories';
import type { CustomNodeType } from '../types/node-types';

export interface CompactNodeProps {
  nodeType: CustomNodeType;
  icon: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  inputs?: number;
  outputs?: number;
  selected?: boolean;
}

export function CompactNode({
  nodeType,
  icon,
  title,
  subtitle,
  children,
  inputs = 1,
  outputs = 1,
  selected = false,
}: CompactNodeProps) {
  const category = getCategoryForNodeType(nodeType);

  const containerStyle: CSSProperties = {
    minWidth: '180px',
    maxWidth: '220px',
    backgroundColor: '#1e1e2e',
    borderRadius: '12px',
    border: `2px solid ${selected ? category.color : category.borderColor}`,
    boxShadow: selected
      ? `0 0 0 2px ${category.color}40, 0 4px 20px rgba(0, 0, 0, 0.3)`
      : `0 4px 20px rgba(0, 0, 0, 0.3)`,
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif',
    cursor: 'pointer',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    backgroundColor: category.bgColor,
  };

  const iconStyle: CSSProperties = {
    fontSize: '20px',
  };

  const titleContainerStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const titleStyle: CSSProperties = {
    color: category.color,
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const subtitleStyle: CSSProperties = {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '11px',
    marginTop: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const contentStyle: CSSProperties = {
    padding: '10px 16px 14px',
    borderTop: `1px solid ${category.borderColor}`,
  };

  return (
    <div style={containerStyle}>
      {/* Input handles */}
      {inputs > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#1e1e2e',
            border: `2px solid ${category.color}`,
          }}
        />
      )}

      {/* Header */}
      <div style={headerStyle}>
        <span style={iconStyle}>{icon}</span>
        <div style={titleContainerStyle}>
          <div style={titleStyle}>{title}</div>
          {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
        </div>
      </div>

      {/* Optional compact content preview */}
      {children && <div style={contentStyle}>{children}</div>}

      {/* Output handles */}
      {outputs > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#1e1e2e',
            border: `2px solid ${category.color}`,
          }}
        />
      )}
    </div>
  );
}
