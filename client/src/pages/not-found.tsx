import { Link } from "wouter";
import { ArrowLeft, Compass } from "lucide-react";
import SEO from "@/components/seo/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white p-6 relative overflow-hidden">
      <SEO
        title="404 - Page Not Found | Pan Eventz"
        description="The requested page could not be located in the Pan Eventz digital archive."
        noindex={true}
      />
      
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E5C378]/[0.06] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center bg-[#0D0D10]/90 border border-white/[0.08] p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center mx-auto mb-6 text-[#E5C378]">
          <Compass className="w-8 h-8" />
        </div>

        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5C378] mb-2 font-semibold">
          Error 404 · Uncharted Route
        </p>

        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
          The occasion you are seeking may have concluded or been relocated in our archive.
        </p>

        <Link href="/">
          <button 
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-black font-cinzel font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#E5C378]/20 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
