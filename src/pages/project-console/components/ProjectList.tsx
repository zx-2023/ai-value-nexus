
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { selectProject } from '../../../store/slices/projectSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users } from 'lucide-react';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.project);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'on-hold':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
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
      case 'on-hold':
        return '暂停';
      case 'error':
        return '异常';
      default:
        return '未知';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>项目列表</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4 p-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        创建于 {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        截止 {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusText(project.status)}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>总体进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.developer.avatar} />
                      <AvatarFallback>{project.developer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{project.developer.name}</p>
                      <p className="text-xs text-muted-foreground">开发者</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.completedPhases}/{project.totalPhases} 阶段完成
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => dispatch(selectProject(project.id))}
                  >
                    查看详情
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectList;
