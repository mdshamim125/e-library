import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: (params: Record<string, string>) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    // Update a single user by ID
    updateUser: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: { isActive },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserMutation } = userApi;
