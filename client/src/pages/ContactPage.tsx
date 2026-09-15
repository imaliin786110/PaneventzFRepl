import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/home/ContactSection";
import { MapPin, Phone, Mail, Sparkles, MessageCircle } from "lucide-react";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Headquarters & Plan an Event | Pan Eventz";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E5C378] selection:text-black font-sans">
      <Header />

      <main className="pt-20">
        {/* Editorial Hero Header */}
        <section 
          className="relative min-h-[55vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/[0.08]"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.96)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          {/* Ambient Champagne Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E5C378]/[0.04] rounded-full blur-[180px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>Direct Concierge Desk</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-[1.15] mb-6">
              Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Pan Eventz</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Speak directly with our senior event architects and production supervisors to transform your vision into an unforgettable landmark experience.
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto text-left">
              {/* WhatsApp Priority Desk */}
              <div className="p-6 rounded-3xl bg-[#0D0D0E]/90 backdrop-blur-xl border border-[#25D366]/30 hover:border-[#25D366] transition-all duration-500 flex items-start gap-4 shadow-2xl group">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-cinzel font-bold text-white mb-1">WhatsApp Desk</h3>
                  <a href="https://wa.me/918082024787" target="_blank" rel="noreferrer" className="text-xs font-mono text-[#25D366] hover:underline font-bold">+91 80820 24787</a>
                </div>
              </div>

              {/* Direct VIP Line */}
              <div className="p-6 rounded-3xl bg-[#0D0D0E]/90 backdrop-blur-xl border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 flex items-start gap-4 shadow-2xl group">
                <div className="w-12 h-12 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-cinzel font-bold text-white mb-1">Direct VIP Line</h3>
                  <a href="tel:+919821337523" className="text-xs font-mono text-zinc-300 font-light hover:text-[#E5C378] transition-colors block">+91 98213 37523</a>
                </div>
              </div>

              {/* Email Desk */}
              <div className="p-6 rounded-3xl bg-[#0D0D0E]/90 backdrop-blur-xl border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 flex items-start gap-4 shadow-2xl group">
                <div className="w-12 h-12 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-cinzel font-bold text-white mb-1">Executive Email</h3>
                  <a href="mailto:info@paneventz.com" className="text-xs font-mono text-zinc-300 font-light hover:text-[#E5C378] transition-colors">info@paneventz.com</a>
                </div>
              </div>

              {/* Operations Hub */}
              <div className="p-6 rounded-3xl bg-[#0D0D0E]/90 backdrop-blur-xl border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 flex items-start gap-4 shadow-2xl group">
                <div className="w-12 h-12 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-cinzel font-bold text-white mb-1">Operations Hub</h3>
                  <p className="text-xs font-mono text-zinc-400 font-light">Mumbai HQ & Delhi NCR</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

