import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@xyflow/react/dist/style.css";
import { ReactFlowProvider } from "@xyflow/react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeContextProvider } from "./theme/ThemeContext";
import { BottomMenu } from "./components/BottomMenu";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

// Wrap the app with store connection
const AppWithStore = () => {
  const createNode = useStore((state) => state.createNode, shallow);

  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlowProvider>
            <App />
          </ReactFlowProvider>
          <BottomMenu onAddNode={createNode} />
        </div>
      </ThemeProvider>
    </ThemeContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithStore />
  </React.StrictMode>
);
