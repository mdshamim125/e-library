// import UserOverview from "@/pages/user/UserOverview";
import ViewBorrows from "@/pages/user/ViewBorrows";
import type { ISidebarItem } from "@/type";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      // {
      //   title: "Overview",
      //   url: "/user/overview",
      //   component: UserOverview,
      // },
      {
        title: "View Borrowed Books",
        url: "/user/borrowed-books",
        component: ViewBorrows,
      },
    ],
  },
];
