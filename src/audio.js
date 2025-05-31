// Singleton AudioContext instance
let context = null;
const nodes = new Map();

// Lazy initialization of AudioContext
function getAudioContext() {
  if (!context) {
    context = new AudioContext();
  }
  return context;
}

// Initialize default nodes
function initializeDefaultNodes() {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  osc.frequency.value = 220;
  osc.type = "square";
  osc.start();

  const amp = ctx.createGain();
  amp.gain.value = 0.5;

  const out = ctx.destination;

  nodes.set("a", osc);
  nodes.set("b", amp);
  nodes.set("c", out);
}

// Initialize on first import
initializeDefaultNodes();

export function isRunning() {
  return getAudioContext().state === "running";
}

export function toggleAudio() {
  const ctx = getAudioContext();
  return ctx.state === "running" ? ctx.suspend() : ctx.resume();
}

// Optimized node update with parameter scheduling
export function updateAudioNode(id, data) {
  const node = nodes.get(id);
  if (!node) return;

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      // Use setValueAtTime for immediate changes
      node[key].setValueAtTime(val, now);
    } else {
      node[key] = val;
    }
  }
}

export function removeAudioNode(id) {
  const node = nodes.get(id);
  if (!node) return;

  try {
    node.disconnect();
    if (typeof node.stop === "function") {
      node.stop();
    }
  } catch (error) {
    console.warn(`Error removing audio node ${id}:`, error);
  } finally {
    nodes.delete(id);
  }
}

export function connect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source && target) {
    try {
      source.connect(target);
    } catch (error) {
      console.warn(`Error connecting nodes ${sourceId} -> ${targetId}:`, error);
    }
  }
}

export function disconnect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source && target) {
    try {
      source.disconnect(target);
    } catch (error) {
      console.warn(
        `Error disconnecting nodes ${sourceId} -> ${targetId}:`,
        error
      );
    }
  }
}

export function createAudioNode(id, type, data) {
  const ctx = getAudioContext();
  let node;

  try {
    switch (type) {
      case "osc": {
        node = ctx.createOscillator();
        node.frequency.value = data.frequency;
        node.type = data.type;
        node.start();
        break;
      }
      case "amp": {
        node = ctx.createGain();
        node.gain.value = data.gain;
        break;
      }
      default:
        throw new Error(`Unknown node type: ${type}`);
    }

    nodes.set(id, node);
  } catch (error) {
    console.error(`Error creating audio node ${type}:`, error);
    throw error;
  }
}
