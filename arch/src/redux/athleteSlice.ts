import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Athlete {
    id: string;
    name: string;
    progress: number[];
}

interface AthleteState {
    athletes: Athlete[];
    currentAthlete: Athlete | null;
}

const initialState: AthleteState = {
    athletes: [],
    currentAthlete: null,
};

const athleteSlice = createSlice({
    name: 'athlete',
    initialState,
    reducers: {
        addAthlete: (state, action: PayloadAction<Athlete>) => {
            state.athletes.push(action.payload);
        },
        updateAthleteProgress: (state, action: PayloadAction<{ id: string; progress: number[] }>) => {
            const athlete = state.athletes.find(a => a.id === action.payload.id);
            if (athlete) {
                athlete.progress = action.payload.progress;
            }
        },
        removeAthlete: (state, action: PayloadAction<string>) => {
            state.athletes = state.athletes.filter(a => a.id !== action.payload);
        },
        setCurrentAthlete: (state, action: PayloadAction<Athlete>) => {
            state.currentAthlete = action.payload;
        },
    },
});

export const { addAthlete, updateAthleteProgress, removeAthlete, setCurrentAthlete } = athleteSlice.actions;

// Selectors
export const selectAthletes = (state: { athlete: AthleteState }) => state.athlete.athletes;
export const selectCurrentAthlete = (state: { athlete: AthleteState }) => state.athlete.currentAthlete;
export const selectAthleteProgress = (state: { athlete: AthleteState }, athleteId: string) => {
    const athlete = state.athlete.athletes.find(a => a.id === athleteId);
    return athlete?.progress || [];
};

export default athleteSlice.reducer;