import { clsx, type ClassValue } from "clsx";
import { Children } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const EachElement = <T,>({ of, render }: { of: T[], render: (item: T, index: number) => React.ReactNode; }) => Children.toArray(of.map(render));

export const delay = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

export const formatPrice = (price: number, currency: "USD" | "THB" = "USD") => {
  const format = switchCurrency(currency);
  return new Intl.NumberFormat(format, {
    style: "currency",
    currency,
  }).format(price);
};


const switchCurrency = (currency: "USD" | "THB") => {
  switch (currency) {
    case "USD":
      return "en-US";
    case "THB":
      return "th-TH";
  }
};