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
  Calendar,
  Star,
  Plane,
  Hotel,
  Car,
  Utensils,
  Camera,
  Shield,
  CheckCircle,
  CreditCard,
  Clock,
} from "lucide-react"

interface PaqueteDetailsProps {
  id: string
}

export function PaqueteDetails({ id }: PaqueteDetailsProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [paquete, setPaquete] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPersons, setSelectedPersons] = useState(2)
  const [selectedDate, setSelectedDate] = useState("")

  useEffect(() => {
    const mockPaquete = {
      id,
      nombre: "Escapada Romántica a Bariloche",
      destino: "San Carlos de Bariloche, Argentina",
      duracion: "4 días / 3 noches",
      precio: 89000,
      calificacion: 4.8,
      reseñas: 156,
      categoria: "Romántico",
      descripcion:
        "Disfruta de una escapada romántica en el corazón de la Patagonia argentina. Incluye alojamiento, excursiones y experiencias únicas.",
      incluye: [
        "Vuelos ida y vuelta",
        "Alojamiento 4 estrellas",
        "Desayuno incluido",
        "Excursión al Cerro Catedral",
        "Paseo en barco por el lago",
        "Cena romántica",
        "Transfer aeropuerto-hotel",
        "Guía turístico",
      ],
      itinerario: [
        {
          dia: 1,
          titulo: "Llegada a Bariloche",
          actividades: ["Llegada al aeropuerto", "Transfer al hotel", "Check-in", "Cena de bienvenida"],
        },
        {
          dia: 2,
          titulo: "Cerro Catedral",
          actividades: ["Desayuno", "Excursión al Cerro Catedral", "Almuerzo en la montaña", "Tarde libre"],
        },
        {
          dia: 3,
          titulo: "Circuito Lacustre",
          actividades: ["Desayuno", "Paseo en barco", "Visita a Puerto Blest", "Cena romántica"],
        },
        {
          dia: 4,
          titulo: "Despedida",
          actividades: ["Desayuno", "Check-out", "Transfer al aeropuerto", "Vuelo de regreso"],
        },
      ],
      politicas: {
        cancelacion: "Cancelación gratuita hasta 15 días antes",
        cambios: "Cambios permitidos con cargo adicional",
        documentos: "DNI o pasaporte vigente requerido",
        edad: "Apto para todas las edades",
      },
      imagenes: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    }

    setTimeout(() => {
      setPaquete(mockPaquete)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (!paquete || !selectedDate) {
      toast({
        title: "Información incompleta",
        description: "Por favor selecciona la fecha de salida",
        variant: "destructive",
      })
      return
    }

    const cartItem = {
      id: paquete.id,
      name: paquete.nombre,
      price: paquete.precio,
      quantity: selectedPersons,
      type: "paquete",
      details: {
        destino: paquete.destino,
        duracion: paquete.duracion,
        fechaSalida: selectedDate,
        personas: selectedPersons,
      },
      image: paquete.imagenes[0],
    }

    addItem(cartItem)
    toast({
      title: "¡Paquete agregado al carrito!",
      description: `${paquete.nombre} para ${selectedPersons} persona${selectedPersons > 1 ? "s" : ""}`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4965]"></div>
      </div>
    )
  }

  if (!paquete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Paquete no encontrado</h2>
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
            <h1 className="text-3xl font-bold text-gray-900">{paquete.nombre}</h1>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">{paquete.destino}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">{paquete.duracion}</span>
              </div>
              <Badge variant="outline">{paquete.categoria}</Badge>
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
                      src={paquete.imagenes[0] || "/placeholder.svg"}
                      alt={paquete.nombre}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {paquete.imagenes.slice(1).map((img: string, index: number) => (
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
                <CardTitle>Descripción del Paquete</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{paquete.descripcion}</p>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{paquete.calificacion}</span>
                  <span className="text-gray-600">({paquete.reseñas} reseñas)</span>
                </div>
              </CardContent>
            </Card>

            {/* Lo que incluye */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Qué Incluye el Paquete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paquete.incluye.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      {item.includes("Vuelo") && <Plane className="h-4 w-4 text-[#1B4965]" />}
                      {item.includes("Alojamiento") && <Hotel className="h-4 w-4 text-[#1B4965]" />}
                      {item.includes("Transfer") && <Car className="h-4 w-4 text-[#1B4965]" />}
                      {item.includes("Desayuno") && <Utensils className="h-4 w-4 text-[#1B4965]" />}
                      {item.includes("Cena") && <Utensils className="h-4 w-4 text-[#1B4965]" />}
                      {item.includes("Excursión") && <Camera className="h-4 w-4 text-[#1B4965]" />}
                      {!item.includes("Vuelo") &&
                        !item.includes("Alojamiento") &&
                        !item.includes("Transfer") &&
                        !item.includes("Desayuno") &&
                        !item.includes("Cena") &&
                        !item.includes("Excursión") && <CheckCircle className="h-4 w-4 text-green-600" />}
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Itinerario Detallado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paquete.itinerario.map((dia: any, index: number) => (
                    <div key={index} className="border-l-4 border-[#1B4965] pl-4">
                      <h4 className="font-semibold text-lg">
                        Día {dia.dia}: {dia.titulo}
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {dia.actividades.map((actividad: string, actIndex: number) => (
                          <li key={actIndex} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#1B4965] rounded-full"></div>
                            {actividad}
                          </li>
                        ))}
                      </ul>
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
                  Políticas del Paquete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(paquete.politicas).map(([key, value]) => (
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
                <CardTitle>Reservar Paquete</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B4965]">${paquete.precio.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">por persona</p>
                </div>

                <Separator />

                <div>
                  <label className="block text-sm font-medium mb-2">Fecha de salida</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Número de personas</label>
                  <select
                    value={selectedPersons}
                    onChange={(e) => setSelectedPersons(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} persona{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>
                      Subtotal ({selectedPersons} persona{selectedPersons > 1 ? "s" : ""})
                    </span>
                    <span className="font-semibold">${(paquete.precio * selectedPersons).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Todo incluido</span>
                    <span>✓</span>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#1B4965] hover:bg-[#1B4965]/90"
                  size="lg"
                  disabled={!selectedDate}
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
