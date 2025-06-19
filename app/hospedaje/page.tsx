"use client"

import { useEffect, useState } from "react"
import { HospedajeFilters } from "@/components/hospedaje/hospedaje-filters"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import { Separator } from "@/components/ui/separator"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import type { Producto } from "@/types/database"

// Función para mapear productos de la BD (español) al código (inglés) con valores seguros
const mapProductFromDB = (dbProduct: any): Producto => ({
  id: dbProduct.id || "",
  codigo: dbProduct.codigo || "",
  nombre: dbProduct.nombre || "Hospedaje sin nombre",
  descripcion: dbProduct.descripcion || "Sin descripción",
  tipo: dbProduct.tipo || "hospedaje",
  precio: Number(dbProduct.precio) || 0,
  precio_original: dbProduct.precio_oferta ? Number(dbProduct.precio_oferta) : null,
  stock: Number(dbProduct.stock) || 0,
  imagen_url: dbProduct.imagen_url || "/images/hospedaje-placeholder.png",
  destino: dbProduct.destino || "",
  duracion: "Por noche",
  destacado: Boolean(dbProduct.destacado),
  disponible: Boolean(dbProduct.disponible !== false),
  created_at: dbProduct.created_at || new Date().toISOString(),
  updated_at: dbProduct.updated_at || new Date().toISOString(),
})

export default function HospedajePage() {
  const [hospedajes, setHospedajes] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHospedajes()
  }, [])

  const loadHospedajes = async () => {
    try {
      if (!isSupabaseAvailable) {
        console.log("Supabase no disponible")
        setHospedajes([])
        return
      }

      console.log("Cargando hospedajes desde Supabase...")
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("tipo", "hospedaje")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error cargando hospedajes:", error)
        setHospedajes([])
        return
      }

      console.log(`Hospedajes cargados desde BD: ${data?.length || 0}`)
      const hospedajesMapeados = (data || []).map(mapProductFromDB)
      setHospedajes(hospedajesMapeados)
    } catch (error) {
      console.error("Error al cargar hospedajes:", error)
      setHospedajes([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando hospedajes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hospedaje</h1>
      <p className="text-gray-600 mb-8">Encuentra los mejores hoteles, apartamentos y alojamientos para tu viaje</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <HospedajeFilters />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Resultados</h2>
              <p className="text-sm text-gray-500">{hospedajes.length} opciones encontradas</p>
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

          {hospedajes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay hospedajes disponibles</p>
              <p className="text-gray-400 mt-2">Intenta crear algunos hospedajes desde el panel de administrador</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospedajes.map((hospedaje) => (
                <ProductCard key={hospedaje.id} product={hospedaje} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
