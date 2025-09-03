import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface StartPeriodLostWaterState {
    value: string;
}

const initialState: StartPeriodLostWaterState = {
    value: '',
};

export const StartPeriodLostWaterSlice = createSlice({
    name: 'startPeriod',
    initialState,
    reducers: {
        setStartPeriod: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setStartPeriod } = StartPeriodLostWaterSlice.actions;

export const StartPeriodLostWaterState = (state: RootState) =>
    state.startPeriod.value;

export default StartPeriodLostWaterSlice.reducer;
