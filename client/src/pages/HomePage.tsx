import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventGallery from '@/components/home/EventGallery';
import { eventPhotos, eventServices } from '@/lib/event-content';

export default function HomePage() {
  const [slide, setSlide] = useState(0);
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

  // Automatic transition every 5.5 seconds (5-6 seconds)
  useEffect(() => {
    if (paused || reducedMotion || pageHidden) return;
    const timer = window.setTimeout(() => {
      setSlide((current) => (current + 1) % eventPhotos.length);
    }, 5500);
    return () => window.clearTimeout(timer);
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

  useEffect(() => {
    document.title = 'Pan Eventz | Extraordinary Events & Celebrations';
  }, []);

  return (
    <div className="lx-site min-h-screen max-w-full">
      <Header />
      <main>
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
              alt={photo.title} 
              aria-hidden={index !== slide}
            />
          ))}
          <div className="lx-hero-shade" />
          <div className="lx-hero-content">
            <p className="lx-kicker">EVENT MANAGEMENT · LIVE PRODUCTION · INDIA</p>
            <h1>Extraordinary events.<br /><em>Lasting impressions.</em></h1>
            <p>Corporate milestones. Celebrations of a lifetime. Live experiences that bring people together. Welcome to the world of Pan Eventz.</p>
            <div className="lx-actions">
              <Link className="lx-button" href="/media">Explore our moments <ArrowUpRight size={18} /></Link>
              <Link className="lx-outline" href="/contact">Plan an event</Link>
            </div>
          </div>
          <div className="lx-hero-bottom">
            <span>THE PAN EVENTZ ARCHIVE<br /><strong>{eventPhotos[slide].title}</strong></span>
            <div className="lx-slide-controls">
              <button aria-label="Previous featured photograph" onClick={() => setSlide((current) => (current + eventPhotos.length - 1) % eventPhotos.length)}>
                <ArrowLeft />
              </button>
              <span>{String(slide + 1).padStart(2, "0")} / {String(eventPhotos.length).padStart(2, "0")}</span>
              {!reducedMotion && (
                <button aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((current) => !current)}>
                  {paused ? <Play size={18} /> : <Pause size={18} />}
                </button>
              )}
              <button aria-label="Next featured photograph" onClick={() => setSlide((current) => (current + 1) % eventPhotos.length)}>
                <ArrowRight />
              </button>
            </div>
          </div>
        </section><section className="lx-intro lx-wrap"><p className="lx-kicker">THE OCCASION IS YOURS. THE DETAILS ARE OURS.</p><h2>We don’t just plan events.<br/>We bring <em>your vision to life.</em></h2><p>Founded in 2017 by Imran Mirza, Pan Eventz brings together creative event planning and hands-on production, backed by over 30 years of his experience in entertainment and events. From the scale of the stage to the welcome at the door, every element has a part to play.</p><div className="lx-facts"><div><strong>30+</strong><span>Years of founder’s industry experience</span></div><div><strong>2017</strong><span>The beginning of Pan Eventz</span></div><div><strong>One team</strong><span>Planning, creativity & production</span></div></div></section><section className="lx-wrap lx-portfolio"><div className="lx-section-head"><div><p className="lx-kicker">01 / INSIDE OUR WORLD</p><h2>Real people.<br/><em>Remarkable moments.</em></h2></div><p>Step inside our archive of celebrity gatherings and celebrations. A closer look at the people and moments behind Pan Eventz.</p></div><EventGallery/><Link href="/media" className="lx-text-link">Enter the gallery <ArrowUpRight size={18}/></Link></section><section className="lx-services lx-wrap"><div className="lx-section-head"><div><p className="lx-kicker">02 / EVENTS WE CREATE</p><h2>Every occasion.<br/><em>A world of possibilities.</em></h2></div><p>A company milestone or a personal celebration. An intimate gathering or an audience on its feet. We create the setting for your story.</p></div><div className="lx-service-list">{eventServices.map((service,i)=><Link href={'/services/'+service.slug} key={service.slug} className="lx-service-row"><span className="lx-number">0{i+1}</span><div><h3>{service.title}</h3><p className="lx-service-subtitle">{service.subtitle}</p></div><div><p>{service.description}</p><small>{service.details}</small></div><ArrowUpRight/></Link>)}</div></section><section className="lx-feature"><img src={eventPhotos[3].url} alt={eventPhotos[3].title} loading="lazy"/><div><p className="lx-kicker">03 / BEHIND EVERY GREAT EVENT</p><h2>The magic is visible.<br/><em>The detail is everything.</em></h2><p>Beautiful events need more than a beautiful idea. Our team connects the creative vision with the practical work: venue coordination, stage setups, technical production and on-ground logistics.</p><p>One connected approach, from the first conversation to the final applause.</p><Link href="/about" className="lx-text-link">Meet Pan Eventz <ArrowUpRight size={18}/></Link></div></section><section className="lx-wrap lx-production"><p className="lx-kicker">04 / FROM CONCEPT TO CURTAIN CALL</p><h2>Everything your event needs.<br/><em>Working in harmony.</em></h2><div className="lx-capabilities">{[['Creative planning','Ideas, event concepts and a clear plan built around your occasion.'],['Stage & spatial design','Stage setups, décor and spaces that bring the concept into the room.'],['Sound, light & LED','Audio, lighting, LED walls and visual production for a complete experience.'],['Film & live coverage','Audio-video shooting, content creation and coverage of the moments that matter.'],['Artists & hospitality','Performance coordination and thoughtful care for your guests.'],['Logistics & coordination','Resource planning, transport and an experienced team on the ground.']].map(([title,copy],i)=><div key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section><section className="lx-founder lx-wrap"><div><p className="lx-kicker">05 / A PERSONAL COMMITMENT</p><h2>Experience at the helm.<br/><em>Passion in every detail.</em></h2><p>Imran Mirza’s journey in entertainment and events spans over three decades. That experience shapes Pan Eventz’s approach: listen carefully, plan thoroughly and bring people together through occasions that feel meaningful.</p><p className="lx-signature">Imran Mirza</p><span>FOUNDER · PAN EVENTZ</span><Link href="/about" className="lx-text-link">Discover our story <ArrowUpRight size={18}/></Link></div><img src={eventPhotos[2].url} alt="Imran Mirza with guests from the entertainment industry" loading="lazy"/></section><section className="lx-wrap lx-process"><p className="lx-kicker">06 / YOUR EVENT, FROM THE VERY BEGINNING</p><h2>A clear plan.<br/><em>A remarkable experience.</em></h2><div>{[['Tell us your vision','Share the occasion, your audience and what matters most to you.'],['Shape the experience','We bring ideas, a practical plan and production details together.'],['Bring it to life','Our team coordinates the people, spaces and moments on the day.']].map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="lx-cta"><p className="lx-kicker">YOUR NEXT EXTRAORDINARY OCCASION</p><h2>Let’s make it<br/><em>one to remember.</em></h2><p>Tell us what you have in mind. We’ll take it from there.</p><Link className="lx-button" href="/contact">Start a conversation <ArrowUpRight size={18}/></Link><a href="mailto:info@paneventz.com">info@paneventz.com</a></section></main><Footer/></div>
  );
}
