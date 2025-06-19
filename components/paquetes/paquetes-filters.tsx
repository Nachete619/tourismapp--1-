"use client"

import { useState } from "react"
import { Calendar, MapPin, Package, DollarSign, Users, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface PaquetesFiltersProps {
  onFilterChange: (filters: any) => void
}

export function PaquetesFilters({ onFilterChange }: PaquetesFiltersProps) {
  const [filters, setFilters] = useState({
    destination: "",
    departureDate: "",
    duration: "all",
    travelers: 2,
    priceRange: [0, 300000],
    category: "all",
    rating: 0,
    includes: [] as string[],
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const includesList = [
    "Vuelos incluidos",
    "Hotel incluido",
    "Desayuno incluido",
    "Cena incluida",
    "Tours incluidos",
    "Traslados incluidos",
    "Seguro de viaje",
    "Guía turístico",
  ]

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Contar filtros activos
    let count = 0
    if (newFilters.destination) count++
    if (newFilters.departureDate) count++
    if (newFilters.duration !== "all") count++
    if (newFilters.category !== "all") count++
    if (newFilters.rating > 0) count++
    if (newFilters.includes.length > 0) count++
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 300000) count++

    setActiveFiltersCount(count)
    onFilterChange(newFilters)
  }

  const updateIncludes = (include: string, checked: boolean) => {
    const newIncludes = checked ? [...filters.includes, include] : filters.includes.filter((i) => i !== include)
    updateFilter("includes", newIncludes)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      destination: "",
      departureDate: "",
      duration: "all",
      travelers: 2,
      priceRange: [0, 300000],
      category: "all",
      rating: 0,
      includes: [],
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
              <Package className="h-5 w-5" />
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

      {/* Destino */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#5FA8D3]" />
            Destino
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="¿A dónde quieres viajar?"
            value={filters.destination}
            onChange={(e) => updateFilter("destination", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Fecha de salida */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#5FA8D3]" />
            Fecha de salida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="date"
            value={filters.departureDate}
            onChange={(e) => updateFilter("departureDate", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Duración */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Duración</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.duration} onValueChange={(value) => updateFilter("duration", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier duración</SelectItem>
              <SelectItem value="weekend">Fin de semana (2-3 días)</SelectItem>
              <SelectItem value="week">1 semana (4-7 días)</SelectItem>
              <SelectItem value="extended">Extendido (8-14 días)</SelectItem>
              <SelectItem value="long">Largo (15+ días)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Viajeros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-[#5FA8D3]" />
            Viajeros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.travelers.toString()}
            onValueChange={(value) => updateFilter("travelers", Number.parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "viajero" : "viajeros"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Precio */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#5FA8D3]" />
            Precio por persona
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={300000}
              min={0}
              step={10000}
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
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="aventura">Aventura</SelectItem>
              <SelectItem value="playa">Playa</SelectItem>
              <SelectItem value="ciudad">Ciudad</SelectItem>
              <SelectItem value="naturaleza">Naturaleza</SelectItem>
              <SelectItem value="lujo">Lujo</SelectItem>
              <SelectItem value="familiar">Familiar</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Calificación */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-[#5FA8D3]" />
            Calificación mínima
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {[0, 3, 4, 4.5].map((rating) => (
              <Button
                key={rating}
                variant={filters.rating === rating ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("rating", rating)}
                className={
                  filters.rating === rating ? "bg-[#1B4965] text-white" : "border-gray-300 hover:border-[#5FA8D3]"
                }
              >
                {rating === 0 ? "Todas" : `${rating}+`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incluye */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Incluye</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {includesList.map((include) => (
              <div key={include} className="flex items-center space-x-2">
                <Checkbox
                  id={include}
                  checked={filters.includes.includes(include)}
                  onCheckedChange={(checked) => updateIncludes(include, checked as boolean)}
                />
                <Label htmlFor={include} className="text-sm cursor-pointer">
                  {include}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
