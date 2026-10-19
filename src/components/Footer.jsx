import { useState } from 'react'
import { ArrowRight, Camera, Mail, MapPin, Phone, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  Explore: [['Shop all parts', '#products'], ['Shop by brand', '#categories'], ['AC parts', '#products'], ['Washing machine parts', '#products']],
  Company: [['About us', '#about'], ['Shop by appliance', '#products'], ['Customer support', '#contact'], ['Get in touch', '#contact']],
}

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  function subscribe(event) {
    event.preventDefault()
    setSubscribed(true)
  }
  return <footer id="contact" className="scroll-mt-20 bg-[#0b1220] px-5 pb-6 pt-14 text-white sm:px-8 sm:pt-16 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.65fr_0.65fr_1fr] lg:gap-12">
        <div>
          <Link to="/#home" className="inline-flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-[#0f172a]">M<span className="text-blue-600">.</span></span><span><span className="block text-[13px] font-extrabold tracking-[0.12em]">M.S.</span><span className="block text-[9px] font-semibold tracking-[0.22em] text-slate-400">ENTERPRISES</span></span></Link>
          <p className="mt-4 max-w-[300px] text-xs leading-6 text-slate-400">The right parts, from people who care. Your trusted partner for AC and electronics components since 2009.</p>
          <div className="mt-5 flex gap-2"><a href="https://www.instagram.com/" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-blue-400 hover:text-white"><Camera size={16} /></a><a href="https://www.facebook.com/" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-blue-400 hover:text-white"><UsersRound size={16} /></a></div>
        </div>
        {Object.entries(footerLinks).map(([heading, links]) => <div key={heading}><h3 className="text-xs font-semibold text-white">{heading}</h3><ul className="mt-4 space-y-3">{links.map(([label, href]) => <li key={label}><Link to={`/${href}`} className="text-xs text-slate-400 transition hover:text-blue-300">{label}</Link></li>)}</ul></div>)}
        <div><h3 className="text-xs font-semibold text-white">A little good news.</h3><p className="mt-2 text-xs leading-5 text-slate-400">New arrivals, helpful tips, and updates from our store.</p><form onSubmit={subscribe} className="mt-4 flex h-11 rounded-xl border border-white/15 bg-white/[0.05] p-1"><input type="email" required placeholder="Your email address" aria-label="Your email address" className="min-w-0 flex-1 bg-transparent px-2 text-xs text-white outline-none placeholder:text-slate-500" /><button aria-label="Subscribe to newsletter" className="grid w-9 shrink-0 place-items-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-500">{subscribed ? <span className="text-[10px]">✓</span> : <ArrowRight size={16} />}</button></form>{subscribed && <p className="mt-2 text-[10px] text-emerald-300">You&apos;re on the list. Thank you!</p>}</div>
      </div>
      <div className="grid gap-5 border-b border-white/10 py-6 sm:grid-cols-3">
        <div className="flex items-start gap-2.5 text-[11px] leading-5 text-slate-400"><MapPin size={15} className="mt-0.5 shrink-0 text-blue-400" /><span>Bhagirath Palace, Chandni Chowk<br />Delhi 110006, India</span></div>
        <a href="tel:+911123456789" className="flex items-center gap-2.5 text-[11px] text-slate-400 transition hover:text-white"><Phone size={15} className="text-blue-400" /> +91 11 2345 6789</a>
        <a href="mailto:hello@msenterprises.in" className="flex items-center gap-2.5 text-[11px] text-slate-400 transition hover:text-white"><Mail size={15} className="text-blue-400" /> hello@msenterprises.in</a>
      </div>
      <div className="flex flex-col justify-between gap-3 pt-5 text-[10px] text-slate-500 sm:flex-row sm:items-center"><p>© {new Date().getFullYear()} M.S. ENTERPRISES. Made for the people who keep India cool.</p><p>Genuine parts. Honest business. Since 2009.</p></div>
    </div>
  </footer>
}
