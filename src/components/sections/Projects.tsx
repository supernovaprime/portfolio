'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaExternalLinkAlt, FaGithub, FaLayerGroup, FaNetworkWired } from 'react-icons/fa'

// Reusable Glassmorphic Bento Card wrapper (Extended to accept layout props for filtering)
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
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
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
      animate={{ scale: [1, 1.2, 1], opacity:[0.05, 0.15, 0.05], x:[0, 50, 0], y:[0, -40, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 right-0 w-[40rem] h-[40rem] bg-violet-500/20 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity:[0.05, 0.1, 0.05], x:[0, -40, 0], y:[0, 40, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-0 left-1/4 w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-[100px]"
    />
  </div>
)

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const defaultProjects: Project[] = [
  { id: 1, title: 'E-Commerce Platform', description: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and responsive design.', image: '', technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'], category: 'full-stack', liveUrl: '#', githubUrl: '#', featured: true },
  { id: 2, title: 'Task Management App', description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.', image: '', technologies:['Vue.js', 'Firebase', 'Vuex', 'Vuetify'], category: 'frontend', liveUrl: '#', githubUrl: '#', featured: true },
  { id: 3, title: 'Weather Dashboard', description: 'A beautiful weather dashboard with location-based forecasts, interactive charts, and severe weather alerts.', image: '', technologies:['JavaScript', 'Chart.js', 'Weather API', 'CSS3'], category: 'frontend', liveUrl: '#', githubUrl: '#', featured: false },
  { id: 4, title: 'Blog Platform', description: 'A modern blogging platform with markdown support, SEO optimization, and social sharing features.', image: '', technologies:['Next.js', 'TypeScript', 'MDX', 'Tailwind'], category: 'full-stack', liveUrl: '#', githubUrl: '#', featured: false },
  { id: 5, title: 'API Gateway Service', description: 'A microservices API gateway with authentication, rate limiting, and request routing capabilities.', image: '', technologies:['Node.js', 'Express', 'Redis', 'Docker'], category: 'backend', liveUrl: '#', githubUrl: '#', featured: false },
  { id: 6, title: 'Mobile Banking App', description: 'A secure mobile banking application with biometric authentication and real-time transaction processing.', image: '', technologies:['React Native', 'TypeScript', 'Node.js', 'PostgreSQL'], category: 'mobile', liveUrl: '#', githubUrl: '#', featured: true },
]

const categories =[
  { id: 'all', label: 'All Modules' },
  { id: 'full-stack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend UI' },
  { id: 'backend', label: 'Backend API' },
  { id: 'mobile', label: 'Mobile Architectures' },
]

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeFilter, setActiveFilter] = useState('all')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  },[])

  const fetchProjects = async () => {
    try {
      const apiClient = (await import('@/lib/api')).apiClient
      const response = await apiClient.getProjects()
      if (response.success && response.data && typeof response.data === 'object' && response.data !== null && 'projects' in response.data) {
        setProjects(response.data.projects as Project[])
      } else {
        setProjects(defaultProjects)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setProjects(defaultProjects)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = activeFilter === 'all' 
    ? (projects.length ? projects : defaultProjects) 
    : (projects.length ? projects : defaultProjects).filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden min-h-screen">
      <DataMeshBackground />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div ref={ref}>
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-300 px-4 py-2 rounded-full mb-6"
            >
              <FaLayerGroup className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">Deployment Hub</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
            >
              Deployed <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Architectures</span>
            </motion.h2>
          </div>

          {/* System Filters (High-tech Segmented Control) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/60 dark:border-neutral-700/50 rounded-2xl shadow-lg w-fit mx-auto"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all z-10 ${
                  activeFilter === category.id
                    ? 'text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeFilter === category.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid with AnimatePresence for smooth filtering */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <BentoCard 
                  key={project.id} 
                  layout
                  delay={index * 0.05} 
                  className="flex flex-col h-full"
                >
                  {/* Project "Image" / Neural Node Placeholder */}
                  <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-center group/img">
                    {loading ? (
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
                        <div className="absolute inset-2 rounded-full border-r-2 border-cyan-500 animate-spin-reverse" />
                      </div>
                    ) : (
                      <>
                        {/* Abstract Tech Graphic */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.8)_0,transparent_50%)] group-hover/img:scale-150 transition-transform duration-700 ease-out" />
                        <FaNetworkWired className="w-16 h-16 text-violet-300 dark:text-neutral-700 group-hover/img:text-violet-500 transition-colors duration-500" />
                        <span className="absolute text-5xl font-extrabold text-white mix-blend-overlay opacity-30">{project.title[0]}</span>
                      </>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-lg">
                        Featured Node
                      </div>
                    )}

                    {/* Quick Access Overlay */}
                    <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                      <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={project.liveUrl} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-violet-500 transition-colors shadow-xl">
                        <FaExternalLinkAlt />
                      </motion.a>
                      <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={project.githubUrl} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors shadow-xl">
                        <FaGithub className="text-xl" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-cyan-500 transition-all">
                      {project.title}
                    </h3>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold tracking-wide rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View More Call To Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/supernovaprime"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold rounded-xl shadow-lg hover:bg-white dark:hover:bg-neutral-800 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-5 h-5 text-violet-500" />
              Access Full Repository
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects