"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Building2, Smartphone, ShoppingCart, User, MapPin, Lock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    nombre: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    notas: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("tarjeta")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Si no hay usuario o carrito vacío, redirigir
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#CAE9FF] to-[#5FA8D3] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8 text-center">
                <Lock className="h-16 w-16 text-[#1B4965] mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-[#1B4965] mb-2">Acceso Restringido</h1>
                <p className="text-gray-600 text-lg mb-6">Debes iniciar sesión para acceder al checkout</p>
                <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3]">
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#CAE9FF] to-[#5FA8D3] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-16 w-16 text-[#1B4965] mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-[#1B4965] mb-2">Carrito Vacío</h1>
                <p className="text-gray-600 text-lg mb-6">No tienes productos en tu carrito para procesar</p>
                <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3]">
                  <Link href="/productos">Explorar Productos</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getProductImage = (item: any) => {
    if (item.imagen_url && item.imagen_url !== "/placeholder.svg?height=120&width=120") {
      return item.imagen_url
    }
    switch (item.tipo?.toLowerCase()) {
      case "vuelo":
        return "/images/vuelo-placeholder.png"
      case "hospedaje":
        return "/images/hospedaje-placeholder.png"
      case "auto":
        return "/images/auto-placeholder.png"
      case "paquete":
        return "/images/paquete-placeholder.png"
      default:
        return "/placeholder.svg?height=120&width=120"
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

  const validateForm = () => {
    const required = ["nombre", "email", "telefono", "direccion", "ciudad"]
    const missing = required.filter((field) => !formData[field as keyof typeof formData])

    if (missing.length > 0) {
      toast({
        title: "Campos Requeridos",
        description: `Por favor completa: ${missing.join(", ")}`,
        variant: "destructive",
      })
      return false
    }

    if (!acceptTerms) {
      toast({
        title: "Términos y Condiciones",
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Aquí iría la integración real con el procesador de pagos
      // Por ahora simulamos un pago exitoso

      toast({
        title: "¡Pedido Procesado!",
        description: "Tu pedido ha sido procesado exitosamente",
      })

      // Limpiar carrito
      clearCart()

      // Redirigir a página de confirmación
      router.push("/checkout/success")
    } catch (error) {
      toast({
        title: "Error en el Pago",
        description: "Hubo un problema procesando tu pedido. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CAE9FF] to-[#5FA8D3] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-[#1B4965] hover:text-[#5FA8D3] mb-4">
              <Link href="/carrito">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Carrito
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-[#1B4965] mb-2 flex items-center">
              <CreditCard className="h-10 w-10 mr-4" />
              Finalizar Compra
            </h1>
            <p className="text-gray-600 text-lg">Completa tu información para procesar el pedido</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario de checkout */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información Personal */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] text-white">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombre">Nombre Completo *</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dirección de Facturación */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] text-white">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Dirección de Facturación
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="direccion">Dirección *</Label>
                    <Input
                      id="direccion"
                      value={formData.direccion}
                      onChange={(e) => handleInputChange("direccion", e.target.value)}
                      placeholder="Calle y número"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ciudad">Ciudad *</Label>
                      <Input
                        id="ciudad"
                        value={formData.ciudad}
                        onChange={(e) => handleInputChange("ciudad", e.target.value)}
                        placeholder="Tu ciudad"
                      />
                    </div>
                    <div>
                      <Label htmlFor="codigoPostal">Código Postal</Label>
                      <Input
                        id="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                        placeholder="1234"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notas">Notas Adicionales</Label>
                    <Textarea
                      id="notas"
                      value={formData.notas}
                      onChange={(e) => handleInputChange("notas", e.target.value)}
                      placeholder="Instrucciones especiales o comentarios..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Método de Pago */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] text-white">
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="tarjeta" id="tarjeta" />
                      <Label htmlFor="tarjeta" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                        <div>
                          <div className="font-medium">Tarjeta de Crédito/Débito</div>
                          <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="transferencia" id="transferencia" />
                      <Label htmlFor="transferencia" className="flex items-center cursor-pointer flex-1">
                        <Building2 className="h-5 w-5 mr-2 text-green-600" />
                        <div>
                          <div className="font-medium">Transferencia Bancaria</div>
                          <div className="text-sm text-gray-500">Pago directo desde tu banco</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="mercadopago" id="mercadopago" />
                      <Label htmlFor="mercadopago" className="flex items-center cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 mr-2 text-blue-500" />
                        <div>
                          <div className="font-medium">MercadoPago</div>
                          <div className="text-sm text-gray-500">Pago con billetera digital</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Resumen del Pedido */}
            <div className="lg:col-span-1">
              <Card className="shadow-2xl border-0 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] text-white">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Resumen del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Lista de productos */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item, index) => {
                      const precio = Number(item.precio) || 0
                      const cantidad = Number(item.cantidad) || 0
                      const subtotal = precio * cantidad

                      return (
                        <div key={`checkout-${item.id}-${index}`} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 relative flex-shrink-0">
                            <Image
                              src={getProductImage(item) || "/placeholder.svg"}
                              alt={item.nombre || "Producto"}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-800 truncate">{item.nombre}</div>
                            <Badge className={`${getTypeColor(item.tipo)} text-xs mt-1`}>{item.tipo}</Badge>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500">
                                {cantidad} × ${precio.toLocaleString()}
                              </span>
                              <span className="font-bold text-[#1B4965]">${subtotal.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${Number(total || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Impuestos:</span>
                      <span>${Math.round(Number(total || 0) * 0.21).toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold text-[#1B4965]">
                      <span>Total:</span>
                      <span>${Math.round(Number(total || 0) * 1.21).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Términos y condiciones */}
                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-[#1B4965] hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacidad" className="text-[#1B4965] hover:underline">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>

                  {/* Botón de pago */}
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={isProcessing || !acceptTerms}
                    className="w-full bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] hover:from-[#5FA8D3] hover:to-[#1B4965] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Pagar ${Math.round(Number(total || 0) * 1.21).toLocaleString()}
                      </>
                    )}
                  </Button>

                  <div className="text-center text-xs text-gray-500 mt-2">
                    <Lock className="h-3 w-3 inline mr-1" />
                    Pago seguro y encriptado
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
