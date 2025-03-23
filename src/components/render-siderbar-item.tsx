'use client'

import { usePathname } from "next/navigation";
import { NavBarProps } from "./app-sidebar";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";

const RenderSideBarItem = ({ item }: { item: NavBarProps }) => {
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
                  {item.items.map((e, index) => <RenderSideBarItem key={index} item={e} />)}
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

  export default RenderSideBarItem;