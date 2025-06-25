
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const TestResultPanel = () => {
  const { testResults, isTestRunning } = useSelector((state: RootState) => state.sandbox);

  const passedTests = testResults.filter(test => test.status === 'passed').length;
  const totalTests = testResults.length;
  const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="border-b px-4 py-2 bg-muted">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">测试结果</h3>
          {isTestRunning && (
            <Badge variant="outline" className="animate-pulse">
              运行中...
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        {isTestRunning && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 animate-spin" />
              <span>正在运行测试...</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        )}

        {!isTestRunning && testResults.length > 0 && (
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">测试总结</span>
                <Badge variant={passRate >= 80 ? "default" : passRate >= 60 ? "secondary" : "destructive"}>
                  {passedTests}/{totalTests} 通过
                </Badge>
              </div>
              <Progress value={passRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                通过率: {passRate}%
              </p>
            </div>

            {passRate < 100 && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">需要修复</span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  还有 {totalTests - passedTests} 个测试用例未通过，请检查代码实现。
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-3 pb-4">
          {testResults.map((test, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex items-start gap-3">
                {getStatusIcon(test.status)}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{test.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {test.duration}ms
                    </span>
                    <Badge variant={test.status === 'passed' ? 'default' : 'destructive'} className="text-xs">
                      {test.status === 'passed' ? '通过' : '失败'}
                    </Badge>
                  </div>
                  {test.message && (
                    <p className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded border">
                      {test.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TestResultPanel;
