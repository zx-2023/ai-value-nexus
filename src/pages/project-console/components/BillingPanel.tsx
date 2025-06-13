
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BillingPanel = () => {
  const { billingRecords } = useSelector((state: RootState) => state.project);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'disputed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return '已支付';
      case 'pending':
        return '待支付';
      case 'disputed':
        return '争议中';
      default:
        return '未知';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>账单管理</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {billingRecords.map((record) => (
          <div key={record.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">${record.amount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{record.description}</p>
              </div>
              <Badge className={getStatusColor(record.status)}>
                {getStatusText(record.status)}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{new Date(record.date).toLocaleDateString()}</span>
              {record.invoice && (
                <Button variant="ghost" size="sm">
                  下载发票
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BillingPanel;
