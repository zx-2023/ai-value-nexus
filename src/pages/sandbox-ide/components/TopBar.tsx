
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { runTests, submitMergeRequest, changeBranch, updateResourceUsage } from '../../../store/slices/sandboxSlice';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Play, GitMerge, Cpu, HardDrive } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const TopBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { branch, availableBranches, isTestRunning, resourceUsage } = useSelector((state: RootState) => state.sandbox);
  const [isMRModalOpen, setMRModalOpen] = useState(false);
  const [mrDescription, setMRDescription] = useState('');

  // Simulate real-time resource monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const cpu = Math.floor(Math.random() * 30 + 20); // 20-50%
      const memory = Math.floor(Math.random() * 40 + 30); // 30-70%
      dispatch(updateResourceUsage({ cpu, memory }));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleRunTests = () => {
    dispatch(runTests());
  };

  const handleSubmitMR = async () => {
    if (!mrDescription.trim()) {
      toast({
        title: "请填写提交说明",
        description: "提交说明不能为空",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(submitMergeRequest(mrDescription)).unwrap();
      toast({
        title: "合并请求已提交",
        description: "合并请求已成功提交至项目工作区",
      });
      setMRModalOpen(false);
      setMRDescription('');
    } catch (error) {
      toast({
        title: "提交失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const getResourceColor = (value: number, warning: number, danger: number) => {
    if (value >= danger) return 'text-red-600';
    if (value >= warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-card border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Select value={branch} onValueChange={(value) => dispatch(changeBranch(value))}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableBranches.map((branchName) => (
              <SelectItem key={branchName} value={branchName}>
                {branchName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleRunTests}
          disabled={isTestRunning}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          {isTestRunning ? "Running tests..." : "Test"}
        </Button>
      </div>

      <div className="flex items-center gap-6">
        {/* Resource Monitoring */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span className={getResourceColor(resourceUsage.cpu, 70, 85)}>
              CPU: {resourceUsage.cpu}%
            </span>
            <Progress value={resourceUsage.cpu} className="w-16 h-2" />
          </div>
          
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span className={getResourceColor(resourceUsage.memory, 70, 85)}>
              RAM: {resourceUsage.memory}%
            </span>
            <Progress value={resourceUsage.memory} className="w-16 h-2" />
          </div>
        </div>

        <Dialog open={isMRModalOpen} onOpenChange={setMRModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-2">
              <GitMerge className="h-4 w-4" />
              提交合并请求
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>提交合并请求</DialogTitle>
              <DialogDescription>
                请描述您在这次提交中完成的工作和解决的问题。
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">提交说明</Label>
                <Textarea
                  id="description"
                  value={mrDescription}
                  onChange={(e) => setMRDescription(e.target.value)}
                  placeholder="例如：实现了斐波那契数列算法和质数判断函数，通过了基础测试用例..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMRModalOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSubmitMR}>
                提交
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TopBar;
