
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  status: 'in-progress' | 'completed' | 'on-hold' | 'error';
  progress: number;
  totalPhases: number;
  completedPhases: number;
  budget: number;
  spent: number;
  developer: {
    id: string;
    name: string;
    avatar: string;
  };
  phases: ProjectPhase[];
  createdAt: string;
  deadline: string;
  lastActivity: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  deliverables: string[];
  testsPassed: number;
  totalTests: number;
  startDate: string;
  endDate?: string;
  budget: number;
}

export interface BillingRecord {
  id: string;
  projectId: string;
  amount: number;
  type: 'milestone' | 'hourly' | 'bonus';
  status: 'pending' | 'paid' | 'disputed';
  date: string;
  description: string;
  invoice?: string;
}

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  billingRecords: BillingRecord[];
  loading: boolean;
  error: string | null;
  stats: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalSpent: number;
    totalBudget: number;
  };
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  billingRecords: [],
  loading: false,
  error: null,
  stats: {
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalSpent: 0,
    totalBudget: 0,
  },
};

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'E-commerce Platform',
        status: 'in-progress',
        progress: 65,
        totalPhases: 4,
        completedPhases: 2,
        budget: 50000,
        spent: 32500,
        developer: {
          id: 'dev1',
          name: 'Alice Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b86d2c04?w=150&h=150&fit=crop&crop=face'
        },
        phases: [
          {
            id: 'p1',
            name: 'Frontend Setup',
            status: 'completed',
            progress: 100,
            deliverables: ['React App', 'UI Components', 'Routing'],
            testsPassed: 45,
            totalTests: 45,
            startDate: '2024-01-01',
            endDate: '2024-01-15',
            budget: 12500,
          },
          {
            id: 'p2',
            name: 'Backend API',
            status: 'completed',
            progress: 100,
            deliverables: ['User Auth', 'Product API', 'Order System'],
            testsPassed: 38,
            totalTests: 40,
            startDate: '2024-01-16',
            endDate: '2024-02-01',
            budget: 20000,
          },
          {
            id: 'p3',
            name: 'Payment Integration',
            status: 'in-progress',
            progress: 60,
            deliverables: ['Stripe Setup', 'Payment Flow'],
            testsPassed: 12,
            totalTests: 20,
            startDate: '2024-02-02',
            budget: 10000,
          },
          {
            id: 'p4',
            name: 'Testing & Deployment',
            status: 'pending',
            progress: 0,
            deliverables: ['E2E Tests', 'Production Deploy'],
            testsPassed: 0,
            totalTests: 25,
            startDate: '2024-02-20',
            budget: 7500,
          },
        ],
        createdAt: '2024-01-01',
        deadline: '2024-03-01',
        lastActivity: '2024-02-05T10:30:00Z',
      },
      {
        id: '2',
        name: 'Mobile App MVP',
        status: 'completed',
        progress: 100,
        totalPhases: 3,
        completedPhases: 3,
        budget: 30000,
        spent: 28500,
        developer: {
          id: 'dev2',
          name: 'Bob Johnson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        phases: [],
        createdAt: '2023-12-01',
        deadline: '2024-01-31',
        lastActivity: '2024-01-30T15:45:00Z',
      }
    ];
    
    return mockProjects;
  }
);

export const fetchBillingRecords = createAsyncThunk(
  'project/fetchBillingRecords',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockBilling: BillingRecord[] = [
      {
        id: 'b1',
        projectId: '1',
        amount: 12500,
        type: 'milestone',
        status: 'paid',
        date: '2024-01-15',
        description: 'Frontend Setup Completion',
        invoice: 'INV-001'
      },
      {
        id: 'b2',
        projectId: '1',
        amount: 20000,
        type: 'milestone',
        status: 'paid',
        date: '2024-02-01',
        description: 'Backend API Completion',
        invoice: 'INV-002'
      },
      {
        id: 'b3',
        projectId: '1',
        amount: 6000,
        type: 'hourly',
        status: 'pending',
        date: '2024-02-05',
        description: 'Payment Integration Progress'
      }
    ];
    
    return mockBilling;
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<string>) => {
      state.selectedProject = state.projects.find(p => p.id === action.payload) || null;
    },
    updateProjectStatus: (state, action: PayloadAction<{ projectId: string; status: Project['status'] }>) => {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        
        // Calculate stats
        state.stats.totalProjects = action.payload.length;
        state.stats.activeProjects = action.payload.filter(p => p.status === 'in-progress').length;
        state.stats.completedProjects = action.payload.filter(p => p.status === 'completed').length;
        state.stats.totalSpent = action.payload.reduce((sum, p) => sum + p.spent, 0);
        state.stats.totalBudget = action.payload.reduce((sum, p) => sum + p.budget, 0);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      .addCase(fetchBillingRecords.fulfilled, (state, action) => {
        state.billingRecords = action.payload;
      });
  },
});

export const { selectProject, updateProjectStatus } = projectSlice.actions;
export default projectSlice.reducer;
