import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BorrowModalProps {
  bookTitle: string;
  onBorrow: (data: { quantity: number; returnDate: string }) => void;
}

export default function BorrowModal({ bookTitle, onBorrow }: BorrowModalProps) {
  const id = useId();
  const [quantity, setQuantity] = useState(1);
  const [returnDate, setReturnDate] = useState("");

  // Tomorrow's date in YYYY-MM-DD format
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!returnDate) return;

    // Double check: return date must be in the future
    if (new Date(returnDate) <= new Date()) {
      alert("Please select a future date for returning the book.");
      return;
    }

    onBorrow({ quantity, returnDate });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Borrow
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Borrow "{bookTitle}"
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Fill out the form to borrow this book.
        </DialogDescription>

        <div className="px-6 pt-4 pb-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-quantity`}>Quantity</Label>
              <Input
                id={`${id}-quantity`}
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-date`}>Return Date</Label>
              <Input
                id={`${id}-date`}
                type="date"
                min={minDate} // restrict to future dates
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </form>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSubmit}
              disabled={!returnDate}
            >
              Confirm Borrow
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
