import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { eventPhotoCategories, eventPhotos } from '@/lib/event-content';
import { getSrcSet } from '@/lib/image-utils';

export default function EventGallery({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState('All moments');
  const [selected, setSelected] = useState<number | null>(null);

  const photos = useMemo(() => {
    const filtered = eventPhotos.filter((photo) => filter === 'All moments' || photo.category === filter);
    return full ? filtered : filtered.slice(0, 12);
  }, [filter, full]);

  const current = selected === null ? null : photos[selected];
  const move = (offset: number) => setSelected((index) => (index === null ? null : (index + offset + photos.length) % photos.length));

  return (
    <div className="lx-gallery">
      {full && (
        <div className="lx-archive-bar">
          <div>
            <span>{eventPhotos.length}</span>
            <p>real Pan Eventz photographs preserved from the Cloudinary archive</p>
          </div>
          <div className="lx-filters" aria-label="Filter event photographs">
            {eventPhotoCategories.map((label) => (
              <button
                key={label}
                type="button"
                aria-pressed={filter === label}
                onClick={() => {
                  setFilter(label);
                  setSelected(null);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={full ? 'lx-mosaic lx-mosaic-full' : 'lx-mosaic'}>
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className={`lx-photo lx-photo-${photo.orientation}`}
            onClick={() => setSelected(index)}
            aria-label={`View ${photo.title}`}
          >
            <img
              src={photo.thumbnailUrl}
              srcSet={getSrcSet(photo.url, [480, 800, 1200])}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              loading={index < 6 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <span className="lx-photo-info">
              <small>{photo.category}</small>
              <strong>{photo.title}</strong>
            </span>
            <span className="lx-enlarge" aria-hidden="true">
              <Maximize2 size={18} />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={current !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          className="lx-lightbox"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') move(1);
            if (event.key === 'ArrowLeft') move(-1);
          }}
        >
          {current && (
            <>
              <DialogTitle>{current.title}</DialogTitle>
              <DialogDescription>{current.description}</DialogDescription>
              <img
                src={current.url}
                srcSet={getSrcSet(current.url, [800, 1200, 1920])}
                sizes="90vw"
                alt={current.title}
                width={current.width}
                height={current.height}
                decoding="async"
              />
              <div className="lx-lightbox-nav">
                <button type="button" onClick={() => move(-1)} aria-label="Previous photograph">
                  <ArrowLeft />
                </button>
                <span>{(selected ?? 0) + 1} / {photos.length}</span>
                <button type="button" onClick={() => move(1)} aria-label="Next photograph">
                  <ArrowRight />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
