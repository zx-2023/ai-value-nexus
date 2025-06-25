import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { updateSRD, generateCoreFeatures, generateTechnicalArchitecture, generateUserExperience } from '../../../store/slices/aiStudioSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Edit, FileText, CheckCircle, Clock, AlertCircle, Wand2, Loader2, ChevronDown, ChevronRight, List, Hash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SRDPreview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSRD } = useSelector((state: RootState) => state.aiStudio);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [showTOC, setShowTOC] = useState(true);

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

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const scrollToSection = (sectionTitle: string) => {
    const element = document.getElementById(`section-${sectionTitle.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = (content: string) => {
    if (!content) return null;

    const lines = content.split('\n');
    const rendered = [];
    let currentParagraph = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line === '') {
        if (currentParagraph.length > 0) {
          rendered.push(
            <p key={i} className="mb-3 leading-7 text-gray-700 dark:text-gray-300">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        continue;
      }

      if (line.startsWith('## ')) {
        if (currentParagraph.length > 0) {
          rendered.push(
            <p key={`p-${i}`} className="mb-3 leading-7 text-gray-700 dark:text-gray-300">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        rendered.push(
          <h3 key={i} className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-500" />
            {line.replace('## ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        if (currentParagraph.length > 0) {
          rendered.push(
            <p key={`p-${i}`} className="mb-3 leading-7 text-gray-700 dark:text-gray-300">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        rendered.push(
          <ul key={i} className="mb-3 ml-4">
            <li className="text-gray-700 dark:text-gray-300 leading-7 list-disc">
              {line.replace('- ', '')}
            </li>
          </ul>
        );
      } else {
        currentParagraph.push(line);
      }
    }

    if (currentParagraph.length > 0) {
      rendered.push(
        <p key="final" className="mb-3 leading-7 text-gray-700 dark:text-gray-300">
          {currentParagraph.join(' ')}
        </p>
      );
    }

    return rendered;
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

  const handleGenerateSection = async (sectionTitle: string) => {
    if (!currentSRD.userRequirement || currentSRD.userRequirement.trim() === '') {
      toast({
        title: "生成失败",
        description: "请先在右上角对话助手中描述您的项目需求",
        variant: "destructive",
      });
      return;
    }

    try {
      switch (sectionTitle) {
        case 'Core Features':
          await dispatch(generateCoreFeatures()).unwrap();
          toast({
            title: "生成成功",
            description: "核心功能清单已生成完成",
          });
          break;
        case 'Technical Architecture':
          const coreFeaturesSection = currentSRD.sections.find(s => s.title === 'Core Features');
          if (!coreFeaturesSection || coreFeaturesSection.status !== 'completed') {
            toast({
              title: "生成失败",
              description: "请先完成并保存核心功能清单",
              variant: "destructive",
            });
            return;
          }
          await dispatch(generateTechnicalArchitecture()).unwrap();
          toast({
            title: "生成成功",
            description: "技术架构设计已生成完成",
          });
          break;
        case 'User Experience':
          await dispatch(generateUserExperience()).unwrap();
          toast({
            title: "生成成功",
            description: "用户体验说明已生成完成",
          });
          break;
        default:
          break;
      }
    } catch (error) {
      toast({
        title: "生成失败",
        description: "AI生成出现错误，请重试",
        variant: "destructive",
      });
    }
  };

  const canGenerateTechnicalArchitecture = () => {
    const coreFeaturesSection = currentSRD.sections.find(s => s.title === 'Core Features');
    return coreFeaturesSection && coreFeaturesSection.status === 'completed';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <List className="h-5 w-5" />
              文档目录
            </CardTitle>
            <Button
              variant="ghost"
              onClick={() => setShowTOC(!showTOC)}
            >
              {showTOC ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <Collapsible open={showTOC} onOpenChange={setShowTOC}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div
                  className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-primary flex items-center gap-2 py-1"
                  onClick={() => scrollToSection('project-overview')}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  项目概览
                </div>
                {currentSRD.sections.map((section) => (
                  <div
                    key={section.title}
                    className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-primary flex items-center gap-2 py-1"
                    onClick={() => scrollToSection(section.title)}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      section.status === 'completed' ? 'bg-green-500' :
                      section.status === 'reviewing' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    {section.title}
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SRD 文档预览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[700px] pr-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div id="section-project-overview" className="scroll-mt-4">
                <div className="border-l-4 border-blue-500 pl-6 py-4">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {currentSRD.projectName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-7 mb-4">
                    {currentSRD.overview}
                  </p>
                  {currentSRD.userRequirement && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-blue-800 dark:text-blue-200 leading-7">
                        <strong className="font-semibold">用户需求：</strong>
                        {currentSRD.userRequirement}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentSRD.techStack.map((tech) => (
                    <Badge 
                      key={tech} 
                      className="bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                {currentSRD.sections.map((section) => (
                  <Card 
                    key={section.title} 
                    id={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="border border-gray-200 dark:border-gray-800 shadow-sm scroll-mt-4"
                  >
                    <Collapsible 
                      open={!collapsedSections[section.title]} 
                      onOpenChange={() => toggleSection(section.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {collapsedSections[section.title] ? 
                                  <ChevronRight className="h-4 w-4 text-gray-500" /> : 
                                  <ChevronDown className="h-4 w-4 text-gray-500" />
                                }
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                  {section.title}
                                </h3>
                              </div>
                              {getStatusIcon(section.status)}
                              <Badge className="text-xs bg-gray-100 text-gray-700 border border-gray-300">
                                {getStatusText(section.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              {section.canGenerate && (
                                <Button
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGenerateSection(section.title);
                                  }}
                                  disabled={
                                    section.isGenerating || 
                                    (section.title === 'Technical Architecture' && !canGenerateTechnicalArchitecture())
                                  }
                                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 h-8 px-3"
                                >
                                  {section.isGenerating ? (
                                    <>
                                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                      生成中...
                                    </>
                                  ) : (
                                    <>
                                      <Wand2 className="h-4 w-4 mr-1" />
                                      AI生成
                                    </>
                                  )}
                                </Button>
                              )}
                              
                              <Drawer open={editingSection === section.title} onOpenChange={(open) => !open && setEditingSection(null)}>
                                <DrawerTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditSection(section.title, section.content);
                                    }}
                                    className="h-8 px-3"
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
                                        className="flex-1"
                                        onClick={() => setEditingSection(null)}
                                      >
                                        取消
                                      </Button>
                                    </div>
                                  </div>
                                </DrawerContent>
                              </Drawer>
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="prose prose-gray max-w-none">
                            {section.content ? (
                              <div className="space-y-3">
                                {renderContent(section.content)}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic py-4">
                                此部分尚未生成内容，请点击"AI生成"按钮开始创建。
                              </p>
                            )}
                          </div>
                          
                          {section.title === 'Technical Architecture' && !canGenerateTechnicalArchitecture() && (
                            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                              <p className="text-amber-800 dark:text-amber-200 text-sm flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                请先完成并保存"Core Features"部分，然后即可生成技术架构
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SRDPreview;
