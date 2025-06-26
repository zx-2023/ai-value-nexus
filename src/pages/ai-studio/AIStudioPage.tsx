
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SRDPreview from './components/SRDPreview';
import VersionHistory from './components/VersionHistory';
import BudgetTimeline from './components/BudgetTimeline';
import EnterpriseFloatingChat from './components/EnterpriseFloatingChat';
import SRDTemplateHub from './components/SRDTemplateHub';
import { FileText, History, LayoutTemplate } from 'lucide-react';

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

        {/* Main Content with Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="srd-preview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="srd-preview" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                需求文档
              </TabsTrigger>
              <TabsTrigger value="template-hub" className="flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4" />
                模板中心
              </TabsTrigger>
              <TabsTrigger value="version-history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                版本历史
              </TabsTrigger>
            </TabsList>

            <TabsContent value="srd-preview">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                  <SRDPreview />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="template-hub">
              <SRDTemplateHub />
            </TabsContent>

            <TabsContent value="version-history">
              <VersionHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIStudioPage;
