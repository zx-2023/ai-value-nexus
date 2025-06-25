import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectExperience = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">项目经历</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">项目经历编辑区域。</p>
        {/* Placeholder for project experience form */}
      </CardContent>
    </Card>
  );
};

export default ProjectExperience; 