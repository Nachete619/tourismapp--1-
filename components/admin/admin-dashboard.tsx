"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Package,
  TrendingUp,
  Users,
  CalendarIcon,
  Check,
  X,
  Filter,
  Download,
  RefreshCw,
  ShoppingBag,
  DollarSign,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"
import type { Order, OrderItem, Product, Profile } from "@/types/database"
import { ProductManagement } from "./product-management"
import { OrderActions } from "./order-actions"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface OrderWithDetails extends Order {
  order_items: (OrderItem & { products: Product })[]
  profiles: Profile
}

interface SalesStats {
  total_sales: number
  total_orders: number
  avg_order_value: number
  top_product_type: string
}

export function AdminDashboard() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [salesStats, setSalesStats] = useState<SalesStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDate, setFilterDate] = useState<Date | undefined>()
  const [selectedClient, setSelectedClient] = useState<string>("all")
  const [clients, setClients] = useState<Profile[]>([])
  const [activeTab, setActiveTab] = useState("orders")
  const [cancelDialogOpen, setCancelDialogOpen] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null)
  const { toast } = useToast()
  const [filterDateOpen, setFilterDateOpen] = useState(false)
  const [reportDateOpen, setReportDateOpen] = useState(false)
  const [reportStartDate, setReportStartDate] = useState<Date | undefined>()

  useEffect(() => {
    loadOrders()
    loadClients()
    loadSalesStats()
  }, [])

  const loadOrders = async () => {
    // Mock data for demonstration
    const mockOrders = [
      {
        id: "4",
        user_id: "user4",
        status: "pending",
        total: 1200000,
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 259200000).toISOString(),
        order_items: [
          {
            id: "item4",
            order_id: "4",
            product_id: "prod4",
            quantity: 2,
            price: 600000,
            created_at: new Date().toISOString(),
            products: {
              id: "prod4",
              code: "PAQ001",
              name: "Paquete Europa Clásica",
              description: "Tour completo por 5 países europeos",
              type: "paquete",
              price: 600000,
              stock: 3,
              image_url: null,
              destination: "Europa",
              duration: "15 días",
              featured: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          },
        ],
        profiles: {
          id: "user4",
          email: "ana@ejemplo.com",
          full_name: "Ana Martínez",
          role: "client",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
      {
        id: "1",
        user_id: "user1",
        status: "pending",
        total: 850000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        order_items: [
          {
            id: "item1",
            order_id: "1",
            product_id: "prod1",
            quantity: 1,
            price: 850000,
            created_at: new Date().toISOString(),
            products: {
              id: "prod1",
              code: "VUE001",
              name: "Buenos Aires - Madrid",
              description: "Vuelo directo con Iberia",
              type: "vuelo",
              price: 850000,
              original_price: 950000,
              stock: 15,
              image_url: null,
              destination: "Madrid, España",
              duration: "13h 30m",
              featured: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          },
        ],
        profiles: {
          id: "user1",
          email: "cliente@ejemplo.com",
          full_name: "Juan Pérez",
          role: "client",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
      {
        id: "2",
        user_id: "user2",
        status: "confirmed",
        total: 240000,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        order_items: [
          {
            id: "item2",
            order_id: "2",
            product_id: "prod2",
            quantity: 2,
            price: 120000,
            created_at: new Date().toISOString(),
            products: {
              id: "prod2",
              code: "HOT001",
              name: "Hotel Palacio Real",
              description: "Hotel 5 estrellas en el centro de Madrid",
              type: "hospedaje",
              price: 120000,
              stock: 8,
              image_url: null,
              destination: "Madrid, España",
              duration: "Por noche",
              featured: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          },
        ],
        profiles: {
          id: "user2",
          email: "maria@ejemplo.com",
          full_name: "María García",
          role: "client",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
      {
        id: "3",
        user_id: "user3",
        status: "delivered",
        total: 450000,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        order_items: [
          {
            id: "item3",
            order_id: "3",
            product_id: "prod3",
            quantity: 10,
            price: 45000,
            created_at: new Date().toISOString(),
            products: {
              id: "prod3",
              code: "CAR001",
              name: "Toyota Corolla 2024",
              description: "Auto económico para alquiler",
              type: "auto",
              price: 45000,
              stock: 5,
              image_url: null,
              destination: "Madrid, España",
              duration: "Por día",
              featured: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          },
        ],
        profiles: {
          id: "user3",
          email: "carlos@ejemplo.com",
          full_name: "Carlos López",
          role: "client",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
      {
        id: "5",
        user_id: "user5",
        status: "cancelled",
        total: 320000,
        created_at: new Date(Date.now() - 345600000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString(),
        order_items: [
          {
            id: "item5",
            order_id: "5",
            product_id: "prod5",
            quantity: 4,
            price: 80000,
            created_at: new Date().toISOString(),
            products: {
              id: "prod5",
              code: "HOT002",
              name: "Hotel Barcelona Center",
              description: "Hotel boutique en el centro de Barcelona",
              type: "hospedaje",
              price: 80000,
              stock: 12,
              image_url: null,
              destination: "Barcelona, España",
              duration: "Por noche",
              featured: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          },
        ],
        profiles: {
          id: "user5",
          email: "pedro@ejemplo.com",
          full_name: "Pedro Rodríguez",
          role: "client",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    ]

    setOrders(mockOrders)
    setLoading(false)
  }

  const loadClients = async () => {
    const mockClients = [
      {
        id: "user1",
        email: "cliente@ejemplo.com",
        full_name: "Juan Pérez",
        role: "client",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "user2",
        email: "maria@ejemplo.com",
        full_name: "María García",
        role: "client",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "user3",
        email: "carlos@ejemplo.com",
        full_name: "Carlos López",
        role: "client",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "user4",
        email: "ana@ejemplo.com",
        full_name: "Ana Martínez",
        role: "client",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "user5",
        email: "pedro@ejemplo.com",
        full_name: "Pedro Rodríguez",
        role: "client",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    setClients(mockClients)
  }

  const loadSalesStats = async () => {
    const activeOrders = orders.filter((order) => order.status !== "cancelled")
    const totalSales = activeOrders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = activeOrders.length
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    const productTypes: { [key: string]: number } = {}
    activeOrders.forEach((order) => {
      order.order_items.forEach((item) => {
        productTypes[item.products.type] = (productTypes[item.products.type] || 0) + item.quantity
      })
    })

    const productTypeKeys = Object.keys(productTypes)
    const topProductType =
      productTypeKeys.length > 0
        ? productTypeKeys.reduce((a, b) => (productTypes[a] > productTypes[b] ? a : b))
        : "vuelo"

    setSalesStats({
      total_sales: totalSales,
      total_orders: totalOrders,
      avg_order_value: avgOrderValue,
      top_product_type: topProductType,
    })
  }

  useEffect(() => {
    if (orders.length > 0) {
      loadSalesStats()
    } else {
      setSalesStats({
        total_sales: 0,
        total_orders: 0,
        avg_order_value: 0,
        top_product_type: "vuelo",
      })
    }
  }, [orders])

  const markAsDelivered = async (orderId: string) => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "delivered", updated_at: new Date().toISOString() } : order,
        ),
      )

      toast({
        title: "Pedido Entregado",
        description: "El pedido se marcó como entregado exitosamente",
      })
    } catch (error) {
      console.error("Error marking order as delivered:", error)
      toast({
        title: "Error",
        description: "No se pudo marcar el pedido como entregado",
        variant: "destructive",
      })
    }
  }

  const confirmOrder = async (orderId: string) => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "confirmed", updated_at: new Date().toISOString() } : order,
        ),
      )

      toast({
        title: "Pedido Confirmado",
        description: "El pedido se confirmó exitosamente",
      })
    } catch (error) {
      console.error("Error confirming order:", error)
      toast({
        title: "Error",
        description: "No se pudo confirmar el pedido",
        variant: "destructive",
      })
    }
  }

  const cancelOrder = async (orderId: string) => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled", updated_at: new Date().toISOString() } : order,
        ),
      )

      setCancelDialogOpen(null)
      toast({
        title: "Pedido Cancelado",
        description: "El pedido se canceló exitosamente",
      })
    } catch (error) {
      console.error("Error cancelling order:", error)
      toast({
        title: "Error",
        description: "No se pudo cancelar el pedido",
        variant: "destructive",
      })
    }
  }

  const deleteOrder = async (orderId: string) => {
    try {
      setOrders((prev) => prev.filter((order) => order.id !== orderId))

      setDeleteDialogOpen(null)
      toast({
        title: "Pedido Eliminado",
        description: "El pedido se eliminó permanentemente",
      })
    } catch (error) {
      console.error("Error deleting order:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el pedido",
        variant: "destructive",
      })
    }
  }

  const handleOrderUpdate = (orderId: string, updates: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, ...updates, updated_at: new Date().toISOString() } : order,
      ),
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "confirmed":
        return "Confirmado"
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const getProductTypeIcon = (type: string) => {
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

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false
    if (selectedClient !== "all" && order.user_id !== selectedClient) return false
    if (filterDate && format(new Date(order.created_at), "yyyy-MM-dd") !== format(filterDate, "yyyy-MM-dd"))
      return false
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#1B4965]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B4965]">${salesStats?.total_sales?.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground">Ingresos totales</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B4965]">{salesStats?.total_orders || 0}</div>
            <p className="text-xs text-muted-foreground">Órdenes procesadas</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B4965]">
              ${Math.round(salesStats?.avg_order_value || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Por pedido</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B4965]">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Usuarios registrados</p>
          </CardContent>
        </Card>
      </div>

      {/* Custom Tab Navigation */}
      <div className="space-y-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "orders"
                  ? "border-[#1B4965] text-[#1B4965]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Gestión de Pedidos
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "products"
                  ? "border-[#1B4965] text-[#1B4965]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Package className="h-4 w-4" />
              Gestión de Productos
            </button>
            <button
              onClick={() => setActiveTab("sales")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "sales"
                  ? "border-[#1B4965] text-[#1B4965]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Reportes y Estadísticas
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros de Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Estado del Pedido</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="delivered">Entregado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Cliente</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los clientes</SelectItem>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.full_name || client.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Fecha</Label>
                    <Popover open={filterDateOpen} onOpenChange={setFilterDateOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filterDate ? format(filterDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filterDate}
                          onSelect={(date) => {
                            setFilterDate(date)
                            setFilterDateOpen(false)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setFilterStatus("all")
                        setSelectedClient("all")
                        setFilterDate(undefined)
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Limpiar Filtros
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay pedidos</h3>
                    <p className="text-gray-500">
                      {filterStatus !== "all" || selectedClient !== "all" || filterDate
                        ? "No se encontraron pedidos con los filtros aplicados"
                        : "Aún no hay pedidos en el sistema"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-[#1B4965]">Pedido #{order.id.slice(0, 1)}</h3>
                            <p className="text-sm text-gray-600">
                              {order.profiles?.full_name || order.profiles?.email}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} border`}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#1B4965] text-lg">${order.total.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">
                            {format(new Date(order.created_at), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {order.order_items.map((item) => (
                            <span
                              key={item.id}
                              className="text-sm bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
                            >
                              {getProductTypeIcon(item.products.type)} {item.products.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {/* Ver Detalles - Siempre disponible */}
                          <OrderActions order={order} onOrderUpdate={handleOrderUpdate} />

                          {/* Botones específicos según el estado */}
                          {order.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => confirmOrder(order.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Confirmar
                              </Button>

                              <Button
                                size="sm"
                                onClick={() => markAsDelivered(order.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Marcar Entregado
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setCancelDialogOpen(order.id)}
                                className="text-orange-600 hover:text-orange-700 border-orange-200 hover:bg-orange-50"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            </>
                          )}

                          {order.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => markAsDelivered(order.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Marcar Entregado
                            </Button>
                          )}

                          {/* Eliminar - Disponible para todos los estados */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(order.id)}
                            className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-4">
            <ProductManagement />
          </div>
        )}

        {activeTab === "sales" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reportes y Estadísticas Detalladas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Filtros de Reportes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Fecha Inicio</Label>
                      <Popover open={reportDateOpen} onOpenChange={setReportDateOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {reportStartDate ? format(reportStartDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={reportStartDate}
                            onSelect={(date) => {
                              setReportStartDate(date)
                              setReportDateOpen(false)
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>Cliente</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos los clientes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.full_name || client.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button onClick={loadSalesStats} className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualizar Datos
                      </Button>
                    </div>
                  </div>

                  {/* Métricas Detalladas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-[#1B4965]">
                          ${salesStats?.total_sales?.toLocaleString() || "0"}
                        </div>
                        <p className="text-sm text-gray-600">Ingresos Totales</p>
                        <p className="text-xs text-green-600 mt-1">+15% vs mes anterior</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-[#1B4965]">{salesStats?.total_orders || 0}</div>
                        <p className="text-sm text-gray-600">Pedidos Procesados</p>
                        <p className="text-xs text-green-600 mt-1">+8% vs mes anterior</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-[#1B4965]">{salesStats?.top_product_type || "N/A"}</div>
                        <p className="text-sm text-gray-600">Producto Más Vendido</p>
                        <p className="text-xs text-blue-600 mt-1">Categoría líder</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Análisis por Categoría */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Análisis por Categoría de Producto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {["vuelo", "hospedaje", "auto", "paquete"].map((category) => {
                          const categoryOrders = orders.filter((order) =>
                            order.order_items.some((item) => item.products.type === category),
                          )
                          const categoryRevenue = categoryOrders.reduce((sum, order) => sum + order.total, 0)
                          const percentage = salesStats?.total_sales
                            ? (categoryRevenue / salesStats.total_sales) * 100
                            : 0

                          return (
                            <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getProductTypeIcon(category)}</span>
                                <div>
                                  <div className="font-medium capitalize">{category}</div>
                                  <div className="text-sm text-gray-500">{categoryOrders.length} pedidos</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-[#1B4965]">${categoryRevenue.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">{percentage.toFixed(1)}% del total</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Clientes Top */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Clientes con Más Pedidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {clients.slice(0, 5).map((client, index) => {
                          const clientOrders = orders.filter((order) => order.user_id === client.id)
                          const clientRevenue = clientOrders.reduce((sum, order) => sum + order.total, 0)

                          return (
                            <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#1B4965] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium">{client.full_name || client.email}</div>
                                  <div className="text-sm text-gray-500">{clientOrders.length} pedidos</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-[#1B4965]">${clientRevenue.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">Total gastado</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Reporte Completo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Diálogos de Confirmación */}
      <AlertDialog open={cancelDialogOpen !== null} onOpenChange={() => setCancelDialogOpen(null)}>
        <AlertDialogContent className="sm:max-w-[425px] bg-white border-2 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">¿Cancelar pedido?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              El pedido será marcado como cancelado pero permanecerá en el sistema para referencia.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              onClick={() => setCancelDialogOpen(null)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
            >
              No, mantener
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancelDialogOpen && cancelOrder(cancelDialogOpen)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Sí, cancelar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen !== null} onOpenChange={() => setDeleteDialogOpen(null)}>
        <AlertDialogContent className="sm:max-w-[425px] bg-white border-2 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              ¿Eliminar pedido permanentemente?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Esta acción no se puede deshacer. El pedido será eliminado permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              onClick={() => setDeleteDialogOpen(null)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
            >
              No, mantener
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialogOpen && deleteOrder(deleteDialogOpen)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sí, eliminar permanentemente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
