import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Heart, 
  Trophy, 
  GraduationCap, 
  Theater, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Calendar,
  Layers,
  Flame,
  MessageCircle,
  ShieldCheck
} from "lucide-react";

interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  banner: string;
  description: string;
  features: { id: number; title: string; description: string }[];
  process: { id: number; title: string; description: string }[];
  gallery: { id: number; imageUrl: string; alt: string }[];
}

const serviceMeta: Record<string, { icon: any; title: string; tag: string; banner: string; price: string }> = {
  corporate: {
    icon: Building2,
    title: "Corporate Conclaves & Annual Summits",
    tag: "Fortune 500 Grade",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80",
    price: "Custom Packages Available"
  },
  wedding: {
    icon: Heart,
    title: "Royal Destination Weddings",
    tag: "Ultra-Luxury Curation",
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
    price: "Bespoke Royal Production"
  },
  sports: {
    icon: Trophy,
    title: "Stadium Sports Leagues & Marathons",
    tag: "Mass-Audience AV",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1920&q=80",
    price: "Arena & Stadium Scaled"
  },
  education: {
    icon: GraduationCap,
    title: "School & University Mega Festivals",
    tag: "High Energy Concerts",
    banner: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80",
    price: "Campus Fest Packages"
  },
  cultural: {
    icon: Theater,
    title: "Live Concerts & Celebrity Management",
    tag: "A-List Artists",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80",
    price: "Artist & Rider Management"
  },
  logistics: {
    icon: Radio,
    title: "Live AV Infrastructure & Equipment Rental",
    tag: "German Line Array & 4K LED",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
    price: "Technical Inventory Rental"
  }
};

const ServicePage = () => {
  const [, params] = useRoute("/services/:serviceType?");
  const serviceType = params?.serviceType || "all";
  const [activeTab, setActiveTab] = useState(
    serviceType !== "all" && serviceMeta[serviceType] ? serviceType : "corporate"
  );

  // Fetch service details
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) return [];
        return await res.json();
      } catch {
        return [];
      }
    },
  });

  const { data: serviceDetail, isLoading: loadingDetail } = useQuery({
    queryKey: ['/api/services', activeTab],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/services/${activeTab}`);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
    enabled: !!activeTab && activeTab !== "all"
  });

  const currentMeta = serviceMeta[activeTab] || serviceMeta.corporate;

  const fallbackServiceDetail: ServiceDetail = {
    id: 1,
    slug: activeTab,
    title: currentMeta.title,
    banner: currentMeta.banner,
    description: "Pan Eventz engineers end-to-end event infrastructure, combining architectural spatial layouts, high-fidelity concert acoustics, laser visual choreography, and white-glove hospitality to make your event a triumph.",
    features: [
      {
        id: 1,
        title: "Architectural Spatial Design",
        description: "Custom 3D stage schematics, attendee flow engineering, and immersive ambient decor."
      },
      {
        id: 2,
        title: "Concert Acoustic & 4K LED Walls",
        description: "German line array sound reinforcement with ultra-high-definition LED matrices."
      },
      {
        id: 3,
        title: "A-List Celebrity & Artist Management",
        description: "Direct talent procurement, rider fulfillment, security escorts, and rehearsal supervision."
      },
      {
        id: 4,
        title: "Military-Grade Contingency Management",
        description: "Redundant power generators, backup audio channels, and comprehensive crowd control."
      }
    ],
    process: [
      {
        id: 1,
        title: "Vision & Creative Scoping",
        description: "In-depth briefing with our senior directors to map attendee profile, brand essence, and key milestones."
      },
      {
        id: 2,
        title: "Technical Blueprint & 3D Renderings",
        description: "Complete stage CAD models, sound coverage heatmaps, lighting cues, and vendor timelines."
      },
      {
        id: 3,
        title: "Live Production Execution",
        description: "On-site master control desk commanding audio, lighting, video, artist entries, and hospitality."
      },
      {
        id: 4,
        title: "Post-Production Archive",
        description: "Complete 4K aftermovies, executive telemetry reports, and financial reconciliation."
      }
    ],
    gallery: [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80",
        alt: "Main Stage Production"
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
        alt: "Grand Lighting Setup"
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
        alt: "VIP Audience Experience"
      }
    ]
  };

  const displayServiceDetail = serviceDetail ? {
    ...serviceDetail,
    title: serviceDetail.title || currentMeta.title,
    banner: serviceDetail.banner || currentMeta.banner,
    features: (serviceDetail.features && serviceDetail.features.length > 0)
      ? serviceDetail.features.map((f: any, idx: number) => ({
          id: idx + 1,
          title: f.title || f.text || `Service Advantage ${idx + 1}`,
          description: f.description || "Delivered to international concert and corporate specifications."
        }))
      : fallbackServiceDetail.features,
    process: (serviceDetail.processSteps && serviceDetail.processSteps.length > 0)
      ? serviceDetail.processSteps.map((s: any, idx: number) => ({
          id: s.order || idx + 1,
          title: s.title,
          description: s.description
        }))
      : fallbackServiceDetail.process,
    gallery: serviceDetail.gallery && serviceDetail.gallery.length > 0 ? serviceDetail.gallery : fallbackServiceDetail.gallery
  } : fallbackServiceDetail;

  useEffect(() => {
    if (serviceType !== "all" && serviceMeta[serviceType]) {
      setActiveTab(serviceType);
    }
  }, [serviceType]);

  useEffect(() => {
    document.title = `${displayServiceDetail.title} | Pan Eventz Services`;
  }, [displayServiceDetail.title]);

  const categories = Object.keys(serviceMeta);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E5C378] selection:text-black font-sans">
      <Header />

      <main className="pt-20">
        {/* Editorial Hero Header */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/[0.08]"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.96)), url('${displayServiceDetail.banner}')`
          }}
        >
          {/* Ambient Champagne Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E5C378]/[0.04] rounded-full blur-[180px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>{currentMeta.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-[1.15] mb-6">
              {displayServiceDetail.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              {displayServiceDetail.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold px-8 py-6 rounded-2xl shadow-xl shadow-[#E5C378]/20 transition-all flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Request Proposal</span>
                </Button>
              </Link>
              
              <a 
                href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20inquire%20about%20your%20production%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 hover:border-[#E5C378] font-cinzel font-medium px-7 py-6 rounded-2xl transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                  <MessageCircle className="w-4 h-4 text-[#E5C378]" />
                  <span>WhatsApp VIP Desk</span>
                </Button>
              </a>

              <a href="tel:+919821337523">
                <Button variant="outline" className="border-white/10 hover:border-[#E5C378] text-zinc-300 hover:text-[#E5C378] bg-transparent font-cinzel font-medium px-6 py-6 rounded-2xl transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider cursor-pointer">
                  <PhoneCall className="w-4 h-4 text-[#E5C378]" />
                  <span>+91 98213 37523</span>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Category Navigation Tabs */}
        <section className="py-6 bg-[#08080A]/95 border-b border-white/[0.08] sticky top-20 z-30 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar justify-start md:justify-center">
              {categories.map((catKey) => {
                const meta = serviceMeta[catKey];
                const Icon = meta.icon;
                const isActive = activeTab === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setActiveTab(catKey)}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer border flex items-center gap-2.5 duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] text-black border-[#E5C378] font-bold shadow-lg shadow-[#E5C378]/20"
                        : "bg-white/[0.02] text-zinc-300 border-white/[0.08] hover:border-[#E5C378]/40 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{meta.title.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Core Details */}
        <section className="py-24 md:py-32 bg-[#050505]">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            
            {/* Features Grid */}
            <div className="mb-24 sm:mb-28">
              <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 text-[#E5C378] border border-[#E5C378]/30 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
                  <Flame className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>Key Technical Capabilities</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                  Why Industry Leaders Choose Pan Eventz
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {displayServiceDetail.features.map((feature: any) => (
                  <div
                    key={feature.id}
                    className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl group"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white group-hover:text-[#E5C378] transition-colors mb-2.5">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Execution Process */}
            <div className="mb-24 sm:mb-28">
              <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                  <Layers className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>Standardized Production Pipeline</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                  Flawless Execution from Concept to Reality
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayServiceDetail.process.map((step: any, idx: number) => (
                  <div
                    key={step.id || idx}
                    className="p-8 rounded-3xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 relative overflow-hidden shadow-2xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-4xl sm:text-5xl font-cinzel font-bold text-[#E5C378]/25 mb-4 group-hover:text-[#E5C378] transition-colors">
                        0{idx + 1}
                      </div>
                      <h4 className="text-base sm:text-lg font-cinzel font-bold text-white mb-2.5">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Previews */}
            {displayServiceDetail.gallery && displayServiceDetail.gallery.length > 0 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                      Recent Production Captures
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
                      Authentic photographs from our executed events.
                    </p>
                  </div>
                  <Link href="/media">
                    <Button variant="outline" className="border-white/20 text-white hover:border-[#E5C378] hover:text-[#E5C378] bg-white/[0.02] font-cinzel font-medium text-xs rounded-xl px-5 py-2.5 cursor-pointer">
                      <span>View Full Media Archive</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {displayServiceDetail.gallery.map((img: any, gIdx: number) => (
                    <div
                      key={img.id || gIdx}
                      className="rounded-3xl overflow-hidden border border-white/[0.08] hover:border-[#E5C378]/40 aspect-[4/3] bg-[#0D0D0E] group relative shadow-2xl transition-all duration-500"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.alt || "Pan Eventz Production"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <span className="text-xs font-cinzel font-semibold text-white">
                          {img.alt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;