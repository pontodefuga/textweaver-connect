
import React from 'react';
import { WorkflowBuilder } from '@/components/WorkflowBuilder';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <WorkflowBuilder />
      <Toaster />
    </div>
  );
};

export default Index;
