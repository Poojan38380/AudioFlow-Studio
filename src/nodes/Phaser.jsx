import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { BaseNode } from "../components/common";
import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setStages: useCallback(
    (e) => store.updateNode(id, { stages: +e.target.value }),
    [store]
  ),
  setFreq: useCallback(
    (e) => store.updateNode(id, { freq: +e.target.value }),
    [store]
  ),
  setQ: useCallback(
    (e) => store.updateNode(id, { q: +e.target.value }),
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

const Phaser = memo(({ id, data }) => {
  const { setStages, setFreq, setQ, setRate, setMix } = useStore(
    createSelector(id),
    shallow
  );

  return (
    <BaseNode type="phaser">
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />

      <div className="node-header">
        <h3>Phaser</h3>
      </div>

      <div className="node-content">
        <label>
          <div className="label-text">
            <span>Stages</span>
            <span>{data.stages}</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="2"
            max="12"
            step="2"
            value={data.stages}
            onChange={setStages}
            aria-label="Stages"
          />
        </label>

        <label>
          <div className="label-text">
            <span>Frequency</span>
            <span>{data.freq.toFixed(0)} Hz</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="100"
            max="5000"
            step="100"
            value={data.freq}
            onChange={setFreq}
            aria-label="Frequency"
          />
        </label>

        <label>
          <div className="label-text">
            <span>Q</span>
            <span>{data.q.toFixed(1)}</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={data.q}
            onChange={setQ}
            aria-label="Q"
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

Phaser.displayName = "Phaser";

export default Phaser;
