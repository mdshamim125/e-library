/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleBookQuery } from "@/redux/features/book/book.api";
import BorrowModal from "@/components/ui/BorrowModal";
import { useCreateBorrowMutation } from "@/redux/features/borrow/borrow.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ViewDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [createBorrow] = useCreateBorrowMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);

  if (isLoading) {
    return (
      <div className="p-6 flex gap-6">
        <Skeleton className="w-64 h-80 rounded-xl" />
        <div className="flex flex-col gap-4 flex-1">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  const book = data?.data;

  if (!book) {
    return <p className="p-6 text-red-500">Book not found</p>;
  }

  return (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          {/* Left: Book Image */}
          <div className="w-full md:w-1/3">
            <img
              src={book.imageURL || "/placeholder.png"}
              alt={book.title}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Right: Book Info */}
          <div className="flex-1 space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              <Badge variant="secondary">{book.category}</Badge>
            </p>
            <p>
              <span className="font-semibold">Published Year:</span>{" "}
              {book.publishedYear}
            </p>
            <p>
              <span className="font-semibold">Copies Available:</span>{" "}
              <Badge
                variant={book.copiesAvailable > 0 ? "default" : "destructive"}
              >
                {book.copiesAvailable > 0
                  ? `${book.copiesAvailable} in stock`
                  : "Out of stock"}
              </Badge>
            </p>
            <p className="text-gray-700">{book.description}</p>

            {/* Borrow Modal */}
            <div className="pt-4">
              {book.copiesAvailable > 0 ? (
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
              ) : (
                <Button disabled className="bg-gray-400 text-white">
                  Out of Stock
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewDetails;
