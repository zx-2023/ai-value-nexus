
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import ChatArea from './components/ChatArea';
import SRDPreview from './components/SRDPreview';
import VersionHistory from './components/VersionHistory';
import BudgetTimeline from './components/BudgetTimeline';

const AIStudioPage = () => {
  const { currentSRD } = useSelector((state: RootState) => state.aiStudio);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI 需求工坊</h1>
          <p className="text-muted-foreground">
            让 AI 助手帮您将想法转化为精准的软件需求文档
          </p>
        </div>

        <BudgetTimeline 
          budget={currentSRD.budgetRange}
          timeline={currentSRD.timelineWeeks}
        />

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Chat Area - 4/12 columns */}
          <div className="col-span-12 lg:col-span-4">
            <ChatArea />
          </div>

          {/* SRD Preview - 5/12 columns */}
          <div className="col-span-12 lg:col-span-5">
            <SRDPreview />
          </div>

          {/* Version History - 3/12 columns */}
          <div className="col-span-12 lg:col-span-3">
            <VersionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudioPage;
