import React, { useCallback, memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { tw } from "twind";

import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setFrequency: useCallback(
    (e) => store.updateNode(id, { frequency: +e.target.value }),
    [store]
  ),
  setType: useCallback(
    (e) => store.updateNode(id, { type: e.target.value }),
    [store]
  ),
});

// Memoized frequency input component
const FrequencyInput = memo(({ value, onChange }) => (
  <label className={tw("flex flex-col px-3 py-2")}>
    <div className={tw("flex justify-between items-center mb-2")}>
      <p className={tw("text-xs font-medium text-gray-700")}>Frequency</p>
      <p className={tw("text-xs text-gray-600")}>{value} Hz</p>
    </div>
    <input
      className={tw(
        "nodrag w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300"
      )}
      type="range"
      min="10"
      max="1000"
      value={value}
      onChange={onChange}
      aria-label="Frequency"
    />
  </label>
));

FrequencyInput.displayName = "FrequencyInput";

// Memoized waveform selector component
const WaveformSelector = memo(({ value, onChange }) => (
  <label className={tw("flex flex-col px-3 py-2")}>
    <p className={tw("text-xs font-medium text-gray-700 mb-2")}>Waveform</p>
    <select
      className={tw(
        "nodrag w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white hover:border-gray-300 focus:border-blue-500 focus:outline-none"
      )}
      value={value}
      onChange={onChange}
      aria-label="Waveform type"
    >
      <option value="sine">sine</option>
      <option value="triangle">triangle</option>
      <option value="sawtooth">sawtooth</option>
      <option value="square">square</option>
    </select>
  </label>
));

WaveformSelector.displayName = "WaveformSelector";

const Osc = memo(({ id, data }) => {
  const { setFrequency, setType } = useStore(createSelector(id), shallow);

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
          "rounded-t-lg px-3 py-2 bg-gradient-to-r from-pink-500 to-pink-600"
        )}
      >
        <p className={tw("text-sm font-medium text-white")}>Oscillator</p>
      </div>

      <div className={tw("py-2")}>
        <FrequencyInput value={data.frequency} onChange={setFrequency} />
        <hr className={tw("border-gray-100 mx-3 my-1")} />
        <WaveformSelector value={data.type} onChange={setType} />
      </div>

      <Handle
        className={tw(
          "w-3 h-3 bg-pink-500 border-2 border-white rounded-full shadow-sm -bottom-1.5"
        )}
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Osc.displayName = "Osc";

export default Osc;
