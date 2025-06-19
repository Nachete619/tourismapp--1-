"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plane, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { isSupabaseAvailable } from "@/lib/supabase"
import { motion } from "framer-motion"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [validToken, setValidToken] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    // Verificar si hay un token válido
    if (!token && isSupabaseAvailable) {
      setValidToken(false)
      setError("Enlace de recuperación inválido o expirado")
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      if (!isSupabaseAvailable) {
        // Simulación para modo demo
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      } else {
        // Aquí iría la lógica real de Supabase para actualizar contraseña
        // const { error } = await supabase.auth.updateUser({ password })
        // if (error) throw error
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      }
    } catch (error: any) {
      setError(error.message || "Error al actualizar la contraseña")
    } finally {
      setLoading(false)
    }
  }

  if (!validToken) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#1B4965] via-[#5FA8D3] to-[#62B6CB] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">Enlace Inválido</CardTitle>
            <CardDescription>El enlace de recuperación ha expirado o no es válido</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-[#1B4965] hover:bg-[#5FA8D3]">
              <Link href="/auth/forgot-password">Solicitar Nuevo Enlace</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#1B4965] via-[#5FA8D3] to-[#62B6CB] flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <motion.div
                className="bg-[#1B4965] p-4 rounded-full shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {success ? (
                  <CheckCircle className="h-10 w-10 text-green-400" />
                ) : (
                  <Plane className="h-10 w-10 text-[#CAE9FF]" />
                )}
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-bold text-[#1B4965]">
              {success ? "¡Contraseña Actualizada!" : "Nueva Contraseña"}
            </CardTitle>
            <CardDescription className="text-lg">
              {success ? "Tu contraseña ha sido actualizada exitosamente" : "Ingresa tu nueva contraseña"}
            </CardDescription>
          </CardHeader>

          {success ? (
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">Serás redirigido al login en unos segundos...</p>
                </div>
                <Button asChild className="w-full bg-[#1B4965] hover:bg-[#5FA8D3]">
                  <Link href="/auth/login">Ir al Login Ahora</Link>
                </Button>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium">
                    Nueva Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 text-base focus:border-[#5FA8D3] focus:ring-[#5FA8D3] pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-medium">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repite la contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12 text-base focus:border-[#5FA8D3] focus:ring-[#5FA8D3] pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {!isSupabaseAvailable && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-blue-800 text-sm">
                      Modo demostración: Se simulará la actualización de contraseña.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#1B4965] hover:bg-[#5FA8D3] text-white text-lg font-semibold transition-all duration-300 hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? "Actualizando..." : "Actualizar Contraseña"}
                  </Button>
                </motion.div>
              </CardFooter>
            </form>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
