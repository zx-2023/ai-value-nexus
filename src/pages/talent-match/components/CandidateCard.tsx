
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { sendChallengeInvite } from '../../../store/slices/talentMatchSlice';
import { Candidate } from '../../../data/mockCandidates';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import SkillRadarChart from './SkillRadarChart';
import TechnicalFitModal from './TechnicalFitModal';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { challengeLoading } = useSelector((state: RootState) => state.talentMatch);
  const [isChallengeModalOpen, setChallengeModalOpen] = useState(false);
  const [isFitModalOpen, setFitModalOpen] = useState(false);

  const isLoading = challengeLoading[candidate.id] || false;

  const handleSendChallenge = async () => {
    try {
      await dispatch(sendChallengeInvite(candidate.id)).unwrap();
      toast({
        title: "挑战邀请已发送",
        description: `已向 ${candidate.name} 发送沙箱挑战邀请`,
      });
      setChallengeModalOpen(false);
    } catch (error) {
      toast({
        title: "发送失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const getTechnicalFitColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{candidate.timezone}</span>
              <span>•</span>
              <span>${candidate.hourlyRate}/h</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {candidate.badges.slice(0, 4).map((badge) => (
            <Badge key={badge} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
          {candidate.badges.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{candidate.badges.length - 4}
            </Badge>
          )}
        </div>

        <div className="mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <SkillRadarChart skills={candidate.skills} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-1">
                  <p><strong>代码质量:</strong> 基于 SonarQube 对其近 10 万行代码的静态分析</p>
                  <p><strong>性能优化:</strong> 根据项目性能指标和优化案例评估</p>
                  <p><strong>沟通协作:</strong> 基于客户反馈和团队协作评价</p>
                  <p><strong>可靠性:</strong> 项目完成率和按时交付记录</p>
                  <p><strong>创新能力:</strong> 技术方案创新度和解决复杂问题能力</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            <div>{candidate.verifiedProjects} 个已验证项目</div>
            <div>{candidate.completionRate}% 完成率</div>
            <div>响应时间 {candidate.responseTime}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFitModalOpen(true)}
            className="flex items-center gap-1"
          >
            <span className={`text-2xl font-bold ${getTechnicalFitColor(candidate.technicalFit)}`}>
              {candidate.technicalFit}%
            </span>
          </Button>
        </div>

        <Dialog open={isChallengeModalOpen} onOpenChange={setChallengeModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "发送中..." : "发起沙箱挑战"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>发起沙箱挑战</DialogTitle>
              <DialogDescription>
                您即将向 <strong>{candidate.name}</strong> 发起一个付费的限时编程挑战。
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-amber-800 mb-2">挑战详情</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• 费用: ¥200 (60分钟挑战)</li>
                  <li>• 环境: 隔离的云端 IDE</li>
                  <li>• 评估: 自动化测试 + 代码质量分析</li>
                  <li>• 退款: 如挑战未完成将全额退款</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                挑战将测试候选人在您项目相关技术栈下的实际编码能力，包括代码质量、问题解决能力和技术实现水平。
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setChallengeModalOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSendChallenge} disabled={isLoading}>
                {isLoading ? "发送中..." : "确认发送 (¥200)"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <TechnicalFitModal
          isOpen={isFitModalOpen}
          onClose={() => setFitModalOpen(false)}
          candidate={candidate}
        />
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
