/**
 * NodeMenu Component
 * Displays available node types and handles node creation
 */

import React from "react";
import { NODE_TYPES } from "../../../constants";
import "./styles.css";

const NodeMenu = () => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="node-menu">
      <div className="node-menu__header">
        <h3>Audio Nodes</h3>
      </div>
      <div className="node-menu__items">
        {Object.entries(NODE_TYPES).map(([key, type]) => (
          <div
            key={key}
            className="node-menu__item"
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
          >
            {key.toLowerCase()}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default NodeMenu;
