import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RootState } from '@/store';
import { 
  addWorkExperience, 
  updateWorkExperience, 
  removeWorkExperience, 
  WorkExperience 
} from '@/store/slices/resumeSlice';

const WorkList: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const workExperiences = useSelector((state: RootState) => state.resume.workExperiences);
  const validationErrors = useSelector((state: RootState) => state.resume.validationErrors);

  const handleAddWork = () => {
    const newWork: WorkExperience = {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: ''
    };
    
    dispatch(addWorkExperience(newWork));
    toast({
      title: "已添加工作经历",
      description: "请填写工作信息",
    });
  };

  const handleUpdateWork = (index: number, field: keyof WorkExperience, value: string) => {
    dispatch(updateWorkExperience({ index, data: { [field]: value } }));
  };

  const handleRemoveWork = (index: number) => {
    dispatch(removeWorkExperience(index));
    toast({
      title: "已删除工作经历",
      description: "该工作经历已从简历中移除",
    });
  };

  const getFieldError = (field: string, index: number) => {
    return validationErrors[`workExperiences.${index}.${field}`]?.[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          工作经历
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {workExperiences.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>暂无工作经历</p>
            <p className="text-sm">点击下方按钮添加您的工作经验</p>
          </div>
        ) : (
          <div className="space-y-6">
            {workExperiences.map((work, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                {/* 删除按钮 */}
                <Button
                  onClick={() => handleRemoveWork(index)}
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-destructive/10 hover:bg-destructive/20 text-destructive border-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {/* 公司和职位 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>公司名称 *</Label>
                    <Input
                      value={work.company}
                      onChange={(e) => handleUpdateWork(index, 'company', e.target.value)}
                      placeholder="请输入公司名称"
                      className={getFieldError('company', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('company', index) && (
                      <p className="text-sm text-destructive">{getFieldError('company', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>职位名称 *</Label>
                    <Input
                      value={work.position}
                      onChange={(e) => handleUpdateWork(index, 'position', e.target.value)}
                      placeholder="请输入职位名称"
                      className={getFieldError('position', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('position', index) && (
                      <p className="text-sm text-destructive">{getFieldError('position', index)}</p>
                    )}
                  </div>
                </div>

                {/* 起止时间 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>入职时间 *</Label>
                    <Input
                      type="month"
                      value={work.start_date}
                      onChange={(e) => handleUpdateWork(index, 'start_date', e.target.value)}
                      className={getFieldError('start_date', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('start_date', index) && (
                      <p className="text-sm text-destructive">{getFieldError('start_date', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>离职时间 *</Label>
                    <Input
                      type="month"
                      value={work.end_date}
                      onChange={(e) => handleUpdateWork(index, 'end_date', e.target.value)}
                      placeholder="在职请选择预计离职时间"
                      className={getFieldError('end_date', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('end_date', index) && (
                      <p className="text-sm text-destructive">{getFieldError('end_date', index)}</p>
                    )}
                  </div>
                </div>

                {/* 工作描述 */}
                <div className="space-y-2">
                  <Label>工作描述 *</Label>
                  <Textarea
                    value={work.description}
                    onChange={(e) => handleUpdateWork(index, 'description', e.target.value)}
                    placeholder="请描述您在该职位的主要工作内容、职责和成就..."
                    rows={4}
                    className={getFieldError('description', index) ? 'border-destructive' : ''}
                  />
                  {getFieldError('description', index) && (
                    <p className="text-sm text-destructive">{getFieldError('description', index)}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    建议包括：主要职责、工作成果、技能提升、团队协作等
                  </p>
                </div>

                {/* 工作预览区域 */}
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{work.position || '职位名称'}</h4>
                      <p className="text-sm text-muted-foreground">{work.company || '公司名称'}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {work.start_date && work.end_date ? 
                          `${work.start_date} - ${work.end_date}` : 
                          '工作时间'
                        }
                      </p>
                    </div>
                  </div>
                  {work.description && (
                    <p className="text-sm mt-2 line-clamp-2">{work.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 添加按钮 */}
        <Button
          onClick={handleAddWork}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加工作经历
        </Button>

        {/* 工作经历填写建议 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">💡 工作经历填写建议</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>工作描述要点：</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• 使用具体数字描述工作成果（如：提升效率30%、管理团队10人）</li>
              <li>• 突出与目标职位相关的技能和经验</li>
              <li>• 使用动作词汇开头（如：负责、完成、优化、领导）</li>
              <li>• 简明扼要，避免冗长的句子</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkList; 