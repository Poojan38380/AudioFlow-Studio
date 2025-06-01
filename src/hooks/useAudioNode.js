/**
 * Custom hook for managing audio nodes
 */

import { useEffect, useCallback } from "react";
import { useStore } from "../services/store";
import { NODE_DEFAULTS } from "../constants";
import audioService from "../services/audio";

/**
 * Hook to manage the lifecycle and state of an audio node
 * @param {string} nodeId - The ID of the node
 * @param {string} nodeType - The type of audio node
 * @returns {Object} Node controls and state
 */
const useAudioNode = (nodeId, nodeType) => {
  const { addNode, removeNode, isPlaying } = useStore();

  // Initialize node with defaults
  useEffect(() => {
    const defaults = NODE_DEFAULTS[nodeType] || {};
    addNode({
      id: nodeId,
      type: nodeType,
      data: { ...defaults },
    });

    return () => {
      removeNode(nodeId);
    };
  }, [nodeId, nodeType, addNode, removeNode]);

  /**
   * Update a node parameter
   * @param {string} param - Parameter name
   * @param {*} value - New parameter value
   */
  const updateParam = useCallback(
    (param, value) => {
      const node = audioService.nodes.get(nodeId);
      if (!node) return;

      switch (param) {
        case "frequency":
          node.frequency.setValueAtTime(
            value,
            audioService.audioContext.currentTime
          );
          break;
        case "gain":
          node.gain.setValueAtTime(
            value,
            audioService.audioContext.currentTime
          );
          break;
        case "type":
          node.type = value;
          break;
        case "Q":
          node.Q.setValueAtTime(value, audioService.audioContext.currentTime);
          break;
        default:
          console.warn(`Unknown parameter: ${param}`);
      }
    },
    [nodeId]
  );

  return {
    updateParam,
    isPlaying,
  };
};

export default useAudioNode;
