"use client"

import * as React from "react"

export interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max: number
  min: number
  step: number
  className?: string
}

export function Slider({ value, onValueChange, max, min, step, className }: SliderProps) {
  const [isDragging, setIsDragging] = React.useState<number | null>(null)
  const sliderRef = React.useRef<HTMLDivElement>(null)

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(index)
  }

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (isDragging === null || !sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const newValue = min + percentage * (max - min)
      const steppedValue = Math.round(newValue / step) * step

      const newValues = [...value]
      newValues[isDragging] = Math.max(min, Math.min(max, steppedValue))

      // Ensure min <= max
      if (newValues.length === 2) {
        if (isDragging === 0 && newValues[0] > newValues[1]) {
          newValues[1] = newValues[0]
        } else if (isDragging === 1 && newValues[1] < newValues[0]) {
          newValues[0] = newValues[1]
        }
      }

      onValueChange(newValues)
    },
    [isDragging, value, min, max, step, onValueChange],
  )

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(null)
  }, [])

  React.useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

  return (
    <div className={`relative w-full ${className}`}>
      <div ref={sliderRef} className="relative h-2 bg-gray-200 rounded-full cursor-pointer">
        {/* Track between thumbs */}
        {value.length === 2 && (
          <div
            className="absolute h-2 bg-[#1B4965] rounded-full"
            style={{
              left: `${getPercentage(value[0])}%`,
              width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
            }}
          />
        )}

        {/* Thumbs */}
        {value.map((val, index) => (
          <div
            key={index}
            className="absolute w-5 h-5 bg-[#1B4965] rounded-full border-2 border-white shadow-md cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{ left: `${getPercentage(val)}%` }}
            onMouseDown={handleMouseDown(index)}
          />
        ))}
      </div>
    </div>
  )
}
