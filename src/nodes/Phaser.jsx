import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { tw } from "twind";

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

// Memoized parameter input component
const ParamInput = memo(({ label, value, onChange, min, max, step }) => (
  <label className={tw("flex flex-col px-3 py-1.5")}>
    <div className={tw("flex justify-between items-center mb-1.5")}>
      <p className={tw("text-xs font-medium text-gray-700")}>{label}</p>
      <p className={tw("text-xs text-gray-600")}>{value.toFixed(2)}</p>
    </div>
    <input
      className={tw(
        "nodrag w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300"
      )}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      aria-label={label}
    />
  </label>
));

ParamInput.displayName = "ParamInput";

const Phaser = memo(({ id, data }) => {
  const { setStages, setFreq, setQ, setRate, setMix } = useStore(
    createSelector(id),
    shallow
  );

  return (
    <div
      className={tw(
        "rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100"
      )}
    >
      <Handle
        className={tw(
          "w-3 h-3 bg-blue-500 border-2 border-white rounded-full shadow-sm -top-1.5"
        )}
        type="target"
        position="top"
        aria-label="Input connection"
      />

      <div
        className={tw(
          "rounded-t-lg px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600"
        )}
      >
        <p className={tw("text-sm font-medium text-white")}>Phaser</p>
      </div>

      <div className={tw("grid grid-cols-2 gap-x-2 py-2")}>
        <ParamInput
          label="Stages"
          value={data.stages}
          onChange={setStages}
          min={2}
          max={12}
          step={2}
        />
        <ParamInput
          label="Frequency"
          value={data.freq}
          onChange={setFreq}
          min={100}
          max={5000}
          step={100}
        />
        <ParamInput
          label="Q"
          value={data.q}
          onChange={setQ}
          min={0.1}
          max={10}
          step={0.1}
        />
        <ParamInput
          label="Rate (Hz)"
          value={data.rate}
          onChange={setRate}
          min={0.1}
          max={5}
          step={0.1}
        />
        <ParamInput
          label="Mix"
          value={data.mix}
          onChange={setMix}
          min={0}
          max={1}
          step={0.01}
        />
      </div>

      <Handle
        className={tw(
          "w-3 h-3 bg-purple-500 border-2 border-white rounded-full shadow-sm -bottom-1.5"
        )}
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Phaser.displayName = "Phaser";

export default Phaser;
