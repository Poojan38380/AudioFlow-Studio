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
      "focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-2 hover:bg-gray-100 transition-colors"
    )}
  >
    {isRunning ? (
      <span role="img" aria-label="mute" className={tw("text-xl")}>
        🔈
      </span>
    ) : (
      <span role="img" aria-label="unmute" className={tw("text-xl")}>
        🔇
      </span>
    )}
  </button>
));

MuteButton.displayName = "MuteButton";

const Out = memo(() => {
  const { isRunning, toggleAudio } = useStore(selector, shallow);

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
          "rounded-t-lg px-3 py-2 bg-gradient-to-r from-green-500 to-green-600"
        )}
      >
        <p className={tw("text-sm font-medium text-white")}>Output</p>
      </div>

      <div className={tw("flex justify-center items-center py-3")}>
        <MuteButton isRunning={isRunning} onClick={toggleAudio} />
      </div>
    </div>
  );
});

Out.displayName = "Out";

export default Out;
