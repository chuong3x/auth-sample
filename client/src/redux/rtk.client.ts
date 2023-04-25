import { RootState } from "./../app/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout, refresh } from "./auth.slice";
import { IServerResponse } from "../types";

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery("auth/rf", api, extraOptions);
        if (refreshResult.data) {
            // store the new token
            api.dispatch(
                refresh(refreshResult.data as IServerResponse<string>)
            );
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

export default baseQueryWithReauth;
