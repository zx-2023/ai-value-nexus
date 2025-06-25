
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, FileText, AlertTriangle, Send } from 'lucide-react';

const CommunicationPanel = () => {
  const [message, setMessage] = useState('');
  const { selectedProject } = useSelector((state: RootState) => state.project);

  const mockCommunications = [
    {
      id: '1',
      type: 'message',
      sender: '张开发者',
      content: '支付模块已完成初版，请查看 /payment 路由',
      timestamp: '2024-01-15 14:30',
      projectId: '1'
    },
    {
      id: '2',
      type: 'srd-change',
      sender: '系统',
      content: 'SRD 文档已更新：新增支付宝支付方式',
      timestamp: '2024-01-15 10:20',
      projectId: '1'
    },
    {
      id: '3',
      type: 'feedback',
      sender: '李产品',
      content: '登录界面的UI需要调整，请参考最新设计稿',
      timestamp: '2024-01-14 16:45',
      projectId: '1'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // 这里会dispatch到Redux store
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'srd-change':
        return <FileText className="h-4 w-4" />;
      case 'feedback':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'srd-change':
        return <Badge variant="secondary">SRD变更</Badge>;
      case 'feedback':
        return <Badge variant="destructive">反馈</Badge>;
      default:
        return <Badge variant="default">消息</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          项目沟通
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">实时沟通</TabsTrigger>
            <TabsTrigger value="documents">文档共享</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <ScrollArea className="h-80 w-full border rounded-md p-4">
              <div className="space-y-4">
                {mockCommunications.map((comm) => (
                  <div key={comm.id} className="flex flex-col space-y-2 border-b pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(comm.type)}
                        <span className="font-medium text-sm">{comm.sender}</span>
                        {getTypeBadge(comm.type)}
                      </div>
                      <span className="text-xs text-muted-foreground">{comm.timestamp}</span>
                    </div>
                    <p className="text-sm">{comm.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                placeholder="输入消息..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">项目需求文档 v2.1</span>
                </div>
                <Button variant="outline" size="sm">查看</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">UI设计稿 - 最新版</span>
                </div>
                <Button variant="outline" size="sm">下载</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
