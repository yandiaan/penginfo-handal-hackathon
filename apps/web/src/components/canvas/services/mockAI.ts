// Mock AI service for generating placeholder content

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Sample punchlines for different humor styles
const SAMPLE_PUNCHLINES = {
  receh: [
    'Kenapa THR selalu datang telat? Karena dia suka ngaret kayak mantan.',
    'Mudik itu seperti diet, baru mulai udah pengen nyerah.',
    'Sahur is temporary, ngantuk is eternal.',
    'Lebaran tanpa amplop itu seperti wifi tanpa password - sedih.',
    'Puasa tanpa takjil itu seperti stand-up tanpa punchline.',
  ],
  satir: [
    'THR: Tunjangan Hari Raya atau Terjebak Hutang Riba?',
    'Mudik gratis, tapi bayar pakai mental.',
    'Sahur jam 3 pagi, meeting jam 8. Produktivitas Indonesia.',
    'Lebaran: Saat tante-tante jadi auditor kehidupanmu.',
    'Puasa 30 hari, drama keluarga 365 hari.',
  ],
  relatable: [
    'THR belum cair, wish list udah sepanjang jalan tol.',
    'Mudik level expert: Tidur di rest area lebih nyaman dari rumah.',
    'Alarm sahur bunyi, tapi tubuh memilih untuk bertahan.',
    'Ketemu saudara pas lebaran: "Kapan nikah?" The Sequel.',
    'Puasa lancar, iman kuat, WiFi lemot.',
  ],
  dark: [
    'THR is just a trailer for the annual family financial audit.',
    'Mudik: A survival game where the boss is your relatives.',
    'Sahur at 3am hits different when you question your life choices.',
    'Lebaran: The annual reminder that youre still single.',
    'Puasa teaches patience. Traffic teaches rage. Balance.',
  ],
  absurd: [
    'THR itu sebenarnya singkatan dari Tikus Hujan Rebahan.',
    'Mudik dengan kambing lebih seru karena kambing ga nanya kapan nikah.',
    'Sahur is just breakfast cosplaying as dinner.',
    'Lebaran itu seperti Netflix, ada loading time yang gak perlu.',
    'Puasa membuat kita sadar bahwa perut bisa berbicara.',
  ],
};

const GENERIC_OUTPUTS = [
  'This is a mock generated output. Replace with real AI in production.',
  'Sample content generated for testing purposes.',
  'Placeholder text that simulates AI generation.',
  'Demo output - integrate with your preferred AI service.',
  'Mock result - your actual content will appear here.',
];

export const mockAI = {
  /**
   * Generate text outputs based on prompt
   */
  generateText: async (prompt: string, count: number): Promise<string[]> => {
    await delay(800 + Math.random() * 400); // Simulate API latency

    // Detect humor style from prompt or use generic
    const style = detectHumorStyle(prompt);
    const punchlines = style ? SAMPLE_PUNCHLINES[style] : GENERIC_OUTPUTS;

    // Generate requested number of outputs
    return Array.from({ length: count }, (_, i) => {
      const index = (i + Math.floor(Math.random() * 3)) % punchlines.length;
      return punchlines[index];
    });
  },

  /**
   * Generate variant batches
   */
  generateVariants: async <T>(
    input: T,
    count: number,
    randomize: boolean,
  ): Promise<T[]> => {
    await delay(300 + Math.random() * 200);

    const variants = Array.from({ length: count }, () => ({
      ...input,
      _variantId: Math.random().toString(36).slice(2, 8),
    }));

    if (randomize) {
      return shuffleArray(variants) as T[];
    }

    return variants as T[];
  },

  /**
   * Simulate image generation (returns placeholder)
   */
  generateImage: async (prompt: string): Promise<string> => {
    await delay(1500 + Math.random() * 500);

    // Return a placeholder image URL
    const width = 400;
    const height = 400;
    return `https://via.placeholder.com/${width}x${height}/1e1e2e/ffffff?text=AI+Generated`;
  },

  /**
   * Simulate export process
   */
  exportContent: async (
    format: string,
    quality: number,
  ): Promise<{ url: string; size: string }> => {
    await delay(1000 + Math.random() * 500);

    const mockId = Math.random().toString(36).slice(2, 10);
    return {
      url: `https://share.example.com/export/${mockId}.${format}`,
      size: `${Math.floor(100 + quality * 20)}KB`,
    };
  },
};

// Helper functions
function detectHumorStyle(prompt: string): keyof typeof SAMPLE_PUNCHLINES | null {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('receh') || lowerPrompt.includes('jayus')) return 'receh';
  if (lowerPrompt.includes('satir') || lowerPrompt.includes('sarkastik')) return 'satir';
  if (lowerPrompt.includes('relatable') || lowerPrompt.includes('relate')) return 'relatable';
  if (lowerPrompt.includes('dark') || lowerPrompt.includes('gelap')) return 'dark';
  if (lowerPrompt.includes('absurd') || lowerPrompt.includes('random')) return 'absurd';

  // Default to receh if Indonesian context detected
  if (
    lowerPrompt.includes('thr') ||
    lowerPrompt.includes('mudik') ||
    lowerPrompt.includes('lebaran')
  ) {
    return 'receh';
  }

  return null;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
