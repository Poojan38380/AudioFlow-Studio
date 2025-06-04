import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../theme/ThemeContext";
import { useStore } from "../store";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const UndoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
    />
  </svg>
);

const RedoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const AudioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
    />
  </svg>
);

const EffectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const OutputIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14M12 5l7 7-7 7"
    />
  </svg>
);

export const BottomMenu = ({ onAddNode }) => {
  const { toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { undo, redo, canUndo, canRedo, clearNodes } = useStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.metaKey || event.ctrlKey) {
        if (event.key === "z") {
          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [undo, redo]);

  const handleAddNode = (type) => {
    onAddNode(type);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-lg left-lg bg-background-secondary border border-background-tertiary rounded-lg p-sm flex gap-sm shadow-md z-dropdown transition-all duration-200 hover:shadow-lg">
        <button
          className="w-9 h-9 rounded-md border border-background-tertiary bg-background-primary text-text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 group relative"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          data-tooltip="Add Node (A)"
        >
          <PlusIcon />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-xs px-sm py-xs bg-background-secondary text-text-primary rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-200 shadow-md border border-background-tertiary z-tooltip group-hover:opacity-100 group-hover:visible group-hover:-translate-y-md">
            Add Node (A)
          </span>
        </button>

        <div className="w-px bg-background-tertiary mx-xs" />

        <button
          className={twMerge(
            "w-9 h-9 rounded-md border border-background-tertiary bg-background-primary text-text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 group relative",
            !canUndo && "opacity-50 cursor-not-allowed hover:transform-none"
          )}
          onClick={undo}
          disabled={!canUndo}
          data-tooltip="Undo (⌘Z)"
        >
          <UndoIcon />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-xs px-sm py-xs bg-background-secondary text-text-primary rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-200 shadow-md border border-background-tertiary z-tooltip group-hover:opacity-100 group-hover:visible group-hover:-translate-y-md">
            Undo (⌘Z)
          </span>
        </button>

        <button
          className={twMerge(
            "w-9 h-9 rounded-md border border-background-tertiary bg-background-primary text-text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 group relative",
            !canRedo && "opacity-50 cursor-not-allowed hover:transform-none"
          )}
          onClick={redo}
          disabled={!canRedo}
          data-tooltip="Redo (⌘⇧Z)"
        >
          <RedoIcon />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-xs px-sm py-xs bg-background-secondary text-text-primary rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-200 shadow-md border border-background-tertiary z-tooltip group-hover:opacity-100 group-hover:visible group-hover:-translate-y-md">
            Redo (⌘⇧Z)
          </span>
        </button>

        <div className="w-px bg-background-tertiary mx-xs" />

        <button
          className="w-9 h-9 rounded-md border border-background-tertiary bg-background-primary text-text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 group relative"
          onClick={toggleTheme}
          data-tooltip="Toggle Theme (T)"
        >
          <SunIcon />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-xs px-sm py-xs bg-background-secondary text-text-primary rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-200 shadow-md border border-background-tertiary z-tooltip group-hover:opacity-100 group-hover:visible group-hover:-translate-y-md">
            Toggle Theme (T)
          </span>
        </button>

        <button
          className="w-9 h-9 rounded-md border border-background-tertiary bg-background-primary text-text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 group relative"
          onClick={clearNodes}
          data-tooltip="Clear All"
        >
          <TrashIcon />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-xs px-sm py-xs bg-background-secondary text-text-primary rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-200 shadow-md border border-background-tertiary z-tooltip group-hover:opacity-100 group-hover:visible group-hover:-translate-y-md">
            Clear All
          </span>
        </button>
      </div>

      <div
        ref={dropdownRef}
        className={twMerge(
          "fixed bottom-[calc(theme(spacing.lg)+64px)] left-lg bg-background-secondary border border-background-tertiary rounded-lg p-md flex flex-col gap-md min-w-[260px] shadow-lg transition-all duration-200 z-dropdown",
          isDropdownOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div>
          <div className="text-sm font-semibold text-text-secondary pb-xs border-b border-background-tertiary">
            Audio Sources
          </div>
          <div className="flex flex-col gap-xs mt-md">
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("osc")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-audio border border-background-tertiary shadow-sm" />
              Oscillator
            </button>
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("noise")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-audio border border-background-tertiary shadow-sm" />
              Noise
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-text-secondary pb-xs border-b border-background-tertiary">
            Effects
          </div>
          <div className="flex flex-col gap-xs mt-md">
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("amp")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-effect border border-background-tertiary shadow-sm" />
              Amplifier
            </button>
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("flanger")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-effect border border-background-tertiary shadow-sm" />
              Flanger
            </button>
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("chorus")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-effect border border-background-tertiary shadow-sm" />
              Chorus
            </button>
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("phaser")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-effect border border-background-tertiary shadow-sm" />
              Phaser
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-text-secondary pb-xs border-b border-background-tertiary">
            Analysis
          </div>
          <div className="flex flex-col gap-xs mt-md">
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("waveform")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-input border border-background-tertiary shadow-sm" />
              Waveform
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-text-secondary pb-xs border-b border-background-tertiary">
            Output
          </div>
          <div className="flex flex-col gap-xs mt-md">
            <button
              className="flex items-center gap-sm px-md py-sm bg-background-primary border border-background-tertiary text-text-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-background-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-sm font-medium text-left w-full"
              onClick={() => handleAddNode("out")}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-nodes-output border border-background-tertiary shadow-sm" />
              Output
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
