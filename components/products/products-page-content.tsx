"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/database"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import { GlobalSearch } from "@/components/search/global-search"
import { AdvancedFilters } from "@/components/filters/advanced-filters"

interface ProductsPageContentProps {
  title: string
  description: string
  filterType?: string
}

export function ProductsPageContent({ title, description, filterType }: ProductsPageContentProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>(filterType || "all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedType, priceRange])

  const fetchProducts = async () => {
    try {
      if (!isSupabaseAvailable) {
        const mockProducts = getMockProducts()
        setProducts(mockProducts)
        return
      }

      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts(getMockProducts())
    } finally {
      setLoading(false)
    }
  }

  const getMockProducts = () => [
    {
      id: "1",
      code: "VUE001",
      name: "Vuelo Buenos Aires - Madrid",
      description: "Vuelo directo con Iberia, clase económica",
      type: "vuelo",
      price: 85000,
      original_price: 95000,
      stock: 50,
      image_url: "/placeholder.svg?height=200&width=300",
      destination: "Madrid, España",
      duration: "12 horas",
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      code: "VUE002",
      name: "Vuelo Buenos Aires - París",
      description: "Vuelo con escala, Air France",
      type: "vuelo",
      price: 92000,
      original_price: null,
      stock: 30,
      image_url: "/placeholder.svg?height=200&width=300",
      destination: "París, Francia",
      duration: "14 horas",
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      code: "PAQ001",
      name: "Paquete Europa Clásica",
      description: "Madrid, París, Roma - 15 días con vuelos, hoteles y desayunos",
      type: "paquete",
      price: 180000,
      original_price: 200000,
      stock: 15,
      image_url: "/placeholder.svg?height=200&width=300",
      destination: "Europa",
      duration: "15 días",
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      code: "PAQ002",
      name: "Paquete Caribe Todo Incluido",
      description: "Cancún 7 días, resort 5 estrellas",
      type: "paquete",
      price: 120000,
      original_price: null,
      stock: 20,
      image_url: "/placeholder.svg?height=200&width=300",
      destination: "Cancún, México",
      duration: "7 días",
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      code: "AUT001",
      name: "Alquiler Auto Económico",
      description: "Chevrolet Onix o similar, por día",
      type: "auto",
      price: 3500,
      original_price: null,
      stock: 100,
      image_url: "/placeholder.svg?height=200&width=300",
      destination: "Buenos Aires",
      duration: "Por día",
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "6",
      code: "AUT002",
      name: "Alquiler Auto Intermedio",
      description: "Toyota Corolla o similar, por día",
      type: "auto",
      price: 4500,
      original_price: 5000,
      stock: 80,
      image_url: "/placeholder.svg?height=200&width=300",
      destination: "Buenos Aires",
      duration: "Por día",
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const filterProducts = () => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.destination?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((product) => product.type === selectedType)
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B4965] mb-4">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-6">
        <GlobalSearch
          onSearch={(term, filters) => {
            setSearchTerm(term)
            if (filters.category && filters.category !== "all") {
              setSelectedType(filters.category)
            }
            if (filters.priceRange) {
              setPriceRange(filters.priceRange)
            }
          }}
          placeholder="Buscar productos, destinos, ofertas..."
          categories={[
            { value: "all", label: "Todos los productos" },
            { value: "vuelo", label: "Vuelos" },
            { value: "paquete", label: "Paquetes" },
            { value: "auto", label: "Autos" },
          ]}
        />

        <AdvancedFilters
          filters={{
            category: selectedType,
            priceRange: priceRange,
            sortBy: "featured",
            availability: "all",
          }}
          onFiltersChange={(newFilters) => {
            setSelectedType(newFilters.category)
            setPriceRange(newFilters.priceRange)
          }}
          categories={[
            { value: "all", label: "Todos los productos" },
            { value: "vuelo", label: "Vuelos" },
            { value: "paquete", label: "Paquetes" },
            { value: "auto", label: "Autos" },
          ]}
        />
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedType(filterType || "all")
              setPriceRange([0, 200000])
            }}
            className="mt-4 bg-[#1B4965] hover:bg-[#5FA8D3] text-white"
          >
            Limpiar Filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
