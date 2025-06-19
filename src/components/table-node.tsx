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

              {/* Eski format handle (mevcut edge'ler için) - Primary key'ler için source */}
              {field.isPrimary && (
                <Handle
                  type="source"
                  position={Position.Left}
                  id={field.name}
                  className="size-3 rounded-full bg-blue-500 border-2 border-background z-10"
                  isConnectable={true}
                  style={{ left: -6 }}
                />
              )}

              {/* Eski format handle (mevcut edge'ler için) - Foreign key'ler için target */}
              {field.isForeign && (
                <Handle
                  type="target"
                  position={Position.Right}
                  id={field.name}
                  className="size-3 rounded-full bg-green-500 border-2 border-background z-10"
                  isConnectable={true}
                  style={{ right: -6 }}
                />
              )}

              {/* Yeni format handle'ları (yeni bağlantılar için) - Her sütun için source */}
              <Handle
                type="source"
                position={Position.Left}
                id={`${field.name}-source`}
                className={cn(
                  "size-3 rounded-full border-2 border-background transition-all duration-200 z-10",
                  field.isPrimary 
                    ? "opacity-0" // Primary key'lerde gizli çünkü eski handle var
                    : "opacity-0 group-hover:opacity-100 bg-blue-400 hover:bg-blue-600 hover:scale-110"
                )}
                isConnectable={true}
                style={{ left: -6 }}
              />

              {/* Yeni format handle'ları (yeni bağlantılar için) - Her sütun için target */}
              <Handle
                type="target"
                position={Position.Right}
                id={`${field.name}-target`}
                className={cn(
                  "size-3 rounded-full border-2 border-background transition-all duration-200 z-10",
                  field.isForeign 
                    ? "opacity-0" // Foreign key'lerde gizli çünkü eski handle var
                    : "opacity-0 group-hover:opacity-100 bg-green-400 hover:bg-green-600 hover:scale-110"
                )}
                isConnectable={true}
                style={{ right: -6 }}
              />

              {/* Test için her sütunda görünür handle'lar */}
              <Handle
                type="source"
                position={Position.Left}
                id={`${field.name}-test-source`}
                className="size-4 rounded-full bg-red-500 border-2 border-white z-20 shadow-lg"
                isConnectable={true}
                style={{ left: -8 }}
              />

              <Handle
                type="target"
                position={Position.Right}
                id={`${field.name}-test-target`}
                className="size-4 rounded-full bg-purple-500 border-2 border-white z-20 shadow-lg"
                isConnectable={true}
                style={{ right: -8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TableNode);
