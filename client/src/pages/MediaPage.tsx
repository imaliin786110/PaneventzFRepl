import {useEffect} from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventGallery from '@/components/home/EventGallery';
import {Link} from 'wouter';
export default function MediaPage(){useEffect(()=>{document.title='Event Gallery | Pan Eventz'},[]);return <div className="lx-site"><Header/><main className="lx-wrap lx-gallery-page"><p className="lx-kicker">THE PAN EVENTZ ARCHIVE</p><h1>Moments that<br/><em>stay with you.</em></h1><p>People, celebrations and memories from our world. Explore our photographs and open any moment for a closer look.</p><EventGallery full/><section className="lx-gallery-invite"><h2>Your occasion could be<br/><em>our next great story.</em></h2><Link className="lx-button" href="/contact">Plan your event</Link></section></main><Footer/></div>}
