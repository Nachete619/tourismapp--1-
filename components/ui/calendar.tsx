"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  initialFocus?: boolean
  className?: string
}

export function Calendar({ mode = "single", selected, onSelect, initialFocus, className, ...props }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day)
    onSelect?.(selectedDate)
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    const date = new Date(year, month, day)
    return date.toDateString() === selected.toDateString()
  }

  const isToday = (day: number) => {
    const date = new Date(year, month, day)
    return date.toDateString() === today.toDateString()
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`p-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${
            isSelected(day)
              ? "bg-[#1B4965] text-white hover:bg-[#5FA8D3]"
              : isToday(day)
                ? "bg-blue-100 text-blue-900"
                : "text-gray-900"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className={`p-4 bg-white border rounded-lg shadow-lg ${className}`} {...props}>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={goToPreviousMonth} className="p-1 h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {monthNames[month]} {year}
        </h2>
        <Button variant="outline" size="sm" onClick={goToNextMonth} className="p-1 h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-xs font-medium text-gray-500 text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  )
}
