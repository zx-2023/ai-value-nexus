import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RootState } from '@/store';
import { 
  addEducation, 
  updateEducation, 
  removeEducation, 
  Education 
} from '@/store/slices/resumeSlice';

const EducationList: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const educations = useSelector((state: RootState) => state.resume.educations);
  const validationErrors = useSelector((state: RootState) => state.resume.validationErrors);

  const handleAddEducation = () => {
    const newEducation: Education = {
      school: '',
      department: '',
      degree: 'bachelor',
      major: '',
      start_date: '',
      end_date: '',
      gpa: '',
      score: ''
    };
    
    dispatch(addEducation(newEducation));
    toast({
      title: "已添加教育经历",
      description: "请填写教育信息",
    });
  };

  const handleUpdateEducation = (index: number, field: keyof Education, value: string) => {
    dispatch(updateEducation({ index, data: { [field]: value } }));
  };

  const handleRemoveEducation = (index: number) => {
    dispatch(removeEducation(index));
    toast({
      title: "已删除教育经历",
      description: "该教育经历已从简历中移除",
    });
  };

  const getFieldError = (field: string, index: number) => {
    return validationErrors[`educations.${index}.${field}`]?.[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          教育经历
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>暂无教育经历</p>
            <p className="text-sm">点击下方按钮添加您的教育背景</p>
          </div>
        ) : (
          <div className="space-y-6">
            {educations.map((education, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                {/* 删除按钮 */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEducation(index)}
                  className="absolute top-2 right-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {/* 学校和院系 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>学校名称 *</Label>
                    <Input
                      value={education.school}
                      onChange={(e) => handleUpdateEducation(index, 'school', e.target.value)}
                      placeholder="请输入学校名称"
                      className={getFieldError('school', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('school', index) && (
                      <p className="text-sm text-destructive">{getFieldError('school', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>院系/学院 *</Label>
                    <Input
                      value={education.department}
                      onChange={(e) => handleUpdateEducation(index, 'department', e.target.value)}
                      placeholder="请输入院系名称"
                      className={getFieldError('department', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('department', index) && (
                      <p className="text-sm text-destructive">{getFieldError('department', index)}</p>
                    )}
                  </div>
                </div>

                {/* 专业和学历 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>专业 *</Label>
                    <Input
                      value={education.major}
                      onChange={(e) => handleUpdateEducation(index, 'major', e.target.value)}
                      placeholder="请输入专业名称"
                      className={getFieldError('major', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('major', index) && (
                      <p className="text-sm text-destructive">{getFieldError('major', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>学历 *</Label>
                    <Select
                      value={education.degree}
                      onValueChange={(value) => handleUpdateEducation(index, 'degree', value)}
                    >
                      <SelectTrigger className={getFieldError('degree', index) ? 'border-destructive' : ''}>
                        <SelectValue placeholder="请选择学历" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diploma">专科</SelectItem>
                        <SelectItem value="associate">高职</SelectItem>
                        <SelectItem value="bachelor">本科</SelectItem>
                        <SelectItem value="master">硕士</SelectItem>
                        <SelectItem value="phd">博士</SelectItem>
                      </SelectContent>
                    </Select>
                    {getFieldError('degree', index) && (
                      <p className="text-sm text-destructive">{getFieldError('degree', index)}</p>
                    )}
                  </div>
                </div>

                {/* 起止时间 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>入学时间 *</Label>
                    <Input
                      type="month"
                      value={education.start_date}
                      onChange={(e) => handleUpdateEducation(index, 'start_date', e.target.value)}
                      className={getFieldError('start_date', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('start_date', index) && (
                      <p className="text-sm text-destructive">{getFieldError('start_date', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>毕业时间 *</Label>
                    <Input
                      type="month"
                      value={education.end_date}
                      onChange={(e) => handleUpdateEducation(index, 'end_date', e.target.value)}
                      className={getFieldError('end_date', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('end_date', index) && (
                      <p className="text-sm text-destructive">{getFieldError('end_date', index)}</p>
                    )}
                  </div>
                </div>

                {/* 成绩信息 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GPA</Label>
                    <Input
                      value={education.gpa || ''}
                      onChange={(e) => handleUpdateEducation(index, 'gpa', e.target.value)}
                      placeholder="如：3.8/4.0"
                      className={getFieldError('gpa', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('gpa', index) && (
                      <p className="text-sm text-destructive">{getFieldError('gpa', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>成绩排名</Label>
                    <Input
                      value={education.score || ''}
                      onChange={(e) => handleUpdateEducation(index, 'score', e.target.value)}
                      placeholder="如：前10%、85/100"
                      className={getFieldError('score', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('score', index) && (
                      <p className="text-sm text-destructive">{getFieldError('score', index)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 添加按钮 */}
        <Button
          variant="outline"
          onClick={handleAddEducation}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加教育经历
        </Button>

        {/* 提示信息 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">💡 填写建议</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 按时间倒序排列，最高学历放在最前面</li>
            <li>• 如果成绩优秀，建议填写GPA或排名信息</li>
            <li>• 时间格式建议使用年-月，如：2020.09</li>
            <li>• 带 * 号的字段为必填项</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationList; 