import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventGallery from '@/components/home/EventGallery';
import { eventPhotos, eventServices } from '@/lib/event-content';
import SEO from '@/components/seo/SEO';
import { getSrcSet } from '@/lib/image-utils';
import MotionReveal from '@/components/common/MotionReveal';
import AnimatedCounter from '@/components/common/AnimatedCounter';

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  // Touch swipe gesture refs for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped left -> next slide
        setSlide((current) => (current + 1) % eventPhotos.length);
      } else {
        // Swiped right -> previous slide
        setSlide((current) => (current + eventPhotos.length - 1) % eventPhotos.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Accessibility & Visibility Detection
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(preference.matches);
    const syncVisibility = () => setPageHidden(document.hidden);
    syncMotion();
    syncVisibility();
    preference.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      preference.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  // Automatic transition every 5.5 seconds with live countdown progress
  useEffect(() => {
    if (paused || reducedMotion || pageHidden) return;
    setSlideProgress(0);
    const intervalMs = 5500;
    const stepMs = 50;
    const totalSteps = intervalMs / stepMs;
    let currentStep = 0;

    const timer = window.setInterval(() => {
      currentStep++;
      const p = Math.min((currentStep / totalSteps) * 100, 100);
      setSlideProgress(p);
      if (currentStep >= totalSteps) {
        window.clearInterval(timer);
        setSlide((current) => (current + 1) % eventPhotos.length);
      }
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [slide, paused, reducedMotion, pageHidden]);

  // Keyboard navigation for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        setSlide((current) => (current + eventPhotos.length - 1) % eventPhotos.length);
      } else if (e.key === 'ArrowRight') {
        setSlide((current) => (current + 1) % eventPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="lx-site min-h-screen max-w-full relative">
      <SEO
        title="Pan Eventz | India's Premier Event Management & Production"
        description="Pan Eventz is India's leading event management and production agency specializing in corporate summits, royal weddings, live concerts, and brand launches with 30+ years of founder experience."
        canonical="/"
        ogType="website"
      />
      <Header />
      <main className="relative z-10">
        <section 
          className="lx-hero" 
          aria-label="Featured event photographs" 
          aria-roledescription="carousel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {eventPhotos.map((photo, index) => (
            <img 
              key={photo.id} 
              className={`lx-hero-photo lx-carousel-photo ${index === slide ? "is-active" : ""}`} 
              src={photo.url} 
              srcSet={getSrcSet(photo.url, [768, 1200, 1920])}
              sizes="100vw"
              width={1920}
              height={1080}
              alt={photo.title} 
              aria-hidden={index !== slide}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              // @ts-ignore fetchPriority is valid in modern browsers
              fetchpriority={index === 0 ? "high" : undefined}
            />
          ))}
          <div className="lx-hero-shade" />
          <div className="lx-hero-content">
            <MotionReveal delay={0.08} distance={16}>
              <p className="lx-kicker">EVENT MANAGEMENT · LIVE PRODUCTION · INDIA</p>
            </MotionReveal>
            <MotionReveal delay={0.2} distance={22}>
              <h1>Extraordinary events.<br /><em>Lasting impressions.</em></h1>
            </MotionReveal>
            <MotionReveal delay={0.32} distance={18}>
              <p>Corporate milestones. Celebrations of a lifetime. Live experiences that bring people together. Welcome to the world of Pan Eventz.</p>
            </MotionReveal>
            <MotionReveal delay={0.45} distance={16}>
              <div className="lx-actions">
                <Link className="lx-button" href="/media">Explore our moments <ArrowUpRight size={18} /></Link>
                <Link className="lx-outline" href="/contact">Plan an event</Link>
              </div>
            </MotionReveal>
          </div>
          <div className="lx-hero-bottom">
            <span>THE PAN EVENTZ ARCHIVE<br /><strong>{eventPhotos[slide].title}</strong></span>
            <div className="lx-slide-controls">
              <button 
                type="button"
                aria-label="Previous featured photograph" 
                onClick={() => setSlide((current) => (current + eventPhotos.length - 1) % eventPhotos.length)}
              >
                <ArrowLeft />
              </button>
              <span>{String(slide + 1).padStart(2, "0")} / {String(eventPhotos.length).padStart(2, "0")}</span>
              {!reducedMotion && (
                <button 
                  type="button"
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"} 
                  onClick={() => setPaused((current) => !current)}
                >
                  {paused ? <Play size={18} /> : <Pause size={18} />}
                </button>
              )}
              <button 
                type="button"
                aria-label="Next featured photograph" 
                onClick={() => setSlide((current) => (current + 1) % eventPhotos.length)}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
          {/* Real-time live slide countdown progress indicator */}
          <div className="lx-carousel-progress">
            <div 
              className="lx-carousel-progress-bar" 
              style={{ width: `${slideProgress}%` }} 
              role="progressbar" 
              aria-valuenow={Math.round(slideProgress)} 
              aria-valuemin={0} 
              aria-valuemax={100} 
            />
          </div>
        </section>

        <section className="lx-intro lx-wrap">
          <MotionReveal>
            <p className="lx-kicker">THE OCCASION IS YOURS. THE DETAILS ARE OURS.</p>
            <h2>We don’t just plan events.<br/>We bring <em>your vision to life.</em></h2>
            <p>Founded in 2017 by Imran Mirza, Pan Eventz brings together creative event planning and hands-on production, backed by over 30 years of his experience in entertainment and events. From the scale of the stage to the welcome at the door, every element has a part to play.</p>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <div className="lx-facts">
              <div><strong><AnimatedCounter value="30+" /></strong><span>Years of founder’s industry experience</span></div>
              <div><strong><AnimatedCounter value="2017" /></strong><span>The beginning of Pan Eventz</span></div>
              <div><strong>One team</strong><span>Planning, creativity & production</span></div>
            </div>
          </MotionReveal>
        </section>

        <section className="lx-wrap lx-portfolio">
          <MotionReveal>
            <div className="lx-section-head">
              <div>
                <p className="lx-kicker">01 / INSIDE OUR WORLD</p>
                <h2>Real people.<br/><em>Remarkable moments.</em></h2>
              </div>
              <p>Step inside our archive of celebrity gatherings and celebrations. A closer look at the people and moments behind Pan Eventz.</p>
            </div>
          </MotionReveal>
          <EventGallery/>
          <MotionReveal delay={0.15}>
            <Link href="/media" className="lx-text-link">Enter the gallery <ArrowUpRight size={18}/></Link>
          </MotionReveal>
        </section>

        <section className="lx-services lx-wrap">
          <MotionReveal>
            <div className="lx-section-head">
              <div>
                <p className="lx-kicker">02 / EVENTS WE CREATE</p>
                <h2>Every occasion.<br/><em>A world of possibilities.</em></h2>
              </div>
              <p>A company milestone or a personal celebration. An intimate gathering or an audience on its feet. We create the setting for your story.</p>
            </div>
          </MotionReveal>
          <div className="lx-service-list">
            {eventServices.map((service,i)=>(
              <MotionReveal key={service.slug} delay={i * 0.08}>
                <Link href={'/services/'+service.slug} className="lx-service-row">
                  <span className="lx-number">0{i+1}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p className="lx-service-subtitle">{service.subtitle}</p>
                  </div>
                  <div>
                    <p>{service.description}</p>
                    <small>{service.details}</small>
                  </div>
                  <ArrowUpRight/>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="lx-feature">
          <img 
            src={eventPhotos[3].url} 
            srcSet={getSrcSet(eventPhotos[3].url, [480, 800, 1200])}
            sizes="(max-width: 768px) 100vw, 50vw"
            width={1200}
            height={800}
            alt={eventPhotos[3].title} 
            loading="lazy"
            decoding="async"
          />
          <MotionReveal distance={24}>
            <div>
              <p className="lx-kicker">03 / BEHIND EVERY GREAT EVENT</p>
              <h2>The magic is visible.<br/><em>The detail is everything.</em></h2>
              <p>Beautiful events need more than a beautiful idea. Our team connects the creative vision with the practical work: venue coordination, stage setups, technical production and on-ground logistics.</p>
              <p>One connected approach, from the first conversation to the final applause.</p>
              <Link href="/about" className="lx-text-link">Meet Pan Eventz <ArrowUpRight size={18}/></Link>
            </div>
          </MotionReveal>
        </section>

        <section className="lx-wrap lx-production">
          <MotionReveal>
            <p className="lx-kicker">04 / FROM CONCEPT TO CURTAIN CALL</p>
            <h2>Everything your event needs.<br/><em>Working in harmony.</em></h2>
          </MotionReveal>
          <div className="lx-capabilities">
            {[
              ['Creative planning','Ideas, event concepts and a clear plan built around your occasion.'],
              ['Stage & spatial design','Stage setups, décor and spaces that bring the concept into the room.'],
              ['Sound, light & LED','Audio, lighting, LED walls and visual production for a complete experience.'],
              ['Film & live coverage','Audio-video shooting, content creation and coverage of the moments that matter.'],
              ['Artists & hospitality','Performance coordination and thoughtful care for your guests.'],
              ['Logistics & coordination','Resource planning, transport and an experienced team on the ground.']
            ].map(([title,copy],i)=>(
              <MotionReveal key={title} delay={i * 0.07}>
                <div>
                  <span>0{i+1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="lx-founder lx-wrap">
          <MotionReveal distance={24}>
            <div>
              <p className="lx-kicker">05 / A PERSONAL COMMITMENT</p>
              <h2>Experience at the helm.<br/><em>Passion in every detail.</em></h2>
              <p>Imran Mirza’s journey in entertainment and events spans over three decades. That experience shapes Pan Eventz’s approach: listen carefully, plan thoroughly and bring people together through occasions that feel meaningful.</p>
              <p className="lx-signature">Imran Mirza</p>
              <span>FOUNDER · PAN EVENTZ</span>
              <Link href="/about" className="lx-text-link">Discover our story <ArrowUpRight size={18}/></Link>
            </div>
          </MotionReveal>
          <img 
            src={eventPhotos[2].url} 
            srcSet={getSrcSet(eventPhotos[2].url, [480, 800, 1200])}
            sizes="(max-width: 768px) 100vw, 50vw"
            width={1200}
            height={800}
            alt="Imran Mirza with guests from the entertainment industry" 
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="lx-wrap lx-process">
          <MotionReveal>
            <p className="lx-kicker">06 / YOUR EVENT, FROM THE VERY BEGINNING</p>
            <h2>A clear plan.<br/><em>A remarkable experience.</em></h2>
          </MotionReveal>
          <div>
            {[
              ['Tell us your vision','Share the occasion, your audience and what matters most to you.'],
              ['Shape the experience','We bring ideas, a practical plan and production details together.'],
              ['Bring it to life','Our team coordinates the people, spaces and moments on the day.']
            ].map(([title,copy],i)=>(
              <MotionReveal key={title} delay={i * 0.1}>
                <article>
                  <span>0{i+1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="lx-cta">
          <MotionReveal>
            <p className="lx-kicker">YOUR NEXT EXTRAORDINARY OCCASION</p>
            <h2>Let’s make it<br/><em>one to remember.</em></h2>
            <p>Tell us what you have in mind. We’ll take it from there.</p>
            <Link className="lx-button" href="/contact">Start a conversation <ArrowUpRight size={18}/></Link>
            <a href="mailto:info@paneventz.com">info@paneventz.com</a>
          </MotionReveal>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
