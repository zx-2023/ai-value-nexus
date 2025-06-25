import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { 
  fetchKnowledgeBase, 
  generateRecommendations, 
  setActiveKnowledgeCategory, 
  setProjectContext,
  updateKnowledgeItemUsage 
} from '../../../store/slices/developerSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  Code, 
  Package, 
  Users, 
  Star, 
  TrendingUp, 
  Search,
  Lightbulb,
  Eye,
  Clock,
  ExternalLink,
  Play,
  X,
  ChevronDown,
  ChevronRight,
  Settings,
  Briefcase
} from 'lucide-react';

const KnowledgeBasePanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    knowledgeBase, 
    recommendations, 
    activeKnowledgeCategory, 
    projectContext,
    loading 
  } = useSelector((state: RootState) => state.developer);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['coding_standards']));

  useEffect(() => {
    dispatch(fetchKnowledgeBase());
    
    // Mock project context for demonstration
    const mockContext = {
      srd_content: 'E-commerce platform with payment integration',
      tech_stack: ['React', 'Node.js', 'Stripe'],
      project_phase: 'development',
      complexity_score: 7,
      team_size: 3,
      deadline: '2024-03-15'
    };
    dispatch(setProjectContext(mockContext));
    dispatch(generateRecommendations(mockContext));
  }, [dispatch]);

  // 根据dev_accessories文档结构定义分类
  const categories = [
    { 
      key: 'coding_standards', 
      label: '编码规范', 
      icon: Code, 
      color: 'bg-blue-500',
      count: 42,
      recentUpdate: 3,
      items: [
        { id: 'js-ts', title: 'JavaScript 编码规范 v2.1', desc: '统一的 JS 代码风格指南，包含 ESLint 配置', tags: ['ES6+', '高信任'], time: '2天前' },
        { id: 'vue3', title: 'Vue 3 组件开发规范', desc: 'Composition API 最佳实践和组件设计原则', tags: ['Vue3', '中信任'], time: '1周前' }
      ]
    },
    { 
      key: 'api_components', 
      label: '公共 API', 
      icon: Package, 
      color: 'bg-green-500',
      count: 31,
      recentUpdate: 2,
      items: [
        { id: 'auth-api', title: '用户认证 API v3.0', desc: 'JWT 身份验证、权限管理接口文档', tags: ['JWT', '高信任'], time: '3天前' }
      ]
    },
    { 
      key: 'office_tools', 
      label: '办公工具', 
      icon: Settings, 
      color: 'bg-purple-500',
      count: 18,
      recentUpdate: 1,
      items: [
        { id: 'git-flow', title: 'Git 工作流规范', desc: '分支管理、提交规范、代码审查流程', tags: ['Git', '高信任'], time: '5天前' }
      ]
    },
    { 
      key: 'business_knowledge', 
      label: '业务知识', 
      icon: Briefcase, 
      color: 'bg-orange-500',
      count: 27,
      recentUpdate: 4,
      items: [
        { id: 'ecommerce', title: '电商订单状态流转', desc: '订单生命周期管理、状态机设计说明', tags: ['业务流程', '高信任'], time: '1天前' }
      ]
    }
  ];

  const filteredRecommendations = recommendations.filter(item => {
    if (searchQuery === '') return true;
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleKnowledgeItemClick = (item: any) => {
    dispatch(updateKnowledgeItemUsage(item.id));
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleSandboxPreview = (item: any) => {
    // Generate sandbox link based on item type and content
    const sandboxUrl = `/sandbox?demo=${item.id}&type=${item.category}&file=src/demo/${item.title.replace(/\s+/g, '')}.tsx`;
    window.open(sandboxUrl, '_blank');
  };

  const toggleCategory = (categoryKey: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(categoryKey)) {
      newOpenCategories.delete(categoryKey);
    } else {
      newOpenCategories.add(categoryKey);
    }
    setOpenCategories(newOpenCategories);
  };

  const getCredibilityColor = (tags: string[]) => {
    if (tags.includes('高信任')) return 'text-green-600';
    if (tags.includes('中信任')) return 'text-yellow-600';
    return 'text-gray-600';
  };

  // Check if item has demo code (mock logic)
  const hasDemo = (item: any) => {
    if (!item) return false;
    return item.category === 'api_components' || item.tags?.includes('demo') || item.tags?.includes('代码示例');
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          开发知识库
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 智能推荐区域 - 保持不变 */}
        {recommendations.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="font-medium text-sm">智能推荐</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {filteredRecommendations.slice(0, 3).map(item => (
                <Card key={item.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                      <Badge className="text-xs">
                        {Math.round(item.relevanceScore * 100)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-600">{item.reason}</span>
                      <div className="flex gap-1">
                        {hasDemo(item) && (
                          <Button 
                            className="text-xs h-6 px-2 border border-border hover:bg-accent"
                            onClick={() => handleSandboxPreview(item)}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            沙箱
                          </Button>
                        )}
                        <Button 
                          className="text-xs h-6 px-2 border border-border hover:bg-accent"
                          onClick={() => handleKnowledgeItemClick(item)}
                        >
                          查看
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索标题/标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 分类抽屉区域 - 参考截图设计 */}
        <div className="space-y-3">
          {categories.map(category => (
            <Collapsible 
              key={category.key}
              open={openCategories.has(category.key)}
              onOpenChange={() => toggleCategory(category.key)}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.color} text-white`}>
                          <category.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{category.label}</span>
                            <Badge className="text-xs bg-secondary text-secondary-foreground">
                              {category.count}
                            </Badge>
                            <Badge className="text-xs border border-green-200 text-green-600 bg-green-50">
                              {category.recentUpdate} 最近更新
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {openCategories.has(category.key) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {category.items.map(item => (
                  <Card key={item.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                        <div className="flex items-center gap-1">
                                                     {item.tags.map(tag => (
                             <Badge 
                               key={tag} 
                               className={`text-xs border ${getCredibilityColor([tag])}`}
                             >
                               {tag}
                             </Badge>
                           ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {item.desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="flex gap-1">
                                                     {(category.key === 'api_components' || item.tags.includes('代码示例')) && (
                             <Button 
                               className="text-xs h-6 px-2 border border-border hover:bg-accent"
                               onClick={() => handleSandboxPreview(item)}
                             >
                               <Code className="h-3 w-3 mr-1" />
                               沙箱
                             </Button>
                           )}
                           <Button 
                             className="text-xs h-6 px-2 border border-border hover:bg-accent"
                             onClick={() => handleKnowledgeItemClick(item)}
                           >
                             查看详情
                           </Button>
                           {category.key === 'api_components' && (
                             <Button 
                               className="text-xs h-6 px-2 bg-green-600 hover:bg-green-700 text-white"
                             >
                               + 新增 API 文档
                             </Button>
                           )}
                           {category.key === 'coding_standards' && (
                             <Button 
                               className="text-xs h-6 px-2 bg-blue-600 hover:bg-blue-700 text-white"
                             >
                               + 新增编码规范
                             </Button>
                           )}
                           {category.key === 'office_tools' && (
                             <Button 
                               className="text-xs h-6 px-2 bg-purple-600 hover:bg-purple-700 text-white"
                             >
                               + 新增工具文档
                             </Button>
                           )}
                           {category.key === 'business_knowledge' && (
                             <Button 
                               className="text-xs h-6 px-2 bg-orange-600 hover:bg-orange-700 text-white"
                             >
                               + 新增业务文档
                             </Button>
                           )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* 知识详情抽屉 - 保持原有功能 */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>{selectedItem?.title}</DrawerTitle>
              <DrawerDescription>{selectedItem?.description}</DrawerDescription>
            </DrawerHeader>
            
            <div className="p-6 space-y-4">
              {/* 标签展示 */}
              {selectedItem?.tags && (
                                 <div className="flex flex-wrap gap-2">
                   {selectedItem.tags.map((tag: string) => (
                     <Badge key={tag} className="border">{tag}</Badge>
                   ))}
                 </div>
              )}
              
              {/* 内容展示 */}
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{selectedItem?.content || selectedItem?.desc || ''}</div>
              </div>
              
              {/* 代码示例区域 */}
              {hasDemo(selectedItem) && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">代码示例</h4>
                                         <Button
                       className="border border-border hover:bg-accent"
                       onClick={() => handleSandboxPreview(selectedItem)}
                     >
                       <ExternalLink className="h-4 w-4 mr-1" />
                       在沙箱中预览
                     </Button>
                  </div>
                  <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                    <code>{selectedItem?.codeExample || '// 示例代码将在沙箱中展示'}</code>
                  </pre>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBasePanel; 