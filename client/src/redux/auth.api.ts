import { createApi } from "@reduxjs/toolkit/query/react";

import {
    ILoginPayload,
    IRegisterPayload,
    IResponse,
    IServerResponse,
} from "../types";
import baseQueryWithReauth from "./rtk.client";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        rfToken: builder.query<IServerResponse<string>, void>({
            query: () => `auth/rf`,
        }),
        checkToken: builder.query<IServerResponse<string>, void>({
            query: () => `auth/check`,
        }),
        login: builder.mutation<IServerResponse<string>, ILoginPayload>({
            query: (payload) => ({
                url: `auth/login`,
                method: "POST",
                body: payload,
            }),
        }),
        logout: builder.mutation<IResponse, void>({
            query: () => ({
                url: `auth/logout`,
                method: "POST",
            }),
        }),
        register: builder.mutation<IServerResponse<string>, IRegisterPayload>({
            query: (payload) => ({
                url: `auth/register`,
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useRfTokenQuery,
    useCheckTokenQuery,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
} = authApi;
