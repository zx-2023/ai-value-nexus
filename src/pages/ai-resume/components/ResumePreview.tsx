import { useState, Suspense, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Settings
} from 'lucide-react';
import { getTemplateComponent, generateColorShades } from '@/components/resume-templates';
import { updateSettings, setExportingState } from '@/store/slices/resumeSlice';
import { useToast } from '@/components/ui/use-toast';
import html2pdf from 'html2pdf.js';

const ResumePreview = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const resumeData = useSelector((state: RootState) => state.resume);
  const { settings, isExporting } = resumeData;
  
  const [previewScale, setPreviewScale] = useState(0.8);
  const [showSettings, setShowSettings] = useState(false);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  // 获取当前模板组件
  const TemplateComponent = getTemplateComponent(settings.templateId);
  
  const handleExportToPDF = () => {
    if (resumeContentRef.current) {
      dispatch(setExportingState(true));
      html2pdf().from(resumeContentRef.current).set({
        margin: [settings.margins.top, settings.margins.right, settings.margins.bottom, settings.margins.left],
        filename: `${resumeData.resume.name || '简历'}-Template${settings.templateId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).save().then(() => {
        dispatch(setExportingState(false));
        toast({
          title: "导出成功",
          description: "简历已保存为PDF文件",
        });
      }).catch(error => {
        console.error("PDF导出失败:", error);
        dispatch(setExportingState(false));
        toast({
          title: "导出失败",
          description: "PDF文件导出失败，请重试或联系支持。",
          variant: "destructive"
        });
      });
    } else {
      toast({
        title: "导出失败",
        description: "简历内容未加载，无法导出。",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            预览比例: {Math.round(previewScale * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            设置
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-auto bg-gray-100 p-4">
        <div className="mx-auto" ref={resumeContentRef}>
          <Suspense fallback={
            <div className="w-[794px] h-[1123px] bg-white shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">模板加载中...</p>
              </div>
            </div>
          }>
            {TemplateComponent ? (
              <TemplateComponent
                resumeData={resumeData}
                primaryColor={settings.primaryColor}
                fontSize={settings.fontSize}
                className="shadow-lg"
              />
            ) : (
              <div className="w-[794px] h-[1123px] bg-white shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">未找到模板</p>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview; 