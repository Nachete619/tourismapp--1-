"use client"

import { useState } from "react"
import { Calendar, MapPin, Car, DollarSign, Fuel } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface AutosFiltersProps {
  onFilterChange: (filters: any) => void
}

export function AutosFilters({ onFilterChange }: AutosFiltersProps) {
  const [filters, setFilters] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    priceRange: [0, 15000],
    category: "all",
    transmission: "all",
    fuel: "all",
    features: [] as string[],
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const featuresList = [
    "Aire acondicionado",
    "GPS",
    "Bluetooth",
    "USB",
    "Asientos de cuero",
    "Techo solar",
    "Cámara de reversa",
    "Sensor de estacionamiento",
  ]

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Contar filtros activos
    let count = 0
    if (newFilters.pickupLocation) count++
    if (newFilters.dropoffLocation) count++
    if (newFilters.pickupDate) count++
    if (newFilters.dropoffDate) count++
    if (newFilters.category !== "all") count++
    if (newFilters.transmission !== "all") count++
    if (newFilters.fuel !== "all") count++
    if (newFilters.features.length > 0) count++
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 15000) count++

    setActiveFiltersCount(count)
    onFilterChange(newFilters)
  }

  const updateFeatures = (feature: string, checked: boolean) => {
    const newFeatures = checked ? [...filters.features, feature] : filters.features.filter((f) => f !== feature)
    updateFilter("features", newFeatures)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      dropoffDate: "",
      priceRange: [0, 15000],
      category: "all",
      transmission: "all",
      fuel: "all",
      features: [],
    }
    setFilters(clearedFilters)
    setActiveFiltersCount(0)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="space-y-6">
      {/* Header de filtros */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-[#1B4965] flex items-center gap-2">
              <Car className="h-5 w-5" />
              Filtros de búsqueda
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </CardTitle>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-[#5FA8D3] hover:text-[#1B4965]"
              >
                Limpiar todo
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Ubicaciones */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#5FA8D3]" />
            Ubicaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pickup" className="text-sm font-medium">
              Lugar de recogida
            </Label>
            <Input
              id="pickup"
              placeholder="¿Dónde recoges el auto?"
              value={filters.pickupLocation}
              onChange={(e) => updateFilter("pickupLocation", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dropoff" className="text-sm font-medium">
              Lugar de devolución
            </Label>
            <Input
              id="dropoff"
              placeholder="¿Dónde devuelves el auto?"
              value={filters.dropoffLocation}
              onChange={(e) => updateFilter("dropoffLocation", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fechas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#5FA8D3]" />
            Fechas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pickupdate" className="text-sm font-medium">
              Fecha de recogida
            </Label>
            <Input
              id="pickupdate"
              type="date"
              value={filters.pickupDate}
              onChange={(e) => updateFilter("pickupDate", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dropoffdate" className="text-sm font-medium">
              Fecha de devolución
            </Label>
            <Input
              id="dropoffdate"
              type="date"
              value={filters.dropoffDate}
              onChange={(e) => updateFilter("dropoffDate", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Precio */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#5FA8D3]" />
            Precio por día
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={15000}
              min={0}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categoría */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="economico">Económico</SelectItem>
              <SelectItem value="compacto">Compacto</SelectItem>
              <SelectItem value="intermedio">Intermedio</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="lujo">Lujo</SelectItem>
              <SelectItem value="familiar">Familiar</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Transmisión */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Transmisión</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.transmission} onValueChange={(value) => updateFilter("transmission", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier transmisión</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="automatica">Automática</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Combustible */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Fuel className="h-4 w-4 text-[#5FA8D3]" />
            Combustible
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.fuel} onValueChange={(value) => updateFilter("fuel", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier combustible</SelectItem>
              <SelectItem value="nafta">Nafta</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="hibrido">Híbrido</SelectItem>
              <SelectItem value="electrico">Eléctrico</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Características */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Características</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {featuresList.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={(checked) => updateFeatures(feature, checked as boolean)}
                />
                <Label htmlFor={feature} className="text-sm cursor-pointer">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
