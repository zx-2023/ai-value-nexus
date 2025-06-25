import { useState } from 'react';
import FloatingChatPanel from '@/components/ui/floating-chat-panel';
import ChatArea from './ChatArea';
import { MessageCircle, Bot, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EnterpriseFloatingChatProps {
  onMessageSent?: () => void;
}

const EnterpriseFloatingChat = ({ onMessageSent }: EnterpriseFloatingChatProps) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const handleToggle = (minimized: boolean) => {
    setIsMinimized(minimized);
  };

  return (
    <FloatingChatPanel
      title="AI 对话助手"
      icon={<MessageCircle className="h-5 w-5" />}
      position="bottom-right"
      defaultMinimized={true}
      onToggle={handleToggle}
      className="bg-purple-600 hover:bg-purple-700"
    >
      <div className="h-full">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              对话
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-1">
              <Bot className="h-3 w-3" />
              建议
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              完成
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              预警
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 overflow-hidden">
            <ChatArea 
              onMessageSent={() => {
                onMessageSent?.();
              }} 
            />
          </TabsContent>
          
          <TabsContent value="suggestions" className="flex-1 overflow-y-auto p-4 space-y-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">智能优化建议</CardTitle>
                <CardDescription className="text-xs">基于当前项目数据分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="text-xs">效率提升</Badge>
                  <span className="text-xs">建议优化需求分析流程</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs">成本控制</Badge>
                  <span className="text-xs">预算使用率过高，需关注</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs">质量保证</Badge>
                  <span className="text-xs">增加代码审查环节</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="flex-1 overflow-y-auto p-4 space-y-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  已完成任务
                </CardTitle>
                <CardDescription className="text-xs">最近完成的项目和里程碑</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs p-2 bg-green-50 rounded">
                  ✓ 需求文档评审完成
                </div>
                <div className="text-xs p-2 bg-green-50 rounded">
                  ✓ 原型设计已确认
                </div>
                <div className="text-xs p-2 bg-green-50 rounded">
                  ✓ 技术栈选型完成
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="flex-1 overflow-y-auto p-4 space-y-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  风险预警
                </CardTitle>
                <CardDescription className="text-xs">需要关注的风险项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs p-2 bg-orange-50 border-l-2 border-orange-300 rounded">
                  ⚠️ 项目进度落后，需调整计划
                </div>
                <div className="text-xs p-2 bg-yellow-50 border-l-2 border-yellow-300 rounded">
                  ⚠️ 预算剩余不足30%
                </div>
                <div className="text-xs p-2 bg-red-50 border-l-2 border-red-300 rounded">
                  ⚠️ 关键依赖项存在风险
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FloatingChatPanel>
  );
};

export default EnterpriseFloatingChat; 