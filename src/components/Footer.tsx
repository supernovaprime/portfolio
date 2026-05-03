'use client'

import { motion } from 'framer-motion'
import { 
  FaArrowUp, FaHeart, FaCoffee, FaRocket, FaMicrochip 
} from 'react-icons/fa'
import Image from 'next/image'
import Logo from './logo.svg'

// Footer specific neural background (Anchored to the bottom)
const FooterMeshBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)][mask-image:linear-gradient(to_bottom,transparent,black)]" />
    <motion.div
      animate={{ scale:[1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-[20rem] left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-violet-600/20 rounded-full blur-[150px]"
    />
  </div>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-20 pb-10 bg-neutral-50 dark:bg-neutral-950 overflow-hidden border-t border-neutral-200 dark:border-neutral-800/50">
      <FooterMeshBackground />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Main Glassmorphic Footer Console */}
          <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              
              {/* Left Side: System Identity */}
              <div className="text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center gap-3 text-2xl font-black mb-4 group cursor-default"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative w-10 h-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-inner group-hover:border-violet-500 transition-colors">
                    {/* Fallback icon if logo.svg fails, otherwise Image renders */}
                    <FaMicrochip className="absolute w-5 h-5 text-violet-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <Image 
                      src={Logo} 
                      alt="Supernovaprime System" 
                      width={40}
                      height={40}
                      className="w-full h-full object-cover relative z-10"
                    />
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 tracking-tight">
                    Supernovaprime
                  </span>
                </motion.div>
                
                <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto lg:mx-0 leading-relaxed text-sm font-medium">
                  Architecting high-performance digital environments with precision telemetry. Always ready for the next deployment phase.
                </p>
              </div>

              {/* Center: System Telemetry Badges */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {[
                  { icon: FaHeart, label: 'Compiled with precision', color: 'text-pink-500' },
                  { icon: FaCoffee, label: 'Fueled by caffeine', color: 'text-amber-500' },
                  { icon: FaRocket, label: 'Deployment ready', color: 'text-cyan-500' }
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2.5 px-4 py-2 bg-white/50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700/50 shadow-sm"
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <badge.icon className={`w-4 h-4 ${badge.color}`} />
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: Return to Top HUD Button */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group relative flex flex-col items-center justify-center w-20 h-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 transition-colors" />
                <FaArrowUp className="w-6 h-6 text-neutral-400 group-hover:text-cyan-400 group-hover:-translate-y-1 transition-all duration-300 mb-1" />
                <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                  Root
                </span>
              </motion.button>

            </div>

            {/* Bottom Copyright Console Line */}
            <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800/50 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
              <p className="text-neutral-500 dark:text-neutral-400 text-xs font-bold tracking-wider uppercase">
                © {currentYear} System Node: Supernovaprime. All execution rights reserved.
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs font-medium">
                Engineered with Next.js & Tailwind CSS. Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500 font-bold">Neural Magic</span>.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer