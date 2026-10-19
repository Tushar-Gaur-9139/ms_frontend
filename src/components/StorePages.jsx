import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleCheck, Clock3, CreditCard, History, LockKeyhole, LogOut, MapPin, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Truck, UserRound, Wallet } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { imageUrl, products } from '../data/products'
import SectionHeading from './SectionHeading'

function Breadcrumbs({ items }) {
  return <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
    <Link to="/" className="transition hover:text-blue-600">Home</Link>
    {items.map((item) => <span key={item.label} className="contents"><ChevronRight size={13} className="text-slate-300" />{item.to ? <Link to={item.to} className="transition hover:text-blue-600">{item.label}</Link> : <span className="font-medium text-slate-800">{item.label}</span>}</span>)}
  </nav>
}

export function ProductPage({ onAdd, onBuyNow }) {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const [quantity, setQuantity] = useState(1)

  if (!product) return <NotFoundPage />

  function addProduct(event) {
    onAdd(product, event.currentTarget, quantity)
  }

  const relatedProducts = products.filter((item) => item.id !== product.id && (item.brand === product.brand || item.appliance === product.appliance)).slice(0, 4)

  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <section className="bg-white px-5 pb-12 pt-8 sm:px-8 sm:pb-16 lg:px-12 lg:pt-10">
      <div className="mx-auto max-w-[1240px]">
        <Breadcrumbs items={[{ label: 'Products', to: '/#products' }, { label: product.brand, to: '/#categories' }, { label: product.name }]} />
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-[#f4f6f9] shadow-[0_22px_60px_-35px_rgba(15,23,42,0.35)]">
            <img src={imageUrl(product.image, 1100)} alt={product.name} className="h-[340px] w-full object-cover sm:h-[470px]" />
            {product.tag && <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-2 text-[10px] font-bold tracking-wider text-slate-700 shadow backdrop-blur">{product.tag}</span>}
          </motion.div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-bold tracking-[0.17em] text-blue-600">{product.brand.toUpperCase()} · {product.appliance.toUpperCase()}</p>
            <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-[-0.04em] text-[#0f172a] sm:text-[40px]">{product.name}</h1>
            <p className="mt-3 text-xs text-slate-500">Model number <span className="font-semibold text-slate-700">{product.model}</span></p>
            <div className="mt-6 flex items-baseline gap-3"><span className="text-[32px] font-bold tracking-tight text-slate-900">₹{product.price.toLocaleString('en-IN')}</span><span className="text-base text-slate-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span><span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">{Math.round((1 - product.price / product.oldPrice) * 100)}% OFF</span></div>
            <p className="mt-1 text-[10px] text-slate-500">Inclusive of all taxes</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-700"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span> In stock · Ready to ship</div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white"><button onClick={() => setQuantity((count) => Math.max(1, count - 1))} aria-label="Decrease quantity" className="grid h-11 w-10 place-items-center text-slate-500 transition hover:text-blue-600"><Minus size={15} /></button><span className="w-8 text-center text-sm font-semibold">{quantity}</span><button onClick={() => setQuantity((count) => count + 1)} aria-label="Increase quantity" className="grid h-11 w-10 place-items-center text-slate-500 transition hover:text-blue-600"><Plus size={15} /></button></div>
              <button onClick={addProduct} className="group flex h-12 min-w-[190px] flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(37,99,235,0.75)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:scale-[0.99]"><ShoppingBag size={17} /> Add to cart <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></button>
            </div>
            <button onClick={(event) => onBuyNow(product, event.currentTarget, quantity)} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.99]"><CreditCard size={17} className="text-blue-600" /> Buy now · Go to checkout</button>
            <div className="mt-7 grid grid-cols-2 gap-3 border-y border-slate-100 py-5">
              <div className="flex items-center gap-2.5 text-[11px] text-slate-600"><ShieldCheck size={17} className="text-blue-600" /> Quality checked</div>
              <div className="flex items-center gap-2.5 text-[11px] text-slate-600"><Truck size={17} className="text-blue-600" /> Pan-India delivery</div>
              <div className="flex items-center gap-2.5 text-[11px] text-slate-600"><PackageCheck size={17} className="text-blue-600" /> Securely packed</div>
              <div className="flex items-center gap-2.5 text-[11px] text-slate-600"><CreditCard size={17} className="text-blue-600" /> Secure checkout</div>
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-800">Part details</p><div className="mt-3 grid grid-cols-2 gap-y-2 text-[11px]"><span className="text-slate-500">Brand</span><span className="text-right font-medium text-slate-700">{product.brand}</span><span className="text-slate-500">Appliance</span><span className="text-right font-medium text-slate-700">{product.appliance}</span><span className="text-slate-500">Part type</span><span className="text-right font-medium text-slate-700">{product.partCategory}</span><span className="text-slate-500">Model</span><span className="text-right font-medium text-slate-700">{product.model}</span></div></div>
          </div>
        </div>
      </div>
    </section>
    {relatedProducts.length > 0 && <section className="bg-[#f7f9fc] px-5 py-14 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1240px]"><SectionHeading eyebrow="MORE TO EXPLORE" title="You might also need." /><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{relatedProducts.map((item, index) => <RelatedProduct key={item.id} product={item} index={index} />)}</div></div></section>}
  </motion.div>
}

function RelatedProduct({ product, index }) {
  return <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
    <Link to={`/products/${product.id}`} className="block"><img src={imageUrl(product.image, 440)} alt={product.name} loading="lazy" className="h-[155px] w-full object-cover transition-transform duration-500 hover:scale-105" /><div className="p-4"><p className="text-[9px] font-bold tracking-wider text-blue-600">{product.brand.toUpperCase()} · {product.appliance.toUpperCase()}</p><h3 className="mt-2 min-h-10 text-xs font-semibold leading-5 text-slate-800">{product.name}</h3><p className="mt-2 text-sm font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</p></div></Link>
  </motion.div>
}

const fields = [
  { name: 'fullName', label: 'Full name', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone number', placeholder: '+91 98765 43210', type: 'tel', autoComplete: 'tel' },
  { name: 'address', label: 'Street address', placeholder: 'House number, street, area', autoComplete: 'street-address', wide: true },
  { name: 'city', label: 'City', placeholder: 'Your city', autoComplete: 'address-level2' },
  { name: 'state', label: 'State', placeholder: 'Your state', autoComplete: 'address-level1' },
  { name: 'pincode', label: 'PIN code', placeholder: '6-digit PIN code', autoComplete: 'postal-code' },
]

export function CheckoutPage({ items, subtotal, customer, onPlaceOrder, onStartPayment, notify }) {
  const navigate = useNavigate()
  const [values, setValues] = useState(() => customer ?? {})
  const [paymentMethod, setPaymentMethod] = useState('Cash on delivery')
  const [errors, setErrors] = useState({})

  function submit(event) {
    event.preventDefault()
    if (!items.length) {
      notify({ type: 'error', title: 'Your cart is empty', message: 'Add a product before proceeding to checkout.' })
      return
    }
    const nextErrors = {}
    fields.forEach(({ name, label, type }) => {
      const value = values[name]?.trim() ?? ''
      if (!value) nextErrors[name] = `${label} is required.`
      else if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) nextErrors[name] = 'Enter a valid email address.'
      else if (name === 'phone' && !/^[+]?[\d\s()-]{10,16}$/.test(value)) nextErrors[name] = 'Enter a valid phone number.'
      else if (name === 'pincode' && !/^\d{6}$/.test(value)) nextErrors[name] = 'Enter a valid 6-digit PIN code.'
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      notify({ type: 'error', title: 'Check your delivery details', message: Object.values(nextErrors)[0] })
      return
    }
    const orderDetails = { customer: values, total: subtotal, paymentMethod }
    if (paymentMethod === 'Cash on delivery') onPlaceOrder({ ...orderDetails, paymentStatus: 'Due on delivery' })
    else onStartPayment(orderDetails)
  }

  if (!items.length) return <main className="grid min-h-[60vh] place-items-center bg-[#f7f9fc] px-5 py-16">
    <div className="max-w-md text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-blue-600 shadow-lg"><ShoppingBag size={27} /></span><h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">Your cart is empty.</h1><p className="mt-2 text-sm leading-6 text-slate-500">Add something you need, and we&apos;ll bring you right back here.</p><Link to="/#products" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700">Explore products <ArrowRight size={15} /></Link></div>
  </main>

  return <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="min-h-[75vh] bg-[#f7f9fc] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
    <div className="mx-auto max-w-[1160px]">
      <Breadcrumbs items={[{ label: 'Your bag', to: '/#products' }, { label: 'Checkout' }]} />
      <h1 className="text-[30px] font-semibold tracking-[-0.04em] text-[#0f172a] sm:text-[38px]">Checkout</h1>
      <p className="mt-2 text-sm text-slate-500">A few details and your order is on its way.</p>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_390px] lg:gap-8">
        <form noValidate onSubmit={submit} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-600"><Truck size={18} /></span><div><h2 className="text-sm font-semibold text-slate-900">Delivery information</h2><p className="mt-0.5 text-[10px] text-slate-500">Where should we send your order?</p></div></div>
          <div className="mt-6 grid gap-x-4 gap-y-4 sm:grid-cols-2">
            {fields.map(({ name, label, placeholder, type = 'text', autoComplete, wide }) => <label key={name} className={`block ${wide ? 'sm:col-span-2' : ''}`}><span className="mb-1.5 block text-[11px] font-medium text-slate-700">{label}<span className="ml-0.5 text-rose-500">*</span></span><input type={type} inputMode={name === 'phone' || name === 'pincode' ? 'tel' : undefined} autoComplete={autoComplete} value={values[name] ?? ''} onChange={(event) => { setValues((current) => ({ ...current, [name]: event.target.value })); setErrors((current) => ({ ...current, [name]: undefined })) }} placeholder={placeholder} aria-invalid={Boolean(errors[name])} className={`h-11 w-full rounded-xl border px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${errors[name] ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'}`} />{errors[name] && <span className="mt-1 block text-[10px] text-rose-600">{errors[name]}</span>}</label>)}
          </div>
          <fieldset className="mt-7">
            <legend className="text-xs font-semibold text-slate-800">Payment preference</legend>
            <div className="mt-3 grid gap-3">
              {[{ label: 'Cash on delivery', description: 'Pay when your order arrives.' }, { label: 'UPI payment (demo)', description: 'Preview an online UPI payment flow. No money is collected.' }, { label: 'Card payment (demo)', description: 'Preview a card checkout flow. Do not enter card details.' }].map(({ label, description }) => <label key={label} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${paymentMethod === label ? 'border-blue-300 bg-blue-50/60 ring-1 ring-blue-100' : 'border-slate-200 hover:border-slate-300'}`}><input type="radio" name="paymentMethod" value={label} checked={paymentMethod === label} onChange={() => setPaymentMethod(label)} className="mt-0.5 accent-blue-600" /><span><span className="block text-[11px] font-semibold text-slate-800">{label}</span><span className="mt-1 block text-[10px] leading-4 text-slate-500">{description}</span></span></label>)}
            </div>
          </fieldset>
          <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50/60 p-4"><p className="flex items-center gap-2 text-xs font-semibold text-slate-800"><LockKeyhole size={15} className="text-blue-600" /> Safe demo checkout</p><p className="mt-1.5 text-[11px] leading-5 text-slate-500">This demo records no payment information and sends no personal details to a server. Orders are shown as a local confirmation only.</p></div>
          <button type="submit" className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700 active:scale-[0.99] sm:w-auto sm:px-7">{paymentMethod === 'Cash on delivery' ? <><Check size={16} /> Place demo order</> : <><LockKeyhole size={16} /> Continue to demo payment</>}</button>
        </form>
        <aside className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
          <h2 className="text-sm font-semibold text-slate-900">Order summary <span className="ml-1 text-[11px] font-normal text-slate-400">({items.reduce((total, item) => total + item.quantity, 0)} items)</span></h2>
          <div className="mt-4 max-h-[340px] space-y-4 overflow-y-auto pr-1">{items.map(({ product, quantity }) => <div key={product.id} className="flex gap-3"><div className="relative"><img src={imageUrl(product.image, 180)} alt="" className="h-[66px] w-[66px] rounded-xl bg-slate-100 object-cover" /><span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-slate-700 px-1 text-[9px] font-semibold text-white">{quantity}</span></div><div className="min-w-0 flex-1"><p className="text-[9px] font-bold tracking-wide text-blue-600">{product.brand.toUpperCase()} · {product.appliance.toUpperCase()}</p><p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-slate-800">{product.name}</p><p className="mt-1 text-[10px] text-slate-500">₹{product.price.toLocaleString('en-IN')} each</p></div><p className="shrink-0 text-xs font-semibold text-slate-800">₹{(product.price * quantity).toLocaleString('en-IN')}</p></div>)}</div>
          <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-xs"><div className="flex justify-between text-slate-500"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div><div className="flex justify-between text-slate-500"><span>Delivery</span><span className="font-medium text-emerald-600">FREE</span></div><div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-bold text-slate-900"><span>Total</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div></div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400"><ShieldCheck size={13} /> Safe and secure demo checkout</p>
        </aside>
      </div>
      <button onClick={() => navigate(-1)} className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-700"><ArrowLeft size={14} /> Back</button>
    </div>
  </motion.main>
}

export function NotFoundPage() {
  return <main className="grid min-h-[70vh] place-items-center overflow-hidden bg-[#f7f9fc] px-5 py-16">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-lg text-center">
      <span className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-200/40 blur-[80px]" />
      <p className="relative text-[100px] font-bold leading-none tracking-[-0.09em] text-blue-600 sm:text-[140px]">404</p>
      <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-slate-400">WRONG TURN, RIGHT STORE</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">This page isn&apos;t on the shelf.</h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">The link may be out of date, or the page may have moved. Let&apos;s get you back to the parts you need.</p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg">Back to home <ArrowRight size={15} /></Link><Link to="/#products" className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">Browse products</Link></div>
    </motion.div>
  </main>
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}

function OrderSummaryCard({ order, expanded = false }) {
  const steps = ['Order confirmed', 'Preparing order', 'Out for delivery', 'Delivered']
  return <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="text-[10px] font-bold tracking-wider text-blue-600">ORDER {order.id}</p><h3 className="mt-1 text-sm font-semibold text-slate-900">{order.items.length} {order.items.length === 1 ? 'product' : 'products'} · ₹{order.total.toLocaleString('en-IN')}</h3><p className="mt-1 text-[10px] text-slate-500">Placed {formatDate(order.createdAt)}</p></div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-700"><Clock3 size={12} /> {order.status}</span>
    </div>
    {expanded && <div className="mt-5 rounded-xl bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => <div key={step} className="flex flex-1 flex-col items-center text-center">
          <span className={`grid h-7 w-7 place-items-center rounded-full ${index === 0 ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 ring-1 ring-slate-200'}`}>{index === 0 ? <CircleCheck size={15} /> : <span className="text-[10px] font-semibold">{index + 1}</span>}</span>
          <span className={`mt-2 text-[8px] leading-3 sm:text-[9px] ${index === 0 ? 'font-semibold text-blue-700' : 'text-slate-400'}`}>{step}</span>
        </div>)}
      </div>
      <div className="mt-4 grid gap-2 border-t border-slate-200 pt-3 text-[10px] sm:grid-cols-2">
        <p className="flex items-center gap-2 text-slate-600"><Wallet size={14} className="text-blue-600" /> Payment: <span className="font-semibold text-slate-800">{order.paymentStatus}</span></p>
        <p className="flex items-center gap-2 text-slate-600"><Truck size={14} className="text-blue-600" /> Estimated delivery: <span className="font-semibold text-slate-800">{formatDate(order.estimatedDelivery)}</span></p>
        {order.transactionId && <p className="flex items-center gap-2 text-slate-600 sm:col-span-2"><CreditCard size={14} className="text-blue-600" /> Demo transaction reference: <span className="font-mono font-semibold text-slate-800">{order.transactionId}</span></p>}
      </div>
      <p className="mt-3 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-[10px] leading-4 text-amber-800">Demo tracking: this order is saved in this browser. Live courier and payment updates are not connected.</p>
      <div className="mt-4 divide-y divide-slate-200/70">{order.items.map(({ product, quantity }) => <div key={product.id} className="flex items-center justify-between gap-3 py-2.5"><Link to={`/products/${product.id}`} className="text-[11px] font-medium text-slate-700 transition hover:text-blue-700">{product.name}<span className="ml-1 text-slate-400">× {quantity}</span></Link><span className="shrink-0 text-[11px] font-semibold text-slate-800">₹{(product.price * quantity).toLocaleString('en-IN')}</span></div>)}</div>
    </div>}
  </article>
}

export function AccountPage({ cart, orders, customer, signedIn, onSignOut, onSignIn, onCreateAccount, onQuantity, onRemove }) {
  const [activeTab, setActiveTab] = useState('Current order')
  const [authMode, setAuthMode] = useState(customer ? 'signin' : 'create')
  const [authValues, setAuthValues] = useState({ fullName: '', email: '' })
  const [authError, setAuthError] = useState('')
  const currentOrder = orders.find((order) => order.status !== 'Delivered')
  const tabs = [
    { label: 'Current order', icon: Truck, count: currentOrder ? '1' : null },
    { label: 'Order history', icon: History, count: orders.length || null },
    { label: 'My cart', icon: ShoppingBag, count: cart.reduce((count, item) => count + item.quantity, 0) || null },
    { label: 'My profile', icon: UserRound, count: null },
  ]

  function submitAccount(event) {
    event.preventDefault()
    const email = authValues.email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError('Enter a valid email address.')
      return
    }
    if (authMode === 'create') {
      const fullName = authValues.fullName.trim()
      if (!fullName) {
        setAuthError('Enter your name to create a local demo profile.')
        return
      }
      onCreateAccount({ fullName, email })
      setAuthError('')
      return
    }
    if (!onSignIn(email)) {
      setAuthError(customer ? 'That email does not match this browser’s saved demo account.' : 'No saved demo account yet. Create an account to get started.')
      return
    }
    setAuthError('')
  }

  if (!signedIn) return <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid min-h-[65vh] place-items-center bg-[#f7f9fc] px-5 py-10 sm:px-8">
    <section className="w-full max-w-[440px] rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_22px_65px_-30px_rgba(15,23,42,0.3)] sm:p-8">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600"><UserRound size={22} /></span>
      <p className="mt-5 text-[10px] font-bold tracking-[0.17em] text-blue-600">M.S. ENTERPRISES ACCOUNT</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{authMode === 'create' ? 'Create your demo account.' : 'Welcome back.'}</h1>
      <p className="mt-2 text-xs leading-5 text-slate-500">{authMode === 'create' ? 'Save your customer profile in this browser to view your cart and orders.' : 'Enter the email used for your local demo account to see your saved orders.'}</p>
      <form onSubmit={submitAccount} className="mt-6 space-y-4">
        {authMode === 'create' && <label className="block"><span className="mb-1.5 block text-[11px] font-medium text-slate-700">Full name</span><input required autoComplete="name" value={authValues.fullName} onChange={(event) => setAuthValues((value) => ({ ...value, fullName: event.target.value }))} placeholder="Your name" className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label>}
        <label className="block"><span className="mb-1.5 block text-[11px] font-medium text-slate-700">Email address</span><input required type="email" autoComplete="email" value={authValues.email} onChange={(event) => setAuthValues((value) => ({ ...value, email: event.target.value }))} placeholder="you@example.com" className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label>
        {authError && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-[11px] text-rose-700">{authError}</p>}
        <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700">{authMode === 'create' ? 'Create demo account' : 'Sign in'} <ArrowRight size={15} /></button>
      </form>
      <button onClick={() => { setAuthMode((mode) => mode === 'create' ? 'signin' : 'create'); setAuthError('') }} className="mt-4 w-full text-center text-[11px] font-medium text-blue-600 hover:text-blue-800">{authMode === 'create' ? 'Already have an account? Sign in' : 'New here? Create an account'}</button>
      <p className="mt-5 rounded-lg bg-amber-50 px-3 py-2.5 text-[10px] leading-4 text-amber-800">Demo account only: no password is collected, and your profile and orders stay in this browser. This is not secure production authentication.</p>
    </section>
  </motion.main>

  return <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="min-h-[72vh] bg-[#f7f9fc] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
    <div className="mx-auto max-w-[1160px]">
      <Breadcrumbs items={[{ label: 'My account' }]} />
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-[10px] font-bold tracking-[0.17em] text-blue-600">YOUR M.S. ENTERPRISES</p><h1 className="mt-2 text-[30px] font-semibold tracking-[-0.04em] text-[#0f172a] sm:text-[38px]">{customer?.fullName ? `Hello, ${customer.fullName.split(' ')[0]}.` : 'Your account.'}</h1><p className="mt-2 text-sm text-slate-500">Keep an eye on your orders, payments, and shopping cart.</p></div>
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm"><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600"><UserRound size={17} /></span><div><p className="text-[11px] font-semibold text-slate-800">{customer?.fullName || 'Guest customer'}</p><p className="mt-0.5 text-[10px] text-slate-500">{customer?.email || 'Your details are saved in this browser'}</p></div></div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[{ label: 'Total orders', value: orders.length, icon: PackageCheck }, { label: 'Active orders', value: orders.filter((order) => order.status !== 'Delivered').length, icon: Truck }, { label: 'Items in cart', value: cart.reduce((count, item) => count + item.quantity, 0), icon: ShoppingBag }].map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={19} /></span><div><p className="text-xl font-bold tracking-tight text-slate-900">{value}</p><p className="text-[10px] text-slate-500">{label}</p></div></div>)}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[235px_1fr] lg:items-start">
        <aside className="rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm">
          <p className="px-3 pb-2 pt-2 text-[9px] font-bold tracking-[0.16em] text-slate-400">ACCOUNT MENU</p>
          <nav aria-label="Account sections" className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">
            {tabs.map(({ label, icon: Icon, count }) => <button key={label} aria-current={activeTab === label ? 'page' : undefined} onClick={() => setActiveTab(label)} className={`flex items-center gap-2.5 rounded-xl px-3 py-3 text-left text-[11px] font-semibold transition ${activeTab === label ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={16} className={activeTab === label ? 'text-blue-600' : 'text-slate-400'} /><span className="flex-1">{label}</span>{count && <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[9px] ${activeTab === label ? 'bg-white text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{count}</span>}</button>)}
          </nav>
          <div className="mt-2 border-t border-slate-100 pt-2"><button onClick={onSignOut} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-left text-[11px] font-semibold text-rose-600 transition hover:bg-rose-50"><LogOut size={16} /> Sign out</button></div>
        </aside>

      <section aria-label={activeTab} className="min-w-0">
        {activeTab === 'Current order' && <div className="space-y-4">
          {currentOrder ? <OrderSummaryCard order={currentOrder} expanded /> : <div className="rounded-2xl border border-slate-200/80 bg-white px-5 py-12 text-center shadow-sm"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Truck size={25} /></span><h2 className="mt-4 text-base font-semibold text-slate-900">No active orders yet.</h2><p className="mt-2 text-xs text-slate-500">Once you place an order, its status will appear here.</p><Link to="/#products" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700">Explore products <ArrowRight size={14} /></Link></div>}
          {orders.length > 1 && <p className="text-[11px] text-slate-500">You have {orders.length - 1} earlier order{orders.length - 1 === 1 ? '' : 's'} in your history.</p>}
        </div>}
        {activeTab === 'Order history' && <div className="space-y-3">
          {orders.length ? orders.map((order) => <OrderSummaryCard key={order.id} order={order} expanded />) : <div className="rounded-2xl border border-slate-200/80 bg-white px-5 py-12 text-center shadow-sm"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600"><History size={24} /></span><h2 className="mt-4 text-base font-semibold text-slate-900">Your order history starts here.</h2><p className="mt-2 text-xs text-slate-500">Completed demo checkouts will show here for this browser.</p><Link to="/#products" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700">Shop products <ArrowRight size={14} /></Link></div>}
        </div>}
        {activeTab === 'My cart' && <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-slate-900">Your saved cart</h2><p className="mt-1 text-[10px] text-slate-500">Cart contents are saved in this browser.</p></div><span className="text-xs font-semibold text-slate-600">{cart.reduce((count, item) => count + item.quantity, 0)} items</span></div>
          {cart.length ? <><div className="mt-4 divide-y divide-slate-100">{cart.map(({ product, quantity }) => <div key={product.id} className="flex items-center gap-3 py-4"><Link to={`/products/${product.id}`} className="shrink-0"><img src={imageUrl(product.image, 180)} alt="" className="h-[68px] w-[68px] rounded-xl bg-slate-100 object-cover" /></Link><div className="min-w-0 flex-1"><Link to={`/products/${product.id}`} className="text-[11px] font-semibold leading-5 text-slate-800 hover:text-blue-700">{product.name}</Link><p className="mt-1 text-[10px] text-slate-500">₹{product.price.toLocaleString('en-IN')} each</p></div><div className="flex items-center rounded-lg border border-slate-200"><button onClick={() => onQuantity(product.id, -1)} aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center text-slate-600 hover:text-blue-600"><Minus size={13} /></button><span className="w-6 text-center text-[11px] font-semibold">{quantity}</span><button onClick={() => onQuantity(product.id, 1)} aria-label="Increase quantity" className="grid h-8 w-8 place-items-center text-slate-600 hover:text-blue-600"><Plus size={13} /></button></div><button onClick={() => onRemove(product.id)} className="px-1 text-[10px] text-rose-500 hover:text-rose-700">Remove</button></div>)}</div><div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center"><p className="text-sm font-semibold text-slate-900">Subtotal · ₹{cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString('en-IN')}</p><Link to="/checkout" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-semibold text-white transition hover:bg-blue-700">Go to checkout <ArrowRight size={14} /></Link></div></> : <div className="py-12 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600"><ShoppingBag size={24} /></span><h3 className="mt-4 text-sm font-semibold text-slate-900">Your cart is empty.</h3><p className="mt-2 text-xs text-slate-500">Products you add will be saved here.</p><Link to="/#products" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700">Browse products <ArrowRight size={14} /></Link></div>}
        </div>}
        {activeTab === 'My profile' && <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center gap-3 border-b border-slate-100 pb-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-600"><UserRound size={19} /></span><div><h2 className="text-sm font-semibold text-slate-900">{customer?.fullName || 'Customer profile'}</h2><p className="mt-1 text-[10px] text-slate-500">{customer?.email}</p></div></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><div><p className="text-[10px] text-slate-400">Phone</p><p className="mt-1 text-xs font-medium text-slate-700">{customer?.phone || 'Not added yet'}</p></div><div><p className="text-[10px] text-slate-400">Address</p><p className="mt-1 text-xs font-medium leading-5 text-slate-700">{customer?.address ? `${customer.address}, ${customer.city}, ${customer.state} ${customer.pincode}` : 'Add your delivery details at checkout'}</p></div></div><p className="mt-5 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2.5 text-[10px] leading-4 text-amber-800">Profile is stored only in this browser. This demo does not use secure server-side accounts.</p></div>}
      </section>
      </div>

      {customer?.address && <div className="mt-6 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-[11px] text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0 text-blue-600" /><span><span className="font-semibold text-slate-800">Saved delivery address</span><br />{customer.address}, {customer.city}, {customer.state} {customer.pincode}</span></div>}
      <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-3.5 text-[10px] leading-5 text-amber-800"><Wallet size={14} className="mt-0.5 shrink-0" /><span>Account data, order history, and tracking details are stored in this browser only. Payment and courier services are not connected in this demo.</span></div>
    </div>
  </motion.main>
}
