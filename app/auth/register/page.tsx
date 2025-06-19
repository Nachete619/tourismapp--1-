"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plane, Eye, EyeOff, CheckCircle, Info } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { isSupabaseAvailable } from "@/lib/supabase"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

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
      await signUp(email, password, fullName)
      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B4965] via-[#5FA8D3] to-[#62B6CB] flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#1B4965] mb-4">¡Registro Exitoso!</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Te hemos enviado un email de confirmación. Por favor, verifica tu cuenta.
              </p>
              <p className="text-sm text-gray-500">Serás redirigido al login en unos segundos...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#1B4965] via-[#5FA8D3] to-[#62B6CB] flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Same animated background elements as login */}
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
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
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
              <div className="bg-[#1B4965] p-4 rounded-full shadow-lg">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Plane className="h-10 w-10 text-[#CAE9FF]" />
                </motion.div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-[#1B4965]">Crear Cuenta</CardTitle>
            <CardDescription className="text-lg">Únete a TurismoApp y comienza tu aventura</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!isSupabaseAvailable && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 text-sm">
                    Supabase no está configurado. Esta es una versión de demostración con funcionalidades limitadas.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium">
                  Nombre Completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 text-base focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                  disabled={!isSupabaseAvailable}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-base focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                  disabled={!isSupabaseAvailable}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">
                  Contraseña
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
                    disabled={!isSupabaseAvailable}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!isSupabaseAvailable}
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
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-12 text-base focus:border-[#5FA8D3] focus:ring-[#5FA8D3] pr-12"
                    disabled={!isSupabaseAvailable}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={!isSupabaseAvailable}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#1B4965] hover:bg-[#5FA8D3] text-white text-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  disabled={loading || !isSupabaseAvailable}
                >
                  {loading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </motion.div>

              <div className="text-center text-base text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#1B4965] hover:text-[#5FA8D3] font-semibold transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  )
}
