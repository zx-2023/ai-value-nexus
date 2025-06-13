
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { updateSRD } from '../../../store/slices/aiStudioSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';
import { Edit, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SRDPreview = () => {
  const dispatch = useDispatch();
  const { currentSRD } = useSelector((state: RootState) => state.aiStudio);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'reviewing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'reviewing':
        return '审核中';
      case 'draft':
        return '草稿';
      default:
        return '';
    }
  };

  const handleEditSection = (sectionTitle: string, content: string) => {
    setEditingSection(sectionTitle);
    setEditContent(content);
  };

  const handleSaveEdit = () => {
    if (!editingSection) return;

    const updatedSections = currentSRD.sections.map(section =>
      section.title === editingSection
        ? { ...section, content: editContent }
        : section
    );

    dispatch(updateSRD({ sections: updatedSections }));
    setEditingSection(null);
    setEditContent('');
    
    toast({
      title: "保存成功",
      description: `已更新 ${editingSection} 部分`,
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          SRD 文档预览
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-6 py-4">
            {/* Project Overview */}
            <div>
              <h2 className="text-xl font-bold mb-2">{currentSRD.projectName}</h2>
              <p className="text-muted-foreground text-sm">{currentSRD.overview}</p>
            </div>

            <Separator />

            {/* Tech Stack */}
            <div>
              <h3 className="font-semibold mb-3">技术栈</h3>
              <div className="flex flex-wrap gap-2">
                {currentSRD.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* SRD Sections */}
            <div className="space-y-4">
              {currentSRD.sections.map((section) => (
                <div key={section.title} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{section.title}</h3>
                      {getStatusIcon(section.status)}
                      <Badge variant="outline" className="text-xs">
                        {getStatusText(section.status)}
                      </Badge>
                    </div>
                    <Drawer open={editingSection === section.title} onOpenChange={(open) => !open && setEditingSection(null)}>
                      <DrawerTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSection(section.title, section.content)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>编辑 {section.title}</DrawerTitle>
                          <DrawerDescription>
                            您可以直接编辑这个部分的内容，AI 会根据您的修改学习和调整。
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4 pb-4">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-[300px] mb-4"
                            placeholder="编辑内容..."
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveEdit} className="flex-1">
                              保存修改
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingSection(null)}
                              className="flex-1"
                            >
                              取消
                            </Button>
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                      {section.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SRDPreview;
