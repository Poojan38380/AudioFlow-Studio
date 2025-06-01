# Audio Playground

A React-based audio processing and visualization application built with React Flow.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── common/        # Shared components
│   ├── nodes/         # React Flow node components
│   └── menu/          # Menu-related components
├── hooks/             # Custom React hooks
├── services/          # Core services and business logic
│   ├── audio/         # Audio processing logic
│   └── store/         # State management
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and helpers
├── constants/         # Constants and configuration
└── styles/           # Global styles and theme

```

## Code Organization Principles

1. **Component Structure**

   - Each component has its own directory
   - Contains index.jsx, styles.css, and tests
   - Props are documented using JSDoc

2. **State Management**

   - Uses centralized store for global state
   - Components use local state when appropriate

3. **Audio Processing**

   - Audio logic is isolated in services/audio
   - WebAudio API interactions are abstracted

4. **Type Safety**
   - All interfaces and types are in types/ directory
   - Props and state are properly typed

## Development Guidelines

1. Keep components small and focused
2. Document complex logic with clear comments
3. Use meaningful variable and function names
4. Follow the established folder structure
5. Write tests for critical functionality

## Getting Started

```bash
npm install
npm run dev
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
