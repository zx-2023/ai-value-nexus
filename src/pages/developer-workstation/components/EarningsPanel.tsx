
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Clock } from 'lucide-react';

const EarningsPanel = () => {
  const { earnings, stats } = useSelector((state: RootState) => state.developer);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          收益统计
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <p className="text-sm text-muted-foreground">总收益</p>
            <p className="text-lg font-bold">${stats.totalEarnings.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Clock className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
            <p className="text-sm text-muted-foreground">待收</p>
            <p className="text-lg font-bold">${stats.pendingEarnings.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">最近收益</h4>
          {earnings.slice(0, 3).map((earning) => (
            <div key={earning.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <p className="text-sm font-medium">${earning.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{earning.projectName}</p>
                <p className="text-xs text-muted-foreground">{earning.description}</p>
              </div>
              <div className="text-right">
                <Badge className={earning.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}>
                  {earning.status === 'paid' ? '已支付' : '待支付'}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(earning.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsPanel;
