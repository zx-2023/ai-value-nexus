
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Star, 
  Download, 
  Eye, 
  Sparkles,
  Zap,
  Layers,
  GitBranch
} from 'lucide-react';

interface SRDTemplate {
  id: string;
  title: string;
  description: string;
  category: 'prd' | 'architecture' | 'datamodel' | 'design';
  tags: string[];
  isPopular?: boolean;
  downloadCount: number;
  content: string;
}

const SRDTemplateHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const templates: SRDTemplate[] = [
    {
      id: '1',
      title: 'SaaS 产品 PRD 模板',
      description: '适用于 B2B SaaS 产品的完整需求文档模板',
      category: 'prd',
      tags: ['SaaS', 'B2B', '企业级'],
      isPopular: true,
      downloadCount: 1247,
      content: `# SaaS 产品需求文档

## 产品概述
- 产品定位
- 目标市场
- 竞争分析

## 用户研究
- 用户画像
- 用户场景
- 痛点分析

## 功能规格
### 核心功能
- [ ] 用户管理
- [ ] 数据分析
- [ ] 团队协作

### 高级功能
- [ ] API 集成
- [ ] 自定义报表
- [ ] 权限管理`
    },
    {
      id: '2',
      title: '微服务架构设计模板',
      description: '企业级微服务架构设计文档模板',
      category: 'architecture',
      tags: ['微服务', '架构', '云原生'],
      isPopular: true,
      downloadCount: 892,
      content: `# 微服务架构设计

## 系统概述
- 业务背景
- 架构目标
- 设计原则

## 服务拆分
### 用户服务
- 用户注册/登录
- 个人信息管理
- 权限控制

### 订单服务
- 订单创建
- 支付处理
- 状态追踪

## 技术选型
- Spring Cloud
- Docker
- Kubernetes`
    }
  ];

  const categories = [
    { key: 'all', label: '全部模板', icon: <FileText className="h-4 w-4" /> },
    { key: 'prd', label: 'PRD 模板', icon: <Sparkles className="h-4 w-4" /> },
    { key: 'architecture', label: '架构设计', icon: <GitBranch className="h-4 w-4" /> },
    { key: 'datamodel', label: '数据模型', icon: <Layers className="h-4 w-4" /> },
    { key: 'design', label: '设计规范', icon: <Zap className="h-4 w-4" /> }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: SRDTemplate) => {
    console.log('Using template:', template.title);
    // 这里可以触发模板应用逻辑
  };

  return (
    <div className="space-y-6">
      {/* 搜索和筛选 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SRD 模板中心
          </CardTitle>
          <CardDescription>
            选择合适的模板快速创建专业的需求文档
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索模板..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category.key} value={category.key} className="flex items-center gap-2">
                  {category.icon}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* 模板列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    {template.isPopular && (
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        <Star className="h-3 w-3 mr-1" />
                        热门
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded text-sm">
                  <pre className="whitespace-pre-wrap font-mono text-xs line-clamp-4">
                    {template.content}
                  </pre>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="h-4 w-4" />
                    {template.downloadCount} 次使用
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      预览
                    </Button>
                    <Button size="sm" onClick={() => handleUseTemplate(template)}>
                      使用模板
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">未找到匹配的模板</h3>
            <p className="text-muted-foreground">
              尝试调整搜索关键词或筛选条件
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SRDTemplateHub;
