import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
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
import AllBooks from "@/pages/user/AllBooks";
// import EditBook from "@/pages/admin/EditBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
      {
        path: "books",
        Component: AllBooks,
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
      { index: true, element: <Navigate to="/admin/overview" /> },

      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/admin/edit/:id",
    Component: withAuth(EditBook, role.admin as TRole),
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      { index: true, element: <Navigate to="/user/overview" /> },
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
