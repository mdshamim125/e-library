// borrow.api.ts
import type { BorrowStatus, IBorrow } from "@/type";
import { baseApi } from "../../baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new borrow record
    createBorrow: builder.mutation<IBorrow, Partial<IBorrow>>({
      query: (data) => ({
        url: "/borrow/create-borrow",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Borrow"],
    }),

    // Get all borrow records (admin)
    getAllBorrowingHistory: builder.query({
      query: () => ({
        url: "/borrow/all-borrows",
        method: "GET",
      }),
      providesTags: ["Borrow"],
    }),

    // Update borrow status
    updateBorrowStatus: builder.mutation<
      IBorrow,
      { borrowId: string; status: BorrowStatus }
    >({
      query: ({ borrowId, status }) => ({
        url: `/borrow/${borrowId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Borrow"],
    }),

    // Get borrowed books by user
    getUserBorrowedBooks: builder.query({
      query: () => ({
        url: "/borrow/my-borrows",
        method: "GET",
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
