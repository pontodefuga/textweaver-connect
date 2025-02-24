
import React, { useState, memo } from 'react';
import { Handle, Position } from 'reactflow';

function InstructionBlock({ data }) {
  const [content, setContent] = useState(data.content);

  return (
    <div className="min-w-[200px] rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm font-medium text-slate-600">{data.label}</div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded border border-slate-200 p-2 text-sm"
        rows={4}
        placeholder="Enter instructions..."
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-purple-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500"
      />
    </div>
  );
}

export default memo(InstructionBlock);
