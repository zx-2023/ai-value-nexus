import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SelfEvaluation = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">自我评价</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">自我评价编辑区域。</p>
        {/* Placeholder for self evaluation form */}
      </CardContent>
    </Card>
  );
};

export default SelfEvaluation; 