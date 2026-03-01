export function HowItWorksSection() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: '#282828',
        backgroundImage: "url('/background-how-it-works.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-150 z-10 pointer-events-none">
        <h2 className="text-5xl font-bold italic mb-6 text-white uppercase tracking-tighter">
          How It Works
        </h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Design Your Pipeline</h3>
              <p className="text-gray-300">Drag and drop nodes to create your custom workflow</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Configure & Connect</h3>
              <p className="text-gray-300">Set parameters and connect nodes together seamlessly</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Execute & Generate</h3>
              <p className="text-gray-300">Run your pipeline and get instant creative results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
