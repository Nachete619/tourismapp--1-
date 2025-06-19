import Link from "next/link"
import { Plane, Building, Car, Package } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Plane,
      title: "Vuelos",
      description:
        "Encuentra los mejores vuelos a destinos nacionales e internacionales con las mejores tarifas del mercado.",
      href: "/vuelos",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      icon: Building,
      title: "Hospedaje",
      description: "Hoteles, resorts y alojamientos únicos para que tu estadía sea perfecta en cualquier destino.",
      href: "/hospedaje",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      icon: Car,
      title: "Autos",
      description: "Alquila el vehículo perfecto para tu viaje. Desde económicos hasta vehículos de lujo.",
      href: "/autos",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      icon: Package,
      title: "Paquetes",
      description: "Experiencias completas que incluyen vuelo, hospedaje y actividades para un viaje inolvidable.",
      href: "/paquetes",
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1B4965] mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre todo lo que necesitas para tu próximo viaje. Desde vuelos hasta experiencias completas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href} className="group block">
              <div
                className={`bg-gradient-to-br ${service.color} ${service.hoverColor} rounded-2xl p-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl transform`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 rounded-full p-4 mb-6 group-hover:bg-white/30 transition-colors duration-300">
                    <service.icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white/90 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                  <div className="mt-6 inline-flex items-center text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    Explorar →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
