import { ALL_TEMPLATES, type PipelineTemplate } from '../canvas/templates';

export function TemplateGallery() {
  const handleSelect = (template: PipelineTemplate) => {
    window.location.href = `/canvas?template=${template.id}`;
  };

  return (
    <div className="p-10 max-w-[1200px] mx-auto font-[Inter,system-ui,sans-serif]">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#edfdfd] mb-2">Content Templates</h1>
        <p className="text-white/50 text-[15px]">
          Choose a template to get started, or create from scratch with a blank canvas.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {ALL_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelect(template)}
            className="bg-white/[0.04] border border-white/10 rounded-2xl py-7 px-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3 hover:border-[rgba(74,222,128,0.5)] hover:bg-[rgba(74,222,128,0.06)] hover:-translate-y-0.5"
          >
            <div className="text-[48px]">{template.thumbnail}</div>
            <div className="text-[#edfdfd] text-base font-semibold">{template.name}</div>
            <div className="text-white/45 text-[13px] leading-relaxed">{template.description}</div>
            <div className="mt-2 px-3 py-1 rounded-xl bg-white/[0.06] text-white/40 text-[11px]">
              {template.nodes.length} nodes
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
