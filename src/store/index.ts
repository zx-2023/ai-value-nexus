
import { configureStore } from '@reduxjs/toolkit';
import talentMatchSlice from './slices/talentMatchSlice';
import aiStudioSlice from './slices/aiStudioSlice';
import sandboxSlice from './slices/sandboxSlice';
import authSlice from './slices/authSlice';
import projectSlice from './slices/projectSlice';
import developerSlice from './slices/developerSlice';
import resumeSlice from './slices/resumeSlice';

export const store = configureStore({
  reducer: {
    talentMatch: talentMatchSlice,
    aiStudio: aiStudioSlice,
    sandbox: sandboxSlice,
    auth: authSlice,
    project: projectSlice,
    developer: developerSlice,
    resume: resumeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
