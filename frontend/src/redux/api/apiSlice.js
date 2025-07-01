import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// using proxy
// /api/ = http://localhost:3000/api/.

const Base_URL = import.meta.env.VITE_BASE_URL + "/api";
const Users_URL = "/v1/users";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: Base_URL }),
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
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = apiSlice;
