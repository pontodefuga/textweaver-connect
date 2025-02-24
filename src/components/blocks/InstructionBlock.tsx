
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function InstructionBlock({ data, isConnectable }) {
  const onChange = (evt) => {
    data.content = evt.target.value;
  };

  return (
    <div className="min-w-[200px] rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm font-medium text-slate-600">{data.label}</div>
      <textarea
        defaultValue={data.content}
        onChange={onChange}
        className="w-full rounded border border-slate-200 p-2 text-sm"
        rows={4}
        placeholder="Enter instructions..."
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-purple-500"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default memo(InstructionBlock);
