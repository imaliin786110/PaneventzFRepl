import { useState, useEffect, useCallback, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/seo/SEO";
import { getSrcSet } from "@/lib/image-utils";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { 
  ZoomIn, 
  X, 
  Sparkles, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Filter, 
  Search,
  MessageCircle,
  SlidersHorizontal,
  Building2,
  Tv
} from "lucide-react";

export interface CloudinaryPortfolioImage {
  public_id: string;
  url: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  folder?: string;
  title?: string;
  category?: "celebrity" | "corporate" | "concerts" | "institutional";
  description?: string;
  technicalScope?: string;
  isVerifiedPanEventz?: boolean;
}

interface MediaFolder {
  name: string;
  displayName: string;
  category: "celebrity" | "corporate" | "concerts" | "institutional";
  images: CloudinaryPortfolioImage[];
  isLoading: boolean;
}

// Master Category Definitions
const MASTER_CATEGORIES = [
  { id: "all", label: "All Productions", countLabel: "Complete Archive" },
  { id: "celebrity", label: "Celebrity & Red Carpet", countLabel: "VIP Galas" },
  { id: "corporate", label: "Corporate Summits", countLabel: "Mega Conclaves" },
  { id: "concerts", label: "Concerts & Sports", countLabel: "Stadium Arenas" },
  { id: "institutional", label: "Civic & Cultural", countLabel: "Assemblies & Fests" },
] as const;

// Curated authentic metadata for genuine Pan Eventz completed productions
const AUTHENTIC_EVENT_METADATA: Record<string, {
  category: "celebrity" | "corporate" | "concerts" | "institutional";
  title: string;
  description: string;
  technicalScope: string;
}> = {
  "Imran (CEO) with Celebs": {
    category: "celebrity",
    title: "Celebrity Red Carpet Gala & VIP Dignitary Conclave",
    description: "Pan Eventz Founder & CEO Imran Mirza hosting leading Bollywood icons, cultural luminaries, and industry leaders at an exclusive red-carpet awards evening.",
    technicalScope: "VVIP Hospitality Protocol, Custom Gold Scrim Staging, Press Conclave Rigging & Atmospheric Lighting"
  },
  "Reliance Jio Launch": {
    category: "corporate",
    title: "Reliance Jio Commercial Launch & Mega Corporate Showcase",
    description: "Enterprise commercial launch executed with ultra-wide curved LED video backdrops, synchronized multi-camera broadcast switching, and seating for thousands of corporate delegates.",
    technicalScope: "Stadium-Grade Line Array Acoustics, Dual 4K LED Screen Arrays, Time-Coded Laser Spectacular"
  },
  "Reliance 40 years anniversary": {
    category: "corporate",
    title: "Reliance 40-Year Milestone Jubilee Celebration",
    description: "Historic industrial milestone jubilee celebrating four decades of corporate excellence with custom kinetic stage architecture and multi-tier seating.",
    technicalScope: "Kinetic Intelligent Moving Heads, High-Definition Stage Mapping, Presidential VIP Hospitality"
  },
  "Topspin Spinnathon": {
    category: "concerts",
    title: "Topspin Mega Spinnathon Arena Championship",
    description: "High-octane sports and entertainment marathon bringing together hundreds of synchronized athletes inside an electrifying concert-grade audio-visual arena.",
    technicalScope: "360-Degree Central Truss Rigging, Immersive Low-End Subwoofer Arrays, High-Speed Followspots"
  },
  "Rotary event": {
    category: "institutional",
    title: "Rotary International Sovereign District Assembly",
    description: "High-level civic and humanitarian conclave attended by international delegates, keynote speakers, and civic leaders with precision acoustic staging.",
    technicalScope: "Acoustic Voice Clarification Systems, Diplomatic Stage Podium, Live Multi-Feed Webcasting"
  },
  "LEAP Event 1": {
    category: "institutional",
    title: "LEAP Global Innovation & Leadership Summit (Stage I)",
    description: "International thought-leadership congress featuring cutting-edge enterprise presentations, keynote dialogues, and executive networking lounges.",
    technicalScope: "Fine-Pitch Pixel LED Panels, Automated Cueing Systems, Ambient Architectonic Lighting"
  },
  "LEAP Event 2": {
    category: "institutional",
    title: "LEAP Global Innovation & Leadership Summit (Stage II)",
    description: "Interactive plenary sessions and award ceremonies designed with modular staging for fluid transitions between panel discussions and keynote addresses.",
    technicalScope: "Multi-Zone Acoustic Delay Towers, Intelligent Spotlight Tracking, Digital Media Servers"
  },
  "Richa Housing event": {
    category: "corporate",
    title: "Richa Housing Landmark Unveil & Real Estate Gala",
    description: "Luxury real estate project premiere featuring 3D architectural projections, VIP banquet hospitality, and high-contrast ambient stage lighting.",
    technicalScope: "Architectural Video Mapping, Bespoke Champagne Gold Podiums, Red-Carpet Patron Coordination"
  },
  "College event": {
    category: "institutional",
    title: "Inter-Collegiate Cultural Festival & Youth Showcase",
    description: "Grand university campus festival featuring headline live band performances, inter-college arts battles, and festival-scale ground management.",
    technicalScope: "Heavy-Duty Concert Trussing, Multi-Band Sound Mixing Console, Safe Crowd Flow Management"
  },
  "Topspin event 1": {
    category: "concerts",
    title: "Topspin Live Stage & Arena Concert (Edition 1)",
    description: "Full-scale arena concert with synchronized multi-tier stage lighting, high-output smoke atmospherics, and high-fidelity live audio.",
    technicalScope: "Concert Truss Systems, Line Array Sound Enclosures, Dynamic DMX Staging"
  },
  "Topspin event 2": {
    category: "concerts",
    title: "Topspin Live Stage & Arena Concert (Edition 2)",
    description: "Vibrant live musical production orchestrating seamless artist transitions and immersive ambient visuals.",
    technicalScope: "Automated Moving Beams, High-Resolution LED Backdrop, Multi-Channel Audio"
  },
  "Topspin event 3": {
    category: "concerts",
    title: "Topspin Live Arena Experience (Edition 3)",
    description: "Dynamic stage setup featuring custom stage risers and surround acoustic dispersion for live stadium performances.",
    technicalScope: "Digital Audio Console, Sub-Bass Enclosures, Dynamic Stage Lighting"
  },
  "Topspin event 4": {
    category: "concerts",
    title: "Topspin Live Arena Experience (Edition 4)",
    description: "Precision stadium stage orchestration with custom-engineered truss configurations and panoramic audience coverage.",
    technicalScope: "Rigging Safety Certification, Concert Sound Array, Live Visual Sequencing"
  },
  "Topspin event 5": {
    category: "concerts",
    title: "Topspin Live Arena Experience (Edition 5)",
    description: "Festive celebration combining live musical acts, corporate sponsor showcases, and dynamic light choreography.",
    technicalScope: "Synchronized DMX Lighting, Crystal-Clear Wireless Microphone Systems, LED Facades"
  },
  "Topspin event 6": {
    category: "concerts",
    title: "Topspin Live Arena Experience (Edition 6)",
    description: "Grand finale arena production with stadium-grade audio reinforcement and synchronized visual media sequences.",
    technicalScope: "Arena-Grade Acoustic Balancing, Intelligent Wash Lighting, Live Video Distribution"
  },
  "Mix": {
    category: "corporate",
    title: "Pan Eventz Multi-Genre Production Archive",
    description: "A showcase of versatile stagecraft, audio engineering, and event logistics across diverse corporate and celebratory occasions.",
    technicalScope: "Custom Fabrication, Modular Trussing, Integrated Audio-Visual Architecture"
  }
};

const MediaPage = () => {
  // Active photo for the full-screen cinematic lightbox
  const [selectedPhoto, setSelectedPhoto] = useState<CloudinaryPortfolioImage | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState<boolean>(false);

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mediaFolders, setMediaFolders] = useState<MediaFolder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImagesMap, setLoadedImagesMap] = useState<Record<string, boolean>>({});

  // Touch swipe handling for mobile lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Folder names preserved exactly from existing Cloudinary integration
  const folderNames = [
    "Topspin Spinnathon",
    "College event",
    "Imran (CEO) with Celebs",
    "LEAP Event 1",
    "LEAP Event 2",
    "Mix",
    "Reliance 40 years anniversary",
    "Reliance Jio Launch",
    "Richa Housing event",
    "Rotary event",
    "Topspin event 1",
    "Topspin event 2",
    "Topspin event 3",
    "Topspin event 4",
    "Topspin event 5",
    "Topspin event 6"
  ];

  // Fetch images from Cloudinary folder via server proxy endpoint
  const fetchCloudinaryImages = async (folderName: string): Promise<CloudinaryPortfolioImage[]> => {
    try {
      const response = await fetch(`/api/cloudinary/${encodeURIComponent(folderName)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch images from ${folderName}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Error fetching images from ${folderName}:`, error);
      return [];
    }
  };

  // Load all folders and their images
  useEffect(() => {
    let isMounted = true;
    const loadAllFolders = async () => {
      setIsLoading(true);

      const folders: MediaFolder[] = folderNames.map((folderName) => {
        const meta = AUTHENTIC_EVENT_METADATA[folderName] || {
          category: "corporate",
          title: folderName,
          description: `Authentic Pan Eventz event production capture from the ${folderName} collection.`,
          technicalScope: "Comprehensive Audio-Visual Staging & Event Production"
        };
        return {
          name: folderName,
          displayName: folderName,
          category: meta.category,
          images: [],
          isLoading: true
        };
      });

      if (isMounted) setMediaFolders(folders);

      // Load images for each folder concurrently
      const folderPromises = folderNames.map(async (folderName) => {
        const images = await fetchCloudinaryImages(folderName);
        const meta = AUTHENTIC_EVENT_METADATA[folderName];
        
        // Enrich images with authentic Pan Eventz project descriptions
        const enrichedImages: CloudinaryPortfolioImage[] = images.map((img, i) => ({
          ...img,
          folder: folderName,
          title: meta ? `${meta.title} #${i + 1}` : `${folderName} — Capture ${i + 1}`,
          category: meta ? meta.category : "corporate",
          description: meta?.description || `High-resolution completed event capture from Pan Eventz archives.`,
          technicalScope: meta?.technicalScope || "Professional Sound, Lighting & Stage Architecture",
          isVerifiedPanEventz: true
        }));

        return { folderName, images: enrichedImages };
      });

      const results = await Promise.all(folderPromises);

      if (isMounted) {
        setMediaFolders(
          folders.map((folder) => {
            const found = results.find((r) => r.folderName === folder.name);
            return {
              ...folder,
              images: found ? found.images : [],
              isLoading: false
            };
          })
        );
        setIsLoading(false);
      }
    };

    loadAllFolders();
    return () => {
      isMounted = false;
    };
  }, []);

  // Aggregate all portfolio captures
  const getAllImages = useCallback((): CloudinaryPortfolioImage[] => {
    return mediaFolders.flatMap((folder) => folder.images);
  }, [mediaFolders]);

  // Filtered portfolio photos based on category, folder, and search query
  const filteredImages = useCallback((): CloudinaryPortfolioImage[] => {
    let list = getAllImages();

    // Macro Category Filter
    if (selectedCategory !== "all") {
      list = list.filter((img) => img.category === selectedCategory);
    }

    // Specific Folder / Collection Filter
    if (selectedFolder !== "all") {
      list = list.filter((img) => img.folder === selectedFolder);
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (img) =>
          img.title?.toLowerCase().includes(q) ||
          img.folder?.toLowerCase().includes(q) ||
          img.description?.toLowerCase().includes(q) ||
          img.technicalScope?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [getAllImages, selectedCategory, selectedFolder, searchQuery]);

  const activePhotos = filteredImages();
  const totalPhotosCount = getAllImages().length;

  // Open Lightbox
  const openImageModal = (image: CloudinaryPortfolioImage, index: number) => {
    setSelectedPhoto(image);
    setSelectedPhotoIndex(index);
    setIsModalOpen(true);
  };

  // Close Lightbox
  const closeImageModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
    setIsFullscreenMode(false);
  };

  // Navigate Lightbox
  const navigatePhoto = useCallback((direction: "prev" | "next") => {
    if (activePhotos.length === 0) return;
    
    let nextIndex = selectedPhotoIndex;
    if (direction === "next") {
      nextIndex = (selectedPhotoIndex + 1) % activePhotos.length;
    } else {
      nextIndex = (selectedPhotoIndex - 1 + activePhotos.length) % activePhotos.length;
    }
    
    setSelectedPhotoIndex(nextIndex);
    setSelectedPhoto(activePhotos[nextIndex]);
  }, [activePhotos, selectedPhotoIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigatePhoto("next");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigatePhoto("prev");
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeImageModal();
      } else if (e.key.toLowerCase() === "f") {
        setIsFullscreenMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, navigatePhoto]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        navigatePhoto("next");
      } else {
        navigatePhoto("prev");
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Track image load state for blur-up / fade-in effect
  const handleImageLoaded = (id: string) => {
    setLoadedImagesMap((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    document.title = "Cinematic Event Portfolio & Media Archive | Pan Eventz";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E5C378] selection:text-black font-sans">
      <SEO
        title="Cinematic Event Portfolio & Media Archive | Pan Eventz"
        description="Explore the Pan Eventz photographic archive of enterprise summits, royal destination weddings, live arena concerts, and celebrity galas executed across India."
        canonical="/media"
        ogType="website"
      />
      <Header />

      <main className="pt-20">
        {/* Cinematic Hero Header */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/[0.08]"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.96)), url('https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972657/11_imp_cover_page_umrvw4.jpg')"
          }}
        >
          {/* Ambient Champagne Bloom */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#E5C378]/[0.05] rounded-full blur-[200px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>Archival Production Dossier • Est. 1995</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-[1.12] mb-6">
              Cinematic Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Portfolio</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              A curated photographic record of authentic arena stadium concerts, nationwide corporate summits, celebrity red-carpet galas, and sovereign assemblies executed across India by Pan Eventz.
            </p>

            {/* Authenticity Credentials Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-zinc-300">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-[#E5C378]" />
                <span>100% Verified Pan Eventz Work</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <Layers className="w-4 h-4 text-[#E5C378]" />
                <span>{totalPhotosCount > 0 ? totalPhotosCount : "100+"} High-Resolution Master Captures</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <Building2 className="w-4 h-4 text-[#E5C378]" />
                <span>{mediaFolders.length} Curated Event Collections</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dual-Tier Category & Collection Filter Bar (Sticky) */}
        <section className="py-5 bg-[#08080A]/95 border-b border-white/[0.08] sticky top-20 z-30 backdrop-blur-xl shadow-2xl">
          <div className="container mx-auto px-4 sm:px-6 space-y-4">
            {/* Tier 1: Master Categories */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none no-scrollbar flex-1">
                {MASTER_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedFolder("all"); // reset specific folder when category changes
                      }}
                      className={cn(
                        "px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-cinzel font-medium transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer border flex items-center gap-2",
                        isActive
                          ? "bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] text-black border-[#E5C378] font-bold shadow-lg shadow-[#E5C378]/25"
                          : "bg-white/[0.03] text-zinc-300 border-white/[0.08] hover:border-[#E5C378]/50 hover:text-white"
                      )}
                    >
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar on Desktop */}
              <div className="hidden lg:flex items-center relative w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by event, VIP, venue..."
                  className="w-full pl-10 pr-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] focus:border-[#E5C378]/60 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Tier 2: Specific Event Collections Filter Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04] overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C378] whitespace-nowrap shrink-0 flex items-center gap-1.5 mr-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Collections:</span>
              </span>

              <button
                onClick={() => setSelectedFolder("all")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 border cursor-pointer",
                  selectedFolder === "all"
                    ? "bg-[#E5C378]/20 text-[#E5C378] border-[#E5C378]/50 font-semibold"
                    : "bg-transparent text-zinc-400 border-white/[0.06] hover:text-zinc-200 hover:border-white/20"
                )}
              >
                All Folders ({activePhotos.length})
              </button>

              {mediaFolders
                .filter((folder) => selectedCategory === "all" || folder.category === selectedCategory)
                .map((folder) => {
                  const isFolderActive = selectedFolder === folder.name;
                  return (
                    <button
                      key={folder.name}
                      onClick={() => setSelectedFolder(folder.name)}
                      disabled={folder.isLoading}
                      className={cn(
                        "px-3 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 border cursor-pointer",
                        isFolderActive
                          ? "bg-[#E5C378]/20 text-[#E5C378] border-[#E5C378]/50 font-semibold"
                          : "bg-transparent text-zinc-400 border-white/[0.06] hover:text-zinc-200 hover:border-white/20"
                      )}
                    >
                      {folder.displayName} {folder.images.length > 0 && `(${folder.images.length})`}
                    </button>
                  );
                })}
            </div>

            {/* Search Bar on Mobile */}
            <div className="flex lg:hidden items-center relative w-full pt-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] focus:border-[#E5C378]/60 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Premium Masonry Portfolio Showcase */}
        <section className="py-16 md:py-24 bg-[#050505] min-h-[60vh]">
          <div className="container mx-auto px-4 sm:px-6">
            {isLoading ? (
              <div className="text-center py-28 space-y-6">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-[#E5C378]/20"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-t-[#E5C378] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                </div>
                <p className="text-sm font-mono text-[#E5C378] uppercase tracking-[0.2em]">
                  Initializing High-Fidelity Portfolio Stream...
                </p>
                <p className="text-xs text-zinc-400 font-light">
                  Loading verified Pan Eventz completed productions from Cloudinary archives.
                </p>
              </div>
            ) : activePhotos.length === 0 ? (
              <div className="text-center py-24 bg-[#0D0D0E]/90 rounded-3xl border border-white/[0.08] max-w-lg mx-auto p-10 shadow-2xl">
                <Filter className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-cinzel font-bold text-white mb-2">No Matching Captures</h3>
                <p className="text-xs text-zinc-400 font-light mb-6">
                  {searchQuery 
                    ? `No photographs matched your search query "${searchQuery}".` 
                    : `No photographs found in the selected category or collection.`}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedFolder("all");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-cinzel font-semibold bg-[#E5C378]/20 border border-[#E5C378]/40 text-[#E5C378] hover:bg-[#E5C378] hover:text-black transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Active Filter Dossier Header */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#E5C378] uppercase tracking-widest mb-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Authentic Completed Works</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                      {selectedFolder !== "all" 
                        ? selectedFolder 
                        : selectedCategory !== "all"
                        ? MASTER_CATEGORIES.find(c => c.id === selectedCategory)?.label
                        : "Master Photographic Archive"}
                    </h2>
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    Showing <span className="text-[#E5C378] font-bold">{activePhotos.length}</span> of {totalPhotosCount} production captures
                  </div>
                </div>

                {/* Masonry Layout: Responsive Columns with natural image heights */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {activePhotos.map((image, index) => {
                    const isLoaded = loadedImagesMap[image.public_id];
                    return (
                      <div
                        key={`${image.public_id}-${index}`}
                        className="break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden bg-[#0A0A0C] border border-white/[0.08] hover:border-[#E5C378]/60 transition-all duration-500 relative shadow-xl hover:shadow-[0_10px_35px_rgba(229,195,120,0.12)]"
                        onClick={() => openImageModal(image, index)}
                      >
                        {/* Image Frame with Blur-up Loading */}
                        <div className="relative overflow-hidden bg-[#121215]">
                          {!isLoaded && (
                            <div className="absolute inset-0 bg-white/[0.02] animate-pulse flex items-center justify-center min-h-[220px]">
                              <Sparkles className="w-5 h-5 text-white/10" />
                            </div>
                          )}

                          <img
                            src={image.secure_url}
                            srcSet={getSrcSet(image.secure_url, [480, 800, 1200])}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            width={image.width || 800}
                            height={image.height || 600}
                            alt={image.title || `Pan Eventz production capture`}
                            loading="lazy"
                            decoding="async"
                            onLoad={() => handleImageLoaded(image.public_id)}
                            className={cn(
                              "w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]",
                              isLoaded ? "opacity-100" : "opacity-0"
                            )}
                          />

                          {/* Atmospheric Gradient Scrim Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                            {/* Top Bar: Verification Badge & Expand Button */}
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 border border-[#E5C378]/30 text-[10px] font-mono uppercase tracking-widest text-[#E5C378] backdrop-blur-md">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Verified Work</span>
                              </span>
                              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-black flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <Maximize2 className="w-4 h-4" />
                              </div>
                            </div>

                            {/* Bottom Bar: Captions and Project Info */}
                            <div>
                              <p className="text-[11px] font-mono text-[#E5C378] uppercase tracking-wider mb-1">
                                {image.folder}
                              </p>
                              <h4 className="text-sm font-cinzel font-bold text-white line-clamp-2 leading-snug">
                                {image.title}
                              </h4>
                              {image.technicalScope && (
                                <p className="text-[10px] text-zinc-300 font-light mt-1.5 line-clamp-1 border-t border-white/10 pt-1.5">
                                  {image.technicalScope}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Always visible subtle caption under image */}
                        <div className="p-3.5 bg-[#0D0D10] border-t border-white/[0.04] flex items-center justify-between text-xs">
                          <span className="font-cinzel text-zinc-200 font-medium truncate max-w-[75%]">
                            {image.folder || "Pan Eventz"}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Cinematic Full-Screen Lightbox Viewing Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className={cn(
            "bg-[#070709]/95 border border-[#E5C378]/30 p-0 overflow-hidden shadow-2xl text-white backdrop-blur-2xl transition-all duration-300",
            isFullscreenMode 
              ? "max-w-[98vw] w-[98vw] h-[96vh] rounded-2xl flex flex-col" 
              : "max-w-6xl w-[95vw] rounded-3xl"
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <DialogTitle className="sr-only">
            {selectedPhoto?.title || "Pan Eventz Portfolio Viewer"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedPhoto?.description || "High-resolution full-screen photograph of Pan Eventz completed project."}
          </DialogDescription>

          {selectedPhoto && (
            <div className="relative flex flex-col h-full max-h-[92vh]">
              {/* Lightbox Top Navigation Bar */}
              <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#0A0A0E]/80 backdrop-blur-md shrink-0">
                {/* Counter & Folder Tag */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tracking-widest text-[#E5C378] font-semibold">
                    {selectedPhotoIndex + 1} / {activePhotos.length}
                  </span>
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-zinc-600"></span>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 truncate max-w-[200px] sm:max-w-none">
                    {selectedPhoto.folder || "Pan Eventz Production"}
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E5C378]/10 border border-[#E5C378]/30 text-[10px] font-mono text-[#E5C378]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Production</span>
                  </span>
                </div>

                {/* Right Action Controls: Fullscreen toggle & Close */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreenMode(!isFullscreenMode)}
                    className="p-2 rounded-full bg-white/[0.05] hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                    title={isFullscreenMode ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
                  >
                    {isFullscreenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={closeImageModal}
                    className="p-2 rounded-full bg-white/[0.05] hover:bg-red-500/20 text-zinc-300 hover:text-red-400 transition-colors cursor-pointer flex items-center justify-center"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Visual Display Area with Floating Next/Prev Buttons */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black p-2 sm:p-6 min-h-[300px]">
                {/* Floating Previous Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhoto("prev");
                  }}
                  className="absolute left-3 sm:left-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/75 hover:bg-[#E5C378] text-white hover:text-black border border-white/20 hover:border-[#E5C378] flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer backdrop-blur-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Photograph Display with Transition */}
                <div className="relative w-full h-full flex items-center justify-center max-h-[62vh] sm:max-h-[68vh]">
                  <img
                    key={selectedPhoto.secure_url}
                    src={selectedPhoto.secure_url}
                    srcSet={getSrcSet(selectedPhoto.secure_url, [800, 1200, 1920])}
                    sizes="90vw"
                    width={selectedPhoto.width || 1600}
                    height={selectedPhoto.height || 1000}
                    decoding="async"
                    alt={selectedPhoto.title || "Pan Eventz Event Portfolio"}
                    className="max-h-[60vh] sm:max-h-[66vh] w-auto max-w-full object-contain rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 select-none"
                  />
                </div>

                {/* Floating Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhoto("next");
                  }}
                  className="absolute right-3 sm:right-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/75 hover:bg-[#E5C378] text-white hover:text-black border border-white/20 hover:border-[#E5C378] flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer backdrop-blur-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Editorial Caption Dossier & VIP Inquiry Panel */}
              <div className="px-5 sm:px-8 py-4 sm:py-5 border-t border-white/[0.08] bg-[#0A0A0E] shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Event Story & Technical Information */}
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C378] font-bold">
                        {selectedPhoto.folder}
                      </span>
                      <span className="text-zinc-600 text-xs">•</span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {selectedPhoto.category?.toUpperCase() || "EVENT PRODUCTION"}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-xl font-cinzel font-bold text-white tracking-wide">
                      {selectedPhoto.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {selectedPhoto.description}
                    </p>

                    {selectedPhoto.technicalScope && (
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 pt-1">
                        <Tv className="w-3.5 h-3.5 text-[#E5C378] shrink-0" />
                        <span className="truncate">Scope: {selectedPhoto.technicalScope}</span>
                      </div>
                    )}
                  </div>

                  {/* Direct VIP Inquiry CTA Button */}
                  <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                    <a
                      href={`https://wa.me/918082024787?text=${encodeURIComponent(
                        `Hi Pan Eventz, I was viewing "${selectedPhoto.title || selectedPhoto.folder}" in your portfolio archive and would like to discuss producing a similar event.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-cinzel font-bold hover:brightness-110 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire On WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MediaPage;
