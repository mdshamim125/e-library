import AllBorrowedBooks from "@/components/ui/AllBorrowedBooks";
import { AddBook } from "@/pages/admin/AddBook";
// import AdminOverview from "@/pages/admin/AdminOverview";
import ManageUsers from "@/pages/admin/ManageUsers";
import ViewBooks from "@/pages/admin/ViewBooks";
import type { ISidebarItem } from "@/type";
export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      // {
      //   title: "overview",
      //   url: "/admin/overview",
      //   component: AdminOverview,
      // },
    ],
  },
  {
    title: "Book Management",
    items: [
      {
        title: "Add Book",
        url: "/admin/add-book",
        component: AddBook,
      },
      {
        title: "View Books",
        url: "/admin/all-books",
        component: ViewBooks,
      },
      {
        title: "View Borrowed Books",
        url: "/admin/borrowed-books",
        component: AllBorrowedBooks,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        component: ManageUsers,
      },
    ],
  },
];
