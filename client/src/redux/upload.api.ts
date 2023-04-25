import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./rtk.client";
import { IServerResponse, ITemplate } from "../types";

export const uploadApi = createApi({
    reducerPath: "uploadApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Upload"],
    endpoints: (builder) => ({
        load: builder.query<IServerResponse<ITemplate[]>, void>({
            query: () => `file`,
            providesTags: ["Upload"],
        }),
        upload: builder.mutation<IServerResponse<string>, FormData>({
            query: (payload) => ({
                url: `file/upload`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Upload"],
        }),
    }),
});

export const { useLoadQuery, useUploadMutation } = uploadApi;
