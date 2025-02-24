
import React from 'react';
import { Blocks, Settings, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Sidebar({ onAddTextBlock, onAddInstructionBlock, onExecute }) {
  const { toast } = useToast();

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Configuration options will be available soon.",
    });
  };

  return (
    <div className="w-16 bg-white border-r border-slate-200">
      <div className="flex flex-col items-center py-4 gap-4">
        <div className="flex flex-col gap-2">
          <button 
            onClick={onAddTextBlock}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
            title="Add Text Block"
          >
            <Blocks className="w-6 h-6 text-slate-600" />
          </button>
          <button 
            onClick={onAddInstructionBlock}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
            title="Add Instruction Block"
          >
            <Blocks className="w-6 h-6 text-purple-600" />
          </button>
        </div>
        <button 
          onClick={handleSettings}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
          title="Settings"
        >
          <Settings className="w-6 h-6 text-slate-600" />
        </button>
        <button 
          onClick={onExecute}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
          title="Execute"
        >
          <Play className="w-6 h-6 text-green-600" />
        </button>
      </div>
    </div>
  );
}
