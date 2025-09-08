/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllBooksQuery } from "@/redux/features/book/book.api";
import BorrowModal from "@/components/ui/BorrowModal";
import { useCreateBorrowMutation } from "@/redux/features/borrow/borrow.api";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Link } from "react-router";
import { FadeLoader } from "react-spinners";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  imageURL?: string;
  copiesAvailable: number;
}

interface FilterForm {
  category: string;
}

export default function AllBooks() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [createBorrow] = useCreateBorrowMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);

  const { control } = useForm<FilterForm>({
    defaultValues: { category: "All" },
  });

  const queryParams = {
    page: page.toString(),
    limit: limit.toString(),
    ...(filters.category && filters.category !== "All"
      ? { category: filters.category }
      : {}),
    ...(search.trim() ? { search: search.trim() } : {}),
  };

  const { data, isLoading } = useGetAllBooksQuery(queryParams);
  const books: Book[] = data?.data || [];
  const totalPage = data?.meta?.totalPages || 1;

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPage));

  return (
    <div className="p-6 container mx-auto">
      <h2 className="text-3xl font-bold text-center my-8 text-gray-900 dark:text-white">
        📖 All Books
      </h2>

      {/* Filter + Search */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          {/* Search Field */}
          <Input
            placeholder="🔍 Search by title or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />

          {/* Category Select */}
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  setFilters({ category: val });
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Databases">Databases</SelectItem>
                  <SelectItem value="Artificial Intelligence">
                    Artificial Intelligence
                  </SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Operating Systems">
                    Operating Systems
                  </SelectItem>
                  <SelectItem value="Software Engineering">
                    Software Engineering
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Books Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <FadeLoader color="blue" />
        </div>
      ) : books.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map((book) => (
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
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    handlePrevious();
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {[...Array(totalPage)].map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={page === pageNumber}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  className={
                    page >= totalPage ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
