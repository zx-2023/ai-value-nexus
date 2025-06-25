export interface ProjectDemand {
  id: string;
  type: 'official' | 'sandbox';
  title: string;
  summary: string;
  description: string;
  company: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
  };
  requirements: {
    techStack: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    duration: string;
    budget: {
      min: number;
      max: number;
    };
  };
  reward?: number; // 沙箱挑战奖金
  deadline: string;
  applicants: {
    count: number;
    topSkills: string[];
  };
  status: 'active' | 'closed' | 'in_progress';
  createdAt: string;
  matchScore: number; // AI计算的匹配度
  featured?: boolean; // 是否为推荐项目
}

export const mockProjectDemands: ProjectDemand[] = [
  {
    id: '1',
    type: 'official',
    title: '电商平台后台管理系统',
    summary: '开发一个完整的电商后台管理系统，包含商品管理、订单处理、用户管理等核心功能',
    description: '需要开发一个现代化的电商后台管理系统，支持多商户模式，包含完整的商品管理、订单处理、用户管理、数据统计等功能。要求使用React + Node.js技术栈，具备良好的扩展性和性能。',
    company: {
      name: '科技创新有限公司',
      avatar: '/company-avatars/tech-innovation.png',
      verified: true,
      rating: 4.8
    },
    requirements: {
      techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      difficulty: 'intermediate',
      duration: '4-6周',
      budget: {
        min: 15000,
        max: 25000
      }
    },
    deadline: '2024-02-15',
    applicants: {
      count: 8,
      topSkills: ['React', 'Node.js', 'MongoDB']
    },
    status: 'active',
    createdAt: '2024-01-10',
    matchScore: 92,
    featured: true
  },
  {
    id: '2',
    type: 'sandbox',
    title: 'AI聊天机器人原型开发',
    summary: '48小时内完成一个基于GPT的智能客服聊天机器人原型，展示您的AI集成能力',
    description: '快速开发一个智能客服聊天机器人原型，需要集成OpenAI GPT API，实现自然语言理解和响应。要求具备上下文记忆、意图识别、多轮对话等功能。',
    company: {
      name: '智能科技集团',
      avatar: '/company-avatars/smart-tech.png',
      verified: true,
      rating: 4.9
    },
    requirements: {
      techStack: ['Python', 'OpenAI API', 'FastAPI', 'React'],
      difficulty: 'advanced',
      duration: '48小时',
      budget: {
        min: 3000,
        max: 3000
      }
    },
    reward: 3000,
    deadline: '2024-01-16',
    applicants: {
      count: 15,
      topSkills: ['Python', 'AI/ML', 'API集成']
    },
    status: 'active',
    createdAt: '2024-01-12',
    matchScore: 88
  },
  {
    id: '3',
    type: 'official',
    title: '移动端健康管理App',
    summary: '开发一款个人健康数据管理的移动应用，支持数据可视化和健康建议',
    description: '开发一款跨平台的健康管理移动应用，支持健康数据记录、可视化展示、智能健康建议等功能。需要集成第三方健康设备API，提供良好的用户体验。',
    company: {
      name: '健康医疗公司',
      avatar: '/company-avatars/health-medical.png',
      verified: true,
      rating: 4.6
    },
    requirements: {
      techStack: ['React Native', 'Firebase', 'Chart.js', 'TypeScript'],
      difficulty: 'intermediate',
      duration: '3-4周',
      budget: {
        min: 8000,
        max: 12000
      }
    },
    deadline: '2024-02-01',
    applicants: {
      count: 5,
      topSkills: ['React Native', 'Mobile Development']
    },
    status: 'active',
    createdAt: '2024-01-08',
    matchScore: 75
  },
  {
    id: '4',
    type: 'sandbox',
    title: '区块链智能合约开发挑战',
    summary: '72小时内开发一个DeFi流动性挖矿智能合约，测试您的区块链开发能力',
    description: '开发一个完整的DeFi流动性挖矿智能合约，包含代币质押、奖励分发、流动性管理等功能。要求使用Solidity编写，部署到测试网络。',
    company: {
      name: '区块链创新实验室',
      avatar: '/company-avatars/blockchain-lab.png',
      verified: true,
      rating: 4.7
    },
    requirements: {
      techStack: ['Solidity', 'Web3.js', 'Hardhat', 'React'],
      difficulty: 'expert',
      duration: '72小时',
      budget: {
        min: 5000,
        max: 5000
      }
    },
    reward: 5000,
    deadline: '2024-01-18',
    applicants: {
      count: 12,
      topSkills: ['Solidity', 'Web3', 'DeFi']
    },
    status: 'active',
    createdAt: '2024-01-11',
    matchScore: 65
  },
  {
    id: '5',
    type: 'official',
    title: '企业级CRM系统重构',
    summary: '重构现有CRM系统，提升性能和用户体验，添加AI客户分析功能',
    description: '对现有CRM系统进行全面重构，优化数据库结构，提升系统性能，重新设计用户界面，并集成AI客户行为分析功能。',
    company: {
      name: '企业服务科技',
      avatar: '/company-avatars/enterprise-service.png',
      verified: true,
      rating: 4.5
    },
    requirements: {
      techStack: ['Vue.js', 'Java', 'Spring Boot', 'MySQL', 'AI/ML'],
      difficulty: 'advanced',
      duration: '6-8周',
      budget: {
        min: 25000,
        max: 35000
      }
    },
    deadline: '2024-03-01',
    applicants: {
      count: 12,
      topSkills: ['Vue.js', 'Java', 'Spring Boot']
    },
    status: 'active',
    createdAt: '2024-01-05',
    matchScore: 82
  },
  {
    id: '6',
    type: 'sandbox',
    title: '实时数据可视化大屏开发',
    summary: '24小时内开发一个实时数据可视化大屏，展示您的前端可视化技能',
    description: '开发一个实时数据可视化大屏，需要集成WebSocket实时数据，使用D3.js或ECharts实现多种图表展示，支持自适应布局。',
    company: {
      name: '数据科技有限公司',
      avatar: '/company-avatars/data-tech.png',
      verified: true,
      rating: 4.4
    },
    requirements: {
      techStack: ['React', 'D3.js', 'WebSocket', 'ECharts'],
      difficulty: 'intermediate',
      duration: '24小时',
      budget: {
        min: 2000,
        max: 2000
      }
    },
    reward: 2000,
    deadline: '2024-01-15',
    applicants: {
      count: 18,
      topSkills: ['React', 'D3.js', '数据可视化']
    },
    status: 'active',
    createdAt: '2024-01-13',
    matchScore: 78
  }
];

export const techStackOptions = [
  'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript', 'JavaScript',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS',
  'AI/ML', 'TensorFlow', 'PyTorch', 'OpenAI API', 'React Native', 'Flutter',
  'Solidity', 'Web3.js', 'Blockchain', 'DeFi', 'D3.js', 'ECharts', 'Chart.js',
  'Firebase', 'GraphQL', 'REST API', 'WebSocket', 'Microservices'
];

export const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级', 
  advanced: '高级',
  expert: '专家级'
};

export const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
  expert: 'bg-red-100 text-red-800'
}; 