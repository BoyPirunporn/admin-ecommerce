'use client';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


const SwitchThemeMode = () => {
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <div className='ml-4'>
            <button
                onClick={toggleTheme}
                className={cn(
                    "pointer-events-auto relative w-14 h-7 rounded-xl shadow-inner bg-gray-200 flex items-center p-1 transition-all duration-300 ease-in-out cursor-pointer hover:border-amber-300 border",
                    theme === "dark" && "bg-muted"
                )}
            >
                <div
                    className={`w-6 h-6 bg-background rounded-full flex items-center justify-center shadow-md absolute transition-transform duration-500 ease-in-out ${theme === "dark" ? "translate-x-6" : "translate-x-0"
                        }`}
                >
                    {theme === "dark" ? (
                        <Moon className="w-4 h-4 text-white transition-transform duration-500 ease-in-out" />
                    ) : (
                        <Sun className="w-4 h-4 text-black transition-transform duration-500 ease-in-out" />
                    )}
                </div>

            </button>
        </div>
    );
};

export default SwitchThemeMode;