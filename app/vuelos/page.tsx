"use client"

import { useEffect, useState } from "react"
import { VuelosFilters } from "@/components/vuelos/vuelos-filters"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import { Separator } from "@/components/ui/separator"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import type { Producto } from "@/types/database"

// Función para mapear productos de la BD (español) al código (inglés) con valores seguros
const mapProductFromDB = (dbProduct: any): Producto => ({
  id: dbProduct.id || "",
  codigo: dbProduct.codigo || "",
  nombre: dbProduct.nombre || "Producto sin nombre",
  descripcion: dbProduct.descripcion || "Sin descripción",
  tipo: dbProduct.tipo || "vuelo",
  precio: Number(dbProduct.precio) || 0,
  precio_original: dbProduct.precio_oferta ? Number(dbProduct.precio_oferta) : null,
  stock: Number(dbProduct.stock) || 0,
  imagen_url: dbProduct.imagen_url || "/images/vuelo-placeholder.png",
  destino: dbProduct.destino || "",
  duracion: dbProduct.duracion_dias ? `${dbProduct.duracion_dias} días` : "12h 30m",
  destacado: Boolean(dbProduct.destacado),
  disponible: Boolean(dbProduct.disponible !== false), // true por defecto
  created_at: dbProduct.created_at || new Date().toISOString(),
  updated_at: dbProduct.updated_at || new Date().toISOString(),
})

export default function VuelosPage() {
  const [vuelos, setVuelos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVuelos()
  }, [])

  const loadVuelos = async () => {
    try {
      if (!isSupabaseAvailable) {
        console.log("Supabase no disponible, usando datos mock")
        setVuelos(getMockVuelos())
        return
      }

      console.log("Cargando vuelos desde Supabase...")
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("tipo", "vuelo")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error cargando vuelos:", error)
        setVuelos(getMockVuelos())
        return
      }

      console.log(`Vuelos cargados desde BD: ${data?.length || 0}`)
      const vuelosMapeados = (data || []).map(mapProductFromDB)
      setVuelos(vuelosMapeados)
    } catch (error) {
      console.error("Error al cargar vuelos:", error)
      setVuelos(getMockVuelos())
    } finally {
      setLoading(false)
    }
  }

  const getMockVuelos = (): Producto[] => [
    {
      id: "v1",
      codigo: "VUE001",
      nombre: "Buenos Aires - Madrid",
      descripcion: "Vuelo directo con Aerolíneas Argentinas. Incluye equipaje de mano y facturado.",
      precio: 350000,
      precio_original: 420000,
      stock: 15,
      tipo: "vuelo",
      destacado: true,
      destino: "Madrid",
      duracion: "12h 30m",
      imagen_url: "/images/vuelos/buenos-aires-madrid.png",
      disponible: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "v2",
      codigo: "VUE002",
      nombre: "Buenos Aires - París",
      descripcion: "Vuelo con escala en Madrid. Incluye equipaje de mano y facturado.",
      precio: 380000,
      precio_original: 450000,
      stock: 8,
      tipo: "vuelo",
      destacado: false,
      destino: "París",
      duracion: "14h 45m",
      imagen_url: "/images/vuelos/buenos-aires-paris.png",
      disponible: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "v3",
      codigo: "VUE003",
      nombre: "Buenos Aires - Roma",
      descripcion: "Vuelo directo con Alitalia. Incluye equipaje de mano y facturado.",
      precio: 360000,
      precio_original: null,
      stock: 10,
      tipo: "vuelo",
      destacado: true,
      destino: "Roma",
      duracion: "13h 15m",
      imagen_url: "/images/vuelos/buenos-aires-roma.png",
      disponible: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando vuelos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Vuelos</h1>
      <p className="text-gray-600 mb-8">Encuentra los mejores vuelos para tu próximo viaje</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <VuelosFilters />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Resultados</h2>
              <p className="text-sm text-gray-500">{vuelos.length} opciones encontradas</p>
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

          {vuelos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay vuelos disponibles</p>
              <p className="text-gray-400 mt-2">Intenta crear algunos vuelos desde el panel de administrador</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vuelos.map((vuelo) => (
                <ProductCard key={vuelo.id} product={vuelo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
