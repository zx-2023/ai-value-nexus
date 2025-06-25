export interface KnowledgeItem {
  id: string;
  category: 'coding_standards' | 'api_components' | 'office_tools' | 'business_knowledge';
  subcategory: string;
  title: string;
  content: string;
  tags: string[];
  tech_stack: string[];
  project_phase: string[];
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  usage_count: number;
  rating: number;
  last_updated: string;
  author?: string;
  description: string;
}

export interface ProjectContext {
  srd_content: string;
  tech_stack: string[];
  project_phase: string;
  complexity_score: number;
  team_size: number;
  deadline: string;
}

export interface SmartRecommendation extends KnowledgeItem {
  relevanceScore: number;
  reason: string;
}

export const mockKnowledgeBase: KnowledgeItem[] = [
  // 编码规范模块
  {
    id: 'kb1',
    category: 'coding_standards',
    subcategory: 'JavaScript/TypeScript',
    title: 'React 组件设计最佳实践',
    description: '现代React组件的设计原则和代码规范',
    content: '# React 组件设计最佳实践\n\n## 组件拆分原则\n- 单一职责原则\n- 可复用性设计\n- Props接口设计\n\n## 性能优化\n- 使用React.memo\n- useCallback和useMemo\n- 避免内联对象和函数',
    tags: ['React', 'TypeScript', '最佳实践', '性能优化'],
    tech_stack: ['React', 'TypeScript'],
    project_phase: ['development', 'optimization'],
    difficulty_level: 'intermediate',
    usage_count: 145,
    rating: 4.8,
    last_updated: '2024-01-15',
    author: 'Alex Chen'
  },
  {
    id: 'kb2',
    category: 'coding_standards',
    subcategory: 'API设计',
    title: 'RESTful API 设计规范',
    description: '企业级RESTful API的设计标准和最佳实践',
    content: '# RESTful API 设计规范\n\n## URL设计\n- 使用名词而非动词\n- 资源嵌套不超过3层\n- 版本控制策略\n\n## 状态码使用\n- 2xx: 成功\n- 4xx: 客户端错误\n- 5xx: 服务器错误',
    tags: ['API', 'RESTful', '后端', '设计规范'],
    tech_stack: ['Node.js', 'Express', 'FastAPI'],
    project_phase: ['planning', 'development'],
    difficulty_level: 'beginner',
    usage_count: 289,
    rating: 4.9,
    last_updated: '2024-01-20',
    author: 'Sarah Johnson'
  },

  // 公共API及组件库
  {
    id: 'kb3',
    category: 'api_components',
    subcategory: '认证授权',
    title: 'JWT 认证实现指南',
    description: '基于JWT的用户认证和授权系统实现',
    content: '# JWT 认证实现指南\n\n## JWT结构\n- Header: 算法和令牌类型\n- Payload: 声明信息\n- Signature: 签名验证\n\n## 实现步骤\n1. 用户登录验证\n2. 生成JWT token\n3. 客户端存储token\n4. 请求携带token\n5. 服务端验证token',
    tags: ['JWT', '认证', '安全', 'Token'],
    tech_stack: ['Node.js', 'React', 'Express'],
    project_phase: ['planning', 'development'],
    difficulty_level: 'intermediate',
    usage_count: 234,
    rating: 4.7,
    last_updated: '2024-01-18',
    author: 'David Kumar'
  },
  {
    id: 'kb4',
    category: 'api_components',
    subcategory: '支付集成',
    title: 'Stripe 支付集成方案',
    description: '完整的Stripe支付系统集成指南',
    content: '# Stripe 支付集成方案\n\n## 前端集成\n```tsx\nimport { loadStripe } from "@stripe/stripe-js"\nimport { Elements } from "@stripe/react-stripe-js"\n```\n\n## 后端集成\n- 创建PaymentIntent\n- 处理Webhook回调\n- 错误处理机制',
    tags: ['Stripe', '支付', '电商', '集成'],
    tech_stack: ['React', 'Node.js', 'Stripe'],
    project_phase: ['development', 'integration'],
    difficulty_level: 'advanced',
    usage_count: 167,
    rating: 4.6,
    last_updated: '2024-01-22',
    author: 'Maria Garcia'
  },

  // 办公协作知识
  {
    id: 'kb5',
    category: 'office_tools',
    subcategory: 'CI/CD流程',
    title: 'GitHub Actions 自动化部署',
    description: 'GitHub Actions的CI/CD最佳实践和配置指南',
    content: '# GitHub Actions 自动化部署\n\n## 基础配置\n```yaml\nname: CI/CD Pipeline\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n```\n\n## 部署策略\n- 测试环境自动部署\n- 生产环境手动审批\n- 回滚机制',
    tags: ['CI/CD', 'GitHub Actions', '自动化', '部署'],
    tech_stack: ['Git', 'Docker', 'AWS'],
    project_phase: ['deployment', 'maintenance'],
    difficulty_level: 'intermediate',
    usage_count: 198,
    rating: 4.5,
    last_updated: '2024-01-25',
    author: 'James Wilson'
  },
  {
    id: 'kb6',
    category: 'office_tools',
    subcategory: '团队协作',
    title: 'Slack 集成开发指南',
    description: '团队协作中的Slack Bot开发和集成方案',
    content: '# Slack 集成开发指南\n\n## Bot创建步骤\n1. 创建Slack App\n2. 配置Bot权限\n3. 获取Bot Token\n4. 实现Webhook处理\n\n## 常用功能\n- 消息发送\n- 文件上传\n- 交互式按钮\n- 模态框弹窗',
    tags: ['Slack', 'Bot', '团队协作', 'Webhook'],
    tech_stack: ['Node.js', 'Slack API'],
    project_phase: ['integration', 'collaboration'],
    difficulty_level: 'beginner',
    usage_count: 156,
    rating: 4.4,
    last_updated: '2024-01-28',
    author: 'Liu Wei'
  },

  // 业务知识沉淀
  {
    id: 'kb7',
    category: 'business_knowledge',
    subcategory: '电商平台',
    title: '电商订单系统设计模式',
    description: '基于平台历史项目的电商订单系统最佳实践',
    content: '# 电商订单系统设计模式\n\n## 订单状态管理\n- 待支付 → 已支付 → 已发货 → 已完成\n- 取消订单处理逻辑\n- 退款流程设计\n\n## 库存管理\n- 预占库存机制\n- 超时释放策略\n- 并发控制方案',
    tags: ['电商', '订单系统', '状态机', '库存管理'],
    tech_stack: ['Node.js', 'Redis', 'MySQL'],
    project_phase: ['planning', 'development'],
    difficulty_level: 'advanced',
    usage_count: 89,
    rating: 4.9,
    last_updated: '2024-01-30',
    author: 'Tech Expert'
  },
  {
    id: 'kb8',
    category: 'business_knowledge',
    subcategory: '数据分析',
    title: '用户行为分析系统',
    description: '用户行为追踪和分析的技术实现方案',
    content: '# 用户行为分析系统\n\n## 数据收集\n- 埋点策略设计\n- 事件定义规范\n- 数据采集SDK\n\n## 数据处理\n- 实时数据流处理\n- 离线数据分析\n- 指标计算和存储',
    tags: ['数据分析', '用户行为', '埋点', '大数据'],
    tech_stack: ['React', 'Python', 'Kafka', 'ClickHouse'],
    project_phase: ['planning', 'development', 'analytics'],
    difficulty_level: 'advanced',
    usage_count: 123,
    rating: 4.7,
    last_updated: '2024-02-01',
    author: 'Data Team'
  }
];

// Mock项目上下文数据
export const mockProjectContext: ProjectContext = {
  srd_content: 'E-commerce platform with payment integration and user management',
  tech_stack: ['React', 'Node.js', 'Stripe', 'MySQL'],
  project_phase: 'development',
  complexity_score: 7,
  team_size: 3,
  deadline: '2024-03-15'
};

// 智能推荐算法模拟
export const generateSmartRecommendations = (
  context: ProjectContext,
  knowledgeBase: KnowledgeItem[]
): SmartRecommendation[] => {
  return knowledgeBase
    .map(item => {
      let relevanceScore = 0;
      let reasons: string[] = [];

      // 技术栈匹配 (40%)
      const techMatch = item.tech_stack.filter(tech => 
        context.tech_stack.some(cttech => cttech.toLowerCase().includes(tech.toLowerCase()))
      ).length;
      if (techMatch > 0) {
        relevanceScore += (techMatch / item.tech_stack.length) * 0.4;
        reasons.push(`技术栈匹配${techMatch}项`);
      }

      // 项目阶段匹配 (25%)
      if (item.project_phase.includes(context.project_phase)) {
        relevanceScore += 0.25;
        reasons.push('适用当前开发阶段');
      }

      // 复杂度匹配 (20%)
      const complexityMatch = context.complexity_score >= 7 ? 
        (item.difficulty_level === 'advanced' ? 1 : 0.5) :
        (item.difficulty_level === 'beginner' ? 1 : 0.7);
      relevanceScore += complexityMatch * 0.2;
      if (complexityMatch === 1) {
        reasons.push('难度级别匹配');
      }

      // 使用热度加分 (15%)
      const popularityScore = Math.min(item.usage_count / 300, 1);
      relevanceScore += popularityScore * 0.15;
      if (item.usage_count > 200) {
        reasons.push('社区热门推荐');
      }

      return {
        ...item,
        relevanceScore,
        reason: reasons.join(' · ')
      };
    })
    .filter(item => item.relevanceScore > 0.6)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6);
}; 