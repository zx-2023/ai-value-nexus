export interface SRDSection {
  title: string;
  content: string;
  status: 'draft' | 'reviewing' | 'completed';
  canGenerate?: boolean; // 是否支持AI生成
  isGenerating?: boolean; // 是否正在生成中
}

export interface ProjectSRD {
  projectName: string;
  overview: string;
  userRequirement: string; // 用户的一句话需求
  sections: SRDSection[];
  budgetRange: {
    min: number;
    max: number;
    confidence: number;
  };
  timelineWeeks: {
    min: number;
    max: number;
    confidence: number;
  };
  techStack: string[];
}

export const mockProjectSRD: ProjectSRD = {
  projectName: "Social Photo Sharing App",
  overview: "A mobile-first social platform for photo sharing with AI-powered content discovery, similar to Instagram but focused on travel photography.",
  userRequirement: "我想要一个类似小红书的图片社交App，主要面向旅行摄影爱好者",
  sections: [
    {
      title: "Core Features",
      content: `
## 核心功能清单

### 用户系统
- 用户注册/登录 (邮箱、社交账号)
- 个人资料管理
- 隐私设置

### 内容发布
- 照片上传与编辑
- 滤镜和基础编辑工具
- 地理位置标记
- 标签系统

### 社交互动
- 关注/取消关注
- 点赞、评论、分享
- 私信功能
- 推送通知

### AI 功能
- 智能标签推荐
- 内容个性化推荐
- 图像质量评估
      `,
      status: 'completed',
      canGenerate: true
    },
    {
      title: "Technical Architecture",
      content: `
## 技术架构

### 前端
- React Native (跨平台移动开发)
- Redux Toolkit (状态管理)
- React Navigation (导航)

### 后端
- Node.js + Express
- MongoDB (主数据库)
- Redis (缓存)
- AWS S3 (图片存储)

### AI/ML
- TensorFlow.js (客户端图像处理)
- AWS Rekognition (图像分析)
- 推荐算法服务

### 基础设施
- AWS ECS (容器化部署)
- CloudFront (CDN)
- API Gateway
      `,
      status: 'completed',
      canGenerate: true
    },
    {
      title: "User Experience",
      content: `
## 用户体验设计

### 设计原则
- 移动优先设计
- 极简主义界面
- 快速加载体验

### 关键用户流程
1. 新用户引导流程
2. 内容发布流程
3. 内容发现流程
4. 社交互动流程

### 性能要求
- 应用启动时间 < 3秒
- 图片加载时间 < 2秒
- 操作响应时间 < 500ms
      `,
      status: 'reviewing',
      canGenerate: true
    },
    {
      title: "Testing Strategy",
      content: `
## 测试策略

### 自动化测试
- 单元测试覆盖率 > 80%
- 集成测试
- E2E 测试 (关键用户流程)

### 性能测试
- 负载测试
- 压力测试
- 移动设备性能测试

### 安全测试
- 数据安全审计
- API 安全测试
- 隐私合规检查
      `,
      status: 'draft'
    }
  ],
  budgetRange: {
    min: 150000,
    max: 250000,
    confidence: 85
  },
  timelineWeeks: {
    min: 16,
    max: 24,
    confidence: 78
  },
  techStack: ["React Native", "Node.js", "MongoDB", "AWS", "TensorFlow.js"]
};
