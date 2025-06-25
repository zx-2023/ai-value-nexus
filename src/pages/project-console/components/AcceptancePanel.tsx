
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertTriangle, FileCheck } from 'lucide-react';

const AcceptancePanel = () => {
  const { selectedProject } = useSelector((state: RootState) => state.project);

  const mockAcceptanceTasks = [
    {
      id: '1',
      title: '用户注册登录功能',
      description: '完成用户注册、登录、密码重置功能',
      status: 'completed',
      dueDate: '2024-01-10',
      completedDate: '2024-01-09',
      testsPassed: 15,
      testsTotal: 15,
      checklist: [
        { item: '注册功能正常', completed: true },
        { item: '登录验证通过', completed: true },
        { item: '密码重置功能', completed: true },
        { item: 'UI界面符合设计', completed: true }
      ]
    },
    {
      id: '2',
      title: '支付模块集成',
      description: '集成微信和支付宝支付功能',
      status: 'pending',
      dueDate: '2024-01-20',
      testsPassed: 8,
      testsTotal: 12,
      checklist: [
        { item: '微信支付集成', completed: true },
        { item: '支付宝支付集成', completed: true },
        { item: '支付回调处理', completed: false },
        { item: '退款功能', completed: false }
      ]
    },
    {
      id: '3',
      title: '商品管理系统',
      description: '商品CRUD、分类管理、库存管理',
      status: 'overdue',
      dueDate: '2024-01-15',
      testsPassed: 3,
      testsTotal: 10,
      checklist: [
        { item: '商品添加功能', completed: true },
        { item: '商品编辑功能', completed: true },
        { item: '分类管理', completed: false },
        { item: '库存管理', completed: false }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">已验收</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">待验收</Badge>;
      case 'overdue':
        return <Badge variant="destructive">逾期</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          验收管理
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockAcceptanceTasks.map((task) => (
          <div key={task.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(task.status)}
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
              </div>
              {getStatusBadge(task.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">截止日期：</span>
                <span className={task.status === 'overdue' ? 'text-red-500' : ''}>
                  {task.dueDate}
                </span>
              </div>
              {task.completedDate && (
                <div>
                  <span className="text-muted-foreground">完成日期：</span>
                  <span>{task.completedDate}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>测试通过率</span>
                <span>{task.testsPassed}/{task.testsTotal}</span>
              </div>
              <Progress value={(task.testsPassed / task.testsTotal) * 100} />
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium">验收清单</h5>
              <div className="space-y-1">
                {task.checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle 
                      className={`h-4 w-4 ${item.completed ? 'text-green-500' : 'text-gray-300'}`} 
                    />
                    <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {task.status === 'pending' && (
                <>
                  <Button size="sm" variant="outline">查看详情</Button>
                  <Button size="sm">开始验收</Button>
                </>
              )}
              {task.status === 'completed' && (
                <Button size="sm" variant="outline">查看验收报告</Button>
              )}
              {task.status === 'overdue' && (
                <>
                  <Button size="sm" variant="destructive">催促开发</Button>
                  <Button size="sm" variant="outline">调整截止时间</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AcceptancePanel;
