import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PersonalInfo = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">个人信息</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">个人信息编辑区域。</p>
        {/* Placeholder for personal info form */}
      </CardContent>
    </Card>
  );
};

export default PersonalInfo; 