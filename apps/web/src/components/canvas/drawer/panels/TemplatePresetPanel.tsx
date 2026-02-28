import { useReactFlow } from '@xyflow/react';
import type { TemplatePresetData, TemplateId } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: TemplatePresetData;
};

const TEMPLATES: { id: TemplateId; label: string; icon: string; description: string }[] = [
  {
    id: 'ramadan-wishes',
    label: 'Ramadan Wishes',
    icon: '🕌',
    description: 'Islamic-themed greeting cards',
  },
  {
    id: 'holiday-meme',
    label: 'Holiday Meme',
    icon: '🎉',
    description: 'Funny holiday meme creator',
  },
  { id: 'ai-pet', label: 'AI Pet', icon: '🐾', description: 'Virtual pet character design' },
  {
    id: 'custom-avatar',
    label: 'Custom Avatar',
    icon: '👤',
    description: 'Personalized digital avatar',
  },
  { id: 'blank', label: 'Blank Canvas', icon: '📄', description: 'Start from scratch' },
];

export function TemplatePresetPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Template</label>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => updateConfig({ template: t.id })}
              className={`rounded-lg py-3 px-2 cursor-pointer text-center border ${config.template === t.id ? 'border-green-400 bg-green-400/15' : 'border-white/10 bg-white/5'}`}
            >
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className="text-white text-xs font-medium">{t.label}</div>
              <div className="text-white/40 text-[10px] mt-0.5">{t.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Language</label>
        <div className="flex gap-2">
          {(['id', 'en'] as const).map((locale) => (
            <button
              key={locale}
              onClick={() => updateConfig({ locale })}
              className={`flex-1 p-2 rounded-md border text-white cursor-pointer text-[13px] ${config.locale === locale ? 'border-green-400 bg-green-400/15' : 'border-white/10 bg-white/5'}`}
            >
              {locale === 'id' ? '🇮🇩 Indonesian' : '🇬🇧 English'}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
