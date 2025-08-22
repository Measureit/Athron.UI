export interface Athlete {
    id: string;
    name: string;
    progress: number[];
}

export interface Group {
    id: string;
    name: string;
    athletes: Athlete[];
}

export interface TrainingSession {
    id: string;
    groupId: string;
    date: string;
    duration: number; // in minutes
    notes?: string;
}

export interface PathSimulationData {
    athleteId: string;
    path: Array<{ x: number; y: number }>;
}