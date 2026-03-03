import type { Node, NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { TemplatePresetData } from '../../types/node-types';

const TEMPLATE_LABELS: Record<string, string> = {
  'ramadan-wishes': 'Ramadan Wishes',
  'holiday-meme': 'Holiday Meme',
  'ai-pet': 'AI Pet',
  'custom-avatar': 'Custom Avatar',
  blank: 'Blank',
};

const TEMPLATE_ICONS: Record<string, string> = {
  'ramadan-wishes': '🌙',
  'holiday-meme': '😂',
  'ai-pet': '🐾',
  'custom-avatar': '🧑',
  blank: '⬜',
};

export function TemplatePresetNode({ data, selected }: NodeProps<Node<TemplatePresetData>>) {
  const { config } = data;
  const templateLabel = TEMPLATE_LABELS[config.template] ?? config.template;
  const templateIcon = TEMPLATE_ICONS[config.template] ?? '📋';

  return (
    <CompactNode
      nodeType="templatePreset"
      icon=""
      title={data.label}
      selected={selected}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[20px] flex-shrink-0">
          {templateIcon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-medium text-white/80 truncate">{templateLabel}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b]">
              {config.locale}
            </span>
            <span className="text-[9px] text-white/25">text + style out</span>
          </div>
        </div>
      </div>
    </CompactNode>
  );
}
