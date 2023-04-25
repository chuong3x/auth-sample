import { RootState } from "./../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
    page: string;
}
const initialState: DashboardState = {
    page: "templates",
};
const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload;
        },
    },
});

export const { setPage } = dashboardSlice.actions;

export const dashboardSelector = (state: RootState) => state.dashboard;

const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
