import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Code, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RootState } from '@/store';
import { 
  addSkill, 
  updateSkill, 
  removeSkill, 
  Skill 
} from '@/store/slices/resumeSlice';

const SkillList: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const skills = useSelector((state: RootState) => state.resume.skills);
  const validationErrors = useSelector((state: RootState) => state.resume.validationErrors);

  const handleAddSkill = () => {
    const newSkill: Skill = {
      name: '',
      level: '熟练',
      description: ''
    };
    
    dispatch(addSkill(newSkill));
    toast({
      title: "已添加技能",
      description: "请填写技能信息",
    });
  };

  const handleUpdateSkill = (index: number, field: keyof Skill, value: string) => {
    dispatch(updateSkill({ index, data: { [field]: value } }));
  };

  const handleRemoveSkill = (index: number) => {
    dispatch(removeSkill(index));
    toast({
      title: "已删除技能",
      description: "该技能已从简历中移除",
    });
  };

  const getFieldError = (field: string, index: number) => {
    return validationErrors[`skills.${index}.${field}`]?.[0];
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '精通': return 'bg-red-100 text-red-800 border-red-200';
      case '熟练': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '一般': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelStars = (level: string) => {
    const count = level === '精通' ? 3 : level === '熟练' ? 2 : 1;
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          专业技能
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>暂无技能信息</p>
            <p className="text-sm">点击下方按钮添加您的专业技能</p>
          </div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                {/* 删除按钮 */}
                <Button
                  size="sm"
                  onClick={() => handleRemoveSkill(index)}
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-destructive/10 hover:bg-destructive/20 text-destructive border-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {/* 技能名称和等级 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>技能名称 *</Label>
                    <Input
                      value={skill.name}
                      onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                      placeholder="如：React、Python、数据分析"
                      className={getFieldError('name', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('name', index) && (
                      <p className="text-sm text-destructive">{getFieldError('name', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>掌握程度 *</Label>
                    <Select
                      value={skill.level}
                      onValueChange={(value) => handleUpdateSkill(index, 'level', value)}
                    >
                      <SelectTrigger className={getFieldError('level', index) ? 'border-destructive' : ''}>
                        <SelectValue placeholder="请选择掌握程度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="一般">一般</SelectItem>
                        <SelectItem value="熟练">熟练</SelectItem>
                        <SelectItem value="精通">精通</SelectItem>
                      </SelectContent>
                    </Select>
                    {getFieldError('level', index) && (
                      <p className="text-sm text-destructive">{getFieldError('level', index)}</p>
                    )}
                  </div>
                </div>

                {/* 技能展示区域 */}
                <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{skill.name || '技能名称'}</span>
                      <Badge className={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {getLevelStars(skill.level)}
                    </div>
                  </div>
                </div>

                {/* 技能描述 */}
                <div className="space-y-2">
                  <Label>技能描述</Label>
                  <Textarea
                    value={skill.description || ''}
                    onChange={(e) => handleUpdateSkill(index, 'description', e.target.value)}
                    placeholder="简要描述您在该技能方面的经验和成果..."
                    rows={2}
                    className={getFieldError('description', index) ? 'border-destructive' : ''}
                  />
                  {getFieldError('description', index) && (
                    <p className="text-sm text-destructive">{getFieldError('description', index)}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    可以包括使用年限、相关项目、获得认证等
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 添加按钮 */}
        <Button
          onClick={handleAddSkill}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加技能
        </Button>

        {/* 技能分类建议 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">💡 技能分类建议</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-muted-foreground mb-2">技术技能</h5>
              <ul className="text-muted-foreground space-y-1">
                <li>• 编程语言：Python、JavaScript、Java</li>
                <li>• 框架技术：React、Vue、Django</li>
                <li>• 数据库：MySQL、MongoDB、Redis</li>
                <li>• 工具平台：Docker、Git、AWS</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-muted-foreground mb-2">软技能</h5>
              <ul className="text-muted-foreground space-y-1">
                <li>• 项目管理、团队协作</li>
                <li>• 数据分析、产品设计</li>
                <li>• 外语能力、沟通表达</li>
                <li>• 行业认证、专业资质</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            建议技能数量控制在8-12个，突出核心竞争力
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillList; 