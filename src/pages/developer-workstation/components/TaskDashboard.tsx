import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateTaskStatus, DeveloperTask } from '../../../store/slices/developerSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Calendar, User, MessageCircle, Eye } from 'lucide-react';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const { tasks, stats } = useSelector((state: RootState) => state.developer);
  
  // 筛选和排序状态
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

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

  // 扩展任务类型以支持未读消息和客户ID
  interface ExtendedTask extends DeveloperTask {
    unreadMessages?: number;
    client: {
      id?: string;
      name: string;
      avatar: string;
    };
  }

  // 获取统一的主要操作按钮
  const getMainAction = (task: ExtendedTask) => {
    switch (task.status) {
      case 'todo':
        return {
          text: '开始任务',
          variant: 'default' as const,
          onClick: () => handleStatusChange(task.id, 'in-progress')
        };
      case 'in-progress':
        return {
          text: '查看进度',
          variant: 'default' as const,
          onClick: () => handleViewProgress(task.id)
        };
      case 'review':
        return {
          text: '查看反馈',
          variant: 'outline' as const,
          onClick: () => handleViewFeedback(task.id)
        };
      case 'completed':
        return {
          text: '查看详情',
          variant: 'outline' as const,
          onClick: () => handleViewDetails(task.id)
        };
      default:
        return {
          text: '查看详情',
          variant: 'outline' as const,
          onClick: () => handleViewDetails(task.id)
        };
    }
  };

  // 筛选和排序逻辑
  const filteredAndSortedTasks = tasks
    .filter(task => statusFilter === 'all' || task.status === statusFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
                 (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'progress':
          const progressA = (a.actualHours / a.estimatedHours) * 100;
          const progressB = (b.actualHours / b.estimatedHours) * 100;
          return progressB - progressA;
        default:
          return 0;
      }
    })
    .map(task => ({
      ...task,
      unreadMessages: Math.floor(Math.random() * 3), // 模拟未读消息
      client: {
        ...task.client,
        id: task.projectId // 使用项目ID作为客户ID
      }
    } as ExtendedTask));

  const handleStatusChange = (taskId: string, newStatus: any) => {
    dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  const handleViewProgress = (taskId: string) => {
    // TODO: 打开里程碑详情侧边抽屉
    console.log('查看进度:', taskId);
  };

  const handleViewFeedback = (taskId: string) => {
    // TODO: 打开反馈详情
    console.log('查看反馈:', taskId);
  };

  const handleViewDetails = (taskId: string) => {
    // TODO: 打开任务详情
    console.log('查看详情:', taskId);
  };

  const handleStartChat = (clientId: string) => {
    // TODO: 打开聊天窗口
    console.log('进入聊天:', clientId);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="text-2xl font-bold">我的任务</CardTitle>
            <div className="flex items-center space-x-6 mt-2 text-sm text-muted-foreground">
              <span>活跃: <span className="font-semibold text-blue-600">{stats.activeTasks}</span></span>
              <span>已完成: <span className="font-semibold text-green-600">{stats.completedTasks}</span></span>
              <span>总工时: <span className="font-semibold">{stats.totalHours}h</span></span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* 状态筛选器 */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="in-progress">进行中</SelectItem>
                <SelectItem value="todo">待开始</SelectItem>
                <SelectItem value="review">待审核</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
            
            {/* 排序选择 */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">按优先级排序</SelectItem>
                <SelectItem value="dueDate">按截止时间排序</SelectItem>
                <SelectItem value="progress">按进度排序</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredAndSortedTasks.map((task) => {
          const mainAction = getMainAction(task);
          return (
            <Card key={task.id} className="hover:shadow-md transition-shadow duration-200 bg-muted/30 border-l-4 border-l-primary">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-foreground">{task.title}</h3>
                      <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                        {task.priority === 'urgent' ? '高优先级' : 
                         task.priority === 'high' ? '高优先级' :
                         task.priority === 'medium' ? '中优先级' : '低优先级'}
                      </Badge>
                      <Badge className={`${getStatusColor(task.status)} text-white`}>
                        {getStatusText(task.status)}
                      </Badge>
                      {/* 未读消息提示 */}
                      {task.unreadMessages && (
                        <span className="text-sm text-muted-foreground flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-1"></span>
                          未读消息 {task.unreadMessages}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                    
                    {/* 进度条 */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex-1">
                        <Progress 
                          value={(task.actualHours / task.estimatedHours) * 100} 
                          className="h-2" 
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {task.actualHours}h / {task.estimatedHours}h ({Math.round((task.actualHours / task.estimatedHours) * 100)}%)
                      </span>
                    </div>
                    
                    {/* 标签和截止日期 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                                               {task.tags.slice(0, 3).map((tag) => (
                         <Badge key={tag} className="text-xs bg-secondary text-secondary-foreground">
                           {tag}
                         </Badge>
                       ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        截止: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* 客户头像和操作按钮 */}
                  <div className="ml-4 flex flex-col items-center space-y-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={task.client.avatar} />
                      <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                    </Avatar>
                                         <div className="flex flex-col space-y-2">
                       <Button 
                         variant={mainAction.variant}
                         onClick={mainAction.onClick}
                         className="w-20 text-sm px-2 py-1"
                       >
                         {mainAction.text}
                       </Button>
                       <Button 
                         variant="outline"
                         onClick={() => handleStartChat(task.client.id)}
                         className="w-20 text-sm px-2 py-1"
                       >
                         <MessageCircle className="h-4 w-4 mr-1" />
                         聊天
                       </Button>
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TaskDashboard;
