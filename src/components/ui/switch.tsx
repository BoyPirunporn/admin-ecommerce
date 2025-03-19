"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  console.log(props)
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        "focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80",
        "inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs",
        "transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        data-lucide="a-arrow-up"
        className={cn(
          "flex items-center justify-center w-6 h-6  text-foreground",
          "pointer-events-none rounded-full ring-0 transition-transform",
          "data-[state=checked]:translate-x-[calc(100%-1px)] data-[state=unchecked]:translate-x-0"
        )}
      >
        {props.value === "dark" ? (
          <Moon className="w-4 h-4 data-[state=checked]:block" />
        ) : (
          <Sun className="w-4 h-4 data-[state=unchecked]:block" />
        )}

      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
