"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Opcional: redirigir automáticamente después de 10 segundos
    const timer = setTimeout(() => {
      router.push("/")
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CAE9FF] to-[#5FA8D3] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-12 text-center">
              {/* Ícono de éxito */}
              <div className="mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-[#1B4965] mb-4">¡Pedido Confirmado!</h1>
                <p className="text-xl text-gray-600 mb-2">Tu compra ha sido procesada exitosamente</p>
                <p className="text-gray-500">Recibirás un email de confirmación en breve</p>
              </div>

              {/* Información del pedido */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-[#1B4965] mb-4">Detalles del Pedido</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número de Pedido:</span>
                    <span className="font-mono font-bold">
                      #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span>{new Date().toLocaleDateString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="text-green-600 font-semibold">Confirmado</span>
                  </div>
                </div>
              </div>

              {/* Próximos pasos */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-[#1B4965] mb-3">¿Qué sigue?</h3>
                <div className="text-left space-y-2 text-sm text-gray-700">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Recibirás un email de confirmación con todos los detalles</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Nuestro equipo procesará tu pedido en las próximas 24 horas</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Te contactaremos para coordinar los detalles de tu viaje</span>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/mis-pedidos">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Ver Mis Pedidos
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965] hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/productos">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Seguir Comprando
                    </Link>
                  </Button>
                </div>

                <Button
                  asChild
                  variant="ghost"
                  className="text-[#1B4965] hover:text-[#5FA8D3] transition-all duration-300"
                >
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Volver al Inicio
                  </Link>
                </Button>
              </div>

              {/* Información de contacto */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">¿Tienes alguna pregunta sobre tu pedido?</p>
                <Button asChild variant="link" className="text-[#1B4965] hover:text-[#5FA8D3] p-0">
                  <Link href="/contacto">Contáctanos aquí</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
