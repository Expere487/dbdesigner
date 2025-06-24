import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.ComponentProps<"select"> {
  children: React.ReactNode
}

function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none",
        "focus:border-ring focus:ring-ring/50 focus:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

interface SelectOptionProps extends React.ComponentProps<"option"> {
  children: React.ReactNode
}

function SelectOption({ children, ...props }: SelectOptionProps) {
  return <option {...props}>{children}</option>
}

export { Select, SelectOption } 