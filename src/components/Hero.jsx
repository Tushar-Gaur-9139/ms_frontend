import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, BadgeCheck, ShieldCheck, Truck } from 'lucide-react'
import { imageUrl } from '../data/products'

const rise = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#f7f9fc]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_95%)]" />
      <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.42, 0.64, 0.42] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -right-24 top-10 -z-10 h-[450px] w-[450px] rounded-full bg-blue-300/30 blur-[110px]" />
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-12 lg:pb-24 lg:pt-24">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.11 }}>
          <motion.div variants={rise} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-[10px] font-bold tracking-[0.13em] text-blue-700 shadow-sm sm:text-[11px]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" /></span>
            INDIA&apos;S ELECTRONICS PARTNER SINCE 2009
          </motion.div>
          <motion.h1 variants={rise} transition={{ duration: 0.65 }} className="max-w-[680px] text-[39px] font-semibold leading-[1.07] tracking-[-0.055em] text-[#0f172a] sm:text-6xl lg:text-[66px]">
            India&apos;s trusted<br /><span className="text-blue-600">AC &amp; electronics</span><br />PCB supplier.
          </motion.h1>
          <motion.p variants={rise} transition={{ duration: 0.65 }} className="mt-6 max-w-[530px] text-[15px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
            Find genuine AC, washing machine, and refrigerator parts from the brands you trust. Quality checked, easy to order, and delivered across India.
          </motion.p>
          <motion.div variants={rise} transition={{ duration: 0.65 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#products" className="group inline-flex h-[52px] items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(37,99,235,0.7)] transition hover:-translate-y-0.5 hover:bg-blue-700">
              Explore products <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#categories" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg">
              Browse by brand <ArrowRight size={16} className="text-blue-600" />
            </a>
          </motion.div>
          <motion.div variants={rise} transition={{ duration: 0.65 }} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200/80 pt-5 text-[11px] font-medium text-slate-600 sm:text-xs">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-blue-600" /> Quality checked</span>
            <span className="flex items-center gap-2"><Truck size={16} className="text-blue-600" /> Pan-India delivery</span>
            <span className="flex items-center gap-2"><BadgeCheck size={16} className="text-blue-600" /> GST invoice</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.18 }} className="relative mx-auto w-full max-w-[610px]">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-blue-200/60 via-sky-100/30 to-indigo-200/60 blur-xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-slate-200 p-2 shadow-[0_35px_90px_-35px_rgba(15,23,42,0.42)] sm:rounded-[34px] sm:p-3">
              <img src={imageUrl('photo-1518770660439-4636190af475', 1100)} alt="Detailed circuit board and electronic components" className="h-[310px] w-full rounded-[22px] object-cover sm:h-[390px] lg:h-[460px]" />
              <div className="absolute inset-2 rounded-[22px] bg-gradient-to-t from-[#0f172a]/75 via-transparent to-[#0f172a]/5 sm:inset-3 sm:rounded-[26px]" />
              <div className="absolute left-6 top-6 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-white backdrop-blur-md sm:left-8 sm:top-8">BUILT FOR THE PEOPLE WHO FIX IT</div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
                <div><p className="text-[10px] font-semibold tracking-[0.16em] text-blue-200">ENGINEERED FOR RELIABILITY</p><p className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">Inside every cool solution.</p></div>
                <span className="hidden h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md sm:grid"><ArrowDown size={18} /></span>
              </div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-3 top-[54%] flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-[0_16px_45px_-18px_rgba(15,23,42,0.25)] sm:-left-12 sm:p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><BadgeCheck size={20} /></span>
            <div><p className="text-sm font-bold text-slate-900">100% tested</p><p className="mt-0.5 text-[10px] text-slate-500">Before it ships</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-2 top-8 rounded-2xl border border-slate-100 bg-white/95 p-3.5 shadow-[0_16px_45px_-18px_rgba(15,23,42,0.25)] sm:-right-5 sm:p-4">
            <p className="text-[9px] font-semibold tracking-[0.14em] text-slate-400">PARTS IN STOCK</p><p className="mt-1 text-xl font-bold tracking-tight text-[#0f172a]">10,000<span className="text-blue-600">+</span></p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
