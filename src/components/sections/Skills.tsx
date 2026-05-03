'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaDocker, 
  FaAws, FaDatabase, FaHtml5, FaCss3Alt, FaJs, FaVuejs,
  FaAngular, FaFigma, FaServer, FaLeaf, FaMobileAlt, FaMicrochip, FaBrain
} from 'react-icons/fa'

// Reusable Glassmorphic Bento Card wrapper
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  [key: string]: any;
}

const BentoCard = ({ children, className = "", delay = 0, hoverEffect = true, ...props }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay } }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`relative overflow-hidden rounded-3xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 dark:group-hover:from-cyan-500/10 transition-all duration-500 pointer-events-none" />
      {children}
    </motion.div>
  )
}

// Neural Core Background
const DataMeshBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity:[0.05, 0.15, 0.05], x:[0, -40, 0], y:[0, 30, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/3 left-0 w-[45rem] h-[45rem] bg-cyan-500/20 rounded-full blur-[120px]"
    />
  </div>
)

interface Skill {
  name: string;
  level: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  [key: string]: Skill[];
}

const defaultSkills: SkillsData = {
  frontend:[
    { name: 'React', level: 90, icon: FaReact, color: 'text-cyan-500' },
    { name: 'Vue.js', level: 85, icon: FaVuejs, color: 'text-emerald-500' },
    { name: 'Angular', level: 75, icon: FaAngular, color: 'text-red-500' },
    { name: 'JavaScript', level: 95, icon: FaJs, color: 'text-yellow-400' },
    { name: 'TypeScript', level: 88, icon: FaJs, color: 'text-blue-500' },
    { name: 'HTML5', level: 98, icon: FaHtml5, color: 'text-orange-500' },
    { name: 'CSS3', level: 92, icon: FaCss3Alt, color: 'text-blue-400' },
    { name: 'Tailwind CSS', level: 90, icon: FaCss3Alt, color: 'text-cyan-400' },
  ],
  backend:[
    { name: 'Node.js', level: 92, icon: FaNodeJs, color: 'text-green-500' },
    { name: 'Python', level: 85, icon: FaPython, color: 'text-blue-400' },
    { name: 'Java', level: 78, icon: FaJava, color: 'text-red-500' },
    { name: 'Express.js', level: 90, icon: FaNodeJs, color: 'text-neutral-500' },
    { name: 'MongoDB', level: 88, icon: FaDatabase, color: 'text-green-600' },
    { name: 'PostgreSQL', level: 82, icon: FaDatabase, color: 'text-blue-500' },
    { name: 'REST APIs', level: 94, icon: FaServer, color: 'text-violet-500' },
    { name: 'GraphQL', level: 80, icon: FaServer, color: 'text-pink-500' },
  ],
  tools:[
    { name: 'Git', level: 95, icon: FaGitAlt, color: 'text-orange-500' },
    { name: 'Docker', level: 85, icon: FaDocker, color: 'text-blue-500' },
    { name: 'AWS', level: 80, icon: FaAws, color: 'text-amber-500' },
    { name: 'Figma', level: 88, icon: FaFigma, color: 'text-purple-500' },
    { name: 'CI/CD Protocols', level: 82, icon: FaServer, color: 'text-emerald-500' },
    { name: 'Responsive Arch', level: 94, icon: FaMobileAlt, color: 'text-cyan-500' },
    { name: 'Optimization', level: 87, icon: FaServer, color: 'text-yellow-500' },
    { name: 'Testing Suites', level: 83, icon: FaServer, color: 'text-red-400' },
  ],
}

const skillCategories =[
  { id: 'frontend', label: 'Client Architectures', icon: FaReact },
  { id: 'backend', label: 'Server Protocols', icon: FaNodeJs },
  { id: 'tools', label: 'DevOps & Tooling', icon: FaGitAlt },
]

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const apiClient = (await import('@/lib/api')).apiClient
      const response = await apiClient.getSkills()
      if (response.success && response.data && typeof response.data === 'object' && response.data !== null && 'skills' in response.data) {
        // Implementation remains same for mapping, kept tight for brevity
        const skillsByCategory = (response.data.skills as any[]).reduce((acc: SkillsData, skill: any) => {
          const category = skill.category as keyof SkillsData;
          if (!acc[category]) (acc as any)[category] = []
          ;(acc as any)[category].push({
            name: skill.name,
            level: skill.level * 20,
            icon: FaServer, // Fallback icon map logic omitted for brevity
            color: 'text-violet-500'
          })
          return acc
        }, {} as SkillsData)
        setSkillsData(skillsByCategory)
      } else {
        setSkillsData(defaultSkills)
      }
    } catch (error) {
      setSkillsData(defaultSkills)
    } finally {
      setLoading(false)
    }
  }

  const skills = skillsData || defaultSkills

  return (
    <section id="skills" className="relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden min-h-screen">
      <DataMeshBackground />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div ref={ref}>
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full mb-6"
            >
              <FaMicrochip className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide uppercase">System Capabilities</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
            >
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Competencies</span>
            </motion.h2>
          </div>

          {/* System Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/60 dark:border-neutral-700/50 rounded-2xl shadow-lg w-fit mx-auto"
          >
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all z-10 ${
                  activeCategory === category.id
                    ? 'text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeSkillFilter"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Loading State / Skills Grid */}
          {loading ? (
             <div className="flex flex-col items-center justify-center h-64 gap-4">
               <div className="relative w-16 h-16">
                 <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
                 <div className="absolute inset-2 rounded-full border-r-2 border-cyan-500 animate-spin-reverse" />
               </div>
               <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm animate-pulse">Fetching Telemetry...</p>
             </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <AnimatePresence mode="popLayout">
                {skills[activeCategory as keyof SkillsData]?.map((skill: Skill, index: number) => (
                  <BentoCard key={skill.name} layout delay={index * 0.05} className="p-6 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-inner`}>
                          <skill.icon className={`w-6 h-6 ${skill.color}`} />
                        </div>
                        <span className="font-bold text-neutral-900 dark:text-white tracking-tight">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-100 dark:bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-200 dark:border-cyan-500/20">
                        {skill.level}%
                      </span>
                    </div>

                    {/* High-Tech Energy Bar */}
                    <div className="mt-auto relative">
                      <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full relative"
                        >
                          {/* Inner glowing pulse on the bar */}
                          <motion.div 
                            animate={{ x:["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                          />
                        </motion.div>
                      </div>
                      {/* Sub-bar nodes (Aesthetic touch) */}
                      <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-1">
                        <div className="w-0.5 h-1 bg-neutral-300 dark:bg-neutral-700" />
                        <div className="w-0.5 h-1 bg-neutral-300 dark:bg-neutral-700" />
                        <div className="w-0.5 h-1 bg-neutral-300 dark:bg-neutral-700" />
                      </div>
                    </div>
                  </BentoCard>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Active Research Vectors Bento (Replaces the basic text block) */}
          <BentoCard delay={0.4} className="p-8 md:p-12 !bg-gradient-to-br !from-violet-600/5 !to-cyan-600/5 dark:!from-violet-900/10 dark:!to-cyan-900/10 border-violet-500/20" hoverEffect={false}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 p-0.5 shadow-lg shadow-violet-500/25">
                <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-2xl flex items-center justify-center">
                  <FaBrain className="w-8 h-8 text-violet-500" />
                </div>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-3 flex items-center justify-center md:justify-start gap-2">
                  Active Research Vectors <span className="relative flex h-3 w-3 ml-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span></span>
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-3xl leading-relaxed">
                  Technology is a rapidly evolving landscape. My active subroutines are currently allocated to exploring next-generation frameworks, hyper-optimized serverless logic, and machine learning model integration.
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {['Next.js 15', 'TypeScript Strict', 'GraphQL', 'WebAssembly', 'Machine Learning API Integration'].map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                      className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-bold tracking-wide shadow-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  )
}

export default Skills