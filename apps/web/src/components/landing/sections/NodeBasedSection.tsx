export function NodeBasedSection() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: '#282828',
        backgroundImage: "url('/background-node-based.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-150 z-10 pointer-events-none">
        <h2 className="text-5xl font-bold italic mb-6 text-white uppercase tracking-tighter">
          Node Based Architecture
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-orange-500/30">
            <div className="text-orange-400 text-2xl font-bold mb-2">◆</div>
            <p className="text-sm text-gray-300">Input Nodes</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-orange-500/30">
            <div className="text-orange-400 text-2xl font-bold mb-2">◆</div>
            <p className="text-sm text-gray-300">Process Nodes</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-orange-500/30">
            <div className="text-orange-400 text-2xl font-bold mb-2">◆</div>
            <p className="text-sm text-gray-300">Output Nodes</p>
          </div>
        </div>
        <p className="text-base text-gray-300 leading-relaxed">
          Every component is a self-contained node. Mix and match to create unique workflows
          tailored to your creative needs. Total modularity, infinite possibilities.
        </p>
      </div>
    </div>
  );
}
