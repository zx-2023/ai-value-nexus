import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface DeveloperTask {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  client: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

export interface ChatMessage {
  id: string;
  projectId: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'message' | 'srd-update' | 'review-request' | 'approval';
}

export interface EarningsRecord {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  type: 'milestone' | 'hourly' | 'bonus';
  status: 'pending' | 'paid';
  date: string;
  description: string;
}

export interface KnowledgeItem {
  id: string;
  category: 'coding_standards' | 'api_components' | 'office_tools' | 'business_knowledge';
  subcategory: string;
  title: string;
  content: string;
  tags: string[];
  tech_stack: string[];
  project_phase: string[];
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  usage_count: number;
  rating: number;
  last_updated: string;
  author?: string;
  description: string;
}

export interface ProjectContext {
  srd_content: string;
  tech_stack: string[];
  project_phase: string;
  complexity_score: number;
  team_size: number;
  deadline: string;
}

export interface SmartRecommendation extends KnowledgeItem {
  relevanceScore: number;
  reason: string;
}

export interface AssistantItem {
  id: string;
  type: 'action' | 'done' | 'alert';
  title: string;
  status?: 'pending' | 'in_progress' | 'done';
  severity?: 'high' | 'medium' | 'low';
  eta?: string;
  updatedAt: string;
  sandboxLink?: string;
}

interface DeveloperState {
  tasks: DeveloperTask[];
  chatMessages: ChatMessage[];
  earnings: EarningsRecord[];
  knowledgeBase: KnowledgeItem[];
  recommendations: SmartRecommendation[];
  activeKnowledgeCategory: string;
  projectContext: ProjectContext | null;
  loading: boolean;
  error: string | null;
  agentConfig: {
    enableCodeAssistant: boolean;
    enableScheduleManager: boolean;
    enableEarningsTracker: boolean;
    enableAutoResume: boolean;
  };
  stats: {
    totalEarnings: number;
    pendingEarnings: number;
    completedTasks: number;
    activeTasks: number;
    totalHours: number;
  };
  aiConfig: {
    apiKey: string;
    modelName: string;
  };
  assistantItems: AssistantItem[];
  activeAssistantTab: 'chat' | 'action' | 'done' | 'alert';
}

const initialState: DeveloperState = {
  tasks: [],
  chatMessages: [],
  earnings: [],
  knowledgeBase: [],
  recommendations: [],
  activeKnowledgeCategory: 'coding_standards',
  projectContext: null,
  loading: false,
  error: null,
  agentConfig: {
    enableCodeAssistant: true,
    enableScheduleManager: true,
    enableEarningsTracker: true,
    enableAutoResume: false,
  },
  stats: {
    totalEarnings: 0,
    pendingEarnings: 0,
    completedTasks: 0,
    activeTasks: 0,
    totalHours: 0,
  },
  aiConfig: {
    apiKey: '',
    modelName: '',
  },
  assistantItems: [],
  activeAssistantTab: 'chat',
};

export const fetchDeveloperTasks = createAsyncThunk(
  'developer/fetchTasks',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockTasks: DeveloperTask[] = [
      {
        id: 't1',
        projectId: '1',
        projectName: 'E-commerce Platform',
        title: 'Implement Payment Gateway',
        description: 'Integrate Stripe payment system with order processing',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-02-15',
        estimatedHours: 20,
        actualHours: 12,
        client: {
          name: 'Tech Corp',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop'
        },
        tags: ['React', 'Stripe', 'Backend']
      },
      {
        id: 't2',
        projectId: '1',
        projectName: 'E-commerce Platform',
        title: 'Add Product Search',
        description: 'Implement advanced search with filters',
        status: 'todo',
        priority: 'medium',
        dueDate: '2024-02-20',
        estimatedHours: 15,
        actualHours: 0,
        client: {
          name: 'Tech Corp',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop'
        },
        tags: ['React', 'Search', 'UI']
      },
      {
        id: 't3',
        projectId: '3',
        projectName: 'Analytics Dashboard',
        title: 'Create Data Visualization',
        description: 'Build interactive charts for user analytics',
        status: 'review',
        priority: 'medium',
        dueDate: '2024-02-10',
        estimatedHours: 25,
        actualHours: 24,
        client: {
          name: 'Data Inc',
          avatar: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop'
        },
        tags: ['React', 'Charts', 'D3.js']
      }
    ];
    
    return mockTasks;
  }
);

export const fetchEarnings = createAsyncThunk(
  'developer/fetchEarnings',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockEarnings: EarningsRecord[] = [
      {
        id: 'e1',
        projectId: '1',
        projectName: 'E-commerce Platform',
        amount: 2500,
        type: 'milestone',
        status: 'paid',
        date: '2024-01-15',
        description: 'Frontend Setup Milestone'
      },
      {
        id: 'e2',
        projectId: '1',
        projectName: 'E-commerce Platform',
        amount: 1800,
        type: 'hourly',
        status: 'pending',
        date: '2024-02-01',
        description: 'Payment Integration (36 hours)'
      },
      {
        id: 'e3',
        projectId: '2',
        projectName: 'Mobile App MVP',
        amount: 5000,
        type: 'milestone',
        status: 'paid',
        date: '2024-01-30',
        description: 'App Completion Bonus'
      },
      {
        id: 'e4',
        projectId: '1',
        projectName: 'E-commerce Platform',
        amount: 3200,
        type: 'milestone',
        status: 'pending',
        date: '2024-12-10',
        description: 'API Integration Milestone'
      },
      {
        id: 'e5',
        projectId: '3',
        projectName: 'Analytics Dashboard',
        amount: 4500,
        type: 'milestone',
        status: 'pending',
        date: '2024-12-05',
        description: 'Data Visualization Complete'
      },
      {
        id: 'e6',
        projectId: '2',
        projectName: 'Mobile App MVP',
        amount: 1200,
        type: 'hourly',
        status: 'paid',
        date: '2024-11-25',
        description: 'Bug Fixes (24 hours)'
      },
      {
        id: 'e7',
        projectId: '4',
        projectName: 'CRM System',
        amount: 6800,
        type: 'milestone',
        status: 'pending',
        date: '2024-12-15',
        description: 'Customer Management Module'
      },
      {
        id: 'e8',
        projectId: '3',
        projectName: 'Analytics Dashboard',
        amount: 2200,
        type: 'hourly',
        status: 'paid',
        date: '2024-11-20',
        description: 'Chart Integration (44 hours)'
      },
      {
        id: 'e9',
        projectId: '1',
        projectName: 'E-commerce Platform',
        amount: 800,
        type: 'bonus',
        status: 'paid',
        date: '2024-10-15',
        description: 'Performance Optimization Bonus'
      },
      {
        id: 'e10',
        projectId: '4',
        projectName: 'CRM System',
        amount: 1500,
        type: 'hourly',
        status: 'paid',
        date: '2024-11-10',
        description: 'Initial Setup (30 hours)'
      }
    ];
    
    return mockEarnings;
  }
);

export const fetchKnowledgeBase = createAsyncThunk(
  'developer/fetchKnowledgeBase',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockKnowledgeBase: KnowledgeItem[] = [
      {
        id: 'kb1',
        category: 'coding_standards',
        subcategory: 'JavaScript/TypeScript',
        title: 'React 组件设计最佳实践',
        description: '现代React组件的设计原则和代码规范',
        content: '# React 组件设计最佳实践\\n\\n## 组件拆分原则\\n- 单一职责原则\\n- 可复用性设计\\n- Props接口设计\\n\\n## 性能优化\\n- 使用React.memo\\n- useCallback和useMemo\\n- 避免内联对象和函数',
        tags: ['React', 'TypeScript', '最佳实践', '性能优化'],
        tech_stack: ['React', 'TypeScript'],
        project_phase: ['development', 'optimization'],
        difficulty_level: 'intermediate',
        usage_count: 145,
        rating: 4.8,
        last_updated: '2024-01-15',
        author: 'Alex Chen'
      },
      {
        id: 'kb2',
        category: 'api_components',
        subcategory: '支付集成',
        title: 'Stripe 支付集成方案',
        description: '完整的Stripe支付系统集成指南',
        content: '# Stripe 支付集成方案\\n\\n## 前端集成\\n```tsx\\nimport { loadStripe } from \"@stripe/stripe-js\"\\nimport { Elements } from \"@stripe/react-stripe-js\"\\n```\\n\\n## 后端集成\\n- 创建PaymentIntent\\n- 处理Webhook回调\\n- 错误处理机制',
        tags: ['Stripe', '支付', '电商', '集成'],
        tech_stack: ['React', 'Node.js', 'Stripe'],
        project_phase: ['development', 'integration'],
        difficulty_level: 'advanced',
        usage_count: 167,
        rating: 4.6,
        last_updated: '2024-01-22',
        author: 'Maria Garcia'
      },
      {
        id: 'kb3',
        category: 'office_tools',
        subcategory: 'CI/CD流程',
        title: 'GitHub Actions 自动化部署',
        description: 'GitHub Actions的CI/CD最佳实践和配置指南',
        content: '# GitHub Actions 自动化部署\\n\\n## 基础配置\\n```yaml\\nname: CI/CD Pipeline\\non:\\n  push:\\n    branches: [main]\\n  pull_request:\\n    branches: [main]\\n```\\n\\n## 部署策略\\n- 测试环境自动部署\\n- 生产环境手动审批\\n- 回滚机制',
        tags: ['CI/CD', 'GitHub Actions', '自动化', '部署'],
        tech_stack: ['Git', 'Docker', 'AWS'],
        project_phase: ['deployment', 'maintenance'],
        difficulty_level: 'intermediate',
        usage_count: 198,
        rating: 4.5,
        last_updated: '2024-01-25',
        author: 'James Wilson'
      },
      {
        id: 'kb4',
        category: 'business_knowledge',
        subcategory: '电商平台',
        title: '电商订单系统设计模式',
        description: '基于平台历史项目的电商订单系统最佳实践',
        content: '# 电商订单系统设计模式\\n\\n## 订单状态管理\\n- 待支付 → 已支付 → 已发货 → 已完成\\n- 取消订单处理逻辑\\n- 退款流程设计\\n\\n## 库存管理\\n- 预占库存机制\\n- 超时释放策略\\n- 并发控制方案',
        tags: ['电商', '订单系统', '状态机', '库存管理'],
        tech_stack: ['Node.js', 'Redis', 'MySQL'],
        project_phase: ['planning', 'development'],
        difficulty_level: 'advanced',
        usage_count: 89,
        rating: 4.9,
        last_updated: '2024-01-30',
        author: 'Tech Expert'
      }
    ];
    
    return mockKnowledgeBase;
  }
);

export const generateRecommendations = createAsyncThunk(
  'developer/generateRecommendations',
  async (context: ProjectContext, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const state = getState() as { developer: DeveloperState };
    const knowledgeBase = state.developer.knowledgeBase;
    
    const recommendations = knowledgeBase
      .map(item => {
        let relevanceScore = 0;
        let reasons: string[] = [];

        // 技术栈匹配 (40%)
        const techMatch = item.tech_stack.filter(tech => 
          context.tech_stack.some(cttech => cttech.toLowerCase().includes(tech.toLowerCase()))
        ).length;
        if (techMatch > 0) {
          relevanceScore += (techMatch / item.tech_stack.length) * 0.4;
          reasons.push(`技术栈匹配${techMatch}项`);
        }

        // 项目阶段匹配 (25%)
        if (item.project_phase.includes(context.project_phase)) {
          relevanceScore += 0.25;
          reasons.push('适用当前开发阶段');
        }

        // 复杂度匹配 (20%)
        const complexityMatch = context.complexity_score >= 7 ? 
          (item.difficulty_level === 'advanced' ? 1 : 0.5) :
          (item.difficulty_level === 'beginner' ? 1 : 0.7);
        relevanceScore += complexityMatch * 0.2;
        if (complexityMatch === 1) {
          reasons.push('难度级别匹配');
        }

        // 使用热度加分 (15%)
        const popularityScore = Math.min(item.usage_count / 300, 1);
        relevanceScore += popularityScore * 0.15;
        if (item.usage_count > 200) {
          reasons.push('社区热门推荐');
        }

        return {
          ...item,
          relevanceScore,
          reason: reasons.join(' · ')
        };
      })
      .filter(item => item.relevanceScore > 0.6)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6);
    
    return recommendations;
  }
);

const developerSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: DeveloperTask['status'] }>) => {
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status;
      }
    },
    updateAgentConfig: (state, action: PayloadAction<Partial<DeveloperState['agentConfig']>>) => {
      state.agentConfig = { ...state.agentConfig, ...action.payload };
    },
    addChatMessage: (state, action: PayloadAction<Omit<ChatMessage, 'id' | 'timestamp'>>) => {
      const newMessage: ChatMessage = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      state.chatMessages.push(newMessage);
    },
    setActiveKnowledgeCategory: (state, action: PayloadAction<string>) => {
      state.activeKnowledgeCategory = action.payload;
    },
    setProjectContext: (state, action: PayloadAction<ProjectContext>) => {
      state.projectContext = action.payload;
    },
    updateKnowledgeItemUsage: (state, action: PayloadAction<string>) => {
      const item = state.knowledgeBase.find(kb => kb.id === action.payload);
      if (item) {
        item.usage_count += 1;
      }
    },
    setAIConfig: (state, action: PayloadAction<{ apiKey: string; modelName: string }>) => {
      state.aiConfig = { ...state.aiConfig, ...action.payload };
    },
    addAssistantItem: (state, action: PayloadAction<AssistantItem>) => {
      state.assistantItems.push(action.payload);
    },
    updateAssistantItem: (state, action: PayloadAction<{ id: string; updates: Partial<AssistantItem> }>) => {
      const { id, updates } = action.payload;
      const index = state.assistantItems.findIndex(item => item.id === id);
      if (index !== -1) {
        state.assistantItems[index] = { ...state.assistantItems[index], ...updates };
      }
    },
    removeAssistantItem: (state, action: PayloadAction<string>) => {
      state.assistantItems = state.assistantItems.filter(item => item.id !== action.payload);
    },
    setActiveAssistantTab: (state, action: PayloadAction<'chat' | 'action' | 'done' | 'alert'>) => {
      state.activeAssistantTab = action.payload;
    },
    markActionAsDone: (state, action: PayloadAction<string>) => {
      const item = state.assistantItems.find(item => item.id === action.payload);
      if (item && item.type === 'action') {
        item.type = 'done';
        item.status = 'done';
        item.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeveloperTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeveloperTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        
        // Calculate stats
        state.stats.activeTasks = action.payload.filter(t => t.status === 'in-progress').length;
        state.stats.completedTasks = action.payload.filter(t => t.status === 'completed').length;
        state.stats.totalHours = action.payload.reduce((sum, t) => sum + t.actualHours, 0);
      })
      .addCase(fetchDeveloperTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.earnings = action.payload;
        
        // Calculate earnings stats
        state.stats.totalEarnings = action.payload
          .filter(e => e.status === 'paid')
          .reduce((sum, e) => sum + e.amount, 0);
        state.stats.pendingEarnings = action.payload
          .filter(e => e.status === 'pending')
          .reduce((sum, e) => sum + e.amount, 0);
      })
      .addCase(fetchKnowledgeBase.fulfilled, (state, action) => {
        state.knowledgeBase = action.payload;
      })
      .addCase(generateRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      });
  },
});

export const {
  updateTaskStatus,
  updateAgentConfig,
  addChatMessage,
  setActiveKnowledgeCategory,
  setProjectContext,
  updateKnowledgeItemUsage,
  setAIConfig,
  addAssistantItem,
  updateAssistantItem,
  removeAssistantItem,
  setActiveAssistantTab,
  markActionAsDone,
} = developerSlice.actions;
export default developerSlice.reducer;
