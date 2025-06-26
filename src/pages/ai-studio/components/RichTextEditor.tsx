
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Image, Table, GitBranch, Zap } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const RichTextEditor = ({ content, onContentChange }: RichTextEditorProps) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: 'prd',
      name: 'PRD 模板',
      description: 'Problem, Audience, User-Journey, MVP, KPI',
      icon: <FileText className="h-4 w-4" />,
      template: `# 产品需求文档 (PRD)

## 问题定义 / Problem Statement
- 当前痛点：
- 目标用户：
- 市场机会：

## 用户画像 / Target Audience
- 主要用户群体：
- 使用场景：
- 核心需求：

## 用户旅程 / User Journey
1. 发现阶段
2. 体验阶段  
3. 转化阶段
4. 留存阶段

## MVP 功能 / MVP Features
- [ ] 核心功能1
- [ ] 核心功能2
- [ ] 核心功能3

## 关键指标 / KPIs
- 用户获取成本 (CAC)
- 用户生命周期价值 (LTV)
- 月活跃用户 (MAU)`
    },
    {
      id: 'architecture',
      name: '架构图模板',
      description: 'C4 Model、ER 图、时序图',
      icon: <GitBranch className="h-4 w-4" />,
      template: `# 系统架构设计

## C4 架构模型

### Context 层 (系统上下文)
\`\`\`mermaid
graph TB
    User[用户] --> System[系统]
    System --> ExtAPI[外部API]
    System --> DB[(数据库)]
\`\`\`

### Container 层 (容器视图)
- Web 应用
- API 服务
- 数据存储

### Component 层 (组件视图)
- 业务逻辑层
- 数据访问层
- 表现层

## 数据流时序图
\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant B as 后端
    participant D as 数据库
    
    U->>F: 发起请求
    F->>B: API 调用
    B->>D: 数据查询
    D-->>B: 返回结果
    B-->>F: 响应数据
    F-->>U: 展示结果
\`\`\``
    },
    {
      id: 'datamodel',
      name: '数据模型模板',
      description: 'Feature Spec + JSON Schema',
      icon: <Table className="h-4 w-4" />,
      template: `# 数据模型设计

## 实体关系图 (ER)

### 用户实体 (User)
| 字段名 | 类型 | 描述 | 约束 |
|-------|------|------|------|
| id | UUID | 用户ID | PK |
| username | STRING | 用户名 | UNIQUE |
| email | STRING | 邮箱 | UNIQUE |
| created_at | TIMESTAMP | 创建时间 | NOT NULL |

### JSON Schema 示例
\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "user": {
      "type": "object",
      "properties": {
        "id": {"type": "string", "format": "uuid"},
        "username": {"type": "string", "minLength": 3},
        "email": {"type": "string", "format": "email"}
      },
      "required": ["id", "username", "email"]
    }
  }
}
\`\`\``
    }
  ];

  const slashCommands = [
    { command: '/table', description: '插入表格', icon: <Table className="h-3 w-3" /> },
    { command: '/sequence', description: '时序图', icon: <GitBranch className="h-3 w-3" /> },
    { command: '/gif', description: '上传GIF', icon: <Image className="h-3 w-3" /> },
  ];

  const handleSlashCommand = (command: string) => {
    let insertText = '';
    
    switch (command) {
      case '/table':
        insertText = `
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 行1 | 数据 | 数据 |
| 行2 | 数据 | 数据 |
`;
        break;
      case '/sequence':
        insertText = `
\`\`\`mermaid
sequenceDiagram
    participant A as 用户
    participant B as 系统
    A->>B: 请求
    B-->>A: 响应
\`\`\`
`;
        break;
      case '/gif':
        insertText = '\n![GIF描述](图片URL)\n';
        break;
    }
    
    onContentChange(content + insertText);
  };

  const applyTemplate = (template: string) => {
    onContentChange(template);
    setShowTemplates(false);
    setActiveTemplate(null);
  };

  return (
    <div className="space-y-4">
      {/* 工具栏 */}
      <div className="flex items-center gap-2 p-2 border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTemplates(!showTemplates)}
        >
          <FileText className="h-4 w-4 mr-2" />
          模板库
        </Button>
        
        <div className="flex gap-1">
          {slashCommands.map((cmd) => (
            <Button
              key={cmd.command}
              variant="ghost"
              size="sm"
              onClick={() => handleSlashCommand(cmd.command)}
              title={cmd.description}
            >
              {cmd.icon}
              {cmd.command}
            </Button>
          ))}
        </div>
      </div>

      {/* 模板选择器 */}
      {showTemplates && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">选择模板</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => applyTemplate(template.template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {template.icon}
                      <h3 className="font-medium">{template.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 编辑器 */}
      <Tabs defaultValue="edit" className="w-full">
        <TabsList>
          <TabsTrigger value="edit">编辑</TabsTrigger>
          <TabsTrigger value="preview">预览</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full h-96 p-4 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="开始编写您的需求文档...

支持快捷命令：
/table - 插入表格
/sequence - 插入时序图
/gif - 插入图片

支持 Markdown 语法和 Mermaid 图表"
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="border rounded-md p-4 h-96 overflow-y-auto bg-background">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans">{content}</pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 快捷提示 */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">
          <Zap className="h-3 w-3 mr-1" />
          支持 Markdown
        </Badge>
        <Badge variant="secondary">Mermaid 图表</Badge>
        <Badge variant="secondary">LaTeX 公式</Badge>
        <Badge variant="secondary">Figma 嵌入</Badge>
      </div>
    </div>
  );
};

export default RichTextEditor;
