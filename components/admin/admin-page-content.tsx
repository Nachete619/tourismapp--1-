"use client"
import { Button } from "@/components/ui/button"
import { Shield, Database } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { AdminDashboard } from "./admin-dashboard"
import { isSupabaseAvailable } from "@/lib/supabase"

export function AdminPageContent() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1B4965] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1B4965] mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 mb-6">Necesitas iniciar sesión como administrador</p>
          <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white">
            <a href="/auth/login">Iniciar Sesión</a>
          </Button>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h2>
          <p className="text-gray-600 mb-6">No tienes permisos de administrador</p>
          <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white">
            <a href="/">Volver al Inicio</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B4965] mb-4">Panel de Administración</h1>
        <p className="text-gray-600">
          Gestiona productos, pedidos y usuarios de la plataforma. Aquí puedes crear, modificar y eliminar productos,
          así como administrar todos los pedidos de los clientes.
        </p>
      </div>

      {!isSupabaseAvailable ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Panel de Administración</h3>
          <p className="text-gray-500 mb-4">
            Configura Supabase para acceder a todas las funcionalidades administrativas:
          </p>
          <div className="text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
            <p>• Gestión completa de productos (crear, editar, eliminar)</p>
            <p>• Control de pedidos y órdenes de clientes</p>
            <p>• Marcar pedidos como entregados</p>
            <p>• Mover pedidos al histórico</p>
            <p>• Reportes y estadísticas de ventas</p>
          </div>
        </div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  )
}
