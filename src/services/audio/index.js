/**
 * Audio Service Module
 * Handles all audio processing and WebAudio API interactions
 */

// Types
/**
 * @typedef {Object} AudioNode
 * @property {string} id - Unique identifier for the node
 * @property {string} type - Type of audio node
 * @property {Object} data - Node specific data
 */

/**
 * @typedef {Object} AudioConnection
 * @property {string} source - Source node ID
 * @property {string} target - Target node ID
 */

// Constants
const SAMPLE_RATE = 44100;
const FFT_SIZE = 2048;

class AudioService {
  constructor() {
    this.audioContext = null;
    this.nodes = new Map();
    this.connections = new Map();
  }

  /**
   * Initialize the audio context and setup basic nodes
   * @returns {Promise<void>}
   */
  async initialize() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    await this.audioContext.resume();
  }

  /**
   * Create a new audio node
   * @param {AudioNode} nodeConfig - Configuration for the new node
   * @returns {AudioNode} Created audio node
   */
  createNode(nodeConfig) {
    const { id, type, data } = nodeConfig;
    let audioNode;

    switch (type) {
      case "oscillator":
        audioNode = this.audioContext.createOscillator();
        audioNode.frequency.value = data.frequency;
        audioNode.type = data.type;
        break;
      case "gain":
        audioNode = this.audioContext.createGain();
        audioNode.gain.value = data.gain;
        break;
      case "filter":
        audioNode = this.audioContext.createBiquadFilter();
        audioNode.frequency.value = data.frequency;
        audioNode.Q.value = data.Q;
        audioNode.type = data.type;
        break;
      default:
        throw new Error(`Unsupported node type: ${type}`);
    }

    this.nodes.set(id, audioNode);
    return audioNode;
  }

  /**
   * Connect two audio nodes
   * @param {AudioConnection} connection - Connection configuration
   * @returns {boolean} Success status
   */
  connect(connection) {
    const { source, target, outputIndex = 0, inputIndex = 0 } = connection;
    const sourceNode = this.nodes.get(source);
    const targetNode = this.nodes.get(target);

    if (!sourceNode || !targetNode) {
      return false;
    }

    sourceNode.connect(targetNode, outputIndex, inputIndex);
    this.connections.set(`${source}-${target}`, connection);
    return true;
  }

  /**
   * Disconnect two audio nodes
   * @param {AudioConnection} connection - Connection configuration
   * @returns {boolean} Success status
   */
  disconnect(connection) {
    const { source, target } = connection;
    const sourceNode = this.nodes.get(source);
    const targetNode = this.nodes.get(target);

    if (!sourceNode || !targetNode) {
      return false;
    }

    sourceNode.disconnect(targetNode);
    this.connections.delete(`${source}-${target}`);
    return true;
  }

  /**
   * Clean up and release resources
   */
  dispose() {
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.nodes.clear();
    this.connections.clear();
  }
}

// Create a singleton instance
const audioService = new AudioService();

export default audioService;
