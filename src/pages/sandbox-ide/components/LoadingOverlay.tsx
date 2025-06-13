
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2, Server } from 'lucide-react';

const LoadingOverlay = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 2000);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="relative">
            <Server className="h-16 w-16 text-primary" />
            <Loader2 className="h-6 w-6 absolute -top-1 -right-1 animate-spin text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">正在为您准备沙箱环境</h2>
          <p className="text-muted-foreground">
            预计需要 30 秒，请稍候...
          </p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {progress < 30 && "初始化容器环境..."}
            {progress >= 30 && progress < 60 && "安装依赖包..."}
            {progress >= 60 && progress < 90 && "配置开发工具..."}
            {progress >= 90 && "即将完成..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
