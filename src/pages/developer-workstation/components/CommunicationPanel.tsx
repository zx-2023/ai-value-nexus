
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Bell, FileText } from 'lucide-react';

const CommunicationPanel = () => {
  const mockMessages = [
    {
      id: '1',
      project: 'E-commerce Platform',
      sender: 'Tech Corp',
      message: 'SRD 更新：支付流程需要添加退款功能',
      timestamp: '10分钟前',
      type: 'srd-update',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop'
    },
    {
      id: '2',
      project: 'E-commerce Platform',
      sender: 'John Manager',
      message: '请在明天前完成支付集成的测试',
      timestamp: '1小时前',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    {
      id: '3',
      project: 'Analytics Dashboard',
      sender: 'Data Inc',
      message: '图表组件已通过审核，可以进入下一阶段',
      timestamp: '2小时前',
      type: 'approval',
      avatar: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'srd-update':
        return <FileText className="h-3 w-3" />;
      case 'approval':
        return <Bell className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'srd-update':
        return 'bg-blue-500';
      case 'approval':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          实时沟通
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockMessages.map((msg) => (
          <div key={msg.id} className="border rounded-lg p-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{msg.sender}</span>
                  <Badge className={`${getTypeColor(msg.type)} text-xs`}>
                    {getTypeIcon(msg.type)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{msg.project}</p>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{msg.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
        
        <Button className="w-full" variant="outline">
          查看所有消息
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
