
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ProjectOverview = () => {
  const { stats, loading } = useSelector((state: RootState) => state.project);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const budgetUsagePercentage = stats.totalBudget > 0 ? (stats.totalSpent / stats.totalBudget) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">总项目数</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProjects}</div>
          <div className="text-xs text-muted-foreground mt-1">
            活跃: {stats.activeProjects} | 已完成: {stats.completedProjects}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">进行中项目</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{stats.activeProjects}</div>
          <div className="text-xs text-muted-foreground mt-1">
            需要关注的项目
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">总预算</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalBudget.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">
            已花费: ${stats.totalSpent.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">预算使用率</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{budgetUsagePercentage.toFixed(1)}%</div>
          <Progress value={budgetUsagePercentage} className="mt-2" />
          <div className="text-xs text-muted-foreground mt-1">
            剩余: ${(stats.totalBudget - stats.totalSpent).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectOverview;
