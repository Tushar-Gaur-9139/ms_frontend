import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '', children }) {
  const centered = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className={`${centered ? 'mx-auto text-center' : ''} ${description && !centered ? 'flex flex-col justify-between gap-4 sm:flex-row sm:items-end' : ''} ${centered ? 'mb-10 max-w-[600px]' : 'mb-8 sm:mb-10'} ${className}`}
    >
      <div>
        <p className="text-[10px] font-bold tracking-[0.18em] text-blue-600">{eyebrow}</p>
        <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.045em] text-[#0f172a] sm:text-[38px]">{title}</h2>
        {description && centered && <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>}
      </div>
      {description && !centered && <p className="max-w-[330px] text-sm leading-6 text-slate-500">{description}</p>}
      {children}
    </motion.div>
  )
}
