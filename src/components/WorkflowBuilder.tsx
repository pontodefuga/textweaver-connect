
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
import { Sidebar } from './Sidebar';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addTextBlock = useCallback(() => {
    const newNode = {
      id: `text-${nodes.length + 1}`,
      type: 'textBlock',
      position: { x: 100, y: nodes.length * 100 + 100 },
      data: { label: 'New Text Block', content: 'Enter your text here...' },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length, setNodes]);

  const addInstructionBlock = useCallback(() => {
    const newNode = {
      id: `instruction-${nodes.length + 1}`,
      type: 'instructionBlock',
      position: { x: 400, y: nodes.length * 100 + 100 },
      data: { label: 'New Instructions', content: 'Enter instructions...' },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length, setNodes]);

  const executeWorkflow = useCallback(() => {
    toast({
      title: "Executing Workflow",
      description: `Processing ${nodes.length} blocks with ${edges.length} connections`,
    });
    console.log('Executing workflow:', { nodes, edges });
  }, [nodes, edges, toast]);

  return (
    <div className="flex h-full">
      <Sidebar 
        onAddTextBlock={addTextBlock}
        onAddInstructionBlock={addInstructionBlock}
        onExecute={executeWorkflow}
      />
      <div className="flex-1">
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
      </div>
    </div>
  );
}
