import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { tw } from "twind";

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

// Memoized noise type selector component
const NoiseTypeSelector = memo(({ value, onChange }) => (
  <label className={tw("flex flex-col px-2 pt-1 pb-2")}>
    <p className={tw("text-xs font-bold mb-2")}>Noise Type</p>
    <select
      className="nodrag"
      value={value}
      onChange={onChange}
      aria-label="Noise type"
    >
      <option value="white">White Noise</option>
      <option value="pink">Pink Noise</option>
      <option value="brown">Brown Noise</option>
    </select>
  </label>
));

NoiseTypeSelector.displayName = "NoiseTypeSelector";

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

const Noise = memo(({ id, data }) => {
  const { setType, setGain } = useStore(createSelector(id), shallow);

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p
        className={tw(
          "rounded-t-md px-2 py-1 bg-purple-500 text-white text-sm"
        )}
      >
        Noise
      </p>

      <NoiseTypeSelector value={data.type} onChange={setType} />
      <hr className={tw("border-gray-200 mx-2")} />
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

Noise.displayName = "Noise";

export default Noise;
