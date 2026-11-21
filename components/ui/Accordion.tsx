'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpenDefault?: boolean;
}

export function AccordionItem({
  question,
  answer,
  isOpenDefault = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border border-cocoa/10 rounded-2xl bg-white overflow-hidden shadow-sm transition hover:border-cocoa/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-cocoa hover:text-toffee transition-colors"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 text-toffee"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-cocoa-soft leading-relaxed border-t border-cocoa/5 pt-3 font-sans">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({
  items,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpenDefault={idx === 0}
        />
      ))}
    </div>
  );
}
