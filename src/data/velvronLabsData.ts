export interface ServiceData {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface VelvronLabsData {
  company: {
    name: string;
    tagline: string;
    mission: string;
    founded: number;
    location: string;
    email: string;
    phone: string;
    website: string;
    github: string;
  };
  services: ServiceData[];
  projects: ProjectData[];
  memberRole: {
    title: string;
    description: string;
    contributions: string[];
  };
}

export const velvronLabsData: VelvronLabsData = {
  company: {
    name: "Velvron Labs",
    tagline: "Engineering the Future of Technology",
    mission: "Building tomorrow's technology today with cutting-edge solutions in AI, cloud, and automation. We help startups and enterprises build scalable, secure, and user-centric applications.",
    founded: 2025,
    location: "8th Floor, One Airport Square, Airport City, Accra, Ghana",
    email: "frimpongbrichmond@gmail.com",
    phone: "+233 (0) 54 869 7052",
    website: "https://velvronlabs.vercel.app",
    github: "https://github.com/Velvron-Labs"
  },
  services: [
    {
      title: "Frontend Development",
      description: "Modern, responsive interfaces built with cutting-edge frameworks and best practices",
      icon: "FaCode"
    },
    {
      title: "Backend Development", 
      description: "Scalable server architecture, APIs, and infrastructure that power your applications",
      icon: "FaServer"
    },
    {
      title: "UX/UI Design",
      description: "User-centered design solutions that create intuitive and engaging experiences",
      icon: "FaPalette"
    },
    {
      title: "Web Development",
      description: "Full-stack web applications with modern technologies and best practices",
      icon: "FaGlobe"
    },
    {
      title: "Mobile Solutions",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: "FaMobile"
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by cutting-edge AI and machine learning technologies",
      icon: "FaBrain"
    },
    {
      title: "Blockchain Tech",
      description: "Decentralized applications and blockchain solutions for modern businesses",
      icon: "FaCube"
    }
  ],
  projects: [
    {
      name: "Velvron-Labs",
      description: "Main organization repository containing core infrastructure and documentation",
      technologies: ["JavaScript", "TypeScript", "React", "Node.js"],
      githubUrl: "https://github.com/Velvron-Labs/Velvron-Labs",
      liveUrl: "https://velvronlabs.vercel.app"
    },
    {
      name: "Frontend Guide",
      description: "Comprehensive frontend development guide and best practices for modern web development",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Vue"],
      githubUrl: "https://github.com/Velvron-Labs/frontend-guide"
    }
  ],
  memberRole: {
    title: "Full Stack Developer & Core Contributor",
    description: "Active member of Velvron Labs contributing to frontend architecture, backend development, and technical innovation",
    contributions: [
      "Frontend architecture and component development",
      "Backend API design and implementation", 
      "Code quality and best practices",
      "Technical documentation and guides",
      "Collaborative development and code reviews"
    ]
  }
};
