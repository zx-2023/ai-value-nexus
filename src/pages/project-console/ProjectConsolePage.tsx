
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchProjects, fetchBillingRecords } from '../../store/slices/projectSlice';
import ProjectOverview from './components/ProjectOverview';
import ProjectList from './components/ProjectList';
import BillingPanel from './components/BillingPanel';
import ProjectDetails from './components/ProjectDetails';
import CommunicationPanel from './components/CommunicationPanel';
import AcceptancePanel from './components/AcceptancePanel';
import NotificationCenter from './components/NotificationCenter';

const ProjectConsolePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, selectedProject } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchBillingRecords());
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
          <h1 className="text-3xl font-bold text-foreground mb-2">项目控制台</h1>
          <p className="text-muted-foreground">
            实时监控项目进度、管理交付物和账单
          </p>
        </div>

        <ProjectOverview />

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Left Column - Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {selectedProject ? <ProjectDetails /> : <ProjectList />}
            
            {/* Communication and Acceptance Panels */}
            {selectedProject && (
              <>
                <CommunicationPanel />
                <AcceptancePanel />
              </>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <NotificationCenter />
            <BillingPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectConsolePage;
