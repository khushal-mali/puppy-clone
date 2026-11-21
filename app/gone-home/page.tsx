import { HTML_GONE_HOME } from '@/data/pageHtml';

export const metadata = {
  title: 'Gone home',
  description: 'Collectible boarding tickets of puppies who have safely found their forever families across the Emirates.',
};

export default function GoneHomePage() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: HTML_GONE_HOME }}
      className="contents"
    />
  );
}
