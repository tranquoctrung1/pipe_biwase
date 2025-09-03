import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface LoggerIdState {
    value: string;
}

const initialState: LoggerIdState = {
    value: '',
};

export const LoggerIdSlice = createSlice({
    name: 'loggerid',
    initialState,
    reducers: {
        setCurrentLoggerId: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setCurrentLoggerId } = LoggerIdSlice.actions;

export const LoggerIdState = (state: RootState) => state.loggerid.value;

export default LoggerIdSlice.reducer;
