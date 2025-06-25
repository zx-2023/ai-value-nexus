import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/hooks/use-toast';
import { 
  Eye, 
  EyeOff, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  mockAIProviders,
  defaultAIConfig,
  getModelsByProvider,
  validateApiKey,
  testConnection,
  type AIProvider,
  type AIModel
} from '@/data/mockAIProviders';

interface AIConfigState {
  providerId: string;
  modelId: string;
  apiKey: string;
  additionalConfig: Record<string, string>;
}

const AIModelConfig = () => {
  const [config, setConfig] = useState<AIConfigState>(defaultAIConfig);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<string>('');
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const selectedProvider = mockAIProviders.find(p => p.id === config.providerId);
  const availableModels = getModelsByProvider(config.providerId);
  const selectedModel = availableModels.find(m => m.id === config.modelId);

  // 当供应商改变时，重置模型选择和额外配置
  useEffect(() => {
    if (selectedProvider) {
      const firstModel = selectedProvider.models[0];
      if (firstModel && config.modelId !== firstModel.id) {
        setConfig(prev => ({
          ...prev,
          modelId: firstModel.id,
          additionalConfig: {}
        }));
      }
      // 如果有额外字段，自动展开高级配置
      if (selectedProvider.additionalFields?.length) {
        setIsAdvancedOpen(true);
      }
    }
  }, [config.providerId, selectedProvider]);

  const handleProviderChange = (providerId: string) => {
    setConfig(prev => ({
      ...prev,
      providerId,
      additionalConfig: {}
    }));
    setTestStatus('idle');
    setTestResult('');
    setResponseTime(null);
  };

  const handleModelChange = (modelId: string) => {
    setConfig(prev => ({ ...prev, modelId }));
    setTestStatus('idle');
  };

  const handleApiKeyChange = (apiKey: string) => {
    setConfig(prev => ({ ...prev, apiKey }));
    setTestStatus('idle');
  };

  const handleAdditionalConfigChange = (field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      additionalConfig: {
        ...prev.additionalConfig,
        [field]: value
      }
    }));
    setTestStatus('idle');
  };

  const handleSave = () => {
    // 保存到localStorage
    localStorage.setItem('ai-config', JSON.stringify(config));
    toast({
      title: "配置已保存",
      description: "AI模型配置已成功保存到本地",
    });
  };

  const handleSaveAndTest = async () => {
    // 先保存
    handleSave();
    
    // 然后测试
    setTestStatus('testing');
    setTestResult('');
    setResponseTime(null);

    try {
      const result = await testConnection({
        providerId: config.providerId,
        modelId: config.modelId,
        apiKey: config.apiKey,
        additionalConfig: config.additionalConfig
      });

      if (result.success) {
        setTestStatus('success');
        setTestResult(result.message);
        setResponseTime(result.responseTime || null);
        toast({
          title: "连接测试成功",
          description: `${result.message}${result.responseTime ? ` (${result.responseTime}ms)` : ''}`,
        });
      } else {
        setTestStatus('error');
        setTestResult(result.message);
        toast({
          title: "连接测试失败",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setTestStatus('error');
      setTestResult('连接测试出现异常，请稍后重试');
      toast({
        title: "测试异常",
        description: "连接测试出现异常，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const isApiKeyValid = config.apiKey ? validateApiKey(config.providerId, config.apiKey) : false;
  const isConfigComplete = config.providerId && config.modelId && config.apiKey && 
    (!selectedProvider?.additionalFields?.some(f => f.required) || 
     selectedProvider.additionalFields.filter(f => f.required).every(f => config.additionalConfig[f.name]?.trim()));

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center space-x-2">
        <Settings className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">大模型配置</h2>
          <p className="text-muted-foreground">配置AI模型供应商和API密钥，用于AI简历功能</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左栏：基础配置 */}
        <Card>
          <CardHeader>
            <CardTitle>基础配置</CardTitle>
            <CardDescription>选择AI模型供应商并配置API密钥</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 供应商选择 */}
            <div className="space-y-2">
              <Label htmlFor="provider">供应商</Label>
              <Select value={config.providerId} onValueChange={handleProviderChange}>
                <SelectTrigger>
                  <SelectValue placeholder="选择AI模型供应商" />
                </SelectTrigger>
                <SelectContent>
                  {mockAIProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div className="flex items-center space-x-2">
                        <span>{provider.logo}</span>
                        <span>{provider.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 模型选择 */}
            <div className="space-y-2">
              <Label htmlFor="model">模型</Label>
              <Select value={config.modelId} onValueChange={handleModelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="选择AI模型" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex flex-col items-start">
                        <span>{model.displayName}</span>
                        <span className="text-xs text-muted-foreground">
                          {model.contextLength.toLocaleString()} tokens · ${model.pricePerMillion}/1M tokens
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* API Key */}
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  value={config.apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder={selectedProvider?.keyPrefix ? `${selectedProvider.keyPrefix}...` : 'API Key'}
                  className={!isApiKeyValid && config.apiKey ? 'border-destructive' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {!isApiKeyValid && config.apiKey && (
                <p className="text-sm text-destructive">API Key格式不正确</p>
              )}
            </div>

            {/* 高级配置（可折叠） */}
            {selectedProvider?.additionalFields && (
              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium rounded-md hover:bg-muted">
                  <span>高级配置</span>
                  {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-2">
                  {selectedProvider.additionalFields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id={field.name}
                        type={field.type}
                        value={config.additionalConfig[field.name] || ''}
                        onChange={(e) => handleAdditionalConfigChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                      />
                      {field.description && (
                        <p className="text-xs text-muted-foreground">{field.description}</p>
                      )}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            <Separator />

            {/* 操作按钮 */}
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSave}>
                保存
              </Button>
              <Button 
                onClick={handleSaveAndTest} 
                disabled={!isConfigComplete || testStatus === 'testing'}
              >
                {testStatus === 'testing' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                保存并测试
              </Button>
            </div>

            {/* 测试结果 */}
            {testStatus !== 'idle' && (
              <Alert className={testStatus === 'success' ? 'border-green-200 bg-green-50' : testStatus === 'error' ? 'border-red-200 bg-red-50' : ''}>
                <div className="flex items-center space-x-2">
                  {testStatus === 'testing' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {testStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {testStatus === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
                  <AlertDescription>
                    {testResult}
                    {responseTime && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({responseTime}ms)
                      </span>
                    )}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 右栏：模型信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {selectedProvider && (
                <>
                  <span>{selectedProvider.logo}</span>
                  <span>{selectedProvider.name}</span>
                </>
              )}
            </CardTitle>
            <CardDescription>{selectedProvider?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedModel ? (
              <>
                <div>
                  <h4 className="font-semibold text-lg">{selectedModel.displayName}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{selectedModel.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">上下文长度</Label>
                    <p className="font-medium">{selectedModel.contextLength.toLocaleString()} tokens</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">价格</Label>
                    <p className="font-medium">${selectedModel.pricePerMillion}/1M tokens</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">发布日期</Label>
                    <p className="font-medium">{selectedModel.releaseDate}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">类型</Label>
                    <Badge variant="secondary" className="mt-1">
                      {selectedModel.category}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={selectedProvider?.documentationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      官方文档
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={selectedProvider?.pricingUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      价格计算器
                    </a>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">请先选择一个模型</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">配置步骤：</h5>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>选择AI模型供应商</li>
                <li>选择具体的AI模型</li>
                <li>输入有效的API Key</li>
                <li>配置额外字段（如需要）</li>
                <li>点击"保存并测试"验证连接</li>
              </ol>
            </div>
            <div>
              <h5 className="font-medium mb-2">安全提示：</h5>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>API Key仅存储在本地浏览器中</li>
                <li>不会上传到任何服务器</li>
                <li>定期更换API Key以确保安全</li>
                <li>不要在公共设备上保存配置</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelConfig;
