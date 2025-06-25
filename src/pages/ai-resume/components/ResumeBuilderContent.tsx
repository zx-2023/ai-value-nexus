import React from 'react';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import ProjectExperience from './ProjectExperience';
import WorkExperience from './WorkExperience';
import Skill from './Skill';
import Honor from './Honor';
import SelfEvaluation from './SelfEvaluation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResumeBuilderContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">简历内容编辑</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PersonalInfo />
          <Education />
          <ProjectExperience />
          <WorkExperience />
          <Skill />
          <Honor />
          <SelfEvaluation />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeBuilderContent; 