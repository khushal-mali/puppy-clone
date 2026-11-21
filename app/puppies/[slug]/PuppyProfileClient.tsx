'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Check,
  Send,
  Heart,
  Calendar,
  MapPin,
  Tag,
} from 'lucide-react';
import type { Puppy } from '@/data/puppies';
import { CONTACT_INFO } from '@/data/navigation';

export default function PuppyProfileClient({ puppy }: { puppy: Puppy }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `Hi TeddyPups! I'd love to know more about ${puppy.name} (${puppy.breed}). Could you please send me additional details and video?`,
    website: '', // honeypot
  });

  const activeImage = puppy.images[activeImageIndex] || puppy.images[0] || '/images/logo.png';
  const whatsappUrl = CONTACT_INFO.getWhatsAppEnquiryUrl(`${puppy.name} (${puppy.breed})`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return; // bot catch
    setFormSent(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* 1. MEDIA COLUMN (HERO IMAGE + THUMBNAILS) */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* Main Photo Container */}
        <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full rounded-3xl overflow-hidden bg-white shadow-xl border border-cocoa/10">
          <Image
            src={activeImage}
            alt={`${puppy.name} - Photo ${activeImageIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            fetchPriority="high"
            className="object-cover"
          />

          <div className="absolute top-4 left-4 bg-honey/95 text-cocoa text-xs font-semibold py-1.5 px-3.5 rounded-full shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-toffee" />
            {puppy.status === 'available' ? 'Available' : 'Gone Home'}
          </div>

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium py-1 px-3 rounded-full">
            {activeImageIndex + 1} / {puppy.images.length}
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        {puppy.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {puppy.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                  activeImageIndex === idx
                    ? 'border-toffee shadow-md scale-95'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. DETAILS & ENQUIRY COLUMN */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-toffee font-hand">
            <span>every puppy is family</span>
            <span>•</span>
            <span>Dubai Showroom</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-cocoa mb-3">
            {puppy.name}
          </h1>

          <p className="text-base text-cocoa-soft font-sans leading-relaxed">
            {puppy.description}
          </p>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-cocoa/10 shadow-sm text-xs">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-milk/50">
            <Tag className="w-4 h-4 text-toffee shrink-0" />
            <div>
              <span className="block text-cocoa/60 text-[10px] uppercase font-semibold">Breed</span>
              <span className="font-bold text-cocoa">{puppy.breed}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-milk/50">
            <Heart className="w-4 h-4 text-toffee shrink-0" />
            <div>
              <span className="block text-cocoa/60 text-[10px] uppercase font-semibold">Gender</span>
              <span className="font-bold text-cocoa">{puppy.gender}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-milk/50">
            <Calendar className="w-4 h-4 text-toffee shrink-0" />
            <div>
              <span className="block text-cocoa/60 text-[10px] uppercase font-semibold">Age</span>
              <span className="font-bold text-cocoa">{puppy.age}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-milk/50">
            <MapPin className="w-4 h-4 text-toffee shrink-0" />
            <div>
              <span className="block text-cocoa/60 text-[10px] uppercase font-semibold">Location</span>
              <span className="font-bold text-cocoa">{puppy.location}</span>
            </div>
          </div>
        </div>

        {/* Direct Action WhatsApp Button */}
        <div className="flex flex-col gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            Ask about {puppy.name} on WhatsApp
          </a>
          <span className="text-[11px] text-center text-cocoa/60">
            Receive video walkthroughs, vet passport copies & health details instantly.
          </span>
        </div>

        {/* "Every Teddy Pup comes with" Checklist */}
        <div className="p-5 rounded-2xl bg-white border border-cocoa/10 shadow-sm flex flex-col gap-3">
          <h4 className="font-serif font-bold text-sm text-cocoa flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-toffee" />
            Every Teddy Pup comes with:
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-cocoa-soft">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Official international veterinary passport & microchip
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Up-to-date core vaccinations & deworming treatments
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Full health guarantee against hereditary conditions
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Complimentary puppy starter luxury pack & travel crate
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              24/7 Lifetime breeder guidance & settling-in advice
            </li>
          </ul>
        </div>

        {/* Quick Letter Enquiry Form */}
        <div className="p-6 rounded-2xl bg-honey-soft/30 border border-cocoa/10 flex flex-col gap-4">
          <h4 className="font-serif font-bold text-base text-cocoa">
            Send an enquiry for {puppy.name}
          </h4>

          {formSent ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex flex-col gap-1.5">
              <strong className="font-bold">Letter received! 🐾</strong>
              <span>Thank you! Our Dubai concierge will contact you via WhatsApp shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your Full Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="py-2.5 px-3.5 rounded-xl bg-white border border-cocoa/15 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-honey"
              />
              <input
                type="tel"
                placeholder="WhatsApp / Phone Number *"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="py-2.5 px-3.5 rounded-xl bg-white border border-cocoa/15 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-honey"
              />
              <input
                type="email"
                placeholder="Email Address (optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="py-2.5 px-3.5 rounded-xl bg-white border border-cocoa/15 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-honey"
              />
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="py-2.5 px-3.5 rounded-xl bg-white border border-cocoa/15 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-honey resize-none"
              />
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="hidden"
                tabIndex={-1}
              />
              <button
                type="submit"
                className="py-3 px-6 rounded-full bg-cocoa hover:bg-cocoa-soft text-milk font-semibold text-xs transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
