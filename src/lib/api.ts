const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '') + '/api'

interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  errors?: string[]
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name: string, email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }

  async getProfile() {
    return this.request('/auth/me')
  }

  async updateProfile(data: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Projects endpoints
  async getProjects(params?: {
    category?: string
    featured?: boolean
    status?: string
    tags?: string
    page?: number
    limit?: number
    sort?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    const query = searchParams.toString()
    return this.request(`/projects${query ? `?${query}` : ''}`)
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`)
  }

  async createProject(data: any) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    })
  }

  // Skills endpoints
  async getSkills(params?: {
    category?: string
    featured?: boolean
    page?: number
    limit?: number
    sort?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    const query = searchParams.toString()
    return this.request(`/skills${query ? `?${query}` : ''}`)
  }

  async getSkillCategories() {
    return this.request('/skills/categories')
  }

  async createSkill(data: any) {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateSkill(id: string, data: any) {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteSkill(id: string) {
    return this.request(`/skills/${id}`, {
      method: 'DELETE',
    })
  }

  // Experiences endpoints
  async getExperiences(params?: {
    type?: string
    current?: boolean
    page?: number
    limit?: number
    sort?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    const query = searchParams.toString()
    return this.request(`/experiences${query ? `?${query}` : ''}`)
  }

  async createExperience(data: any) {
    return this.request('/experiences', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateExperience(id: string, data: any) {
    return this.request(`/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteExperience(id: string) {
    return this.request(`/experiences/${id}`, {
      method: 'DELETE',
    })
  }

  // Contact endpoints
  async sendMessage(data: {
    name: string
    email: string
    subject: string
    message: string
    priority?: string
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getMessages(params?: {
    status?: string
    priority?: string
    page?: number
    limit?: number
    sort?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    const query = searchParams.toString()
    return this.request(`/contact/messages${query ? `?${query}` : ''}`)
  }

  async updateMessageStatus(id: string, status: string) {
    return this.request(`/contact/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  async deleteMessage(id: string) {
    return this.request(`/contact/messages/${id}`, {
      method: 'DELETE',
    })
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/users/profile')
  }

  async updateUserProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)

    const token = localStorage.getItem('token')
    const response = await fetch(`${this.baseURL}/users/upload-avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Upload failed')
    }

    return response.json()
  }

  async getStats() {
    return this.request('/users/stats')
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
