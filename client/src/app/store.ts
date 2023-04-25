import { uploadApi } from "./../redux/upload.api";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/auth.api";
import authReducer from "../redux/auth.slice";
import dashboardReducer from "../redux/dashboard.slice";
import { docApi } from "../redux/doc.api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        [authApi.reducerPath]: authApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        [docApi.reducerPath]: docApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            uploadApi.middleware,
            docApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
