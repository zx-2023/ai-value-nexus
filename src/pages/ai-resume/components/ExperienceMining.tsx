import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Briefcase, User, Send, Bot, Lightbulb, Target } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Experience {
  id: string;
  type: 'project' | 'work';
  title: string;
  content: string;
}

const ExperienceMining = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [experienceContent, setExperienceContent] = useState('');
  const [chatMode, setChatMode] = useState<'mining' | 'interview'>('mining');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // 模拟经历数据
  const mockExperiences: Experience[] = [
    {
      id: '1',
      type: 'project',
      title: '项目: 电商平台开发',
      content: '项目简介：基于React和Node.js的电商平台\n项目描述：独立完成前端架构设计，实现用户购物流程，集成支付系统，优化页面性能。'
    },
    {
      id: '2',
      type: 'project', 
      title: '项目: 数据可视化平台',
      content: '项目简介：企业级数据分析与可视化平台\n项目描述：使用React和D3.js构建交互式图表，处理大数据量展示，实现实时数据更新。'
    },
    {
      id: '3',
      type: 'work',
      title: '工作: 字节跳动',
      content: '公司名称：字节跳动\n职位：前端开发工程师\n工作内容：负责抖音创作者中心前端开发，优化视频上传体验，参与移动端适配。'
    },
    {
      id: '4',
      type: 'work',
      title: '工作: 腾讯科技',
      content: '公司名称：腾讯科技\n职位：全栈开发工程师\n工作内容：参与微信小程序后台系统开发，负责API设计和数据库优化。'
    }
  ];

  const handleExperienceChange = (value: string) => {
    setSelectedExperience(value);
    const experience = mockExperiences.find(exp => exp.id === value);
    if (experience) {
      setExperienceContent(experience.content);
    }
  };

  const handleStartChat = () => {
    if (!jobDescription.trim() || !experienceContent.trim()) {
      toast({
        title: "信息不完整",
        description: "请先输入岗位JD和选择经历",
        variant: "destructive"
      });
      return;
    }

    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: chatMode === 'mining' 
        ? `你好！我是你的AI经历深挖助手。我已经分析了你提供的岗位JD和项目经历。让我帮你深度挖掘这段经历的亮点，让它更符合目标岗位的要求。

**分析要点：**
• 技术匹配度分析
• 业务价值量化
• 项目难点与解决方案
• 团队协作与领导力展现

你希望我从哪个角度开始深挖这段经历？`
        : `你好！我是你的AI面试官。基于你提供的岗位JD和项目经历，我将模拟真实的技术面试场景。

**面试重点：**
• 技术深度与广度
• 问题解决思路
• 项目管理能力
• 团队合作经验

准备好了吗？我们开始第一个问题：请详细介绍一下这个项目的技术架构和你在其中的核心贡献。`,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(currentMessage, chatMode),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, mode: 'mining' | 'interview'): string => {
    if (mode === 'mining') {
      return `很好的分享！基于你的描述，我建议从以下几个方面进一步优化：

**量化成果：**
• 具体的性能提升数据（如页面加载速度提升40%）
• 用户数量或业务指标的改善
• 技术债务减少的具体体现

**技术亮点：**
• 采用的创新技术方案
• 解决的技术难点和挑战
• 架构设计的前瞻性考虑

**团队影响：**
• 对团队成员的技术指导
• 推动的流程优化或标准制定
• 跨部门协作的具体案例

你能详细说说其中某个技术难点是如何解决的吗？`;
    } else {
      return `回答得不错！作为面试官，我想进一步了解：

**技术深度追问：**
• 在这个项目中遇到的最大技术挑战是什么？
• 如果重新设计这个系统，你会有什么不同的考虑？
• 性能优化的具体方案和效果如何量化？

**团队协作：**
• 如何处理与后端或产品团队的分歧？
• 在项目紧急情况下是如何应对的？

请选择其中一个问题详细回答。`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          经历深挖
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          通过AI对话深入挖掘项目和工作经历，提炼匹配岗位要求的亮点
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* 左侧：AI对话区 */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">对话模式：</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={chatMode === 'mining' ? 'default' : 'outline'}
                    onClick={() => setChatMode('mining')}
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    经历深挖
                  </Button>
                  <Button
                    size="sm"
                    variant={chatMode === 'interview' ? 'default' : 'outline'}
                    onClick={() => setChatMode('interview')}
                  >
                    <Target className="h-4 w-4 mr-1" />
                    模拟面试
                  </Button>
                </div>
              </div>
            </div>

            {/* 聊天消息区域 */}
            <div className="flex-1 border rounded-lg p-4 overflow-y-auto bg-muted/20 mb-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">选择对话模式并开始深挖经历</p>
                    <p className="text-sm text-muted-foreground">
                      {chatMode === 'mining' ? '经历深挖模式：AI会帮你优化和提炼经历亮点' : '模拟面试模式：AI面试官会针对你的经历进行深度提问'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}>
                          {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-background border'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-background border rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 消息输入区 */}
            <div className="flex gap-2">
              <Textarea
                placeholder={messages.length === 0 ? "先在右侧输入岗位JD和选择经历，然后开始对话..." : "输入你的回答或问题..."}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-1"
                rows={2}
                disabled={messages.length === 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage} disabled={!currentMessage.trim() || messages.length === 0}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 右侧：输入区域 */}
          <div className="space-y-4">
            {/* 岗位JD输入 */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <Briefcase className="h-4 w-4" />
                岗位 JD
                <span className="text-xs text-muted-foreground">（岗位要求）</span>
              </label>
              <Textarea
                placeholder="请输入目标岗位的职位描述和要求..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="h-32"
              />
            </div>

            {/* 经历选择 */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                选择经历
                <span className="text-xs text-muted-foreground ml-2">（选择一段经历深挖）</span>
              </label>
              <Select value={selectedExperience} onValueChange={handleExperienceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择经历" />
                </SelectTrigger>
                <SelectContent>
                  {mockExperiences.map(exp => (
                    <SelectItem key={exp.id} value={exp.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {exp.type === 'project' ? '项目' : '工作'}
                        </Badge>
                        {exp.title}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 经历内容 */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                经历详情
                <span className="text-xs text-muted-foreground ml-2">（建议一次深挖一段经历）</span>
              </label>
              <Textarea
                placeholder="请输入项目/实习/工作经历的详细描述..."
                value={experienceContent}
                onChange={(e) => setExperienceContent(e.target.value)}
                className="h-32"
              />
            </div>

            {/* 开始对话按钮 */}
            {messages.length === 0 && (
              <Button onClick={handleStartChat} className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                开始 {chatMode === 'mining' ? '经历深挖' : '模拟面试'}
              </Button>
            )}

            {/* 重新开始按钮 */}
            {messages.length > 0 && (
              <Button onClick={() => setMessages([])} variant="outline" className="w-full">
                重新开始对话
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceMining; 