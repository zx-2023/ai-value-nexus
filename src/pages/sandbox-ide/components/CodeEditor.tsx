
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateCode } from '../../../store/slices/sandboxSlice';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const CodeEditor = () => {
  const dispatch = useDispatch();
  const { code } = useSelector((state: RootState) => state.sandbox);

  const handleCodeChange = (newCode: string) => {
    dispatch(updateCode(newCode));
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="border-b px-4 py-2 bg-muted">
        <h3 className="text-sm font-medium">main.js</h3>
      </div>
      
      <div className="flex-1 relative">
        <Textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="h-full resize-none border-0 rounded-none font-mono text-sm bg-background"
          placeholder="// 开始编写您的代码..."
          style={{
            minHeight: '100%',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
          }}
        />
        
        {/* Line numbers simulation */}
        <div className="absolute left-2 top-2 text-xs text-muted-foreground pointer-events-none select-none">
          {code.split('\n').map((_, index) => (
            <div key={index} className="h-5 leading-5">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
