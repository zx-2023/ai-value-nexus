import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProjectSRD, mockProjectSRD } from '../../data/mockProjectSRD';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

interface AIStudioState {
  messages: Message[];
  currentSRD: ProjectSRD;
  srdHistory: ProjectSRD[];
  isAIResponding: boolean;
  streamingMessage: string;
}

const initialState: AIStudioState = {
  messages: [
    {
      id: '1',
      type: 'system',
      content: '您好！我是您的智能产品经理助手。我将帮助您将想法转化为结构化的软件需求文档(SRD)。\n\n您可以从一句话描述开始，比如"我想要一个类似小红书的图片社交App"，或者上传相关文档让我分析。',
      timestamp: new Date().toISOString(),
    }
  ],
  currentSRD: mockProjectSRD,
  srdHistory: [mockProjectSRD],
  isAIResponding: false,
  streamingMessage: '',
};

// 模拟LLM API调用的服务函数
const callLLMAPI = async (prompt: string, input: string): Promise<string> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // 根据不同的prompt返回不同的模拟数据
  if (prompt.includes('核心功能清单')) {
    return `## 核心功能清单

### 用户系统
- 用户注册/登录（手机号、微信、QQ）
- 个人资料设置与认证
- 隐私权限管理
- 账号安全设置

### 内容发布
- 图片/视频上传与编辑
- 智能滤镜和美颜功能
- 地理位置标记
- 话题标签系统
- 内容分类管理

### 社交互动
- 关注/粉丝体系
- 点赞、评论、转发
- 私信聊天功能
- 动态推送通知
- 互动数据统计

### 搜索与推荐
- 内容智能推荐
- 用户搜索功能
- 热门话题展示
- 个性化内容流

### AI / 数据智能
- 智能标签识别
- 内容质量评估
- 用户兴趣分析
- 个性化推荐算法`;
  }
  
  if (prompt.includes('技术架构设计')) {
    return `## 技术架构设计

### 总体架构图（文字版）
- 前端：移动端App + Web管理后台
- 后端：微服务架构 + API网关
- 数据层：主数据库 + 缓存 + 对象存储
- AI服务：独立AI服务集群

### 关键子系统与职责
- 用户服务：注册登录、个人信息管理
- 内容服务：图片视频存储、内容管理
- 社交服务：关注关系、互动数据
- 推荐服务：AI算法、个性化推荐
- 通知服务：消息推送、实时通知

### 数据流 & 接口
- RESTful API设计，GraphQL查询优化
- 实时数据通过WebSocket传输
- 图片/视频通过CDN加速分发
- 数据分析通过消息队列异步处理

### 技术选型与版本
- 前端：React Native 0.72+ / Flutter 3.0+
- 后端：Node.js 18+ / Python 3.11+
- 数据库：PostgreSQL 15+ / MongoDB 6.0+
- 缓存：Redis 7.0+
- 消息队列：Apache Kafka / RabbitMQ

### 性能 & 伸缩性要点
- CDN全球部署，图片加载<2秒
- 数据库读写分离，支持千万级用户
- 微服务水平扩展，支持高并发
- 缓存策略优化，API响应<500ms

### 安全 & 合规
- HTTPS加密传输
- 用户数据隐私保护
- 内容审核机制
- 数据备份与容灾`;
  }
  
  if (prompt.includes('用户体验说明')) {
    return `## 用户体验说明

### 目标用户 & 场景
- 主要用户：18-35岁旅行摄影爱好者
- 使用场景：旅行分享、摄影交流、灵感发现
- 用户痛点：缺乏专业摄影社区、内容发现困难

### 主要用户旅程（User Journey）
1. 注册引导：简化注册流程，兴趣标签选择
2. 内容发现：智能推荐+分类浏览
3. 内容创作：拍摄-编辑-发布一体化
4. 社交互动：点赞评论-私信-关注成长
5. 成就体系：等级提升-徽章收集-社区认可

### IA / 信息架构（简要导航结构）
- 首页：个性化内容流
- 发现：热门话题、用户推荐
- 创作：拍摄、编辑、发布
- 消息：私信、通知、互动
- 我的：个人资料、设置、统计

### 关键界面草图（文字描述）
- 首页：卡片流布局，双列展示，无限滚动
- 拍摄页：全屏相机，滤镜预览，一键发布
- 详情页：大图展示，评论互动，相关推荐
- 个人页：作品网格，数据概览，关注按钮

### 可访问性 & 国际化
- 支持无障碍阅读，语音导航
- 多语言支持（中英日韩）
- 适配不同屏幕尺寸和系统`;
  }
  
  return '生成失败，请重试';
};

// 生成Core Features的异步action
export const generateCoreFeatures = createAsyncThunk(
  'aiStudio/generateCoreFeatures',
  async (_, { getState }) => {
    const state = getState() as { aiStudio: AIStudioState };
    const userRequirement = state.aiStudio.currentSRD.userRequirement;
    
    const prompt = `🛠 System  
You are a senior product strategist (10+ yrs).  
Goal: turn a single–sentence idea into a concise, implementation-ready Core Features list.  

💬 User  
"""  
请基于【一句话需求】输出 Markdown 格式的《核心功能清单》（Core Features）。  
写作规则：  
1. 一级标题固定为 \`## 核心功能清单\`。  
2. 采用模块分组，二级标题格式 \`### <模块名>\`，从下表中按需挑选或自行新增：  
   • 用户系统 • 内容发布 • 社交互动 • 搜索与推荐 • 支付与交易  
   • AI / 数据智能 • 管理与运营后台 • 通用支撑（日志 / 监控 / 通知）  
3. 每个模块列 3 – 8 条功能点，使用 "- " 起首；**只写"做什么"，不写实现细节**；单条 ≤ 25 字。  
4. 如原始信息不足，可**合理补充**业界通用功能，保持简洁可落地。  
5. 输出仅限 Markdown，本回答不要添加前言、后记或额外解释。  

一句话需求：${userRequirement}  
"""`;

    return await callLLMAPI(prompt, userRequirement);
  }
);

// 生成Technical Architecture的异步action
export const generateTechnicalArchitecture = createAsyncThunk(
  'aiStudio/generateTechnicalArchitecture',
  async (_, { getState }) => {
    const state = getState() as { aiStudio: AIStudioState };
    const coreFeaturesSection = state.aiStudio.currentSRD.sections.find(s => s.title === 'Core Features');
    const functionalRequirements = coreFeaturesSection?.content || '';
    
    const prompt = `🛠 System  
You are a principal software architect (15+ yrs).  
Goal: convert a single-sentence idea into an actionable Technical Architecture blueprint.  

💬 User  
"""  
请基于【功能需求】输出 Markdown 格式的《技术架构设计》（Technical Architecture）。  
写作规则：  
1. 一级标题固定为 \`## 技术架构设计\`。  
2. 依次给出以下二级标题（如无内容可省略，但顺序保持）：  
   ### 总体架构图（文字版）  
   ### 关键子系统与职责  
   ### 数据流 & 接口  
   ### 技术选型与版本  
   ### 性能 & 伸缩性要点  
   ### 安全 & 合规  
3. 每个要点使用 "- " 列表符；**只写"是什么 / 为何选"，不要展开实现细节代码**。  
4. 如信息不足，可合理假设常见做法（云托管、微服务、缓存层等）。  
5. 输出仅限 Markdown，无额外说明。  

功能需求：${functionalRequirements}  
"""`;

    return await callLLMAPI(prompt, functionalRequirements);
  }
);

// 生成User Experience的异步action
export const generateUserExperience = createAsyncThunk(
  'aiStudio/generateUserExperience',
  async (_, { getState }) => {
    const state = getState() as { aiStudio: AIStudioState };
    const userRequirement = state.aiStudio.currentSRD.userRequirement;
    
    const prompt = `You are a senior UX architect specialized in digital products.  
Goal: turn a single–sentence idea into a clear User Experience outline.  

💬 User  
"""  
请基于【功能需求】输出 Markdown 格式的《用户体验说明》（User Experience）。  
写作规则：  
1. 一级标题固定为 \`## 用户体验说明\`。  
2. 二级标题按顺序使用：  
   ### 目标用户 & 场景  
   ### 主要用户旅程（User Journey）  
   ### IA / 信息架构（简要导航结构）  
   ### 关键界面草图（文字描述）  
   ### 可访问性 & 国际化  
3. 每小节用 "- " 列出要点；一句 ≤ 30 字，聚焦体验层面，不写技术实现。  
4. 如需求模糊，可用行业通用最佳实践进行补充。  
5. 输出仅 Markdown，不要附加解说。  

一句话需求：${userRequirement}  
"""`;

    return await callLLMAPI(prompt, userRequirement);
  }
);

export const sendMessage = createAsyncThunk(
  'aiStudio/sendMessage',
  async (content: string, { getState, dispatch }) => {
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      "我理解您想要创建一个社交照片分享应用。让我为您分析几个关键问题：\n\n1. 目标用户群体是什么？（比如旅行爱好者、摄影师、普通用户）\n2. 与现有产品的差异化在哪里？\n3. 希望包含哪些核心功能？\n\n基于您的描述，我已经开始构建SRD框架，请查看右侧预览。",
      "很好！基于您的补充信息，我已经更新了技术架构部分。我建议使用React Native来实现跨平台开发，后端采用Node.js + MongoDB的组合。\n\n接下来我需要了解：\n- 预期的用户规模？\n- 对性能有什么特殊要求？\n- 预算和时间线的大致范围？",
      "完美！我已经为您生成了完整的SRD文档。请查看右侧的预览，包含了详细的功能清单、技术架构、用户体验设计和测试策略。\n\n根据需求分析，我预估：\n• 开发周期：16-24周\n• 预算范围：15-25万\n• 技术风险：中等\n\n您可以直接编辑任何部分，或者继续与我讨论细节优化。"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
);

const aiStudioSlice = createSlice({
  name: 'aiStudio',
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: action.payload,
        timestamp: new Date().toISOString(),
      };
      state.messages.push(newMessage);
    },
    startStreaming: (state) => {
      state.isAIResponding = true;
      state.streamingMessage = '';
      const streamingMessage: Message = {
        id: 'streaming',
        type: 'ai',
        content: '',
        timestamp: new Date().toISOString(),
        isStreaming: true,
      };
      state.messages.push(streamingMessage);
    },
    updateStreamingMessage: (state, action: PayloadAction<string>) => {
      state.streamingMessage = action.payload;
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.isStreaming) {
        lastMessage.content = action.payload;
      }
    },
    finishStreaming: (state, action: PayloadAction<string>) => {
      state.isAIResponding = false;
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.isStreaming) {
        lastMessage.content = action.payload;
        lastMessage.isStreaming = false;
        lastMessage.id = Date.now().toString();
      }
    },
    updateSRD: (state, action: PayloadAction<Partial<ProjectSRD>>) => {
      state.currentSRD = { ...state.currentSRD, ...action.payload };
      state.srdHistory.push(state.currentSRD);
    },
    updateUserRequirement: (state, action: PayloadAction<string>) => {
      state.currentSRD.userRequirement = action.payload;
    },
    setSectionGenerating: (state, action: PayloadAction<{ sectionTitle: string; isGenerating: boolean }>) => {
      const { sectionTitle, isGenerating } = action.payload;
      const section = state.currentSRD.sections.find(s => s.title === sectionTitle);
      if (section) {
        section.isGenerating = isGenerating;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isAIResponding = false;
      })
      // Core Features 生成
      .addCase(generateCoreFeatures.pending, (state) => {
        const section = state.currentSRD.sections.find(s => s.title === 'Core Features');
        if (section) {
          section.isGenerating = true;
        }
      })
      .addCase(generateCoreFeatures.fulfilled, (state, action) => {
        const section = state.currentSRD.sections.find(s => s.title === 'Core Features');
        if (section) {
          section.content = action.payload;
          section.isGenerating = false;
          section.status = 'completed';
        }
      })
      .addCase(generateCoreFeatures.rejected, (state) => {
        const section = state.currentSRD.sections.find(s => s.title === 'Core Features');
        if (section) {
          section.isGenerating = false;
        }
      })
      // Technical Architecture 生成
      .addCase(generateTechnicalArchitecture.pending, (state) => {
        const section = state.currentSRD.sections.find(s => s.title === 'Technical Architecture');
        if (section) {
          section.isGenerating = true;
        }
      })
      .addCase(generateTechnicalArchitecture.fulfilled, (state, action) => {
        const section = state.currentSRD.sections.find(s => s.title === 'Technical Architecture');
        if (section) {
          section.content = action.payload;
          section.isGenerating = false;
          section.status = 'completed';
        }
      })
      .addCase(generateTechnicalArchitecture.rejected, (state) => {
        const section = state.currentSRD.sections.find(s => s.title === 'Technical Architecture');
        if (section) {
          section.isGenerating = false;
        }
      })
      // User Experience 生成
      .addCase(generateUserExperience.pending, (state) => {
        const section = state.currentSRD.sections.find(s => s.title === 'User Experience');
        if (section) {
          section.isGenerating = true;
        }
      })
      .addCase(generateUserExperience.fulfilled, (state, action) => {
        const section = state.currentSRD.sections.find(s => s.title === 'User Experience');
        if (section) {
          section.content = action.payload;
          section.isGenerating = false;
          section.status = 'completed';
        }
      })
      .addCase(generateUserExperience.rejected, (state) => {
        const section = state.currentSRD.sections.find(s => s.title === 'User Experience');
        if (section) {
          section.isGenerating = false;
        }
      });
  },
});

export const { 
  addUserMessage, 
  startStreaming, 
  updateStreamingMessage, 
  finishStreaming, 
  updateSRD,
  updateUserRequirement,
  setSectionGenerating
} = aiStudioSlice.actions;
export default aiStudioSlice.reducer;
