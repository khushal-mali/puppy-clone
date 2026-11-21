'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Puppy } from '@/data/puppies';

interface TicketCardProps {
  puppy: Puppy;
}

export default function TicketCard({ puppy }: TicketCardProps) {
  const primaryImage = puppy.images[0] || '/images/logo.png';

  return (
    <motion.div
      whileHover={{ y: -4, rotate: 0.5 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-[#fffdf8] rounded-2xl border-2 border-dashed border-cocoa/20 p-4 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
    >
      {/* Top Ticket Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-cocoa/10 text-xs font-hand text-cocoa-soft">
        <span className="tracking-wide">one ticket home</span>
        <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-toffee">
          Admit One
        </span>
      </div>

      {/* Puppy Photo Container */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-honey-soft/40 mb-3">
        <Image
          src={primaryImage}
          alt={puppy.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover sepia-[0.15] contrast-95"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-toffee font-hand text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <span>home</span>
          <Heart className="w-3 h-3 fill-toffee" />
        </div>
      </div>

      {/* Ticket Details */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-cocoa">
            {puppy.name}
          </h3>
          <span className="text-xs font-medium text-cocoa-soft">
            {puppy.breed}
          </span>
        </div>
        <p className="text-xs text-cocoa/60 font-sans">
          {puppy.gender} • {puppy.location}
        </p>
      </div>

      {/* Perforated edge circles */}
      <div className="absolute top-1/2 -left-3.5 w-6 h-6 rounded-full bg-milk border border-cocoa/20 -translate-y-1/2" />
      <div className="absolute top-1/2 -right-3.5 w-6 h-6 rounded-full bg-milk border border-cocoa/20 -translate-y-1/2" />
    </motion.div>
  );
}
