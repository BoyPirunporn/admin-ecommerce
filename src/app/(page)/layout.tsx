import { AppSidebar } from '@/components/app-sidebar';
import SwitchThemeMode from '@/components/switch-theme-mode';
import SkeletonDataTable from '@/components/table-common/skeleton-data-table';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import QueryProvider from '@/providers/query-provider';
import React, { Suspense } from 'react';

type Props = {
    children: React.ReactNode;
};

const layout = ({
    children
}: Props) => {
    return (
        <div className='relative  flex-1 items-start'>
            <SidebarProvider className="">
                <AppSidebar className="" />
                <SidebarInset className='relative'>
                    <header className="fixed top-0 bg-background w-full z-10 flex h-16  items-center gap-2 border-b px-1">
                        <SwitchThemeMode />
                    </header>
                    <main className="relative py-16 lg:gap-10 lg:py-16 px-5 ">
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