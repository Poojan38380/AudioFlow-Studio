/**
 * Application Constants
 */

// Audio Configuration
export const AUDIO_CONFIG = {
  sampleRate: 44100,
  fftSize: 2048,
  smoothingTimeConstant: 0.8,
  minDecibels: -100,
  maxDecibels: -30,
};

// Node Types
export const NODE_TYPES = {
  OSCILLATOR: "oscillator",
  GAIN: "gain",
  FILTER: "filter",
  ANALYZER: "analyzer",
  OUTPUT: "output",
};

// Node Defaults
export const NODE_DEFAULTS = {
  [NODE_TYPES.OSCILLATOR]: {
    frequency: 440,
    type: "sine",
    detune: 0,
  },
  [NODE_TYPES.GAIN]: {
    gain: 0.5,
  },
  [NODE_TYPES.FILTER]: {
    frequency: 1000,
    Q: 1,
    type: "lowpass",
  },
};

// UI Constants
export const UI_CONFIG = {
  nodeWidth: 150,
  nodeHeight: 100,
  nodePadding: 20,
  connectionRadius: 5,
};

// Canvas Settings
export const CANVAS_CONFIG = {
  snapToGrid: true,
  gridSize: 15,
  connectionMode: "bezier",
};
