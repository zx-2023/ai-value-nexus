import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  X, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';

interface FloatingChatPanelProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultMinimized?: boolean;
  position?: 'bottom-right' | 'custom';
  onToggle?: (isMinimized: boolean) => void;
}

export const FloatingChatPanel: React.FC<FloatingChatPanelProps> = ({
  title = "AI 智能助手",
  icon = <Bot className="h-5 w-5" />,
  children,
  className,
  defaultMinimized = true,
  position = 'bottom-right',
  onToggle
}) => {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle minimize/maximize toggle
  const handleToggle = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    onToggle?.(newState);
  };

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isMinimized) {
        setIsMinimized(true);
        onToggle?.(true);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMinimized, onToggle]);

  // Handle drag functionality for resizing (simplified version)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMinimized) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      // Drag logic can be enhanced here if needed
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Get position classes based on position prop
  const getPositionClasses = () => {
    if (position === 'bottom-right') {
      return 'fixed bottom-6 right-6 md:bottom-6 md:right-6';
    }
    return 'absolute'; // For custom positioning within parent container
  };

  // Get size classes based on minimized state
  const getSizeClasses = () => {
    if (isMinimized) {
      return 'w-14 h-14 rounded-full cursor-pointer';
    }
    
    return cn(
      // Desktop sizes
      'w-[33vw] max-w-[420px] min-w-[320px] h-[60vh] min-h-[420px] max-h-[80vh]',
      // Mobile responsive
      'max-md:w-[calc(100vw-24px)] max-md:h-[calc(100vh-48px)] max-md:bottom-3 max-md:right-3',
      // Tablet responsive  
      'md:max-lg:w-[320px] md:max-lg:h-[75vh]',
      'rounded-xl'
    );
  };

  return (
    <div
      ref={panelRef}
      className={cn(
        'z-[9999] shadow-lg transition-all duration-300 ease-out',
        getPositionClasses(),
        getSizeClasses(),
        className
      )}
      style={{
        transformOrigin: 'bottom right',
      }}
    >
      {isMinimized ? (
        // Minimized bubble state  
        <div className="relative">
          {/* Pulse ring effect */}
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 animate-pulse"></div>
          
          <Button
            onClick={handleToggle}
            className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl transform hover:scale-105 transition-all duration-200"
            aria-label="打开 AI 对话助手"
            aria-expanded={false}
          >
            {icon}
          </Button>
        </div>
      ) : (
        // Expanded panel state
        <Card className="w-full h-full flex flex-col bg-background/95 backdrop-blur-sm border shadow-2xl">
          {/* Header */}
          <CardHeader 
            className="flex-shrink-0 pb-3 cursor-move"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                {icon}
                {title}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  onClick={handleToggle}
                  className="h-8 w-8 p-0 hover:bg-accent"
                  aria-label="最小化"
                  aria-expanded={true}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="flex-1 overflow-hidden p-4 pt-0">
            <div className="h-full w-full">
              {children}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FloatingChatPanel; 