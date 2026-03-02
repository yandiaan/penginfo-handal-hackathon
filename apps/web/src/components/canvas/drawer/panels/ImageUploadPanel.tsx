import { useReactFlow } from '@xyflow/react';
import { FolderOpen } from 'lucide-react';
import type { ImageUploadData } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: ImageUploadData;
};

export function ImageUploadPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size / 1024 / 1024 > config.maxSizeMB) {
      alert(`File exceeds ${config.maxSizeMB}MB limit`);
      return;
    }
    const url = URL.createObjectURL(file);
    updateConfig({
      previewUrl: url,
      fileName: file.name,
      fileSizeMB: file.size / 1024 / 1024,
    });
  };

  const handleClear = () => {
    updateConfig({ previewUrl: null, fileName: null, fileSizeMB: null });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Image Upload</label>
        {config.previewUrl ? (
          <div>
            <img
              src={config.previewUrl}
              alt="Preview"
              className="w-full max-h-[200px] object-contain rounded-lg mb-2"
            />
            <div className="flex justify-between items-center text-xs text-white/50">
              <span>
                {config.fileName} ({config.fileSizeMB?.toFixed(1)}MB)
              </span>
              <button
                onClick={handleClear}
                className="motion-lift motion-press focus-ring-orange bg-red-400/10 border border-red-400/30 text-red-300 px-2.5 py-1 rounded-md cursor-pointer text-[11px] hover:bg-red-400/15 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div
            className="motion-lift motion-press focus-ring-orange border-2 border-dashed border-white/20 rounded-xl py-[30px] text-center cursor-pointer bg-white/3 hover:bg-white/5 transition-colors"
            onClick={() => document.getElementById(`upload-${nodeId}`)?.click()}
          >
            <div className="grid place-items-center mb-2">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10">
                <FolderOpen size={22} className="text-white/75" />
              </span>
            </div>
            <div className="text-white/50 text-[13px]">Click or drop image here</div>
            <div className="text-white/30 text-[11px] mt-1">Max {config.maxSizeMB}MB</div>
          </div>
        )}
        <input
          id={`upload-${nodeId}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </>
  );
}
