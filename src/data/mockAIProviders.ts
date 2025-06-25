// 大模型供应商和模型配置数据

export interface AIModel {
  id: string;
  name: string;
  displayName: string;
  contextLength: number;
  pricePerMillion: number;
  releaseDate: string;
  description: string;
  category: 'text' | 'chat' | 'embedding' | 'multimodal';
}

export interface ProviderField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'url';
  required: boolean;
  placeholder: string;
  description: string;
}

export interface AIProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  models: AIModel[];
  additionalFields?: ProviderField[];
  keyPrefix: string;
  keyFormat: RegExp;
  documentationUrl: string;
  pricingUrl: string;
}

export const mockAIProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '🤖',
    description: '业界领先的AI模型提供商，提供GPT系列模型',
    keyPrefix: 'sk-',
    keyFormat: /^sk-[A-Za-z0-9]{48,}$/,
    documentationUrl: 'https://platform.openai.com/docs',
    pricingUrl: 'https://openai.com/pricing',
    models: [
      {
        id: 'gpt-3.5-turbo',
        name: 'gpt-3.5-turbo',
        displayName: 'GPT-3.5 Turbo',
        contextLength: 16384,
        pricePerMillion: 0.5,
        releaseDate: '2023-03-01',
        description: '快速且经济的对话模型，适合大多数应用场景',
        category: 'chat'
      },
      {
        id: 'gpt-4o-mini',
        name: 'gpt-4o-mini',
        displayName: 'GPT-4o Mini',
        contextLength: 128000,
        pricePerMillion: 0.15,
        releaseDate: '2024-07-18',
        description: '小型但强大的GPT-4模型，平衡性能与成本',
        category: 'chat'
      },
      {
        id: 'gpt-4o',
        name: 'gpt-4o',
        displayName: 'GPT-4o',
        contextLength: 128000,
        pricePerMillion: 5.0,
        releaseDate: '2024-05-13',
        description: '最新的多模态模型，支持文本、图像和音频',
        category: 'multimodal'
      }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    logo: '🧠',
    description: 'Anthropic开发的Claude系列模型，注重安全性和可解释性',
    keyPrefix: 'sk-ant-',
    keyFormat: /^sk-ant-[A-Za-z0-9_-]{95,}$/,
    documentationUrl: 'https://docs.anthropic.com',
    pricingUrl: 'https://www.anthropic.com/pricing',
    models: [
      {
        id: 'claude-3-haiku',
        name: 'claude-3-haiku-20240307',
        displayName: 'Claude 3 Haiku',
        contextLength: 200000,
        pricePerMillion: 0.25,
        releaseDate: '2024-03-07',
        description: '最快的Claude模型，适合简单任务和高频调用',
        category: 'chat'
      },
      {
        id: 'claude-3-sonnet',
        name: 'claude-3-sonnet-20240229',
        displayName: 'Claude 3 Sonnet',
        contextLength: 200000,
        pricePerMillion: 3.0,
        releaseDate: '2024-02-29',
        description: '平衡性能与速度的模型，适合大多数企业应用',
        category: 'chat'
      },
      {
        id: 'claude-3-opus',
        name: 'claude-3-opus-20240229',
        displayName: 'Claude 3 Opus',
        contextLength: 200000,
        pricePerMillion: 15.0,
        releaseDate: '2024-02-29',
        description: '最强大的Claude模型，适合复杂推理和创作任务',
        category: 'chat'
      }
    ]
  },
  {
    id: 'qwen',
    name: '阿里云通义·百炼',
    logo: '☁️',
    description: '阿里云提供的通义千问大模型服务，支持中文优化',
    keyPrefix: 'ak-/sk-',
    keyFormat: /^(ak|sk)-[A-Za-z0-9]{24,}$/,
    documentationUrl: 'https://help.aliyun.com/zh/dashscope',
    pricingUrl: 'https://dashscope.aliyuncs.com/pricing',
    models: [
      {
        id: 'qwen-turbo',
        name: 'qwen-turbo',
        displayName: 'Qwen Turbo',
        contextLength: 8192,
        pricePerMillion: 0.3,
        releaseDate: '2024-01-15',
        description: '高速响应的通义千问模型，适合实时对话应用',
        category: 'chat'
      },
      {
        id: 'qwen-plus',
        name: 'qwen-plus',
        displayName: 'Qwen Plus',
        contextLength: 32768,
        pricePerMillion: 1.0,
        releaseDate: '2024-02-20',
        description: '增强版通义千问，更强的推理和创作能力',
        category: 'chat'
      },
      {
        id: 'qwen-max',
        name: 'qwen-max',
        displayName: 'Qwen Max',
        contextLength: 32768,
        pricePerMillion: 8.0,
        releaseDate: '2024-04-10',
        description: '最强版本的通义千问，顶级性能表现',
        category: 'chat'
      }
    ]
  },
  {
    id: 'ernie',
    name: '百度文心一言',
    logo: '🔥',
    description: '百度开发的文心大模型，深度优化中文理解能力',
    keyPrefix: 'ak-',
    keyFormat: /^ak-[A-Za-z0-9]{24,}$/,
    documentationUrl: 'https://cloud.baidu.com/doc/WENXINWORKSHOP',
    pricingUrl: 'https://cloud.baidu.com/product/wenxinworkshop/pricing',
    models: [
      {
        id: 'ernie-lite-8k',
        name: 'ernie-lite-8k',
        displayName: 'ERNIE Lite 8K',
        contextLength: 8192,
        pricePerMillion: 0.3,
        releaseDate: '2024-01-10',
        description: '轻量级文心模型，快速响应，成本优化',
        category: 'chat'
      },
      {
        id: 'ernie-speed-128k',
        name: 'ernie-speed-128k',
        displayName: 'ERNIE Speed 128K',
        contextLength: 128000,
        pricePerMillion: 1.0,
        releaseDate: '2024-03-15',
        description: '高速版文心模型，支持长文本处理',
        category: 'chat'
      },
      {
        id: 'ernie-4.0',
        name: 'ernie-4.0',
        displayName: 'ERNIE 4.0',
        contextLength: 32768,
        pricePerMillion: 6.0,
        releaseDate: '2024-05-20',
        description: '最新版文心大模型，顶级中文AI能力',
        category: 'chat'
      }
    ]
  },
  {
    id: 'hunyuan',
    name: '腾讯混元',
    logo: '🐧',
    description: '腾讯自研的混元大模型，专注企业级应用场景',
    keyPrefix: 'sk-',
    keyFormat: /^sk-[A-Za-z0-9]{32,}$/,
    documentationUrl: 'https://cloud.tencent.com/document/product/1729',
    pricingUrl: 'https://cloud.tencent.com/product/hunyuan/pricing',
    models: [
      {
        id: 'hunyuan-standard',
        name: 'hunyuan-standard',
        displayName: 'Hunyuan Standard',
        contextLength: 16384,
        pricePerMillion: 0.8,
        releaseDate: '2024-02-01',
        description: '标准版混元模型，平衡性能与成本',
        category: 'chat'
      },
      {
        id: 'hunyuan-pro',
        name: 'hunyuan-pro',
        displayName: 'Hunyuan Pro',
        contextLength: 32768,
        pricePerMillion: 4.0,
        releaseDate: '2024-04-15',
        description: '专业版混元模型，企业级性能保障',
        category: 'chat'
      }
    ]
  },
  {
    id: 'azure-openai',
    name: 'Azure OpenAI Service',
    logo: '🌐',
    description: 'Microsoft Azure提供的OpenAI模型服务，企业级安全保障',
    keyPrefix: 'sk-',
    keyFormat: /^[A-Za-z0-9]{32,}$/,
    documentationUrl: 'https://docs.microsoft.com/azure/cognitive-services/openai',
    pricingUrl: 'https://azure.microsoft.com/pricing/details/cognitive-services/openai-service',
    additionalFields: [
      {
        name: 'endpoint',
        label: 'Azure Endpoint',
        type: 'url',
        required: true,
        placeholder: 'https://your-resource.openai.azure.com',
        description: 'Azure OpenAI资源的端点URL'
      },
      {
        name: 'deploymentName',
        label: 'Deployment Name',
        type: 'text',
        required: true,
        placeholder: 'gpt-35-turbo-deployment',
        description: '模型部署的名称'
      }
    ],
    models: [
      {
        id: 'gpt-35-turbo-1106',
        name: 'gpt-35-turbo',
        displayName: 'GPT-3.5 Turbo (1106)',
        contextLength: 16384,
        pricePerMillion: 0.5,
        releaseDate: '2023-11-06',
        description: 'Azure版GPT-3.5 Turbo，企业级部署',
        category: 'chat'
      },
      {
        id: 'gpt-4o-1106',
        name: 'gpt-4o',
        displayName: 'GPT-4o (1106)',
        contextLength: 128000,
        pricePerMillion: 5.0,
        releaseDate: '2024-05-13',
        description: 'Azure版GPT-4o，多模态能力',
        category: 'multimodal'
      }
    ]
  }
];

// 默认配置
export const defaultAIConfig = {
  providerId: 'openai',
  modelId: 'gpt-3.5-turbo',
  apiKey: 'sk-871b5fe025574c8b8f93be7b4070ef36',
  additionalConfig: {}
};

// 供应商排序权重（最近使用优先）
export const getProvidersSortedByUsage = (recentUsage: string[] = []) => {
  const providers = [...mockAIProviders];
  
  return providers.sort((a, b) => {
    const aIndex = recentUsage.indexOf(a.id);
    const bIndex = recentUsage.indexOf(b.id);
    
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    
    return aIndex - bIndex;
  });
};

// 根据供应商ID获取模型列表
export const getModelsByProvider = (providerId: string): AIModel[] => {
  const provider = mockAIProviders.find(p => p.id === providerId);
  return provider?.models || [];
};

// 验证API Key格式
export const validateApiKey = (providerId: string, apiKey: string): boolean => {
  const provider = mockAIProviders.find(p => p.id === providerId);
  if (!provider) return false;
  
  return provider.keyFormat.test(apiKey);
};

// 真实的连通性测试
export const testConnection = async (config: {
  providerId: string;
  modelId: string;
  apiKey: string;
  additionalConfig?: Record<string, string>;
}): Promise<{ success: boolean; message: string; responseTime?: number }> => {
  // 基础验证
  const isValidKey = validateApiKey(config.providerId, config.apiKey);
  const hasRequiredFields = checkRequiredFields(config.providerId, config.additionalConfig);
  
  if (!isValidKey) {
    return {
      success: false,
      message: 'API Key格式不正确，请检查密钥格式'
    };
  }
  
  if (!hasRequiredFields) {
    return {
      success: false,
      message: '缺少必要的配置字段，请完善配置信息'
    };
  }

  // 获取API地址
  let apiUrl = getApiUrl(config.providerId, config.additionalConfig);
  
  const startTime = Date.now();

  try {
    // 构建测试请求
    const testData = {
      model: config.modelId,
      messages: [
        {
          role: 'user' as const,
          content: '你好，请回复"连接正常"来确认API可用性。'
        }
      ],
      max_tokens: 50,
      temperature: 0.1
    };

    // 发送测试请求
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData),
      signal: AbortSignal.timeout(10000) // 10秒超时
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      // 根据HTTP状态码返回具体错误信息
      switch (response.status) {
        case 401:
          return {
            success: false,
            message: 'API Key无效，请检查密钥是否正确'
          };
        case 403:
          return {
            success: false,
            message: 'API访问被拒绝，请检查权限设置'
          };
        case 429:
          return {
            success: false,
            message: 'API调用频率限制，请稍后再试'
          };
        case 404:
          return {
            success: false,
            message: 'API地址不存在，请检查配置'
          };
        default:
          return {
            success: false,
            message: `HTTP错误 ${response.status}: ${response.statusText}`
          };
      }
    }

    // 尝试解析响应
    const result = await response.json();
    
    if (result.choices && result.choices.length > 0) {
      return {
        success: true,
        message: '连接测试成功，模型响应正常',
        responseTime
      };
    } else {
      return {
        success: false,
        message: '连接成功但响应格式异常'
      };
    }

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: '连接超时，请检查网络连接和API地址'
        };
      } else if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: '网络连接失败，请检查网络设置'
        };
      } else {
        return {
          success: false,
          message: `连接失败: ${error.message}`
        };
      }
    } else {
      return {
        success: false,
        message: '连接测试失败，请检查配置'
      };
    }
  }
};

// 根据供应商获取API地址
function getApiUrl(providerId: string, additionalConfig?: Record<string, string>): string {
  switch (providerId) {
    case 'qwen':
    case 'ali_tongyi':
      return 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    case 'openai':
      return 'https://api.openai.com/v1/chat/completions';
    case 'anthropic':
      return 'https://api.anthropic.com/v1/messages';
    case 'azure-openai':
      if (additionalConfig?.endpoint && additionalConfig?.deploymentName) {
        return `${additionalConfig.endpoint}/openai/deployments/${additionalConfig.deploymentName}/chat/completions?api-version=2024-02-15-preview`;
      }
      return 'https://api.openai.com/v1/chat/completions'; // 默认值
    default:
      return 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'; // 默认使用阿里云
  }
}

// 检查必要字段
const checkRequiredFields = (providerId: string, additionalConfig?: Record<string, string>): boolean => {
  const provider = mockAIProviders.find(p => p.id === providerId);
  if (!provider?.additionalFields) return true;
  
  return provider.additionalFields
    .filter(field => field.required)
    .every(field => additionalConfig?.[field.name]?.trim());
}; 