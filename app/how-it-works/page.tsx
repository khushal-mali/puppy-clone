import { HTML_HOW_IT_WORKS } from '@/data/pageHtml';

export const metadata = {
  title: 'How it works',
  description: 'How to meet, reserve and adopt a teacup puppy in Dubai or order an imported miniature puppy.',
};

export default function HowItWorksPage() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: HTML_HOW_IT_WORKS }}
      className="contents"
    />
  );
}
