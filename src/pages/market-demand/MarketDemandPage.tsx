import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import {
  Search,
  Filter,
  Heart,
  Clock,
  Users,
  DollarSign,
  Star,
  Award,
  Briefcase,
  Smartphone,
  Code,
  Database,
  Globe,
  Zap,
  TrendingUp,
  Grid3x3,
  List,
  ArrowUpDown,
  Building2,
  Shield,
  AlertCircle,
  Timer
} from 'lucide-react';
import { mockProjectDemands, techStackOptions, difficultyLabels, difficultyColors, type ProjectDemand } from '@/data/mockProjectDemands';

interface FilterState {
  type: 'all' | 'official' | 'sandbox';
  techStack: string[];
  budget: string;
  duration: string;
  difficulty: string[];
  search: string;
}

const MarketDemandPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    techStack: [],
    budget: 'all',
    duration: 'all',
    difficulty: [],
    search: ''
  });
  
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 筛选和排序逻辑
  const filteredProjects = useMemo(() => {
    let filtered = mockProjectDemands.filter(project => {
      // 类型筛选
      if (filters.type !== 'all' && project.type !== filters.type) return false;
      
      // 技术栈筛选
      if (filters.techStack.length > 0) {
        const hasMatchingTech = filters.techStack.some(tech => 
          project.requirements.techStack.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }
      
      // 预算筛选
      if (filters.budget !== 'all') {
        const budget = project.requirements.budget;
        switch (filters.budget) {
          case '1k-5k':
            if (budget.max < 1000 || budget.min > 5000) return false;
            break;
          case '5k-10k':
            if (budget.max < 5000 || budget.min > 10000) return false;
            break;
          case '10k-20k':
            if (budget.max < 10000 || budget.min > 20000) return false;
            break;
          case '20k+':
            if (budget.min < 20000) return false;
            break;
        }
      }
      
      // 难度筛选
      if (filters.difficulty.length > 0) {
        if (!filters.difficulty.includes(project.requirements.difficulty)) return false;
      }
      
      // 搜索筛选
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(searchLower);
        const matchesCompany = project.company.name.toLowerCase().includes(searchLower);
        const matchesTech = project.requirements.techStack.some(tech => 
          tech.toLowerCase().includes(searchLower)
        );
        if (!matchesTitle && !matchesCompany && !matchesTech) return false;
      }
      
      return true;
    });

    // 排序
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'budget-high':
        filtered.sort((a, b) => b.requirements.budget.max - a.requirements.budget.max);
        break;
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
      case 'match':
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const handleTechStackToggle = (tech: string) => {
    setFilters(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const handleDifficultyToggle = (difficulty: string) => {
    setFilters(prev => ({
      ...prev,
      difficulty: prev.difficulty.includes(difficulty)
        ? prev.difficulty.filter(d => d !== difficulty)
        : [...prev.difficulty, difficulty]
    }));
  };

  const handleFavoriteToggle = (projectId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
        toast({
          title: "已取消收藏",
          description: "项目已从收藏列表中移除"
        });
      } else {
        newFavorites.add(projectId);
        toast({
          title: "收藏成功",
          description: "项目已添加到收藏列表"
        });
      }
      return newFavorites;
    });
  };

  const handleApply = (project: ProjectDemand) => {
    toast({
      title: project.type === 'sandbox' ? "挑战申请已提交" : "项目申请已提交",
      description: `您已成功申请项目：${project.title}`
    });
  };

  const getProjectIcon = (project: ProjectDemand) => {
    if (project.requirements.techStack.includes('React Native') || project.requirements.techStack.includes('Flutter')) {
      return <Smartphone className="h-6 w-6" />;
    }
    if (project.requirements.techStack.includes('Solidity') || project.requirements.techStack.includes('Web3.js')) {
      return <Database className="h-6 w-6" />;
    }
    if (project.requirements.techStack.includes('AI/ML') || project.requirements.techStack.includes('OpenAI API')) {
      return <Zap className="h-6 w-6" />;
    }
    return <Code className="h-6 w-6" />;
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '已截止';
    if (diffDays === 0) return '今天截止';
    if (diffDays === 1) return '明天截止';
    return `${diffDays}天后截止`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">市场需求清单</h1>
          <p className="text-gray-600">发现匹配的项目机会，开启您的价值创造之旅</p>
        </div>

        <div className="flex gap-6">
          {/* 左侧筛选器 */}
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  筛选条件
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 搜索框 */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">搜索项目</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索项目、公司或技术栈..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* 需求类型 */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">需求类型</Label>
                  <RadioGroup
                    value={filters.type}
                    onValueChange={(value: 'all' | 'official' | 'sandbox') => 
                      setFilters(prev => ({ ...prev, type: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="text-sm">全部需求</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="official" id="official" />
                      <Label htmlFor="official" className="text-sm">正式项目</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sandbox" id="sandbox" />
                      <Label htmlFor="sandbox" className="text-sm">沙箱挑战</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* 技术栈 */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">技术栈</Label>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {techStackOptions.slice(0, 20).map(tech => (
                      <Button
                        key={tech}
                        variant={filters.techStack.includes(tech) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTechStackToggle(tech)}
                        className="text-xs h-7"
                      >
                        {tech}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 预算范围 */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">预算范围</Label>
                  <Select
                    value={filters.budget}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, budget: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择预算范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">不限</SelectItem>
                      <SelectItem value="1k-5k">1K - 5K</SelectItem>
                      <SelectItem value="5k-10k">5K - 10K</SelectItem>
                      <SelectItem value="10k-20k">10K - 20K</SelectItem>
                      <SelectItem value="20k+">20K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 项目周期 */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">项目周期</Label>
                  <Select
                    value={filters.duration}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择项目周期" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">不限</SelectItem>
                      <SelectItem value="1week">1周内</SelectItem>
                      <SelectItem value="1-4weeks">1-4周</SelectItem>
                      <SelectItem value="1-3months">1-3个月</SelectItem>
                      <SelectItem value="3months+">3个月以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 难度等级 */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">难度等级</Label>
                  <div className="space-y-2">
                    {Object.entries(difficultyLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={filters.difficulty.includes(key)}
                          onCheckedChange={() => handleDifficultyToggle(key)}
                        />
                        <Label htmlFor={key} className="text-sm">{label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <Button 
                  onClick={() => setFilters({
                    type: 'all',
                    techStack: [],
                    budget: 'all',
                    duration: 'all',
                    difficulty: [],
                    search: ''
                  })}
                  variant="outline"
                  className="w-full"
                >
                  重置筛选
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 右侧项目列表 */}
          <div className="flex-1">
            {/* 顶部操作栏 */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  共找到 <span className="font-semibold text-gray-900">{filteredProjects.length}</span> 个项目
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">排序:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">最新发布</SelectItem>
                      <SelectItem value="budget-high">预算由高到低</SelectItem>
                      <SelectItem value="deadline">截止时间</SelectItem>
                      <SelectItem value="match">匹配度</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 项目列表 */}
            <div className={viewMode === 'grid' ? 'grid gap-6' : 'space-y-4'}>
              {filteredProjects.map(project => (
                <Card 
                  key={project.id} 
                  className={`hover:shadow-lg transition-all duration-200 ${
                    project.type === 'sandbox' ? 'border-l-4 border-l-orange-400' : ''
                  } ${project.featured ? 'ring-2 ring-blue-200' : ''}`}
                >
                  <CardContent className="p-6">
                    {/* 项目头部 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          project.type === 'sandbox' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {getProjectIcon(project)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                            {project.featured && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                推荐
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{project.summary}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={project.type === 'sandbox' ? 'default' : 'secondary'}>
                          {project.type === 'sandbox' ? '沙箱挑战' : '正式项目'}
                        </Badge>
                        {project.type === 'sandbox' && (
                          <Badge variant="destructive" className="text-xs">
                            <Timer className="h-3 w-3 mr-1" />
                            {getTimeRemaining(project.deadline)}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFavoriteToggle(project.id)}
                          className={favorites.has(project.id) ? 'text-red-500' : 'text-gray-400'}
                        >
                          <Heart className={`h-4 w-4 ${favorites.has(project.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    {/* 技术栈和难度 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.requirements.techStack.map(tech => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      <Badge className={`text-xs ${difficultyColors[project.requirements.difficulty]}`}>
                        {difficultyLabels[project.requirements.difficulty]}
                      </Badge>
                    </div>

                    {/* 项目信息 */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {project.type === 'sandbox' && project.reward 
                              ? `奖金 ¥${project.reward.toLocaleString()}`
                              : `¥${project.requirements.budget.min.toLocaleString()} - ¥${project.requirements.budget.max.toLocaleString()}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{project.requirements.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{project.applicants.count}人申请</span>
                        </div>
                        {sortBy === 'match' && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-medium">{project.matchScore}% 匹配</span>
                          </div>
                        )}
                      </div>
                      <span className="text-orange-600">
                        {new Date(project.createdAt).toLocaleDateString('zh-CN')}发布
                      </span>
                    </div>

                    {/* 企业信息和操作按钮 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium flex items-center gap-1">
                            {project.company.name}
                            {project.company.verified && (
                              <Shield className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-400" />
                            {project.company.rating} 评分
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                        <Button 
                          onClick={() => handleApply(project)}
                          className={project.type === 'sandbox' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                        >
                          {project.type === 'sandbox' ? '接受挑战' : '立即申请'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 分页 */}
            {filteredProjects.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    上一页
                  </Button>
                  <Button size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
                    下一页
                  </Button>
                </div>
              </div>
            )}

            {/* 空状态 */}
            {filteredProjects.length === 0 && (
              <Card className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的项目</h3>
                <p className="text-gray-600 mb-4">
                  尝试调整筛选条件或搜索关键词
                </p>
                <Button 
                  onClick={() => setFilters({
                    type: 'all',
                    techStack: [],
                    budget: 'all',
                    duration: 'all',
                    difficulty: [],
                    search: ''
                  })}
                >
                  重置筛选条件
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDemandPage; 