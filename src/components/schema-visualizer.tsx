"use client";

import { useCallback, useRef, useState, useMemo, useEffect } from "react";
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
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { RiAddLine, RiSubtractLine, RiFullscreenLine, RiTableView, RiStickyNoteLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/button";
import TableNode from "@/components/table-node";
import SchemaEdge from "@/components/schema-edge";
import CreateTableModal from "@/components/modals/CreateTableModal";
import { initialNodes, initialEdges } from "@/lib/schema-data";
import { Plus, Save, ZoomIn, ZoomOut } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TableNode as TableNodeType, Field } from "@/types/types";
import { useModal } from "@/hooks/use-modal";
import NewTable from "./forms/NewTable";
import { createTable, getTables } from "@/lib/functions/backend";
import { useParams } from "next/navigation";

// Register custom node types and edge types - Memoized
const nodeTypes = {
  tableNode: TableNode,
};

const edgeTypes = {
  custom: SchemaEdge,
};

// Default edge options - Memoized
const defaultEdgeOptions = {
  type: "custom",
  className: "opacity-25",
};

// Style object - Memoized
const reactFlowStyle = {
  "--xy-background-pattern-dots-color-default": "var(--color-border)",
  "--xy-edge-stroke-width-default": 1.5,
  "--xy-edge-stroke-default": "var(--color-foreground)",
  "--xy-edge-stroke-selected-default": "var(--color-foreground)",
  "--xy-attribution-background-color-default": "transparent",
} as React.CSSProperties;

// Proactive connection validation options
const connectionValidationOptions = {
  // Validation sadece gerekli durumlarda çalışsın
  checkOnlyVisibleNodes: true,
};

function SchemaVisualizerInner() {
  const { openModal, closeModal } = useModal()
  const [saveLoading, setSaveLoading] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeEditor, setActiveEditor] = useState<"visual" | "sql">("visual");
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const params = useParams();
  const [tables, setTables] = useState<TableNodeType[]>([]);

  useEffect(() => {
    getTables(params?.id as string).then((tables) => {
      setNodes(tables as TableNodeType[]);
    });
  }, [params?.id,setNodes,setEdges]);
  // Fit view fonksiyonu - Memoized
  const onFitView = useCallback(() => {
    fitView({ padding: 0.2, duration: 800 });
  }, [fitView]);

  // Zoom in fonksiyonu - Memoized
  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  // Zoom out fonksiyonu - Memoized
  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  // Editor değişikliği - Memoized
  const handleEditorChange = useCallback((value: string) => {
    if (value) {
      setActiveEditor(value as "visual" | "sql");
    }
  }, []);

  // Yeni bağlantı kurulduğunda çalışacak fonksiyon - Optimized
  const onConnect = useCallback(
    (params: Connection) => {
      // Handle ID'lerinden field adlarını çıkar
      const sourceHandle = params.sourceHandle || '';
      const targetHandle = params.targetHandle || '';

      // Basit edge oluştur - unique ID ile
      const connection: Edge = {
        ...params,
        id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "default",
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        animated: false, // Animation performansı düşürür
      };

      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // Bağlantı geçerliliğini kontrol eden fonksiyon - Optimized with early return
  const isValidConnection = useCallback((connection: Connection | Edge) => {
    // Edge tipindeyse Connection'a dönüştür
    const conn = 'sourceHandle' in connection && 'targetHandle' in connection ? connection : connection as Connection;

    // Aynı node'a bağlantı yapılmasını engelle - Early return
    if (conn.source === conn.target) {
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

    // Aynı bağlantının tekrar kurulmasını engelle - Optimized search
    return !edges.some(
      (edge) =>
        edge.source === conn.source &&
        edge.target === conn.target &&
        edge.sourceHandle === sourceHandle &&
        edge.targetHandle === targetHandle
    );
  }, [edges]);

  // Yeni tablo oluşturma fonksiyonu - Modal'dan çağrılacak
  const handleCreateTable = useCallback(async (tableName: string, fields: Field[]) => {
    setSaveLoading(true)
    try {
      const tableId = `table-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Canvas merkezinde oluştur
      const viewport = reactFlowWrapper.current?.getBoundingClientRect();
      const centerX = viewport ? viewport.width / 2 : 300;
      const centerY = viewport ? viewport.height / 2 : 200;
      const posX = Math.floor(centerX + (Math.random() - 0.5) * 200);
      const posY = Math.floor(centerY + (Math.random() - 0.5) * 200);

      // Önce veritabanına kaydet
      const projectId = params?.id as string;
      
      const newTable: TableNodeType = {
        id: tableId,
        type: "tableNode",
        position: {
          x: posX,
          y: posY
        },
        measured: { width: 230, height: 230 },
        data: {
          label: tableName,
          fields: fields,
        },
      };

      setNodes((prev) => [...prev, newTable]);
      setIsCreateTableModalOpen(false);
      if (projectId) {
        await createTable(projectId, tableName, posX, posY, fields);
      }
      setSaveLoading(false)
      // Başarılı olursa node'u ekle
    } catch (error) {
      console.error('Tablo oluşturma hatası:', error);
      // Hata durumunda kullanıcıya bilgi verilebilir
      alert('Tablo oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }, [setNodes]);

  // Yeni not oluşturma fonksiyonu - Memoized
  const handleCreateNote = useCallback(() => {
    // Not oluşturma mantığı buraya eklenecek
    console.log("Note creation not implemented yet");
  }, []);

  // Memoized panels - Performans için
  const topRightPanel = useMemo(() => (
    <Panel
      position="top-right"
      className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
    >
      <ToggleGroup type="single" value={activeEditor} onValueChange={handleEditorChange}>
        <ToggleGroupItem value="visual">Visual Editor</ToggleGroupItem>
        <ToggleGroupItem value="sql">SQL Editor</ToggleGroupItem>
      </ToggleGroup>
    </Panel>
  ), [activeEditor, handleEditorChange]);

  const bottomRightPanel = useMemo(() => (
    <Panel
      position="bottom-right"
      className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
    >
      <Button
        variant="outline"
        size="icon"
        className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
        onClick={handleZoomIn}
        aria-label="Zoom in"
      >
        <ZoomIn className="size-5" aria-hidden="true" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
        onClick={handleZoomOut}
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
  ), [handleZoomIn, handleZoomOut, onFitView]);

  const bottomCenterPanel = useMemo(() => (
    <Panel
      position="bottom-center"
      className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
    >
      <Button
        variant="outline"
        size="icon"
        className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg w-fit h-10 p-4 focus-visible:z-10 bg-card"
        onClick={() => openModal("Yeni Tablo", <NewTable onSubmit={handleCreateTable} onClose={closeModal} />, { contentClassName: '!w-[1200px] !max-w-none' })}
        aria-label="Create table"
      >
        <RiTableView className="size-7" aria-hidden="true" />
        Create Table
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg w-fit h-10 p-4 focus-visible:z-10 bg-card"
        onClick={handleCreateNote}
        aria-label="Create note"
      >
        <RiStickyNoteLine className="size-7" aria-hidden="true" />
        Create Note
      </Button>
    </Panel>
  ), [handleCreateNote]);

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
          minZoom={0.1}
          maxZoom={2}
          connectionMode={ConnectionMode.Strict}
          snapToGrid={true}
          snapGrid={[20, 20]}
          deleteKeyCode="Delete"
          defaultEdgeOptions={defaultEdgeOptions}
          style={reactFlowStyle}
          attributionPosition="bottom-left"
          // Performance optimizations
          onlyRenderVisibleElements
          elevateNodesOnSelect={false}
          zoomOnDoubleClick={false}
          panOnDrag
          selectNodesOnDrag={false}
          // Node ve edge seçimi için performans optimizasyonu
          multiSelectionKeyCode="Shift"
          // Viewport optimizasyonları
          translateExtent={[[-2000, -2000], [2000, 2000]]}
          nodeExtent={[[-1500, -1500], [1500, 1500]]}
          // Animation optimizasyonları
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          // Connection line styling - performans için basit
          connectionLineType={ConnectionLineType.Straight}
          connectionLineStyle={{ strokeWidth: 2, stroke: '#94a3b8' }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={2}
            // Background performansı için
            patternClassName="opacity-30"
          />
          {saveLoading && (
            <div className="absolute top-2 left-2 p-2 bg-background border border-border rounded-full flex items-center justify-center gap-2">
              <Save className="size-7 animate-spin" aria-hidden="true" />
            </div>
          )}
          {topRightPanel}
          {bottomRightPanel}
          {bottomCenterPanel}
        </ReactFlow>
      </div>

      {/* Create Table Modal */}

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
