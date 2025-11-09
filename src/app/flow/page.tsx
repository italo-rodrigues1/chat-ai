"use client";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
// @ts-ignore - CSS side-effect import without type declarations
import "@xyflow/react/dist/style.css";

type FlowNode = {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
};

type FlowEdge = {
  id: string;
  source: string;
  target: string;
};

type NodeChange = Array<Record<string, unknown>>;
type EdgeChange = Array<Record<string, unknown>>;

type Connection = {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
};

const initialNodes: FlowNode[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges: FlowEdge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function Flow() {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange) =>
      setNodes(
        (nodesSnapshot) =>
          // applyNodeChanges may return a different node type; cast to our FlowNode[]
          applyNodeChanges(changes as any, nodesSnapshot) as FlowNode[]
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange) =>
      setEdges(
        (edgesSnapshot) =>
          applyEdgeChanges(changes as any, edgesSnapshot) as FlowEdge[]
      ),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges(
        (edgesSnapshot) => addEdge(params as any, edgesSnapshot) as FlowEdge[]
      ),
    []
  );

  return (
    <div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
