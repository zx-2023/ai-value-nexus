import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Skill = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">专业技能</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">专业技能编辑区域。</p>
        {/* Placeholder for skill form */}
      </CardContent>
    </Card>
  );
};

export default Skill; 