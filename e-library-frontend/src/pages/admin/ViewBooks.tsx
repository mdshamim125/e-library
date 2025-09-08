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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  useGetAllBooksQuery,
  useRemoveBookMutation,
} from "@/redux/features/book/book.api";

// ✅ import icons
import { Filter, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface FilterForm {
  category: string;
}

export default function ViewBooks() {
  const [deleteBook] = useRemoveBookMutation();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FilterForm>({
    defaultValues: {
      category: "all",
    },
  });

  const queryParams: {
    category?: string;
    page: string;
    limit: string;
    search?: string;
  } = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (filters.category && filters.category !== "All") {
    queryParams.category = filters.category;
  }
  if (search.trim() !== "") {
    queryParams.search = search.trim();
  }

  const { data } = useGetAllBooksQuery(queryParams);

  const books = data?.data || [];

  const filteredBooks = books.filter((book: any) => {
    const matchesCategory =
      !filters.category ||
      filters.category === "All" ||
      book.category === filters.category;

    const matchesSearch =
      !search ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPage = data?.meta?.totalPages || 1;

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPage));

  const onSubmit = (values: FilterForm) => {
    setFilters({ category: values.category });
    setPage(1);
  };

  const handleDelete = async () => {
    if (!selectedBookId) return;
    try {
      await deleteBook(selectedBookId).unwrap();
      toast.success("Book deleted successfully!");
      setSelectedBookId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Books
      </h2>

      {/* Filter + Search Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center gap-3 mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm"
      >
        {/* Search Input */}
        <Input
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Category Filter */}
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

        {/* Filter Button with Icon */}
        <Button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Filter size={18} />
          Filter
        </Button>
      </form>

      {/* Books Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Published Year</th>
              <th className="border p-2">Available</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr key="no-books">
                <td colSpan={6} className="text-center p-4">
                  No books found.
                </td>
              </tr>
            ) : (
              filteredBooks.map((book: any) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">{book.category}</td>
                  <td className="border p-2">{book.publishedYear}</td>
                  <td className="border p-2">
                    {book.copiesAvailable > 0 ? (
                      book.copiesAvailable
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Not Available
                      </span>
                    )}
                  </td>
                  <td className="border p-2">
                    {/* Edit Icon */}
                    <button
                      onClick={() => navigate(`/admin/edit/${book._id}`)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      <Edit size={18} />
                    </button>

                    {/* Delete Icon with AlertDialog */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setSelectedBookId(book._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the book.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </div>
  );
}
