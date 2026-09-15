import { useState } from "react";
import { 
  Award, 
  Eye, 
  Star,
  CheckCircle2
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getSrcSet } from "@/lib/image-utils";

interface CelebrityImage {
  id: string;
  public_id: string;
  secure_url: string;
  title: string;
  subtitle: string;
  tag: string;
}

const CelebritySection = () => {
  const [selectedImage, setSelectedImage] = useState<CelebrityImage | null>(null);

  const celebrityImages: CelebrityImage[] = [
    {
      id: "1",
      public_id: "11_imp_cover_page_umrvw4",
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972657/11_imp_cover_page_umrvw4.jpg",
      title: "Celebrity Gala & Red Carpet",
      subtitle: "Star-studded evenings with industry dignitaries and icons",
      tag: "Red Carpet Gala"
    },
    {
      id: "2",
      public_id: "DSC_0634_l5nc6v",
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972673/DSC_0634_l5nc6v.jpg",
      title: "An Evening of Recognition",
      subtitle: "Celebrating leadership, artistic excellence, and triumph",
      tag: "Awards & Honors"
    },
    {
      id: "3",
      public_id: "16_pi03mq",
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972656/16_pi03mq.jpg",
      title: "Distinguished Company",
      subtitle: "Moments shared with icons from cinema and entertainment",
      tag: "VIP Gathering"
    },
    {
      id: "4",
      public_id: "DSC_0632_lvbvde",
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972672/DSC_0632_lvbvde.jpg",
      title: "In the Spotlight",
      subtitle: "Behind the curtain of India's most celebrated galas",
      tag: "Production Archive"
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-b border-white/[0.08]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E5C378]/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <Award className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>Celebrity Archives</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight mb-4">
            Moments With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Icons</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto font-sans">
            A testament to three decades of orchestrating grand evenings with the most distinguished personalities from Bollywood, sports, and business.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {celebrityImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative bg-[#0D0D0E] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/[0.08] hover:border-[#E5C378]/60 hover:shadow-[0_15px_35px_rgba(229,195,120,0.15)]"
            >
              {/* Image with Aspect Ratio */}
              <div className="aspect-[4/5] relative overflow-hidden bg-black">
                <img
                  src={image.secure_url}
                  srcSet={getSrcSet(image.secure_url, [360, 640, 900])}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  width={600}
                  height={750}
                  alt={image.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#E5C378] text-[10px] font-bold tracking-wider uppercase border border-[#E5C378]/30 shadow-md font-mono">
                    <Star className="w-3 h-3 fill-[#E5C378] text-[#E5C378]" />
                    <span>{image.tag}</span>
                  </span>
                </div>

                {/* View Lightbox Indicator */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-[#E5C378] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-md border border-[#E5C378]/30">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Content Info */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 transform transition-transform duration-300">
                  <h3 className="text-base font-bold font-cinzel tracking-tight mb-1 text-white group-hover:text-[#E5C378] transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light font-sans">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-400 text-xs sm:text-sm font-medium font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E5C378] shrink-0" />
            <span>500+ High-Profile Celebrations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E5C378] shrink-0" />
            <span>Strict VVIP Privacy & Security Protocols</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E5C378] shrink-0" />
            <span>Turnkey AV & Sound Staging</span>
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#070709] border-white/15 text-white shadow-2xl">
          {selectedImage && (
            <div className="relative">
              <div className="max-h-[80vh] flex items-center justify-center bg-black">
                <img 
                  src={selectedImage.secure_url} 
                  srcSet={getSrcSet(selectedImage.secure_url, [800, 1200, 1600])}
                  sizes="90vw"
                  width={1200}
                  height={800}
                  decoding="async"
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>
              <div className="p-6 bg-[#0D0D0E] border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#E5C378] mb-1 font-mono">
                    {selectedImage.tag}
                  </div>
                  <h3 className="text-xl font-bold font-cinzel text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-0.5 font-light font-sans">
                    {selectedImage.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CelebritySection;