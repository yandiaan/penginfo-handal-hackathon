import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { TemplatePresetData } from '../../types/node-types';

const TEMPLATE_LABELS: Record<string, string> = {
  'ramadan-wishes': '🕌 Ramadan Wishes',
  'holiday-meme': '🎉 Holiday Meme',
  'ai-pet': '🐾 AI Pet',
  'custom-avatar': '👤 Custom Avatar',
  blank: '📄 Blank',
};

export function TemplatePresetNode({ data, selected }: NodeProps<TemplatePresetData>) {
  const { config } = data;
  const templateLabel = TEMPLATE_LABELS[config.template] ?? config.template;

  return (
    <CompactNode
      nodeType="templatePreset"
      icon="📋"
      title={data.label}
      subtitle={`${templateLabel} · ${config.locale.toUpperCase()}`}
      selected={selected}
    />
  );
}
