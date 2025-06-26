
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { generateCoreFeatures, generateTechnicalArchitecture, generateUserExperience } from '../../../store/slices/aiStudioSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Sparkles, Eye, Edit3, Wand2, LayoutTemplate } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

const SRDPreview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSRD } = useSelector((state: RootState) => state.aiStudio);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sectionContent, setSectionContent] = useState<{[key: string]: string}>({});

  const handleGenerateSection = (sectionTitle: string) => {
    switch (sectionTitle) {
      case 'Core Features':
        dispatch(generateCoreFeatures());
        break;
      case 'Technical Architecture':
        dispatch(generateTechnicalArchitecture());
        break;
      case 'User Experience':
        dispatch(generateUserExperience());
        break;
    }
  };

  const handleEditSection = (sectionTitle: string, content: string) => {
    setEditingSection(sectionTitle);
    setSectionContent(prev => ({
      ...prev,
      [sectionTitle]: content
    }));
  };

  const handleSaveSection = (sectionTitle: string) => {
    // 这里可以dispatch更新action
    console.log('Saving section:', sectionTitle, sectionContent[sectionTitle]);
    setEditingSection(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'reviewing': return '审核中';
      case 'draft': return '草稿';
      default: return '未开始';
    }
  };

  return (
    <div className="space-y-6">
      {/* SRD 头部信息 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                {currentSRD.projectName}
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                {currentSRD.overview}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                预览
              </Button>
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">用户需求 (User Requirement)</h4>
            <p className="text-blue-800">{currentSRD.userRequirement}</p>
          </div>
        </CardContent>
      </Card>

      {/* SRD 章节内容 */}
      <div className="space-y-4">
        {currentSRD.sections.map((section, index) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">
                    {index + 1}. {section.title}
                  </CardTitle>
                  <Badge className={getStatusColor(section.status)}>
                    {getStatusText(section.status)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  {section.canGenerate && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGenerateSection(section.title)}
                      disabled={section.isGenerating}
                    >
                      {section.isGenerating ? (
                        <>
                          <Skeleton className="h-4 w-4 mr-2" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          AI 生成
                        </>
                      )}
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditSection(section.title, section.content)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    编辑
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {editingSection === section.title ? (
                <div className="space-y-4">
                  <RichTextEditor
                    content={sectionContent[section.title] || section.content}
                    onContentChange={(content) => setSectionContent(prev => ({
                      ...prev,
                      [section.title]: content
                    }))}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveSection(section.title)}
                    >
                      保存更改
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingSection(null)}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  {section.isGenerating ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 animate-spin" />
                        AI 正在生成内容...
                      </div>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {section.content || '暂无内容，点击"AI 生成"或"编辑"开始编写...'}
                    </pre>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 技术栈展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5" />
            推荐技术栈
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentSRD.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SRDPreview;
