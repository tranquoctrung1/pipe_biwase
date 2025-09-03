import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CurrentSiteReportState {
    value: string;
}

const initialState: CurrentSiteReportState = {
    value: '',
};

export const CurrentSiteReportSlice = createSlice({
    name: 'currentSiteReport',
    initialState,
    reducers: {
        setCurrentSiteReport: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setCurrentSiteReport } = CurrentSiteReportSlice.actions;

export const CurrentSiteReportState = (state: RootState) =>
    state.currentSiteReport.value;

export default CurrentSiteReportSlice.reducer;
