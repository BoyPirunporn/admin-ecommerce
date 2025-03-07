'use client';

import EachElement from '@/lib/EachElement'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const routes = [
    { route: "/", label: "Product" },
    { route: "/category", label: "Category" },
    { route: "/variant-product", label: "Product variant" },
    { route: "#", label: "Product image variant" },
]
const AsideMenu = (props: Props) => {
    const pathname = usePathname()
    return (
        <aside className="border border-dashed border-r border-l  fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block pt-10">
            <ul className="flex flex-col gap-4 py-10 pl-2">
                <EachElement
                    of={routes}
                    render={(item, index) => (
                        <Link className={cn("hover:bg-gray-300 cursor-pointer transition-all duration-300 border border-dashed px-5 py-3 rounded-l-xl ", pathname === item.route && "bg-gray-300")} href={item.route} key={index} >{item.label}</Link>
                    )}
                />
            </ul>
        </aside>
    )
}

export default AsideMenu