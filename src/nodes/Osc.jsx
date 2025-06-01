import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { BaseNode } from "../components/common";
import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setFrequency: useCallback(
    (e) => store.updateNode(id, { frequency: +e.target.value }),
    [store]
  ),
  setType: useCallback(
    (e) => store.updateNode(id, { type: e.target.value }),
    [store]
  ),
});

const Osc = memo(({ id, data }) => {
  const { setFrequency, setType } = useStore(createSelector(id), shallow);

  return (
    <BaseNode type="osc">
      <Handle type="source" position="bottom" />

      <div className="node-header">
        <h3>Oscillator</h3>
      </div>

      <div className="node-content">
        <label>
          <div className="label-text">
            <span>Frequency</span>
            <span>{data.frequency} Hz</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={data.frequency}
            onChange={setFrequency}
            aria-label="Frequency"
          />
        </label>

        <label>
          <div className="label-text">
            <span>Waveform</span>
          </div>
          <select
            className="nodrag"
            value={data.type}
            onChange={setType}
            aria-label="Waveform type"
          >
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
});

Osc.displayName = "Osc";

export default Osc;
