
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

interface DeveloperState {
  tasks: DeveloperTask[];
  chatMessages: ChatMessage[];
  earnings: EarningsRecord[];
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
}

const initialState: DeveloperState = {
  tasks: [],
  chatMessages: [],
  earnings: [],
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
      }
    ];
    
    return mockEarnings;
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
      });
  },
});

export const { updateTaskStatus, updateAgentConfig, addChatMessage } = developerSlice.actions;
export default developerSlice.reducer;
