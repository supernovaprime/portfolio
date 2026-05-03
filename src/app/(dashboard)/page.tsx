'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaProjectDiagram, FaTools, FaBriefcase, FaEnvelope, 
  FaUsers, FaChartLine, FaEye, FaArrowUp, FaArrowDown
} from 'react-icons/fa'

interface DashboardStats {
  counts: {
    users: number
    projects: number
    skills: number
    experiences: number
    messages: number
    unreadMessages: number
  }
  stats: {
    projectsByCategory: Record<string, number>
    skillsByCategory: Record<string, number>
    experiencesByType: Record<string, number>
  }
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/users/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.counts.projects || 0,
      icon: FaProjectDiagram,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Skills',
      value: stats?.counts.skills || 0,
      icon: FaTools,
      color: 'bg-green-500',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Experiences',
      value: stats?.counts.experiences || 0,
      icon: FaBriefcase,
      color: 'bg-purple-500',
      change: '0%',
      trend: 'neutral'
    },
    {
      title: 'Messages',
      value: stats?.counts.messages || 0,
      icon: FaEnvelope,
      color: 'bg-red-500',
      change: '+25%',
      trend: 'up'
    },
    {
      title: 'Unread Messages',
      value: stats?.counts.unreadMessages || 0,
      icon: FaEye,
      color: 'bg-orange-500',
      change: '-10%',
      trend: 'down'
    },
    {
      title: 'Total Users',
      value: stats?.counts.users || 0,
      icon: FaUsers,
      color: 'bg-indigo-500',
      change: '+8%',
      trend: 'up'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              {card.trend === 'up' && (
                <FaArrowUp className="w-4 h-4 text-green-500 mr-1" />
              )}
              {card.trend === 'down' && (
                <FaArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${
                card.trend === 'up' ? 'text-green-500' : 
                card.trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`}>
                {card.change} from last month
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Projects by Category
          </h3>
          <div className="space-y-3">
            {stats?.stats.projectsByCategory && 
              Object.entries(stats.stats.projectsByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-violet-600 h-2 rounded-full"
                        style={{ width: `${(count / stats.counts.projects) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </motion.div>

        {/* Skills by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Skills by Category
          </h3>
          <div className="space-y-3">
            {stats?.stats.skillsByCategory && 
              Object.entries(stats.stats.skillsByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(count / stats.counts.skills) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              New project "E-Commerce Platform" added
            </span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Contact message received from John Doe
            </span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Skills updated: Added "Docker" and "Kubernetes"
            </span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardPage
