import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, CircleX, CreditCard, LockKeyhole, Minus, Plus, ShieldCheck, Smartphone, Trash2, X } from 'lucide-react'
import { imageUrl } from '../data/products'

export function CartDrawer({ open, onClose, items, onQuantity, onRemove, onCheckout, subtotal }) {
  return (
    <AnimatePresence>
      {open && <>
        <motion.button aria-label="Close cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 cursor-default bg-slate-950/40 backdrop-blur-[2px]" />
        <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 z-[51] flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl">
          <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-5 sm:px-7">
            <div><h2 className="text-base font-semibold text-slate-900">Your bag</h2><p className="mt-0.5 text-[11px] text-slate-500">{items.reduce((total, item) => total + item.quantity, 0)} items ready when you are</p></div>
            <button onClick={onClose} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-3 sm:px-7">
            {items.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600"><ShoppingBagIcon /></span><h3 className="mt-5 text-base font-semibold text-slate-900">A good fix starts here.</h3><p className="mt-2 max-w-[240px] text-xs leading-5 text-slate-500">Your bag is empty. Find the right board for your next repair.</p><button onClick={onClose} className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700">Browse the collection</button></div> :
              <div className="divide-y divide-slate-100">{items.map(({ product, quantity }) => <article key={product.id} className="flex gap-3 py-4"><img src={imageUrl(product.image, 220)} alt="" className="h-[82px] w-[82px] rounded-xl bg-slate-100 object-cover" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><p className="text-[9px] font-bold tracking-wide text-blue-600">{product.brand.toUpperCase()}</p><h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-800">{product.name}</h3></div><button onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`} className="shrink-0 p-1 text-slate-400 transition hover:text-rose-500"><Trash2 size={15} /></button></div><div className="mt-2 flex items-center justify-between"><div className="flex items-center rounded-lg border border-slate-200"><button onClick={() => onQuantity(product.id, -1)} aria-label="Decrease quantity" className="grid h-7 w-7 place-items-center text-slate-600 hover:text-blue-600"><Minus size={12} /></button><span className="w-6 text-center text-[11px] font-semibold">{quantity}</span><button onClick={() => onQuantity(product.id, 1)} aria-label="Increase quantity" className="grid h-7 w-7 place-items-center text-slate-600 hover:text-blue-600"><Plus size={12} /></button></div><span className="text-sm font-bold text-slate-900">₹{(product.price * quantity).toLocaleString('en-IN')}</span></div></div></article>)}</div>}
          </div>
          {items.length > 0 && <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-7"><div className="flex justify-between text-xs text-slate-500"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div><p className="mt-2 text-[10px] text-slate-400">Shipping and taxes calculated at checkout.</p><button onClick={onCheckout} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]">Continue to checkout <ArrowRight size={16} /></button><p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400"><ShieldCheck size={13} /> Secure checkout · GST invoice available</p></div>}
        </motion.aside>
      </>}
    </AnimatePresence>
  )
}

export function ToastViewport({ toasts, onDismiss }) {
  return <div aria-live="polite" aria-relevant="additions" className="pointer-events-none fixed right-4 top-24 z-[90] flex w-[calc(100%-2rem)] max-w-[370px] flex-col gap-3 sm:right-6">
    <AnimatePresence initial={false}>
      {toasts.map((toast) => {
        const success = toast.type === 'success'
        const Icon = success ? CheckCircle2 : CircleX
        return <motion.div key={toast.id} initial={{ opacity: 0, x: 35, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 25, scale: 0.96 }} transition={{ duration: 0.22 }} role={success ? 'status' : 'alert'} className="pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_18px_55px_-18px_rgba(15,23,42,0.32)]">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${success ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}><Icon size={20} /></span>
          <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-slate-900">{toast.title}</p><p className="mt-1 text-[11px] leading-5 text-slate-500">{toast.message}</p></div>
          <button onClick={() => onDismiss(toast.id)} aria-label="Dismiss notification" className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={15} /></button>
          <motion.span initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 4.5, ease: 'linear' }} className={`absolute bottom-0 left-0 h-[2px] w-full origin-left ${success ? 'bg-emerald-400' : 'bg-rose-400'}`} />
        </motion.div>
      })}
    </AnimatePresence>
  </div>
}

export function OrderConfirmation({ order, onClose, onContinue }) {
  return <AnimatePresence>
    {order && <div className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto px-4 py-8">
      <motion.button aria-label="Close order confirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm" />
      <motion.section initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.98 }} transition={{ duration: 0.25 }} role="dialog" aria-modal="true" aria-labelledby="order-confirmation-title" className="relative z-10 w-full max-w-[430px] rounded-[26px] border border-white/70 bg-white p-7 text-center shadow-2xl sm:p-9">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={34} /></span>
        <p className="mt-5 text-[10px] font-bold tracking-[0.18em] text-emerald-600">ORDER PLACED</p>
        <h2 id="order-confirmation-title" className="mt-2 text-[25px] font-semibold tracking-tight text-slate-900">Thank you for your order!</h2>
        <p className="mt-2 text-xs leading-5 text-slate-500">Your order has been placed successfully. This is a demo checkout; no payment was charged.</p>
        <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3"><p className="text-[10px] font-medium text-slate-500">ORDER REFERENCE</p><p className="mt-1 text-sm font-bold tracking-wider text-slate-900">{order.id}</p><p className="mt-1 text-xs text-slate-500">Order total · ₹{order.total.toLocaleString('en-IN')}</p></div>
        <button onClick={onContinue} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700">Continue shopping <ArrowRight size={16} /></button>
      </motion.section>
    </div>}
  </AnimatePresence>
}

export function PaymentSimulator({ order, onClose, onResult }) {
  const [processing, setProcessing] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function simulate(success) {
    setProcessing(true)
    timeoutRef.current = window.setTimeout(() => {
      setProcessing(false)
      onResult(success)
    }, 850)
  }

  return <AnimatePresence>
    {order && <div className="fixed inset-0 z-[86] grid place-items-center overflow-y-auto px-4 py-8">
      <motion.button aria-label="Close payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} disabled={processing} className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm disabled:cursor-wait" />
      <motion.section initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.22 }} role="dialog" aria-modal="true" aria-labelledby="payment-title" className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[25px] border border-white/70 bg-white shadow-2xl">
        <div className="bg-[#0f172a] px-6 pb-5 pt-6 text-white sm:px-7">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-bold tracking-[0.19em] text-blue-300">M.S. ENTERPRISES · SECURE CHECKOUT</p><h2 id="payment-title" className="mt-2 text-xl font-semibold tracking-tight">Complete your payment</h2></div><button onClick={onClose} disabled={processing} aria-label="Cancel payment" className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/20 disabled:opacity-40"><X size={16} /></button></div>
          <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4"><div><p className="text-[10px] text-slate-400">Amount due</p><p className="mt-1 text-2xl font-bold tracking-tight">₹{order.total.toLocaleString('en-IN')}</p></div><span className="mb-1 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-medium text-blue-100">{order.paymentMethod === 'UPI payment (demo)' ? <Smartphone size={12} /> : <CreditCard size={12} />}{order.paymentMethod.replace(' (demo)', '')}</span></div>
        </div>
        <div className="p-6 sm:p-7">
          {processing ? <div className="py-7 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-50"><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="block h-6 w-6 rounded-full border-[3px] border-blue-200 border-t-blue-600" /></span><p className="mt-4 text-sm font-semibold text-slate-900">Processing demo payment…</p><p className="mt-1 text-[11px] text-slate-500">Please wait a moment.</p></div> : <>
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3.5"><p className="flex items-center gap-2 text-[11px] font-semibold text-slate-800"><LockKeyhole size={14} className="text-blue-600" /> Static payment simulation</p><p className="mt-1.5 text-[10px] leading-4 text-slate-500">No real payment is made. Choose an outcome below to preview both checkout flows.</p></div>
            <p className="mb-2 mt-5 text-[10px] font-bold tracking-[0.14em] text-slate-500">SIMULATE A PAYMENT RESULT</p>
            <button onClick={() => simulate(true)} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-xs font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.99]"><CheckCircle2 size={16} /> Simulate successful payment</button>
            <button onClick={() => simulate(false)} className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white text-xs font-semibold text-rose-700 transition hover:bg-rose-50 active:scale-[0.99]"><CircleX size={16} /> Simulate failed payment</button>
            <button onClick={onClose} className="mt-3 w-full py-2 text-[10px] font-medium text-slate-500 transition hover:text-slate-800">Cancel and return to checkout</button>
          </>}
        </div>
      </motion.section>
    </div>}
  </AnimatePresence>
}

function ShoppingBagIcon() {
  return <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
}

export function PageLoader() {
  return <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[100] grid place-items-center bg-white">
    <div className="text-center"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.45 }} className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#0f172a] text-xl font-black text-white">M<span className="text-blue-400">.</span></motion.div><p className="mt-4 text-[10px] font-bold tracking-[0.24em] text-slate-700">M.S. ENTERPRISES</p><div className="mx-auto mt-4 h-1 w-24 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 0.75, ease: 'easeInOut' }} className="h-full rounded-full bg-blue-600" /></div></div>
  </motion.div>
}
