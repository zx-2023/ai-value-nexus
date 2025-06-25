import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Clock, ChevronLeft, ChevronRight, Calendar, LayoutGrid, FolderOpen, AlertCircle } from 'lucide-react';

const EarningsPanel = () => {
  const { earnings, stats } = useSelector((state: RootState) => state.developer);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [statisticsView, setStatisticsView] = useState<'monthly' | 'project'>('monthly');

  // 模拟月份数据
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const getCurrentMonthData = () => {
    // 模拟按月筛选的数据
    return earnings.filter(earning => {
      const earningDate = new Date(earning.date);
      return earningDate.getMonth() === currentMonth.getMonth() && 
             earningDate.getFullYear() === currentMonth.getFullYear();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthlyEarnings = getCurrentMonthData();
  const monthlyTotal = monthlyEarnings.reduce((sum, earning) => sum + earning.amount, 0);

  // 按项目维度统计数据
  const getProjectStatistics = () => {
    const projectMap = new Map();
    
    earnings.forEach(earning => {
      const key = earning.projectId;
      if (!projectMap.has(key)) {
        projectMap.set(key, {
          projectId: earning.projectId,
          projectName: earning.projectName,
          totalAmount: 0,
          paidAmount: 0,
          pendingAmount: 0,
          earningsCount: 0,
          lastEarning: earning.date,
          earnings: []
        });
      }
      
      const project = projectMap.get(key);
      project.totalAmount += earning.amount;
      project.earningsCount += 1;
      project.earnings.push(earning);
      
      if (earning.status === 'paid') {
        project.paidAmount += earning.amount;
      } else {
        project.pendingAmount += earning.amount;
      }
      
      // 更新最新收益日期
      if (new Date(earning.date) > new Date(project.lastEarning)) {
        project.lastEarning = earning.date;
      }
    });
    
    // 转换为数组并按待收款金额排序（金额大的置顶）
    return Array.from(projectMap.values()).sort((a, b) => {
      // 首先按待收款金额降序排序
      if (b.pendingAmount !== a.pendingAmount) {
        return b.pendingAmount - a.pendingAmount;
      }
      // 待收款相同时按总金额降序排序
      return b.totalAmount - a.totalAmount;
    });
  };

  // 月度统计数据
  const getMonthlyStatistics = () => {
    const monthlyMap = new Map();
    
    earnings.forEach(earning => {
      const date = new Date(earning.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, {
          year: date.getFullYear(),
          month: date.getMonth(),
          totalAmount: 0,
          paidAmount: 0,
          pendingAmount: 0,
          earningsCount: 0,
          projects: new Set()
        });
      }
      
      const month = monthlyMap.get(key);
      month.totalAmount += earning.amount;
      month.earningsCount += 1;
      month.projects.add(earning.projectName);
      
      if (earning.status === 'paid') {
        month.paidAmount += earning.amount;
      } else {
        month.pendingAmount += earning.amount;
      }
    });
    
    // 转换为数组并按年月排序
    return Array.from(monthlyMap.values()).sort((a, b) => {
      const dateA = new Date(a.year, a.month);
      const dateB = new Date(b.year, b.month);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const projectStatistics = getProjectStatistics();
  const monthlyStatistics = getMonthlyStatistics();

  const renderListView = () => (
    <div className="space-y-3">
      {monthlyEarnings.length > 0 ? (
        monthlyEarnings.map((earning) => (
          <div key={earning.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-medium">${earning.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{earning.projectName}</p>
              <p className="text-xs text-muted-foreground">{earning.description}</p>
            </div>
            <div className="text-right">
              <Badge className={earning.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {earning.status === 'paid' ? '已支付' : '待支付'}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(earning.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">本月暂无收益记录</p>
        </div>
      )}
    </div>
  );

  const renderBoardView = () => (
    <div className="grid grid-cols-2 gap-3">
      {monthlyEarnings.map((earning) => (
        <Card key={earning.id} className="p-3 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <Badge className={earning.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {earning.status === 'paid' ? '已支付' : '待支付'}
              </Badge>
              <span className="text-lg font-bold">${earning.amount.toLocaleString()}</span>
            </div>
            <div>
              <p className="text-sm font-medium">{earning.projectName}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{earning.description}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(earning.date).toLocaleDateString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );

  // 项目维度统计视图
  const renderProjectStatistics = () => (
    <div className="space-y-3">
      {projectStatistics.length > 0 ? (
        projectStatistics.map((project) => (
          <Card key={project.projectId} className={`p-4 border-l-4 ${project.pendingAmount > 0 ? 'border-l-orange-400 bg-orange-50/30' : 'border-l-green-400 bg-green-50/30'} hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium text-sm">{project.projectName}</h4>
                  {project.pendingAmount > 0 && (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">共{project.earningsCount}笔收益</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${project.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">总收益</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-green-100 rounded">
                <DollarSign className="h-4 w-4 mx-auto mb-1 text-green-600" />
                <p className="text-xs text-green-700">已收</p>
                <p className="text-sm font-semibold text-green-800">${project.paidAmount.toLocaleString()}</p>
              </div>
              <div className="text-center p-2 bg-orange-100 rounded">
                <Clock className="h-4 w-4 mx-auto mb-1 text-orange-600" />
                <p className="text-xs text-orange-700">待收</p>
                <p className="text-sm font-semibold text-orange-800">${project.pendingAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-muted">
              <p className="text-xs text-muted-foreground">
                最近收益：{new Date(project.lastEarning).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">暂无项目收益记录</p>
        </div>
      )}
    </div>
  );

  // 月度统计视图
  const renderMonthlyStatistics = () => (
    <div className="space-y-3">
      {monthlyStatistics.length > 0 ? (
        monthlyStatistics.map((monthData) => (
          <Card key={`${monthData.year}-${monthData.month}`} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium text-sm">
                    {monthData.year}年{monthNames[monthData.month]}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {monthData.earningsCount}笔收益 • {monthData.projects.size}个项目
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${monthData.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">月度总收益</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-green-100 rounded">
                <DollarSign className="h-4 w-4 mx-auto mb-1 text-green-600" />
                <p className="text-xs text-green-700">已收</p>
                <p className="text-sm font-semibold text-green-800">${monthData.paidAmount.toLocaleString()}</p>
              </div>
              <div className="text-center p-2 bg-orange-100 rounded">
                <Clock className="h-4 w-4 mx-auto mb-1 text-orange-600" />
                <p className="text-xs text-orange-700">待收</p>
                <p className="text-sm font-semibold text-orange-800">${monthData.pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">暂无月度收益记录</p>
        </div>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            收益统计
          </div>
          <Button
            className="h-8 w-8 p-0"
            onClick={() => setViewMode(viewMode === 'list' ? 'board' : 'list')}
          >
            {viewMode === 'list' ? <LayoutGrid className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 总览统计 */}
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

        {/* 月份导航 */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <Button
            className="h-8 w-8 p-0"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">
              {currentMonth.getFullYear()}年{monthNames[currentMonth.getMonth()]}
            </span>
            <Badge className="bg-blue-100 text-blue-800">
              ${monthlyTotal.toLocaleString()}
            </Badge>
          </div>
          
          <Button
            className="h-8 w-8 p-0"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 统计维度选择 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              className={`h-7 px-3 text-xs ${statisticsView === 'monthly' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
              onClick={() => setStatisticsView('monthly')}
            >
              <Calendar className="h-3 w-3 mr-1" />
              月度统计
            </Button>
            <Button
              className={`h-7 px-3 text-xs ${statisticsView === 'project' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
              onClick={() => setStatisticsView('project')}
            >
              <FolderOpen className="h-3 w-3 mr-1" />
              项目统计
            </Button>
          </div>
          
          {statisticsView === 'monthly' && (
            <div className="flex items-center gap-1">
              <Button
                className={`h-7 px-2 text-xs ${viewMode === 'list' ? 'bg-secondary text-secondary-foreground' : 'bg-muted'}`}
                onClick={() => setViewMode('list')}
              >
                列表
              </Button>
              <Button
                className={`h-7 px-2 text-xs ${viewMode === 'board' ? 'bg-secondary text-secondary-foreground' : 'bg-muted'}`}
                onClick={() => setViewMode('board')}
              >
                看板
              </Button>
            </div>
          )}
        </div>

        {/* 收益统计内容 */}
        <div className="space-y-3">
          {statisticsView === 'monthly' ? (
            <>
              <h4 className="text-sm font-medium">月度收益分析</h4>
              {renderMonthlyStatistics()}
              
              {/* 当前月收益明细 */}
              {monthlyEarnings.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">
                    {currentMonth.getFullYear()}年{monthNames[currentMonth.getMonth()]}明细
                  </h4>
                  {viewMode === 'list' ? renderListView() : renderBoardView()}
                </div>
              )}
            </>
          ) : (
            <>
              <h4 className="text-sm font-medium">项目收益分析</h4>
              {renderProjectStatistics()}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsPanel;
