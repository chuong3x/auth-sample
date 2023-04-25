import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./rtk.client";

import { IDocParams, IServerResponse } from "../types";

export const docApi = createApi({
    reducerPath: "docApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getParams: builder.query<IServerResponse<IDocParams>, string>({
            query: (id) => `doc/${id}`,
        }),
    }),
});
const extendDocApi = docApi.injectEndpoints({
    endpoints: (builder) => ({
        postParams: builder.mutation<
            IServerResponse<string>,
            { id: string; params: IDocParams }
        >({
            query: (payload) => ({
                url: `doc`,
                method: "POST",
                body: payload,
                responseHandler: async (response) =>
                    window.location.assign(
                        window.URL.createObjectURL(await response.blob())
                    ),
                cache: "no-cache",
            }),
        }),
    }),
    overrideExisting: false,
});
export const { useGetParamsQuery } = docApi;
export const { usePostParamsMutation } = extendDocApi;
