import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const links = [
    ['/', 'Home'],
    ['/about', 'Our story'],
    ['/services', 'Experiences'],
    ['/media', 'Gallery'],
    ['/blog', 'Journal']
  ];

  return (
    <header className="pe-header fixed top-0 left-0 right-0 w-full z-50 backdrop-blur">
      <Link href="/" className="pe-brand" aria-label="Pan Eventz home">
        pan eventz
        <span>EVENTS · EXPERIENCES · CELEBRATIONS</span>
      </Link>
      <button 
        type="button"
        className="pe-menu min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer" 
        aria-label={open ? 'Close navigation' : 'Open navigation'} 
        aria-expanded={open} 
        aria-controls="main-navigation" 
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav 
        id="main-navigation" 
        aria-label="Main navigation" 
        className={open ? 'pe-nav is-open' : 'pe-nav'}
      >
        {links.map(([href, title]) => (
          <Link 
            key={href} 
            href={href} 
            aria-current={(href === '/' ? location === '/' : location.startsWith(href)) ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {title}
          </Link>
        ))}
        <Link 
          href="/contact" 
          className="pe-button"
          onClick={() => setOpen(false)}
        >
          Plan your event <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
