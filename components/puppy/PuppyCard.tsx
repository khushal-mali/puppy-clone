'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import type { Puppy } from '@/data/puppies';

interface PuppyCardProps {
  puppy: Puppy;
  priority?: boolean;
}

export default function PuppyCard({ puppy, priority = false }: PuppyCardProps) {
  const primaryImage = puppy.images[0] || '/images/logo.png';
  const isGirl = puppy.gender.toLowerCase().includes('girl');
  const isBoy = puppy.gender.toLowerCase().includes('boy');

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl overflow-hidden border border-cocoa/10 shadow-sm hover:shadow-xl transition-all flex flex-col"
    >
      <Link href={`/puppies/${puppy.slug}`} className="flex flex-col h-full">
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/5] w-full bg-honey-soft/30 overflow-hidden">
          <Image
            src={primaryImage}
            alt={`${puppy.name} - ${puppy.breed}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-silk"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Status / Available Badge */}
            <span className="tag-swing inline-flex items-center gap-1 text-[11px] font-semibold py-1 px-2.5 rounded-full bg-honey text-cocoa shadow-sm font-sans">
              <Sparkles className="w-3 h-3 text-toffee" />
              Available
            </span>

            {/* Video preview pill */}
            {puppy.hasVideo && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold py-1 px-2 rounded-full bg-black/60 text-white backdrop-blur-sm shadow-sm font-sans">
                <Play className="w-2.5 h-2.5 fill-white" />
                video
              </span>
            )}
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-serif font-bold text-lg text-cocoa group-hover:text-toffee transition-colors truncate">
                {puppy.name}
              </h3>
              {/* Gender Tag */}
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isGirl
                    ? 'bg-blush/60 text-toffee-ink'
                    : isBoy
                    ? 'bg-sky/60 text-sky-deep'
                    : 'bg-honey-soft text-cocoa'
                }`}
              >
                {puppy.gender}
              </span>
            </div>

            <p className="text-xs text-cocoa-soft font-medium">
              {puppy.breed}
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-cocoa/5 flex items-center justify-between text-xs text-cocoa/70">
            <span>{puppy.age}</span>
            <span className="text-[11px] font-medium text-toffee bg-honey-soft/40 px-2 py-0.5 rounded-md">
              {puppy.location}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
