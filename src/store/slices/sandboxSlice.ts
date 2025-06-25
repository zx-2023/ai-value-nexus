
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface TestResult {
  name: string;
  status: 'passed' | 'failed';
  message?: string;
  duration: number;
}

interface SandboxState {
  isEnvironmentReady: boolean;
  loading: boolean;
  code: string;
  testResults: TestResult[];
  isTestRunning: boolean;
  resourceUsage: {
    cpu: number;
    memory: number;
  };
  branch: string;
  availableBranches: string[];
}

const initialState: SandboxState = {
  isEnvironmentReady: false,
  loading: true,
  code: `// Welcome to your sandbox environment
// Complete the challenge by implementing the required features

function fibonacci(n) {
  // TODO: Implement fibonacci sequence
  // Return the nth fibonacci number
  
  return 0;
}

function isPrime(num) {
  // TODO: Implement prime number check
  // Return true if num is prime, false otherwise
  
  return false;
}

module.exports = { fibonacci, isPrime };`,
  testResults: [],
  isTestRunning: false,
  resourceUsage: {
    cpu: 25,
    memory: 45,
  },
  branch: 'challenge/main',
  availableBranches: ['challenge/main', 'challenge/dev'],
};

export const initializeEnvironment = createAsyncThunk(
  'sandbox/initializeEnvironment',
  async () => {
    // Simulate environment setup
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true;
  }
);

export const runTests = createAsyncThunk(
  'sandbox/runTests',
  async (_, { getState }) => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults: TestResult[] = [
      { name: 'fibonacci(0) should return 0', status: 'passed', duration: 12 },
      { name: 'fibonacci(1) should return 1', status: 'passed', duration: 8 },
      { name: 'fibonacci(5) should return 5', status: 'failed', message: 'Expected 5, got 0', duration: 15 },
      { name: 'fibonacci(10) should return 55', status: 'failed', message: 'Expected 55, got 0', duration: 22 },
      { name: 'isPrime(2) should return true', status: 'failed', message: 'Expected true, got false', duration: 5 },
      { name: 'isPrime(17) should return true', status: 'failed', message: 'Expected true, got false', duration: 18 },
      { name: 'isPrime(4) should return false', status: 'passed', duration: 7 },
    ];
    
    return mockResults;
  }
);

export const submitMergeRequest = createAsyncThunk(
  'sandbox/submitMergeRequest',
  async (description: string) => {
    // Simulate MR submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    return description;
  }
);

const sandboxSlice = createSlice({
  name: 'sandbox',
  initialState,
  reducers: {
    updateCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    updateResourceUsage: (state, action: PayloadAction<{ cpu: number; memory: number }>) => {
      state.resourceUsage = action.payload;
    },
    changeBranch: (state, action: PayloadAction<string>) => {
      state.branch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeEnvironment.pending, (state) => {
        state.loading = true;
        state.isEnvironmentReady = false;
      })
      .addCase(initializeEnvironment.fulfilled, (state) => {
        state.loading = false;
        state.isEnvironmentReady = true;
      })
      .addCase(runTests.pending, (state) => {
        state.isTestRunning = true;
        state.testResults = [];
      })
      .addCase(runTests.fulfilled, (state, action) => {
        state.isTestRunning = false;
        state.testResults = action.payload;
      })
      .addCase(runTests.rejected, (state) => {
        state.isTestRunning = false;
      });
  },
});

export const { updateCode, updateResourceUsage, changeBranch } = sandboxSlice.actions;
export default sandboxSlice.reducer;
