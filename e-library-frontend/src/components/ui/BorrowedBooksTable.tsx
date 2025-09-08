/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUserBorrowedBooksQuery,
  useUpdateBorrowStatusMutation,
} from "@/redux/features/borrow/borrow.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FadeLoader } from "react-spinners";

export default function BorrowedBooksTable() {
  const { data, isLoading, error } = useGetUserBorrowedBooksQuery(null);
  const [updateBorrowStatus, { isLoading: updating }] =
    useUpdateBorrowStatusMutation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <FadeLoader color="blue" />
      </div>
    );
  if (error)
    return <p className="text-red-500">Failed to load borrowed books</p>;

  const borrowedBooks = data?.data || [];
  console.log("Borrowed books data:", data);

  const handleReturn = async (borrowId: string) => {
    try {
      const res = await updateBorrowStatus({
        borrowId,
        status: "returned",
      }).unwrap();
      console.log(res);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Book Title</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowedBooks?.length > 0 ? (
          borrowedBooks?.map((borrow: any) => (
            <TableRow key={borrow?._id}>
              <TableCell className="font-medium">
                <Link
                  className="hover:underline"
                  to={`/books/${borrow?.bookId?._id}`}
                >
                  {borrow?.bookId?.title || "Unknown Title"}
                </Link>
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
              <TableCell>
                {borrow?.status === "borrowed" ? (
                  <Button
                    size="sm"
                    onClick={() => handleReturn(borrow._id)}
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Returned"}
                  </Button>
                ) : (
                  <span className="text-gray-400">Already Returned</span>
                )}
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
