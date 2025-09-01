/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBorrowingHistoryQuery } from "@/redux/features/borrow.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AllBorrowedBooks() {
  const { data, isLoading, error } = useGetAllBorrowingHistoryQuery(null);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p className="text-red-500">Failed to load borrowed books</p>;

  const borrowedBooks = data?.data || [];
  console.log("Borrowed books data:", borrowedBooks);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Book Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowedBooks?.length > 0 ? (
          borrowedBooks?.map((borrow: any) => (
            <TableRow key={borrow?._id}>
              <TableCell className="font-medium">
                {borrow?.bookId?.title || "Unknown Title"}
              </TableCell>
              <TableCell>
                {borrow?.bookId?.author || "Unknown Author"}
              </TableCell>
              <TableCell>{borrow?.quantity}</TableCell>
              <TableCell>
                {new Date(borrow?.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell
                className={
                  borrow?.status === "borrowed"
                    ? "text-yellow-600 font-semibold"
                    : "text-green-600 font-semibold"
                }
              >
                {borrow.status}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No borrowed books found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
