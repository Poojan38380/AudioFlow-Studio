import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { BaseNode } from "../components/common";
import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setDelay: useCallback(
    (e) => store.updateNode(id, { delay: +e.target.value }),
    [store]
  ),
  setDepth: useCallback(
    (e) => store.updateNode(id, { depth: +e.target.value }),
    [store]
  ),
  setRate: useCallback(
    (e) => store.updateNode(id, { rate: +e.target.value }),
    [store]
  ),
  setMix: useCallback(
    (e) => store.updateNode(id, { mix: +e.target.value }),
    [store]
  ),
});

const Chorus = memo(({ id, data }) => {
  const { setDelay, setDepth, setRate, setMix } = useStore(
    createSelector(id),
    shallow
  );

  return (
    <BaseNode type="chorus">
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />

      <div className="node-header">
        <h3>Chorus</h3>
      </div>

      <div className="node-content">
        <label>
          <div className="label-text">
            <span>Delay</span>
            <span>{data.delay.toFixed(1)} ms</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="20"
            max="50"
            step="0.1"
            value={data.delay}
            onChange={setDelay}
            aria-label="Delay"
          />
        </label>

        <label>
          <div className="label-text">
            <span>Depth</span>
            <span>{data.depth.toFixed(2)}</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.depth}
            onChange={setDepth}
            aria-label="Depth"
          />
        </label>

        <label>
          <div className="label-text">
            <span>Rate</span>
            <span>{data.rate.toFixed(1)} Hz</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={data.rate}
            onChange={setRate}
            aria-label="Rate"
          />
        </label>

        <label>
          <div className="label-text">
            <span>Mix</span>
            <span>{data.mix.toFixed(2)}</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.mix}
            onChange={setMix}
            aria-label="Mix"
          />
        </label>
      </div>
    </BaseNode>
  );
});

Chorus.displayName = "Chorus";

export default Chorus;
