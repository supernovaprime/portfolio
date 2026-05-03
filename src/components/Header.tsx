'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaTerminal } from 'react-icons/fa'
import Image from 'next/image'
import ProfileImage from '../components/profile.png' // Adjust path as necessary

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const[activeSection, setActiveSection] = useState('home')

  const sections =['home', 'about', 'velvron-labs', 'projects', 'skills', 'contact']

  // Tech-oriented navigation labels matching our new system aesthetic
  const navLinks =[
    { id: 'home', index: '00', label: 'Root' },
    { id: 'about', index: '01', label: 'System' },
    { id: 'velvron-labs', index: '02', label: 'Labs' },
    { id: 'projects', index: '03', label: 'Deployments' },
    { id: 'skills', index: '04', label: 'Telemetry' },
    { id: 'contact', index: '05', label: 'Uplink' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if the section is in the upper half of the viewport
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Offset for the floating header
      const offsetTop = element.offsetTop - 100
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 pt-6 pointer-events-none flex justify-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Floating Glassmorphic Container (Dynamic Island style) */}
      <motion.div
        animate={{ 
          borderRadius: isMobileMenuOpen ? "24px" : "9999px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`pointer-events-auto w-full max-w-6xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/60 dark:border-neutral-700/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all overflow-hidden ${
          isScrolled ? 'py-2 px-3 shadow-xl' : 'py-3 px-4 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between relative z-20">
          
          {/* Logo / System Status */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer group px-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('home')}
          >
            <div className="relative">
              <Image 
                src={ProfileImage} 
                alt="System Administrator" 
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-800 shadow-sm z-10 relative"
              />
              {/* Spinning tech border on hover */}
              <div className="absolute inset-[-4px] rounded-full border border-dashed border-violet-500/0 group-hover:border-violet-500/50 animate-[spin_4s_linear_infinite]" />
              
              {/* Online Indicator */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-500 border-2 border-white dark:border-neutral-900 rounded-full z-20">
                <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-75" />
              </span>
            </div>
            
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-sm text-neutral-900 dark:text-white leading-tight tracking-tight">
                Supernovaprime
              </span>
              <span className="text-[10px] font-mono text-violet-600 dark:text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <FaTerminal className="w-2 h-2" /> Sys.Admin Online
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-5 py-2.5 text-sm font-bold transition-colors group z-10 ${
                    isActive 
                      ? 'text-white dark:text-white' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {/* Sliding Active Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full -z-10 shadow-md"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  
                  <span className="flex items-center gap-2">
                    <span className={`font-mono text-[10px] ${isActive ? 'text-cyan-200' : 'text-violet-500/50 dark:text-cyan-500/50'}`}>
                      {link.index}.
                    </span>
                    {link.label}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Init Action Button & Mobile Toggle */}
          <div className="flex items-center space-x-3 pr-1">
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-bold rounded-full hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Init Uplink
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 relative z-20 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              {isMobileMenuOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Morphing Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden relative z-10"
            >
              <div className="px-4 py-6 mt-2 space-y-1 border-t border-neutral-200/50 dark:border-neutral-700/50">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.id
                  return (
                    <motion.button
                      key={link.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollToSection(link.id)}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-violet-700 dark:text-cyan-400 border border-violet-500/20'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-50">{link.index}.</span>
                        {link.label}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      )}
                    </motion.button>
                  )
                })}
                
                {/* Mobile Extra CTA */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4 mt-4 border-t border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 flex justify-center items-center gap-2"
                  >
                    <FaTerminal className="w-4 h-4" />
                    Initialize Remote Uplink
                  </button>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}

export default Header