'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, MessageCircle, Phone, MapPin } from 'lucide-react';
import { MAIN_NAV_LINKS, CONTACT_INFO } from '@/data/navigation';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-night/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[82vw] max-w-[340px] bg-milk z-50 lg:hidden shadow-2xl flex flex-col justify-between border-l border-cocoa/10"
          >
            {/* Top Bar */}
            <div>
              <div className="p-5 flex items-center justify-between border-b border-cocoa/10">
                <span className="font-serif font-bold text-lg text-cocoa">
                  TeddyPups <span className="text-toffee text-xs font-sans">U.A.E.</span>
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-cocoa/10 text-cocoa transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-5 flex flex-col gap-2">
                {MAIN_NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`block py-2.5 px-3 rounded-xl text-base font-medium transition ${
                          isActive
                            ? 'bg-toffee text-milk font-semibold'
                            : 'text-cocoa hover:bg-honey-soft/40'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Contacts in Drawer */}
            <div className="p-5 border-t border-cocoa/10 bg-white/50 flex flex-col gap-3">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Chat on WhatsApp
              </a>

              <div className="flex items-center gap-2 text-xs text-cocoa-soft mt-1">
                <MapPin className="w-3.5 h-3.5 text-toffee" />
                <span>Dubai Showroom (By appointment)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-cocoa-soft">
                <Phone className="w-3.5 h-3.5 text-toffee" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
