
import React, { useCallback } from 'react';
import { 
  ReactFlow, 
  Background,
  Controls,
  MiniMap,
  useNodesState, 
  useEdgesState, 
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextBlock from './blocks/TextBlock';
import InstructionBlock from './blocks/InstructionBlock';

const nodeTypes = {
  textBlock: TextBlock,
  instructionBlock: InstructionBlock,
};

const initialNodes = [
  {
    id: '1',
    type: 'textBlock',
    position: { x: 100, y: 100 },
    data: { label: 'Input Text', content: 'Enter your text here...' },
  },
  {
    id: '2',
    type: 'instructionBlock',
    position: { x: 400, y: 100 },
    data: { label: 'Instructions', content: 'Enter instructions...' },
  },
];

const initialEdges = [];

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="h-[calc(100vh-2rem)] rounded-lg border border-slate-200 bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-50"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
