import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface EndPeriodLostWaterState {
    value: string;
}

const initialState: EndPeriodLostWaterState = {
    value: '',
};

export const EndPeriodLostWaterSlice = createSlice({
    name: 'endPeriod',
    initialState,
    reducers: {
        setEndPeriod: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setEndPeriod } = EndPeriodLostWaterSlice.actions;

export const EndPeriodLostWaterState = (state: RootState) =>
    state.endPeriod.value;

export default EndPeriodLostWaterSlice.reducer;
