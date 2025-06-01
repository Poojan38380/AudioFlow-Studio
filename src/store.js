import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";

import {
  isRunning,
  toggleAudio,
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
  createAudioNode,
} from "./audio";

// Initial state
const initialState = {
  nodes: [
    {
      id: "a",
      type: "osc",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
    },

    { id: "b", type: "out", position: { x: 0, y: 500 } },
  ],
  edges: [],
  isRunning: isRunning(),
  history: [],
  currentHistoryIndex: -1,
};

// Helper function to create a history entry
const createHistoryEntry = (nodes, edges) => ({
  nodes: JSON.parse(JSON.stringify(nodes)),
  edges: JSON.parse(JSON.stringify(edges)),
});

// Node type configurations
const nodeConfigs = {
  osc: {
    defaultData: { frequency: 440, type: "sine" },
    defaultPosition: { x: 0, y: 0 },
  },
  amp: {
    defaultData: { gain: 0.5 },
    defaultPosition: { x: 0, y: 0 },
  },
  noise: {
    defaultData: { type: "white", gain: 0.5 },
    defaultPosition: { x: 0, y: 0 },
  },
  flanger: {
    defaultData: { delay: 5, depth: 0.5, rate: 1, feedback: 0.5 },
    defaultPosition: { x: 0, y: 0 },
  },
  chorus: {
    defaultData: { delay: 30, depth: 0.5, rate: 1.5, mix: 0.5 },
    defaultPosition: { x: 0, y: 0 },
  },
  phaser: {
    defaultData: { stages: 6, freq: 1000, q: 1, rate: 1, mix: 0.5 },
    defaultPosition: { x: 0, y: 0 },
  },
  waveform: {
    defaultData: { zoom: 1 },
    defaultPosition: { x: 0, y: 0 },
  },
  wavesnapshot: {
    defaultData: { zoom: 1 },
    defaultPosition: { x: 0, y: 0 },
  },
  out: {
    defaultData: {},
    defaultPosition: { x: 0, y: 0 },
  },
};

export const useStore = createWithEqualityFn((set, get) => ({
  ...initialState,

  // Add history entry
  addHistoryEntry: () => {
    const { nodes, edges, history, currentHistoryIndex } = get();
    const newEntry = createHistoryEntry(nodes, edges);

    // Remove any future history entries if we're in the middle of the stack
    const newHistory = history.slice(0, currentHistoryIndex + 1);

    set({
      history: [...newHistory, newEntry],
      currentHistoryIndex: currentHistoryIndex + 1,
    });
  },

  // Undo function
  undo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex > 0) {
      const prevState = history[currentHistoryIndex - 1];

      // Stop audio if running
      if (isRunning()) {
        toggleAudio();
      }

      // Remove current audio nodes
      get().nodes.forEach(({ id }) => removeAudioNode(id));

      // Recreate audio nodes from previous state
      prevState.nodes.forEach((node) => {
        if (node.data) {
          createAudioNode(node.id, node.type, node.data);
        }
      });

      // Recreate connections
      prevState.edges.forEach((edge) => {
        connect(edge.source, edge.target);
      });

      set({
        nodes: prevState.nodes,
        edges: prevState.edges,
        currentHistoryIndex: currentHistoryIndex - 1,
      });
    }
  },

  // Redo function
  redo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];

      // Stop audio if running
      if (isRunning()) {
        toggleAudio();
      }

      // Remove current audio nodes
      get().nodes.forEach(({ id }) => removeAudioNode(id));

      // Recreate audio nodes from next state
      nextState.nodes.forEach((node) => {
        if (node.data) {
          createAudioNode(node.id, node.type, node.data);
        }
      });

      // Recreate connections
      nextState.edges.forEach((edge) => {
        connect(edge.source, edge.target);
      });

      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        currentHistoryIndex: currentHistoryIndex + 1,
      });
    }
  },

  toggleAudio: async () => {
    await toggleAudio();
    set({ isRunning: isRunning() });
  },

  clearCanvas: () => {
    // Stop audio if running
    if (isRunning()) {
      toggleAudio();
    }
    // Remove all audio nodes
    get().nodes.forEach(({ id }) => removeAudioNode(id));
    // Clear state
    set({
      nodes: [],
      edges: [],
      history: [createHistoryEntry([], [])],
      currentHistoryIndex: 0,
    });
  },

  onNodesChange: (changes) => {
    const newNodes = applyNodeChanges(changes, get().nodes);
    set({
      nodes: newNodes,
    });
    get().addHistoryEntry();
  },

  updateNode: (id, data) => {
    updateAudioNode(id, data);
    set((state) => {
      const newNodes = state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      );
      return { nodes: newNodes };
    });
    get().addHistoryEntry();
  },

  onNodesDelete: (deleted) => {
    deleted.forEach(({ id }) => removeAudioNode(id));
    get().addHistoryEntry();
  },

  onEdgesChange: (changes) => {
    const newEdges = applyEdgeChanges(changes, get().edges);
    set({
      edges: newEdges,
    });
    get().addHistoryEntry();
  },

  addEdge: (data) => {
    const id = nanoid(6);
    const edge = { id, ...data };

    connect(edge.source, edge.target);
    set((state) => ({ edges: [edge, ...state.edges] }));
    get().addHistoryEntry();
  },

  onEdgesDelete: (deleted) => {
    deleted.forEach(({ source, target }) => disconnect(source, target));
    get().addHistoryEntry();
  },

  createNode: (type) => {
    const config = nodeConfigs[type];
    if (!config) return;

    const id = nanoid();
    const { defaultData, defaultPosition } = config;

    createAudioNode(id, type, defaultData);
    set((state) => ({
      nodes: [
        ...state.nodes,
        { id, type, data: defaultData, position: defaultPosition },
      ],
    }));
    get().addHistoryEntry();
  },
}));
