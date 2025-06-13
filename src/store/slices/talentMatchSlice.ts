
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Candidate, mockCandidates } from '../../data/mockCandidates';

interface TalentMatchState {
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  loading: boolean;
  challengeLoading: { [key: string]: boolean };
  filters: {
    techStack: string[];
    timezone: string;
    maxRate: number;
    minRating: number;
  };
}

const initialState: TalentMatchState = {
  candidates: [],
  filteredCandidates: [],
  loading: false,
  challengeLoading: {},
  filters: {
    techStack: [],
    timezone: '',
    maxRate: 200,
    minRating: 0,
  },
};

export const fetchCandidates = createAsyncThunk(
  'talentMatch/fetchCandidates',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCandidates;
  }
);

export const sendChallengeInvite = createAsyncThunk(
  'talentMatch/sendChallengeInvite',
  async (candidateId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return candidateId;
  }
);

const talentMatchSlice = createSlice({
  name: 'talentMatch',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredCandidates = state.candidates.filter(candidate => {
        const techStackMatch = state.filters.techStack.length === 0 || 
          state.filters.techStack.some(tech => candidate.badges.includes(tech));
        const rateMatch = candidate.hourlyRate <= state.filters.maxRate;
        const ratingMatch = candidate.technicalFit >= state.filters.minRating;
        return techStackMatch && rateMatch && ratingMatch;
      });
    },
    setChallengeLoading: (state, action: PayloadAction<{ candidateId: string; loading: boolean }>) => {
      state.challengeLoading[action.payload.candidateId] = action.payload.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
        state.filteredCandidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state) => {
        state.loading = false;
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

export const { setFilters, setChallengeLoading } = talentMatchSlice.actions;
export default talentMatchSlice.reducer;
