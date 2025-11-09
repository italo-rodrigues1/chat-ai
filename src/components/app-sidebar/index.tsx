"use client";

import * as React from "react";
import {
  Workflow,
  FileText,
  GalleryVerticalEnd,
  TableProperties,
  FileAudio,
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
    avatar: "",
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
      url: "/chat",
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
      url: "/library",
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
      url: "/settings",
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
          title: "Limits",
          url: "#",
        },
      ],
      isCollaped: true,
    },
  ],
  actions: [
    {
      name: "PDF",
      url: "#",
      icon: FileText,
    },
    {
      name: "Spreadsheet",
      url: "#",
      icon: TableProperties,
    },
    {
      name: "Transcription",
      url: "#",
      icon: FileAudio,
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
