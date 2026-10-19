import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'

const message = encodeURIComponent('Hi M.S. Enterprises, I need help with an order or product.')
const whatsappUrl = `https://wa.me/918920091473?text=${message}`

export default function FloatingWhatsApp() {
  return <motion.a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with M.S. Enterprises on WhatsApp"
    title="Chat with us on WhatsApp"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.08, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 360, damping: 20 }}
    className="group fixed bottom-5 right-5 z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_-10px_rgba(37,211,102,0.8)] ring-4 ring-white/80 transition-colors hover:bg-[#1fbd5b] sm:bottom-7 sm:right-7"
  >
    <MessageCircle size={28} strokeWidth={2.4} />
    <Phone size={13} strokeWidth={3} className="absolute left-[21px] top-[21px] -rotate-[35deg]" />
    <span className="absolute right-[68px] whitespace-nowrap rounded-lg bg-[#0f172a] px-3 py-2 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">Chat with us</span>
  </motion.a>
}
