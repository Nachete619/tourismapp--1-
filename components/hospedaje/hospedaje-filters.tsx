"use client"

import { useState } from "react"
import { Calendar, MapPin, Building, DollarSign, Star, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface HospedajeFiltersProps {
  onFilterChange: (filters: any) => void
}

export function HospedajeFilters({ onFilterChange }: HospedajeFiltersProps) {
  const [filters, setFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    priceRange: [0, 50000],
    type: "all",
    rating: 0,
    amenities: [] as string[],
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const amenitiesList = [
    "WiFi",
    "Piscina",
    "Spa",
    "Gimnasio",
    "Restaurante",
    "Estacionamiento",
    "Desayuno incluido",
    "Aire acondicionado",
    "Vista al mar",
    "Cocina",
  ]

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Contar filtros activos
    let count = 0
    if (newFilters.destination) count++
    if (newFilters.checkIn) count++
    if (newFilters.checkOut) count++
    if (newFilters.type !== "all") count++
    if (newFilters.rating > 0) count++
    if (newFilters.amenities.length > 0) count++
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 50000) count++

    setActiveFiltersCount(count)
    onFilterChange(newFilters)
  }

  const updateAmenities = (amenity: string, checked: boolean) => {
    const newAmenities = checked ? [...filters.amenities, amenity] : filters.amenities.filter((a) => a !== amenity)
    updateFilter("amenities", newAmenities)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      rooms: 1,
      priceRange: [0, 50000],
      type: "all",
      rating: 0,
      amenities: [],
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
              <Building className="h-5 w-5" />
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
            placeholder="¿A dónde quieres ir?"
            value={filters.destination}
            onChange={(e) => updateFilter("destination", e.target.value)}
          />
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
            <Label htmlFor="checkin" className="text-sm font-medium">
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={filters.checkIn}
              onChange={(e) => updateFilter("checkIn", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="checkout" className="text-sm font-medium">
              Check-out
            </Label>
            <Input
              id="checkout"
              type="date"
              value={filters.checkOut}
              onChange={(e) => updateFilter("checkOut", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Huéspedes y Habitaciones */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-[#5FA8D3]" />
            Huéspedes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Huéspedes</Label>
            <Select
              value={filters.guests.toString()}
              onValueChange={(value) => updateFilter("guests", Number.parseInt(value))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "huésped" : "huéspedes"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Habitaciones</Label>
            <Select
              value={filters.rooms.toString()}
              onValueChange={(value) => updateFilter("rooms", Number.parseInt(value))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "habitación" : "habitaciones"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Precio */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#5FA8D3]" />
            Precio por noche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={50000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipo de alojamiento */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Tipo de alojamiento</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="resort">Resort</SelectItem>
              <SelectItem value="hostel">Hostel</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="cabana">Cabaña</SelectItem>
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

      {/* Amenidades */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Amenidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => updateAmenities(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
