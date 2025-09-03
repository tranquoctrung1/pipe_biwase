import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface DisplayGroupState {
    value: [];
}

const initialState: DisplayGroupState = {
    value: [],
};

export const DisplayGroupSilce = createSlice({
    name: 'displayGroup',
    initialState,
    reducers: {
        addAllDisplayGroup: (state, action: PayloadAction<[]>) => {
            state.value = action.payload;
        },
        insertDiplayGroup: (state, action: PayloadAction) => {
            //@ts-ignore
            state.value.push(action.payload);
        },
        updateDisplayGroup: (state, action: PayloadAction) => {
            const temp = [];

            for (const item of state.value) {
                //@ts-ignore
                if (item._id != action.payload._id) {
                    temp.push(item);
                } else {
                    temp.push(action.payload);
                }
            }
            //@ts-ignore
            state.value = [...temp];
        },
        deleteDisplayGroup: (state, action: PayloadAction) => {
            //@ts-ignore
            const temp = [];

            for (const item of state.value) {
                //@ts-ignore
                if (item._id != action.payload._id) {
                    temp.push(item);
                }
            }
            //@ts-ignore
            state.value = [...temp];
        },
    },
});

export const {
    addAllDisplayGroup,
    insertDiplayGroup,
    updateDisplayGroup,
    deleteDisplayGroup,
} = DisplayGroupSilce.actions;

export const DisplayGroupState = (state: RootState) => state.displayGroup.value;

export default DisplayGroupSilce.reducer;
