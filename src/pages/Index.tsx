import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Code, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI 需求工坊',
      description: '智能化需求分析，将模糊想法转化为精准的技术文档',
      path: '/ai-studio',
      status: '核心功能',
    },
    {
      icon: Users,
      title: '人才匹配',
      description: '基于技术契合度的专家推荐，降低选择成本',
      path: '/talent-match',
      status: '核心功能',
    },
    {
      icon: Code,
      title: '沙箱 IDE',
      description: '云端开发环境，实时验证开发者能力',
      path: '/sandbox',
      status: '核心功能',
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: '提升效率',
      description: '项目和人才之间进行智能匹配，节省 70% 的人力资源筛选时间',
    },
    {
      icon: Shield,
      title: '降低风险',
      description: '沙箱验证机制，项目交付前充分验证，降低交付风险',
    },
    {
      icon: Globe,
      title: '全球协作',
      description: '跨时区的无缝协作体验，24/7 项目进度',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 text-lg md:text-xl px-4 py-2 font-medium">
            基于 AI 的智能协作平台
          </Badge>
          <h1 className="text-4xl md:text-4xl font-bold text-foreground mb-6">
            围绕价值交付，重塑企业和开发者的共赢协作
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            依托需求优化、智能匹配、沙箱验证和预览，<br/>
            为企业、开发者构建可持续的价值交付网络，<br/>
            让需求更可靠、交付有保障、成果更可信。
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/ai-studio">
                开始体验
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              了解更多
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">核心功能</h2>
          <p className="text-lg text-muted-foreground">
            三大核心模块，打造完整的协作闭环
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">{feature.status}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button variant="ghost" asChild className="group-hover:text-primary">
                  <Link to={feature.path}>
                    立即体验
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">为什么选择我们</h2>
            <p className="text-lg text-muted-foreground">
              数据驱动的平台优势
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">准备开始您的项目了吗？</h2>
          <p className="text-lg opacity-90 mb-8">
            从需求分析到人才匹配，从代码验证到项目交付，一站式解决方案等您体验。
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/ai-studio">
                免费开始
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
