"use client"

import { useState } from "react"
import { Calendar, MapPin, Plane, DollarSign, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface VuelosFiltersProps {
  onFilterChange: (filters: any) => void
}

export function VuelosFilters({ onFilterChange }: VuelosFiltersProps) {
  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    class: "economy",
    priceRange: [0, 150000],
    stops: "all",
    airline: "all",
    departureTime: "all",
    duration: "all",
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Contar filtros activos
    let count = 0
    if (newFilters.origin) count++
    if (newFilters.destination) count++
    if (newFilters.departureDate) count++
    if (newFilters.returnDate) count++
    if (newFilters.stops !== "all") count++
    if (newFilters.airline !== "all") count++
    if (newFilters.departureTime !== "all") count++
    if (newFilters.duration !== "all") count++
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 150000) count++

    setActiveFiltersCount(count)
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      origin: "",
      destination: "",
      departureDate: "",
      returnDate: "",
      passengers: 1,
      class: "economy",
      priceRange: [0, 150000],
      stops: "all",
      airline: "all",
      departureTime: "all",
      duration: "all",
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
              <Plane className="h-5 w-5" />
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

      {/* Destinos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#5FA8D3]" />
            Destinos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="origin" className="text-sm font-medium">
              Origen
            </Label>
            <Input
              id="origin"
              placeholder="¿Desde dónde viajas?"
              value={filters.origin}
              onChange={(e) => updateFilter("origin", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="destination" className="text-sm font-medium">
              Destino
            </Label>
            <Input
              id="destination"
              placeholder="¿A dónde quieres ir?"
              value={filters.destination}
              onChange={(e) => updateFilter("destination", e.target.value)}
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
            <Label htmlFor="departure" className="text-sm font-medium">
              Ida
            </Label>
            <Input
              id="departure"
              type="date"
              value={filters.departureDate}
              onChange={(e) => updateFilter("departureDate", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="return" className="text-sm font-medium">
              Vuelta (opcional)
            </Label>
            <Input
              id="return"
              type="date"
              value={filters.returnDate}
              onChange={(e) => updateFilter("returnDate", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pasajeros y Clase */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-[#5FA8D3]" />
            Pasajeros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Cantidad de pasajeros</Label>
            <Select
              value={filters.passengers.toString()}
              onValueChange={(value) => updateFilter("passengers", Number.parseInt(value))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "pasajero" : "pasajeros"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Clase</Label>
            <Select value={filters.class} onValueChange={(value) => updateFilter("class", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Económica</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="business">Ejecutiva</SelectItem>
                <SelectItem value="first">Primera</SelectItem>
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
            Rango de precio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={150000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escalas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Escalas</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.stops} onValueChange={(value) => updateFilter("stops", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las opciones</SelectItem>
              <SelectItem value="direct">Vuelos directos</SelectItem>
              <SelectItem value="1-stop">1 escala</SelectItem>
              <SelectItem value="2-stops">2+ escalas</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Aerolínea */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Aerolínea</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.airline} onValueChange={(value) => updateFilter("airline", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las aerolíneas</SelectItem>
              <SelectItem value="aerolineas">Aerolíneas Argentinas</SelectItem>
              <SelectItem value="latam">LATAM</SelectItem>
              <SelectItem value="airfrance">Air France</SelectItem>
              <SelectItem value="lufthansa">Lufthansa</SelectItem>
              <SelectItem value="iberia">Iberia</SelectItem>
              <SelectItem value="alitalia">Alitalia</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Horario de salida */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#5FA8D3]" />
            Horario de salida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.departureTime} onValueChange={(value) => updateFilter("departureTime", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier horario</SelectItem>
              <SelectItem value="morning">Mañana (06:00 - 12:00)</SelectItem>
              <SelectItem value="afternoon">Tarde (12:00 - 18:00)</SelectItem>
              <SelectItem value="evening">Noche (18:00 - 24:00)</SelectItem>
              <SelectItem value="night">Madrugada (00:00 - 06:00)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Duración */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Duración del vuelo</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.duration} onValueChange={(value) => updateFilter("duration", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier duración</SelectItem>
              <SelectItem value="short">Corto (menos de 6h)</SelectItem>
              <SelectItem value="medium">Medio (6h - 12h)</SelectItem>
              <SelectItem value="long">Largo (más de 12h)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
