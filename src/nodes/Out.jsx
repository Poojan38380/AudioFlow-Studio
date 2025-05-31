import React, { memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { tw } from "twind";

import { useStore } from "../store";

// Memoized selector
const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

// Memoized mute button component
const MuteButton = memo(({ isRunning, onClick }) => (
  <button
    onClick={onClick}
    aria-label={isRunning ? "Mute audio" : "Unmute audio"}
    className={tw(
      "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
    )}
  >
    {isRunning ? (
      <span role="img" aria-label="mute">
        🔈
      </span>
    ) : (
      <span role="img" aria-label="unmute">
        🔇
      </span>
    )}
  </button>
));

MuteButton.displayName = "MuteButton";

const Out = memo(() => {
  const { isRunning, toggleAudio } = useStore(selector, shallow);

  return (
    <div className={tw("rounded-md bg-white shadow-xl px-4 py-2")}>
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position="top"
        aria-label="Input connection"
      />
      <MuteButton isRunning={isRunning} onClick={toggleAudio} />
    </div>
  );
});

Out.displayName = "Out";

export default Out;
