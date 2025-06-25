// 模板组件动态加载 - 参考AIResume项目的模板系统
import { lazy } from 'react';
import { ResumeState } from '@/store/slices/resumeSlice';

// 模板组件接口
export interface TemplateProps {
  resumeData: ResumeState;
  primaryColor?: string;
  fontSize?: number;
  className?: string;
}

// 模板配置接口
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  component: React.ComponentType<TemplateProps>;
}

// 动态导入模板组件 - 类似AIResume的动态加载机制
const Template1 = lazy(() => import('./Template1/index').then(module => ({ default: module.Template1 })));
const Template2 = lazy(() => import('./Template2/index').then(module => ({ default: module.Template2 })));
const Template3 = lazy(() => import('./Template3/index').then(module => ({ default: module.Template3 })));
const Template4 = lazy(() => import('./Template4/index').then(module => ({ default: module.Template4 })));
const Template5 = lazy(() => import('./Template5/index').then(module => ({ default: module.Template5 })));
const Template6 = lazy(() => import('./Template6/index').then(module => ({ default: module.Template6 })));

// 模板配置映射表 - 类似AIResume的templates.json
export const templateConfigs: Record<string, TemplateConfig> = {
  '202501': {
    id: '202501',
    name: '简洁模板-单栏',
    description: '简约而不简单的单栏简历模板，适合传统行业和初级开发者',
    category: 'single-column',
    component: Template1
  },
  '202502': {
    id: '202502',
    name: '经典单栏模板',
    description: '经典设计的单栏布局，突出工作经历和技能展示',
    category: 'single-column',
    component: Template2
  },
  '202503': {
    id: '202503',
    name: '简洁模板-双栏',
    description: 'AI构建的简洁双栏简历模板，左侧个人信息，右侧详细经历',
    category: 'double-column',
    component: Template3
  },
  '202504': {
    id: '202504',
    name: '现代单栏模板',
    description: 'AI构建的现代化单栏简历模板，适合技术岗位',
    category: 'single-column',
    component: Template4
  },
  '202505': {
    id: '202505',
    name: '创意设计模板',
    description: '适合设计师和创意工作者的视觉化简历模板',
    category: 'creative',
    component: Template5
  },
  '202506': {
    id: '202506',
    name: '极简主义模板',
    description: '极简设计理念，突出内容本身的价值',
    category: 'minimal',
    component: Template6
  }
};

// 获取模板组件 - 类似AIResume的动态组件加载
export const getTemplateComponent = (templateId: string): React.ComponentType<TemplateProps> | null => {
  const config = templateConfigs[templateId];
  return config ? config.component : null;
};

// 获取模板配置
export const getTemplateConfig = (templateId: string): TemplateConfig | null => {
  return templateConfigs[templateId] || null;
};

// 获取所有模板配置
export const getAllTemplateConfigs = (): TemplateConfig[] => {
  return Object.values(templateConfigs);
};

// 颜色生成工具 - 参考AIResume的色彩系统
export const generateColorShades = (primaryColor: string) => {
  // 简化的色彩生成逻辑，实际项目中可以使用更复杂的色彩算法
  const colors = {
    primary: primaryColor,
    light: primaryColor + '20', // 添加透明度
    dark: primaryColor,
    text: '#333333',
    muted: '#666666',
    border: '#e5e5e5'
  };
  
  return colors;
}; 