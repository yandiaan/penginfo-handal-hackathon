import { LayoutTemplate, Wand2, Smile, Sparkles, User2 } from 'lucide-react';

export const TEMPLATE_ICONS: Record<string, React.ComponentType<{ className: string }>> = {
  'ramadan-wishes': Wand2,
  'holiday-meme': Smile,
  'ai-pet': Sparkles,
  'custom-avatar': User2,
};

export const getTemplateIcon = (templateId: string) => {
  const Icon = TEMPLATE_ICONS[templateId] || LayoutTemplate;
  return Icon;
};
