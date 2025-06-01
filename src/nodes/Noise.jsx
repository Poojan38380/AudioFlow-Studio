import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { BaseNode } from "../components/common";
import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setType: useCallback(
    (e) => store.updateNode(id, { type: e.target.value }),
    [store]
  ),
  setGain: useCallback(
    (e) => store.updateNode(id, { gain: +e.target.value }),
    [store]
  ),
});

const Noise = memo(({ id, data }) => {
  const { setType, setGain } = useStore(createSelector(id), shallow);

  return (
    <BaseNode type="noise">
      <Handle type="source" position="bottom" />

      <div className="node-header">
        <h3>Noise Generator</h3>
      </div>

      <div className="node-content">
        <label>
          <div className="label-text">
            <span>Type</span>
          </div>
          <select
            className="nodrag"
            value={data.type}
            onChange={setType}
            aria-label="Noise type"
          >
            <option value="white">White Noise</option>
            <option value="pink">Pink Noise</option>
            <option value="brown">Brown Noise</option>
          </select>
        </label>

        <label>
          <div className="label-text">
            <span>Gain</span>
            <span>{data.gain.toFixed(2)}</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.gain}
            onChange={setGain}
            aria-label="Gain"
          />
        </label>
      </div>
    </BaseNode>
  );
});

Noise.displayName = "Noise";

export default Noise;
