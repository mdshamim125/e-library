/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useGetAllBooksQuery } from "@/redux/features/book/book.api";
import { toast } from "sonner";
import { Link } from "react-router";
import BorrowModal from "@/components/ui/BorrowModal";
import { useCreateBorrowMutation } from "@/redux/features/borrow/borrow.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { FadeLoader } from "react-spinners";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  imageURL?: string;
  copiesAvailable: number;
}

export default function RecentBooks() {
  const [createBorrow] = useCreateBorrowMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);

  // Fetch books (limit to 6)
  const { data, isLoading } = useGetAllBooksQuery({ limit: "6", page: "1" });
  const books: Book[] = data?.data || [];

  return (
    <div className="p-6 container mx-auto">
      <h2 className="text-3xl font-bold text-center my-8 text-gray-900 dark:text-white">
        📚 Recent Books
      </h2>

      {/* Books Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <FadeLoader color="blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No books found.
            </p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Book Image */}
                <div className="relative">
                  <img
                    src={book.imageURL || "/placeholder.png"}
                    alt={book.title || "Book cover"}
                    className="h-56 w-full object-cover group-hover:opacity-95 transition-opacity duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                    {book.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      by {book.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {book.copiesAvailable} copies available
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex justify-between items-center gap-2">
                    <Link to={`/books/${book._id}`} className="flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        View Details
                      </Button>
                    </Link>
                    <BorrowModal
                      bookTitle={book.title}
                      onBorrow={async ({ quantity, returnDate }) => {
                        if (!userInfo?.data?.role) {
                          toast.error("Please login first");
                          return;
                        }
                        try {
                          const res = await createBorrow({
                            bookId: book._id,
                            quantity,
                            dueDate: returnDate,
                          }).unwrap();

                          console.log("Borrow created:", res);
                          toast.success("Borrow successful!");
                        } catch (error: any) {
                          console.error("Error borrowing book:", error);
                          toast.error(error?.data?.message);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* View All */}
      <div className="my-10 text-center">
        <Link to="/books">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md">
            View All Books
          </Button>
        </Link>
      </div>
    </div>
  );
}
