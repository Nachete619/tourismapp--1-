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
  Car,
  Fuel,
  Users,
  Luggage,
  Settings,
  Shield,
  Star,
  CreditCard,
  CheckCircle,
  Snowflake,
  Radio,
} from "lucide-react"

interface AutoDetailsProps {
  id: string
}

export function AutoDetails({ id }: AutoDetailsProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [auto, setAuto] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")

  useEffect(() => {
    const mockAuto = {
      id,
      marca: "Toyota",
      modelo: "Corolla",
      año: 2023,
      categoria: "Compacto",
      precio: 4500,
      calificacion: 4.6,
      reseñas: 324,
      combustible: "Nafta",
      transmision: "Manual",
      pasajeros: 5,
      equipaje: 2,
      descripcion: "Vehículo compacto ideal para la ciudad, económico y confiable.",
      caracteristicas: ["Aire acondicionado", "Radio AM/FM", "Bluetooth", "USB", "Dirección asistida"],
      incluye: ["Seguro básico", "Kilometraje ilimitado", "Asistencia 24h", "Segundo conductor gratis"],
      politicas: {
        edad: "Mínimo 21 años",
        licencia: "Licencia vigente requerida",
        combustible: "Devolver con el mismo nivel",
        cancelacion: "Cancelación gratuita hasta 24h antes",
      },
      imagenes: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    }

    setTimeout(() => {
      setAuto(mockAuto)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (!auto || !pickupDate || !returnDate || !pickupLocation) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    const days = Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))

    const cartItem = {
      id: auto.id,
      name: `${auto.marca} ${auto.modelo} ${auto.año}`,
      price: auto.precio * days,
      quantity: 1,
      type: "auto",
      details: {
        categoria: auto.categoria,
        pickupDate,
        returnDate,
        pickupLocation,
        dias: days,
      },
      image: auto.imagenes[0],
    }

    addItem(cartItem)
    toast({
      title: "¡Auto agregado al carrito!",
      description: `${auto.marca} ${auto.modelo} por ${days} día${days > 1 ? "s" : ""}`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965]"></div>
      </div>
    )
  }

  if (!auto) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Auto no encontrado</h2>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    )
  }

  const days =
    pickupDate && returnDate
      ? Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0

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
              {auto.marca} {auto.modelo} {auto.año}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{auto.categoria}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{auto.calificacion}</span>
                <span className="text-sm text-gray-600">({auto.reseñas})</span>
              </div>
            </div>
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
                      src={auto.imagenes[0] || "/placeholder.svg"}
                      alt={`${auto.marca} ${auto.modelo}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {auto.imagenes.slice(1).map((img: string, index: number) => (
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

            {/* Especificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Especificaciones del Vehículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#1B4965]" />
                    <div>
                      <p className="font-semibold">{auto.pasajeros}</p>
                      <p className="text-sm text-gray-600">Pasajeros</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Luggage className="h-5 w-5 text-[#1B4965]" />
                    <div>
                      <p className="font-semibold">{auto.equipaje}</p>
                      <p className="text-sm text-gray-600">Equipajes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Fuel className="h-5 w-5 text-[#1B4965]" />
                    <div>
                      <p className="font-semibold">{auto.combustible}</p>
                      <p className="text-sm text-gray-600">Combustible</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-[#1B4965]" />
                    <div>
                      <p className="font-semibold">{auto.transmision}</p>
                      <p className="text-sm text-gray-600">Transmisión</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{auto.descripcion}</p>

                <div>
                  <h4 className="font-semibold mb-3">Características</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {auto.caracteristicas.map((caracteristica: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        {caracteristica.includes("Aire") && <Snowflake className="h-4 w-4 text-[#1B4965]" />}
                        {caracteristica.includes("Radio") && <Radio className="h-4 w-4 text-[#1B4965]" />}
                        {!caracteristica.includes("Aire") && !caracteristica.includes("Radio") && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <span className="text-sm">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lo que incluye */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Incluido en el Alquiler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {auto.incluye.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Políticas */}
            <Card>
              <CardHeader>
                <CardTitle>Políticas de Alquiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(auto.politicas).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                      <p className="text-sm text-gray-600">{value as string}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de Reserva */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Reservar Auto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B4965]">${auto.precio.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">por día</p>
                </div>

                <Separator />

                <div>
                  <label className="block text-sm font-medium mb-2">Lugar de retiro</label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Seleccionar ubicación</option>
                    <option value="aeropuerto">Aeropuerto</option>
                    <option value="centro">Centro de la ciudad</option>
                    <option value="hotel">Hotel</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Retiro</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Devolución</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {days > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>
                        Subtotal ({days} día{days > 1 ? "s" : ""})
                      </span>
                      <span className="font-semibold">${(auto.precio * days).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Seguro incluido</span>
                      <span>✓</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#1B4965] hover:bg-[#1B4965]/90"
                  size="lg"
                  disabled={!pickupDate || !returnDate || !pickupLocation}
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
