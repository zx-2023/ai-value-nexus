import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { 
  updateAgentConfig, 
  addAssistantItem, 
  updateAssistantItem, 
  markActionAsDone, 
  setActiveAssistantTab,
  AssistantItem 
} from '../../../store/slices/developerSlice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import FloatingChatPanel from '@/components/ui/floating-chat-panel';
import { 
  Bot, 
  Code, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ExternalLink,
  ListTodo,
  MessageCircle,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: string;
}

const FloatingAgentPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { agentConfig, assistantItems, activeAssistantTab } = useSelector(
    (state: RootState) => state.developer
  );
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '你好！我是您的AI开发助手，可以帮您分析代码、提供建议、跟踪任务。有什么可以帮助您的吗？',
      type: 'assistant',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Mock data for demonstration
  useEffect(() => {
    if (assistantItems.length === 0) {
      const mockItems: AssistantItem[] = [
        {
          id: '1',
          type: 'action',
          title: '优化登录页面性能',
          status: 'pending',
          eta: '2小时',
          updatedAt: new Date().toISOString(),
          sandboxLink: '/sandbox?file=src/pages/Login.tsx&focusLine=45'
        },
        {
          id: '2',
          type: 'done',
          title: '修复购物车计算逻辑',
          status: 'done',
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          sandboxLink: '/sandbox?file=src/components/Cart.tsx&focusLine=120'
        },
        {
          id: '3',
          type: 'alert',
          title: 'API接口响应时间过长',
          severity: 'high',
          updatedAt: new Date().toISOString(),
          sandboxLink: '/sandbox?file=src/api/userService.ts&focusLine=25'
        }
      ];
      mockItems.forEach(item => dispatch(addAssistantItem(item)));
    }
  }, [dispatch, assistantItems.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      type: 'user',
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        '我来帮您分析一下这个问题...',
        '根据您的描述，我建议采用以下步骤来解决：',
        '让我为您创建一个行动计划。'
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: 'assistant',
        timestamp: new Date().toISOString()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Auto-generate an action item based on user input
      if (inputMessage.includes('修复') || inputMessage.includes('优化') || inputMessage.includes('问题')) {
        const newAction: AssistantItem = {
          id: Date.now().toString(),
          type: 'action',
          title: `处理: ${inputMessage}`,
          status: 'pending',
          eta: '1-2小时',
          updatedAt: new Date().toISOString(),
          sandboxLink: '/sandbox?file=src/App.tsx&focusLine=1'
        };
        dispatch(addAssistantItem(newAction));
        
        toast({
          title: "已创建行动建议",
          description: "AI已基于您的问题创建了行动计划"
        });
      }
    }, 1000);
  };

  const handleMarkAsDone = (itemId: string) => {
    dispatch(markActionAsDone(itemId));
    toast({
      title: "任务已完成",
      description: "已将任务移至完成列表"
    });
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getTabCounts = () => {
    const actions = assistantItems.filter(item => item.type === 'action').length;
    const done = assistantItems.filter(item => item.type === 'done').length;
    const alerts = assistantItems.filter(item => item.type === 'alert').length;
    return { actions, done, alerts };
  };

  const tabCounts = getTabCounts();

  return (
    <FloatingChatPanel
      title="AI 智能助手"
      icon={<Bot className="h-5 w-5" />}
      position="bottom-right"
      defaultMinimized={true}
    >
      <Tabs 
        value={activeAssistantTab} 
        onValueChange={(value) => dispatch(setActiveAssistantTab(value as any))}
        className="h-full flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-4 flex-shrink-0">
          <TabsTrigger value="chat" className="flex items-center gap-1 text-xs">
            <MessageCircle className="h-3 w-3" />
            对话
          </TabsTrigger>
          <TabsTrigger value="action" className="flex items-center gap-1 text-xs">
            <ListTodo className="h-3 w-3" />
            行动
            {tabCounts.actions > 0 && (
              <Badge className="ml-1 h-4 w-4 p-0 text-xs">{tabCounts.actions}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="done" className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-3 w-3" />
            完成
            {tabCounts.done > 0 && (
              <Badge className="ml-1 h-4 w-4 p-0 text-xs bg-secondary text-secondary-foreground">{tabCounts.done}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alert" className="flex items-center gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            预警
            {tabCounts.alerts > 0 && (
              <Badge className="ml-1 h-4 w-4 p-0 text-xs bg-destructive text-destructive-foreground">{tabCounts.alerts}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden mt-4">
          <TabsContent value="chat" className="h-full m-0">
            <div className="h-full flex flex-col space-y-4">
              <ScrollArea className="flex-1 border rounded-lg p-3">
                <div className="space-y-3">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'assistant' && (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.type === 'user' && (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 justify-start">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-2 rounded-lg text-sm">
                        正在输入...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="flex gap-2 flex-shrink-0">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="描述您遇到的问题..."
                  className="min-h-[50px] resize-none text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="action" className="h-full m-0">
            <div className="h-full flex flex-col space-y-3">
              <div className="flex justify-between items-center flex-shrink-0">
                <span className="text-sm font-medium">待处理行动建议</span>
                {tabCounts.actions > 0 && (
                  <Button className="text-xs h-7 bg-outline">
                    同步Jira
                  </Button>
                )}
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {assistantItems
                    .filter(item => item.type === 'action')
                    .map(item => (
                      <Card key={item.id} className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2 flex-1">
                            <Checkbox
                              checked={item.status === 'done'}
                              onCheckedChange={() => handleMarkAsDone(item.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{item.title}</p>
                              {item.eta && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">预计: {item.eta}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {item.sandboxLink && (
                            <Button 
                              className="text-xs h-7"
                              onClick={() => window.open(item.sandboxLink, '_blank')}
                            >
                              详情
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  {assistantItems.filter(item => item.type === 'action').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <ListTodo className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">暂无行动建议</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="done" className="h-full m-0">
            <div className="h-full flex flex-col space-y-3">
              <span className="text-sm font-medium flex-shrink-0">已完成事项</span>
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {assistantItems
                    .filter(item => item.type === 'done')
                    .map(item => (
                      <Card key={item.id} className="p-3 bg-green-50 border-green-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(item.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {item.sandboxLink && (
                            <Button 
                              className="text-xs h-7"
                              onClick={() => window.open(item.sandboxLink, '_blank')}
                            >
                              <Code className="h-3 w-3 mr-1" />
                              代码
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  {assistantItems.filter(item => item.type === 'done').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">暂无已完成事项</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="alert" className="h-full m-0">
            <div className="h-full flex flex-col space-y-3">
              <span className="text-sm font-medium flex-shrink-0">预警信息</span>
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {assistantItems
                    .filter(item => item.type === 'alert')
                    .map(item => (
                      <Card key={item.id} className={`p-3 border-l-4 ${getSeverityColor(item.severity)}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${
                              item.severity === 'high' ? 'text-red-600' :
                              item.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                            }`} />
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(item.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {item.sandboxLink && (
                            <Button 
                              className="text-xs h-7"
                              onClick={() => window.open(item.sandboxLink, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              修复
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  {assistantItems.filter(item => item.type === 'alert').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">暂无预警信息</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </FloatingChatPanel>
  );
};

export default FloatingAgentPanel; 