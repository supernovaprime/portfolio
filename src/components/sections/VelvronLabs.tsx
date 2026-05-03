'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaGithub, FaExternalLinkAlt, FaMapMarkerAlt, FaEnvelope, FaPhone,
  FaCode, FaServer, FaPalette, FaGlobe, FaMobile, FaBrain, FaCube,
  FaAward, FaRocket, FaNetworkWired, FaTerminal
} from 'react-icons/fa'
import { velvronLabsData } from '@/data/velvronLabsData'

// Reusable Glassmorphic Bento Card (Maintains uniform design language)
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

const BentoCard = ({ children, className = "", delay = 0, hoverEffect = true }: BentoCardProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { type: "spring", stiffness: 100, damping: 20, delay } 
        }
      }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`relative overflow-hidden rounded-3xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 dark:group-hover:from-cyan-500/10 transition-all duration-500 pointer-events-none" />
      {children}
    </motion.div>
  )
}

// Subtle Neural Mesh Background
const DataMeshBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
    
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity:[0.05, 0.15, 0.05], x:[0, -30, 0], y:[0, 40, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/3 left-0 w-[50rem] h-[50rem] bg-indigo-500/20 rounded-full blur-[120px]"
    />
  </div>
)

const VelvronLabs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const iconMap: { [key: string]: React.ReactNode } = {
    'FaCode': <FaCode className="w-6 h-6" />,
    'FaServer': <FaServer className="w-6 h-6" />,
    'FaPalette': <FaPalette className="w-6 h-6" />,
    'FaGlobe': <FaGlobe className="w-6 h-6" />,
    'FaMobile': <FaMobile className="w-6 h-6" />,
    'FaBrain': <FaBrain className="w-6 h-6" />,
    'FaCube': <FaCube className="w-6 h-6" />
  }

  return (
    <section id="velvron-labs" className="relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <DataMeshBackground />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full mb-6"
          >
            <FaNetworkWired className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide uppercase">Partner Hub / Enterprise</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
          >
            System Node: <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">{velvronLabsData.company.name}</span>
          </motion.h2>
        </div>

        {/* Tier 1: Company Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* Main Mission Card */}
          <BentoCard className="md:col-span-12 lg:col-span-8 p-8 md:p-10" delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl text-violet-600 dark:text-violet-400">
                <FaAward className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{velvronLabsData.company.tagline}</h3>
              </div>
            </div>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed border-l-2 border-violet-500/30 pl-4">
              {velvronLabsData.company.mission}
            </p>
          </BentoCard>

          {/* Telemetry/Stats Card */}
          <BentoCard className="md:col-span-12 lg:col-span-4 p-8 flex flex-col justify-center gap-6" delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <span className="font-bold">EST</span>
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium uppercase">Founded</p>
                <p className="text-lg font-bold text-neutral-900 dark:text-white">{velvronLabsData.company.founded}</p>
              </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-neutral-200 via-neutral-200 to-transparent dark:from-neutral-800 dark:via-neutral-800" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
                <FaMapMarkerAlt className="w-5 h-5 text-violet-500" />
                <span className="text-sm font-medium">{velvronLabsData.company.location}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
                <FaEnvelope className="w-5 h-5 text-violet-500" />
                <span className="text-sm font-medium">{velvronLabsData.company.email}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
                <FaPhone className="w-5 h-5 text-violet-500" />
                <span className="text-sm font-medium">{velvronLabsData.company.phone}</span>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Tier 2: My Role Integration (Full Width Highlight) */}
        <BentoCard className="mb-16 p-8 md:p-12 !bg-gradient-to-br !from-violet-600/10 !to-cyan-600/10 dark:!from-violet-900/20 dark:!to-cyan-900/20 border-violet-500/20" delay={0.3} hoverEffect={false}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-500/20 text-violet-700 dark:text-violet-300 mb-4 border border-violet-500/30">
                <FaTerminal className="w-3 h-3" />
                <span className="text-xs font-bold uppercase tracking-wider">Role Designation</span>
              </div>
              <h3 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">
                {velvronLabsData.memberRole.title}
              </h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                {velvronLabsData.memberRole.description}
              </p>
              
              <div className="space-y-4 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500 via-cyan-500 to-transparent opacity-50" />
                {velvronLabsData.memberRole.contributions.map((contribution, index) => (
                  <div key={index} className="flex items-start gap-4 relative z-10">
                    <div className="w-6 h-6 mt-1 rounded-full bg-white dark:bg-neutral-800 border-2 border-violet-500 flex items-center justify-center shrink-0 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-200 font-medium pt-1">{contribution}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <a
                href={velvronLabsData.company.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-700 transition-all hover:-translate-y-1"
              >
                <FaGithub className="w-5 h-5 text-violet-500" />
                <span>Access Repository</span>
              </a>
              <a
                href={velvronLabsData.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-1"
              >
                <FaExternalLinkAlt className="w-5 h-5" />
                <span>Initialize Uplink</span>
              </a>
            </div>
          </div>
        </BentoCard>

        {/* Tier 3: Core Services Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-violet-500 rounded-full"></span> Core Protocols
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {velvronLabsData.services.map((service, index) => (
              <BentoCard key={index} delay={0.1 * index} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl text-cyan-600 dark:text-cyan-400 shadow-inner">
                    {iconMap[service.icon]}
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {service.title}
                  </h4>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* Tier 4: Featured Architectures (Projects) */}
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> Featured Architectures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {velvronLabsData.projects.map((project, index) => (
              <BentoCard key={index} delay={0.2 * index} className="p-8 flex flex-col h-full">
                <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                  {project.name}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 rounded-md text-xs font-bold tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Source Code</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors ml-4"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Deployment</span>
                    </a>
                  )}
                </div>
              </BentoCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default VelvronLabs