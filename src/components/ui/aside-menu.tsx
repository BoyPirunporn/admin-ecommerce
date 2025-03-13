'use client';

import EachElement from '@/lib/EachElement'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const routes = [
    { route: "/", label: "Dashboard" },
    { route: "/category", label: "Category" },
    { route: "/product", label: "Product" },
    { route: "/product-option", label: "Product Option" },
]
const AsideMenu = () => {
    const pathname = usePathname()
    return (
        <aside className="border border-dashed border-r border-l  fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block pt-10">
            <ul className="flex flex-col gap-4 py-10 pl-2">
                <EachElement
                    of={routes}
                    render={(item, index) => (
                        <Link className={cn("hover:bg-gray-600 cursor-pointer transition-all duration-300 border border-dashed px-5 py-3 rounded-l-xl ", pathname === item.route && "border-solid border-b-4 border-b-gray-300")} href={item.route} key={index} >{item.label}</Link>
                    )}
                />
            </ul>
        </aside>
    )
}

export default AsideMenu