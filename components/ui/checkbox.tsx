"use client"

import type * as React from "react"
import { Check } from "lucide-react"

export interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

export function Checkbox({ id, checked, onCheckedChange, className }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked)
  }

  return (
    <div className="relative">
      <input id={id} type="checkbox" checked={checked} onChange={handleChange} className="sr-only" />
      <div
        className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center cursor-pointer transition-colors ${
          checked ? "bg-[#1B4965] border-[#1B4965]" : "bg-white hover:border-gray-400"
        } ${className}`}
        onClick={() => onCheckedChange?.(!checked)}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
    </div>
  )
}
