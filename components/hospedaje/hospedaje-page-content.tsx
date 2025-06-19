"use client"

import { useState } from "react"
import { HospedajeFilters } from "./hospedaje-filters"
import { ProductCard } from "@/components/products/product-card"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types/database"

// Mock data para hospedajes
const mockHospedajes = [
  {
    id: "1",
    name: "Hotel Boutique Buenos Aires",
    description: "Elegante hotel boutique en el corazón de Palermo con spa y restaurante gourmet",
    type: "hotel",
    price: 15000,
    originalPrice: 18000,
    rating: 4.8,
    location: "Palermo, Buenos Aires",
    amenities: ["WiFi", "Spa", "Restaurante", "Gimnasio", "Piscina"],
    imageUrl: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: "2",
    name: "Resort Bariloche Vista Lago",
    description: "Resort de lujo con vista panorámica al lago Nahuel Huapi",
    type: "resort",
    price: 25000,
    originalPrice: null,
    rating: 4.9,
    location: "Bariloche, Río Negro",
    amenities: ["WiFi", "Spa", "Restaurante", "Ski", "Vista al Lago"],
    imageUrl: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: "3",
    name: "Hostel Backpackers Mendoza",
    description: "Hostel moderno y cómodo cerca de la zona vitivinícola",
    type: "hostel",
    price: 3500,
    originalPrice: 4000,
    rating: 4.2,
    location: "Mendoza, Mendoza",
    amenities: ["WiFi", "Cocina", "Lavandería", "Tours"],
    imageUrl: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: "4",
    name: "Cabaña Patagónica El Calafate",
    description: "Cabaña rústica con todas las comodidades cerca del glaciar Perito Moreno",
    type: "cabana",
    price: 12000,
    originalPrice: null,
    rating: 4.6,
    location: "El Calafate, Santa Cruz",
    amenities: ["WiFi", "Cocina", "Calefacción", "Estacionamiento"],
    imageUrl: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: "5",
    name: "Apart Hotel Córdoba Centro",
    description: "Apartamentos completamente equipados en el centro histórico",
    type: "apartamento",
    price: 8500,
    originalPrice: 10000,
    rating: 4.4,
    location: "Córdoba, Córdoba",
    amenities: ["WiFi", "Cocina", "Lavandería", "Estacionamiento"],
    imageUrl: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: "6",
    name: "Hotel Termal Termas de Río Hondo",
    description: "Hotel con aguas termales naturales y tratamientos de spa",
    type: "hotel",
    price: 18000,
    originalPrice: 22000,
    rating: 4.7,
    location: "Termas de Río Hondo, Santiago del Estero",
    amenities: ["WiFi", "Termas", "Spa", "Restaurante", "Piscina"],
    imageUrl: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
]

interface HospedajePageContentProps {
  hospedajes: Product[]
  title: string
  description: string
}

export function HospedajePageContent({ hospedajes: initialHospedajes, title, description }: HospedajePageContentProps) {
  const [hospedajes, setHospedajes] = useState(initialHospedajes)
  const [filteredHospedajes, setFilteredHospedajes] = useState(initialHospedajes)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: [0, 30000] as [number, number],
    rating: 0,
    amenities: [] as string[],
  })

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterHospedajes(term, filters)
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    filterHospedajes(searchTerm, newFilters)
  }

  const filterHospedajes = (term: string, currentFilters: typeof filters) => {
    let filtered = hospedajes

    // Filtrar por término de búsqueda
    if (term) {
      filtered = filtered.filter(
        (hospedaje) =>
          hospedaje.name.toLowerCase().includes(term.toLowerCase()) ||
          hospedaje.description.toLowerCase().includes(term.toLowerCase()) ||
          hospedaje.location.toLowerCase().includes(term.toLowerCase()),
      )
    }

    // Filtrar por tipo
    if (currentFilters.type !== "all") {
      filtered = filtered.filter((hospedaje) => hospedaje.type === currentFilters.type)
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(
      (hospedaje) => hospedaje.price >= currentFilters.priceRange[0] && hospedaje.price <= currentFilters.priceRange[1],
    )

    // Filtrar por rating
    if (currentFilters.rating > 0) {
      filtered = filtered.filter((hospedaje) => hospedaje.rating >= currentFilters.rating)
    }

    // Filtrar por amenidades
    if (currentFilters.amenities.length > 0) {
      filtered = filtered.filter((hospedaje) =>
        currentFilters.amenities.every((amenity) => hospedaje.amenities.includes(amenity)),
      )
    }

    setFilteredHospedajes(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="text-gray-600 mb-8">{description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <HospedajeFilters filters={filters} onFiltersChange={handleFiltersChange} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Resultados</h2>
              <p className="text-sm text-gray-500">{filteredHospedajes.length} opciones encontradas</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select className="border rounded p-1 text-sm">
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Mejor valorados</option>
              </select>
            </div>
          </div>

          <Separator className="mb-6" />

          {filteredHospedajes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay hospedajes disponibles</p>
              <p className="text-gray-400 mt-2">Intenta crear algunos hospedajes desde el panel de administrador</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospedajes.map((hospedaje) => (
                <ProductCard key={hospedaje.id} product={hospedaje} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
