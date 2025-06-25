import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkExperience = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">工作经历</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">工作经历编辑区域。</p>
        {/* Placeholder for work experience form */}
      </CardContent>
    </Card>
  );
};

export default WorkExperience; 