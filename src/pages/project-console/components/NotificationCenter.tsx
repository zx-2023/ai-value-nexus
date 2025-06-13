
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const NotificationCenter = () => {
  const mockNotifications = [
    {
      id: '1',
      type: 'urgent',
      title: '项目 E-commerce Platform 验收逾期',
      message: '商品管理系统模块已逾期2天，请及时跟进',
      timestamp: '5分钟前',
      read: false
    },
    {
      id: '2',
      type: 'important',
      title: '新的SRD变更需要确认',
      message: '开发者提出支付模块技术方案调整建议',
      timestamp: '1小时前',
      read: false
    },
    {
      id: '3',
      type: 'normal',
      title: '测试报告已生成',
      message: '用户注册登录功能测试通过率100%',
      timestamp: '3小时前',
      read: true
    },
    {
      id: '4',
      type: 'important',
      title: '里程碑即将到期',
      message: 'MVP版本开发将在3天后到期',
      timestamp: '1天前',
      read: true
    },
    {
      id: '5',
      type: 'normal',
      title: '开发者提交了新版本',
      message: '支付模块 v1.2 已提交，包含bug修复',
      timestamp: '2天前',
      read: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'important':
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'urgent':
        return <Badge variant="destructive">紧急</Badge>;
      case 'important':
        return <Badge className="bg-yellow-500">重要</Badge>;
      default:
        return <Badge variant="secondary">普通</Badge>;
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            通知中心
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="outline" size="sm">
            标记全部已读
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
          <div className="space-y-3">
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 border rounded-lg ${
                  !notification.read ? 'bg-muted/50 border-primary/20' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getTypeIcon(notification.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className={`text-sm font-medium ${
                          !notification.read ? 'font-semibold' : ''
                        }`}>
                          {notification.title}
                        </h5>
                        {getTypeBadge(notification.type)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
