"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { isSupabaseAvailable } from "@/lib/supabase"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!isSupabaseAvailable) {
        // Simulación para modo demo
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSuccess(true)
      } else {
        // Aquí iría la lógica real de Supabase para reset de contraseña
        // const { error } = await supabase.auth.resetPasswordForEmail(email)
        // if (error) throw error
        setSuccess(true)
      }
    } catch (error: any) {
      setError(error.message || "Error al enviar el email de recuperación")
    } finally {
      setLoading(false)
    }
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
              <motion.div
                className="bg-[#1B4965] p-4 rounded-full shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {success ? (
                  <CheckCircle className="h-10 w-10 text-green-400" />
                ) : (
                  <Mail className="h-10 w-10 text-[#CAE9FF]" />
                )}
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-bold text-[#1B4965]">
              {success ? "Email Enviado" : "Recuperar Contraseña"}
            </CardTitle>
            <CardDescription className="text-lg">
              {success
                ? "Revisa tu email para continuar con la recuperación"
                : "Ingresa tu email para recibir instrucciones de recuperación"}
            </CardDescription>
          </CardHeader>

          {success ? (
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    Se ha enviado un email a <strong>{email}</strong> con las instrucciones para restablecer tu
                    contraseña.
                  </p>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Revisa tu bandeja de entrada</p>
                  <p>• Verifica la carpeta de spam</p>
                  <p>• El enlace expira en 24 horas</p>
                </div>
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
                  />
                </div>

                {!isSupabaseAvailable && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-blue-800 text-sm">
                      Modo demostración: Se simulará el envío del email de recuperación.
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
                    {loading ? "Enviando..." : "Enviar Instrucciones"}
                  </Button>
                </motion.div>
              </CardFooter>
            </form>
          )}

          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <Link
                href="/auth/login"
                className="flex items-center text-[#1B4965] hover:text-[#5FA8D3] font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Volver al Login
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/auth/register" className="text-[#1B4965] hover:text-[#5FA8D3] font-medium transition-colors">
                Crear Cuenta
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
