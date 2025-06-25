import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User, Upload, Image } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RootState } from '@/store';
import { updateResume, Resume } from '@/store/slices/resumeSlice';

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const resume = useSelector((state: RootState) => state.resume.resume);
  const validationErrors = useSelector((state: RootState) => state.resume.validationErrors);

  const handleInputChange = (field: keyof Resume, value: string | number) => {
    dispatch(updateResume({ [field]: value }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 检查文件类型
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "文件格式不支持",
          description: "请上传JPG或PNG格式的图片",
          variant: "destructive"
        });
        return;
      }

      // 检查文件大小 (1MB)
      if (file.size > 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "头像文件大小不能超过1MB",
          variant: "destructive"
        });
        return;
      }

      // 这里应该调用文件上传API，现在先模拟一个URL
      const mockUrl = URL.createObjectURL(file);
      handleInputChange('avatar_url', mockUrl);
      
      toast({
        title: "头像上传成功",
        description: "头像已更新",
      });
    }
  };

  const getFieldError = (field: string) => {
    return validationErrors[field]?.[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          个人信息
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 头像上传 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {resume.avatar_url ? (
                <img 
                  src={resume.avatar_url} 
                  alt="头像"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleAvatarUpload}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <Upload className="h-4 w-4 text-primary-foreground" />
            </label>
          </div>
          <div>
            <p className="text-sm font-medium">上传头像</p>
            <p className="text-xs text-muted-foreground">支持JPG、PNG格式，大小不超过1MB</p>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名 *</Label>
            <Input
              id="name"
              value={resume.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="请输入姓名"
              className={getFieldError('name') ? 'border-destructive' : ''}
            />
            {getFieldError('name') && (
              <p className="text-sm text-destructive">{getFieldError('name')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">年龄 *</Label>
            <Input
              id="age"
              type="number"
              value={resume.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              placeholder="请输入年龄"
              min="16"
              max="70"
              className={getFieldError('age') ? 'border-destructive' : ''}
            />
            {getFieldError('age') && (
              <p className="text-sm text-destructive">{getFieldError('age')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">联系电话 *</Label>
            <Input
              id="phone"
              value={resume.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="请输入联系电话"
              className={getFieldError('phone') ? 'border-destructive' : ''}
            />
            {getFieldError('phone') && (
              <p className="text-sm text-destructive">{getFieldError('phone')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">邮箱 *</Label>
            <Input
              id="email"
              type="email"
              value={resume.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="请输入邮箱地址"
              className={getFieldError('email') ? 'border-destructive' : ''}
            />
            {getFieldError('email') && (
              <p className="text-sm text-destructive">{getFieldError('email')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">所在城市 *</Label>
            <Input
              id="city"
              value={resume.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="请输入所在城市"
              className={getFieldError('city') ? 'border-destructive' : ''}
            />
            {getFieldError('city') && (
              <p className="text-sm text-destructive">{getFieldError('city')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">个人网站</Label>
            <Input
              id="website"
              type="url"
              value={resume.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="请输入个人网站URL"
              className={getFieldError('website') ? 'border-destructive' : ''}
            />
            {getFieldError('website') && (
              <p className="text-sm text-destructive">{getFieldError('website')}</p>
            )}
          </div>
        </div>

        {/* 学历信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="university">毕业院校 *</Label>
            <Input
              id="university"
              value={resume.university}
              onChange={(e) => handleInputChange('university', e.target.value)}
              placeholder="请输入毕业院校"
              className={getFieldError('university') ? 'border-destructive' : ''}
            />
            {getFieldError('university') && (
              <p className="text-sm text-destructive">{getFieldError('university')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="major">专业 *</Label>
            <Input
              id="major"
              value={resume.major}
              onChange={(e) => handleInputChange('major', e.target.value)}
              placeholder="请输入专业"
              className={getFieldError('major') ? 'border-destructive' : ''}
            />
            {getFieldError('major') && (
              <p className="text-sm text-destructive">{getFieldError('major')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">学历 *</Label>
            <Select
              value={resume.degree}
              onValueChange={(value) => handleInputChange('degree', value)}
            >
              <SelectTrigger className={getFieldError('degree') ? 'border-destructive' : ''}>
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
            {getFieldError('degree') && (
              <p className="text-sm text-destructive">{getFieldError('degree')}</p>
            )}
          </div>
        </div>

        {/* 个人简介 */}
        <div className="space-y-2">
          <Label htmlFor="summary">个人简介 *</Label>
          <Textarea
            id="summary"
            value={resume.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            placeholder="请简要介绍您的专业背景、技能特长和职业目标..."
            rows={4}
            className={getFieldError('summary') ? 'border-destructive' : ''}
          />
          {getFieldError('summary') && (
            <p className="text-sm text-destructive">{getFieldError('summary')}</p>
          )}
          <p className="text-xs text-muted-foreground">
            建议150-300字，突出您的核心优势和职业特色
          </p>
        </div>

        {/* 提示信息 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">💡 填写建议</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 确保联系方式准确无误，便于HR联系</li>
            <li>• 个人简介要简洁有力，突出核心竞争力</li>
            <li>• 上传清晰的职业头像，增强第一印象</li>
            <li>• 带 * 号的字段为必填项</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm; 