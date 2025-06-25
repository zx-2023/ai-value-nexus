import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Education = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">教育经历</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">教育经历编辑区域。</p>
        {/* Placeholder for education form */}
      </CardContent>
    </Card>
  );
};

export default Education; 