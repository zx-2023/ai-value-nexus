
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';

interface BudgetTimelineProps {
  budget: {
    min: number;
    max: number;
    confidence: number;
  };
  timeline: {
    min: number;
    max: number;
    confidence: number;
  };
}

const BudgetTimeline: React.FC<BudgetTimelineProps> = ({ budget, timeline }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">预算预测</h3>
              <p className="text-sm text-muted-foreground">基于功能复杂度分析</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">预估范围</span>
              <span className="font-semibold">
                {formatCurrency(budget.min)} - {formatCurrency(budget.max)}
              </span>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">置信度</span>
                <span className="text-sm font-medium">{budget.confidence}%</span>
              </div>
              <Progress value={budget.confidence} className="h-2" />
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>基于类似项目历史数据预测</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">时间预测</h3>
              <p className="text-sm text-muted-foreground">包含开发、测试和部署</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">预估周期</span>
              <span className="font-semibold">
                {timeline.min} - {timeline.max} 周
              </span>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">置信度</span>
                <span className="text-sm font-medium">{timeline.confidence}%</span>
              </div>
              <Progress value={timeline.confidence} className="h-2" />
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>基于团队经验和项目规模评估</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTimeline;
