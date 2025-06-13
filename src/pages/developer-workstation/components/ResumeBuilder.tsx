
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileUser, Download, Wand2, TrendingUp, Award, Code } from 'lucide-react';

const ResumeBuilder = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const mockProfile = {
    name: '张开发者',
    title: '全栈开发工程师',
    email: 'zhang@email.com',
    phone: '+86 138-0000-0000',
    summary: '拥有5年全栈开发经验，精通React、Node.js、Python等技术栈。在电商、金融等领域有丰富的项目经验。',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
    experience: [
      {
        company: 'Tech Corp',
        position: '高级前端工程师',
        period: '2022-至今',
        achievements: [
          '独立完成电商平台前端架构设计，提升页面加载速度40%',
          '带领3人团队完成移动端App开发，用户满意度达98%'
        ]
      }
    ]
  };

  const mockProjects = [
    {
      name: 'E-commerce Platform',
      description: '基于React和Node.js的电商平台',
      technologies: ['React', 'Node.js', 'MongoDB', 'Redis'],
      impact: '支持日活跃用户10万+，交易额提升35%',
      rating: 4.9,
      complexity: 'high'
    },
    {
      name: 'Analytics Dashboard',
      description: '数据可视化分析平台',
      technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
      impact: '帮助企业决策效率提升50%',
      rating: 4.8,
      complexity: 'medium'
    }
  ];

  const handleOptimizeResume = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      // 这里会调用AI优化逻辑
    }, 3000);
  };

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'high':
        return <Badge className="bg-red-500">高难度</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">中等难度</Badge>;
      default:
        return <Badge variant="secondary">简单</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileUser className="h-5 w-5" />
          智能简历优化
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder">简历构建</TabsTrigger>
            <TabsTrigger value="skills">技能档案</TabsTrigger>
            <TabsTrigger value="portfolio">作品集</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Progress value={85} className="flex-1" />
              <span className="text-sm text-muted-foreground">完整度: 85%</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">姓名</label>
                <Input value={mockProfile.name} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">职位标题</label>
                <Input value={mockProfile.title} className="mt-1" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">个人简介</label>
              <Textarea value={mockProfile.summary} className="mt-1" rows={3} />
            </div>

            <div>
              <label className="text-sm font-medium">核心技能</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {mockProfile.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
                <Button variant="outline" size="sm">+ 添加技能</Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleOptimizeResume} disabled={isOptimizing}>
                <Wand2 className="h-4 w-4 mr-2" />
                {isOptimizing ? 'AI优化中...' : 'AI智能优化'}
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                导出PDF
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">技能成长轨迹</h4>
              
              {mockProfile.skills.slice(0, 4).map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill}</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">专家级</span>
                    </div>
                  </div>
                  <Progress value={Math.random() * 40 + 60} />
                  <p className="text-xs text-muted-foreground">
                    基于 {Math.floor(Math.random() * 10 + 5)} 个项目经验评估
                  </p>
                </div>
              ))}

              <div className="mt-6">
                <h4 className="font-medium mb-3">技能认证建议</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span className="text-sm">React 高级开发者认证</span>
                    </div>
                    <Button size="sm" variant="outline">获取认证</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span className="text-sm">AWS 云架构师认证</span>
                    </div>
                    <Button size="sm" variant="outline">获取认证</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">项目作品集</h4>
                <Button size="sm" variant="outline">+ 添加项目</Button>
              </div>

              {mockProjects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{project.name}</h5>
                    <div className="flex items-center gap-2">
                      {getComplexityBadge(project.complexity)}
                      <Badge variant="outline">★ {project.rating}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{project.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">商业影响：</span>
                    <span>{project.impact}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Code className="h-4 w-4 mr-1" />
                      查看代码
                    </Button>
                    <Button size="sm" variant="outline">预览项目</Button>
                    <Button size="sm" variant="outline">编辑描述</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResumeBuilder;
