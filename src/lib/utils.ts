import { clsx, type ClassValue } from "clsx"
import { Children } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const EachElement = <T,>({ of, render }: { of: T[], render: (item: T, index: number) => React.ReactNode }) => Children.toArray(of.map(render));

export const delay = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

