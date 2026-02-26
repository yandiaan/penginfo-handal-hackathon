import type { CSSProperties } from 'react';

export const drawerStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '380px',
    backgroundColor: 'rgba(20, 20, 30, 0.98)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, system-ui, sans-serif',
    transform: 'translateX(0)',
    transition: 'transform 0.3s ease',
  } satisfies CSSProperties,

  hidden: {
    transform: 'translateX(100%)',
  } satisfies CSSProperties,

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  } satisfies CSSProperties,

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  } satisfies CSSProperties,

  headerIcon: {
    fontSize: '24px',
  } satisfies CSSProperties,

  headerTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
  } satisfies CSSProperties,

  headerSubtitle: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: '2px',
  } satisfies CSSProperties,

  closeButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } satisfies CSSProperties,

  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  } satisfies CSSProperties,

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } satisfies CSSProperties,

  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } satisfies CSSProperties,

  footer: {
    padding: '16px 24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    gap: '12px',
  } satisfies CSSProperties,

  deleteButton: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    border: '1px solid rgba(248, 113, 113, 0.3)',
    borderRadius: '8px',
    color: '#f87171',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } satisfies CSSProperties,
};

// Form styles specific to drawer
export const drawerFormStyles = {
  label: {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '8px',
  } satisfies CSSProperties,

  input: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, background-color 0.2s',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  textarea: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  select: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } satisfies CSSProperties,

  sliderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } satisfies CSSProperties,

  sliderValue: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '13px',
    fontWeight: 500,
  } satisfies CSSProperties,

  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.1)',
    outline: 'none',
    cursor: 'pointer',
  } satisfies CSSProperties,

  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.3)',
    marginTop: '4px',
  } satisfies CSSProperties,

  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  } satisfies CSSProperties,

  optionButton: (isActive: boolean, color: string) =>
    ({
      padding: '10px 16px',
      backgroundColor: isActive ? `${color}20` : 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${isActive ? color : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '8px',
      color: isActive ? color : 'rgba(255, 255, 255, 0.6)',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      flex: '1 1 calc(50% - 4px)',
      minWidth: '100px',
    }) satisfies CSSProperties,

  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  } satisfies CSSProperties,

  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
  } satisfies CSSProperties,

  tagRemove: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    padding: '0',
    fontSize: '16px',
    lineHeight: 1,
  } satisfies CSSProperties,

  toggle: (isActive: boolean, color: string) =>
    ({
      position: 'relative',
      width: '48px',
      height: '26px',
      backgroundColor: isActive ? color : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '13px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }) satisfies CSSProperties,

  toggleKnob: (isActive: boolean) =>
    ({
      position: 'absolute',
      top: '3px',
      left: isActive ? '25px' : '3px',
      width: '20px',
      height: '20px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      transition: 'left 0.2s',
    }) satisfies CSSProperties,

  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
  } satisfies CSSProperties,

  toggleLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
  } satisfies CSSProperties,

  actionButton: (color: string) =>
    ({
      width: '100%',
      padding: '14px 20px',
      backgroundColor: color,
      border: 'none',
      borderRadius: '10px',
      color: '#000',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    }) satisfies CSSProperties,

  outputPreview: {
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  } satisfies CSSProperties,

  outputItem: {
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    marginBottom: '8px',
  } satisfies CSSProperties,

  divider: {
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: '8px 0',
  } satisfies CSSProperties,
};
