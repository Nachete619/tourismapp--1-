"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Plane,
  Clock,
  Wifi,
  Coffee,
  Monitor,
  Star,
  MapPin,
  CreditCard,
  Shield,
  CheckCircle,
} from "lucide-react"

interface VueloDetailsProps {
  id: string
}

export function VueloDetails({ id }: VueloDetailsProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [vuelo, setVuelo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPassengers, setSelectedPassengers] = useState(1)

  // Datos de ejemplo - en producción vendría de la API
  useEffect(() => {
    const mockVuelo = {
      id,
      origen: "Buenos Aires (EZE)",
      destino: "Madrid (MAD)",
      aerolinea: "Aerolíneas Argentinas",
      precio: 85000,
      duracion: "12h 30m",
      salida: "10:30",
      llegada: "14:00+1",
      escalas: "Directo",
      calificacion: 4.5,
      reseñas: 1247,
      clase: "Económica",
      equipaje: "23kg incluido",
      servicios: ["WiFi", "Comida incluida", "Entretenimiento"],
      politicas: {
        cancelacion: "Cancelación gratuita hasta 24h antes",
        cambios: "Cambios permitidos con cargo",
        equipaje: "1 equipaje de mano + 1 equipaje facturado",
      },
      imagenes: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    }

    setTimeout(() => {
      setVuelo(mockVuelo)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (!vuelo) return

    const cartItem = {
      id: vuelo.id,
      name: `${vuelo.origen} - ${vuelo.destino}`,
      price: vuelo.precio,
      quantity: selectedPassengers,
      type: "vuelo",
      details: {
        aerolinea: vuelo.aerolinea,
        salida: vuelo.salida,
        llegada: vuelo.llegada,
        duracion: vuelo.duracion,
        clase: vuelo.clase,
      },
      image: vuelo.imagenes[0],
    }

    addItem(cartItem)
    toast({
      title: "¡Vuelo agregado al carrito!",
      description: `${selectedPassengers} pasajero(s) para ${vuelo.origen} - ${vuelo.destino}`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965]"></div>
      </div>
    )
  }

  if (!vuelo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vuelo no encontrado</h2>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vuelo.origen} - {vuelo.destino}
            </h1>
            <p className="text-gray-600">{vuelo.aerolinea}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de Imágenes */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  <div className="md:col-span-2">
                    <img
                      src={vuelo.imagenes[0] || "/placeholder.svg"}
                      alt="Avión"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {vuelo.imagenes.slice(1).map((img: string, index: number) => (
                    <img
                      key={index}
                      src={img || "/placeholder.svg"}
                      alt={`Vista ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información del Vuelo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Detalles del Vuelo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#1B4965]" />
                    <div>
                      <p className="font-semibold">Salida</p>
                      <p className="text-sm text-gray-600">{vuelo.salida}</p>
                      <p className="text-sm text-gray-600">{vuelo.origen}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#1B4965]" />
                    <div>
                      <p className="font-semibold">Duración</p>
                      <p className="text-sm text-gray-600">{vuelo.duracion}</p>
                      <p className="text-sm text-gray-600">{vuelo.escalas}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#1B4965]" />
                    <div>
                      <p className="font-semibold">Llegada</p>
                      <p className="text-sm text-gray-600">{vuelo.llegada}</p>
                      <p className="text-sm text-gray-600">{vuelo.destino}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Servicios Incluidos</h4>
                  <div className="flex flex-wrap gap-2">
                    {vuelo.servicios.map((servicio: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {servicio === "WiFi" && <Wifi className="h-3 w-3" />}
                        {servicio === "Comida incluida" && <Coffee className="h-3 w-3" />}
                        {servicio === "Entretenimiento" && <Monitor className="h-3 w-3" />}
                        {servicio}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{vuelo.calificacion}</span>
                  <span className="text-gray-600">({vuelo.reseñas} reseñas)</span>
                </div>
              </CardContent>
            </Card>

            {/* Políticas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Políticas y Condiciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Cancelación</p>
                      <p className="text-sm text-gray-600">{vuelo.politicas.cancelacion}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Cambios</p>
                      <p className="text-sm text-gray-600">{vuelo.politicas.cambios}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Equipaje</p>
                      <p className="text-sm text-gray-600">{vuelo.politicas.equipaje}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de Reserva */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Reservar Vuelo</span>
                  <Badge variant="secondary">{vuelo.clase}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B4965]">${vuelo.precio.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">por persona</p>
                </div>

                <Separator />

                <div>
                  <label className="block text-sm font-medium mb-2">Número de Pasajeros</label>
                  <select
                    value={selectedPassengers}
                    onChange={(e) => setSelectedPassengers(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} pasajero{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>
                      Subtotal ({selectedPassengers} pasajero{selectedPassengers > 1 ? "s" : ""})
                    </span>
                    <span className="font-semibold">${(vuelo.precio * selectedPassengers).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Tasas e impuestos</span>
                    <span>Incluidos</span>
                  </div>
                </div>

                <Button onClick={handleAddToCart} className="w-full bg-[#1B4965] hover:bg-[#1B4965]/90" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Agregar al Carrito
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Reserva segura y protegida
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
