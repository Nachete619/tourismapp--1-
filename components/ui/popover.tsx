"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export interface PopoverProps {
  children: React.ReactNode
}

export interface PopoverTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export interface PopoverContentProps {
  className?: string
  children: React.ReactNode
}

export function Popover({ children }: PopoverProps) {
  return <div className="relative inline-block">{children}</div>
}

export function PopoverTrigger({ asChild, children }: PopoverTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    })
  }

  return <Button onClick={handleClick}>{children}</Button>
}

export function PopoverContent({ className, children }: PopoverContentProps) {
  return <div className={`absolute top-full left-0 z-50 mt-2 ${className}`}>{children}</div>
}
