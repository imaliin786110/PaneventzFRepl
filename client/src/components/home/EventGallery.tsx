import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { eventPhotos } from '@/lib/event-content';
import { getSrcSet } from '@/lib/image-utils';

export default function EventGallery({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState('All moments');
  const [selected, setSelected] = useState<number | null>(null);

  const photos = eventPhotos.filter((p) => filter === 'All moments' || p.category === filter);
  const current = selected === null ? null : photos[selected];
  const move = (n: number) => setSelected((i) => (i === null ? null : (i + n + photos.length) % photos.length));

  return (
    <div className="lx-gallery">
      {full && (
        <div className="lx-filters" aria-label="Filter event photographs">
          {['All moments', 'Celebrity gatherings', 'Awards & celebrations'].map((label) => (
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
      )}
      <div className="lx-mosaic">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            className="lx-photo group"
            onClick={() => setSelected(i)}
            aria-label={'View ' + photo.title}
          >
            <img
              src={photo.url}
              srcSet={getSrcSet(photo.url, [480, 800, 1200])}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={photo.title}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <span className="lx-photo-info">
              <small>{photo.category}</small>
              <strong>{photo.title}</strong>
            </span>
            <span className="lx-enlarge">
              <Maximize2 size={18} />
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={current !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="lx-lightbox"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') move(1);
            if (e.key === 'ArrowLeft') move(-1);
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
                width={1600}
                height={1000}
                decoding="async"
              />
              <div className="lx-lightbox-nav">
                <button type="button" onClick={() => move(-1)} aria-label="Previous photograph">
                  <ArrowLeft />
                </button>
                <span>
                  {(selected ?? 0) + 1} / {photos.length}
                </span>
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
