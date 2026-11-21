'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { CONTACT_INFO } from '@/data/navigation';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    { label: '🐾 View available puppies', message: 'Hi TeddyPups, I would like to see available teacup puppies.' },
    { label: '📍 Book showroom visit', message: 'Hi TeddyPups, I would like to book a private showroom visit in Dubai.' },
    { label: '✈️ Delivery & import details', message: 'Hi TeddyPups, could you tell me more about delivery and import?' },
    { label: '💬 Speak with a specialist', message: 'Hi TeddyPups, I have a few questions regarding puppy adoption.' },
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const text = customText || "Hi TeddyPups, I'd like to discuss a puppy.";
    const url = `https://wa.me/919898124987?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 w-[340px] max-w-[calc(100vw-3rem)] rounded-2xl bg-white shadow-2xl border border-cocoa/10 overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-[#2a170e] text-milk p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-honey/20 border border-honey/40 flex items-center justify-center text-honey text-lg font-serif">
                  TP
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#2a170e]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-milk flex items-center gap-1.5">
                    TeddyPups Concierge
                    <Sparkles className="w-3.5 h-3.5 text-honey" />
                  </h4>
                  <p className="text-xs text-milk/70">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-milk/70 hover:text-milk p-1 rounded-full hover:bg-milk/10 transition"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-milk/50 flex flex-col gap-3 max-h-[360px] overflow-y-auto text-sm">
              <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-cocoa/5 text-cocoa leading-relaxed text-xs">
                Welcome to <strong>TeddyPups Dubai</strong>! 🐾 We specialize in healthy, ethically raised teacup & miniature puppies. How can we help you today?
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-[11px] font-semibold text-cocoa-soft uppercase tracking-wider">
                  Quick options:
                </span>
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenWhatsApp(p.message)}
                    className="text-left text-xs bg-white hover:bg-honey-soft/50 border border-cocoa/10 hover:border-honey text-cocoa py-2 px-3 rounded-xl transition duration-150 flex items-center justify-between group"
                  >
                    <span>{p.label}</span>
                    <Send className="w-3 h-3 text-toffee opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-3 bg-white border-t border-cocoa/10 flex">
              <button
                onClick={() => handleOpenWhatsApp()}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Open WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4.5 rounded-full shadow-lg border-2 border-white transition group"
        aria-label="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-medium text-sm hidden sm:inline">WhatsApp us</span>
      </motion.button>
    </div>
  );
}
