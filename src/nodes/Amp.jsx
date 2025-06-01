import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { BaseNode } from "../components/common";
import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setGain: useCallback(
    (e) => store.updateNode(id, { gain: +e.target.value }),
    [store]
  ),
});

const Amp = memo(({ id, data }) => {
  const { setGain } = useStore(createSelector(id), shallow);

  return (
    <BaseNode type="amp">
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />

      <div className="node-header">
        <h3>Amplifier</h3>
      </div>

      <div className="node-content">
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

Amp.displayName = "Amp";

export default Amp;
