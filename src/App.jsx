import { Background, Panel, ReactFlow } from "@xyflow/react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { useCallback, memo, useMemo } from "react";
import Osc from "./nodes/Osc";
import Out from "./nodes/Out";
import Amp from "./nodes/Amp";
import Noise from "./nodes/Noise";
import Flanger from "./nodes/Flanger";
import Chorus from "./nodes/Chorus";

// Memoized node types
const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
  noise: Noise,
  flanger: Flanger,
  chorus: Chorus,
};

// Memoized button component with proper prop types
const AddNodeButton = memo(({ label, onClick }) => (
  <button
    className="px-2 py-1 rounded bg-white shadow hover:bg-gray-50 transition-colors"
    onClick={onClick}
    aria-label={`Add ${label} node`}
    title={`Add ${label} node`}
  >
    {label}
  </button>
));

AddNodeButton.displayName = "AddNodeButton";

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

  // Memoized event handlers
  const handleAddOsc = useCallback(() => store.createNode("osc"), [store]);
  const handleAddAmp = useCallback(() => store.createNode("amp"), [store]);
  const handleAddNoise = useCallback(() => store.createNode("noise"), [store]);
  const handleAddFlanger = useCallback(
    () => store.createNode("flanger"),
    [store]
  );
  const handleAddChorus = useCallback(
    () => store.createNode("chorus"),
    [store]
  );

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
    }),
    [store]
  );

  return (
    <ReactFlow {...flowProps}>
      <Panel className="space-x-4" position="top-right">
        <AddNodeButton label="Add Osc" onClick={handleAddOsc} />
        <AddNodeButton label="Add Amp" onClick={handleAddAmp} />
        <AddNodeButton label="Add Noise" onClick={handleAddNoise} />
        <AddNodeButton label="Add Flanger" onClick={handleAddFlanger} />
        <AddNodeButton label="Add Chorus" onClick={handleAddChorus} />
      </Panel>
      <Background />
    </ReactFlow>
  );
}
