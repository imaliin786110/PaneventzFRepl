import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
 return <footer className="pe-footer"><div><Link href="/" className="pe-brand">pan eventz<span>THOUGHTFULLY PLANNED. BEAUTIFULLY REMEMBERED.</span></Link><p>Event management & production.<br/>Mumbai · Delhi NCR · Across India</p></div><nav aria-label="Footer navigation"><Link href="/about">Our story</Link><Link href="/services">Experiences</Link><Link href="/media">Gallery</Link><Link href="/contact">Contact <ArrowUpRight size={14}/></Link></nav><div><a href="mailto:info@paneventz.com">info@paneventz.com</a><a href="tel:+919821337523">+91 98213 37523</a><a href="tel:+918082024787">+91 80820 24787</a></div><small>© {new Date().getFullYear()} Pan Eventz. All rights reserved.</small></footer>;
}
