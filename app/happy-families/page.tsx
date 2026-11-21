import { HTML_HAPPY_FAMILIES } from '@/data/pageHtml';

export const metadata = {
  title: 'Happy families',
  description: 'Heartwarming moments and testimonials from families who welcomed a Teddy Pup into their Dubai and UAE homes.',
};

export default function HappyFamiliesPage() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: HTML_HAPPY_FAMILIES }}
      className="contents"
    />
  );
}
