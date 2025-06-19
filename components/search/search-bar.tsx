"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

export function SearchBar() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()

  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date)
    setCheckInOpen(false)
    if (date && checkOut && date >= checkOut) {
      setCheckOut(undefined)
    }
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date)
    setCheckOutOpen(false)
  }

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Check-in Date */}
        <div className="flex-1">
          <Label htmlFor="checkin" className="text-sm font-medium text-gray-700">
            Fecha de entrada
          </Label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={handleCheckInSelect}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="flex-1">
          <Label htmlFor="checkout" className="text-sm font-medium text-gray-700">
            Fecha de salida
          </Label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={handleCheckOutSelect}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
