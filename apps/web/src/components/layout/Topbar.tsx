export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#0f2e2e]/60 bg-[#030d0e] px-6">
      <div className="flex items-center gap-4">
        <div className="text-lg font-medium text-[#edfdfd] tracking-normal">Meme Factory</div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded border border-[#164041] bg-[#030d0e] hover:bg-[#164041]/50 px-5 py-1.5 text-sm font-medium text-[#edfdfd] transition-colors">
          Run
        </button>
        <button className="rounded border border-[#164041] bg-[#030d0e] hover:bg-[#164041]/50 px-5 py-1.5 text-sm font-medium text-[#edfdfd] transition-colors">
          Save
        </button>
      </div>
    </header>
  );
}
