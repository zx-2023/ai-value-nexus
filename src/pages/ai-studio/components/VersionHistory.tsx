
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, GitBranch } from 'lucide-react';

const VersionHistory = () => {
  const { srdHistory } = useSelector((state: RootState) => state.aiStudio);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return '刚刚';
    if (diffInMinutes < 60) return `${diffInMinutes}分钟前`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}小时前`;
    return `${Math.floor(diffInMinutes / 1440)}天前`;
  };

  const getChangeType = (index: number) => {
    if (index === 0) return '初始版本';
    const changes = ['更新技术架构', '完善功能清单', '优化用户体验', '添加测试策略'];
    return changes[index % changes.length];
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          版本历史
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-3 py-4">
            {srdHistory.map((version, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">版本 {srdHistory.length - index}</span>
                  {index === 0 && (
                    <Badge variant="default" className="text-xs">
                      当前
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {getChangeType(index)}
                </p>
                
                <div className="text-xs text-muted-foreground mb-3">
                  {formatTimeAgo(new Date(Date.now() - index * 30 * 60 * 1000))}
                </div>

                <div className="space-y-1">
                  <div className="text-xs">
                    <span className="text-green-600">+{Math.floor(Math.random() * 50 + 10)}</span>
                    <span className="mx-1 text-muted-foreground">/</span>
                    <span className="text-red-600">-{Math.floor(Math.random() * 20 + 5)}</span>
                    <span className="ml-2 text-muted-foreground">行变更</span>
                  </div>
                </div>

                {index !== 0 && (
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <span className="text-xs">查看差异</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
