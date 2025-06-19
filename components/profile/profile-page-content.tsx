"use client"
import { Button } from "@/components/ui/button"
import { User, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function ProfilePageContent() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1B4965] mb-4">Inicia sesión para ver tu perfil</h2>
          <p className="text-gray-600 mb-6">Necesitas una cuenta para acceder a tu perfil</p>
          <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3] text-white">
            <a href="/auth/login">Iniciar Sesión</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B4965] mb-4">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
      </div>

      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Configuración de Perfil</h3>
        <p className="text-gray-500">Configura Supabase para gestionar tu perfil y preferencias</p>
      </div>
    </div>
  )
}
