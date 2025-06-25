
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Terminal as TerminalIcon } from 'lucide-react';

const Terminal = () => {
  const [history, setHistory] = useState<string[]>([
    '欢迎使用沙箱终端',
    '您可以在这里运行命令来测试您的代码',
    '输入 "help" 查看可用命令',
    '',
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string) => {
    const newHistory = [...history, `$ ${command}`];
    
    switch (command.toLowerCase()) {
      case 'help':
        newHistory.push('可用命令:');
        newHistory.push('  help    - 显示帮助信息');
        newHistory.push('  clear   - 清空终端');
        newHistory.push('  ls      - 列出文件');
        newHistory.push('  pwd     - 显示当前目录');
        newHistory.push('  node    - 运行 Node.js');
        break;
      case 'clear':
        setHistory([]);
        setCurrentCommand('');
        return;
      case 'ls':
        newHistory.push('main.js');
        newHistory.push('package.json');
        newHistory.push('test.js');
        break;
      case 'pwd':
        newHistory.push('/workspace/sandbox');
        break;
      case 'node main.js':
        newHistory.push('Running main.js...');
        newHistory.push('fibonacci(5) = 0');
        newHistory.push('isPrime(17) = false');
        break;
      default:
        newHistory.push(`命令未找到: ${command}`);
        newHistory.push('输入 "help" 查看可用命令');
    }
    
    newHistory.push('');
    setHistory(newHistory);
    setCurrentCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentCommand.trim()) {
        handleCommand(currentCommand.trim());
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400">
      <div className="border-b border-gray-700 px-4 py-2 bg-gray-900 flex items-center gap-2">
        <TerminalIcon className="h-4 w-4" />
        <h3 className="text-sm font-medium">Terminal</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="font-mono text-sm space-y-1">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span>$</span>
            <Input
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-0 text-green-400 font-mono focus-visible:ring-0 p-0"
              placeholder="输入命令..."
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Terminal;
