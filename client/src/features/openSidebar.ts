import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface OpenState {
    value: boolean;
}

const initialState: OpenState = {
    value: false,
};

export const OpenSidebarSlice = createSlice({
    name: 'open',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        },
    },
});

export const { toggle } = OpenSidebarSlice.actions;

export const OpenState = (state: RootState) => state.open.value;

export default OpenSidebarSlice.reducer;
