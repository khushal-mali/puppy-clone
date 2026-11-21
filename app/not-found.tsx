import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 rounded-full bg-honey-soft flex items-center justify-center text-3xl">
        🐾
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-hand text-toffee font-semibold uppercase tracking-wider">
          Page Not Found
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-cocoa">
          Puppy got lost on the way
        </h1>
        <p className="text-sm text-cocoa-soft max-w-md mx-auto mt-2 leading-relaxed font-sans">
          The page you are looking for does not exist or may have moved. If you were looking for delivery and collection information, you can find it under our How It Works guide.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="py-3 px-6 rounded-full bg-toffee hover:bg-toffee-deep text-milk text-xs font-semibold shadow-sm transition flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back to homepage
        </Link>
        <Link
          href="/how-it-works#delivery"
          className="py-3 px-6 rounded-full bg-white hover:bg-honey-soft/40 text-cocoa border border-cocoa/15 text-xs font-semibold transition"
        >
          Delivery & collection details
        </Link>
        <Link
          href="/puppies"
          className="py-3 px-6 rounded-full bg-honey hover:bg-honey-soft text-cocoa text-xs font-semibold transition flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          View puppies
        </Link>
      </div>
    </div>
  );
}
