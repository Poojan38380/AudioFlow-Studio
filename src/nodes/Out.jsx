import React, { memo } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { BaseNode, Button } from "../components/common";
import { useStore } from "../store";

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
  >
    <rect x="6" y="6" width="12" height="12" />
  </svg>
);

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

const Out = memo(() => {
  const { isRunning, toggleAudio } = useStore(selector, shallow);

  return (
    <BaseNode type="out">
      <Handle type="target" position="top" />

      <div className="node-header">
        <h3>Output</h3>
      </div>

      <div className="node-content">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAudio}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            padding: 0,
            margin: "8px auto",
            color: isRunning ? "#ef4444" : "#10b981",
          }}
          title={isRunning ? "Stop Audio" : "Start Audio"}
        >
          {isRunning ? <StopIcon /> : <PlayIcon />}
        </Button>
      </div>
    </BaseNode>
  );
});

Out.displayName = "Out";

export default Out;
