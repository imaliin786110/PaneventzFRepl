import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useJjettasScroll(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create GSAP context for clean garbage collection on unmount
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ============================================================
      // 1. INITIAL HERO ENTRY REVEAL (Page Load Storytelling)
      // ============================================================
      const heroKicker = container.querySelector<HTMLElement>('.lx-hero .lx-kicker');
      const heroHeading = container.querySelector<HTMLElement>('.lx-hero h1');
      const heroParagraph = container.querySelector<HTMLElement>('.lx-hero-content > p:not(.lx-kicker)');
      const heroActions = container.querySelector<HTMLElement>('.lx-hero-content .lx-actions');
      const heroBottom = container.querySelector<HTMLElement>('.lx-hero-bottom');

      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (heroKicker) {
        introTl.fromTo(
          heroKicker,
          { opacity: 0, y: 15, letterSpacing: '4px' },
          { opacity: 1, y: 0, letterSpacing: '2.6px', duration: 1.0 },
          0.1
        );
      }

      if (heroHeading) {
        introTl.fromTo(
          heroHeading,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.2 },
          0.25
        );
      }

      if (heroParagraph) {
        introTl.fromTo(
          heroParagraph,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          0.45
        );
      }

      if (heroActions) {
        introTl.fromTo(
          heroActions,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.6
        );
      }

      if (heroBottom) {
        introTl.fromTo(
          heroBottom,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          0.75
        );
      }

      // ============================================================
      // 2. DESKTOP & LARGE SCREENS (>= 1024px): Full JJettas Editorial Experience
      // ============================================================
      mm.add('(min-width: 1024px)', () => {
        // --- A. HERO SCROLL CINEMATIC DEPTH & PARALLAX ---
        const hero = container.querySelector<HTMLElement>('.lx-hero');
        const heroPhotos = container.querySelectorAll<HTMLElement>('.lx-hero-photo');
        const heroContent = container.querySelector<HTMLElement>('.lx-hero-content');

        if (hero && heroContent) {
          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });

          // Text rises with parallax and dissolves into atmospheric depth
          heroTl.to(
            heroContent,
            {
              y: -120,
              opacity: 0.1,
              ease: 'power1.out',
            },
            0
          );

          if (heroBottom) {
            heroTl.to(
              heroBottom,
              {
                y: 60,
                opacity: 0,
                ease: 'power1.out',
              },
              0
            );
          }

          // Active background photo pulls back slightly in z-space and deepens
          heroPhotos.forEach((img) => {
            heroTl.to(
              img,
              {
                y: 90,
                scale: 1.01,
                filter: 'brightness(0.5)',
                ease: 'none',
              },
              0
            );
          });
        }

        // --- B. SECTION 01: INTRO & PINNED FACTS ILLUMINATION ---
        const intro = container.querySelector<HTMLElement>('.lx-intro');
        const facts = container.querySelectorAll<HTMLElement>('.lx-facts > div');

        if (intro) {
          gsap.fromTo(
            intro,
            { y: 70, opacity: 0.8 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: intro,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0.8,
              },
            }
          );
        }

        if (facts.length > 0) {
          gsap.fromTo(
            facts,
            { y: 50, opacity: 0.25, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.lx-facts',
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.6,
              },
            }
          );
        }

        // --- B2. SHOWCASE (REAL EVENTS / REAL ATMOSPHERE) LAYERED SCRUB ---
        const showcaseSection = container.querySelector<HTMLElement>('.lx-showcase');
        const showcaseMainImg = container.querySelector<HTMLElement>('.lx-showcase-main img');
        const showcaseSideFigures = container.querySelectorAll<HTMLElement>('.lx-showcase-side figure');
        const showcaseProofItems = container.querySelectorAll<HTMLElement>('.lx-showcase-proof > div');

        if (showcaseSection && showcaseMainImg) {
          gsap.fromTo(
            showcaseMainImg,
            { scale: 1.08, yPercent: -6 },
            {
              scale: 1.0,
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: showcaseSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        if (showcaseSideFigures.length > 0) {
          showcaseSideFigures.forEach((fig) => {
            gsap.fromTo(
              fig,
              { y: 40, opacity: 0.3 },
              {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: fig,
                  start: 'top 90%',
                  end: 'top 60%',
                  scrub: 0.8,
                },
              }
            );
          });
        }

        if (showcaseProofItems.length > 0) {
          gsap.fromTo(
            showcaseProofItems,
            { opacity: 0.2, x: -15 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.lx-showcase-proof',
                start: 'top 85%',
                end: 'top 65%',
                scrub: 0.6,
              },
            }
          );
        }

        // --- C. SECTION 02: PORTFOLIO ARCHIVE MULTI-DEPTH PARALLAX GLIDE ---
        const portfolioSection = container.querySelector<HTMLElement>('.lx-portfolio');
        const mosaic = container.querySelector<HTMLElement>('.lx-mosaic');

        if (portfolioSection && mosaic) {
          const photos = mosaic.querySelectorAll<HTMLElement>('.lx-photo');
          if (photos.length > 0) {
            photos.forEach((photo, idx) => {
              // Asymmetric staggered vertical parallax between left and right column
              const yOffset = idx % 2 === 0 ? -45 : 45;
              gsap.fromTo(
                photo,
                { y: yOffset * 1.4, opacity: 0.88 },
                {
                  y: -yOffset * 0.8,
                  opacity: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: photo,
                    start: 'top 95%',
                    end: 'bottom 10%',
                    scrub: 1.2,
                  },
                }
              );
            });
          }
        }

        // --- D. SECTION 03: FEATURE SECTION (BEHIND EVERY GREAT EVENT) PARALLAX ---
        const featureSection = container.querySelector<HTMLElement>('.lx-feature');
        const featureImg = container.querySelector<HTMLElement>('.lx-feature > img');
        const featureText = container.querySelector<HTMLElement>('.lx-feature > div');

        if (featureSection && featureImg) {
          gsap.fromTo(
            featureImg,
            { yPercent: -10, scale: 1.08 },
            {
              yPercent: 10,
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: featureSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        if (featureSection && featureText) {
          gsap.fromTo(
            featureText,
            { y: 60, opacity: 0.35 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: featureSection,
                start: 'top 75%',
                end: 'center center',
                scrub: 0.8,
              },
            }
          );
        }

        // --- E. SECTION 04: CAPABILITIES DOMINO STAGGER ---
        const capabilities = container.querySelectorAll<HTMLElement>('.lx-capabilities > div');
        if (capabilities.length > 0) {
          gsap.fromTo(
            capabilities,
            { y: 45, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.lx-capabilities',
                start: 'top 80%',
                end: 'bottom 85%',
                scrub: 0.8,
              },
            }
          );
        }

        // --- F. SECTION 05: FOUNDER CINEMATIC PARALLAX ---
        const founderSection = container.querySelector<HTMLElement>('.lx-founder');
        const founderImg = container.querySelector<HTMLElement>('.lx-founder > img');
        const founderSignature = container.querySelector<HTMLElement>('.lx-founder .lx-signature');

        if (founderSection && founderImg) {
          gsap.fromTo(
            founderImg,
            { yPercent: 8, scale: 1.06 },
            {
              yPercent: -8,
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: founderSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        if (founderSignature) {
          gsap.fromTo(
            founderSignature,
            { opacity: 0, letterSpacing: '4px', filter: 'blur(4px)' },
            {
              opacity: 1,
              letterSpacing: '0px',
              filter: 'blur(0px)',
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: founderSignature,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // --- G. SECTION 06: PROCESS STEP ILLUMINATION ---
        const processArticles = container.querySelectorAll<HTMLElement>('.lx-process article');
        if (processArticles.length > 0) {
          processArticles.forEach((article) => {
            gsap.fromTo(
              article,
              { y: 35, opacity: 0.3 },
              {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: article,
                  start: 'top 88%',
                  end: 'top 65%',
                  scrub: 0.6,
                },
              }
            );
          });
        }

        // --- H. SECTION 07: CTA AMBIENT GLOW EXPANSION ---
        const ctaSection = container.querySelector<HTMLElement>('.lx-cta');
        if (ctaSection) {
          gsap.fromTo(
            ctaSection,
            { opacity: 0.6, scale: 0.98 },
            {
              opacity: 1,
              scale: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ctaSection,
                start: 'top 90%',
                end: 'center center',
                scrub: 0.8,
              },
            }
          );
        }

        // --- I. EDITORIAL HEADINGS LINE MASK REVEALS ---
        const headings = container.querySelectorAll<HTMLElement>(
          '.lx-section-head h2, .lx-intro h2, .lx-services h2, .lx-feature h2, .lx-production h2, .lx-founder h2, .lx-process h2, .lx-cta h2'
        );
        headings.forEach((heading) => {
          gsap.fromTo(
            heading,
            { y: 35, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // --- J. SERVICES LIST ROW STAGGER ---
        const serviceRows = container.querySelectorAll<HTMLElement>('.lx-service-row');
        serviceRows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { y: 30, opacity: 0.3 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: (i % 3) * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // --- K. MAGNETIC HOVER EFFECT ON LUXURY BUTTONS ---
        const magneticButtons = container.querySelectorAll<HTMLElement>('.lx-button, .lx-outline, .lx-slide-controls button');
        const cleanups: (() => void)[] = [];

        magneticButtons.forEach((btn) => {
          const onMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
            gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
          };

          const onMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
          };

          btn.addEventListener('mousemove', onMouseMove);
          btn.addEventListener('mouseleave', onMouseLeave);

          cleanups.push(() => {
            btn.removeEventListener('mousemove', onMouseMove);
            btn.removeEventListener('mouseleave', onMouseLeave);
          });
        });

        return () => {
          cleanups.forEach((fn) => fn());
        };
      });

      // ============================================================
      // 3. MOBILE & TABLET (< 1024px): Silky, Lightweight Touch Scroll
      // ============================================================
      mm.add('(max-width: 1023px)', () => {
        const mobileElements = container.querySelectorAll<HTMLElement>(
          '.lx-intro, .lx-section-head, .lx-facts, .lx-service-row, .lx-feature, .lx-capabilities > div, .lx-founder, .lx-process article, .lx-cta'
        );

        mobileElements.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.35, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    }, container);

    // Refresh ScrollTrigger after layout and images settle
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, [containerRef]);
}
