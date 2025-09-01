import UserOverview from "@/pages/user/UserOverview";
import type { ISidebarItem } from "@/type";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: UserOverview,
      },
    ],
  },
];