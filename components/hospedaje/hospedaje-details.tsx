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
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  Coffee,
  CreditCard,
  Shield,
  CheckCircle,
} from "lucide-react"

interface HospedajeDetailsProps {
  id: string
}

export function HospedajeDetails({ id }: HospedajeDetailsProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [hospedaje, setHospedaje] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRooms, setSelectedRooms] = useState(1)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  useEffect(() => {
    const mockHospedaje = {
      id,
      nombre: "Hotel Boutique Plaza",
      ubicacion: "Centro Histórico, Buenos Aires",
      tipo: "Hotel",
      precio: 12500,
      calificacion: 4.7,
      reseñas: 892,
      descripcion: "Elegante hotel boutique ubicado en el corazón del centro histórico de Buenos Aires.",
      amenidades: ["WiFi gratuito", "Estacionamiento", "Restaurante", "Piscina", "Gimnasio", "Spa"],
      servicios: ["Servicio a la habitación 24h", "Concierge", "Lavandería", "Transfer al aeropuerto"],
      politicas: {
        checkIn: "15:00",
        checkOut: "11:00",
        cancelacion: "Cancelación gratuita hasta 48h antes",
        mascotas: "No se permiten mascotas",
      },
      imagenes: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    }

    setTimeout(() => {
      setHospedaje(mockHospedaje)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (!hospedaje || !checkIn || !checkOut) {
      toast({
        title: "Información incompleta",
        description: "Por favor selecciona las fechas de check-in y check-out",
        variant: "destructive",
      })
      return
    }

    const cartItem = {
      id: hospedaje.id,
      name: hospedaje.nombre,
      price: hospedaje.precio,
      quantity: selectedRooms,
      type: "hospedaje",
      details: {
        ubicacion: hospedaje.ubicacion,
        tipo: hospedaje.tipo,
        checkIn,
        checkOut,
        habitaciones: selectedRooms,
      },
      image: hospedaje.imagenes[0],
    }

    addItem(cartItem)
    toast({
      title: "¡Hospedaje agregado al carrito!",
      description: `${selectedRooms} habitación(es) en ${hospedaje.nombre}`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965]"></div>
      </div>
    )
  }

  if (!hospedaje) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hospedaje no encontrado</h2>
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
            <h1 className="text-3xl font-bold text-gray-900">{hospedaje.nombre}</h1>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-gray-600" />
              <p className="text-gray-600">{hospedaje.ubicacion}</p>
              <Badge variant="outline">{hospedaje.tipo}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de Imágenes */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-4 p-6">
                  <div className="col-span-2">
                    <img
                      src={hospedaje.imagenes[0] || "/placeholder.svg"}
                      alt={hospedaje.nombre}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {hospedaje.imagenes.slice(1).map((img: string, index: number) => (
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

            {/* Descripción */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{hospedaje.descripcion}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{hospedaje.calificacion}</span>
                  <span className="text-gray-600">({hospedaje.reseñas} reseñas)</span>
                </div>
              </CardContent>
            </Card>

            {/* Amenidades */}
            <Card>
              <CardHeader>
                <CardTitle>Amenidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hospedaje.amenidades.map((amenidad: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      {amenidad.includes("WiFi") && <Wifi className="h-4 w-4 text-[#1B4965]" />}
                      {amenidad.includes("Estacionamiento") && <Car className="h-4 w-4 text-[#1B4965]" />}
                      {amenidad.includes("Restaurante") && <Utensils className="h-4 w-4 text-[#1B4965]" />}
                      {amenidad.includes("Piscina") && <Waves className="h-4 w-4 text-[#1B4965]" />}
                      {amenidad.includes("Gimnasio") && <Dumbbell className="h-4 w-4 text-[#1B4965]" />}
                      {amenidad.includes("Spa") && <Coffee className="h-4 w-4 text-[#1B4965]" />}
                      <span className="text-sm">{amenidad}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Políticas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Políticas del Hotel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Check-in</p>
                      <p className="text-sm text-gray-600">{hospedaje.politicas.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Check-out</p>
                      <p className="text-sm text-gray-600">{hospedaje.politicas.checkOut}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Cancelación</p>
                      <p className="text-sm text-gray-600">{hospedaje.politicas.cancelacion}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Mascotas</p>
                      <p className="text-sm text-gray-600">{hospedaje.politicas.mascotas}</p>
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
                <CardTitle>Reservar Habitación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B4965]">${hospedaje.precio.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">por noche</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Habitaciones</label>
                  <select
                    value={selectedRooms}
                    onChange={(e) => setSelectedRooms(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} habitación{num > 1 ? "es" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {checkIn && checkOut && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>
                        Subtotal ({selectedRooms} habitación{selectedRooms > 1 ? "es" : ""})
                      </span>
                      <span className="font-semibold">
                        $
                        {(
                          hospedaje.precio *
                          selectedRooms *
                          Math.ceil(
                            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24),
                          )
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Impuestos</span>
                      <span>Incluidos</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#1B4965] hover:bg-[#1B4965]/90"
                  size="lg"
                  disabled={!checkIn || !checkOut}
                >
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
