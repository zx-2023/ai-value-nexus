import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Eye, 
  FileText, 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderOpen, 
  Code, 
  Award,
  Download,
  Upload,
  AlertCircle 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RootState } from '@/store';
import { 
  setSavingState, 
  setPreviewMode, 
  markAsSaved,
  selectHasUnsavedChanges 
} from '@/store/slices/resumeSlice';

// 导入新的表单组件
import PersonalInfoForm from './PersonalInfoForm';
import EducationList from './EducationList';
import SkillList from './SkillList';
import ProjectList from './ProjectList';
import WorkList from './WorkList';
import AwardList from './AwardList';

import TemplateMarket from '../../ai-resume/components/TemplateMarket';
import ResumePreview from '../../ai-resume/components/ResumePreview';

interface ResumeBuilderProps {
  onSwitchTab?: (tab: string) => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onSwitchTab }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [openSections, setOpenSections] = useState(['personal-info']);

  const hasUnsavedChanges = useSelector(selectHasUnsavedChanges);
  const resume = useSelector((state: RootState) => state.resume.resume);
  const educations = useSelector((state: RootState) => state.resume.educations);
  const workExperiences = useSelector((state: RootState) => state.resume.workExperiences);
  const projects = useSelector((state: RootState) => state.resume.projects);
  const skills = useSelector((state: RootState) => state.resume.skills);
  const awards = useSelector((state: RootState) => state.resume.awards);
  const validationErrors = useSelector((state: RootState) => state.resume.validationErrors);

  // 自动保存功能 (防抖800ms)
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const timer = setTimeout(async () => {
      await handleSave();
    }, 800);

    return () => clearTimeout(timer);
  }, [hasUnsavedChanges, resume, educations, workExperiences, projects, skills, awards]);

  // 页面卸载前保存
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        handleSave();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = async () => {
    setIsSaving(true);
    dispatch(setSavingState(true));

    try {
      // 这里应该调用真实的保存API
      // await saveResumeAPI({ resume, educations, projects, workExperiences, skills, awards });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(markAsSaved());
      setLastSaved(new Date());
      
      toast({
        title: "保存成功",
        description: "简历信息已自动保存",
      });
    } catch (error) {
      toast({
        title: "保存失败",
        description: "请检查网络连接后重试",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
      dispatch(setSavingState(false));
    }
  };

  const handleExport = () => {
    toast({
      title: "导出功能开发中",
      description: "PDF导出功能即将上线",
    });
  };

  const getSectionStatus = (sectionKey: string) => {
    switch (sectionKey) {
      case 'personal-info':
        return resume.name && resume.email && resume.phone ? 'completed' : 'incomplete';
      case 'education':
        return educations.length > 0 ? 'completed' : 'empty';
      case 'work-experience':
        return workExperiences.length > 0 ? 'completed' : 'empty';
      case 'projects':
        return projects.length > 0 ? 'completed' : 'empty';
      case 'skills':
        return skills.length > 0 ? 'completed' : 'empty';
      case 'awards':
        return awards.length > 0 ? 'completed' : 'empty';
      default:
        return 'empty';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">已完成</Badge>;
      case 'incomplete':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">待完善</Badge>;
      case 'empty':
        return <Badge className="bg-gray-100 text-gray-600 border-gray-200">未填写</Badge>;
      default:
        return null;
    }
  };

  const getTotalErrorCount = () => {
    return Object.keys(validationErrors).length;
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onSwitchTab) {
      onSwitchTab(value);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
        <div className="border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                编辑简历
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                上传简历
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              {/* 保存状态 */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    正在保存...
                  </>
                ) : hasUnsavedChanges ? (
                  <>
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    有未保存的更改
                  </>
                ) : lastSaved ? (
                  <>
                    <Save className="h-4 w-4 text-green-500" />
                    已保存 {lastSaved.toLocaleTimeString()}
                  </>
                ) : null}
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving || !hasUnsavedChanges} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? '保存中...' : '保存'}
                </Button>
                <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  导出PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="edit" className="h-full m-0">
            <div className="h-full grid grid-cols-12 gap-6 p-6">
              {/* 左侧编辑区域 */}
              <div className="col-span-12">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-6">
                    {/* 表单验证提示 */}
                    {getTotalErrorCount() > 0 && (
                      <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-destructive">
                          <AlertCircle className="h-5 w-5" />
                          <span className="font-medium">发现 {getTotalErrorCount()} 个字段需要修正</span>
                        </div>
                        <p className="text-sm text-destructive/80 mt-1">
                          请检查并修正标红的字段，确保信息准确完整
                        </p>
                      </div>
                    )}

                    {/* 折叠表单区域 */}
                    <Accordion 
                      type="multiple" 
                      value={openSections} 
                      onValueChange={setOpenSections}
                      className="space-y-4"
                    >
                      {/* 个人信息 */}
                      <AccordionItem value="personal-info" className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5" />
                            <span className="font-medium">个人信息</span>
                            {getStatusBadge(getSectionStatus('personal-info'))}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <PersonalInfoForm />
                        </AccordionContent>
                      </AccordionItem>

                      {/* 教育经历 */}
                      <AccordionItem value="education" className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <GraduationCap className="h-5 w-5" />
                            <span className="font-medium">教育经历</span>
                            {getStatusBadge(getSectionStatus('education'))}
                            {educations.length > 0 && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                {educations.length} 项
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <EducationList />
                        </AccordionContent>
                      </AccordionItem>

                      {/* 工作经历 */}
                      <AccordionItem value="work-experience" className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5" />
                            <span className="font-medium">工作经历</span>
                            {getStatusBadge(getSectionStatus('work-experience'))}
                            {workExperiences.length > 0 && (
                              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                                {workExperiences.length} 项
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <WorkList />
                        </AccordionContent>
                      </AccordionItem>

                      {/* 项目经历 */}
                      <AccordionItem value="projects" className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <FolderOpen className="h-5 w-5" />
                            <span className="font-medium">项目经历</span>
                            {getStatusBadge(getSectionStatus('projects'))}
                            {projects.length > 0 && (
                              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                                {projects.length} 项
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <ProjectList />
                        </AccordionContent>
                      </AccordionItem>

                      {/* 专业技能 */}
                      <AccordionItem value="skills" className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <Code className="h-5 w-5" />
                            <span className="font-medium">专业技能</span>
                            {getStatusBadge(getSectionStatus('skills'))}
                            {skills.length > 0 && (
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                {skills.length} 项
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <SkillList />
                        </AccordionContent>
                      </AccordionItem>

                      {/* 获奖经历 */}
                      <AccordionItem value="awards" className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <Award className="h-5 w-5" />
                            <span className="font-medium">获奖经历</span>
                            {getStatusBadge(getSectionStatus('awards'))}
                            {awards.length > 0 && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                {awards.length} 项
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <AwardList />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="h-full m-0">
            <div className="h-full p-6">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">上传简历</h3>
                  <p className="text-muted-foreground">
                    上传现有的简历文件，我们会自动解析并填充到表单中
                  </p>
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/40 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        toast({
                          title: "文件上传成功",
                          description: `已接收文件: ${file.name}，正在解析中...`,
                        });
                        // 这里可以添加文件解析逻辑
                      }
                    }}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-full w-fit mx-auto">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">点击上传简历文件</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          支持 PDF、DOC、DOCX 格式，文件大小不超过 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">💡 上传提示</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 支持解析PDF、Word格式的简历文件</li>
                    <li>• 上传后会自动提取个人信息、工作经历、教育背景等</li>
                    <li>• 解析完成后可在"编辑简历"标签页中查看和修改</li>
                    <li>• 建议上传结构清晰、格式规范的简历文件</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
