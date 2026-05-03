'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaMapMarkerAlt, FaTerminal } from 'react-icons/fa'
import Image from 'next/image'
import LogoImage from '../Logo.png'

// Reusable Glassmorphic Bento Card (Uniform with About section)
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard = ({ children, className, delay = 0 }: BentoCardProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { type: "spring", stiffness: 100, damping: 20, delay } 
        }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-3xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 dark:group-hover:from-cyan-500/10 transition-all duration-500" />
      {children}
    </motion.div>
  )
}

// Neural Core Background
const NeuralBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
    
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity:[0.1, 0.25, 0.1], x:[0, 50, 0], y: [0, -30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-violet-500/20 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ scale:[1, 1.5, 1], opacity:[0.1, 0.2, 0.1], x: [0, -40, 0], y:[0, 40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 left-1/4 w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-[100px]"
    />
  </div>
)

const Hero = () => {
  const socialLinks =[
    { icon: FaGithub, href: 'https://github.com/supernovaprime', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/supernovaprime', label: 'Twitter' }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <NeuralBackground />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(140px,auto)]">
          
          {/* Main Intro Card */}
          <BentoCard className="md:col-span-12 lg:col-span-8 p-8 md:p-12 flex flex-col justify-center" delay={0.1}>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
                System Online
              </span>
            </div>

            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white mb-4 tracking-tight"
            >
              Hi, I'm <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">
                Supernovaprime
              </span>
            </motion.h1>
            
            <h2 className="text-xl md:text-2xl font-semibold text-neutral-600 dark:text-neutral-400 mb-6 flex items-center gap-3">
              <FaTerminal className="text-violet-500" /> Full Stack Developer
            </h2>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Passionate about creating beautiful, functional web applications that solve real-world problems. 
              Specializing in React, Next.js, and modern high-performance web technologies.
            </p>
          </BentoCard>

          {/* Profile Image Card */}
          <BentoCard className="md:col-span-6 lg:col-span-4 p-6 flex items-center justify-center relative" delay={0.2}>
            {/* Rotating Tech Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-dashed border-violet-500/30 dark:border-cyan-500/30"
            />
            
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/50 dark:border-neutral-800/50 shadow-2xl z-10 group">
              <Image
                src={LogoImage}
                alt="Supernovaprime Logo"
                width={320}
                height={320}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-violet-500/10 mix-blend-overlay" />
            </div>
          </BentoCard>

          {/* Actions / Buttons Bento */}
          <BentoCard className="md:col-span-6 lg:col-span-5 p-8 flex flex-col sm:flex-row items-center justify-center gap-4" delay={0.3}>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Initialize Contact
            </motion.button>
            
            <motion.a
              href="/resume.pdf"
              download
              className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-white rounded-xl font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload className="text-violet-500" />
              Fetch Resume
            </motion.a>
          </BentoCard>

          {/* Social Links Bento */}
          <BentoCard className="md:col-span-6 lg:col-span-4 p-8 flex items-center justify-center gap-6" delay={0.4}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-4 bg-white/60 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all text-neutral-600 dark:text-neutral-300 hover:text-violet-600 dark:hover:text-cyan-400 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
              </motion.a>
            ))}
          </BentoCard>

          {/* Location / Status Info Bento */}
          <BentoCard className="md:col-span-6 lg:col-span-3 p-8 flex flex-col items-center justify-center text-center" delay={0.5}>
            <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-3">
              <FaMapMarkerAlt className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-neutral-900 dark:text-white font-bold">Earth Base</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Available globally</p>
          </BentoCard>

        </div>
      </div>
    </section>
  )
}

export default Hero