'use client'
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion"
import { useIsMobile } from "@/hooks/use-mobile"


interface NavBarProps {
  title: string;
  url?: string;
  items?: NavBarProps[]
}
interface AppSideBarProps {
  versions: string[];
  navs: NavBarProps[]
}
// This is sample data.
const dataNav: AppSideBarProps = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navs: [
    {
      title: "Manager",
      items: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Category",
          url: "/category",
        },
        {
          title: "Product",
          url: "/product",
        },
        {
          title: "Product option",
          url: "/product-option",
        },
        {
          title: "Order",
          url: "/order",
        },
      ],
    },
  ],
}

const RenderSubMenu = ({ item }: { item: NavBarProps }) => {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  if (item.items && item.items.length) {
    return (
      <SidebarGroup key={item.title} className="pr-0 mr-0">
        <Accordion key={item.title} type="single" collapsible >
          <AccordionItem value={item.title}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <SidebarMenu>
                {item.items.map((e, index) => <RenderSubMenu key={index} item={e} />)}
              </SidebarMenu>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SidebarGroup>
    )
  }
  return (
    <SidebarMenuItem >
      <SidebarMenuButton asChild isActive={pathname === item.url} >
        <Link href={item.url!} onClick={() => {
          if (useIsMobile()) {
            toggleSidebar()
          }
        }}>{item.title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        Shop Admin
      </SidebarHeader>
      <SidebarContent >
        {/* We create a SidebarGroup for each parent. */}
        {dataNav.navs.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((item, index) => (
                  <RenderSubMenu key={index} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="mt-auto px-3 w-full mb-10">
          <Button className=" w-full" variant={"destructive"} onClick={() => signOut()}>Logout</Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
