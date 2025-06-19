"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import { Separator } from "@/components/ui/separator"
import { PaquetesFilters } from "@/components/paquetes/paquetes-filters"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import type { Producto } from "@/types/database"

// Función para mapear productos de la BD (español) al código (inglés) con valores seguros
const mapProductFromDB = (dbProduct: any): Producto => ({
  id: dbProduct.id || "",
  codigo: dbProduct.codigo || "",
  nombre: dbProduct.nombre || "Paquete sin nombre",
  descripcion: dbProduct.descripcion || "Sin descripción",
  tipo: dbProduct.tipo || "paquete",
  precio: Number(dbProduct.precio) || 0,
  precio_original: dbProduct.precio_oferta ? Number(dbProduct.precio_oferta) : null,
  stock: Number(dbProduct.stock) || 0,
  imagen_url: dbProduct.imagen_url || "/images/paquete-placeholder.png",
  destino: dbProduct.destino || "",
  duracion: dbProduct.duracion_dias ? `${dbProduct.duracion_dias} días` : "7 días",
  destacado: Boolean(dbProduct.destacado),
  disponible: Boolean(dbProduct.disponible !== false),
  created_at: dbProduct.created_at || new Date().toISOString(),
  updated_at: dbProduct.updated_at || new Date().toISOString(),
})

export default function PaquetesPage() {
  const [paquetes, setPaquetes] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPaquetes()
  }, [])

  const loadPaquetes = async () => {
    try {
      if (!isSupabaseAvailable) {
        console.log("Supabase no disponible")
        setPaquetes([])
        return
      }

      console.log("Cargando paquetes desde Supabase...")
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("tipo", "paquete")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error cargando paquetes:", error)
        setPaquetes([])
        return
      }

      console.log(`Paquetes cargados desde BD: ${data?.length || 0}`)
      const paquetesMapeados = (data || []).map(mapProductFromDB)
      setPaquetes(paquetesMapeados)
    } catch (error) {
      console.error("Error al cargar paquetes:", error)
      setPaquetes([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando paquetes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Paquetes Turísticos</h1>
      <p className="text-gray-600 mb-8">
        Descubre nuestros paquetes turísticos todo incluido para tus próximas vacaciones
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <PaquetesFilters />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Resultados</h2>
              <p className="text-sm text-gray-500">{paquetes.length} opciones encontradas</p>
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

          {paquetes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay paquetes disponibles</p>
              <p className="text-gray-400 mt-2">Intenta crear algunos paquetes desde el panel de administrador</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paquetes.map((paquete) => (
                <ProductCard key={paquete.id} product={paquete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
