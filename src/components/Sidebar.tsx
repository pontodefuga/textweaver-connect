
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SidebarProps {
  onAddTextBlock: () => void;
  onAddInstructionBlock: () => void;
  onExecute: () => void;
  isProcessing?: boolean;
}

export function Sidebar({ onAddTextBlock, onAddInstructionBlock, onExecute, isProcessing }: SidebarProps) {
  return (
    <div className="w-64 p-4 border-r bg-white space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Blocks</h2>
        <Button
          onClick={onAddTextBlock}
          className="w-full"
          variant="outline"
        >
          Add Text Block
        </Button>
        <Button
          onClick={onAddInstructionBlock}
          className="w-full"
          variant="outline"
        >
          Add Instructions
        </Button>
      </div>
      <div className="pt-4 border-t">
        <Button 
          onClick={onExecute} 
          className="w-full" 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Execute Workflow'
          )}
        </Button>
      </div>
    </div>
  );
}
