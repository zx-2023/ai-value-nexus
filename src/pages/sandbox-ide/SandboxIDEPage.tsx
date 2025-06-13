
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { initializeEnvironment } from '../../store/slices/sandboxSlice';
import TopBar from './components/TopBar';
import CodeEditor from './components/CodeEditor';
import Terminal from './components/Terminal';
import TestResultPanel from './components/TestResultPanel';
import LoadingOverlay from './components/LoadingOverlay';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const SandboxIDEPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isEnvironmentReady, loading } = useSelector((state: RootState) => state.sandbox);

  useEffect(() => {
    dispatch(initializeEnvironment());
  }, [dispatch]);

  if (loading || !isEnvironmentReady) {
    return <LoadingOverlay />;
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <TopBar />
      
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} minSize={50}>
                <CodeEditor />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30} minSize={20}>
                <Terminal />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={40} minSize={30}>
            <TestResultPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default SandboxIDEPage;
