
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchDeveloperTasks, fetchEarnings } from '../../store/slices/developerSlice';
import TaskDashboard from './components/TaskDashboard';
import AgentPanel from './components/AgentPanel';
import CommunicationPanel from './components/CommunicationPanel';
import EarningsPanel from './components/EarningsPanel';
import ResumeBuilder from './components/ResumeBuilder';

const DeveloperWorkstationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.developer);

  useEffect(() => {
    dispatch(fetchDeveloperTasks());
    dispatch(fetchEarnings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">开发者工作台</h1>
          <p className="text-muted-foreground">
            管理任务、智能助手和沟通协作的一站式工作台
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <TaskDashboard />
            <AgentPanel />
            <ResumeBuilder />
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <CommunicationPanel />
            <EarningsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperWorkstationPage;
