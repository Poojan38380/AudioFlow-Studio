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

const Flanger = memo(({ id, data }) => {
  const { setDelay, setDepth, setRate, setFeedback } = useStore(
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
        style={{ background: "#d97706" }}
        className={tw("rounded-t-lg px-3 py-2")}
      >
        <p className={tw("text-sm font-medium text-white")}>Flanger</p>
      </div>

      <div className={tw("grid grid-cols-2 gap-x-2 py-2")}>
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
        className={tw(
          "w-3 h-3 bg-amber-500 border-2 border-white rounded-full shadow-sm -bottom-1.5"
        )}
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Flanger.displayName = "Flanger";

export default Flanger;
