"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Plane, Package, Car } from "lucide-react"

interface ProductFiltersProps {
  selectedType: string
  onTypeChange: (type: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function ProductFilters({ selectedType, onTypeChange, priceRange, onPriceRangeChange }: ProductFiltersProps) {
  const productTypes = [
    { value: "all", label: "Todos los productos", icon: null },
    { value: "vuelo", label: "Vuelos", icon: Plane },
    { value: "paquete", label: "Paquetes", icon: Package },
    { value: "auto", label: "Autos", icon: Car },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-[#1B4965]">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Type Filter */}
        <div>
          <Label className="text-base font-medium mb-3 block">Tipo de Producto</Label>
          <RadioGroup value={selectedType} onValueChange={onTypeChange}>
            {productTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem value={type.value} id={type.value} />
                <Label htmlFor={type.value} className="flex items-center cursor-pointer">
                  {type.icon && <type.icon className="h-4 w-4 mr-2 text-[#5FA8D3]" />}
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Rango de Precio: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            max={200000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>$0</span>
            <span>$200,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
