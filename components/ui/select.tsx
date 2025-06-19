"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

export interface SelectContentProps {
  children: React.ReactNode
}

export interface SelectItemProps {
  value: string
  children: React.ReactNode
}

export interface SelectValueProps {
  placeholder?: string
}

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export function Select({ value, onValueChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ className, children }: SelectTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = React.useContext(SelectContext)

  return <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
}

export function SelectContent({ children }: SelectContentProps) {
  const { isOpen } = React.useContext(SelectContext)

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
      {children}
    </div>
  )
}

export function SelectItem({ value, children }: SelectItemProps) {
  const { onValueChange, setIsOpen } = React.useContext(SelectContext)

  const handleClick = () => {
    onValueChange?.(value)
    setIsOpen(false)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
    >
      {children}
    </button>
  )
}
