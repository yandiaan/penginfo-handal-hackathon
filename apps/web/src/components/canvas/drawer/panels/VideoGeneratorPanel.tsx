import { useReactFlow } from '@xyflow/react';
import { ArrowRight, Image, Type, Video } from 'lucide-react';
import type { VideoGeneratorData, VideoDuration, VideoResolution } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: VideoGeneratorData;
};

const DURATIONS: VideoDuration[] = ['3s', '5s', '10s'];
const RESOLUTIONS: VideoResolution[] = ['480p', '720p'];

export function VideoGeneratorPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Mode</label>
        <div className="text-white/55 text-[13px] p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="inline-flex items-center gap-2">
            {config.mode === 'text2video' ? (
              <>
                <Type size={14} className="text-white/70" />
                <ArrowRight size={14} className="text-white/40" />
                <Video size={14} className="text-white/70" />
                <span>Text to Video</span>
              </>
            ) : (
              <>
                <Image size={14} className="text-white/70" />
                <ArrowRight size={14} className="text-white/40" />
                <Video size={14} className="text-white/70" />
                <span>Image to Video</span>
              </>
            )}
          </div>
          <div className="text-[11px] text-white/30 mt-1">Auto-detected from connections</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Duration</label>
        <div className="flex gap-2">
          {DURATIONS.map((dur) => (
            <button
              key={dur}
              onClick={() => updateConfig({ duration: dur })}
              className={`motion-lift motion-press focus-ring-orange flex-1 p-2.5 rounded-xl border cursor-pointer text-white text-[13px] transition-colors ${
                config.duration === dur
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              {dur}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Resolution</label>
        <div className="flex gap-2">
          {RESOLUTIONS.map((res) => (
            <button
              key={res}
              onClick={() => updateConfig({ resolution: res })}
              className={`motion-lift motion-press focus-ring-orange flex-1 p-2.5 rounded-xl border cursor-pointer text-white text-[13px] transition-colors ${
                config.resolution === res
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">FPS</label>
        <div className="flex gap-2">
          {([24, 30] as const).map((fps) => (
            <button
              key={fps}
              onClick={() => updateConfig({ fps })}
              className={`motion-lift motion-press focus-ring-orange flex-1 p-2.5 rounded-xl border cursor-pointer text-white text-[13px] transition-colors ${
                config.fps === fps
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              {fps} fps
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
