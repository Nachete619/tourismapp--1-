"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/types/database"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import { Package } from "lucide-react"

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        // Check if Supabase is configured
        if (!isSupabaseAvailable) {
          console.warn("Supabase not configured, using mock data")
          setProducts(getMockProducts())
          return
        }

        const { data, error } = await supabase.from("products").select("*").eq("featured", true).limit(6)

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching featured products:", error)
        // Fallback to mock data
        setProducts(getMockProducts())
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Add mock data function
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
      id: "3",
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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1B4965] mb-4">Productos Destacados</h2>
            <p className="text-gray-600">Descubre nuestras mejores ofertas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-4 animate-in fade-in slide-in-from-bottom duration-1000">
            Productos Destacados
          </h2>
          <p className="text-gray-600 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            Descubre nuestras mejores ofertas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
          <Button
            asChild
            size="lg"
            className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <Link href="/productos">
              <Package className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Ver Todos los Productos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
