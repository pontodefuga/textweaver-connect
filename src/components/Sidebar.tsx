
import React from 'react';
import { Blocks, Settings, Play } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-slate-200">
      <div className="flex flex-col items-center py-4 gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Blocks">
          <Blocks className="w-6 h-6 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Settings">
          <Settings className="w-6 h-6 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Execute">
          <Play className="w-6 h-6 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
