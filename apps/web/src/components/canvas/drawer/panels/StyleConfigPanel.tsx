import { useReactFlow } from '@xyflow/react';
import type { StyleConfigData, ArtStyle, MoodType, CulturalTheme } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: StyleConfigData;
};

const ART_STYLES: { value: ArtStyle; icon: string }[] = [
  { value: 'realistic', icon: '📷' },
  { value: 'cartoon', icon: '🎨' },
  { value: 'anime', icon: '⛩️' },
  { value: 'watercolor', icon: '🖌️' },
  { value: 'pixel-art', icon: '👾' },
  { value: 'islamic-art', icon: '🕌' },
  { value: 'pop-art', icon: '💥' },
  { value: 'minimalist', icon: '◻️' },
];

const MOODS: MoodType[] = ['warm', 'cool', 'playful', 'elegant', 'spiritual', 'funny', 'cute'];

const CULTURAL_THEMES: { value: CulturalTheme; label: string }[] = [
  { value: 'ramadan', label: '🕌 Ramadan' },
  { value: 'lebaran', label: '🎉 Lebaran' },
  { value: 'natal', label: '🎄 Natal' },
  { value: 'imlek', label: '🧧 Imlek' },
  { value: 'general', label: '🌍 General' },
  { value: null, label: '❌ None' },
];

export function StyleConfigPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Art Style</label>
        <div className="grid grid-cols-4 gap-1.5">
          {ART_STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateConfig({ artStyle: s.value })}
              className={`px-1 py-2.5 rounded-md border text-white cursor-pointer text-[11px] text-center ${config.artStyle === s.value ? 'border-amber-500 bg-amber-500/15' : 'border-white/10 bg-white/5'}`}
            >
              <div className="text-lg">{s.icon}</div>
              <div className="mt-1">{s.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Mood</label>
        <div className="flex flex-wrap gap-1.5">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => updateConfig({ mood })}
              className={`px-3 py-1.5 rounded-full border text-white cursor-pointer text-xs ${config.mood === mood ? 'border-amber-500 bg-amber-500/15' : 'border-white/10 bg-white/5'}`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Cultural Theme</label>
        <div className="flex flex-wrap gap-1.5">
          {CULTURAL_THEMES.map((ct) => (
            <button
              key={String(ct.value)}
              onClick={() => updateConfig({ culturalTheme: ct.value })}
              className={`px-3 py-1.5 rounded-full border text-white cursor-pointer text-xs ${config.culturalTheme === ct.value ? 'border-amber-500 bg-amber-500/15' : 'border-white/10 bg-white/5'}`}
            >
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Color Palette</label>
        <div className="flex flex-wrap gap-1.5 items-center">
          {config.colorPalette.map((color, i) => (
            <input
              key={i}
              type="color"
              value={color}
              onChange={(e) => {
                const newPalette = [...config.colorPalette];
                newPalette[i] = e.target.value;
                updateConfig({ colorPalette: newPalette });
              }}
              className="w-8 h-8 border-none cursor-pointer rounded-md"
            />
          ))}
          <button
            onClick={() => updateConfig({ colorPalette: [...config.colorPalette, '#ffffff'] })}
            className="w-8 h-8 rounded-md border border-dashed border-white/30 bg-transparent text-white/50 cursor-pointer text-base"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
