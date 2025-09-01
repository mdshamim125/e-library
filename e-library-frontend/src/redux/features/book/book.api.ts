import { baseApi } from "@/redux/baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all books
    getAllBooks: builder.query({
      query: (params: Record<string, string>) => ({
        url: "/book/all-books",
        method: "GET",
        params,
      }),
      providesTags: ["Book"],
    }),

    // Get a single book by ID
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/book/${id}`,
        method: "GET",
      }),
      providesTags: ["Book"],
    }),

    // Add a new book
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/book/create",
        method: "POST",
        data: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // Update book by ID
    updateBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        data: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // Remove book by ID
    removeBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useRemoveBookMutation,
} = bookApi;
