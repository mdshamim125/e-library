// borrow.api.ts
import { api } from "../api/apiSlice";

export const borrowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //  Create a new borrow record
    createBorrow: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow"],
    }),

    //  Get all borrow records
    getAllBorrowingHistory: builder.query({
      query: (params: Record<string, string>) => ({
        url: "/all-borrow",
        method: "GET",
        params,
      }),
      providesTags: ["Borrow"],
    }),

    //  Update borrow status
    updateBorrowStatus: builder.mutation({
      query: ({ borrowId, status }) => ({
        url: `/${borrowId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Borrow"],
    }),

    //  Get borrowed books by user (with params like `userId`)
    getUserBorrowedBooks: builder.query({
      query: (params: Record<string, string>) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useCreateBorrowMutation,
  useGetAllBorrowingHistoryQuery,
  useUpdateBorrowStatusMutation,
  useGetUserBorrowedBooksQuery,
} = borrowApi;
