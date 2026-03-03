import type { Node, NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { StyleConfigData } from '../../types/node-types';

const STYLE_ICONS: Record<string, string> = {
  realistic: '📷',
  cartoon: '🎠',
  anime: '✨',
  watercolor: '🎨',
  'pixel-art': '🔲',
  'islamic-art': '✴️',
  'pop-art': '💥',
  minimalist: '□',
};
const MOOD_COLORS: Record<string, string> = {
  warm: '#fb923c',
  cool: '#60a5fa',
  playful: '#f472b6',
  elegant: '#e2e8f0',
  spiritual: '#a78bfa',
  funny: '#fbbf24',
  cute: '#f9a8d4',
};

export function StyleConfigNode({ data, selected }: NodeProps<Node<StyleConfigData>>) {
  const { config } = data;
  const moodColor = MOOD_COLORS[config.mood] ?? '#f59e0b';

  return (
    <CompactNode nodeType="styleConfig" icon="" title={data.label} selected={selected}>
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="text-[22px] leading-none shrink-0">
          {STYLE_ICONS[config.artStyle] ?? '🎨'}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium text-white/70 capitalize leading-tight">
            {config.artStyle.replace('-', ' ')}
          </div>
          <span
            className="text-[9px] font-semibold capitalize px-1.5 py-px rounded-full inline-block mt-0.5"
            style={{ color: moodColor, backgroundColor: moodColor + '20' }}
          >
            {config.mood}
          </span>
        </div>
        {config.culturalTheme && (
          <span
            className="text-[9px] px-1.5 py-0.5 rounded shrink-0"
            style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}
          >
            {config.culturalTheme}
          </span>
        )}
      </div>
      {config.colorPalette.length > 0 ? (
        <div className="flex rounded-lg overflow-hidden h-3">
          {config.colorPalette.slice(0, 8).map((color, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      ) : (
        <div
          className="h-3 rounded-lg border border-dashed border-white/10 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <span className="text-[8px] text-white/20">no palette</span>
        </div>
      )}
    </CompactNode>
  );
}
