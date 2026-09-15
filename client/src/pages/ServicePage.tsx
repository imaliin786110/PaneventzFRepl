import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Building2, 
  Heart, 
  Trophy, 
  Sparkles, 
  PhoneCall, 
  Calendar,
  Layers,
  Flame,
  MessageCircle,
  ShieldCheck,
  Award,
  Crown,
  Volume2,
  Tv,
  Users,
  Clock,
  ArrowRight,
  Maximize2,
  X,
  Compass
} from "lucide-react";

interface ServiceData {
  id: string;
  slug: string;
  categoryTitle: string;
  title: string;
  tag: string;
  banner: string;
  introduction: string;
  planningCapabilities: {
    title: string;
    description: string;
    highlights: string[];
  }[];
  productionServices: {
    title: string;
    description: string;
    specs: string;
  }[];
  eventProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  galleryPhotos: {
    url: string;
    title: string;
    caption: string;
  }[];
}

const SERVICES_DATA: Record<string, ServiceData> = {
  corporate: {
    id: "corporate",
    slug: "corporate",
    categoryTitle: "Corporate Events",
    title: "Corporate Conclaves, Summits & Annual Conventions",
    tag: "FORTUNE 500 GRADE • 30+ YEARS LEGACY",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80",
    introduction: "From landmark enterprise conclaves and nationwide corporate rollouts like the Reliance Jio commercial launch and Reliance 40-Year Jubilee to executive shareholder meetings and international trade summits. Pan Eventz orchestrates high-stakes corporate occasions where acoustic clarity, visual immersion, and sovereign-grade precision are paramount.",
    planningCapabilities: [
      {
        title: "Strategic Agenda & Delegate Flow Engineering",
        description: "Comprehensive run-of-show choreography, multi-track breakout management, keynote transitions, and precision timekeeping.",
        highlights: ["Plenary & breakout session planning", "Executive keynote speaker coordination", "Real-time master cue sequencing"]
      },
      {
        title: "VVIP & Sovereign Protocol Hospitality",
        description: "White-glove executive hospitality, diplomatic green rooms, security liaison, and airport-to-stage motorcade coordination.",
        highlights: ["Diplomatic seating protocol", "Secure credentials & badge tracking", "Dedicated C-suite liaison officers"]
      },
      {
        title: "Venue Sourcing & Spatial Optimization",
        description: "Convention center and 5-star ballroom architectural layout planning engineered for maximum audience visibility and networking flow.",
        highlights: ["3D stage sightline modeling", "Exhibition stall footprinting", "Acoustically treated spatial barriers"]
      },
      {
        title: "Contingency & Redundancy Management",
        description: "Zero-fail live event operations supported by uninterrupted dual-generator power feeds and redundant digital audio/video switchers.",
        highlights: ["Automated power failover systems", "Parallel live backup video playback", "Certified structural load rigging"]
      }
    ],
    productionServices: [
      {
        title: "Curved 4K Ultra-Wide LED Matrices",
        description: "High-refresh rate borderless LED video walls delivering ultra-crisp presentation decks, video reveals, and synchronized multi-window media feeds.",
        specs: "P2.6 / P1.9 fine pixel pitch, Barco / Novastar 4K processing"
      },
      {
        title: "German Line Array Acoustic Reinforcement",
        description: "Precision-tuned d&b audiotechnik and L-Acoustics arrays providing flawless speech intelligibility and dynamic sound without echo.",
        specs: "Multi-zone delay towers, Sennheiser Digital 6000 wireless"
      },
      {
        title: "Broadcast Intelligent Lighting & Stagecraft",
        description: "Theatrical lighting design with computerized moving heads, broadcast-quality daylight keylights, and architectural perimeter illumination.",
        specs: "GrandMA3 DMX control, Arri daylight softlights, beam arrays"
      },
      {
        title: "Multi-Camera 4K Live Broadcast & Webcasting",
        description: "High-definition multi-angle broadcast recording, satellite uplink transmission, and enterprise-grade hybrid live streaming platforms.",
        specs: "Sony 4K broadcast chains, teleprompters, digital mixers"
      }
    ],
    eventProcess: [
      {
        step: "01",
        title: "Executive Briefing & Scoping",
        description: "In-depth discovery session with senior directors to align event objectives, brand message, attendee demographics, and budget."
      },
      {
        step: "02",
        title: "3D CAD Blueprinting & Acoustics",
        description: "Generating precision 3D stage renders, seating plans, sound heatmaps, and minute-by-minute run-of-show schedules."
      },
      {
        step: "03",
        title: "Rehearsal & Master Cue Sync",
        description: "Pre-event technical rehearsals, speaker stage walks, teleprompter runs, and audiovisual cues checked with zero tolerance for error."
      },
      {
        step: "04",
        title: "Live Production & Post-Archive",
        description: "On-site front-of-house show command, flawless live execution, followed by comprehensive 4K media reels and telemetry reports."
      }
    ],
    galleryPhotos: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
        title: "Reliance Jio Nationwide Commercial Launch",
        caption: "Ultra-wide curved LED stage displays and high-capacity delegate seating for thousands of attendees."
      },
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
        title: "Reliance 40-Year Milestone Jubilee",
        caption: "Historic corporate jubilee celebration with kinetic stage architecture and multi-tier lighting arrays."
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
        title: "LEAP Global Enterprise Summit",
        caption: "Plenary auditorium stage setup featuring fine-pitch LED backdrops and crystal-clear acoustic dispersion."
      }
    ]
  },

  wedding: {
    id: "wedding",
    slug: "wedding",
    categoryTitle: "Weddings & Celebrations",
    title: "Royal Destination Weddings & Palatial Celebrations",
    tag: "ROYAL HERITAGE & BESPOKE WEDDINGS",
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
    introduction: "Personal stories transformed into unforgettable royal occasions. Whether a royal heritage palace wedding in Rajasthan, an opulent coastal celebration, or an intimate multi-day family milestone, Pan Eventz brings over 30 years of artistic vision, cultural sensitivity, and world-class production together.",
    planningCapabilities: [
      {
        title: "Curated Spatial & Decor Theming",
        description: "Transforming palatial ballrooms, heritage courtyards, and open-air lawns into bespoke fairytale settings reflecting family heritage.",
        highlights: ["Bespoke theme moodboarding", "Floral structural installations", "Custom mandap architectural design"]
      },
      {
        title: "Guest Hospitality & Concierge Management",
        description: "White-glove patron care from luxury airport transfers and concierge check-ins to bespoke hospitality lounges and gifting suites.",
        highlights: ["Dedicated family shadow managers", "Chauffeur & transfer coordination", "Multilingual concierge desks"]
      },
      {
        title: "Ritual Timing & Ceremonial Choreography",
        description: "Respectful integration of sacred traditions with modern comfort, coordinating baraat routes, bridal entries, and sangeet rehearsals.",
        highlights: ["Grand bridal entry choreography", "Baraat mobile sound & logistics", "Sangeet stage production & cues"]
      },
      {
        title: "Bespoke Culinary & Vendor Harmony",
        description: "Seamless alignment with master royal caterers, luxury floral artisans, and celebrity photographers for an effortless experience.",
        highlights: ["Catering layout & flow planning", "Live culinary station integration", "Photographer lighting coordination"]
      }
    ],
    productionServices: [
      {
        title: "Architectural Mandap & Stage Engineering",
        description: "Structural safety-certified stages, suspended floral canopies, waterbody platforms, and custom gold scrim installations.",
        specs: "Engineered load-bearing trusses, waterproof stage decking"
      },
      {
        title: "Ambient Warm-Dim Theatrical Lighting",
        description: "Golden-hour lighting arrays, candlelit wash illumination, and moving spotlights tailored specifically for high-fashion photo & video beauty.",
        specs: "High-CRI warm LEDs, wireless battery uplights, fairy light ceilings"
      },
      {
        title: "Acoustic Warmth & Live Orchestra Sound",
        description: "High-fidelity low-profile speakers providing crystal-clear sound for sacred mantras and energetic sangeet performances without visual clutter.",
        specs: "Ultra-compact column speakers, wireless instrument mics"
      },
      {
        title: "Cold Pyrotechnics & Low-Fog Atmospherics",
        description: "Indoor-safe sparkular fountains, heavy dry-ice cloud effects for first dances, and celebratory petal cannons.",
        specs: "Non-pyrotechnic sparkulars, certified safety operators"
      }
    ],
    eventProcess: [
      {
        step: "01",
        title: "Creative Discovery & Vision",
        description: "Meeting with the families to understand ancestral traditions, personal aesthetics, guest profile, and signature wishes."
      },
      {
        step: "02",
        title: "Design Mockups & Prototyping",
        description: "Creating full 3D visual walkthroughs, floral mockups, fabric swatches, and lighting palettes for every event day."
      },
      {
        step: "03",
        title: "Logistics & Vendor Alignment",
        description: "Managing travel, accommodations, venue setup schedules, and sound balancing for all live performers and ceremonies."
      },
      {
        step: "04",
        title: "Flawless Celebration Delivery",
        description: "Discrete, seamless on-ground management ensuring the bride, groom, and families can immerse themselves in pure joy."
      }
    ],
    galleryPhotos: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
        title: "Royal Heritage Mandap Architecture",
        caption: "Opulent floral canopies and golden warm-dim illumination designed for timeless ceremonial beauty."
      },
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
        title: "Sangeet Night Concert-Style Stage",
        caption: "Dynamic moving head lights and concert-grade sound for high-energy family dance performances."
      },
      {
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
        title: "Palatial Evening Reception Decor",
        caption: "Bespoke chandelier installations and candlelight banquet architecture in a historic palace courtyard."
      }
    ]
  },

  "live-entertainment": {
    id: "live-entertainment",
    slug: "live-entertainment",
    categoryTitle: "Live Entertainment",
    title: "Arena Concerts, Sports Spectacles & Live Entertainment",
    tag: "STADIUM-SCALE AUDIO & LIGHTING • 30+ YEARS",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
    introduction: "Commanding the raw energy of massive audiences. Backed by 30+ years of founder Imran Mirza's entertainment leadership, Pan Eventz engineers stadium-scale music festivals, headline Bollywood artist tours, sports entertainment (including the landmark Topspin Spinnathon), and high-voltage cultural showcases.",
    planningCapabilities: [
      {
        title: "A-List Artist & Rider Management",
        description: "Direct celebrity procurement, contractual technical rider fulfillment, backstage hospitality, and security escort protocols.",
        highlights: ["Artist contract & technical rider compliance", "Backstage greenroom & VIP catering", "Dedicated celebrity liaison officers"]
      },
      {
        title: "Crowd Management & Arena Flow Dynamics",
        description: "Engineering safe audience movement, entry ticketing gantries, perimeter barricades, and rapid-response medical zones.",
        highlights: ["Mojo heavy-duty barricade deployment", "Multi-tier crowd zoning (VIP/Fan pits)", "Emergency evacuation route mapping"]
      },
      {
        title: "Statutory Licensing & Government Permissions",
        description: "Securing municipal, police, fire, entertainment tax, electrical inspectorate, and sound limit compliances seamlessly.",
        highlights: ["Single-window statutory clearances", "Decibel regulation compliance monitoring", "Structural stability certifications"]
      },
      {
        title: "Live Production Run-of-Show Command",
        description: "Minute-by-minute artist sequencing, inter-act stage changeovers, DJ warmups, and live broadcast cueing.",
        highlights: ["Sub-second stage patch changeovers", "Master stage manager intercom comms", "Time-coded pyrotechnic cueing"]
      }
    ],
    productionServices: [
      {
        title: "Heavy-Duty Concert Aluminum Trussing",
        description: "Ground-support towers and flying roof truss grids engineered and certified to suspend multi-ton lighting and audio arrays.",
        specs: "Eurotruss / Prolyte certified structures, electric chain hoists"
      },
      {
        title: "Festival-Grade Line Array Acoustics",
        description: "German d&b audiotechnik and L-Acoustics arrays providing punchy sub-bass and pristine vocal clarity across 20,000+ stadium spectators.",
        specs: "Dual 18-inch subwoofers, Digico / Yamaha digital consoles"
      },
      {
        title: "Dynamic Moving Beam Arrays & Special FX",
        description: "High-speed moving beam fixtures, strobes, hazers, cryo-CO2 jets, stadium flame projectors, and synchronized laser choreography.",
        specs: "30W full-color lasers, stadium cryo jets, GrandMA3 consoles"
      },
      {
        title: "Stadium Ultra-HD Video Screen Arrays",
        description: "Massive outdoor-rated high-brightness LED backdrops and delay relay screens delivering zero-latency live IMAG concert video.",
        specs: "IP65 outdoor 5000-nit LED walls, 4K video switchers"
      }
    ],
    eventProcess: [
      {
        step: "01",
        title: "Rider Analysis & Venue Survey",
        description: "Reviewing headliner technical riders against arena infrastructure, power capacity, and roof load structural limits."
      },
      {
        step: "02",
        title: "Acoustic Modeling & Rigging Design",
        description: "Simulating acoustic coverage using Soundvision to ensure balanced decibel distribution and zero dead zones."
      },
      {
        step: "03",
        title: "Build, Calibration & Soundchecks",
        description: "Multi-day on-site assembly, line checks, RF wireless frequency coordination, and artist rehearsals."
      },
      {
        step: "04",
        title: "Live Concert Orchestration",
        description: "Executing the live show with commanding stage management, lighting choreography, and crowd energy."
      }
    ],
    galleryPhotos: [
      {
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
        title: "Arena Stage Lighting Rig",
        caption: "Full concert trussing with automated moving beams and high-intensity atmospheric hazers."
      },
      {
        url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80",
        title: "Topspin Mega Spinnathon Sports Arena",
        caption: "High-octane sports festival integrating indoor athletics with concert-grade sound and lighting."
      },
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
        title: "Stadium Crowd & Live Sound Array",
        caption: "Festival crowd experiencing seamless line-array acoustic reinforcement and synchronized visuals."
      }
    ]
  },

  "awards-launches": {
    id: "awards-launches",
    slug: "awards-launches",
    categoryTitle: "Awards & Launches",
    title: "Prestigious Award Galas & Premiere Product Launches",
    tag: "RED CARPET GALAS & BRAND REVEALS",
    banner: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972657/11_imp_cover_page_umrvw4.jpg",
    introduction: "When your brand demands the spotlight and high-achievers deserve recognition. Pan Eventz designs red carpet awards evenings, cinematic car & luxury real estate launches, and high-impact brand unveilings with theatrical drama, A-list celebrity presenters, and press-stopping presentation.",
    planningCapabilities: [
      {
        title: "Red Carpet & Media Conclave Management",
        description: "Step-and-repeat media walls, press pits, broadcast risers, and curated celebrity arrivals with flash photography lighting.",
        highlights: ["Custom branded step-and-repeat backdrops", "Press accreditation & media risers", "Celebrity arrival timing & interviews"]
      },
      {
        title: "Trophy & Nominee Stage Logistics",
        description: "Backstage trophy sequencing, teleprompter script integration, confidential winner envelopes, and presenter escorts.",
        highlights: ["Automated dual teleprompter monitors", "Backstage trophy handler choreography", "Nominee seat allocation near stage"]
      },
      {
        title: "Theatrical Reveal Choreography",
        description: "Engineering maximum suspense and awe for product reveals with automated kabuki drops, turntables, and light reveals.",
        highlights: ["Motorized kabuki drop curtains", "Rotating vehicle display turntables", "Time-coded reveal musical stingers"]
      },
      {
        title: "VIP Patron & Media Hospitality",
        description: "Exclusive champagne lounges, VIP seating arrangements, and instant digital photo delivery for press and social media.",
        highlights: ["VIP banquet seating layout", "Instant photo delivery for PR teams", "Bespoke gift suite coordination"]
      }
    ],
    productionServices: [
      {
        title: "Motorized Kabuki Drop & Reveal Mechanics",
        description: "Precision electromagnetic release systems allowing massive silk drapes to drop in a split-second for dramatic unveils.",
        specs: "DMX electromagnetic solenoid release, high-speed winches"
      },
      {
        title: "Bespoke Stage Architecture & Gold Scrims",
        description: "Custom geometric stage fabrication featuring high-gloss finishes, champagne gold trims, and integrated LED risers.",
        specs: "CNC custom fabrication, acrylic mirror stage floors"
      },
      {
        title: "Intelligent Robotic Followspots & Spotlighting",
        description: "Computerized followspots seamlessly tracking award recipients from audience seats to the center stage podium.",
        specs: "RoboSpot remote followspot systems, high-CRI fixtures"
      },
      {
        title: "Synchronized Countdown & Multicam IMAG",
        description: "High-impact countdown animations, customized motion graphics for every award category, and multi-camera live video.",
        specs: "4K live broadcast switcher, digital audio playback"
      }
    ],
    eventProcess: [
      {
        step: "01",
        title: "Creative Theme & Reveal Scripting",
        description: "Collaborating with brand leadership to script the dramatic reveal moment, awards categories, and overall theme."
      },
      {
        step: "02",
        title: "Custom Fabrication & Mechanism Testing",
        description: "Constructing bespoke stage structures and stress-testing kabuki drops, turntables, and video synchronization."
      },
      {
        step: "03",
        title: "Red Carpet & Media Check-In",
        description: "Coordinating the arrival of celebrities and dignitaries on the red carpet with full press and media management."
      },
      {
        step: "04",
        title: "The Live Awards Showcase",
        description: "Orchestrating the awards ceremony with split-second cueing, celebratory fanfare, and seamless transitions."
      }
    ],
    galleryPhotos: [
      {
        url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972657/11_imp_cover_page_umrvw4.jpg",
        title: "Celebrity Red Carpet Gala & VIP Conclave",
        caption: "Pan Eventz Founder Imran Mirza hosting leading film celebrities and dignitaries at a red carpet awards evening."
      },
      {
        url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972673/DSC_0634_l5nc6v.jpg",
        title: "Pan Eventz Annual Awards Presentation",
        caption: "Stage presentation recognizing distinguished achievers with custom lighting and stagecraft."
      },
      {
        url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972672/DSC_0632_lvbvde.jpg",
        title: "Dynamic Stage Lighting & Production Rig",
        caption: "Concert-grade spotlights and gold accent framing on the main presentation stage."
      }
    ]
  },

  "private-experiences": {
    id: "private-experiences",
    slug: "private-experiences",
    categoryTitle: "Private Experiences",
    title: "Bespoke Milestone Celebrations & Sovereign Soirées",
    tag: "INTIMATE GRANDEUR & ABSOLUTE DISCRETION",
    banner: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972656/16_pi03mq.jpg",
    introduction: "Extraordinary celebrations held away from public eyes. For ultra-high-net-worth patrons, royal families, and private collectors, Pan Eventz crafts bespoke milestone celebrations, private estate soirees, and luxury yacht gatherings executed with absolute discretion, personalized culinary staging, and understated elegance.",
    planningCapabilities: [
      {
        title: "Absolute Confidentiality & Non-Disclosure",
        description: "Comprehensive non-disclosure compliance for all crew and staff, private communications, and secure event perimeters.",
        highlights: ["Enforced NDA compliance across all suppliers", "Discreet perimeter security protocols", "No unauthorized photography or social media"]
      },
      {
        title: "Private Estate & Heritage Transformation",
        description: "Converting personal estates, private islands, and luxury vessels into immersive dining environments without structural impact.",
        highlights: ["Non-invasive architectural protection", "Custom climate-controlled marquees", "Bespoke ambient landscaping & pathways"]
      },
      {
        title: "Sommelier & Bespoke Gastronomy Support",
        description: "Aligning table spatial planning with multi-course Michelin-grade dining, fine wine pairings, and private chef stations.",
        highlights: ["Custom kitchen prep infrastructure", "Temperature-controlled wine staging", "Handmade artisanal tableware styling"]
      },
      {
        title: "Curated Boutique Private Entertainment",
        description: "Procuring acoustic chamber quartets, world-class mentalists, or intimate unplugged sets by celebrated artists.",
        highlights: ["Unplugged acoustic artist sets", "Ambient classical & jazz ensembles", "Intimate living-room scale stage setups"]
      }
    ],
    productionServices: [
      {
        title: "Architectural Mood Illumination",
        description: "Discreet battery-powered warm uplights, delicate fairy light canopies, and micro-pinspot table illumination designed to flatter guests.",
        specs: "Wireless Astera LED tubes, custom antique brass fixtures"
      },
      {
        title: "Acoustically Invisible Sound Systems",
        description: "Ultra-compact column speakers and hidden subwoofers engineered to blend completely into architectural walls and greenery.",
        specs: "K-array / Bose Professional architectural audio"
      },
      {
        title: "Bespoke Glasshouse & Climate Marquees",
        description: "Clear-span glass marquees with integrated HVAC climate control, hardwood flooring, and custom acoustic ceiling drapes.",
        specs: "German clear-span structures, whisper-quiet HVAC units"
      },
      {
        title: "Custom Luxury Furniture & Table Scenography",
        description: "Handcrafted dining tables, velvet seating, custom embroidered linens, and heirloom-quality floral and crystal centerpieces.",
        specs: "Bespoke fabrication, fine Belgian linen, hand-cut crystal"
      }
    ],
    eventProcess: [
      {
        step: "01",
        title: "Confidential Consultation",
        description: "Private one-on-one consultation to understand the host's exact aesthetic, guest list nuances, and security requirements."
      },
      {
        step: "02",
        title: "Bespoke Sensory Scenography",
        description: "Curating custom lighting color temperatures, floral scents, acoustic soundscapes, and decor textiles tailored to the venue."
      },
      {
        step: "03",
        title: "Discreet White-Glove Staging",
        description: "On-site setup executed with minimal disruption to the estate, absolute respect for property, and meticulous cleanliness."
      },
      {
        step: "04",
        title: "The Private Soirée",
        description: "Seamless, invisible event orchestration allowing hosts to be true guests at their own extraordinary private celebration."
      }
    ],
    galleryPhotos: [
      {
        url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972656/16_pi03mq.jpg",
        title: "Exclusive VIP Gathering & Private Hospitality",
        caption: "Pan Eventz orchestrating high-profile hospitality and private entertainment for distinguished guests."
      },
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
        title: "Intimate Warm-Lit Soirée Setting",
        caption: "Bespoke ambient lighting and floral table architecture for an exclusive private celebration."
      },
      {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
        title: "Bespoke Luxury Dining Experience",
        caption: "Immersive private dinner setting blending fine dining logistics with atmospheric spatial design."
      }
    ]
  }
};

// Aliases for backwards compatibility with any existing link
const SLUG_ALIASES: Record<string, string> = {
  weddings: "wedding",
  cultural: "live-entertainment",
  sports: "live-entertainment",
  awards: "awards-launches",
  launches: "awards-launches",
  private: "private-experiences",
  education: "corporate",
  logistics: "corporate"
};

const TAB_ICONS: Record<string, any> = {
  corporate: Building2,
  wedding: Heart,
  "live-entertainment": Trophy,
  "awards-launches": Award,
  "private-experiences": Crown
};

const ServicePage = () => {
  const [, params] = useRoute("/services/:serviceType?");
  const rawParam = params?.serviceType?.toLowerCase() || "corporate";
  
  // Resolve alias
  const resolvedSlug = SLUG_ALIASES[rawParam] || (SERVICES_DATA[rawParam] ? rawParam : "corporate");
  const [activeTab, setActiveTab] = useState<string>(resolvedSlug);

  // Lightbox preview for gallery photos
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string; caption: string } | null>(null);

  useEffect(() => {
    if (rawParam && rawParam !== "all") {
      const canonical = SLUG_ALIASES[rawParam] || (SERVICES_DATA[rawParam] ? rawParam : "corporate");
      setActiveTab(canonical);
    }
  }, [rawParam]);

  const service = SERVICES_DATA[activeTab] || SERVICES_DATA.corporate;

  useEffect(() => {
    document.title = `${service.title} | Pan Eventz`;
  }, [service.title]);

  const serviceKeys = Object.keys(SERVICES_DATA);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E5C378] selection:text-black font-sans">
      <Header />

      <main className="pt-20">
        {/* Cinematic Hero Header */}
        <section 
          className="relative min-h-[62vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/[0.08]"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(5, 5, 5, 0.85), rgba(5, 5, 5, 0.98)), url('${service.banner}')`
          }}
        >
          {/* Ambient Champagne Halo Bloom */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#E5C378]/[0.05] rounded-full blur-[200px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-20 sm:py-24 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>{service.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-[1.12] mb-6">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              {service.introduction}
            </p>

            {/* Clear Enquiry and Direct Contact Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={`/contact?service=${service.slug}`}>
                <Button className="bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold px-8 py-6 rounded-2xl shadow-xl shadow-[#E5C378]/25 transition-all flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Request Proposal</span>
                </Button>
              </Link>

              <a 
                href={`https://wa.me/918082024787?text=${encodeURIComponent(`Hi Pan Eventz, I would like to inquire about your ${service.categoryTitle} services.`)}`}
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

        {/* Sticky Service Navigation Bar */}
        <section className="py-5 bg-[#08080A]/95 border-b border-white/[0.08] sticky top-20 z-30 backdrop-blur-xl shadow-2xl">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none no-scrollbar justify-start md:justify-center">
              {serviceKeys.map((key) => {
                const s = SERVICES_DATA[key];
                const Icon = TAB_ICONS[key] || Building2;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-cinzel font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer border flex items-center gap-2.5 duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] text-black border-[#E5C378] font-bold shadow-lg shadow-[#E5C378]/25"
                        : "bg-white/[0.03] text-zinc-300 border-white/[0.08] hover:border-[#E5C378]/50 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{s.categoryTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Service Content Container */}
        <div className="py-20 md:py-28 bg-[#050505]">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-24 sm:space-y-32">

            {/* Section 1: Strategic Planning Capabilities */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 text-[#E5C378] border border-[#E5C378]/30 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
                  <Compass className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>Curated Planning & Strategy</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                  Planning Capabilities
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-light mt-3">
                  Strategic spatial modeling, protocol management, and meticulous logistics designed for perfection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {service.planningCapabilities.map((plan, idx) => (
                  <div
                    key={idx}
                    className="p-8 sm:p-10 rounded-3xl bg-[#0A0A0D] hover:bg-[#111115] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono text-[#E5C378] tracking-widest uppercase">
                          Capability 0{idx + 1}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] group-hover:scale-110 transition-transform">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white group-hover:text-[#E5C378] transition-colors mb-3">
                        {plan.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                        {plan.description}
                      </p>
                    </div>

                    <div className="border-t border-white/[0.06] pt-4 space-y-2">
                      {plan.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E5C378]"></div>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Audio-Visual & Technical Production Services */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 text-[#E5C378] border border-[#E5C378]/30 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                  <Flame className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>World-Class Technical Infrastructure</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                  Production Services
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-light mt-3">
                  German line-array acoustics, 4K curved LED walls, intelligent lighting, and certified stagecraft.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {service.productionServices.map((prod, idx) => (
                  <div
                    key={idx}
                    className="p-8 sm:p-10 rounded-3xl bg-[#0A0A0D] hover:bg-[#111115] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono text-[#E5C378] tracking-widest uppercase">
                          Technical Discipline 0{idx + 1}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] group-hover:scale-110 transition-transform">
                          <Tv className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white group-hover:text-[#E5C378] transition-colors mb-3">
                        {prod.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                        {prod.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-zinc-300">
                      <span className="text-[#E5C378] font-bold">Specs:</span> {prod.specs}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Standardized Event Process */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                  <Layers className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>Execution Methodology</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white">
                  Event Delivery Process
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-light mt-3">
                  Four synchronized phases delivering zero-fail execution from creative vision to live show.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.eventProcess.map((proc, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-[#0A0A0D] hover:bg-[#111115] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-4xl sm:text-5xl font-cinzel font-bold text-[#E5C378]/25 mb-4 group-hover:text-[#E5C378] transition-colors">
                        {proc.step}
                      </div>

                      <h4 className="text-base sm:text-lg font-cinzel font-bold text-white mb-2.5">
                        {proc.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        {proc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Relevant Gallery Photographs */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5C378] uppercase tracking-widest mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Visual Production Archive</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                    Completed {service.categoryTitle} Captures
                  </h3>
                </div>

                <Link href="/media">
                  <Button variant="outline" className="border-white/20 text-white hover:border-[#E5C378] hover:text-[#E5C378] bg-white/[0.02] font-cinzel font-medium text-xs rounded-xl px-5 py-2.5 cursor-pointer">
                    <span>Explore Full Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.galleryPhotos.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0A0A0D] border border-white/[0.08] hover:border-[#E5C378]/50 transition-all duration-500 shadow-2xl relative"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-black/50">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                          <Maximize2 className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#0D0D10] border-t border-white/[0.04]">
                      <h4 className="text-sm font-cinzel font-bold text-white truncate">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light line-clamp-1 mt-1">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Clear Enquiry CTA Banner */}
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0D0D10] via-[#121216] to-[#0A0A0C] border border-[#E5C378]/30 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E5C378]/[0.05] rounded-full blur-[140px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E5C378]">
                  Orchestrate With Pan Eventz
                </span>

                <h3 className="text-2xl sm:text-4xl font-cinzel font-bold text-white leading-tight">
                  Ready to Plan an Unforgettable {service.categoryTitle}?
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Connect directly with founder Imran Mirza and our senior production directors to commission your custom event blueprint.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <Link href={`/contact?service=${service.slug}`}>
                    <Button className="bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold px-8 py-6 rounded-2xl shadow-xl shadow-[#E5C378]/25 transition-all text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                      <span>Initiate Event Inquiry</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <a
                    href={`https://wa.me/918082024787?text=${encodeURIComponent(`Hi Pan Eventz, I would like to initiate planning for a ${service.categoryTitle}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 hover:border-[#E5C378] font-cinzel font-medium px-7 py-6 rounded-2xl transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                      <MessageCircle className="w-4 h-4 text-[#E5C378]" />
                      <span>WhatsApp VIP Desk</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Gallery Lightbox Modal */}
      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl bg-[#0A0A0E]/95 border border-[#E5C378]/30 p-4 text-white backdrop-blur-2xl rounded-3xl shadow-2xl">
          <DialogTitle className="sr-only">
            {selectedPhoto?.title || "Production Photograph"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedPhoto?.caption || "Pan Eventz service gallery capture"}
          </DialogDescription>

          {selectedPhoto && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <h4 className="text-base font-cinzel font-bold text-white truncate max-w-[85%]">
                  {selectedPhoto.title}
                </h4>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[65vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light">
                {selectedPhoto.caption}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ServicePage;
