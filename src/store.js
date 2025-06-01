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
    {
      id: "b",
      type: "amp",
      data: { gain: 0.5 },
      position: { x: -100, y: 250 },
    },
    { id: "c", type: "out", position: { x: 100, y: 500 } },
  ],
  edges: [],
  isRunning: isRunning(),
};

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
};

export const useStore = createWithEqualityFn((set, get) => ({
  ...initialState,

  toggleAudio: async () => {
    await toggleAudio();
    set({ isRunning: isRunning() });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  updateNode: (id, data) => {
    updateAudioNode(id, data);
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },

  onNodesDelete: (deleted) => {
    deleted.forEach(({ id }) => removeAudioNode(id));
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge: (data) => {
    const id = nanoid(6);
    const edge = { id, ...data };

    connect(edge.source, edge.target);
    set((state) => ({ edges: [edge, ...state.edges] }));
  },

  onEdgesDelete: (deleted) => {
    deleted.forEach(({ source, target }) => disconnect(source, target));
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
  },
}));
