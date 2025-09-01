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
import { Filter } from "lucide-react";
import BorrowModal from "@/components/ui/BorrowModal";
import { useCreateBorrowMutation } from "@/redux/features/borrow.api";
import { toast } from "sonner";

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

  const { control, handleSubmit } = useForm<FilterForm>({
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
  const onSubmit = (values: FilterForm) => {
    setFilters({ category: values.category });
    setPage(1);
  };

  return (
    <div className="p-6 bg-white container mx-auto dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Books
      </h2>

      {/* Filter + Search */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center gap-3 mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm"
      >
        <Input
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Software Engineering">
                  Software Engineering
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Filter size={18} />
          Filter
        </Button>
      </form>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : books.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No books found.
          </p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={book.imageURL || "/placeholder.png"}
                alt={book.title || "Book cover"}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 truncate">
                    {book.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {book.category}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => console.log("Navigate to details", book._id)}
                  >
                    View Details
                  </Button>
                  <BorrowModal
                    bookTitle={book.title}
                    onBorrow={async ({ quantity, returnDate }) => {
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

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-center mt-6">
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
