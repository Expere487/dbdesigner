"use client";

import { useCallback, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  BackgroundVariant,
  addEdge,
  Connection,
  Edge,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { RiAddLine, RiSubtractLine, RiFullscreenLine, RiTableView, RiStickyNoteLine } from "@remixicon/react";
import { Button } from "@/components/button";
import TableNode from "@/components/table-node";
import SchemaEdge from "@/components/schema-edge";
import { initialNodes, initialEdges } from "@/lib/schema-data";
import { Plus, ZoomIn, ZoomOut } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Register custom node types and edge types
const nodeTypes = {
  tableNode: TableNode,
};

const edgeTypes = {
  custom: SchemaEdge,
};

function SchemaVisualizerInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Debug için edges'i console'da göster
  console.log('Current edges state:', edges);
  console.log('Current nodes state:', nodes);

  const onFitView = useCallback(() => {
    fitView({ padding: 0.2 });
  }, [fitView]);

  // Yeni bağlantı kurulduğunda çalışacak fonksiyon
  const onConnect = useCallback(
    (params: Connection) => {
      console.log('onConnect tetiklendi:', params);

      // Handle ID'lerinden field adlarını çıkar
      let sourceHandle = params.sourceHandle || '';
      let targetHandle = params.targetHandle || '';

      console.log('Original handles:', { sourceHandle, targetHandle });

      // Test için basit edge oluştur - handle'ları olduğu gibi kullan
      const connection: Edge = {
        ...params,
        id: `edge-${Date.now()}`,
        type: "default", // Geçici olarak default type kullan
        // sourceHandle ve targetHandle'ı olduğu gibi bırak
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
      };

      console.log('Simple test connection:', connection);

      setEdges((eds) => {
        const newEdges = addEdge(connection, eds);
        console.log('New edges after simple add:', newEdges);
        return newEdges;
      });
    },
    [setEdges]
  );

  // Bağlantı geçerliliğini kontrol eden fonksiyon
  const isValidConnection = useCallback((connection: Connection | Edge) => {
    console.log('isValidConnection çağrıldı:', connection);

    // Edge tipindeyse Connection'a dönüştür
    const conn = 'sourceHandle' in connection && 'targetHandle' in connection ? connection : connection as Connection;

    // Aynı node'a bağlantı yapılmasını engelle
    if (conn.source === conn.target) {
      console.log('Aynı node bağlantısı engellendi');
      return false;
    }

    // Handle ID'lerinden field adlarını çıkar
    let sourceHandle = conn.sourceHandle || '';
    let targetHandle = conn.targetHandle || '';

    // Yeni format handle'lardan field adını çıkar
    if (sourceHandle.endsWith('-source')) {
      sourceHandle = sourceHandle.replace('-source', '');
    }
    if (targetHandle.endsWith('-target')) {
      targetHandle = targetHandle.replace('-target', '');
    }

    // Aynı bağlantının tekrar kurulmasını engelle
    const existingEdge = edges.find(
      (edge) =>
        edge.source === conn.source &&
        edge.target === conn.target &&
        edge.sourceHandle === sourceHandle &&
        edge.targetHandle === targetHandle
    );

    const isValid = !existingEdge;
    console.log('Bağlantı geçerli mi:', isValid);

    return isValid;
  }, [edges]);

  return (
    <main className="w-full h-full">
      <div className="w-full h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.5}
          maxZoom={1}
          connectionMode={ConnectionMode.Strict}
          snapToGrid={false}
          snapGrid={[15, 15]}
          deleteKeyCode="Delete"
          defaultEdgeOptions={{
            type: "custom",
            className: "opacity-25",
          }}
          style={
            {
              "--xy-background-pattern-dots-color-default":
                "var(--color-border)",
              "--xy-edge-stroke-width-default": 1.5,
              "--xy-edge-stroke-default": "var(--color-foreground)",
              "--xy-edge-stroke-selected-default": "var(--color-foreground)",
              "--xy-attribution-background-color-default": "transparent",
            } as React.CSSProperties
          }
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={2} />

          <Panel
            position="top-right"
            className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
          >

            <ToggleGroup type="single">
              <ToggleGroupItem value="a">Visual Editor</ToggleGroupItem>
              <ToggleGroupItem value="c">SQL Editor</ToggleGroupItem>
            </ToggleGroup>
          </Panel>
          <Panel
            position="bottom-right"
            className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
          >

            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomIn()}
              aria-label="Zoom in"
            >
              <ZoomIn className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomOut()}
              aria-label="Zoom out"
            >
              <ZoomOut className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={onFitView}
              aria-label="Fit view"
            >
              <RiFullscreenLine className="size-5" aria-hidden="true" />
            </Button>
          </Panel>
          <Panel
            position="bottom-center"
            className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
          >

            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg w-16 h-10 p-4 focus-visible:z-10 bg-card"
              onClick={() => zoomIn()}
              aria-label="Zoom in"
            >
              <RiTableView className="size-7" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg w-16 h-10 p-4 focus-visible:z-10 bg-card"
              onClick={() => zoomOut()}
              aria-label="Zoom out"
            >
              <RiStickyNoteLine className="size-7" aria-hidden="true" />
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </main>
  );
}

export default function SchemaVisualizer() {
  return (
    <ReactFlowProvider>
      <SchemaVisualizerInner />
    </ReactFlowProvider>
  );
}
