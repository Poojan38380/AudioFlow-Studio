import React, { useCallback, memo, useRef, useEffect } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { BaseNode } from "../components/common";
import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setZoom: useCallback(
    (e) => store.updateNode(id, { zoom: +e.target.value }),
    [store]
  ),
});

const drawNoSignal = (ctx, width, height) => {
  // Use a darker background for better visibility
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, width, height);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#9ca3af";
  ctx.textAlign = "center";
  ctx.fillText("Waiting for Input", width / 2, height / 2);

  // Draw a flat line
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.strokeStyle = "#4b5563";
  ctx.lineWidth = 1;
  ctx.stroke();
};

const Waveform = memo(({ id, data }) => {
  const canvasRef = useRef(null);
  const { setZoom } = useStore(createSelector(id), shallow);
  const frameRef = useRef(0);
  const [error, setError] = React.useState(null);
  const [hasSignal, setHasSignal] = React.useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const audioNode = window.nodes?.get(id);

    if (!audioNode?.analyser) {
      drawNoSignal(ctx, canvas.width, canvas.height);
      return;
    }

    setError(null);
    const dataArray = new Float32Array(audioNode.analyser.frequencyBinCount);
    const canvasCtx = ctx;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const zoom = data.zoom || 1;

    const draw = () => {
      frameRef.current = requestAnimationFrame(draw);

      try {
        audioNode.analyser.getFloatTimeDomainData(dataArray);

        // Check if we have any non-zero values
        const hasNonZero = dataArray.some((val) => Math.abs(val) > 0.001);
        setHasSignal(hasNonZero);

        // Use a darker background for better visibility
        canvasCtx.fillStyle = "#1a1a1a";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = hasNonZero
          ? "#818cf8" // Indigo color for active signal
          : "#4b5563"; // Gray color for no signal
        canvasCtx.beginPath();

        const sliceWidth = (WIDTH * 1.0) / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] * zoom;
          const y = (HEIGHT / 2) * (1 - v);

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();

        // Draw status text
        if (!hasNonZero) {
          canvasCtx.font = "12px Arial";
          canvasCtx.fillStyle = "#9ca3af";
          canvasCtx.textAlign = "center";
          canvasCtx.fillText("No Signal", WIDTH / 2, 20);
        }
      } catch (err) {
        console.error("Error drawing waveform:", err);
        setError("Error drawing waveform");
        cancelAnimationFrame(frameRef.current);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [id, data.zoom]);

  return (
    <BaseNode type="waveform">
      <Handle type="target" position="top" />

      <div className="node-header">
        <h3>Waveform {hasSignal && "●"}</h3>
      </div>

      <div className="node-content">
        <div
          style={{
            padding: "8px",
            background: "#1a1a1a",
            borderRadius: "6px",
            marginBottom: "8px",
          }}
        >
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "12px",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            {error}
          </p>
        )}

        <label>
          <div className="label-text">
            <span>Zoom</span>
            <span>{(data.zoom || 1).toFixed(2)}</span>
          </div>
          <input
            className="nodrag"
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={data.zoom || 1}
            onChange={setZoom}
            aria-label="Zoom"
          />
        </label>
      </div>
    </BaseNode>
  );
});

Waveform.displayName = "Waveform";

export default Waveform;
