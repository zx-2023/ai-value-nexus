
import React from 'react';
import { Candidate } from '../../../data/mockCandidates';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TechnicalFitModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

const TechnicalFitModal: React.FC<TechnicalFitModalProps> = ({ isOpen, onClose, candidate }) => {
  const requiredTechStack = ["React", "Node.js", "TypeScript", "MongoDB", "AWS"];
  
  const calculateMatch = (required: string[], badges: string[]) => {
    const matches = required.filter(tech => 
      badges.some(badge => badge.toLowerCase().includes(tech.toLowerCase()))
    );
    return {
      matches,
      percentage: Math.round((matches.length / required.length) * 100)
    };
  };

  const techMatch = calculateMatch(requiredTechStack, candidate.badges);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>技术契合度解析</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {candidate.technicalFit}%
            </div>
            <p className="text-sm text-muted-foreground">
              综合技术契合度评分
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">技术栈匹配 ({techMatch.percentage}%)</h4>
            <div className="space-y-2">
              {requiredTechStack.map((tech) => {
                const isMatched = techMatch.matches.includes(tech);
                return (
                  <div key={tech} className="flex items-center justify-between">
                    <span className="text-sm">{tech}</span>
                    <Badge variant={isMatched ? "default" : "outline"}>
                      {isMatched ? "已验证" : "未验证"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">能力评估</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>项目经验匹配度</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>技术深度</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>项目规模适配</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              * 评分基于候选人的技能徽章、历史项目标签、代码质量分析以及与您 SRD 需求的匹配程度综合计算得出。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TechnicalFitModal;
