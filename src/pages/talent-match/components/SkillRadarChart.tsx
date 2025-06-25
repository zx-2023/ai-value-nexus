
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface SkillRadarChartProps {
  skills: {
    codeQuality: number;
    performance: number;
    communication: number;
    reliability: number;
    innovation: number;
  };
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ skills }) => {
  const data = [
    { skill: '代码质量', value: skills.codeQuality },
    { skill: '性能优化', value: skills.performance },
    { skill: '沟通协作', value: skills.communication },
    { skill: '可靠性', value: skills.reliability },
    { skill: '创新能力', value: skills.innovation },
  ];

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid className="stroke-muted" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="技能"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
