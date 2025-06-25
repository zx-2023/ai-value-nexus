import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { addUserMessage, sendMessage, startStreaming, updateStreamingMessage, finishStreaming } from '../../../store/slices/aiStudioSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, Send, Bot, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatAreaProps {
  onMessageSent?: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ onMessageSent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, isAIResponding } = useSelector((state: RootState) => state.aiStudio);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isAIResponding) return;

    const message = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    dispatch(addUserMessage(message));
    
    // Start AI response simulation
    dispatch(startStreaming());
    
    try {
      const response = await dispatch(sendMessage(message)).unwrap();
      
      // Simulate streaming effect
      let currentText = '';
      const words = response.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        dispatch(updateStreamingMessage(currentText));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      dispatch(finishStreaming(response));
      
      // Call the onMessageSent callback if provided
      if (onMessageSent) {
        setTimeout(() => {
          onMessageSent();
        }, 1000); // Delay to show completion
      }
    } catch (error) {
      dispatch(finishStreaming('抱歉，我遇到了一些问题。请稍后重试。'));
      toast({
        title: "发送失败",
        description: "请检查网络连接后重试",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "文件上传成功",
        description: `已上传文件: ${file.name}`,
      });
      dispatch(addUserMessage(`[文件上传] ${file.name}`));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Bot className="h-4 w-4" />
          AI 对话助手
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type !== 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : message.type === 'system'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm">
                    {formatMessage(message.content)}
                    {message.isStreaming && (
                      <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
                    )}
                  </div>
                </div>

                {message.type === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="可以从一句话描述开始，比如'我想要一个类似小红书的图片社交App'"
                className="min-h-[80px] pr-20 resize-none"
                disabled={isAIResponding}
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Button
                  type="button"
                  className="h-8 w-8 p-0"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAIResponding}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  className="h-8 w-8 p-0"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isAIResponding}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatArea;
