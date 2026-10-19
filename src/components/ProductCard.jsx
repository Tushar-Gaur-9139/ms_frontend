import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { imageUrl } from '../data/products'

export default function ProductCard({ product, index, onAdd }) {
  const [added, setAdded] = useState(false)

  function addToCart(event) {
    onAdd(product, event.currentTarget)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1300)
  }

  return (
    <motion.article layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.32, delay: (index % 4) * 0.045 }} whileHover={{ y: -6, scale: 1.015 }} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_22px_50px_-20px_rgba(15,23,42,0.3)]">
      <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`} className="relative block overflow-hidden bg-[#f3f5f8]">
        <img src={imageUrl(product.image, 650)} alt={product.name} loading="lazy" className="h-[195px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] sm:h-[220px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 to-transparent opacity-60" />
        {product.tag && <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur">{product.tag}</span>}
        <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white text-slate-800 opacity-0 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="p-4 sm:p-[18px]">
        <p className="text-[10px] font-bold tracking-[0.12em] text-blue-600">{product.brand.toUpperCase()} <span className="mx-1 text-slate-300">/</span> {product.appliance.toUpperCase()}</p>
        <Link to={`/products/${product.id}`} className="mt-2 block min-h-[42px] text-[14px] font-semibold leading-5 text-slate-900 transition-colors hover:text-blue-700">{product.name}</Link>
        <p className="mt-1 text-[10px] tracking-wide text-slate-400">MODEL {product.model}</p>
        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] text-slate-500">Retail price</p>
            <p className="mt-0.5 text-lg font-bold tracking-tight text-[#0f172a]">₹{product.price.toLocaleString('en-IN')} <span className="ml-1 text-[11px] font-medium text-slate-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span></p>
          </div>
          <button onClick={addToCart} aria-label={`Add ${product.name} to cart`} className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all active:scale-95 ${added ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{added ? <Check size={18} /> : <Plus size={19} />}</button>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-700"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span> In stock</span>
          <span className="text-[10px] font-medium text-slate-500">{product.partCategory}</span>
        </div>
      </div>
    </motion.article>
  )
}
