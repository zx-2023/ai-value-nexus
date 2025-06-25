
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockCandidates, Candidate } from '../../data/mockCandidates';

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
  challengeLoading: Record<string, boolean>;
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
  challengeLoading: {},
};

export const fetchCandidates = createAsyncThunk(
  'talentMatch/fetchCandidates',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCandidates;
  }
);

export const sendChallengeInvite = createAsyncThunk(
  'talentMatch/sendChallengeInvite',
  async (candidateId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return candidateId;
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

    // Rating filter - using technicalFit as rating equivalent
    if (candidate.technicalFit < filters.minRating) {
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
      })
      .addCase(sendChallengeInvite.pending, (state, action) => {
        state.challengeLoading[action.meta.arg] = true;
      })
      .addCase(sendChallengeInvite.fulfilled, (state, action) => {
        state.challengeLoading[action.payload] = false;
      })
      .addCase(sendChallengeInvite.rejected, (state, action) => {
        state.challengeLoading[action.meta.arg] = false;
      });
  },
});

export const { setFilters } = talentMatchSlice.actions;
export default talentMatchSlice.reducer;
