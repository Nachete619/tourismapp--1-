"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import type { Order, OrderItem, Product } from "@/types/database"

interface OrderWithDetails extends Order {
  order_items: (OrderItem & { products: Product })[]
}

export function ReservasPageContent() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null)
  const [editingOrder, setEditingOrder] = useState<OrderWithDetails | null>(null)
  const [activeTab, setActiveTab] = useState("todas")

  useEffect(() => {
    if (user && isSupabaseAvailable) {
      loadOrders()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadOrders = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Error loading orders:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar tus reservas",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const cancelOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          status: "cancelled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .eq("user_id", user?.id)

      if (error) throw error

      toast({
        title: "Reserva Cancelada",
        description: "Tu reserva ha sido cancelada exitosamente",
      })

      loadOrders()
    } catch (error) {
      console.error("Error cancelling order:", error)
      toast({
        title: "Error",
        description: "No se pudo cancelar la reserva",
        variant: "destructive",
      })
    }
  }

  const updateOrder = async (orderId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .eq("user_id", user?.id)

      if (error) throw error

      toast({
        title: "Reserva Actualizada",
        description: "Los cambios se guardaron exitosamente",
      })

      setEditingOrder(null)
      loadOrders()
    } catch (error) {
      console.error("Error updating order:", error)
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1B4965] mb-4">Inicia sesión para ver tus reservas</h2>
          <p className="text-gray-600 mb-6">Necesitas una cuenta para acceder a tu historial de reservas</p>
          <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white">
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!isSupabaseAvailable) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B4965] mb-4">Mis Reservas</h1>
          <p className="text-gray-600">Gestiona todas tus reservas y consulta su estado</p>
        </div>

        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Configura Supabase</h3>
          <p className="text-gray-500 mb-4">Para ver tu historial completo de reservas</p>
          <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white">
            <Link href="/servicios">Explorar Servicios</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vuelo":
        return "✈️"
      case "hospedaje":
        return "🏨"
      case "auto":
        return "🚗"
      case "paquete":
        return "📦"
      default:
        return "📋"
    }
  }

  const filteredOrders = activeTab === "todas" ? orders : orders.filter((order) => order.status === activeTab)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1B4965] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tus reservas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B4965] mb-4">Mis Reservas</h1>
        <p className="text-gray-600">Gestiona todas tus reservas y consulta su estado</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
          <TabsTrigger value="delivered">Completadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No tienes reservas {activeTab === "todas" ? "" : activeTab}
              </h3>
              <p className="text-gray-500 mb-4">Explora nuestros servicios y haz tu primera reserva</p>
              <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white">
                <Link href="/servicios">Explorar Servicios</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {order.order_items.map((item) => (
                            <span key={item.id} className="text-2xl">
                              {getTypeIcon(item.products.type)}
                            </span>
                          ))}
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#1B4965]">Reserva #{order.id.slice(0, 8)}</CardTitle>
                          <p className="text-sm text-gray-500">
                            {format(new Date(order.created_at), "PPP", { locale: es })}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Productos:</h4>
                        <div className="space-y-2">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <span>{getTypeIcon(item.products.type)}</span>
                                <span className="font-medium">{item.products.name}</span>
                                <span className="text-sm text-gray-500">x{item.quantity}</span>
                              </div>
                              <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-[#1B4965]">${order.total.toLocaleString()}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965] hover:text-white"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalles de la Reserva #{selectedOrder?.id.slice(0, 8)}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Estado</Label>
                                    <Badge className={getStatusColor(selectedOrder.status)}>
                                      {selectedOrder.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <Label>Fecha de Reserva</Label>
                                    <p>{format(new Date(selectedOrder.created_at), "PPP", { locale: es })}</p>
                                  </div>
                                  <div>
                                    <Label>Total</Label>
                                    <p className="font-bold text-xl">${selectedOrder.total.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label>Última Actualización</Label>
                                    <p>{format(new Date(selectedOrder.updated_at), "PPP", { locale: es })}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label>Productos Reservados</Label>
                                  <div className="space-y-2 mt-2">
                                    {selectedOrder.order_items.map((item) => (
                                      <div
                                        key={item.id}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded"
                                      >
                                        <div>
                                          <div className="flex items-center space-x-2">
                                            <span>{getTypeIcon(item.products.type)}</span>
                                            <span className="font-medium">{item.products.name}</span>
                                          </div>
                                          <p className="text-sm text-gray-600 mt-1">{item.products.description}</p>
                                          <div className="text-sm text-gray-500 mt-1">
                                            Cantidad: {item.quantity} | Precio unitario: ${item.price.toLocaleString()}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="font-bold">
                                            ${(item.price * item.quantity).toLocaleString()}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {order.status === "pending" && (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                                  onClick={() => setEditingOrder(order)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modificar
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Modificar Reserva</DialogTitle>
                                </DialogHeader>
                                {editingOrder && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Notas Especiales</Label>
                                      <Textarea
                                        placeholder="Agregar notas o solicitudes especiales..."
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="outline" onClick={() => setEditingOrder(null)}>
                                        Cancelar
                                      </Button>
                                      <Button onClick={() => updateOrder(editingOrder.id, {})}>Guardar Cambios</Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Cancelar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Cancelar reserva?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Tu reserva será cancelada y no podrás recuperarla.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>No, mantener reserva</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => cancelOrder(order.id)}>
                                    Sí, cancelar reserva
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
