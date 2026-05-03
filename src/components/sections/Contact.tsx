'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, 
  FaLinkedin, FaTwitter, FaInstagram, FaPaperPlane,
  FaSatelliteDish, FaTerminal
} from 'react-icons/fa'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Reusable Glassmorphic Bento Card wrapper
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

const BentoCard = ({ children, className = "", delay = 0, hoverEffect = false }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay } }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`relative overflow-hidden rounded-3xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group ${className}`}
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
      animate={{ scale:[1, 1.2, 1], opacity:[0.05, 0.15, 0.05], x:[0, 40, 0], y:[0, -30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-violet-500/20 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity:[0.05, 0.1, 0.05], x:[0, -40, 0], y:[0, 40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-[100px]"
    />
  </div>
)

const Contact = () => {
  const[ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const apiClient = (await import('@/lib/api')).apiClient
      await apiClient.sendMessage(data)
      toast.success('Transmission successful. I will decode and respond shortly.', {
        icon: '🚀',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      })
      reset()
    } catch (error) {
      console.error('Transmission failed:', error)
      toast.error('Uplink failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo =[
    { icon: FaEnvelope, label: 'Secure Email', value: 'ebenezerayimful@gmail.com', href: 'mailto:ebenezerayimful@gmail.com' },
    { icon: FaPhone, label: 'Direct Comm', value: '+233 545976400', href: 'tel:+233545976400' },
    { icon: FaMapMarkerAlt, label: 'Physical Coordinates', value: 'Agona Swedru, Ghana', href: '#' },
  ]

  const socialLinks =[
    { icon: FaGithub, href: 'https://github.com/supernovaprime', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/supernovaprime', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/supernovaprime', label: 'Instagram' },
  ]

  return (
    <section id="contact" className="relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden min-h-screen">
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
              <FaSatelliteDish className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide uppercase">Comms Channel Open</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
            >
              Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Connection</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column: Data & Nodes */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Intro Bento */}
              <BentoCard delay={0.1} className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl text-cyan-600 dark:text-cyan-400">
                    <FaTerminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Initialize Uplink</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  My receivers are always tuned to new frequencies. Whether you have an enterprise architecture project, a collaboration proposal, or just want to ping my server—transmit your message below.
                </p>
              </BentoCard>

              {/* Contact Data Points Bento */}
              <BentoCard delay={0.2} className="p-8">
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      className="flex items-center gap-4 group p-2 rounded-xl transition-colors hover:bg-white/50 dark:hover:bg-neutral-800/50"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/50 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors shadow-inner">
                        <info.icon className="w-5 h-5 text-violet-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                          {info.label}
                        </p>
                        <p className="font-semibold text-neutral-900 dark:text-white">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </BentoCard>

              {/* Social Nodes Bento */}
              <BentoCard delay={0.3} className="p-8">
                <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-6">
                  Network Nodes
                </h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-white/60 dark:bg-neutral-800/60 border border-white/60 dark:border-neutral-700/50 rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-center justify-center group"
                      whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-6 h-6 text-neutral-600 dark:text-neutral-300 group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </BentoCard>

            </div>

            {/* Right Column: Secure Form Terminal */}
            <BentoCard delay={0.4} className="lg:col-span-7 p-8 md:p-10 !bg-gradient-to-br !from-white/60 !to-white/30 dark:!from-neutral-900/60 dark:!to-neutral-900/30">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      Designation (Name)
                    </label>
                    <div className="relative group">
                      <input
                        {...register('name', { required: 'Designation is required' })}
                        type="text"
                        className="w-full px-5 py-4 bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 dark:focus:border-cyan-500 outline-none transition-all backdrop-blur-sm text-neutral-900 dark:text-white placeholder:text-neutral-400"
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      Return Address (Email)
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Return address is required',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid protocol format' },
                      })}
                      type="email"
                      className="w-full px-5 py-4 bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 dark:focus:border-cyan-500 outline-none transition-all backdrop-blur-sm text-neutral-900 dark:text-white placeholder:text-neutral-400"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Transmission Subject
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    className="w-full px-5 py-4 bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 dark:focus:border-cyan-500 outline-none transition-all backdrop-blur-sm text-neutral-900 dark:text-white placeholder:text-neutral-400"
                    placeholder="Project Discussion / Architecture Inquiry"
                  />
                  {errors.subject && <p className="text-xs text-red-500 font-bold">{errors.subject.message}</p>}
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Payload (Message)
                  </label>
                  <textarea
                    {...register('message', { required: 'Payload cannot be empty' })}
                    rows={6}
                    className="w-full px-5 py-4 bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 dark:focus:border-cyan-500 outline-none transition-all resize-none backdrop-blur-sm text-neutral-900 dark:text-white placeholder:text-neutral-400"
                    placeholder="Initialize parameters here..."
                  />
                  {errors.message && <p className="text-xs text-red-500 font-bold">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="relative z-10">Transmitting Data...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5 relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      <span className="relative z-10">Transmit Payload</span>
                    </>
                  )}
                </motion.button>
              </form>
            </BentoCard>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact