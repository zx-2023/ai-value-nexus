import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { LayoutTemplate, Search, Star, Download, Eye, Filter, Upload, Plus } from 'lucide-react';
import { mockResumeTemplates, templateCategories, ResumeTemplate } from '@/data/mockResumeTemplates';
import { useToast } from '@/components/ui/use-toast';
import { selectTemplate, setPreviewMode } from '@/store/slices/resumeSlice';

interface TemplateMarketProps {
  onSwitchTab?: (tab: string) => void;
}

const TemplateMarket = ({ onSwitchTab }: TemplateMarketProps) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const { toast } = useToast();

  const filteredTemplates = mockResumeTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const popularTemplates = mockResumeTemplates.filter(template => template.isPopular);

  const handleUseTemplate = (template: ResumeTemplate) => {
    // 更新Redux状态中的选中模板
    dispatch(selectTemplate(template.id));
    
    // 切换到预览标签页以显示模板效果
    if (onSwitchTab) {
      onSwitchTab('preview');
    }
    
    toast({
      title: "模板已应用",
      description: `已成功应用"${template.name}"模板，可在预览标签页查看效果`,
    });
  };

  const handlePreviewTemplate = (template: ResumeTemplate) => {
    // 临时选择模板用于预览
    dispatch(selectTemplate(template.id));
    
    // 切换到预览标签页
    if (onSwitchTab) {
      onSwitchTab('preview');
    }
    
    setSelectedTemplate(template);
    toast({
      title: "预览模板",
      description: `正在预览"${template.name}"模板，可在预览标签页查看效果`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5" />
              简历模板市场
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              选择专业设计的简历模板，快速创建精美简历
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                toast({
                  title: "上传简历",
                  description: "简历上传功能开发中，敬请期待",
                });
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              上传简历
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "制作上传",
                  description: "模板制作上传功能开发中，敬请期待",
                });
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              制作上传
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* 搜索和筛选 */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索模板名称、描述或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* 分类标签 */}
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {templateCategories.map(category => (
              <TabsTrigger key={category.key} value={category.key} className="text-xs">
                {category.label} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 热门推荐 */}
          {selectedCategory === 'all' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                热门推荐
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularTemplates.map(template => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    onUse={handleUseTemplate}
                    onPreview={handlePreviewTemplate}
                    isPopular={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 模板列表 */}
          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onUse={handleUseTemplate}
                  onPreview={handlePreviewTemplate}
                />
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-8">
                <LayoutTemplate className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">未找到匹配的模板</p>
                <p className="text-sm text-muted-foreground mt-1">
                  尝试调整搜索条件或选择其他分类
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// 模板卡片组件
const TemplateCard = ({ 
  template, 
  onUse, 
  onPreview, 
  isPopular = false 
}: { 
  template: ResumeTemplate; 
  onUse: (template: ResumeTemplate) => void;
  onPreview: (template: ResumeTemplate) => void;
  isPopular?: boolean;
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 relative overflow-hidden">
      {isPopular && (
        <Badge className="absolute top-2 right-2 z-10 bg-yellow-500 text-white">
          <Star className="h-3 w-3 mr-1" />
          热门
        </Badge>
      )}
      
      {/* 模板预览图 */}
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <LayoutTemplate className="h-16 w-16 text-gray-400" />
        </div>
        {/* 悬停时显示操作按钮 */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => onPreview(template)}>
            <Eye className="h-4 w-4 mr-1" />
            预览
          </Button>
          <Button size="sm" onClick={() => onUse(template)}>
            <Download className="h-4 w-4 mr-1" />
            使用
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm line-clamp-1">{template.name}</h4>
            <Badge variant="outline" className="text-xs">
              {template.category === 'single-column' ? '单栏' : 
               template.category === 'double-column' ? '双栏' : 
               template.category === 'creative' ? '创意' : '极简'}
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {template.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              by {template.author}
            </span>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => onPreview(template)}>
                预览
              </Button>
              <Button size="sm" onClick={() => onUse(template)}>
                使用
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateMarket;
export type { TemplateMarketProps }; 