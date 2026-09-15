import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/seo/SEO";
import { getSrcSet } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import Statistics from "@/components/home/Statistics";
import { 
  Trophy, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Compass, 
  Users, 
  ArrowRight,
  PhoneCall,
  Calendar,
  MessageCircle,
  CheckCircle2
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface AboutContent {
  mission: string;
  vision: string;
  history: string;
  values: { id: number; title: string; description: string; icon: any }[];
  milestones: Milestone[];
  team: TeamMember[];
  clients: string[];
}

const AboutPage = () => {
  const content: AboutContent = {
    mission: "To engineer transcendent live experiences that captivate audiences, elevate brands, and create everlasting memories through architectural spatial design, concert acoustics, and zero-compromise execution.",
    vision: "To set the benchmark for luxury event production and stadium-scale live entertainment across India, the Middle East, and worldwide.",
    history: "Founded in 2017 by industry veteran Imran Mirza with over 30 years of premier entertainment and event industry experience, Pan Eventz has orchestrated over 2,500+ landmark corporate galas, celebrity concerts, royal destination weddings, and large-scale sports leagues across 100+ cities in India and abroad.",
    values: [
      {
        id: 1,
        title: "Flawless Execution",
        description: "Zero-tolerance for error, millisecond audio-visual synchronization, and white-glove hospitality.",
        icon: Award
      },
      {
        id: 2,
        title: "Creative Innovation",
        description: "Architectural stage structures, dynamic laser mapping, and bespoke sensory experiences.",
        icon: Sparkles
      },
      {
        id: 3,
        title: "Unwavering Integrity",
        description: "Transparent budgeting, verified technical riders, and absolute confidentiality for VIPs.",
        icon: ShieldCheck
      },
      {
        id: 4,
        title: "Executive Oversight",
        description: "Direct executive leadership oversight from concept development through final applause.",
        icon: Users
      }
    ],
    milestones: [
      {
        year: "1994",
        title: "The Genesis",
        description: "Imran Mirza starts orchestrating large-scale concert acoustics and touring artist hospitality across India."
      },
      {
        year: "2005",
        title: "Mega Stadium Productions",
        description: "Pioneered computerized line-array sound engineering and multi-tier stage rigging for national stadium shows."
      },
      {
        year: "2017",
        title: "Founding of Pan Eventz",
        description: "Formal establishment of Pan Eventz as a full-spectrum luxury event management and AV infrastructure powerhouse."
      },
      {
        year: "2020",
        title: "Hybrid & Virtual Innovation",
        description: "Engineered ultra-low-latency 4K live broadcast infrastructure for multinational corporate summits."
      },
      {
        year: "2024",
        title: "2,500+ Milestone Surpassed",
        description: "Celebrated 2,500+ flawless productions across 100+ cities with 98% recurring enterprise client loyalty."
      },
      {
        year: "2026",
        title: "Global Turnkey Expansion",
        description: "Expanding turnkey luxury destination weddings and international corporate pavilions across UAE and Europe."
      }
    ],
    team: [
      {
        id: 1,
        name: "Imran Mirza",
        position: "Founder & Managing Director",
        bio: "With over 30 years of landmark experience in event production, Imran Mirza has directed iconic events across India and the UAE. His mastery over concert acoustics, stadium logistics, VIP artist security, and royal destination weddings has positioned Pan Eventz as an industry vanguard trusted by Fortune 500 giants and celebrity icons.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=700&q=80"
      },
      {
        id: 2,
        name: "Rajesh Nair",
        position: "Chief Technical Officer & AV Director",
        bio: "Specializing in d&b audiotechnik acoustics, mega LED matrix mapping, and computerized truss rigging with 18+ years of stadium tour engineering experience.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=700&q=80"
      },
      {
        id: 3,
        name: "Alisha Varma",
        position: "Head of Creative Production & Scenography",
        bio: "Architectural scenographer and lighting designer crafting immersive environments for luxury weddings, fashion weeks, and brand reveals.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=700&q=80"
      },
      {
        id: 4,
        name: "Farhan Sheikh",
        position: "Director of VIP Artist & Guest Hospitality",
        bio: "Spearheading red-carpet protocol, artist rider fulfillment, luxury transportation, and white-glove security for dignitaries and celebrity performers.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=700&q=80"
      }
    ],
    clients: [
      "Tata Motors",
      "Reliance Industries",
      "Aditya Birla Group",
      "HDFC Bank",
      "ICICI Bank",
      "DLF Luxury",
      "Mahindra & Mahindra",
      "Sunburn Festival",
      "Bollywood Music Project",
      "Taj Hotels & Resorts"
    ]
  };

  useEffect(() => {
    document.title = "About Our Legacy & Leadership | Pan Eventz";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E5C378] selection:text-black font-sans">
      <SEO
        title="About Our Legacy & Leadership | Pan Eventz"
        description="Founded in 2017 by Imran Mirza, Pan Eventz brings together 30+ years of pioneering event management, turnkey production, and world-class hospitality across India."
        canonical="/about"
        ogType="website"
      />
      <Header />

      <main className="pt-20">
        {/* Editorial Hero Header */}
        <section 
          className="relative min-h-[65vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/[0.08]"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.96)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          {/* Ambient Champagne Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E5C378]/[0.04] rounded-full blur-[180px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
              <Trophy className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>30+ Years Industry Heritage</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-[1.15] mb-6">
              The Art & Engineering of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Iconic Events</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Founded in 2017 by Imran Mirza, Pan Eventz synthesizes three decades of live entertainment mastery, concert-scale acoustics, and white-glove bespoke luxury.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold px-8 py-6 rounded-2xl shadow-xl shadow-[#E5C378]/20 transition-all flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Plan With Our Team</span>
                </Button>
              </Link>
              
              <a 
                href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20connect%20with%20your%20leadership%20team."
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

        {/* Mission & Vision Strip */}
        <section className="py-20 md:py-28 bg-[#08080A] border-b border-white/[0.06] relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Mission Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#E5C378]/5">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-cinzel font-bold text-white mb-4 group-hover:text-[#E5C378] transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {content.mission}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C378]/70">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C378]" />
                  <span>Architectural Spatial Precision</span>
                </div>
              </div>

              {/* Vision Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#E5C378]/5">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-cinzel font-bold text-white mb-4 group-hover:text-[#E5C378] transition-colors">
                    Our Vision
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {content.vision}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C378]/70">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C378]" />
                  <span>Global Benchmark of Grandeur</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Founder Spotlight */}
        <section className="py-24 md:py-32 bg-[#050505] border-b border-white/[0.06] relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Founder Portrait */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-[#E5C378]/30 shadow-2xl group bg-[#0D0D0E]">
                  <img
                    src={content.team[0].image}
                    srcSet={getSrcSet(content.team[0].image, [400, 600, 800])}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    width={600}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    alt="Imran Mirza - Founder & Managing Director"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-black font-cinzel font-bold text-xs uppercase tracking-wider mb-2.5 shadow-md">
                      Founder & Managing Director
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mb-1">
                      Imran Mirza
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                      30+ Years Event Industry Vanguard
                    </p>
                  </div>
                </div>
              </div>

              {/* Founder Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] backdrop-blur-md">
                  <Compass className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>Leadership Profile</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white leading-tight">
                  Mastery Forged Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Three Decades</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                  {content.team[0].bio}
                </p>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                  {content.history}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold px-8 py-6 rounded-2xl shadow-xl shadow-[#E5C378]/20 transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                      <span>Schedule Leadership Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Core Operating Values */}
        <section className="py-24 md:py-32 bg-[#08080A]">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 text-[#E5C378] border border-[#E5C378]/30 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-[#E5C378]" />
                <span>Operating Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                Our Non-Negotiable Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.values.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.id}
                    className="p-8 rounded-3xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white group-hover:text-[#E5C378] transition-colors mb-3">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 30-Year Milestones Timeline */}
        <section className="py-24 md:py-32 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                <Calendar className="w-3.5 h-3.5 text-[#E5C378]" />
                <span>Three Decades of Innovation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                Our Journey & Legacy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.milestones.map((milestone, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 relative group overflow-hidden shadow-2xl"
                >
                  <div className="text-4xl sm:text-5xl font-cinzel font-bold text-[#E5C378]/25 mb-4 group-hover:text-[#E5C378] transition-colors">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-cinzel font-bold text-white mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Production Team */}
        <section className="py-24 md:py-32 bg-[#08080A] border-t border-white/[0.06]">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                <Users className="w-3.5 h-3.5 text-[#E5C378]" />
                <span>Executive Command</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                The Masterminds Behind The Magic
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {content.team.map((member) => (
                <div 
                  key={member.id}
                  className="rounded-3xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] overflow-hidden hover:border-[#E5C378]/40 transition-all duration-500 group flex flex-col shadow-2xl"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-neutral-900">
                    <img 
                      src={member.image} 
                      srcSet={getSrcSet(member.image, [300, 500, 700])}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      width={400}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-[#0D0D0E]/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-cinzel font-bold text-white group-hover:text-[#E5C378] transition-colors">{member.name}</h4>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#E5C378]">{member.position}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee Enterprise Clients */}
        <section className="py-20 bg-[#050505] border-t border-b border-white/[0.06]">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5C378] font-semibold mb-8">
              Trusted By India's Foremost Sovereign Corporations, Festivals & Royal Families
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {content.clients.map((client, idx) => (
                <div 
                  key={idx}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-zinc-300 font-cinzel font-medium text-xs sm:text-sm hover:border-[#E5C378]/50 hover:text-[#E5C378] transition-all duration-300 shadow-sm"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Strip */}
        <Statistics />
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

