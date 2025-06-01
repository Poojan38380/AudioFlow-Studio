/**
 * Common Types
 */

export interface Node {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: Record<string, any>;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    type?: string;
}

export interface AudioNodeConfig {
    id: string;
    type: string;
    params: Record<string, number>;
}

export interface AudioConnection {
    source: string;
    target: string;
    outputIndex?: number;
    inputIndex?: number;
}

export interface AppState {
    nodes: Node[];
    edges: Edge[];
    isPlaying: boolean;
    addNode: (node: Node) => void;
    removeNode: (nodeId: string) => void;
    addEdge: (edge: Edge) => void;
    removeEdge: (edgeId: string) => void;
    togglePlayback: () => void;
} 