"use client"

import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2, Lock, LogIn, UserPlus, MapPin, Clock, Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CarritoPage() {
  const { user } = useAuth()
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const { toast } = useToast()

  // Función para obtener la imagen según el tipo de producto
  const getProductImage = (item: any) => {
    console.log("Producto en carrito:", item) // Debug

    // Si el producto tiene imagen propia y no es placeholder, usarla
    if (
      item.imagen_url &&
      item.imagen_url !== "/placeholder.svg?height=120&width=120" &&
      item.imagen_url !== "/placeholder.svg" &&
      !item.imagen_url.includes("placeholder")
    ) {
      console.log("Usando imagen del producto:", item.imagen_url)
      return item.imagen_url
    }

    // Si no, usar imagen según el tipo
    const tipoLower = item.tipo?.toLowerCase() || ""
    let imagePath = ""

    switch (tipoLower) {
      case "vuelo":
        imagePath = "/images/vuelo-placeholder.png"
        break
      case "hospedaje":
        imagePath = "/images/hospedaje-placeholder.png"
        break
      case "auto":
        imagePath = "/images/auto-placeholder.png"
        break
      case "paquete":
        imagePath = "/images/paquete-placeholder.png"
        break
      default:
        imagePath = "/placeholder.svg?height=200&width=200"
    }

    console.log(`Usando imagen por tipo ${tipoLower}:`, imagePath)
    return imagePath
  }

  // Función para obtener el color del badge según el tipo
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

  // Función para obtener el ícono según el tipo
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

  // Si no hay usuario autenticado, mostrar mensaje de login
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#CAE9FF] to-[#5FA8D3] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Lock className="h-16 w-16 text-[#1B4965] mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-[#1B4965] mb-2">Inicia Sesión Requerido</h1>
                  <p className="text-gray-600 text-lg">Debes iniciar sesión para acceder a tu carrito de compras</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/auth/login">
                        <LogIn className="h-5 w-5 mr-2" />
                        Iniciar Sesión
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965] hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/auth/register">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Registrarse
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6">
                    <Button asChild variant="ghost" className="text-[#1B4965] hover:text-[#5FA8D3]">
                      <Link href="/productos">← Continuar Explorando Productos</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const handleCheckout = () => {
    // Redirect to checkout page instead of showing toast
    window.location.href = "/checkout"
  }

  const handleIncrement = (item: any) => {
    const currentQuantity = Number(item.cantidad) || 0
    const maxStock = Number(item.stock) || 0
    const newQuantity = currentQuantity + 1

    if (newQuantity <= maxStock) {
      updateQuantity(item.id, newQuantity)
      toast({
        title: "Cantidad actualizada",
        description: `${item.nombre} - Cantidad: ${newQuantity}`,
      })
    } else {
      toast({
        title: "Stock insuficiente",
        description: `Solo hay ${maxStock} unidades disponibles`,
        variant: "destructive",
      })
    }
  }

  const handleDecrement = (item: any) => {
    const currentQuantity = Number(item.cantidad) || 0
    const newQuantity = currentQuantity - 1

    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity)
      toast({
        title: "Cantidad actualizada",
        description: `${item.nombre} - Cantidad: ${newQuantity}`,
      })
    } else {
      removeItem(item.id)
      toast({
        title: "Producto eliminado",
        description: `${item.nombre} fue eliminado del carrito`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CAE9FF] to-[#5FA8D3] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#1B4965] mb-2 flex items-center">
              <ShoppingCart className="h-10 w-10 mr-4" />
              Mi Carrito de Compras
            </h1>
            <p className="text-gray-600 text-lg">
              {items.length === 0
                ? "Tu carrito está vacío"
                : `${items.length} producto${items.length !== 1 ? "s" : ""} en tu carrito`}
            </p>
          </div>

          {items.length === 0 ? (
            <Card className="shadow-2xl border-0">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-8">¡Explora nuestros productos y encuentra algo increíble!</p>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105"
                >
                  <Link href="/productos">Explorar Productos</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item, index) => {
                  const precio = Number(item.precio) || 0
                  const cantidad = Number(item.cantidad) || 0
                  const stock = Number(item.stock) || 0
                  const precioTotal = precio * cantidad

                  return (
                    <Card
                      key={`${item.id}-${index}`}
                      className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Imagen del producto */}
                          <div className="md:w-48 h-48 md:h-auto relative flex-shrink-0">
                            <Image
                              src={getProductImage(item) || "/placeholder.svg"}
                              alt={item.nombre || "Producto"}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                console.error("Error cargando imagen:", e.currentTarget.src)
                                e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                              }}
                              onLoad={() => {
                                console.log("Imagen cargada correctamente:", getProductImage(item))
                              }}
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className={`${getTypeColor(item.tipo)} shadow-lg`}>
                                <span className="mr-1">{getTypeIcon(item.tipo)}</span>
                                {item.tipo || "Producto"}
                              </Badge>
                            </div>
                          </div>

                          {/* Información del producto */}
                          <div className="flex-grow p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-xl font-bold text-[#1B4965] mb-1">
                                  {item.nombre || "Producto sin nombre"}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                  {item.descripcion || "Sin descripción disponible"}
                                </p>
                              </div>
                            </div>

                            {/* Detalles específicos del producto */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                              {item.destino && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{item.destino}</span>
                                </div>
                              )}
                              {item.duracion && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{item.duracion}</span>
                                </div>
                              )}
                              {item.codigo && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Código: {item.codigo}</span>
                                </div>
                              )}
                            </div>

                            {/* Controles de cantidad y precio */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 rounded-lg bg-white shadow-sm">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDecrement(item)}
                                    className="h-10 w-10 p-0 hover:bg-gray-100 rounded-l-lg"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <div className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center bg-gray-50">
                                    {cantidad}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleIncrement(item)}
                                    disabled={cantidad >= stock}
                                    className="h-10 w-10 p-0 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0 rounded-lg border-2 border-red-200 hover:border-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="text-right">
                                <div className="text-3xl font-bold text-[#1B4965] mb-1">
                                  ${precioTotal.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500 mb-1">${precio.toLocaleString()} por unidad</div>
                                <div className="text-xs text-gray-400 flex items-center justify-end">
                                  <Users className="h-3 w-3 mr-1" />
                                  Stock disponible: {stock}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Resumen del pedido */}
              <div className="lg:col-span-1">
                <Card className="shadow-2xl border-0 sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] text-white rounded-t-lg">
                    <CardTitle className="text-2xl flex items-center">
                      <ShoppingCart className="h-6 w-6 mr-2" />
                      Resumen del Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      {items.map((item, index) => {
                        const precio = Number(item.precio) || 0
                        const cantidad = Number(item.cantidad) || 0
                        const subtotal = precio * cantidad

                        return (
                          <div
                            key={`summary-${item.id}-${index}`}
                            className="flex justify-between items-center py-3 border-b-2 border-solid border-white"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-800 truncate">
                                {item.nombre || "Producto"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {cantidad} × ${precio.toLocaleString()}
                              </div>
                            </div>
                            <div className="font-bold text-[#1B4965]">${subtotal.toLocaleString()}</div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="my-4 h-0.5 bg-white w-full border-t-2 border-solid border-white"></div>

                    <div className="flex justify-between items-center text-xl font-bold text-[#1B4965] bg-gray-50 p-3 rounded-lg">
                      <span>Total:</span>
                      <span>${Number(total || 0).toLocaleString()}</span>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] hover:from-[#5FA8D3] hover:to-[#1B4965] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        size="lg"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Proceder al Pago
                      </Button>

                      <Button
                        onClick={clearCart}
                        variant="outline"
                        className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Vaciar Carrito
                      </Button>

                      <Button
                        asChild
                        variant="ghost"
                        className="w-full text-[#1B4965] hover:text-[#5FA8D3] transition-all duration-300"
                      >
                        <Link href="/productos">← Continuar Comprando</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
