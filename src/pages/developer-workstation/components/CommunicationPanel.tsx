import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Bell, FileText, Pin, MessageCircle } from 'lucide-react';

const CommunicationPanel = () => {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  const mockMessages = [
    {
      id: '1',
      project: 'E-commerce Platform',
      sender: 'Tech Corp',
      message: '支付接口的错误处理需要优化一下...',
      timestamp: '2分钟前',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
      unread: 2,
      pinned: true,
      projectTag: '支付集成项目'
    },
    {
      id: '2',
      project: 'Analytics Dashboard',
      sender: 'Data Inc',
      message: '图表数据展示很棒！可以部署了',
      timestamp: '15分钟前',
      type: 'approval',
      avatar: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
      unread: 0,
      pinned: false,
      projectTag: '数据可视化项目'
    },
    {
      id: '3',
      project: 'Mobile App',
      sender: 'Mobile Corp',
      message: 'UI界面设计已确认，请开始开发',
      timestamp: '1小时前',
      type: 'srd-update',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      unread: 1,
      pinned: false,
      projectTag: '移动应用项目'
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

  // 筛选和排序消息
  const filteredMessages = mockMessages
    .filter(msg => !showUnreadOnly || msg.unread > 0)
    .sort((a, b) => {
      // 置顶消息优先
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // 有未读消息的优先
      if (a.unread > 0 && b.unread === 0) return -1;
      if (a.unread === 0 && b.unread > 0) return 1;
      return 0;
    });

  return (
    <Card className="bg-background border-muted">
      <CardHeader className="border-b border-muted">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MessageCircle className="h-5 w-5 text-green-600" />
            实时沟通
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showUnreadOnly ? '显示全部' : '置顶未读'}
            </Button>
            <Button className="text-sm text-muted-foreground hover:text-foreground">
              全部已读
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {filteredMessages.map((msg) => (
          <div 
            key={msg.id} 
            className="bg-muted/50 p-3 rounded-lg border border-muted hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground text-sm">{msg.sender}</h4>
                    {msg.pinned && (
                      <Pin className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {msg.unread > 0 && (
                      <>
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-xs text-red-600 font-medium">{msg.unread}</span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  <span className="text-xs text-blue-600">{msg.projectTag}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>暂无{showUnreadOnly ? '未读' : ''}消息</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunicationPanel;
