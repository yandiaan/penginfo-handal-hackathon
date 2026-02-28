---
title: 'Complete Node Catalog'
layout: ../layouts/main.astro
---

<div class="min-h-screen bg-zinc-950 text-zinc-300 font-sans p-4 md:p-8 lg:p-12 selection:bg-indigo-500/30">
  <div class="max-w-7xl mx-auto space-y-16">

    <!-- Hero Header -->
    <header class="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl shadow-black/50">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 pointer-events-none"></div>

      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 flex-shrink-0 animate-pulse-slow">
          <span class="text-5xl">🧩</span>
        </div>
        <div class="text-center md:text-left">
          <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight m-0 mb-4">Node Catalog</h1>
          <p class="text-xl text-zinc-400">Complete architecture overview of all <strong class="text-zinc-200">22 pipeline nodes</strong>.</p>

          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
            <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold shadow-inner shadow-blue-500/10">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span> 10 MVP (Core)
            </span>
            <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold shadow-inner shadow-emerald-500/10">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span> 8 MVP+ (Post-launch)
            </span>
            <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold shadow-inner shadow-amber-500/10">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span> 4 v2 (Power)
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Node Catalog Overview Grids -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-white flex items-center gap-3">
          <span class="text-indigo-400 font-emoji">📌</span> Architecture Overview
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">

        <!-- INPUT -->
        <div class="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300">
          <div class="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
            <h3 class="text-lg font-bold text-white flex items-center gap-2"><span class="font-emoji">📥</span> INPUT</h3>
            <span class="text-xs font-mono text-zinc-500">4 nodes</span>
          </div>
          <div class="space-y-3">
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">TextPrompt</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">User text/description</p>
            </div>
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">ImageUpload</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">Upload reference image</p>
            </div>
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">TemplatePreset</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">Pre-made pipeline starter</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl relative overflow-hidden">
              <div class="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-bl-full"></div>
              <div class="flex justify-between items-start mb-1 relative z-10">
                <span class="font-semibold text-emerald-200">ColorPalette</span>
                <div class="flex gap-1">
                  <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 rounded font-bold uppercase">NEW</span>
                  <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
                </div>
              </div>
              <p class="text-xs text-zinc-400 relative z-10">Pick colors & palette</p>
            </div>
          </div>
        </div>

        <!-- TRANSFORM -->
        <div class="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 xl:col-span-1">
          <div class="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
            <h3 class="text-lg font-bold text-white flex items-center gap-2"><span class="font-emoji">⚙️</span> TRANSFORM</h3>
            <span class="text-xs font-mono text-zinc-500">6 nodes</span>
          </div>
          <div class="space-y-3">
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">PromptEnhancer</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">Raw text → AI (Qwen)</p>
            </div>
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">StyleConfig</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">Art style + mood config</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200">ImageToText</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Describe img → text</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200">TranslateText</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Translate langs (Qwen)</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200 flex items-center gap-1">BackgroundRmv</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Remove bg</p>
            </div>
            <div class="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-amber-200">FaceCrop</span>
                <span class="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 rounded font-bold uppercase">V2</span>
              </div>
              <p class="text-xs text-zinc-400">Detect & extract face</p>
            </div>
          </div>
        </div>

        <!-- GENERATE -->
        <div class="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 xl:col-span-1">
          <div class="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
            <h3 class="text-lg font-bold text-white flex items-center gap-2"><span class="font-emoji">🤖</span> GENERATE</h3>
            <span class="text-xs font-mono text-zinc-500">4 nodes</span>
          </div>
          <div class="space-y-3">
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">ImageGen</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">img / img2img (Wan)</p>
            </div>
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">VideoGen</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">vid / img2vid (Wan)</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200">Inpainting</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Edit masked region</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200">ImageUpscaler</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Upscale resolution to HD</p>
            </div>
          </div>
        </div>

        <!-- COMPOSE -->
        <div class="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 xl:col-span-1">
          <div class="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
            <h3 class="text-lg font-bold text-white flex items-center gap-2"><span class="font-emoji">🎨</span> COMPOSE</h3>
            <span class="text-xs font-mono text-zinc-500">5 nodes</span>
          </div>
          <div class="space-y-3">
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">TextOverlay</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">Text on image (Client)</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200">FrameBorder</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Decorative frames</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200">StickerLayer</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Emoji/sticker overlay</p>
            </div>
            <div class="bg-emerald-900/20 border border-emerald-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-emerald-200">ColorFilter</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-bold uppercase">MVP+</span>
              </div>
              <p class="text-xs text-zinc-400">Color grading & filters</p>
            </div>
            <div class="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-amber-200">CollageLayout</span>
                <span class="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 rounded font-bold uppercase">V2</span>
              </div>
              <p class="text-xs text-zinc-400">Multi-image layout</p>
            </div>
          </div>
        </div>

        <!-- OUTPUT -->
        <div class="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 xl:col-span-1">
          <div class="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
            <h3 class="text-lg font-bold text-white flex items-center gap-2"><span class="font-emoji">📤</span> OUTPUT</h3>
            <span class="text-xs font-mono text-zinc-500">3 nodes</span>
          </div>
          <div class="space-y-3">
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">Preview</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">Realtime canvas preview</p>
            </div>
            <div class="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-zinc-200">Export</span>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 rounded font-bold uppercase">MVP</span>
              </div>
              <p class="text-xs text-zinc-400">Download & Share</p>
            </div>
            <div class="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="font-semibold text-amber-200">Watermark</span>
                <span class="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 rounded font-bold uppercase">V2</span>
              </div>
              <p class="text-xs text-zinc-400">Brand/attribution stamp</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Deep Dives -->
    <section>
      <h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span class="text-orange-500 font-emoji">🔥</span> Node Deep-Dives
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Card: ColorPalette -->
        <article class="bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-indigo-500/10">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-[#27272a]">
            <div>
              <h3 class="text-xl font-bold text-white flex items-center gap-2"><span class="font-emoji">🎨</span> ColorPalette</h3>
              <p class="text-sm text-zinc-400 mt-1">Category: <code class="bg-[#27272a] text-pink-400 px-1.5 py-0.5 rounded text-xs ml-1">input</code></p>
            </div>
            <div class="text-right">
               <span class="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">MVP+</span>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <h4 class="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Kenapa Perlu?</h4>
              <p class="text-sm text-zinc-300 leading-relaxed">
                Standalone node yang bikin user bisa reuse palette across branches, feed palette ke <b class="text-zinc-100">PromptEnhancer</b>, atau sync warnanya ke FrameBorder & TextOverlay.
              </p>
            </div>

            <div class="bg-[#09090b] rounded-xl p-4 border border-[#27272a]">
              <h4 class="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Config Mode</h4>
              <ul class="text-sm text-zinc-300 space-y-2 mt-2">
                <li class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-indigo-500"></div> <code class="text-indigo-300">preset</code> (Ramadan, Lebaran, pastel, dll)</li>
                <li class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-pink-500"></div> <code class="text-pink-300">custom</code> (User pick via color picker)</li>
                <li class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-emerald-500"></div> <code class="text-emerald-300">extract</code> (Auto-extract from connected img)</li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Card: ImageToText -->
        <article class="bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
          <div class="absolute -right-10 -top-10 text-8xl opacity-5 font-emoji">👁️</div>
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-[#27272a] relative z-10">
            <div>
              <h3 class="text-xl font-bold text-white flex items-center gap-2"><span class="font-emoji">👁️</span> ImageToText</h3>
              <p class="text-sm text-zinc-400 mt-1 flex items-center gap-2">
                Category: <code class="bg-[#27272a] text-pink-400 px-1.5 py-0.5 rounded text-xs">transform</code>
                <span class="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Runnable</span>
              </p>
            </div>
          </div>

          <div class="space-y-4 relative z-10">
            <div>
              <h4 class="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Kenapa Perlu?</h4>
              <p class="text-sm text-zinc-300 leading-relaxed">
                Bridge antara image input dan text pipeline. Biasa dipakai untuk <b>Image → AI Description → Enhancer → Styled Image</b>.
              </p>
            </div>

            <div class="bg-[#09090b] rounded-xl p-4 border border-[#27272a]">
              <div class="text-xs font-mono text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 overflow-x-auto whitespace-nowrap scrollbar-hide">
                ImageUpload → ImageToText → Enhancer → Generator
              </div>
            </div>
          </div>
        </article>

        <!-- Card: BackgroundRemover -->
        <article class="bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-[#27272a]">
            <div>
              <h3 class="text-xl font-bold text-white flex items-center gap-2"><span class="font-emoji">✂️</span> BackgroundRemover</h3>
              <p class="text-sm text-zinc-400 mt-1 flex items-center gap-2">
                Category: <code class="bg-[#27272a] text-pink-400 px-1.5 py-0.5 rounded text-xs">transform</code>
                <span class="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Runnable</span>
              </p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <h4 class="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Kenapa Perlu?</h4>
              <p class="text-sm text-zinc-300 leading-relaxed">
                Fundamental untuk workflow Avatar, Sticker creation, atau Meme generator. Mengextract subject secara otomatis untuk diletakkan di atas kanvas/bg lain.
              </p>
            </div>

            <div class="bg-[#09090b] rounded-xl p-4 border border-[#27272a] grid grid-cols-2 gap-4">
               <div>
                 <h4 class="text-[10px] text-zinc-500 mb-2 uppercase font-bold tracking-wider">Avatar Pipeline</h4>
                 <div class="flex flex-col gap-1 text-xs font-mono text-zinc-400">
                    <span class="bg-zinc-800 px-2 py-1 rounded inline-block w-fit">Upload</span>
                    <span class="text-zinc-600 pl-2">↳ <span class="bg-zinc-800 px-2 py-1 rounded text-emerald-400">BgRemove</span></span>
                    <span class="text-zinc-600 pl-6">↳ <span class="bg-zinc-800 px-2 py-1 rounded">TextToImg</span></span>
                 </div>
               </div>
               <div>
                 <h4 class="text-[10px] text-zinc-500 mb-2 uppercase font-bold tracking-wider">Sticker Pipeline</h4>
                 <div class="flex flex-col gap-1 text-xs font-mono text-zinc-400">
                    <span class="bg-zinc-800 px-2 py-1 rounded inline-block w-fit">ImageGen</span>
                    <span class="text-zinc-600 pl-2">↳ <span class="bg-zinc-800 px-2 py-1 rounded text-emerald-400">BgRemove</span></span>
                    <span class="text-zinc-600 pl-6">↳ <span class="bg-zinc-800 px-2 py-1 rounded">FrameBorder</span></span>
                 </div>
               </div>
            </div>
          </div>
        </article>

        <!-- Card: UI Finishers -->
        <article class="bg-gradient-to-br from-[#18181b] to-[#09090b] border border-[#27272a] hover:border-pink-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-pink-500/10">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-[#27272a]">
            <div>
              <h3 class="text-xl font-bold text-white flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">🎨 UI Finishing Nodes</h3>
            </div>
          </div>

          <div class="space-y-4">
            <p class="text-sm text-zinc-300">
              Content greeting/wishes <strong class="text-pink-400">BUTUH</strong> frame & sticker. Ini pembeda utama antara "gambar AI mentah" vs "konten siap share".
            </p>

            <div class="flex flex-col gap-3 mt-4">
              <div class="flex items-center gap-4 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 transition duration-300 hover:bg-zinc-900 overflow-hidden">
                 <div class="w-10 h-10 rounded-lg bg-pink-500/20 text-xl flex items-center justify-center shrink-0 shadow-inner shadow-pink-500/20 border border-pink-500/20"><span class="font-emoji">🖼️</span></div>
                 <div>
                   <h4 class="text-sm font-bold text-zinc-200">FrameBorder</h4>
                   <p class="text-[11px] text-zinc-500 mt-0.5 truncate">Islamic, Floral, Polaroid, Neon, Torn-paper</p>
                 </div>
              </div>
              <div class="flex items-center gap-4 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 transition duration-300 hover:bg-zinc-900 overflow-hidden">
                 <div class="w-10 h-10 rounded-lg bg-amber-500/20 text-xl flex items-center justify-center shrink-0 shadow-inner shadow-amber-500/20 border border-amber-500/20"><span class="font-emoji">⭐</span></div>
                 <div>
                   <h4 class="text-sm font-bold text-zinc-200">StickerLayer</h4>
                   <p class="text-[11px] text-zinc-500 mt-0.5 truncate">Emoji packs (Ramadan, Meme, Sparkles)</p>
                 </div>
              </div>
              <div class="flex items-center gap-4 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 transition duration-300 hover:bg-zinc-900 overflow-hidden">
                 <div class="w-10 h-10 rounded-lg bg-emerald-500/20 text-xl flex items-center justify-center shrink-0 shadow-inner shadow-emerald-500/20 border border-emerald-500/20"><span class="font-emoji">🌈</span></div>
                 <div>
                   <h4 class="text-sm font-bold text-zinc-200">ColorFilter</h4>
                   <p class="text-[11px] text-zinc-500 mt-0.5 truncate">Presets: Warm, Vintage, Eid Gold, Sahur</p>
                 </div>
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>

    <!-- Workflows -->
    <section class="pb-16">
      <h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span class="text-rose-400 font-emoji">🎯</span> Workflow Pipelines
      </h2>

      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">

        <div class="p-6 md:p-8 border-b border-zinc-800">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold font-mono">1</span>
            <h3 class="text-xl font-bold text-white">Ramadan Wishes</h3>
            <span class="text-[10px] font-bold tracking-wider uppercase bg-zinc-800 text-zinc-400 px-2 py-1 rounded">Advanced</span>
          </div>
          <p class="text-zinc-400 text-sm mb-6 max-w-2xl">Pipeline berukuran 11 node untuk menghasilkan kartu ucapan Ramadan yang rich-text, dengan arabic overlay, custom palette, islamic borders, dan color grading.</p>

          <div class="overflow-x-auto pb-4 scrollbar-hide">
            <div class="flex gap-2 items-center text-sm font-mono whitespace-nowrap min-w-max bg-[#09090b] p-4 rounded-xl border border-zinc-800">
              <span class="px-3 py-1.5 border border-zinc-700 rounded bg-zinc-800 text-zinc-300 shadow-sm">TextPrompt</span>
              <span class="text-zinc-600">→</span>
              <span class="px-3 py-1.5 border border-blue-500/30 rounded bg-blue-500/10 text-blue-300 font-bold shadow-[0_0_10px_rgba(59,130,246,0.1)]">ImageGen</span>
              <span class="text-zinc-600">→</span>
              <span class="px-3 py-1.5 border border-pink-500/30 rounded bg-pink-500/10 text-pink-300">FrameBorder</span>
              <span class="text-zinc-600">→</span>
              <span class="px-3 py-1.5 border border-amber-500/30 rounded bg-amber-500/10 text-amber-300">StickerLayer</span>
              <span class="text-zinc-600">→</span>
              <span class="px-3 py-1.5 border border-emerald-500/30 rounded bg-emerald-500/10 text-emerald-300">ColorFilter</span>
            </div>
          </div>
        </div>

        <div class="p-6 md:p-8 bg-zinc-900/50">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold font-mono">2</span>
            <h3 class="text-xl font-bold text-white">Holiday Meme (Comparison)</h3>
            <span class="text-[10px] font-bold tracking-wider uppercase bg-zinc-800 text-zinc-400 px-2 py-1 rounded">Multi-branch</span>
          </div>
          <p class="text-zinc-400 text-sm mb-6 max-w-2xl">Memanfaatkan <code class="text-indigo-400 bg-indigo-500/10 px-1 py-0.5 rounded">CollageLayout</code> untuk menyatukan dua generasi gambar secara parallel ("Expectation" vs "Reality") dalam satu kanvas.</p>

          <div class="overflow-x-auto pb-4 scrollbar-hide">
            <div class="flex gap-4 items-center text-sm font-mono whitespace-nowrap min-w-max bg-[#09090b] p-5 rounded-xl border border-zinc-800">
              <div class="flex flex-col gap-3">
                 <span class="px-3 py-1.5 border border-zinc-700 rounded bg-zinc-800 text-zinc-300 shadow-sm">ImgGen(Luxury)</span>
                 <span class="px-3 py-1.5 border border-zinc-700 rounded bg-zinc-800 text-zinc-300 shadow-sm">ImgGen(Macet)</span>
              </div>
              <div class="flex flex-col items-center justify-center mx-2 max-w-[20px]">
                <div class="w-px h-6 bg-zinc-700 rotate-[30deg] translate-y-1"></div>
                <span class="text-indigo-500 font-bold ml-1">→</span>
                <div class="w-px h-6 bg-zinc-700 -rotate-[30deg] -translate-y-1"></div>
              </div>
              <span class="px-3 py-1.5 border border-indigo-500/30 rounded bg-indigo-500/10 text-indigo-300 font-bold shadow-[0_0_15px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/50">CollageLayout</span>
              <span class="text-zinc-600">→</span>
              <span class="px-3 py-1.5 border border-pink-500/30 rounded bg-pink-500/10 text-pink-300">TextOverlay</span>
              <span class="text-zinc-600">→</span>
              <span class="px-3 py-1.5 border border-emerald-500/30 rounded bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 cursor-pointer transition-colors">Export Node</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <div class="text-center pb-24 border-t border-zinc-800 pt-8 flex items-center justify-between">
      <p class="text-sm text-zinc-500">© 2026 Penginfo Handal &bull; Node Architecture Sandbox</p>
      <div class="flex gap-2">
         <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
         <span class="w-2 h-2 rounded-full bg-pink-500"></span>
         <span class="w-2 h-2 rounded-full bg-blue-500"></span>
      </div>
    </div>

  </div>
</div>
