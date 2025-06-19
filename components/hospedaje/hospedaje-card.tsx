"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, MapPin, Wifi, Car, Utensils, Dumbbell } from "lucide-react"

interface HospedajeCardProps {
  hospedaje: {
    id: string
    name: string
    description: string
    type: string
    price: number
    originalPrice?: number | null
    rating: number
    location: string
    amenities: string[]
    imageUrl: string
    featured: boolean
  }
}

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  Estacionamiento: Car,
  Restaurante: Utensils,
  Gimnasio: Dumbbell,
}

export function HospedajeCard({ hospedaje }: HospedajeCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "hotel":
        return "bg-blue-500 text-white"
      case "resort":
        return "bg-green-500 text-white"
      case "hostel":
        return "bg-purple-500 text-white"
      case "cabana":
        return "bg-orange-500 text-white"
      case "apartamento":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case "hotel":
        return "Hotel"
      case "resort":
        return "Resort"
      case "hostel":
        return "Hostel"
      case "cabana":
        return "Cabaña"
      case "apartamento":
        return "Apartamento"
      default:
        return type
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group cursor-pointer">
      <div className="relative overflow-hidden">
        <Image
          src={hospedaje.imageUrl || "/placeholder.svg"}
          alt={hospedaje.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge
          className={`absolute top-3 left-3 ${getTypeColor(hospedaje.type)} transition-all duration-300 hover:scale-110`}
        >
          {getTypeLabel(hospedaje.type)}
        </Badge>
        {hospedaje.featured && (
          <Badge className="absolute top-3 right-3 bg-yellow-500 text-white transition-all duration-300 hover:scale-110 hover:bg-yellow-400">
            <Star className="h-3 w-3 mr-1 transition-transform duration-300 group-hover:rotate-12" />
            Destacado
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl text-[#1B4965] group-hover:text-[#5FA8D3] transition-colors duration-300 line-clamp-1">
            {hospedaje.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-semibold text-gray-700">{hospedaje.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3 group/location hover:text-[#1B4965] transition-colors duration-300">
          <MapPin className="h-4 w-4 mr-2 transition-transform duration-300 group-hover/location:scale-110" />
          <span className="text-sm">{hospedaje.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {hospedaje.description}
        </p>

        {/* Amenidades principales */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hospedaje.amenities.slice(0, 4).map((amenity) => {
            const IconComponent = amenityIcons[amenity]
            return (
              <div
                key={amenity}
                className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600 hover:bg-[#CAE9FF] hover:text-[#1B4965] transition-colors duration-300"
              >
                {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                {amenity}
              </div>
            )
          })}
          {hospedaje.amenities.length > 4 && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
              +{hospedaje.amenities.length - 4} más
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#1B4965] group-hover:text-[#5FA8D3] transition-colors duration-300">
              ${hospedaje.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ noche</span>
            {hospedaje.originalPrice && hospedaje.originalPrice > hospedaje.price && (
              <div className="text-sm text-gray-500 line-through group-hover:text-red-400 transition-colors duration-300">
                ${hospedaje.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 space-y-3">
        <Link href={`/hospedaje/${hospedaje.id}`} className="w-full">
          <Button className="w-full bg-[#1B4965] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group/button">
            Ver Detalles
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965] hover:text-white transition-all duration-300 hover:scale-105"
        >
          Reservar Ahora
        </Button>
      </CardFooter>
    </Card>
  )
}
