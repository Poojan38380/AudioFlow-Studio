import { Background, ReactFlow } from "@xyflow/react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { useMemo } from "react";
import Osc from "./nodes/Osc";
import Out from "./nodes/Out";
import Amp from "./nodes/Amp";
import Noise from "./nodes/Noise";
import Flanger from "./nodes/Flanger";
import Chorus from "./nodes/Chorus";
import Phaser from "./nodes/Phaser";
import Waveform from "./nodes/Waveform";

// Memoized node types
const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
  noise: Noise,
  flanger: Flanger,
  chorus: Chorus,
  phaser: Phaser,
  waveform: Waveform,
};

// Memoized selector to prevent unnecessary re-renders
const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.onNodesDelete,
  onEdgesDelete: store.onEdgesDelete,
  createNode: store.createNode,
});

export default function App() {
  const store = useStore(selector, shallow);

  // Memoized ReactFlow props
  const flowProps = useMemo(
    () => ({
      nodes: store.nodes,
      edges: store.edges,
      nodeTypes,
      onNodesChange: store.onNodesChange,
      onEdgesChange: store.onEdgesChange,
      onConnect: store.addEdge,
      onNodesDelete: store.onNodesDelete,
      onEdgesDelete: store.onEdgesDelete,
      fitView: true,
      minZoom: 0.1,
      maxZoom: 2,
      defaultViewport: { x: 0, y: 0, zoom: 1 },
      connectionRadius: 20,
      snapToGrid: true,
      snapGrid: [10, 10],
      nodesDraggable: true,
      nodesConnectable: true,
      nodesFocusable: true,
      edgesFocusable: true,
      elementsSelectable: true,
      selectNodesOnDrag: false,
      panOnDrag: [1, 2],
      zoomOnScroll: true,
      zoomOnPinch: true,
      panOnScroll: false,
      preventScrolling: true,
    }),
    [store]
  );

  return (
    <div className="w-full h-full bg-background-primary transition-colors duration-200">
      <ReactFlow {...flowProps}>
        <Background
          gap={[25, 25]}
          size={1}
          color="currentColor"
          className="text-background-tertiary/20"
          variant="dots"
        />
      </ReactFlow>
    </div>
  );
}
