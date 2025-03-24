'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Link from 'next/link'
import React from 'react'
import { Moon, Sun } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';


const Navbar = () => {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <nav className="border-grid sticky top-0 z-50 w-full items-center flex h-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-row items-center container">
                <div className="block md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="ml-auto">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "pointer-events-auto relative w-14 h-7 rounded-xl shadow-inner bg-gray-200 flex items-center p-1 transition-all duration-300 ease-in-out cursor-pointer hover:border-amber-300 border",
                            theme === "dark" && "bg-muted"
                        )}
                    >
                        <div
                            style={{
                                willChange: "transform"
                            }}
                            className={`w-6 h-6 bg-background rounded-full flex items-center justify-center shadow-md absolute transition-transform duration-500 ease-in-out ${theme === "dark" ? "top-[1px] left-7 shadow-inner" : "top-[1px] left-1"
                                }`}
                        >
                            <span className='pointer-events-auto transition-transform duration-500 ease-in-out'>
                                {theme === "dark" ? (
                                    <Moon className="w-4 h-4 text-white transition-transform duration-500 ease-in-out" />
                                ) : (
                                    <Sun className="w-4 h-4 text-black transition-transform duration-500 ease-in-out" />
                                )}
                            </span>
                        </div>
                    </button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar