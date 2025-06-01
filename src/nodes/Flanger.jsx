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
  setFeedback: useCallback(
    (e) => store.updateNode(id, { feedback: +e.target.value }),
    [store]
  ),
});

// Memoized parameter input component
const ParamInput = memo(({ label, value, onChange, min, max, step }) => (
  <label className={tw("flex flex-col px-2 pt-1 pb-2")}>
    <p className={tw("text-xs font-bold mb-1")}>{label}</p>
    <input
      className="nodrag w-full"
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      aria-label={label}
    />
    <p className={tw("text-right text-xs")}>{value.toFixed(2)}</p>
  </label>
));

ParamInput.displayName = "ParamInput";

const Flanger = memo(({ id, data }) => {
  const { setDelay, setDepth, setRate, setFeedback } = useStore(
    createSelector(id),
    shallow
  );

  return (
    <div className="rounded-md bg-white shadow-xl">
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position="top"
        aria-label="Input connection"
      />

      <p
        className={tw(
          "rounded-t-md px-2 py-1 bg-purple-500 text-white text-sm"
        )}
      >
        Flanger
      </p>

      <div className={tw("grid grid-cols-2 gap-x-1")}>
        <ParamInput
          label="Delay (ms)"
          value={data.delay}
          onChange={setDelay}
          min={0.1}
          max={15}
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
          max={10}
          step={0.1}
        />
        <ParamInput
          label="Feedback"
          value={data.feedback}
          onChange={setFeedback}
          min={0}
          max={0.9}
          step={0.01}
        />
      </div>

      <Handle
        className="w-2 h-2"
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Flanger.displayName = "Flanger";

export default Flanger;
