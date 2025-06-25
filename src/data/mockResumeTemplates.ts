// 简历模板数据 - 参考AIResume项目
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  author: string;
  category: 'single-column' | 'double-column' | 'creative' | 'minimal';
  tags: string[];
  isPopular?: boolean;
  previewUrl?: string;
}

export const mockResumeTemplates: ResumeTemplate[] = [
  {
    id: "202501",
    name: "简洁模板-单栏",
    description: "简约而不简单的单栏简历模板，适合传统行业和初级开发者",
    thumbnail: "/images/template-a-preview.jpg",
    author: "吃猫的鱼",
    category: "single-column",
    tags: ["简洁", "单栏", "传统", "通用"],
    isPopular: true
  },
  {
    id: "202502", 
    name: "经典单栏模板",
    description: "经典设计的单栏布局，突出工作经历和技能展示",
    thumbnail: "/images/template-b-preview.jpg",
    author: "AI",
    category: "single-column", 
    tags: ["经典", "单栏", "工作经历"],
    isPopular: false
  },
  {
    id: "202503",
    name: "简洁模板-双栏",
    description: "AI构建的简洁双栏简历模板，左侧个人信息，右侧详细经历",
    thumbnail: "/images/template-c-preview.jpg", 
    author: "AI",
    category: "double-column",
    tags: ["双栏", "现代", "技术", "详细"],
    isPopular: true
  },
  {
    id: "202504",
    name: "现代单栏模板", 
    description: "AI构建的现代化单栏简历模板，适合技术岗位",
    thumbnail: "/images/template-d-preview.jpg",
    author: "AI", 
    category: "single-column",
    tags: ["现代", "技术", "单栏", "简洁"],
    isPopular: false
  },
  {
    id: "202505",
    name: "创意设计模板",
    description: "适合设计师和创意工作者的视觉化简历模板",
    thumbnail: "/images/template-creative-preview.jpg",
    author: "Design Team",
    category: "creative", 
    tags: ["创意", "设计", "视觉", "艺术"],
    isPopular: true
  },
  {
    id: "202506", 
    name: "极简主义模板",
    description: "极简设计理念，突出内容本身的价值",
    thumbnail: "/images/template-minimal-preview.jpg",
    author: "Minimal Design",
    category: "minimal",
    tags: ["极简", "内容导向", "纯净", "专业"],
    isPopular: false
  }
];

export const templateCategories = [
  { key: 'all', label: '全部模板', count: mockResumeTemplates.length },
  { key: 'single-column', label: '单栏布局', count: mockResumeTemplates.filter(t => t.category === 'single-column').length },
  { key: 'double-column', label: '双栏布局', count: mockResumeTemplates.filter(t => t.category === 'double-column').length },
  { key: 'creative', label: '创意设计', count: mockResumeTemplates.filter(t => t.category === 'creative').length },
  { key: 'minimal', label: '极简风格', count: mockResumeTemplates.filter(t => t.category === 'minimal').length }
]; 