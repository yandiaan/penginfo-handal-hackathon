export function TemplatesSection() {
  const templates = ['Sticker Packs', 'Viral Memes', 'Greetings', 'Custom'];

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: '#282828',
        backgroundImage: "url('/background-templates.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-150 z-10 pointer-events-none">
        <h2 className="text-5xl font-bold italic mb-6 text-white uppercase tracking-tighter">
          Pre-built Templates
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {templates.map((template) => (
            <div
              key={template}
              className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 p-6 rounded-lg border border-orange-500/40 hover:border-orange-500/60 transition-colors"
            >
              <div className="text-orange-400 text-3xl font-bold mb-2">◼</div>
              <p className="text-white font-semibold">{template}</p>
            </div>
          ))}
        </div>
        <p className="text-base text-gray-300">
          Get started instantly with ready-to-use templates. Each one is fully customizable and can
          be adapted to match your unique style.
        </p>
      </div>
    </div>
  );
}
