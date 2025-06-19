"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Settings, X, Info } from "lucide-react"
import { isSupabaseAvailable } from "@/lib/supabase"

export function ConfigNotice() {
  const [isVisible, setIsVisible] = useState(true)

  if (isSupabaseAvailable || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Alert className="border-blue-200 bg-blue-50 shadow-lg">
        <Info className="h-4 w-4 text-blue-600" />
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <AlertTitle className="text-blue-800 text-sm">Modo Demostración</AlertTitle>
            <AlertDescription className="text-blue-700 text-xs">
              Usando datos de prueba.{" "}
              <a href="/setup" className="underline font-medium">
                Configurar Supabase
              </a>
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </Alert>
    </div>
  )
}

export function SetupInstructions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-[#1B4965]">
            <Database className="h-6 w-6 mr-2" />
            Configuración de Supabase
          </CardTitle>
          <CardDescription>
            Para usar todas las funcionalidades de la aplicación, necesitas configurar Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Pasos para configurar:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                Crea un proyecto en{" "}
                <a
                  href="https://supabase.com"
                  className="text-[#1B4965] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Supabase
                </a>
              </li>
              <li>Copia la URL del proyecto y la clave anónima</li>
              <li>En Vercel, ve a Settings → Environment Variables y agrega:</li>
            </ol>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div>NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima</div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">✅ Funcionalidades disponibles ahora:</h4>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Navegación completa entre todas las páginas</li>
              <li>Catálogo de productos con filtros</li>
              <li>Carrito de compras funcional</li>
              <li>Diseño responsivo completo</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">🔒 Funcionalidades que requieren configuración:</h4>
            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
              <li>Autenticación de usuarios</li>
              <li>Base de datos persistente</li>
              <li>Creación y gestión de pedidos</li>
              <li>Panel de administración</li>
              <li>Estadísticas en tiempo real</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">🚀 Para desplegar en Vercel:</h4>
            <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
              <li>Configura las variables de entorno en Vercel</li>
              <li>Ejecuta los scripts SQL en tu proyecto de Supabase</li>
              <li>Redespliega la aplicación</li>
              <li>¡Listo! Tendrás la aplicación completamente funcional</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
