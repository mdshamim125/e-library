import BorrowedBooksTable from "@/components/ui/BorrowedBooksTable";

const ViewBorrows = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Borrowed Books</h1>
      <BorrowedBooksTable />
    </div>
  );
};

export default ViewBorrows;
