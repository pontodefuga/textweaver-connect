import React, { useCallback, useState } from 'react';
import { 
  ReactFlow, 
  Background,
  Controls,
  MiniMap,
  useNodesState, 
  useEdgesState, 
  addEdge,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextBlock from './blocks/TextBlock';
import InstructionBlock from './blocks/InstructionBlock';
import { Sidebar } from './Sidebar';
import { useToast } from '@/hooks/use-toast';
import { processWithAI } from '@/services/ai';

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
  const [isProcessing, setIsProcessing] = useState(false);
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

  const executeWorkflow = useCallback(async () => {
    setIsProcessing(true);
    try {
      // Find connected pairs of text and instruction blocks
      const connections = edges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        return { sourceNode, targetNode };
      });

      for (const { sourceNode, targetNode } of connections) {
        if (sourceNode?.type === 'textBlock' && targetNode?.type === 'instructionBlock') {
          const result = await processWithAI(
            sourceNode.data.content,
            targetNode.data.content
          );

          // Add result as a new text block
          const newNode = {
            id: `result-${nodes.length + 1}`,
            type: 'textBlock',
            position: { 
              x: targetNode.position.x + 300, 
              y: targetNode.position.y 
            },
            data: { 
              label: 'AI Result', 
              content: result 
            },
          };
          setNodes(nds => [...nds, newNode]);
        }
      }

      toast({
        title: "Success",
        description: "Workflow executed successfully",
      });
    } catch (error) {
      console.error('Workflow execution error:', error);
      toast({
        title: "Error",
        description: "Failed to execute workflow. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [nodes, edges, setNodes, toast]);

  return (
    <div className="flex h-screen w-full">
      <Sidebar 
        onAddTextBlock={addTextBlock}
        onAddInstructionBlock={addInstructionBlock}
        onExecute={executeWorkflow}
        isProcessing={isProcessing}
      />
      <div className="flex-1 w-0 min-h-0">
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
  );
}
