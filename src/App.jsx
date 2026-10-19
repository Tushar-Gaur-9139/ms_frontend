import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { Categories, FeaturedProducts, Stats, Testimonials, WhyUs } from './components/StoreSections'
import { CartDrawer, OrderConfirmation, PageLoader, PaymentSimulator, ToastViewport } from './components/Overlays'
import { products as catalogue } from './data/products'

const AccountPage = lazy(() => import('./components/StorePages').then((module) => ({ default: module.AccountPage })))
const CheckoutPage = lazy(() => import('./components/StorePages').then((module) => ({ default: module.CheckoutPage })))
const NotFoundPage = lazy(() => import('./components/StorePages').then((module) => ({ default: module.NotFoundPage })))
const ProductPage = lazy(() => import('./components/StorePages').then((module) => ({ default: module.ProductPage })))

const STORAGE_KEYS = {
  cart: 'ms-enterprises-cart',
  orders: 'ms-enterprises-orders',
  customer: 'ms-enterprises-customer',
  accountSignedIn: 'ms-enterprises-account-signed-in',
  theme: 'ms-enterprises-theme',
}

function readStored(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function HomePage({ products, filters, onBrowse, onFilter, onAdd }) {
  return <>
    <Hero />
    <Stats />
    <Categories onSelect={onBrowse} />
    <FeaturedProducts products={products} filters={filters} onSelect={onFilter} onAdd={onAdd} />
    <WhyUs />
    <Testimonials />
  </>
}

function StoreApp() {
  const [cart, setCart] = useState(() => readStored(STORAGE_KEYS.cart, []))
  const [orders, setOrders] = useState(() => readStored(STORAGE_KEYS.orders, []))
  const [customer, setCustomer] = useState(() => readStored(STORAGE_KEYS.customer, null))
  const [accountSignedIn, setAccountSignedIn] = useState(() => readStored(STORAGE_KEYS.accountSignedIn, Boolean(readStored(STORAGE_KEYS.customer, null))))
  const [darkMode, setDarkMode] = useState(() => readStored(STORAGE_KEYS.theme, 'light') === 'dark')
  const [cartOpen, setCartOpen] = useState(false)
  const [filters, setFilters] = useState({ brand: 'All', appliance: 'All', part: 'All' })
  const [search, setSearch] = useState('')
  const [flight, setFlight] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toasts, setToasts] = useState([])
  const [confirmation, setConfirmation] = useState(null)
  const [pendingPayment, setPendingPayment] = useState(null)
  const storageErrorNotified = useRef(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, darkMode ? 'dark' : 'light')
    } catch {
      // Theme still works for the current session if browser storage is unavailable.
    }
  }, [darkMode])

  useEffect(() => {
    if (!flight) return undefined
    const timeout = window.setTimeout(() => setFlight(null), 850)
    return () => window.clearTimeout(timeout)
  }, [flight])

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const timeout = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => window.clearTimeout(timeout)
  }, [location.pathname, location.hash])

  const notify = useCallback((toast) => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((current) => [...current, { id, ...toast }])
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 4600)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart))
      window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders))
      window.localStorage.setItem(STORAGE_KEYS.customer, JSON.stringify(customer))
      window.localStorage.setItem(STORAGE_KEYS.accountSignedIn, JSON.stringify(accountSignedIn))
    } catch {
      if (!storageErrorNotified.current) {
        storageErrorNotified.current = true
        window.setTimeout(() => notify({ type: 'error', title: 'Could not save your session', message: 'Browser storage is unavailable. Your cart and order history may not persist after refreshing.' }), 0)
      }
    }
  }, [accountSignedIn, cart, customer, notify, orders])

  const visibleProducts = useMemo(() => catalogue.filter((product) => {
    const matchesBrand = filters.brand === 'All' || product.brand === filters.brand
    const matchesAppliance = filters.appliance === 'All' || product.appliance === filters.appliance
    const matchesPart = filters.part === 'All' || product.partCategory === filters.part
    const term = search.trim().toLowerCase()
    const matchesSearch = !term || `${product.name} ${product.brand} ${product.appliance} ${product.partCategory} ${product.model}`.toLowerCase().includes(term)
    return matchesBrand && matchesAppliance && matchesPart && matchesSearch
  }), [filters, search])
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  function addToCart(product, button, quantity = 1) {
    const start = button?.getBoundingClientRect()
    const cartButton = [...document.querySelectorAll('[data-cart-target]')].find((element) => element.getClientRects().length > 0)
    const end = cartButton?.getBoundingClientRect()
    setCart((items) => {
      const existing = items.find((item) => item.product.id === product.id)
      return existing
        ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...items, { product, quantity }]
    })
    if (start && end) setFlight({ id: `${product.id}-${Date.now()}`, image: product.image, x: start.left + start.width / 2, y: start.top + start.height / 2, endX: end.left + end.width / 2, endY: end.top + end.height / 2 })
    notify({ type: 'success', title: 'Added to your cart', message: `${quantity} × ${product.name}` })
  }

  function updateQuantity(id, amount) {
    setCart((items) => items.map((item) => item.product.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  }

  function browse(filtersToApply) {
    setFilters({ brand: 'All', appliance: 'All', part: 'All', ...filtersToApply })
    setSearch('')
    navigate('/#products')
    window.setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  function searchProducts(value) {
    setSearch(value)
    if (location.pathname !== '/') navigate('/#products')
  }

  function placeOrder(order) {
    const orderDetails = {
      ...order,
      id: `MS${Date.now().toString().slice(-8)}`,
      items: cart.map((item) => ({ ...item })),
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Order confirmed',
      paymentStatus: order.paymentStatus ?? (order.paymentMethod === 'Cash on delivery' ? 'Due on delivery' : 'Not processed (demo)'),
      transactionId: order.transactionId ?? null,
    }
    setOrders((current) => [orderDetails, ...current])
    setCustomer(order.customer)
    setAccountSignedIn(true)
    setCart([])
    setConfirmation(orderDetails)
    notify({ type: 'success', title: 'Order placed successfully', message: `Order ${orderDetails.id} is confirmed.` })
  }

  function handlePaymentResult(success) {
    const order = pendingPayment
    setPendingPayment(null)
    if (!order) return
    if (!success) {
      notify({ type: 'error', title: 'Payment failed', message: 'No payment was taken. Your cart is unchanged; return to checkout to retry.' })
      return
    }
    placeOrder({
      ...order,
      paymentStatus: 'Paid (demo)',
      transactionId: `DEMO${Date.now().toString().slice(-8)}`,
    })
  }

  function signInAccount(email) {
    if (!customer?.email || customer.email.toLowerCase() !== email) return false
    setAccountSignedIn(true)
    notify({ type: 'success', title: 'Signed in', message: 'Your local demo account is ready.' })
    return true
  }

  function createAccount(profile) {
    setCustomer(profile)
    setAccountSignedIn(true)
    notify({ type: 'success', title: 'Demo account created', message: 'Your account is saved in this browser.' })
  }

  function signOutAccount() {
    setAccountSignedIn(false)
    notify({ type: 'success', title: 'Signed out', message: 'Your cart and order history are saved on this device.' })
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-blue-600" />
      <Navbar cartCount={cartCount} onCart={() => setCartOpen(true)} onSearch={searchProducts} onBrowse={browse} darkMode={darkMode} onToggleTheme={() => setDarkMode((current) => !current)} />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
          <Suspense fallback={null}>
            <Routes location={location}>
              <Route path="/" element={<HomePage products={visibleProducts} filters={filters} onBrowse={browse} onFilter={setFilters} onAdd={addToCart} />} />
              <Route path="/products/:productId" element={<ProductPage onAdd={addToCart} onBuyNow={(product, button, quantity) => { addToCart(product, button, quantity); navigate('/checkout') }} />} />
              <Route path="/checkout" element={<CheckoutPage items={cart} subtotal={subtotal} customer={customer} onPlaceOrder={placeOrder} onStartPayment={setPendingPayment} notify={notify} />} />
              <Route path="/account" element={<AccountPage cart={cart} orders={orders} customer={customer} signedIn={accountSignedIn} onSignOut={signOutAccount} onSignIn={signInAccount} onCreateAccount={createAccount} onQuantity={updateQuantity} onRemove={(id) => setCart((items) => items.filter((item) => item.product.id !== id))} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <FloatingWhatsApp />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        subtotal={subtotal}
        onQuantity={updateQuantity}
        onRemove={(id) => {
          const removed = cart.find((item) => item.product.id === id)
          setCart((items) => items.filter((item) => item.product.id !== id))
          if (removed) notify({ type: 'success', title: 'Removed from your cart', message: removed.product.name })
        }}
        onCheckout={() => { setCartOpen(false); navigate('/checkout') }}
      />
      <OrderConfirmation order={confirmation} onClose={() => setConfirmation(null)} onContinue={() => { setConfirmation(null); navigate('/#products') }} />
      <PaymentSimulator order={pendingPayment} onClose={() => setPendingPayment(null)} onResult={handlePaymentResult} />
      <ToastViewport toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((item) => item.id !== id))} />
      <AnimatePresence>
        {flight && <motion.img key={flight.id} src={`https://images.unsplash.com/${flight.image}?auto=format&fit=crop&w=120&q=70`} alt="" initial={{ position: 'fixed', left: flight.x, top: flight.y, x: '-50%', y: '-50%', width: 42, height: 42, opacity: 1, scale: 1, borderRadius: 12, zIndex: 80 }} animate={{ left: flight.endX, top: flight.endY, scale: 0.22, opacity: 0, rotate: 150 }} exit={{ opacity: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="pointer-events-none object-cover shadow-xl" />}
      </AnimatePresence>
      <AnimatePresence>{loading && <PageLoader />}</AnimatePresence>
    </div>
  )
}

export default function App() {
  return <BrowserRouter><StoreApp /></BrowserRouter>
}
