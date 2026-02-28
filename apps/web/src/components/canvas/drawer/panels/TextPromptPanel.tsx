import { useReactFlow } from '@xyflow/react';
import type { TextPromptData } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: TextPromptData;
};

export function TextPromptPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  const charCount = config.text.length;
  const isOverLimit = charCount > config.maxLength;

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Prompt Text</label>
        <textarea
          value={config.text}
          onChange={(e) => updateConfig({ text: e.target.value })}
          placeholder={config.placeholder}
          className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none transition-colors duration-200 resize-y min-h-[120px] font-inherit box-border focus:border-white/30"
          style={isOverLimit ? { borderColor: '#f87171' } : undefined}
        />
        <div className="flex justify-end mt-2">
          <span className={`text-xs ${isOverLimit ? 'text-red-400' : 'text-white/40'}`}>
            {charCount} / {config.maxLength}
          </span>
        </div>
      </div>
    </>
  );
}
