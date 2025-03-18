import { AppSidebar } from '@/components/app-sidebar';
import SkeletonDataTable from '@/components/table-common/skeleton-data-table';
import AsideMenu from '@/components/ui/aside-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import QueryProvider from '@/providers/query-provider';
import React, { Suspense } from 'react';

type Props = {
    children: React.ReactNode;
};

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
                        <Suspense fallback={<SkeletonDataTable columns={5} rows={5} />}>
                            <QueryProvider>
                                {children}
                            </QueryProvider>
                        </Suspense>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default layout;