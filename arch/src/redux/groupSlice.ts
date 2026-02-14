import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupSession {
    id: string;
    name: string;
    athletes: string[];
}

interface GroupState {
    groups: GroupSession[];
    sessions: GroupSession[];
}

const initialState: GroupState = {
    groups: [],
    sessions: [],
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        addGroup: (state, action: PayloadAction<GroupSession>) => {
            state.groups.push(action.payload);
        },
        removeGroup: (state, action: PayloadAction<string>) => {
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
        updateGroup: (state, action: PayloadAction<{ id: string; name?: string; athletes?: string[] }>) => {
            const group = state.groups.find(group => group.id === action.payload.id);
            if (group) {
                if (action.payload.name) {
                    group.name = action.payload.name;
                }
                if (action.payload.athletes) {
                    group.athletes = action.payload.athletes;
                }
            }
        },
        createGroupSession: (state, action: PayloadAction<GroupSession>) => {
            state.sessions.push(action.payload);
        },
    },
});

export const { addGroup, removeGroup, updateGroup, createGroupSession } = groupSlice.actions;

// Selectors
export const selectGroups = (state: { group: GroupState }) => state.group.groups;
export const selectGroupSessions = (state: { group: GroupState }) => state.group.sessions;

export default groupSlice.reducer;