"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Plane,
  Building,
  Car,
  Package,
  Star,
  Users,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
  Globe,
  Heart,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/layout/main-layout"

const services = [
  {
    title: "Vuelos",
    description:
      "Encuentra los mejores vuelos a destinos nacionales e internacionales con las mejores tarifas del mercado.",
    href: "/vuelos",
    icon: Plane,
    color: "from-blue-500 to-blue-600",
    delay: 0.1,
  },
  {
    title: "Hospedaje",
    description: "Hoteles, resorts y alojamientos únicos para que tu estadía sea perfecta en cualquier destino.",
    href: "/hospedaje",
    icon: Building,
    color: "from-green-500 to-green-600",
    delay: 0.2,
  },
  {
    title: "Autos",
    description: "Alquila el vehículo perfecto para tu viaje. Desde económicos hasta vehículos de lujo.",
    href: "/autos",
    icon: Car,
    color: "from-purple-500 to-purple-600",
    delay: 0.3,
  },
  {
    title: "Paquetes",
    description: "Experiencias completas que incluyen vuelo, hospedaje y actividades para un viaje inolvidable.",
    href: "/paquetes",
    icon: Package,
    color: "from-orange-500 to-orange-600",
    delay: 0.4,
  },
]

const stats = [
  { value: "1,250+", label: "Clientes Satisfechos", icon: Users },
  { value: "45+", label: "Productos Disponibles", icon: Package },
  { value: "890+", label: "Viajes Realizados", icon: MapPin },
  { value: "4.8", label: "Calificación Promedio", icon: Star },
]

const features = [
  {
    icon: Globe,
    title: "Destinos Globales",
    description: "Acceso a más de 1000 destinos en todo el mundo",
  },
  {
    icon: Heart,
    title: "Atención Personalizada",
    description: "Servicio 24/7 para hacer tu viaje perfecto",
  },
  {
    icon: Award,
    title: "Mejor Precio Garantizado",
    description: "Encontramos las mejores ofertas para ti",
  },
  {
    icon: Sparkles,
    title: "Experiencias Únicas",
    description: "Actividades exclusivas que recordarás para siempre",
  },
]

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <MainLayout>
      <div className="min-h-screen bg-white overflow-hidden">
        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
            animate={{
              x: mousePosition.x * -0.03,
              y: mousePosition.y * -0.03,
            }}
            transition={{ type: "spring", stiffness: 30, damping: 20 }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
            animate={{
              x: mousePosition.x * 0.025,
              y: mousePosition.y * 0.025,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B4965] via-[#5FA8D3] to-[#62B6CB] overflow-hidden">
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

          <motion.div className="container mx-auto px-4 text-center relative z-10" style={{ y: y1 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-white font-medium">¡Nuevos destinos disponibles!</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Descubre el
                </motion.span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-[#CAE9FF] to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Mundo
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-[#CAE9FF]"
                >
                  con TurismoApp
                </motion.span>
              </h1>

              <motion.p
                className="text-xl md:text-2xl mb-12 text-[#CAE9FF] max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Tu agencia de turismo de confianza. Vuelos, paquetes, autos y experiencias únicas te esperan para crear
                recuerdos inolvidables.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#1B4965] hover:bg-[#CAE9FF] font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300"
                  >
                    <Link href="/servicios" className="flex items-center gap-2">
                      Explorar Servicios
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#1B4965] font-bold text-lg px-8 py-4 rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300"
                  >
                    <Link href="/paquetes" className="flex items-center gap-2">
                      Ver Paquetes
                      <Package className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
          <motion.div className="container mx-auto px-4" style={{ y: y2 }}>
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-[#1B4965] text-white px-4 py-2">Nuestros Servicios</Badge>
              <h2 className="text-5xl font-bold text-[#1B4965] mb-6">
                Todo lo que necesitas
                <span className="block text-[#5FA8D3]">para tu próximo viaje</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Descubre una experiencia completa de viaje con nuestros servicios premium diseñados para hacer realidad
                tus sueños de aventura.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: service.delay, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={service.href}>
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white">
                      <CardContent className="p-0">
                        <div className={`bg-gradient-to-br ${service.color} p-8 text-white relative overflow-hidden`}>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                          <div className="relative z-10">
                            <motion.div
                              className="bg-white/20 rounded-full p-4 mb-6 w-fit"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <service.icon className="h-8 w-8" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-white/90 leading-relaxed mb-6">{service.description}</p>
                            <motion.div
                              className="inline-flex items-center text-sm font-semibold group-hover:gap-3 gap-2 transition-all duration-300"
                              whileHover={{ x: 5 }}
                            >
                              Explorar
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-[#1B4965] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B4965] via-[#5FA8D3] to-[#1B4965] opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                ¿Por qué elegir
                <span className="block text-[#CAE9FF]">TurismoApp?</span>
              </h2>
              <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">
                Nos diferenciamos por nuestro compromiso con la excelencia y la satisfacción del cliente
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-full p-6 mb-6 w-fit mx-auto"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-[#CAE9FF]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#CAE9FF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#CAE9FF]/80 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-[#5FA8D3] text-white px-4 py-2">Nuestros Números</Badge>
              <h2 className="text-4xl font-bold text-[#1B4965] mb-4">
                La confianza de miles
                <span className="block text-[#5FA8D3]">de viajeros nos respalda</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#CAE9FF] to-[#5FA8D3] rounded-full mb-6 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-8 w-8 text-[#1B4965]" />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold text-[#1B4965] mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-[#1B4965] via-[#5FA8D3] to-[#62B6CB] relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-white/5"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                ¿Listo para tu próxima
                <span className="block text-[#CAE9FF]">aventura?</span>
              </h2>
              <p className="text-xl text-[#CAE9FF] mb-12 max-w-2xl mx-auto">
                Únete a miles de viajeros que ya han descubierto el mundo con nosotros. Tu próximo destino te está
                esperando.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#1B4965] hover:bg-[#CAE9FF] font-bold text-lg px-8 py-4 rounded-full shadow-2xl"
                  >
                    <Link href="/auth/register" className="flex items-center gap-2">
                      Comenzar Ahora
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#1B4965] font-bold text-lg px-8 py-4 rounded-full backdrop-blur-sm bg-white/10"
                  >
                    <Link href="/contacto" className="flex items-center gap-2">
                      Contactar
                      <Calendar className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
