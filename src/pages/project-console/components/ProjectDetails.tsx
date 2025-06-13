
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { selectProject } from '../../../store/slices/projectSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state: RootState) => state.project);

  if (!selectedProject) return null;

  const getPhaseStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => dispatch(selectProject(''))}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{selectedProject.name} - 详细信息</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">总体进度</p>
            <Progress value={selectedProject.progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{selectedProject.progress}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">预算使用</p>
            <Progress 
              value={(selectedProject.spent / selectedProject.budget) * 100} 
              className="mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              ${selectedProject.spent.toLocaleString()} / ${selectedProject.budget.toLocaleString()}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">项目阶段</h3>
          <div className="space-y-4">
            {selectedProject.phases.map((phase) => (
              <Card key={phase.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPhaseStatusIcon(phase.status)}
                      <h4 className="font-medium">{phase.name}</h4>
                    </div>
                    <Badge variant={phase.status === 'completed' ? 'default' : 'secondary'}>
                      {phase.status === 'completed' ? '已完成' : 
                       phase.status === 'in-progress' ? '进行中' : 
                       phase.status === 'failed' ? '失败' : '待开始'}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>阶段进度</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">测试通过率</p>
                      <p>{phase.testsPassed}/{phase.totalTests} 
                        ({phase.totalTests > 0 ? Math.round((phase.testsPassed / phase.totalTests) * 100) : 0}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">预算</p>
                      <p>${phase.budget.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-1">交付物:</p>
                    <div className="flex flex-wrap gap-1">
                      {phase.deliverables.map((deliverable) => (
                        <Badge key={deliverable} variant="outline" className="text-xs">
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;
