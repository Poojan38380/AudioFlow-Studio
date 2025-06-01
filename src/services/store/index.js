/**
 * Store Service Module
 * Centralizes state management using Zustand
 */

import { create } from "zustand";
import audioService from "../audio";

/**
 * @typedef {Object} AppState
 * @property {Array<Object>} nodes - Audio processing nodes
 * @property {Array<Object>} edges - Connections between nodes
 * @property {boolean} isPlaying - Audio playback state
 */

/**
 * Creates the main application store
 */
const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  isPlaying: false,

  /**
   * Add a new node to the graph
   * @param {Object} node - Node configuration
   */
  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
    audioService.createNode(node);
  },

  /**
   * Remove a node from the graph
   * @param {string} nodeId - ID of the node to remove
   */
  removeNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      edges: state.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
    }));
  },

  /**
   * Add a new edge between nodes
   * @param {Object} edge - Edge configuration
   */
  addEdge: (edge) => {
    set((state) => ({
      edges: [...state.edges, edge],
    }));
    audioService.connect(edge);
  },

  /**
   * Remove an edge from the graph
   * @param {string} edgeId - ID of the edge to remove
   */
  removeEdge: (edgeId) => {
    const edge = get().edges.find((e) => e.id === edgeId);
    if (edge) {
      audioService.disconnect(edge);
      set((state) => ({
        edges: state.edges.filter((e) => e.id !== edgeId),
      }));
    }
  },

  /**
   * Toggle audio playback
   */
  togglePlayback: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
}));

export default useStore;
