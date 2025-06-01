import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../theme/ThemeContext";

const MenuContainer = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) =>
    theme.currentTheme === "dark"
      ? "rgba(39, 39, 42, 0.95)"
      : "rgba(255, 255, 255, 0.95)"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 1000;
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-${({ theme }) => theme.spacing.xs});
    padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all ${({ theme }) => theme.transitions.default};
    box-shadow: ${({ theme }) => theme.shadows.md};
    border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-${({ theme }) => theme.spacing.sm});
  }
`;

const Divider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  margin: 0 ${({ theme }) => theme.spacing.xxs};
`;

const NodeDropdown = styled.div`
  position: fixed;
  bottom: calc(${({ theme }) => theme.spacing.lg} + 60px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) =>
    theme.currentTheme === "dark"
      ? "rgba(39, 39, 42, 0.95)"
      : "rgba(255, 255, 255, 0.95)"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 240px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: all ${({ theme }) => theme.transitions.default};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  z-index: 999;
`;

const CategoryLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.xxs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  margin-top: ${({ theme }) => theme.spacing.sm};

  &:first-child {
    margin-top: 0;
  }
`;

const NodeOption = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  width: 100%;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ColorDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const NodeOptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
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
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const AudioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
    />
  </svg>
);

const EffectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
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
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828 2.828a9 9 0 001.414 1.414"
    />
  </svg>
);

const nodeCategories = {
  Sources: [
    { type: "osc", label: "Oscillator", color: "rgb(59, 130, 246)" }, // blue-500
    { type: "noise", label: "Noise", color: "rgb(34, 197, 94)" }, // green-500
  ],
  Effects: [
    { type: "amp", label: "Amplifier", color: "rgb(234, 179, 8)" }, // yellow-500
    { type: "flanger", label: "Flanger", color: "rgb(168, 85, 247)" }, // purple-500
    { type: "chorus", label: "Chorus", color: "rgb(236, 72, 153)" }, // pink-500
    { type: "phaser", label: "Phaser", color: "rgb(147, 51, 234)" }, // purple-600
  ],
  Analysis: [
    { type: "waveform", label: "Waveform", color: "rgb(75, 85, 99)" }, // gray-600
  ],
  Output: [
    { type: "out", label: "Output", color: "rgb(239, 68, 68)" }, // red-500
  ],
};

export const BottomMenu = ({ onAddNode }) => {
  const { currentTheme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        menuRef.current &&
        dropdownRef.current &&
        !menuRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isDropdownOpen]);

  const handleAddNode = (type) => {
    onAddNode(type);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <MenuContainer ref={menuRef}>
        <MenuButton
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          data-tooltip="Add Node"
        >
          <PlusIcon />
        </MenuButton>
        <Divider />
        <MenuButton onClick={toggleTheme} data-tooltip="Toggle Theme">
          {currentTheme === "light" ? <MoonIcon /> : <SunIcon />}
        </MenuButton>
      </MenuContainer>
      <NodeDropdown isOpen={isDropdownOpen} ref={dropdownRef}>
        {Object.entries(nodeCategories).map(([category, nodes]) => (
          <div key={category}>
            <CategoryLabel>{category}</CategoryLabel>
            <NodeOptionsGroup>
              {nodes.map(({ type, label, color }) => (
                <NodeOption
                  key={type}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddNode(type);
                  }}
                >
                  <ColorDot color={color} />
                  {label}
                </NodeOption>
              ))}
            </NodeOptionsGroup>
          </div>
        ))}
      </NodeDropdown>
    </>
  );
};
