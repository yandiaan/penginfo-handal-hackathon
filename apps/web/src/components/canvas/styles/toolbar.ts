import type React from 'react';

export const toolbarStyle: React.CSSProperties = {
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

export const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginRight: '4px',
  fontFamily: 'system-ui, sans-serif',
};

export const btnStyle: React.CSSProperties = {
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

export const dividerStyle: React.CSSProperties = {
  width: '1px',
  height: '20px',
  background: 'rgba(255,255,255,0.15)',
  margin: '0 4px',
};
