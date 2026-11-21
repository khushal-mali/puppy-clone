export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQ[] = [
  {
    id: 'vaccinations',
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Yes, every Teddy Pup comes fully vaccinated according to their age, microchipped, dewormed, and accompanied by an official veterinary passport and international health certificate with a comprehensive health guarantee.'
  },
  {
    id: 'meet-in-person',
    question: 'Can I meet a puppy before I decide?',
    answer: 'Absolutely. For puppies currently located in our Dubai showroom, you can book a private consultation to interact and play with them in person before finalizing your decision.'
  },
  {
    id: 'same-day',
    question: 'Can I take my puppy home the same day?',
    answer: 'Yes! Puppies residing in our Dubai showroom can be taken home the same day following a brief adoption consultation and preparation of your puppy starter pack.'
  },
  {
    id: 'import-abroad',
    question: 'Do you import puppies from abroad?',
    answer: 'Yes. We work exclusively with certified ethical boutique breeders in South Korea and Europe known for premier teacup and miniature lines. All imported puppies travel with full legal permits and quarantine compliance.'
  },
  {
    id: 'travel-safety',
    question: 'How does an imported puppy travel to Dubai?',
    answer: 'Imported puppies fly via top-tier international airlines in temperature-controlled VIP pet cabins under veterinarian supervision, with dedicated transit care and customs clearance upon arrival in the U.A.E.'
  },
  {
    id: 'photos-details',
    question: 'Will I see photos and health details first?',
    answer: 'Yes, we provide extensive high-definition video walkthroughs, veterinary inspection records, parental pedigree information, and live WhatsApp video calls before you reserve.'
  },
  {
    id: 'delivery',
    question: 'Do you deliver?',
    answer: 'Yes, we offer VIP chauffeur delivery across all seven Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain), as well as international delivery options.'
  },
  {
    id: 'breeds',
    question: 'Which breeds do you usually have?',
    answer: 'We specialize in hypoallergenic, small-sized companion breeds: Korean Teacup Maltipoos, Toy Poodles, Teacup Pomeranians, Cavapoos, Shih Tzus, Bichon Frises, and Pomskies.'
  },
  {
    id: 'aftercare',
    question: 'Is there help after my puppy comes home?',
    answer: 'Yes. Every family receives 24/7 lifetime advice and post-adoption support covering nutrition, potty training, veterinary recommendations, and settling-in guidance.'
  }
];
