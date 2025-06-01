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

  // Special handling for noise type changes
  if (data.type && node.type === "noise") {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const bufferData = buffer.getChannelData(0);

    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    let lastOut = 0;

    switch (data.type) {
      case "white":
        for (let i = 0; i < bufferSize; i++) {
          bufferData[i] = Math.random() * 2 - 1;
        }
        break;
      case "pink":
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          bufferData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          bufferData[i] *= 0.11;
          b6 = white * 0.115926;
        }
        break;
      case "brown":
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          bufferData[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = bufferData[i];
          bufferData[i] *= 3.5;
        }
        break;
    }

    // Create new buffer source
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Disconnect old source and connect new one
    const gainNode = node;
    source.connect(gainNode);
    source.start();

    // Store the new source in the nodes map
    nodes.set(id, gainNode);
    return;
  }

  // Special handling for flanger parameters
  if (node.type === "flanger") {
    if (data.delay !== undefined) {
      node.delay.delayTime.setValueAtTime(data.delay / 1000, now);
    }
    if (data.depth !== undefined) {
      node.lfoGain.gain.setValueAtTime(data.depth / 1000, now);
    }
    if (data.rate !== undefined) {
      node.lfo.frequency.setValueAtTime(data.rate, now);
    }
    if (data.feedback !== undefined) {
      node.feedback.gain.setValueAtTime(data.feedback, now);
    }
    return;
  }

  // Special handling for chorus parameters
  if (node.type === "chorus") {
    if (data.delay !== undefined) {
      node.delayL.delayTime.setValueAtTime(data.delay / 1000, now);
      node.delayR.delayTime.setValueAtTime(data.delay / 1000, now);
    }
    if (data.depth !== undefined) {
      node.lfoGainL.gain.setValueAtTime(data.depth / 1000, now);
      node.lfoGainR.gain.setValueAtTime(data.depth / 1000, now);
    }
    if (data.rate !== undefined) {
      node.lfoL.frequency.setValueAtTime(data.rate, now);
      node.lfoR.frequency.setValueAtTime(data.rate, now);
    }
    if (data.mix !== undefined) {
      node.dryGain.gain.setValueAtTime(1 - data.mix, now);
      node.wetGainL.gain.setValueAtTime(data.mix * 0.5, now);
      node.wetGainR.gain.setValueAtTime(data.mix * 0.5, now);
    }
    return;
  }

  // Special handling for phaser parameters
  if (node.type === "phaser") {
    if (data.stages !== undefined && data.stages !== node.filters.length) {
      // Recreate filters if number of stages changes
      const oldFilters = node.filters;
      const newFilters = Array(data.stages)
        .fill()
        .map(() => {
          const filter = ctx.createBiquadFilter();
          filter.type = "allpass";
          filter.frequency.value = oldFilters[0].frequency.value;
          filter.Q.value = oldFilters[0].Q.value;
          return filter;
        });

      // Disconnect old filters
      oldFilters[0].disconnect();
      oldFilters.forEach((f) => {
        node.lfoGain.disconnect(f.frequency);
      });

      // Connect new filters
      node.input.connect(newFilters[0]);
      newFilters.reduce((prev, curr) => {
        prev.connect(curr);
        return curr;
      });
      newFilters[newFilters.length - 1].connect(node.wetGain);

      // Connect LFO to new filters
      newFilters.forEach((filter) => {
        node.lfoGain.connect(filter.frequency);
      });

      node.filters = newFilters;
    }

    if (data.freq !== undefined) {
      node.filters.forEach((filter) => {
        filter.frequency.setValueAtTime(data.freq, now);
      });
      node.lfoGain.gain.setValueAtTime(data.freq * 0.5, now);
    }

    if (data.q !== undefined) {
      node.filters.forEach((filter) => {
        filter.Q.setValueAtTime(data.q, now);
      });
    }

    if (data.rate !== undefined) {
      node.lfo.frequency.setValueAtTime(data.rate, now);
    }

    if (data.mix !== undefined) {
      node.dryGain.gain.setValueAtTime(1 - data.mix, now);
      node.wetGain.gain.setValueAtTime(data.mix, now);
    }

    return;
  }

  // Handle other parameter updates
  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
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
      // If target is a custom node (like flanger), connect to its input
      if (target.input && target.type) {
        source.connect(target.input);
      } else {
        source.connect(target);
      }
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
      // If target is a custom node (like flanger), disconnect from its input
      if (target.input && target.type) {
        source.disconnect(target.input);
      } else {
        source.disconnect(target);
      }
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
      case "noise": {
        // Create a buffer source for noise
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const bufferData = buffer.getChannelData(0);

        // Generate noise based on type
        let b0 = 0,
          b1 = 0,
          b2 = 0,
          b3 = 0,
          b4 = 0,
          b5 = 0,
          b6 = 0;
        let lastOut = 0;

        switch (data.type) {
          case "white":
            for (let i = 0; i < bufferSize; i++) {
              bufferData[i] = Math.random() * 2 - 1;
            }
            break;
          case "pink":
            for (let i = 0; i < bufferSize; i++) {
              const white = Math.random() * 2 - 1;
              b0 = 0.99886 * b0 + white * 0.0555179;
              b1 = 0.99332 * b1 + white * 0.0750759;
              b2 = 0.969 * b2 + white * 0.153852;
              b3 = 0.8665 * b3 + white * 0.3104856;
              b4 = 0.55 * b4 + white * 0.5329522;
              b5 = -0.7616 * b5 - white * 0.016898;
              bufferData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
              bufferData[i] *= 0.11;
              b6 = white * 0.115926;
            }
            break;
          case "brown":
            for (let i = 0; i < bufferSize; i++) {
              const white = Math.random() * 2 - 1;
              bufferData[i] = (lastOut + 0.02 * white) / 1.02;
              lastOut = bufferData[i];
              bufferData[i] *= 3.5;
            }
            break;
        }

        // Create gain node for volume control
        const gainNode = ctx.createGain();
        gainNode.gain.value = data.gain;

        // Create a function to start a new source
        const createAndStartSource = () => {
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.loop = true;
          source.connect(gainNode);
          source.start();
          return source;
        };

        // Create the node object with custom connect/disconnect
        node = {
          type: "noise",
          gainNode,
          currentSource: null,
          connect(target) {
            // Create and start source only when connecting
            if (!this.currentSource) {
              this.currentSource = createAndStartSource();
            }
            // Connect to the target
            if (target.input && target.type) {
              this.gainNode.connect(target.input);
            } else {
              this.gainNode.connect(target);
            }
          },
          disconnect(target) {
            // Disconnect from target
            if (target.input && target.type) {
              this.gainNode.disconnect(target.input);
            } else {
              this.gainNode.disconnect(target);
            }

            // If no more connections, stop the source
            if (this.currentSource && !this.gainNode.numberOfOutputs) {
              this.currentSource.stop();
              this.currentSource.disconnect();
              this.currentSource = null;
            }
          },
        };
        break;
      }
      case "flanger": {
        // Create the delay node
        const delay = ctx.createDelay();
        delay.delayTime.value = data.delay / 1000; // Convert ms to seconds

        // Create the LFO for modulating delay time
        const lfo = ctx.createOscillator();
        lfo.frequency.value = data.rate;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = data.depth / 1000; // Convert to seconds
        lfo.connect(lfoGain);
        lfoGain.connect(delay.delayTime);
        lfo.start();

        // Create feedback path
        const feedback = ctx.createGain();
        feedback.gain.value = data.feedback;

        // Create dry/wet mix
        const mix = ctx.createGain();
        mix.gain.value = 0.5; // Equal mix of dry and wet

        // Create input gain for proper leveling
        const input = ctx.createGain();
        input.gain.value = 0.5;

        // Store all nodes in a container
        node = {
          type: "flanger",
          input,
          delay,
          lfo,
          lfoGain,
          feedback,
          mix,
          connect(target) {
            // Connect the final mix to the target
            if (target.input && target.type) {
              // If target is a custom node (like another flanger), connect to its input
              mix.connect(target.input);
            } else {
              // If target is a native AudioNode, connect directly
              mix.connect(target);
            }
          },
          disconnect(target) {
            if (target.input && target.type) {
              mix.disconnect(target.input);
            } else {
              mix.disconnect(target);
            }
          },
        };

        // Set up internal connections
        input.connect(delay);
        input.connect(mix);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(mix);

        break;
      }
      case "chorus": {
        // Create the delay nodes (stereo chorus)
        const delayL = ctx.createDelay();
        const delayR = ctx.createDelay();
        delayL.delayTime.value = data.delay / 1000;
        delayR.delayTime.value = data.delay / 1000;

        // Create the LFOs for modulating delay time (phase offset for stereo)
        const lfoL = ctx.createOscillator();
        const lfoR = ctx.createOscillator();
        lfoL.frequency.value = data.rate;
        lfoR.frequency.value = data.rate;

        const lfoGainL = ctx.createGain();
        const lfoGainR = ctx.createGain();
        lfoGainL.gain.value = data.depth / 1000;
        lfoGainR.gain.value = data.depth / 1000;

        // Phase offset for right channel (90 degrees)
        lfoR.detune.value = 1200; // One octave = 1200 cents

        lfoL.connect(lfoGainL);
        lfoR.connect(lfoGainR);
        lfoGainL.connect(delayL.delayTime);
        lfoGainR.connect(delayR.delayTime);
        lfoL.start();
        lfoR.start();

        // Create dry/wet mix controls
        const dryGain = ctx.createGain();
        const wetGainL = ctx.createGain();
        const wetGainR = ctx.createGain();

        dryGain.gain.value = 1 - data.mix;
        wetGainL.gain.value = data.mix * 0.5;
        wetGainR.gain.value = data.mix * 0.5;

        // Create stereo panner for width
        const panLeft = ctx.createStereoPanner();
        const panRight = ctx.createStereoPanner();
        panLeft.pan.value = -1;
        panRight.pan.value = 1;

        // Create input gain for proper leveling
        const input = ctx.createGain();
        input.gain.value = 0.7;

        // Create output merger
        const merger = ctx.createChannelMerger(2);

        // Store all nodes in a container
        node = {
          type: "chorus",
          input,
          delayL,
          delayR,
          lfoL,
          lfoR,
          lfoGainL,
          lfoGainR,
          dryGain,
          wetGainL,
          wetGainR,
          panLeft,
          panRight,
          merger,
          connect(target) {
            if (target.input && target.type) {
              merger.connect(target.input);
            } else {
              merger.connect(target);
            }
          },
          disconnect(target) {
            if (target.input && target.type) {
              merger.disconnect(target.input);
            } else {
              merger.disconnect(target);
            }
          },
        };

        // Set up internal connections
        input.connect(dryGain);
        input.connect(delayL);
        input.connect(delayR);

        delayL.connect(wetGainL);
        delayR.connect(wetGainR);

        wetGainL.connect(panLeft);
        wetGainR.connect(panRight);

        dryGain.connect(merger, 0, 0);
        dryGain.connect(merger, 0, 1);
        panLeft.connect(merger, 0, 0);
        panRight.connect(merger, 0, 1);

        break;
      }
      case "phaser": {
        // Create allpass filters for phasing
        const filters = Array(data.stages)
          .fill()
          .map(() => {
            const filter = ctx.createBiquadFilter();
            filter.type = "allpass";
            filter.frequency.value = data.freq;
            filter.Q.value = data.q;
            return filter;
          });

        // Create LFO for frequency modulation
        const lfo = ctx.createOscillator();
        lfo.frequency.value = data.rate;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = data.freq * 0.5; // Modulation depth
        lfo.connect(lfoGain);
        lfo.start();

        // Connect LFO to all filter frequencies
        filters.forEach((filter) => {
          lfoGain.connect(filter.frequency);
        });

        // Create dry/wet mix controls
        const dryGain = ctx.createGain();
        const wetGain = ctx.createGain();
        dryGain.gain.value = 1 - data.mix;
        wetGain.gain.value = data.mix;

        // Create input gain for proper leveling
        const input = ctx.createGain();
        input.gain.value = 0.7;

        // Create output gain
        const output = ctx.createGain();
        output.gain.value = 1.0;

        // Store all nodes in a container
        node = {
          type: "phaser",
          input,
          filters,
          lfo,
          lfoGain,
          dryGain,
          wetGain,
          output,
          connect(target) {
            if (target.input && target.type) {
              output.connect(target.input);
            } else {
              output.connect(target);
            }
          },
          disconnect(target) {
            if (target.input && target.type) {
              output.disconnect(target.input);
            } else {
              output.disconnect(target);
            }
          },
        };

        // Set up internal connections
        input.connect(dryGain);
        input.connect(filters[0]);
        dryGain.connect(output);

        // Connect filters in series
        filters.reduce((prev, curr) => {
          prev.connect(curr);
          return curr;
        });

        // Connect last filter to wet gain
        filters[filters.length - 1].connect(wetGain);
        wetGain.connect(output);

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
