"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, Download, Eye, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Order, OrderItem, Product, Profile } from "@/types/database"

interface OrderWithDetails extends Order {
  order_items: (OrderItem & { products: Product })[]
  profiles: Profile
}

interface OrderActionsProps {
  order: OrderWithDetails
  onOrderUpdate: (orderId: string, updates: Partial<Order>) => void
}

export function OrderActions({ order, onOrderUpdate }: OrderActionsProps) {
  const [emailDialog, setEmailDialog] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [emailTemplate, setEmailTemplate] = useState("custom")
  const [detailsDialog, setDetailsDialog] = useState(false)
  const { toast } = useToast()

  const handleSendEmail = async () => {
    if (!emailSubject || !emailBody) {
      toast({
        title: "Error",
        description: "Por favor completa el asunto y el mensaje",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Email Enviado",
        description: `Email enviado exitosamente a ${order.profiles?.email}`,
      })

      setEmailDialog(false)
      setEmailSubject("")
      setEmailBody("")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el email",
        variant: "destructive",
      })
    }
  }

  const handleTemplateChange = (template: string) => {
    setEmailTemplate(template)

    switch (template) {
      case "confirmation":
        setEmailSubject(`Confirmación de Pedido #${order.id.slice(0, 8)}`)
        setEmailBody(`Estimado/a ${order.profiles?.full_name || "Cliente"},

Su pedido #${order.id.slice(0, 8)} ha sido confirmado exitosamente.

Detalles del pedido:
- Total: $${order.total.toLocaleString()}
- Estado: ${getStatusText(order.status)}
- Fecha: ${new Date(order.created_at).toLocaleDateString()}

Productos incluidos:
${order.order_items.map((item) => `- ${item.products.name} (Cantidad: ${item.quantity})`).join("\n")}

Gracias por confiar en nosotros.

Saludos cordiales,
Equipo de TurismoApp`)
        break
      case "delivery":
        setEmailSubject(`Pedido Entregado #${order.id.slice(0, 8)}`)
        setEmailBody(`Estimado/a ${order.profiles?.full_name || "Cliente"},

Nos complace informarle que su pedido #${order.id.slice(0, 8)} ha sido entregado exitosamente.

Esperamos que disfrute de su experiencia. Si tiene alguna consulta o necesita asistencia, no dude en contactarnos.

¡Gracias por elegirnos!

Saludos cordiales,
Equipo de TurismoApp`)
        break
      case "cancellation":
        setEmailSubject(`Cancelación de Pedido #${order.id.slice(0, 8)}`)
        setEmailBody(`Estimado/a ${order.profiles?.full_name || "Cliente"},

Lamentamos informarle que su pedido #${order.id.slice(0, 8)} ha sido cancelado.

Si tiene alguna pregunta sobre esta cancelación o desea realizar un nuevo pedido, por favor contáctenos.

Disculpe las molestias ocasionadas.

Saludos cordiales,
Equipo de TurismoApp`)
        break
      default:
        setEmailSubject("")
        setEmailBody("")
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

  const generateInvoice = () => {
    // Simulate invoice generation
    const invoiceData = {
      orderNumber: order.id.slice(0, 8),
      customerName: order.profiles?.full_name || order.profiles?.email,
      customerEmail: order.profiles?.email,
      orderDate: new Date(order.created_at).toLocaleDateString(),
      items: order.order_items,
      total: order.total,
      status: order.status,
    }

    // Create a simple text invoice
    const invoiceText = `
FACTURA - TURISMOAPP
====================

Número de Pedido: #${invoiceData.orderNumber}
Cliente: ${invoiceData.customerName}
Email: ${invoiceData.customerEmail}
Fecha: ${invoiceData.orderDate}
Estado: ${getStatusText(order.status)}

PRODUCTOS:
${invoiceData.items
  .map(
    (item) =>
      `- ${item.products.name}
    Cantidad: ${item.quantity}
    Precio unitario: $${item.price.toLocaleString()}
    Subtotal: $${(item.price * item.quantity).toLocaleString()}`,
  )
  .join("\n\n")}

TOTAL: $${invoiceData.total.toLocaleString()}

Gracias por su compra.
    `

    // Download as text file
    const blob = new Blob([invoiceText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `factura-${invoiceData.orderNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Factura Generada",
      description: "La factura se descargó exitosamente",
    })
  }

  return (
    <div className="flex space-x-2">
      {/* Ver Detalles */}
      <Dialog open={detailsDialog} onOpenChange={setDetailsDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalles
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-2 shadow-2xl z-[100]">
          <DialogHeader className="border-b pb-4 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#1B4965]">
                Detalles del Pedido #{order.id.slice(0, 8)}
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setDetailsDialog(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6 p-4 bg-white">
            {/* Información del Cliente y Pedido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-[#1B4965]">Información del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Nombre:</span>
                    <span className="ml-2">{order.profiles?.full_name || "No especificado"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2">{order.profiles?.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">ID Cliente:</span>
                    <span className="ml-2">{order.user_id.slice(0, 8)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-[#1B4965]">Información del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700">Estado:</span>
                    <Badge className={`ml-2 ${getStatusColor(order.status)} border`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fecha:</span>
                    <span className="ml-2">{new Date(order.created_at).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Última actualización:</span>
                    <span className="ml-2">{new Date(order.updated_at).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Productos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-[#1B4965]">Productos del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#1B4965]">{item.products.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.products.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Código: {item.products.code}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {item.products.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Cantidad:</span>
                          <span className="ml-1 font-medium">{item.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Precio unitario:</span>
                          <span className="ml-1 font-medium">${item.price.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Subtotal:</span>
                          <span className="ml-1 font-bold text-[#1B4965]">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Total */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Total del Pedido:</span>
                  <span className="text-2xl font-bold text-[#1B4965]">${order.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <div className="flex justify-end space-x-3 pt-4 border-t bg-white">
              <Button onClick={generateInvoice} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Descargar Factura
              </Button>
              <Button onClick={() => setEmailDialog(true)} className="bg-[#1B4965] hover:bg-[#5FA8D3]">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enviar Email */}
      <Dialog open={emailDialog} onOpenChange={setEmailDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-1" />
            Enviar Email
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-2 shadow-2xl z-[100]">
          <DialogHeader className="border-b pb-4 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#1B4965]">Enviar Email al Cliente</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setEmailDialog(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6 p-4 bg-white">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Destinatario</Label>
              <Input value={order.profiles?.email || ""} disabled className="bg-gray-50 border-gray-200" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Plantilla de Email</Label>
              <Select value={emailTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Email Personalizado</SelectItem>
                  <SelectItem value="confirmation">Confirmación de Pedido</SelectItem>
                  <SelectItem value="delivery">Pedido Entregado</SelectItem>
                  <SelectItem value="cancellation">Cancelación de Pedido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Asunto</Label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Asunto del email..."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Mensaje</Label>
              <Textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Escriba su mensaje aquí..."
                rows={10}
                className="w-full resize-none"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t bg-white">
              <Button variant="outline" onClick={() => setEmailDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSendEmail} className="bg-[#1B4965] hover:bg-[#5FA8D3]">
                <Send className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
