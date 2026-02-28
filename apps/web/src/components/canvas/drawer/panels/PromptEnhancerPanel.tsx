import { useReactFlow } from '@xyflow/react';
import type {
  PromptEnhancerData,
  CreativityLevel,
  ContentType,
  ToneType,
} from '../../types/node-types';

type Props = {
  nodeId: string;
  data: PromptEnhancerData;
};

const CREATIVITY_OPTIONS: { value: CreativityLevel; label: string; icon: string }[] = [
  { value: 'precise', label: 'Precise', icon: '🎯' },
  { value: 'balanced', label: 'Balanced', icon: '⚖️' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
];

const CONTENT_TYPES: ContentType[] = ['wishes', 'meme', 'character', 'avatar', 'general'];
const TONES: ToneType[] = ['formal', 'casual', 'funny', 'heartfelt'];

export function PromptEnhancerPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Creativity</label>
        <div className="flex gap-2">
          {CREATIVITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateConfig({ creativity: opt.value })}
              className={`flex-1 p-2.5 rounded-md border cursor-pointer text-xs text-center text-white ${
                config.creativity === opt.value
                  ? 'border-violet-400 bg-violet-400/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div>{opt.icon}</div>
              <div className="mt-1">{opt.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Content Type</label>
        <div className="flex flex-wrap gap-1.5">
          {CONTENT_TYPES.map((ct) => (
            <button
              key={ct}
              onClick={() => updateConfig({ contentType: ct })}
              className={`px-3 py-1.5 rounded-full border cursor-pointer text-xs text-white ${
                config.contentType === ct
                  ? 'border-violet-400 bg-violet-400/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {ct}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Tone</label>
        <div className="flex flex-wrap gap-1.5">
          {TONES.map((tone) => (
            <button
              key={tone}
              onClick={() => updateConfig({ tone })}
              className={`px-3 py-1.5 rounded-full border cursor-pointer text-xs text-white ${
                config.tone === tone
                  ? 'border-violet-400 bg-violet-400/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Language</label>
        <div className="flex gap-2">
          {(['id', 'en', 'mixed'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => updateConfig({ language: lang })}
              className={`flex-1 p-2 rounded-md border cursor-pointer text-xs text-white ${
                config.language === lang
                  ? 'border-violet-400 bg-violet-400/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {lang === 'id' ? '🇮🇩 ID' : lang === 'en' ? '🇬🇧 EN' : '🔀 Mix'}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
