"use client"

import { useEffect, useState } from "react"
import { Users, Package, Plane, Star } from "lucide-react"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"

export function StatsSection() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    rating: 4.8,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        // Check if Supabase is configured
        if (!isSupabaseAvailable) {
          console.warn("Supabase not configured, using mock stats")
          setStats({
            users: 1250,
            products: 45,
            orders: 890,
            rating: 4.8,
          })
          return
        }

        const [usersResult, productsResult, ordersResult] = await Promise.all([
          supabase.from("profiles").select("id", { count: "exact" }),
          supabase.from("products").select("id", { count: "exact" }),
          supabase.from("orders").select("id", { count: "exact" }),
        ])

        setStats({
          users: usersResult.count || 0,
          products: productsResult.count || 0,
          orders: ordersResult.count || 0,
          rating: 4.8,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        // Fallback to mock data
        setStats({
          users: 1250,
          products: 45,
          orders: 890,
          rating: 4.8,
        })
      }
    }

    fetchStats()
  }, [])

  const statItems = [
    {
      icon: Users,
      value: stats.users.toLocaleString(),
      label: "Clientes Satisfechos",
      color: "text-[#1B4965]",
      bgColor: "bg-[#CAE9FF]",
      hoverBg: "group-hover:bg-[#5FA8D3]",
    },
    {
      icon: Package,
      value: stats.products.toLocaleString(),
      label: "Productos Disponibles",
      color: "text-[#5FA8D3]",
      bgColor: "bg-[#CAE9FF]",
      hoverBg: "group-hover:bg-[#62B6CB]",
    },
    {
      icon: Plane,
      value: stats.orders.toLocaleString(),
      label: "Viajes Realizados",
      color: "text-[#62B6CB]",
      bgColor: "bg-[#CAE9FF]",
      hoverBg: "group-hover:bg-[#1B4965]",
    },
    {
      icon: Star,
      value: stats.rating.toString(),
      label: "Calificación Promedio",
      color: "text-[#1B4965]",
      bgColor: "bg-[#CAE9FF]",
      hoverBg: "group-hover:bg-yellow-400",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-4 animate-in fade-in slide-in-from-bottom duration-1000">
            Nuestros Números
          </h2>
          <p className="text-gray-600 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            La confianza de miles de viajeros nos respalda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 ${item.bgColor} ${item.hoverBg} rounded-full mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
              >
                <item.icon
                  className={`h-8 w-8 ${item.color} group-hover:text-white transition-all duration-300 group-hover:scale-110`}
                />
              </div>
              <div className="text-3xl font-bold text-[#1B4965] mb-2 group-hover:text-[#5FA8D3] transition-colors duration-300">
                {item.value}
              </div>
              <div className="text-gray-600 group-hover:text-[#1B4965] transition-colors duration-300">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
