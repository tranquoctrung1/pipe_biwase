import { configureStore } from '@reduxjs/toolkit';
import OpenSidebarSlice from './features/openSidebar';
import DisplayGroupSlice from './features/displayGroup';
import LoggerIdSlice from './features/loggerId';
import StartPeriodLostWaterSlice from './features/startPeriodLostWater';
import EndPeriodLostWaterSlice from './features/endPeriodLostWater';
import CurrentSiteReportSlice from './features/currentSiteReport';

export const store = configureStore({
    reducer: {
        open: OpenSidebarSlice,
        displayGroup: DisplayGroupSlice,
        loggerid: LoggerIdSlice,
        startPeriod: StartPeriodLostWaterSlice,
        endPeriod: EndPeriodLostWaterSlice,
        currentSiteReport: CurrentSiteReportSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
