import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// using proxy for CORS, vite will send request with  same origin as backend
// /api/ = http://localhost:3000/api/.

// if in prod then use baseurl else viteproxy
const Base_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL + "/api"
  : "/api";
const Users_URL = "/v1/users";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: Base_URL, credentials: "include" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${Users_URL}`,
        method: "post",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${Users_URL}/auth`,
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${Users_URL}/logout`,
        method: "POST",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${Users_URL}/profile`,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${Users_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    //
    getAllUsers: builder.query({
      query: () => ({
        url: `${Users_URL}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = apiSlice;
