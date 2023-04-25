import {
    createSlice,
    getType,
    PayloadAction,
    SerializedError,
} from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { RootState } from "../app/store";
import { IServerResponse } from "../types";

export interface AuthState {
    token: string;
    message: string;
    toggle: boolean;
}
const initialState: AuthState = {
    token: "",
    message: "",
    toggle: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IServerResponse<string>>) => {
            state.token = action.payload.data;
            state.message = action.payload.message;
            state.toggle = !state.toggle;
        },
        logout: (state) => {
            state.token = "";
        },
        refresh: (state, action: PayloadAction<IServerResponse<string>>) => {
            state.token = action.payload.data;
        },
        error: (state, action: PayloadAction<FetchBaseQueryError>) => {
            state.message = (
                action.payload.data as IServerResponse<any>
            ).message;
            state.toggle = !state.toggle;
        },
    },
});

export const { login, logout, refresh, error } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
const authReducer = authSlice.reducer;
export default authReducer;
