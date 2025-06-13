
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProjectSRD, mockProjectSRD } from '../../data/mockProjectSRD';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
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
      timestamp: new Date(),
    }
  ],
  currentSRD: mockProjectSRD,
  srdHistory: [mockProjectSRD],
  isAIResponding: false,
  streamingMessage: '',
};

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
        timestamp: new Date(),
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
        timestamp: new Date(),
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isAIResponding = false;
      });
  },
});

export const { 
  addUserMessage, 
  startStreaming, 
  updateStreamingMessage, 
  finishStreaming, 
  updateSRD 
} = aiStudioSlice.actions;
export default aiStudioSlice.reducer;
