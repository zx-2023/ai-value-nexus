import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RootState } from '@/store';
import { 
  addProject, 
  updateProject, 
  removeProject, 
  Project 
} from '@/store/slices/resumeSlice';

const ProjectList: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const projects = useSelector((state: RootState) => state.resume.projects);
  const validationErrors = useSelector((state: RootState) => state.resume.validationErrors);

  const handleAddProject = () => {
    const newProject: Project = {
      name: '',
      role: '',
      start_date: '',
      end_date: '',
      description: ''
    };
    
    dispatch(addProject(newProject));
    toast({
      title: "已添加项目经历",
      description: "请填写项目信息",
    });
  };

  const handleUpdateProject = (index: number, field: keyof Project, value: string) => {
    dispatch(updateProject({ index, data: { [field]: value } }));
  };

  const handleRemoveProject = (index: number) => {
    dispatch(removeProject(index));
    toast({
      title: "已删除项目经历",
      description: "该项目经历已从简历中移除",
    });
  };

  const getFieldError = (field: string, index: number) => {
    return validationErrors[`projects.${index}.${field}`]?.[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          项目经历
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>暂无项目经历</p>
            <p className="text-sm">点击下方按钮添加您的项目经验</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                {/* 删除按钮 */}
                <Button
                  onClick={() => handleRemoveProject(index)}
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-destructive/10 hover:bg-destructive/20 text-destructive border-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {/* 项目名称和角色 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>项目名称 *</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => handleUpdateProject(index, 'name', e.target.value)}
                      placeholder="请输入项目名称"
                      className={getFieldError('name', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('name', index) && (
                      <p className="text-sm text-destructive">{getFieldError('name', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>项目角色 *</Label>
                    <Input
                      value={project.role}
                      onChange={(e) => handleUpdateProject(index, 'role', e.target.value)}
                      placeholder="如：前端开发、项目经理、技术负责人"
                      className={getFieldError('role', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('role', index) && (
                      <p className="text-sm text-destructive">{getFieldError('role', index)}</p>
                    )}
                  </div>
                </div>

                {/* 起止时间 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>开始时间 *</Label>
                    <Input
                      type="month"
                      value={project.start_date}
                      onChange={(e) => handleUpdateProject(index, 'start_date', e.target.value)}
                      className={getFieldError('start_date', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('start_date', index) && (
                      <p className="text-sm text-destructive">{getFieldError('start_date', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>结束时间 *</Label>
                    <Input
                      type="month"
                      value={project.end_date}
                      onChange={(e) => handleUpdateProject(index, 'end_date', e.target.value)}
                      placeholder="项目完成时间"
                      className={getFieldError('end_date', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('end_date', index) && (
                      <p className="text-sm text-destructive">{getFieldError('end_date', index)}</p>
                    )}
                  </div>
                </div>

                {/* 项目描述 */}
                <div className="space-y-2">
                  <Label>项目描述 *</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                    placeholder="请描述项目背景、您的具体工作内容、使用的技术栈、项目成果等..."
                    rows={4}
                    className={getFieldError('description', index) ? 'border-destructive' : ''}
                  />
                  {getFieldError('description', index) && (
                    <p className="text-sm text-destructive">{getFieldError('description', index)}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    建议包括：项目背景、技术栈、个人贡献、项目成果等
                  </p>
                </div>

                {/* 项目预览区域 */}
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{project.name || '项目名称'}</h4>
                      <p className="text-sm text-muted-foreground">{project.role || '项目角色'}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {project.start_date && project.end_date ? 
                          `${project.start_date} - ${project.end_date}` : 
                          '项目时间'
                        }
                      </p>
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-sm mt-2 line-clamp-2">{project.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 添加按钮 */}
        <Button
          onClick={handleAddProject}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加项目经历
        </Button>

        {/* 项目经历填写建议 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">💡 项目经历填写建议</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>项目描述要点：</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• <strong>项目背景：</strong>简述项目目标和业务价值</li>
              <li>• <strong>技术栈：</strong>列出使用的主要技术和工具</li>
              <li>• <strong>个人贡献：</strong>明确您在项目中的具体工作和责任</li>
              <li>• <strong>项目成果：</strong>用数据说明项目效果（如：性能提升、用户增长）</li>
              <li>• <strong>解决方案：</strong>重点描述您解决的技术难点或创新点</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectList; 