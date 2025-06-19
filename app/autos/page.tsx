"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import { Separator } from "@/components/ui/separator"
import { AutosFilters } from "@/components/autos/autos-filters"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import type { Producto } from "@/types/database"

// Función para mapear productos de la BD (español) al código (inglés) con valores seguros
const mapProductFromDB = (dbProduct: any): Producto => ({
  id: dbProduct.id || "",
  codigo: dbProduct.codigo || "",
  nombre: dbProduct.nombre || "Auto sin nombre",
  descripcion: dbProduct.descripcion || "Sin descripción",
  tipo: dbProduct.tipo || "auto",
  precio: Number(dbProduct.precio) || 0,
  precio_original: dbProduct.precio_oferta ? Number(dbProduct.precio_oferta) : null,
  stock: Number(dbProduct.stock) || 0,
  imagen_url: dbProduct.imagen_url || "/images/auto-placeholder.png",
  destino: dbProduct.destino || "",
  duracion: "Por día",
  destacado: Boolean(dbProduct.destacado),
  disponible: Boolean(dbProduct.disponible !== false),
  created_at: dbProduct.created_at || new Date().toISOString(),
  updated_at: dbProduct.updated_at || new Date().toISOString(),
})

export default function AutosPage() {
  const [autos, setAutos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAutos()
  }, [])

  const loadAutos = async () => {
    try {
      if (!isSupabaseAvailable) {
        console.log("Supabase no disponible")
        setAutos([])
        return
      }

      console.log("Cargando autos desde Supabase...")
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("tipo", "auto")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error cargando autos:", error)
        setAutos([])
        return
      }

      console.log(`Autos cargados desde BD: ${data?.length || 0}`)
      const autosMapeados = (data || []).map(mapProductFromDB)
      setAutos(autosMapeados)
    } catch (error) {
      console.error("Error al cargar autos:", error)
      setAutos([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando autos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Alquiler de Autos</h1>
      <p className="text-gray-600 mb-8">Encuentra los mejores autos para alquilar en tu próximo viaje</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <AutosFilters />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Resultados</h2>
              <p className="text-sm text-gray-500">{autos.length} opciones encontradas</p>
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

          {autos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay autos disponibles</p>
              <p className="text-gray-400 mt-2">Intenta crear algunos autos desde el panel de administrador</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {autos.map((auto) => (
                <ProductCard key={auto.id} product={auto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
