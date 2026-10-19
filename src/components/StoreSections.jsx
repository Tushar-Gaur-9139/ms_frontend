import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight, Headphones, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { categories, imageUrl, products as catalogue } from '../data/products'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return undefined
    let frame
    const start = performance.now()
    const duration = 1500
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(value * (1 - (1 - progress) ** 4)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, visible])
  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>
}

export function Stats() {
  const items = [{ value: 10000, suffix: '+', label: 'Products sold' }, { value: 500, suffix: '+', label: 'Happy customers' }, { value: 15, suffix: '+', label: 'Years of trust' }, { value: 100, suffix: '%', label: 'Pan-India delivery' }]
  return <section className="border-y border-slate-200/70 bg-white">
    <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y divide-slate-100 px-5 py-2 sm:px-8 md:grid-cols-4 md:divide-y-0 lg:px-12">
      {items.map((item) => <div key={item.label} className="px-4 py-5 text-center sm:py-7"><p className="text-[27px] font-semibold tracking-[-0.04em] text-[#0f172a] sm:text-[34px]"><CountUp value={item.value} suffix={item.suffix} /></p><p className="mt-1 text-[10px] font-medium tracking-wide text-slate-500 sm:text-xs">{item.label}</p></div>)}
    </div>
  </section>
}

export function Categories({ onSelect }) {
  return <section id="categories" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      <SectionHeading eyebrow="SHOP BY BRAND" title="Find the part that fits." description="Choose your appliance brand, pick the product type, then find exactly the part you need." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {categories.map((category, index) => <motion.button key={category.name} onClick={() => onSelect({ brand: category.name, appliance: 'All', part: 'All' })} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} whileHover={{ y: -6, rotateX: 2, scale: 1.02 }} className="group relative h-[205px] overflow-hidden rounded-2xl text-left shadow-md transition-shadow duration-300 hover:shadow-2xl sm:h-[245px]">
          <img src={imageUrl(category.image, 450)} alt={`${category.name} circuit boards`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-slate-950/5 transition group-hover:from-slate-950/80" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5"><p className="text-[9px] font-semibold tracking-[0.16em] text-blue-200">{category.short}</p><p className="mt-1 text-[15px] font-semibold text-white sm:text-base">{category.name}</p><p className="mt-1 hidden text-[10px] text-white/70 sm:block">{category.description}</p><span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-white opacity-90 transition group-hover:gap-2.5">View stock <ArrowRight size={12} /></span></div>
        </motion.button>)}
      </div>
    </div>
  </section>
}

export function FeaturedProducts({ products, filters, onSelect, onAdd }) {
  const appliances = [...new Set(categories.flatMap((brand) => brand.name === filters.brand ? brand.appliances.map((appliance) => appliance.name) : []))]
  const selectedAppliance = categories.find((brand) => brand.name === filters.brand)?.appliances.find((appliance) => appliance.name === filters.appliance)
  const parts = selectedAppliance ? [...new Set(catalogue
    .filter((product) => product.brand === filters.brand && product.appliance === filters.appliance)
    .map((product) => product.partCategory))] : []
  return <section id="products" className="scroll-mt-20 bg-[#f7f9fc] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      <SectionHeading eyebrow="THE READY-TO-SHIP COLLECTION" title="Popular right now." description="Carefully tested. Ready for your next repair." />
      <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-2">
        {[{ name: 'All brands', value: 'All' }, ...categories.map(({ name }) => ({ name, value: name }))].map(({ name, value }) => <button key={value} onClick={() => onSelect({ brand: value, appliance: 'All', part: 'All' })} className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold transition ${filters.brand === value ? 'bg-[#0f172a] text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'}`}>{name}</button>)}
      </div>
      {filters.brand !== 'All' && <div className="mt-3 flex flex-wrap gap-2">
        {['All appliances', ...appliances].map((name) => { const value = name === 'All appliances' ? 'All' : name; return <button key={name} onClick={() => onSelect({ ...filters, appliance: value, part: 'All' })} className={`rounded-full px-3.5 py-2 text-[10px] font-semibold transition ${filters.appliance === value ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'}`}>{name}</button> })}
      </div>}
      {parts.length > 0 && <div className="mt-2 flex flex-wrap gap-2">
        {['All parts', ...parts].map((name) => { const value = name === 'All parts' ? 'All' : name; return <button key={name} onClick={() => onSelect({ ...filters, part: value })} className={`rounded-full px-3 py-1.5 text-[10px] transition ${filters.part === value ? 'bg-slate-200 font-semibold text-slate-800' : 'text-slate-500 hover:bg-white hover:text-slate-800'}`}>{name}</button> })}
      </div>}
      <motion.div layout className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={onAdd} />)}
        </AnimatePresence>
        {products.length === 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"><p className="text-sm font-semibold text-slate-800">No parts found just yet.</p><p className="mt-1 text-xs text-slate-500">Try another brand, appliance, or search term.</p></motion.div>}
      </motion.div>
      <div className="mt-8 text-center"><a href="#contact" className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">Need help finding a part? <ArrowRight size={14} /></a></div>
    </div>
  </section>
}

export function WhyUs() {
  const benefits = [
    { icon: ShieldCheck, title: 'Original, dependable parts', text: 'Sourced responsibly so you can fit with confidence.' },
    { icon: PackageCheck, title: 'Every board QC checked', text: 'Our team tests and inspects before anything ships.' },
    { icon: Truck, title: 'Fast, reliable courier', text: 'Carefully packed and delivered across India.' },
    { icon: Headphones, title: 'People who know the parts', text: 'Get practical technical help from our support team.' },
  ]
  return <section id="about" className="scroll-mt-20 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      <SectionHeading align="center" eyebrow="THE M.S. ENTERPRISES DIFFERENCE" title="A supplier that shows up." description="Fifteen years in, we still believe trust is built one good part—and one good delivery—at a time." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }, index) => <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200/80 bg-white p-5 transition-shadow hover:shadow-lg sm:p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={21} /></span><h3 className="mt-5 text-[14px] font-semibold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{text}</p></motion.div>)}
      </div>
    </div>
  </section>
}

const testimonials = [
  { quote: 'Finally, a supplier who understands what a technician actually needs. Genuine boards and they arrive when promised.', name: 'Rohit Sharma', role: 'AC Technician · Jaipur' },
  { quote: 'Their team helped us identify a hard-to-find board for a washing machine. The right part arrived quickly and fit perfectly.', name: 'Amit Verma', role: 'Home Appliance Repair · Delhi' },
  { quote: 'Every board is properly packed and tested. We have been ordering from M.S. Enterprises for over four years now.', name: 'Sanjay Patel', role: 'Parts Wholesaler · Ahmedabad' },
  { quote: 'Quick responses, transparent pricing, and no surprises. They have earned our business every single time.', name: 'Priya Nair', role: 'Electronics Service · Kochi' },
]

export function Testimonials() {
  return <section className="overflow-hidden bg-[#f7f9fc] py-16 sm:py-20">
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="mb-8 flex items-end justify-between"><SectionHeading className="mb-0" eyebrow="GOOD WORDS, REAL PEOPLE" title="Trusted on the ground." /><div className="hidden items-center gap-1 text-amber-500 sm:flex">★★★★★ <span className="ml-1 text-xs font-medium text-slate-500">4.9 / 5</span></div></div></div>
    <div className="group relative flex overflow-hidden"><div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f7f9fc] to-transparent sm:w-20" /><div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f7f9fc] to-transparent sm:w-20" />
      {[0, 1].map((repeat) => <motion.div key={repeat} animate={{ x: ['0%', '-100%'] }} transition={{ duration: 36, ease: 'linear', repeat: Infinity }} className="flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]">
        {testimonials.map((testimonial) => <article key={`${repeat}-${testimonial.name}`} className="w-[285px] shrink-0 rounded-2xl border border-slate-200/80 bg-white p-5 sm:w-[360px] sm:p-6"><div className="text-[12px] tracking-[0.12em] text-amber-500">★★★★★</div><p className="mt-4 min-h-[74px] text-[13px] leading-6 text-slate-600">“{testimonial.quote}”</p><div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">{testimonial.name.split(' ').map((part) => part[0]).join('')}</span><div><p className="text-xs font-semibold text-slate-900">{testimonial.name}</p><p className="mt-0.5 text-[10px] text-slate-500">{testimonial.role}</p></div></div></article>)}
      </motion.div>)}
    </div>
  </section>
}
