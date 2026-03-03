import { useReactFlow } from '@xyflow/react';
import type { TranslateTextData, TranslateLang } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: TranslateTextData;
};

const SOURCE_LANGS: { value: TranslateLang; label: string }[] = [
  { value: 'auto', label: '🔍 Auto Detect' },
  { value: 'id', label: '🇮🇩 Indonesian' },
  { value: 'en', label: '🇬🇧 English' },
  { value: 'ar', label: '🇸🇦 Arabic' },
  { value: 'zh', label: '🇨🇳 Chinese' },
];

const TARGET_LANGS: { value: Exclude<TranslateLang, 'auto'>; label: string }[] = [
  { value: 'id', label: '🇮🇩 Indonesian' },
  { value: 'en', label: '🇬🇧 English' },
  { value: 'ar', label: '🇸🇦 Arabic' },
  { value: 'zh', label: '🇨🇳 Chinese' },
];

export function TranslateTextPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Source Language</label>
        <div className="flex flex-col gap-1.5">
          {SOURCE_LANGS.map((lang) => (
            <button
              key={lang.value}
              onClick={() => updateConfig({ sourceLang: lang.value })}
              className={`motion-lift motion-press focus-ring-orange py-2 px-3 rounded-xl border text-white cursor-pointer text-xs text-left transition-colors ${
                config.sourceLang === lang.value
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Target Language</label>
        <div className="flex flex-col gap-1.5">
          {TARGET_LANGS.map((lang) => (
            <button
              key={lang.value}
              onClick={() => updateConfig({ targetLang: lang.value })}
              className={`motion-lift motion-press focus-ring-orange py-2 px-3 rounded-xl border text-white cursor-pointer text-xs text-left transition-colors ${
                config.targetLang === lang.value
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
