"use client"

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import type { Product } from "@/types/database"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
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
      // Check if Supabase is configured
      if (!isSupabaseAvailable) {
        console.warn("Supabase not configured, using mock data")
        const mockProducts = [
          {
            id: "1",
            codigo: "VUE001",
            nombre: "Vuelo Buenos Aires - Madrid",
            descripcion: "Vuelo directo con Iberia, clase económica",
            tipo: "vuelo",
            precio: 85000,
            precio_oferta: 95000,
            stock: 50,
            imagen_url: "/placeholder.svg?height=200&width=300",
            destino: "Madrid, España",
            duracion_dias: "12 horas",
            disponible: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            codigo: "VUE002",
            nombre: "Vuelo Buenos Aires - París",
            descripcion: "Vuelo con escala, Air France",
            tipo: "vuelo",
            precio: 92000,
            precio_oferta: null,
            stock: 30,
            imagen_url: "/placeholder.svg?height=200&width=300",
            destino: "París, Francia",
            duracion_dias: "14 horas",
            disponible: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "3",
            codigo: "PAQ001",
            nombre: "Paquete Europa Clásica",
            descripcion: "Madrid, París, Roma - 15 días con vuelos, hoteles y desayunos",
            tipo: "paquete",
            precio: 180000,
            precio_oferta: 200000,
            stock: 15,
            imagen_url: "/placeholder.svg?height=200&width=300",
            destino: "Europa",
            duracion_dias: "15 días",
            disponible: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "4",
            codigo: "PAQ002",
            nombre: "Paquete Caribe Todo Incluido",
            descripcion: "Cancún 7 días, resort 5 estrellas",
            tipo: "paquete",
            precio: 120000,
            precio_oferta: null,
            stock: 20,
            imagen_url: "/placeholder.svg?height=200&width=300",
            destino: "Cancún, México",
            duracion_dias: "7 días",
            disponible: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "5",
            codigo: "AUT001",
            nombre: "Alquiler Auto Económico",
            descripcion: "Chevrolet Onix o similar, por día",
            tipo: "auto",
            precio: 3500,
            precio_oferta: null,
            stock: 100,
            imagen_url: "/placeholder.svg?height=200&width=300",
            destino: "Buenos Aires",
            duracion_dias: "Por día",
            disponible: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "6",
            codigo: "AUT002",
            nombre: "Alquiler Auto Intermedio",
            descripcion: "Toyota Corolla o similar, por día",
            tipo: "auto",
            precio: 4500,
            precio_oferta: 5000,
            stock: 80,
            imagen_url: "/placeholder.svg?height=200&width=300",
            destino: "Buenos Aires",
            duracion_dias: "Por día",
            disponible: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
        setLoading(false)
        return
      }

      const { data, error } = await supabase.from("productos").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
      setFilteredProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.destino?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((product) => product.tipo === selectedType)
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.precio >= priceRange[0] && product.precio <= priceRange[1])

    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965] mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B4965] mb-4">Todos los Productos</h1>
          <p className="text-gray-600">Descubre nuestras mejores ofertas en vuelos, paquetes y alquiler de autos</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos, destinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965] hover:text-white"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <ProductFilters
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          )}
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
                setSelectedType("all")
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
    </MainLayout>
  )
}
