import type { CSSProperties } from 'react';
import type { NodeCategoryConfig } from '../config/nodeCategories';

export const createNodeStyles = (category: NodeCategoryConfig) => ({
  container: {
    minWidth: '280px',
    maxWidth: '320px',
    backgroundColor: '#1e1e2e',
    borderRadius: '12px',
    border: `2px solid ${category.borderColor}`,
    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${category.bgColor}`,
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif',
  } satisfies CSSProperties,

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: category.bgColor,
    borderBottom: `1px solid ${category.borderColor}`,
    cursor: 'pointer',
    userSelect: 'none',
  } satisfies CSSProperties,

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } satisfies CSSProperties,

  headerIcon: {
    fontSize: '18px',
  } satisfies CSSProperties,

  headerTitle: {
    color: category.color,
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.3px',
  } satisfies CSSProperties,

  expandIcon: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px',
    transition: 'transform 0.2s ease',
  } satisfies CSSProperties,

  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } satisfies CSSProperties,

  collapsedContent: {
    padding: '8px 16px',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '12px',
    fontStyle: 'italic',
  } satisfies CSSProperties,
});

// Form element styles
export const formStyles = {
  label: {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '11px',
    fontWeight: 500,
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } satisfies CSSProperties,

  input: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s, background-color 0.2s',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  textarea: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  select: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'rgba(255, 255, 255, 0.1)',
    outline: 'none',
    cursor: 'pointer',
  } satisfies CSSProperties,

  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } satisfies CSSProperties,

  sliderValue: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px',
    textAlign: 'right',
  } satisfies CSSProperties,

  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  } satisfies CSSProperties,

  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '12px',
  } satisfies CSSProperties,

  tagRemove: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    padding: '0',
    fontSize: '14px',
    lineHeight: 1,
  } satisfies CSSProperties,

  button: {
    padding: '10px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
  } satisfies CSSProperties,

  buttonPrimary: (color: string) =>
    ({
      padding: '10px 16px',
      backgroundColor: color,
      border: 'none',
      borderRadius: '8px',
      color: '#000',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    }) satisfies CSSProperties,

  presetButton: (isActive: boolean, color: string) =>
    ({
      padding: '6px 12px',
      backgroundColor: isActive ? `${color}20` : 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${isActive ? color : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '6px',
      color: isActive ? color : 'rgba(255, 255, 255, 0.6)',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }) satisfies CSSProperties,

  divider: {
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: '4px 0',
  } satisfies CSSProperties,

  outputPreview: {
    padding: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  } satisfies CSSProperties,

  outputItem: {
    padding: '8px 10px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '6px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '12px',
    marginBottom: '6px',
  } satisfies CSSProperties,

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  } satisfies CSSProperties,

  toggle: {
    position: 'relative',
    width: '44px',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } satisfies CSSProperties,

  toggleActive: (color: string) =>
    ({
      position: 'relative',
      width: '44px',
      height: '24px',
      backgroundColor: color,
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }) satisfies CSSProperties,

  toggleKnob: (isActive: boolean) =>
    ({
      position: 'absolute',
      top: '2px',
      left: isActive ? '22px' : '2px',
      width: '20px',
      height: '20px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      transition: 'left 0.2s',
    }) satisfies CSSProperties,
};

// Handle styles
export const handleStyles = {
  input: {
    width: '12px',
    height: '12px',
    backgroundColor: '#1e1e2e',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  output: {
    width: '12px',
    height: '12px',
    backgroundColor: '#1e1e2e',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
};
