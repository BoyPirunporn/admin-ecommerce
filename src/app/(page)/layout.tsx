import { AppSidebar } from '@/components/app-sidebar'
import AsideMenu from '@/components/ui/aside-menu'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({
    children
}: Props) => {
    return (
        <div className='relative container flex-1 items-start'>
            <SidebarProvider className="">
                <AppSidebar className="" />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                    </header>
                    <main className="relative py-6 lg:gap-10 lg:py-8 px-5 ">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default layout;