import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockCandidates } from '../../data/mockCandidates';

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  timezone: string;
  hourlyRate: number;
  rating: number;
  badges: string[];
  skills: {
    codeQuality: number;
    performance: number;
    communication: number;
    reliability: number;
    innovation: number;
  };
  technicalFit: number;
  completedProjects: number;
  responseTime: string;
  languages: string[];
}

interface Filters {
  techStack: string[];
  timezone: string;
  maxRate: number;
  minRating: number;
}

interface TalentMatchState {
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  loading: boolean;
  error: string | null;
  filters: Filters;
}

const initialState: TalentMatchState = {
  candidates: [],
  filteredCandidates: [],
  loading: false,
  error: null,
  filters: {
    techStack: [],
    timezone: 'any',
    maxRate: 200,
    minRating: 0,
  },
};

export const fetchCandidates = createAsyncThunk(
  'talentMatch/fetchCandidates',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCandidates;
  }
);

const filterCandidates = (candidates: Candidate[], filters: Filters): Candidate[] => {
  return candidates.filter(candidate => {
    // Tech stack filter
    if (filters.techStack.length > 0) {
      const hasMatchingTech = filters.techStack.some(tech => 
        candidate.badges.some(badge => badge.toLowerCase().includes(tech.toLowerCase()))
      );
      if (!hasMatchingTech) return false;
    }

    // Timezone filter
    if (filters.timezone !== 'any' && candidate.timezone !== filters.timezone) {
      return false;
    }

    // Rate filter
    if (candidate.hourlyRate > filters.maxRate) {
      return false;
    }

    // Rating filter
    if (candidate.rating < filters.minRating) {
      return false;
    }

    return true;
  });
};

const talentMatchSlice = createSlice({
  name: 'talentMatch',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredCandidates = filterCandidates(state.candidates, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
        state.filteredCandidates = filterCandidates(action.payload, state.filters);
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch candidates';
      });
  },
});

export const { setFilters } = talentMatchSlice.actions;
export default talentMatchSlice.reducer;
