import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, ZoomIn, X, Sparkles, Layers } from "lucide-react";

interface CloudinaryImage {
  public_id: string;
  url: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  folder?: string;
}

interface MediaFolder {
  name: string;
  displayName: string;
  images: CloudinaryImage[];
  isLoading: boolean;
}

const MediaPage = () => {
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [mediaFolders, setMediaFolders] = useState<MediaFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cloudinary folder names as provided
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

  // Fetch images from Cloudinary folder via server proxy
  const fetchCloudinaryImages = async (folderName: string): Promise<CloudinaryImage[]> => {
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
      
      const folders: MediaFolder[] = folderNames.map((folderName) => ({
        name: folderName,
        displayName: folderName,
        images: [],
        isLoading: true
      }));

      if (isMounted) setMediaFolders(folders);
      
      // Load images for each folder concurrently
      const folderPromises = folderNames.map(async (folderName) => {
        const images = await fetchCloudinaryImages(folderName);
        return { folderName, images };
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
    return () => { isMounted = false; };
  }, []);

  // Get all images for display
  const getAllImages = () => {
    return mediaFolders.flatMap(folder => 
      folder.images.map(img => ({ ...img, folder: folder.displayName }))
    );
  };

  // Filter images based on selected folder
  const getFilteredImages = () => {
    if (selectedFolder === "all") {
      return getAllImages();
    }
    const folder = mediaFolders.find(f => f.name === selectedFolder);
    return folder?.images.map(img => ({ ...img, folder: folder.displayName })) || [];
  };

  const openImageModal = (image: CloudinaryImage & { folder?: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.title = "Visual Archive & Event Gallery | Pan Eventz";
  }, []);

  const filteredImages = getFilteredImages();
  const totalImages = getAllImages().length;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E5C378] selection:text-black font-sans">
      <Header />
      
      <main className="pt-20">
        {/* Editorial Hero Header */}
        <section 
          className="relative min-h-[55vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/[0.08]"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.96)), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          {/* Ambient Champagne Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E5C378]/[0.04] rounded-full blur-[180px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>Visual Production Showcase</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-[1.15] mb-6">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Media Gallery</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              A curated chronicle of stadium concerts, high-profile sovereign summits, celebrity engagements, and royal destination weddings architected by Pan Eventz.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm font-mono text-zinc-300 backdrop-blur-md">
              <Layers className="w-4 h-4 text-[#E5C378]" />
              <span>{totalImages > 0 ? totalImages : "100+"} Production Captures • {mediaFolders.length} Curated Collections</span>
            </div>
          </div>
        </section>

        {/* Filter Navigation Bar */}
        <section className="py-6 bg-[#08080A]/95 border-b border-white/[0.08] sticky top-20 z-30 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
              <button
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer border duration-300",
                  selectedFolder === "all" 
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] text-black border-[#E5C378] font-bold shadow-lg shadow-[#E5C378]/20" 
                    : "bg-white/[0.02] text-zinc-300 border-white/[0.08] hover:border-[#E5C378]/40 hover:text-white"
                )}
                onClick={() => setSelectedFolder("all")}
              >
                All Events ({totalImages})
              </button>
              
              {mediaFolders.map((folder) => (
                <button
                  key={folder.name}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer border duration-300",
                    selectedFolder === folder.name 
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] text-black border-[#E5C378] font-bold shadow-lg shadow-[#E5C378]/20" 
                      : "bg-white/[0.02] text-zinc-300 border-white/[0.08] hover:border-[#E5C378]/40 hover:text-white"
                  )}
                  onClick={() => setSelectedFolder(folder.name)}
                  disabled={folder.isLoading}
                >
                  {folder.displayName} {folder.images.length > 0 && `(${folder.images.length})`}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Media Gallery Grid */}
        <section className="py-20 md:py-28 bg-[#050505]">
          <div className="container mx-auto px-4 sm:px-6">
            {isLoading ? (
              <div className="text-center py-24 space-y-5">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#E5C378] border-t-transparent mx-auto"></div>
                <p className="text-sm font-mono text-zinc-400 font-light">Loading high-resolution media gallery...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-24 bg-[#0D0D0E]/90 rounded-3xl border border-white/[0.08] max-w-lg mx-auto p-10 shadow-2xl">
                <ImageIcon className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-cinzel font-bold text-white mb-2">No Captures Found</h3>
                <p className="text-xs text-zinc-400 font-light">
                  {selectedFolder === "all" 
                    ? "No images currently available in the archive." 
                    : `No images currently indexed under "${selectedFolder}".`}
                </p>
              </div>
            ) : (
              <>
                {/* Active Filter Title */}
                {selectedFolder !== "all" && (
                  <div className="mb-10 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                        {selectedFolder}
                      </h2>
                      <p className="text-xs font-mono text-[#E5C378] font-medium mt-1">
                        {filteredImages.length} High-Resolution Photographs
                      </p>
                    </div>
                  </div>
                )}

                {/* Gallery Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredImages.map((image, index) => (
                    <div 
                      key={`${image.public_id}-${index}`}
                      className="group cursor-pointer rounded-3xl overflow-hidden bg-[#0D0D0E]/90 border border-white/[0.08] hover:border-[#E5C378]/50 transition-all duration-500 relative shadow-2xl"
                      onClick={() => openImageModal(image)}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-black/50">
                        <img 
                          src={image.secure_url}
                          alt={`Pan Eventz ${image.folder || 'production'}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                            <ZoomIn className="w-5 h-5" />
                          </div>
                        </div>

                        {image.folder && (
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="inline-block text-[11px] font-cinzel font-medium text-zinc-200 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 truncate max-w-full">
                              {image.folder}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl bg-[#0D0D0E]/95 border border-[#E5C378]/30 p-3 overflow-hidden shadow-2xl rounded-3xl text-white backdrop-blur-xl">
          <DialogTitle className="sr-only">
            {selectedImage?.folder || 'Pan Eventz Media'}
          </DialogTitle>
          {selectedImage && (
            <div className="relative flex flex-col items-center">
              <div className="w-full flex items-center justify-between p-4 border-b border-white/[0.08] mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E5C378]">
                  {selectedImage.folder || "Pan Eventz Gallery"}
                </span>
                <button
                  onClick={closeImageModal}
                  className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
                <img 
                  src={selectedImage.secure_url}
                  alt={`Pan Eventz ${selectedImage.folder || 'production'}`}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl"
                />
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
