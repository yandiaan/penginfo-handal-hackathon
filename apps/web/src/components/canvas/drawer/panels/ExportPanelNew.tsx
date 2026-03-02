import { useReactFlow } from '@xyflow/react';
import { Clipboard, Download, MessageCircle } from 'lucide-react';
import type { ExportData, ExportFormat, ShareTarget } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: ExportData;
};

const FORMATS: ExportFormat[] = ['png', 'jpg', 'webp', 'mp4', 'gif'];
const SHARE_TARGETS: { value: ShareTarget; Icon: typeof Download; label: string }[] = [
  { value: 'download', Icon: Download, label: 'Download' },
  { value: 'whatsapp', Icon: MessageCircle, label: 'WhatsApp' },
  { value: 'clipboard', Icon: Clipboard, label: 'Clipboard' },
];

export function ExportPanelNew({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Format</label>
        <div className="flex gap-1.5">
          {FORMATS.map((fmt) => (
            <button
              key={fmt}
              onClick={() => updateConfig({ format: fmt })}
              className={`motion-lift motion-press focus-ring-orange flex-1 px-1 py-2 rounded-xl border cursor-pointer text-white text-xs transition-colors ${
                config.format === fmt
                  ? 'border-red-400 bg-red-400/15 font-semibold'
                  : 'border-white/10 bg-white/5 hover:bg-white/7 font-normal'
              }`}
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-white/70 text-xs font-medium mb-2">Quality</label>
            <span className="text-white/60 text-[13px] font-medium">{config.quality}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={config.quality}
            onChange={(e) => updateConfig({ quality: Number(e.target.value) })}
            className="w-full h-2 rounded bg-white/10 outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Share Target</label>
        <div className="flex gap-2">
          {SHARE_TARGETS.map((target) => (
            <button
              key={target.value}
              onClick={() => updateConfig({ shareTarget: target.value })}
              className={`motion-lift motion-press focus-ring-orange flex-1 px-1 py-2.5 rounded-xl border cursor-pointer text-white text-xs text-center transition-colors ${
                config.shareTarget === target.value
                  ? 'border-red-400 bg-red-400/15 font-semibold'
                  : 'border-white/10 bg-white/5 hover:bg-white/7 font-normal'
              }`}
            >
              <div className="grid place-items-center mb-1.5">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
                  <target.Icon size={18} className="text-white/80" />
                </span>
              </div>
              {target.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
