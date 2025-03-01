"use client";

import * as React from "react";
import {
  Workflow,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  MessageSquareText,
  BookOpen,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavActions } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "italo",
    email: "italodevezero@hotmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Faz o L",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Chat",
      url: "/",
      icon: MessageSquareText,
      isCollaped: false,
    },
    {
      title: "Flow",
      url: "/flow",
      icon: Workflow,
      isCollaped: false,
    },
    {
      title: "Library",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "Prompt",
          url: "#",
        },
        {
          title: "Tools",
          url: "#",
        },
      ],
      isCollaped: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
      isCollaped: true,
    },
  ],
  actions: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavActions actions={data.actions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
