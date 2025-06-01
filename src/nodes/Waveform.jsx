import React, { useCallback, memo, useRef, useEffect } from "react";
import { Handle } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { tw } from "twind";

import { useStore } from "../store";

// Memoized selector factory
const createSelector = (id) => (store) => ({
  setZoom: useCallback(
    (e) => store.updateNode(id, { zoom: +e.target.value }),
    [store]
  ),
});

// Memoized parameter input component
const ParamInput = memo(({ label, value, onChange, min, max, step }) => (
  <label className={tw("flex flex-col px-3 py-1.5")}>
    <div className={tw("flex justify-between items-center mb-1.5")}>
      <p className={tw("text-xs font-medium text-gray-700")}>{label}</p>
      <p className={tw("text-xs text-gray-600")}>{value.toFixed(2)}</p>
    </div>
    <input
      className={tw(
        "nodrag w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300"
      )}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      aria-label={label}
    />
  </label>
));

ParamInput.displayName = "ParamInput";

const Waveform = memo(({ id, data }) => {
  const canvasRef = useRef(null);
  const { setZoom } = useStore(createSelector(id), shallow);
  const frameRef = useRef(0);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const audioNode = window.nodes?.get(id);

    if (!audioNode?.analyser) {
      // Draw "No Signal" message
      ctx.fillStyle = "rgb(32, 33, 36)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px Arial";
      ctx.fillStyle = "rgb(156, 163, 175)";
      ctx.textAlign = "center";
      ctx.fillText("No Signal", canvas.width / 2, canvas.height / 2);
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

        canvasCtx.fillStyle = "rgb(32, 33, 36)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(99, 102, 241)";
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
          "rounded-t-lg px-3 py-2 bg-gradient-to-r from-gray-700 to-gray-800"
        )}
      >
        <p className={tw("text-sm font-medium text-white")}>Waveform</p>
      </div>

      <div className={tw("p-2 bg-gray-900")}>
        <canvas
          ref={canvasRef}
          width={300}
          height={150}
          className={tw("rounded-md bg-gray-800")}
        />
        {error && (
          <p className={tw("text-xs text-red-500 mt-1 text-center")}>{error}</p>
        )}
      </div>

      <div className={tw("py-2")}>
        <ParamInput
          label="Zoom"
          value={data.zoom || 1}
          onChange={setZoom}
          min={0.1}
          max={5}
          step={0.1}
        />
      </div>

      <Handle
        className={tw(
          "w-3 h-3 bg-blue-500 border-2 border-white rounded-full shadow-sm -bottom-1.5"
        )}
        type="source"
        position="bottom"
        aria-label="Output connection"
      />
    </div>
  );
});

Waveform.displayName = "Waveform";

export default Waveform;
