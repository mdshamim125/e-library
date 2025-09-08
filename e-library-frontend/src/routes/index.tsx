import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/about/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/type";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import NotFound from "@/components/NotFound";
import EditBook from "@/pages/admin/EditBook";
import AllBooks from "@/pages/book/AllBooks";
import ViewDetails from "@/pages/book/ViewDetails";
import HomePage from "@/pages/homepage/HomePage";
import Contact from "@/pages/contact/Contact";
// import EditBook from "@/pages/admin/EditBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "books/:id",
        Component: ViewDetails,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.admin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/all-books" /> },
      {
        path: "/admin/edit/:id",
        Component: withAuth(EditBook, role.admin as TRole),
      },

      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      { index: true, element: <Navigate to="/user/borrowed-books" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  { path: "*", Component: NotFound },
  { path: "/unauthorized", Component: NotFound },

  // {
  //   path: "/verify",
  //   Component: Verify,
  // },
]);
