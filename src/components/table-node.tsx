import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { Button } from "@/components/button";
import { RiMore2Fill } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { initialEdges } from "@/lib/schema-data";
import { Columns4, Info, KeyRound, MessageCircle, Table } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import type { TableNode as TableNodeType, Field } from "@/types/types";
import { TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Tooltip } from "./ui/tooltip";

function TableNode({ data, id, selected }: NodeProps<TableNodeType>) {
  // Find all source connections for this node
  const sourceConnections = initialEdges
    .filter((edge) => edge.source === id)
    .map((edge) => edge.sourceHandle);

  // Find all target connections for this node
  const targetConnections = initialEdges
    .filter((edge) => edge.target === id)
    .map((edge) => edge.targetHandle);

  return (
    <div
      className={cn(
        "rounded-xl bg-card shadow-[0_1px_1px_rgba(0,0,0,0.02),_0_2px_2px_rgba(0,0,0,0.02),_0_4px_4px_rgba(0,0,0,0.02),_0_8px_8px_rgba(0,0,0,0.02),_0_16px_16px_rgba(0,0,0,0.02),_0_32px_32px_rgba(0,0,0,0.02)] w-fit font-mono",
        selected ? "ring-2 ring-primary ring-offset-2" : "",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-gradient-to-t from-background/70 dark:from-background/30">
        <div className="text-[13px] flex items-center gap-2">
          <span className="text-muted-foreground/80"><Table className="size-4" /></span>{" "}
          <span className="font-medium">{data.label}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none hover:bg-transparent -my-2 -me-2 text-muted-foreground/60 hover:text-muted-foreground"
              aria-label="Open edit menu"
            >
              <RiMore2Fill className="size-5" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className="text-xs py-2">
        {data.fields.map((field: Field) => (
          <div key={field.name} className="px-4 relative group">
            <div className="flex items-center justify-between gap-2 py-2 border-dashed group-not-last:border-b">
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-2">
                  {
                    field.isPrimary && <KeyRound className="size-4 text-yellow-500" />
                  }
                  {
                    field.isUnique && <KeyRound className="size-4 text-red-500" />
                  }
                  {
                    field.isForeign && <KeyRound className="size-4 text-blue-500" />
                  }
                  <span className="truncate font-medium">{field.name}</span>
                  <span className="text-muted-foreground/60">{field.type}{field.length ? `(${field.length})` : ""}</span>
                  <span className="text-muted-foreground/60">{field.defaultValue}</span>
                </div>
                <Tooltip>
                  <TooltipTrigger><MessageCircle className="size-4" /></TooltipTrigger>
                  <TooltipContent>
                    <p>{field.comment}</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Field handles */}
              {((field.isPrimary && sourceConnections.includes(field.name)) ||
                (field.isForeign &&
                  targetConnections.includes(field.name))) && (
                  <Handle
                    type={field.isPrimary ? "source" : "target"}
                    position={field.isPrimary ? Position.Left : Position.Right}
                    id={field.name}
                    className="size-2.5 rounded-full bg-foreground! border-2 border-background"
                    isConnectable={false}
                  />
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TableNode);
