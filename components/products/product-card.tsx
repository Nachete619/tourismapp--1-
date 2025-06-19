"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Star, MapPin, Clock, Lock, LogIn, UserPlus } from "lucide-react"
import type { Producto } from "@/types/database"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ProductCardProps {
  product: Producto
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isAuthenticated } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  // Función para obtener la imagen según el tipo de producto
  const getProductImage = (product: Producto) => {
    // Si el producto tiene imagen propia, usarla
    if (product.imagen_url && product.imagen_url !== "/placeholder.svg?height=200&width=300") {
      return product.imagen_url
    }

    // Si no, usar imagen según el tipo
    switch (product.tipo?.toLowerCase()) {
      case "vuelo":
        return "/images/vuelo-placeholder.png"
      case "hospedaje":
        return "/images/hospedaje-placeholder.png"
      case "auto":
        return "/images/auto-placeholder.png"
      case "paquete":
        return "/images/paquete-placeholder.png"
      default:
        return "/placeholder.svg?height=200&width=300"
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Double check authentication
    if (!user || !isAuthenticated) {
      toast({
        title: "🚫 Acceso Restringido",
        description: "Necesitas una cuenta para agregar productos al carrito",
        variant: "destructive",
      })
      return
    }

    try {
      console.log("Agregando producto al carrito:", product)
      addItem(product)
      toast({
        title: "✅ Producto Agregado",
        description: `${product.nombre} se agregó al carrito`,
      })
    } catch (error) {
      console.error("Error en handleAddToCart:", error)
      toast({
        title: "💥 Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive",
      })
    }
  }

  const getTypeColor = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case "vuelo":
        return "bg-blue-600 text-white"
      case "paquete":
        return "bg-purple-600 text-white"
      case "auto":
        return "bg-green-600 text-white"
      case "hospedaje":
        return "bg-orange-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getTypeIcon = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case "vuelo":
        return "✈️"
      case "hospedaje":
        return "🏨"
      case "auto":
        return "🚗"
      case "paquete":
        return "🎒"
      default:
        return "📦"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group cursor-pointer">
      <div className="relative overflow-hidden">
        <Image
          src={getProductImage(product) || "/placeholder.svg"}
          alt={product.nombre}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            console.error("Error cargando imagen:", product.imagen_url)
            e.currentTarget.src = "/placeholder.svg?height=200&width=300"
          }}
        />
        <Badge
          className={`absolute top-2 left-2 ${getTypeColor(product.tipo)} transition-all duration-300 hover:scale-110`}
        >
          <span className="mr-1">{getTypeIcon(product.tipo)}</span>
          {product.tipo}
        </Badge>
        {product.destacado && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 text-white transition-all duration-300 hover:scale-110 hover:bg-yellow-400">
            <Star className="h-3 w-3 mr-1 transition-transform duration-300 group-hover:rotate-12" />
            Destacado
          </Badge>
        )}

        {/* Overlay de restricción para usuarios no autenticados */}
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center text-white p-4">
              <Lock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Inicia sesión para comprar</p>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-[#1B4965] group-hover:text-[#5FA8D3] transition-colors duration-300">
          {product.nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {product.descripcion}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {product.destino && (
            <div className="flex items-center group/item hover:text-[#1B4965] transition-colors duration-300">
              <MapPin className="h-4 w-4 mr-1 transition-transform duration-300 group-hover/item:scale-110" />
              {product.destino}
            </div>
          )}
          {product.duracion && (
            <div className="flex items-center group/item hover:text-[#1B4965] transition-colors duration-300">
              <Clock className="h-4 w-4 mr-1 transition-transform duration-300 group-hover/item:scale-110" />
              {product.duracion}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#1B4965] group-hover:text-[#5FA8D3] transition-colors duration-300">
              ${product.precio.toLocaleString()}
            </span>
            {product.precio_original && product.precio_original > product.precio && (
              <span className="text-sm text-gray-500 line-through ml-2 group-hover:text-red-400 transition-colors duration-300">
                ${product.precio_original.toLocaleString()}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
            Stock: {product.stock}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {isAuthenticated ? (
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-[#1B4965] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none group/button"
          >
            <ShoppingCart className="h-4 w-4 mr-2 transition-transform duration-300 group-hover/button:scale-110" />
            {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
          </Button>
        ) : (
          <div className="w-full space-y-3">
            {/* Botón principal deshabilitado con mensaje claro */}
            <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed relative overflow-hidden">
              <Lock className="h-4 w-4 mr-2" />
              Requiere Cuenta
            </Button>

            {/* Mensaje de restricción */}
            <div className="text-center text-xs text-gray-500 bg-gray-50 p-2 rounded border">
              🔒 Debes crear una cuenta para agregar productos
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <Button
                asChild
                size="sm"
                className="flex-1 bg-[#1B4965] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105"
              >
                <Link href="/auth/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  Entrar
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="flex-1 border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965] hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Link href="/auth/register">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Crear Cuenta
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
