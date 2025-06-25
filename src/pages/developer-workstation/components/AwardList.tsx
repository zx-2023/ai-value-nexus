import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Award as AwardIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RootState } from '@/store';
import { 
  addAward, 
  updateAward, 
  removeAward, 
  Award 
} from '@/store/slices/resumeSlice';

const AwardList: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const awards = useSelector((state: RootState) => state.resume.awards);
  const validationErrors = useSelector((state: RootState) => state.resume.validationErrors);

  const handleAddAward = () => {
    const newAward: Award = {
      title: '',
      date: '',
      description: ''
    };
    
    dispatch(addAward(newAward));
    toast({
      title: "已添加获奖经历",
      description: "请填写获奖信息",
    });
  };

  const handleUpdateAward = (index: number, field: keyof Award, value: string) => {
    dispatch(updateAward({ index, data: { [field]: value } }));
  };

  const handleRemoveAward = (index: number) => {
    dispatch(removeAward(index));
    toast({
      title: "已删除获奖经历",
      description: "该获奖经历已从简历中移除",
    });
  };

  const getFieldError = (field: string, index: number) => {
    return validationErrors[`awards.${index}.${field}`]?.[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AwardIcon className="h-5 w-5" />
          获奖经历
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {awards.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AwardIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>暂无获奖经历</p>
            <p className="text-sm">点击下方按钮添加您的荣誉成就</p>
          </div>
        ) : (
          <div className="space-y-6">
            {awards.map((award, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                {/* 删除按钮 */}
                <Button
                  onClick={() => handleRemoveAward(index)}
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-destructive/10 hover:bg-destructive/20 text-destructive border-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {/* 奖项名称和获奖时间 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>奖项名称 *</Label>
                    <Input
                      value={award.title}
                      onChange={(e) => handleUpdateAward(index, 'title', e.target.value)}
                      placeholder="请输入奖项名称"
                      className={getFieldError('title', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('title', index) && (
                      <p className="text-sm text-destructive">{getFieldError('title', index)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>获奖时间 *</Label>
                    <Input
                      type="month"
                      value={award.date}
                      onChange={(e) => handleUpdateAward(index, 'date', e.target.value)}
                      className={getFieldError('date', index) ? 'border-destructive' : ''}
                    />
                    {getFieldError('date', index) && (
                      <p className="text-sm text-destructive">{getFieldError('date', index)}</p>
                    )}
                  </div>
                </div>

                {/* 获奖描述 */}
                <div className="space-y-2">
                  <Label>获奖描述</Label>
                  <Textarea
                    value={award.description}
                    onChange={(e) => handleUpdateAward(index, 'description', e.target.value)}
                    placeholder="请描述获奖的具体情况、评选标准、个人贡献等..."
                    rows={3}
                    className={getFieldError('description', index) ? 'border-destructive' : ''}
                  />
                  {getFieldError('description', index) && (
                    <p className="text-sm text-destructive">{getFieldError('description', index)}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    建议包括：颁奖机构、评选标准、个人贡献、获奖意义等
                  </p>
                </div>

                {/* 获奖预览区域 */}
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AwardIcon className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium">{award.title || '奖项名称'}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {award.date ? award.date : '获奖时间'}
                      </p>
                      {award.description && (
                        <p className="text-sm mt-2 line-clamp-2">{award.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 添加按钮 */}
        <Button
          onClick={handleAddAward}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加获奖经历
        </Button>

        {/* 获奖经历填写建议 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">💡 获奖经历填写建议</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>常见奖项类型：</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• <strong>学术类：</strong>奖学金、优秀学生、学术竞赛奖</li>
              <li>• <strong>专业类：</strong>编程大赛、技术创新奖、专业认证</li>
              <li>• <strong>工作类：</strong>优秀员工、项目贡献奖、团队协作奖</li>
              <li>• <strong>社会类：</strong>志愿服务奖、公益活动表彰</li>
            </ul>
            <p className="mt-3"><strong>填写要点：</strong>突出奖项的含金量和您的个人贡献</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AwardList; 