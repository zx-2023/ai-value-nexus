
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateTaskStatus } from '../../../store/slices/developerSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Calendar, User } from 'lucide-react';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const { tasks, stats } = useSelector((state: RootState) => state.developer);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'review':
        return 'bg-purple-500';
      case 'todo':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'review':
        return '待审核';
      case 'todo':
        return '待开始';
      default:
        return '未知';
    }
  };

  const handleStatusChange = (taskId: string, newStatus: any) => {
    dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>我的任务</span>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>活跃: {stats.activeTasks}</span>
            <span>已完成: {stats.completedTasks}</span>
            <span>总工时: {stats.totalHours}h</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{task.projectName}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.actualHours}h / {task.estimatedHours}h
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Badge className={getStatusColor(task.status)}>
                    {getStatusText(task.status)}
                  </Badge>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>进度</span>
                  <span>{Math.round((task.actualHours / task.estimatedHours) * 100)}%</span>
                </div>
                <Progress 
                  value={(task.actualHours / task.estimatedHours) * 100} 
                  className="h-2" 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.client.avatar} />
                    <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{task.client.name}</span>
                </div>

                <div className="flex gap-2">
                  {task.status === 'todo' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(task.id, 'in-progress')}
                    >
                      开始
                    </Button>
                  )}
                  {task.status === 'in-progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(task.id, 'review')}
                    >
                      提交审核
                    </Button>
                  )}
                  {task.status === 'review' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled
                    >
                      等待审核
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default TaskDashboard;
