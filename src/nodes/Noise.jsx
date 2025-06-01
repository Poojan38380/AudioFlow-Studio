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
  <label className={tw("flex flex-col px-3 py-2")}>
    <p className={tw("text-xs font-medium text-gray-700 mb-2")}>Noise Type</p>
    <select
      className={tw(
        "nodrag w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white hover:border-gray-300 focus:border-blue-500 focus:outline-none"
      )}
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
  <label className={tw("flex flex-col px-3 py-2")}>
    <div className={tw("flex justify-between items-center mb-2")}>
      <p className={tw("text-xs font-medium text-gray-700")}>Gain</p>
      <p className={tw("text-xs text-gray-600")}>{value.toFixed(2)}</p>
    </div>
    <input
      className={tw(
        "nodrag w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300"
      )}
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={value}
      onChange={onChange}
      aria-label="Gain"
    />
  </label>
));

GainInput.displayName = "GainInput";

const Noise = memo(({ id, data }) => {
  const { setType, setGain } = useStore(createSelector(id), shallow);

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
        <p className={tw("text-sm font-medium text-white")}>Noise Generator</p>
      </div>

      <div className={tw("py-2")}>
        <NoiseTypeSelector value={data.type} onChange={setType} />
        <hr className={tw("border-gray-100 mx-3 my-1")} />
        <GainInput value={data.gain} onChange={setGain} />
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

Noise.displayName = "Noise";

export default Noise;
