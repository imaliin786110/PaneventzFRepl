import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/seo/SEO";
import { getSrcSet } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Star, 
  Sliders, 
  PhoneCall,
  MessageCircle
} from "lucide-react";

interface EventDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  clientName?: string;
  attendees?: number;
  status: string;
  bannerImage?: string;
  gallery?: { id: number; imageUrl: string; alt: string; type: string }[];
  keyHighlights?: string[];
  services?: string[];
  testimonial?: {
    content: string;
    author: {
      name: string;
      title: string;
      avatar?: string;
    };
    rating: number;
  };
}

const EventDetailPage = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const pathname = window.location.pathname;
  const slugMatch = pathname.match(/\/event\/(.+)/);
  const eventSlug = slugMatch ? slugMatch[1] : "";

  const { data: event } = useQuery({
    queryKey: [`/api/events/${eventSlug}`],
    queryFn: () => fetch(`/api/events/${eventSlug}`).then(res => res.json()),
    enabled: !!eventSlug,
  });

  const fallbackEvent: EventDetail = {
    id: 1,
    slug: "annual-corporate-summit-2023",
    title: "Global Leadership & Innovation Summit",
    description: "An extraordinary executive conclave hosting Fortune 500 dignitaries, international delegates, and industry thought leaders. Pan Eventz engineered the entire multi-day infrastructure—from bespoke kinetic staging and German d&b audiotechnik acoustics to zero-latency multi-continent broadcast uplinks.",
    date: "2023-11-15",
    location: "Grand Ballrooms, Taj Palace, New Delhi",
    category: "Corporate Conclave",
    clientName: "Global Tech Syndicate & Enterprise Partners",
    attendees: 1200,
    status: "Completed With Distinction",
    bannerImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=900&q=80",
    gallery: [
      { id: 1, imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80", alt: "Main Stage & 200ft LED Array", type: "image" },
      { id: 2, imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80", alt: "Keynote Address Acoustics", type: "image" },
      { id: 3, imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80", alt: "VIP Presidential Lounge", type: "image" },
      { id: 4, imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80", alt: "Gala Dinner Setup", type: "image" },
      { id: 5, imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80", alt: "Laser Stage Sync", type: "image" },
      { id: 6, imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80", alt: "Networking Atrium", type: "image" },
    ],
    keyHighlights: [
      "200-Foot curved P2.6 ultra-HD LED dynamic stage matrix",
      "d&b audiotechnik German line-array acoustic mapping for zero echo",
      "Presidential security protocols & biometric VIP access gating",
      "Redundant multi-satellite uplinks streaming in 4K to 18 global hubs",
      "Custom kinetic motorized ceiling trussing with circadian mood lighting",
      "Interactive RFID attendee networking telemetry and bespoke mobile portal"
    ],
    services: [
      "Master Event Concept & Architectural Spatial Design",
      "Stagecraft, Trussing & Kinetic Rigging",
      "Sound Reinforcement & Acoustic Engineering",
      "4K Broadcast & Multi-Cam Telecast",
      "VIP Hospitality & Dignitary Protocol",
      "Permits, Security, Fire & Municipal Approvals"
    ],
    testimonial: {
      content: "Pan Eventz delivered an architectural and acoustic masterpiece for our Global Summit. Imran Mirza's team operated with the precision of a Swiss timepiece under international scrutiny.",
      author: {
        name: "Vikram Mehta",
        title: "Senior Vice President & Chief of Staff, Global Tech Solutions",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
      },
      rating: 5
    }
  };

  const displayEvent: EventDetail = event || fallbackEvent;

  useEffect(() => {
    document.title = `${displayEvent.title} | Pan Eventz Case Study`;
    window.scrollTo(0, 0);
  }, [displayEvent]);

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-[#E5C378] selection:text-black font-sans">
      <SEO
        title={`${displayEvent.title} | Pan Eventz Case Study`}
        description={displayEvent.description}
        canonical={`/event/${displayEvent.slug}`}
        ogType="article"
        ogImage={displayEvent.bannerImage}
        schema={{
          "@type": "Event",
          "name": displayEvent.title,
          "description": displayEvent.description,
          "startDate": displayEvent.date,
          "location": {
            "@type": "Place",
            "name": displayEvent.location
          },
          "organizer": {
            "@type": "EventPlanner",
            "name": "Pan Eventz",
            "url": "https://paneventz.com"
          },
          "image": displayEvent.bannerImage
        }}
      />
      <Header />

      <main className="pt-24 md:pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link href="/media">
            <button className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-[#E5C378] transition-colors py-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Media & Showcase
            </button>
          </Link>
        </div>

        {/* Hero Banner Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl min-h-[480px] lg:min-h-[560px] flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <img 
              src={displayEvent.bannerImage} 
              srcSet={getSrcSet(displayEvent.bannerImage || '', [768, 1200, 1920])}
              sizes="100vw"
              width={1920}
              height={900}
              loading="eager"
              decoding="async"
              // @ts-ignore
              fetchpriority="high"
              alt={displayEvent.title}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>

            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
                Case Study & Production Profile
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight mb-6">
                {displayEvent.title}
              </h1>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-zinc-300">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D0D0E]/80 backdrop-blur-md border border-white/[0.08]">
                  <Tag className="w-4 h-4 text-[#E5C378]" />
                  <span className="font-cinzel">{displayEvent.category}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D0D0E]/80 backdrop-blur-md border border-white/[0.08]">
                  <Calendar className="w-4 h-4 text-[#E5C378]" />
                  <span className="font-mono">{formatDate(new Date(displayEvent.date))}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D0D0E]/80 backdrop-blur-md border border-white/[0.08]">
                  <MapPin className="w-4 h-4 text-[#E5C378]" />
                  <span>{displayEvent.location}</span>
                </div>
                {displayEvent.attendees && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D0D0E]/80 backdrop-blur-md border border-white/[0.08]">
                    <Users className="w-4 h-4 text-[#E5C378]" />
                    <span className="font-mono">{displayEvent.attendees.toLocaleString()}+ Attendees</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Tabs Area */}
            <div className="lg:col-span-8">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 bg-[#0D0D0E]/90 border border-white/[0.08] rounded-2xl p-1.5 mb-8">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:via-[#E5C378] data-[state=active]:to-[#C5981B] data-[state=active]:text-black text-zinc-300 font-cinzel font-semibold text-xs sm:text-sm transition-all"
                  >
                    Project Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="highlights" 
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:via-[#E5C378] data-[state=active]:to-[#C5981B] data-[state=active]:text-black text-zinc-300 font-cinzel font-semibold text-xs sm:text-sm transition-all"
                  >
                    Key Highlights
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gallery" 
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:via-[#E5C378] data-[state=active]:to-[#C5981B] data-[state=active]:text-black text-zinc-300 font-cinzel font-semibold text-xs sm:text-sm transition-all"
                  >
                    Event Gallery ({displayEvent.gallery?.length || 0})
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8 focus:outline-none">
                  <div className="bg-[#0D0D0E]/90 rounded-3xl p-8 sm:p-10 border border-white/[0.08] shadow-2xl">
                    <h3 className="text-2xl font-cinzel font-bold text-white mb-6">
                      Execution Blueprint & Strategic Intent
                    </h3>
                    <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-8">
                      {displayEvent.description}
                    </p>

                    {/* Client Testimonial */}
                    {displayEvent.testimonial && (
                      <div className="mt-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0D0D0E] to-[#121215] border border-[#E5C378]/30 relative overflow-hidden shadow-2xl">
                        <Quote className="absolute -top-2 right-4 w-20 h-20 text-[#E5C378]/10" />
                        <div className="flex items-center gap-1 mb-4 text-[#E5C378]">
                          {[...Array(displayEvent.testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-base sm:text-lg text-zinc-200 italic font-light leading-relaxed mb-6">
                          "{displayEvent.testimonial.content}"
                        </p>
                        <div className="flex items-center gap-4">
                          {displayEvent.testimonial.author.avatar && (
                            <img 
                              src={displayEvent.testimonial.author.avatar} 
                              alt={displayEvent.testimonial.author.name}
                              width={48}
                              height={48}
                              loading="lazy"
                              decoding="async"
                              className="w-12 h-12 rounded-full object-cover border-2 border-[#E5C378]"
                            />
                          )}
                          <div>
                            <p className="text-sm font-cinzel font-bold text-white">{displayEvent.testimonial.author.name}</p>
                            <p className="text-xs text-zinc-400 font-mono">{displayEvent.testimonial.author.title}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Highlights Tab */}
                <TabsContent value="highlights" className="focus:outline-none">
                  <div className="bg-[#0D0D0E]/90 rounded-3xl p-8 sm:p-10 border border-white/[0.08] shadow-2xl">
                    <h3 className="text-2xl font-cinzel font-bold text-white mb-6">
                      Key Engineering & Logistical Milestones
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {displayEvent.keyHighlights?.map((highlight, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E5C378]/40 transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] font-cinzel text-sm font-bold flex-shrink-0">
                            0{index + 1}
                          </div>
                          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed pt-1.5 font-light">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery" className="focus:outline-none">
                  <div className="bg-[#0D0D0E]/90 rounded-3xl p-8 sm:p-10 border border-white/[0.08] shadow-2xl">
                    <h3 className="text-2xl font-cinzel font-bold text-white mb-6 flex items-center justify-between">
                      <span>Event Photography Showcase</span>
                      <span className="text-xs text-zinc-400 font-mono">Click photo to expand</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayEvent.gallery?.map((photo) => (
                        <div 
                          key={photo.id}
                          onClick={() => setSelectedPhoto(photo.imageUrl)}
                          className="relative h-48 rounded-2xl overflow-hidden border border-white/[0.08] cursor-pointer group hover:border-[#E5C378]/50 transition-all shadow-xl"
                        >
                          <img 
                            src={photo.imageUrl} 
                            srcSet={getSrcSet(photo.imageUrl, [400, 800])}
                            sizes="(max-width: 640px) 100vw, 33vw"
                            width={800}
                            height={600}
                            loading="lazy"
                            decoding="async"
                            alt={photo.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <p className="text-xs font-cinzel font-medium text-white truncate">{photo.alt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar Specs & Commissioning Card */}
            <div className="lg:col-span-4 space-y-8">
              {/* Event Specification Dossier */}
              <div className="bg-[#0D0D0E]/90 rounded-3xl p-8 border border-white/[0.08] shadow-2xl">
                <h4 className="text-base font-cinzel font-bold text-white mb-6 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#E5C378]" />
                  Production Dossier
                </h4>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Client / Host:</span>
                    <span className="font-semibold text-white text-right">{displayEvent.clientName || "Confidential"}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Date Completed:</span>
                    <span className="font-semibold text-white">{formatDate(new Date(displayEvent.date))}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Venue Location:</span>
                    <span className="font-semibold text-white text-right">{displayEvent.location}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Audience Scope:</span>
                    <span className="font-semibold text-white">{displayEvent.attendees ? `${displayEvent.attendees.toLocaleString()}+ VIPs` : "Exclusive"}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Production Status:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {displayEvent.status}
                    </span>
                  </div>
                </div>

                {/* Services Deployed */}
                {displayEvent.services && displayEvent.services.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/[0.08]">
                    <h5 className="text-xs font-mono uppercase tracking-[0.2em] text-[#E5C378] font-bold mb-4">
                      Services Deployed
                    </h5>
                    <ul className="space-y-2.5">
                      {displayEvent.services.map((svc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C378] flex-shrink-0 mt-0.5" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Direct Action */}
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <Link href={`/contact?service=event&reference=${encodeURIComponent(displayEvent.title)}`}>
                    <Button className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-[#E5C378]/20 flex items-center justify-center gap-2 uppercase tracking-wider">
                      <PhoneCall className="w-4 h-4" />
                      Commission Similar Production
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0D0D0E] to-[#121215] border border-[#E5C378]/30 text-center space-y-4 shadow-2xl">
                <h4 className="text-lg font-cinzel font-bold text-white">
                  Need Bespoke Consultation?
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Discuss technical staging, venue scouting, or celebrity artist booking directly with our leadership team.
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="text-[#25D366] font-bold">
                    <a href="https://wa.me/918082024787" target="_blank" rel="noreferrer" className="hover:underline flex items-center justify-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      +91 80820 24787 • WhatsApp Desk
                    </a>
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    Direct VIP Line: +91 98213 37523
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a 
                    href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20discuss%20an%20event." 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <Button className="w-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 hover:border-[#25D366] font-cinzel text-xs py-2 rounded-xl">
                      WhatsApp
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-white/10 hover:border-[#E5C378] text-zinc-300 hover:text-white bg-white/[0.02] font-cinzel text-xs py-2 rounded-xl">
                      Inquire
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <img 
                src={selectedPhoto} 
                srcSet={getSrcSet(selectedPhoto, [800, 1200, 1920])}
                sizes="90vw"
                width={1600}
                height={1000}
                decoding="async"
                alt="Expanded View"
                className="max-h-[85vh] w-auto rounded-3xl object-contain border border-[#E5C378]/30 shadow-2xl"
              />
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 border border-white/30 text-white flex items-center justify-center text-lg hover:bg-[#E5C378] hover:text-black transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EventDetailPage;