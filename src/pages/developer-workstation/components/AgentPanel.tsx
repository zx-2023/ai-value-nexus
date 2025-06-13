
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateAgentConfig } from '../../../store/slices/developerSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Code, Calendar, TrendingUp, FileText } from 'lucide-react';

const AgentPanel = () => {
  const dispatch = useDispatch();
  const { agentConfig } = useSelector((state: RootState) => state.developer);

  const handleConfigChange = (key: keyof typeof agentConfig, value: boolean) => {
    dispatch(updateAgentConfig({ [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI 智能助手
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="text-sm">代码助手</span>
            </div>
            <Switch
              checked={agentConfig.enableCodeAssistant}
              onCheckedChange={(checked) => handleConfigChange('enableCodeAssistant', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">日程管理</span>
            </div>
            <Switch
              checked={agentConfig.enableScheduleManager}
              onCheckedChange={(checked) => handleConfigChange('enableScheduleManager', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">收益跟踪</span>
            </div>
            <Switch
              checked={agentConfig.enableEarningsTracker}
              onCheckedChange={(checked) => handleConfigChange('enableEarningsTracker', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">自动简历</span>
            </div>
            <Switch
              checked={agentConfig.enableAutoResume}
              onCheckedChange={(checked) => handleConfigChange('enableAutoResume', checked)}
            />
          </div>
        </div>

        {agentConfig.enableCodeAssistant && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">代码助手激活</span>
                <Badge variant="secondary">在线</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                AI 助手正在分析你的代码，提供智能建议和错误检测
              </p>
              <Button size="sm" variant="outline">
                打开代码助手
              </Button>
            </CardContent>
          </Card>
        )}

        {agentConfig.enableScheduleManager && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">今日日程</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>支付集成开发</span>
                  <span className="text-muted-foreground">09:00-12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>代码审核会议</span>
                  <span className="text-muted-foreground">14:00-15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>项目进度同步</span>
                  <span className="text-muted-foreground">16:00-16:30</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentPanel;
