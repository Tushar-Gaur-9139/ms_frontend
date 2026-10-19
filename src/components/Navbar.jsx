import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronRight, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, products } from '../data/products'

function getParts(brand, appliance) {
  return [...new Set(products
    .filter((product) => product.brand === brand && product.appliance === appliance)
    .map((product) => product.partCategory))]
}

const links = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

export default function Navbar({ cartCount, onCart, onSearch, onBrowse, darkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeBrand, setActiveBrand] = useState(categories[0])
  const [activeAppliance, setActiveAppliance] = useState(null)
  const [mobileBrand, setMobileBrand] = useState(null)
  const [mobileAppliance, setMobileAppliance] = useState(null)

  function updateSearch(value) {
    setSearchValue(value)
    onSearch(value)
  }

  function selectProducts(filters) {
    onBrowse(filters)
    setProductsOpen(false)
    setMenuOpen(false)
    setMobileBrand(null)
    setMobileAppliance(null)
  }

  function showProductMenu() {
    setProductsOpen(true)
    setActiveBrand((brand) => brand ?? categories[0])
    setActiveAppliance(null)
  }

  return (
    <>
      <div className="bg-[#0f172a] px-4 py-2 text-center text-[10px] font-semibold tracking-[0.16em] text-white sm:text-[11px]">
        GENUINE PARTS <span className="mx-2 text-blue-300">✳</span> SECURE CHECKOUT <span className="mx-2 text-blue-300">✳</span> PAN-INDIA DELIVERY
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
          <Link to="/#home" className="group flex shrink-0 items-center gap-2.5" aria-label="M.S. Enterprises home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0f172a] text-sm font-black tracking-tight text-white shadow-sm transition duration-300 group-hover:-rotate-6 group-hover:shadow-lg">
              M<span className="text-blue-400">.</span>
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-extrabold tracking-[0.12em] text-slate-900">M.S</span>
              <span className="block text-[9px] font-semibold tracking-[0.22em] text-slate-500">ENTERPRISES</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link to="/#home" className="text-[13px] font-medium text-slate-600 transition-colors hover:text-blue-600">Home</Link>
            <div className="relative py-5" onMouseEnter={showProductMenu} onMouseLeave={() => setProductsOpen(false)}>
              <button onClick={() => productsOpen ? setProductsOpen(false) : showProductMenu()} aria-expanded={productsOpen} className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${productsOpen ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                Products <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {productsOpen && <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }} transition={{ duration: 0.16 }} className="absolute left-1/2 top-[62px] z-50 w-[710px] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_70px_-20px_rgba(15,23,42,0.3)]">
                  <div className="grid min-h-[310px] grid-cols-[0.85fr_1fr_1.2fr] divide-x divide-slate-100">
                    <div className="bg-slate-50/70 p-4">
                      <p className="mb-3 px-2 text-[9px] font-bold tracking-[0.16em] text-slate-400">SHOP BY BRAND</p>
                      {categories.map((brand) => <button key={brand.name} onMouseEnter={() => { setActiveBrand(brand); setActiveAppliance(null) }} onFocus={() => { setActiveBrand(brand); setActiveAppliance(null) }} onClick={() => selectProducts({ brand: brand.name })} className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-left text-xs font-semibold transition ${activeBrand.name === brand.name ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}>{brand.name}<ChevronRight size={14} className={activeBrand.name === brand.name ? 'text-blue-500' : 'text-slate-300'} /></button>)}
                    </div>
                    <div className="p-4">
                      <p className="mb-3 px-2 text-[9px] font-bold tracking-[0.16em] text-slate-400">CHOOSE APPLIANCE</p>
                      {activeBrand.appliances.map((appliance) => <button key={appliance.name} onMouseEnter={() => setActiveAppliance(appliance)} onFocus={() => setActiveAppliance(appliance)} onClick={() => selectProducts({ brand: activeBrand.name, appliance: appliance.name })} className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-left text-xs font-medium transition ${activeAppliance?.name === appliance.name ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>{appliance.name}<ChevronRight size={14} className="text-slate-300" /></button>)}
                      <button onClick={() => selectProducts({ brand: activeBrand.name })} className="mt-3 px-2.5 py-2 text-[10px] font-semibold text-blue-600 hover:text-blue-800">View all {activeBrand.name} parts <ArrowRight size={12} className="ml-1 inline" /></button>
                    </div>
                    <div className="bg-[#fbfcfe] p-4">
                      <p className="mb-3 px-2 text-[9px] font-bold tracking-[0.16em] text-slate-400">{activeAppliance ? `${activeAppliance.name.toUpperCase()} PARTS` : 'PART CATEGORIES'}</p>
                      {activeAppliance ? getParts(activeBrand.name, activeAppliance.name).map((part) => <button key={part} onClick={() => selectProducts({ brand: activeBrand.name, appliance: activeAppliance.name, part })} className="group flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-left text-xs text-slate-600 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">{part}<ArrowRight size={13} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" /></button>) : <p className="rounded-xl bg-white p-3 text-[11px] leading-5 text-slate-500">Choose an appliance to see the parts available for {activeBrand.name}.</p>}
                      <div className="mt-4 rounded-xl bg-blue-50/80 p-3"><p className="text-[10px] font-semibold text-slate-800">Need help finding a part?</p><Link to="/#contact" onClick={() => setProductsOpen(false)} className="mt-1 inline-block text-[10px] font-medium text-blue-600 hover:text-blue-800">Talk to our team <ArrowRight size={11} className="ml-1 inline" /></Link></div>
                    </div>
                  </div>
                </motion.div>}
              </AnimatePresence>
            </div>
            {links.slice(1).map(([label, href]) => <Link key={label} to={`/${href}`} className="text-[13px] font-medium text-slate-600 transition-colors hover:text-blue-600">{label}</Link>)}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <label className="relative flex h-10 w-[190px] items-center gap-2 rounded-xl bg-slate-100 px-3 transition-all focus-within:w-[230px] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 lg:w-[210px]">
              <Search size={15} className="shrink-0 text-slate-400" />
              <input value={searchValue} onChange={(event) => updateSearch(event.target.value)} placeholder="Search parts..." className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400" aria-label="Search products" />
              <kbd className="hidden rounded border border-slate-200 px-1 text-[9px] text-slate-400 lg:inline">⌘ K</kbd>
            </label>
            <button data-cart-target onClick={onCart} className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100" aria-label={`Open cart with ${cartCount} items`}>
              <ShoppingBag size={19} strokeWidth={1.7} />
              <AnimatePresence>
                {cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0.4 }} className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">{cartCount}</motion.span>}
              </AnimatePresence>
            </button>
            <Link to="/account" aria-label="Customer account and order tracking" title="My account and orders" className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"><UserRound size={18} /></Link>
            <button onClick={onToggleTheme} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`} title={`Switch to ${darkMode ? 'light' : 'dark'} mode`} className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-700">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button onClick={() => setSearchOpen(!searchOpen)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-700" aria-label="Search"><Search size={19} /></button>
            <button data-cart-target onClick={onCart} className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-700" aria-label={`Open cart with ${cartCount} items`}>
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">{cartCount}</span>}
            </button>
            <Link to="/account" aria-label="Customer account and order tracking" className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"><UserRound size={18} /></Link>
            <button onClick={onToggleTheme} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`} className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-700">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-700" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-100 px-5 md:hidden">
            <label className="flex h-12 items-center gap-3"><Search size={17} className="text-slate-400" /><input autoFocus value={searchValue} onChange={(event) => updateSearch(event.target.value)} placeholder="Search products..." className="w-full bg-transparent text-sm outline-none" /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18} /></button></label>
          </motion.div>}
          {menuOpen && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="max-h-[75vh] overflow-y-auto border-t border-slate-100 bg-white px-5 pb-5 lg:hidden">
            <div className="border-b border-slate-100">
              <button onClick={() => { setMobileBrand(null); setMobileAppliance(null); setProductsOpen(!productsOpen) }} className="flex w-full items-center justify-between py-3.5 text-sm font-semibold text-slate-800">Shop products <ChevronDown size={16} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} /></button>
              <AnimatePresence>
                {productsOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pb-3">
                  {!mobileBrand && categories.map((brand) => <button key={brand.name} onClick={() => { setMobileBrand(brand); setMobileAppliance(null) }} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-xs font-medium text-slate-600 hover:bg-slate-50">{brand.name}<ChevronRight size={14} /></button>)}
                  {mobileBrand && !mobileAppliance && <><button onClick={() => setMobileBrand(null)} className="px-3 py-2 text-[10px] font-semibold text-blue-600">← All brands</button><p className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400">{mobileBrand.name.toUpperCase()} · APPLIANCES</p>{mobileBrand.appliances.map((appliance) => <button key={appliance.name} onClick={() => setMobileAppliance(appliance)} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-xs font-medium text-slate-600 hover:bg-slate-50">{appliance.name}<ChevronRight size={14} /></button>)}<button onClick={() => selectProducts({ brand: mobileBrand.name })} className="mx-3 mt-2 text-xs font-semibold text-blue-600">All {mobileBrand.name} parts <ArrowRight size={12} className="ml-1 inline" /></button></>}
                  {mobileBrand && mobileAppliance && <><button onClick={() => setMobileAppliance(null)} className="px-3 py-2 text-[10px] font-semibold text-blue-600">← {mobileBrand.name} appliances</button><p className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400">{mobileAppliance.name.toUpperCase()} · PARTS</p>{getParts(mobileBrand.name, mobileAppliance.name).map((part) => <button key={part} onClick={() => selectProducts({ brand: mobileBrand.name, appliance: mobileAppliance.name, part })} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-xs font-medium text-slate-600 hover:bg-slate-50">{part}<ArrowRight size={13} /></button>)}</>}
                </motion.div>}
              </AnimatePresence>
            </div>
            {links.map(([label, href], index) => <motion.div key={label} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.035 }}><Link to={`/${href}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm font-medium text-slate-700">{label}<ChevronRight size={15} className="text-slate-400" /></Link></motion.div>)}
          </motion.nav>}
        </AnimatePresence>
      </header>
    </>
  )
}
