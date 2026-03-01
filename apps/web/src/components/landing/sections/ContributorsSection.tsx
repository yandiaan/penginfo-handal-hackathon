export function ContributorsSection() {
  const roles = ['Developers', 'Designers', 'AI Scientists', 'Community'];

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: '#282828',
        backgroundImage: "url('/background-contributors.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-150 z-10 pointer-events-none">
        <h2 className="text-5xl font-bold italic mb-6 text-white uppercase tracking-tighter">
          Our Contributors
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {roles.map((role) => (
            <div
              key={role}
              className="bg-blue-600/20 p-6 rounded-lg border border-blue-500/40 text-center"
            >
              <div className="text-blue-400 text-3xl font-bold mb-2">👥</div>
              <p className="text-white font-semibold">{role}</p>
            </div>
          ))}
        </div>
        <p className="text-base text-gray-300">
          Built by a passionate community from around the world. We welcome contributions in all
          forms - code, design, ideas, and more.
        </p>
      </div>
    </div>
  );
}
