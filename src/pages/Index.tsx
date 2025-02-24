
import React from 'react';
import { WorkflowBuilder } from '@/components/WorkflowBuilder';
import { Sidebar } from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 p-4">
        <WorkflowBuilder />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
