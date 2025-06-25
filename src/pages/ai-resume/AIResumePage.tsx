import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, LayoutTemplate, MessageSquare, Brain } from 'lucide-react';
import ResumeBuilder from '../developer-workstation/components/ResumeBuilder';
import TemplateMarket from './components/TemplateMarket';
import ExperienceMining from './components/ExperienceMining';
import AIModelConfig from './components/AIModelConfig';

const AIResumePage = () => {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI 简历工作站</h1>
          <p className="text-muted-foreground">
            使用 AI 驱动的工具提升你的简历和职业发展
          </p>
        </div>

        <Tabs defaultValue="resume-builder" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resume-builder">
              <FileText className="w-4 h-4 mr-2" />简历制作
            </TabsTrigger>
            <TabsTrigger value="template-market">
              <LayoutTemplate className="w-4 h-4 mr-2" />模板市场
            </TabsTrigger>
            <TabsTrigger value="experience-mining">
              <MessageSquare className="w-4 h-4 mr-2" />经历深挖
            </TabsTrigger>
            <TabsTrigger value="ai-config">
              <Brain className="w-4 h-4 mr-2 text-primary animate-pulse" />大模型配置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resume-builder">
            <ResumeBuilder />
          </TabsContent>

          <TabsContent value="template-market">
            <TemplateMarket />
          </TabsContent>

          <TabsContent value="experience-mining">
            <ExperienceMining />
          </TabsContent>

          <TabsContent value="ai-config">
            <AIModelConfig />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIResumePage; 