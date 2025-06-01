import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { tw } from "twind";

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

// Memoized parameter input component
const ParamInput = memo(({ label, value, onChange, min, max, step }) => (
  <label className={tw("flex flex-col px-2 py-1")}>
    <div className={tw("flex justify-between items-center mb-1")}>
      <p className={tw("text-xs font-bold")}>{label}</p>
      <p className={tw("text-xs")}>{value.toFixed(2)}</p>
    </div>
    <input
      className="nodrag"
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

const Chorus = memo(({ id, data }) => {
  const { setDelay, setDepth, setRate, setMix } = useStore(
    createSelector(id),
    shallow
  );

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position="top"
        aria-label="Input connection"
      />

      <p
        className={tw(
          "rounded-t-md px-2 py-1 bg-indigo-500 text-white text-sm"
        )}
      >
        Chorus
      </p>

      <div className={tw("py-2")}>
        <ParamInput
          label="Delay (ms)"
          value={data.delay}
          onChange={setDelay}
          min={20}
          max={50}
          step={0.1}
        />
        <ParamInput
          label="Depth"
          value={data.depth}
          onChange={setDepth}
          min={0}
          max={1}
          step={0.01}
        />
        <ParamInput
          label="Rate (Hz)"
          value={data.rate}
          onChange={setRate}
          min={0.1}
          max={3}
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
        className={tw("w-2 h-2")}
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Chorus.displayName = "Chorus";

export default Chorus;
