import React, { useState, memo } from "react";
import { tw } from "twind";

const nodeCategories = {
  Sources: [
    { type: "osc", label: "Oscillator", color: "from-blue-500 to-blue-600" },
    { type: "noise", label: "Noise", color: "from-green-500 to-green-600" },
  ],
  Effects: [
    { type: "amp", label: "Amplifier", color: "from-yellow-500 to-yellow-600" },
    {
      type: "flanger",
      label: "Flanger",
      color: "from-purple-500 to-purple-600",
    },
    { type: "chorus", label: "Chorus", color: "from-pink-500 to-pink-600" },
    { type: "phaser", label: "Phaser", color: "from-purple-500 to-purple-600" },
  ],
  Analysis: [
    { type: "waveform", label: "Waveform", color: "from-gray-700 to-gray-800" },
  ],
  Output: [{ type: "out", label: "Output", color: "from-red-500 to-red-600" }],
};

const NodeMenu = memo(({ onAddNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={tw("fixed bottom-4 left-4 z-50")}>
      {isOpen && (
        <div
          className={tw(
            "absolute bottom-10 left-0 bg-white rounded-lg shadow-xl border border-gray-200 w-64 p-3 grid gap-3"
          )}
        >
          {Object.entries(nodeCategories).map(([category, nodes]) => (
            <div key={category}>
              <h3 className={tw("text-xs font-medium text-gray-900 mb-1.5")}>
                {category}
              </h3>
              <div className={tw("grid gap-1")}>
                {nodes.map(({ type, label, color }) => (
                  <button
                    key={type}
                    onClick={() => {
                      onAddNode(type);
                      setIsOpen(false);
                    }}
                    className={tw(
                      "flex items-center w-full px-2.5 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    )}
                  >
                    <div
                      className={tw(
                        `w-2.5 h-2.5 rounded-full bg-gradient-to-r ${color} mr-2`
                      )}
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={tw("group relative inline-flex items-center")}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={tw(`
            flex items-center justify-center
            w-9 h-9
            bg-gradient-to-r from-indigo-500 to-indigo-600
            text-white rounded-full shadow-lg
            hover:from-indigo-600 hover:to-indigo-700
            hover:shadow-indigo-200 hover:shadow-xl
            transition-all duration-200
            ring-4 ring-white
            ${isOpen ? "rotate-45 transform" : ""}
          `)}
          title="Add Node"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={tw("h-5 w-5")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <span
          className={tw(
            "pointer-events-none ml-1.5 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          )}
        >
          Add Node
        </span>
      </div>
    </div>
  );
});

NodeMenu.displayName = "NodeMenu";

export default NodeMenu;
