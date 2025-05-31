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
  <label className={tw("flex flex-col px-2 py-1")}>
    <p className={tw("text-xs font-bold mb-2")}>Frequency</p>
    <input
      className="nodrag"
      type="range"
      min="10"
      max="1000"
      value={value}
      onChange={onChange}
      aria-label="Frequency"
    />
    <p className={tw("text-right text-xs")}>{value} Hz</p>
  </label>
));

FrequencyInput.displayName = "FrequencyInput";

// Memoized waveform selector component
const WaveformSelector = memo(({ value, onChange }) => (
  <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
    <p className={tw("text-xs font-bold mb-2")}>Waveform</p>
    <select
      className="nodrag"
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
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p
        className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}
      >
        Osc
      </p>

      <FrequencyInput value={data.frequency} onChange={setFrequency} />
      <hr className={tw("border-gray-200 mx-2")} />
      <WaveformSelector value={data.type} onChange={setType} />

      <Handle
        className={tw("w-2 h-2")}
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Osc.displayName = "Osc";

export default Osc;
