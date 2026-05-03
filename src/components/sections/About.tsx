'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCode, FaLightbulb, FaRocket, FaAward, FaServer, FaPaintBrush, FaLayerGroup } from 'react-icons/fa'

// Helper component for the Glassmorphic Bento Cards
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard = ({ children, className, delay = 0 }: BentoCardProps) => {
  return (
    <motion.div
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
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 dark:group-hover:from-violet-500/10 transition-all duration-500" />
      {children}
    </motion.div>
  )
}

// Background Neural Core Animation
const NeuralBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    {/* Tech Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
    
    {/* Animated Neural Orbs */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity:[0.1, 0.2, 0.1],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-violet-500/20 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{
        scale:[1, 1.5, 1],
        opacity:[0.1, 0.15, 0.1],
        x: [0, -40, 0],
        y:[0, 40, 0]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-[100px]"
    />
  </div>
)

const About = () => {
  const[ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const stats =[
    { icon: FaCode, value: '3+', label: 'Years Exp', color: 'text-blue-500' },
    { icon: FaLightbulb, value: '50+', label: 'Projects', color: 'text-amber-500' },
    { icon: FaRocket, value: '30+', label: 'Clients', color: 'text-emerald-500' },
    { icon: FaAward, value: '15+', label: 'Awards', color: 'text-violet-500' },
  ]

  const skills =[
    { icon: FaLayerGroup, name: 'Full-Stack Development' },
    { icon: FaPaintBrush, name: 'UI/UX Prototyping' },
    { icon: FaServer, name: 'Cloud & DevOps' },
  ]

  return (
    <section id="about" className="relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <NeuralBackground />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h2
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
            >
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Overview</span>
            </motion.h2>
            <motion.p 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              Initializing core profile and technical capabilities.
            </motion.p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Main Bio Card (Spans large area) */}
            <BentoCard className="md:col-span-4 lg:col-span-8 p-8 md:p-10" delay={0.1}>
              <div className="relative z-10 h-full flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 w-fit">
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wider">Active Status</span>
                </div>
                
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
                  Architecting digital experiences.
                </h3>
                
                <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
                  <p>
                    I'm a passionate developer with expertise in building scalable web applications 
                    and creating exceptional user experiences. With a strong foundation in both 
                    frontend and backend technologies, I bring ideas to life through clean, 
                    efficient code.
                  </p>
                  <p>
                    My journey in tech evolved into a career focused on innovation and continuous learning. 
                    I thrive in collaborative environments and enjoy tackling challenging problems 
                    that require creative, neural-level solutions.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Core Skills Card */}
            <BentoCard className="md:col-span-4 lg:col-span-4 p-8" delay={0.2}>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <FaCode className="mr-3 text-cyan-500" /> Core Competencies
              </h3>
              
              <div className="space-y-4 relative">
                {/* Connecting neural line */}
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/50 to-transparent" />
                
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4 relative z-10"
                  >
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-200 font-medium">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Tech Pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node', 'TypeScript', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-full text-neutral-600 dark:text-neutral-400">
                    {tech}
                  </span>
                ))}
              </div>
            </BentoCard>

            {/* Stats Cards (4 small cards at the bottom) */}
            {stats.map((stat, index) => (
              <BentoCard 
                key={stat.label} 
                className="md:col-span-2 lg:col-span-3 p-6 flex flex-col items-center justify-center text-center" 
                delay={0.3 + (index * 0.1)}
              >
                <div className={`p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/50 mb-4 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h4 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-1">
                  {stat.value}
                </h4>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </BentoCard>
            ))}

          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About