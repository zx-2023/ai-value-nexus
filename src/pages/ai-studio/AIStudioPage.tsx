import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import SRDPreview from './components/SRDPreview';
import VersionHistory from './components/VersionHistory';
import BudgetTimeline from './components/BudgetTimeline';
import EnterpriseFloatingChat from './components/EnterpriseFloatingChat';

const AIStudioPage = () => {
  const { currentSRD } = useSelector((state: RootState) => state.aiStudio);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">AI 需求工坊</h1>
              <p className="text-muted-foreground text-lg">
                让 AI 助手帮您将想法转化为精准的软件需求文档
              </p>
            </div>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <EnterpriseFloatingChat onMessageSent={() => {}} />

        {/* Budget Timeline */}
        <BudgetTimeline 
          budget={currentSRD.budgetRange}
          timeline={currentSRD.timelineWeeks}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6 mt-8">
          {/* SRD Preview - Main Content Area (8/12) */}
          <div className="col-span-12 lg:col-span-8">
            <SRDPreview />
          </div>

          {/* Version History - Sidebar (4/12) */}
          <div className="col-span-12 lg:col-span-4">
            <VersionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudioPage;
