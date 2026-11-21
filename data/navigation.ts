export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Puppies', href: '/puppies' },
  { label: 'Happy families', href: '/happy-families' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Visit & contact', href: '/contact' },
];

export const FOOTER_EXPLORE_LINKS: NavLink[] = [
  { label: 'Available puppies', href: '/puppies' },
  { label: 'Gone home', href: '/gone-home' },
  { label: 'Happy families', href: '/happy-families' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Delivery & collection', href: '/how-it-works#delivery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Visit & contact', href: '/contact' },
];

export const CONTACT_INFO = {
  phone: '+971 50 123 4567',
  displayPhone: '+971 50 000 0000',
  whatsappUrl: "https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20enquire%20about%20a%20puppy.",
  getWhatsAppEnquiryUrl: (puppyName?: string) => {
    const text = puppyName
      ? `Hi TeddyPups, I'm interested in ${puppyName} and would love more details, photos and video!`
      : "Hi TeddyPups, I'd like to enquire about available puppies.";
    return `https://wa.me/919898124987?text=${encodeURIComponent(text)}`;
  },
  location: 'Dubai Showroom, Al Wasl / Jumeirah, Dubai, U.A.E.',
  hours: 'Daily: 10:00 AM – 9:00 PM (By appointment)',
  instagram: 'https://instagram.com/teddypups.ae',
  tiktok: 'https://tiktok.com/@teddypups.ae',
  facebook: 'https://facebook.com/teddypups.ae',
};
