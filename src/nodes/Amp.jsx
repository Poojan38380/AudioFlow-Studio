import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { tw } from "twind";

import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setGain: useCallback(
    (e) => store.updateNode(id, { gain: +e.target.value }),
    [store]
  ),
});

// Memoized gain input component
const GainInput = memo(({ value, onChange }) => (
  <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
    <p className={tw("text-xs font-bold mb-2")}>Gain</p>
    <input
      className="nodrag"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={value}
      onChange={onChange}
      aria-label="Gain"
    />
    <p className={tw("text-right text-xs")}>{value.toFixed(2)}</p>
  </label>
));

GainInput.displayName = "GainInput";

const Amp = memo(({ id, data }) => {
  const { setGain } = useStore(createSelector(id), shallow);

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position="top"
        aria-label="Input connection"
      />

      <p
        className={tw("rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm")}
      >
        Amp
      </p>

      <GainInput value={data.gain} onChange={setGain} />

      <Handle
        className={tw("w-2 h-2")}
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Amp.displayName = "Amp";

export default Amp;
