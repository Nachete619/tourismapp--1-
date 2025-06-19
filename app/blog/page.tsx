import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Los 10 Destinos Más Populares de 2025",
      excerpt:
        "Descubre cuáles son los destinos que están marcando tendencia este año y por qué deberías considerarlos para tu próximo viaje.",
      author: "María González",
      date: "15 de Enero, 2025",
      category: "Destinos",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Consejos para Viajar con Presupuesto Limitado",
      excerpt:
        "Aprende cómo maximizar tu experiencia de viaje sin gastar una fortuna. Tips prácticos para ahorrar en vuelos, hospedaje y actividades.",
      author: "Carlos Rodríguez",
      date: "12 de Enero, 2025",
      category: "Consejos",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "Guía Completa para Viajar a Europa en Primavera",
      excerpt:
        "Todo lo que necesitas saber para planificar tu viaje a Europa durante la primavera: clima, festivales, y los mejores lugares para visitar.",
      author: "Ana Martínez",
      date: "10 de Enero, 2025",
      category: "Guías",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "10 min",
    },
    {
      id: 4,
      title: "Documentación Necesaria para Viajar al Exterior",
      excerpt:
        "Una guía completa sobre pasaportes, visas y otros documentos esenciales para tus viajes internacionales.",
      author: "Luis Fernández",
      date: "8 de Enero, 2025",
      category: "Documentación",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "6 min",
    },
    {
      id: 5,
      title: "Las Mejores Apps de Viaje para 2025",
      excerpt:
        "Descubre las aplicaciones móviles más útiles para planificar, organizar y disfrutar al máximo tus viajes.",
      author: "Sofía López",
      date: "5 de Enero, 2025",
      category: "Tecnología",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "4 min",
    },
    {
      id: 6,
      title: "Turismo Sustentable: Cómo Viajar Responsablemente",
      excerpt:
        "Aprende sobre prácticas de turismo sustentable y cómo puedes contribuir a preservar los destinos que visitas.",
      author: "Diego Morales",
      date: "3 de Enero, 2025",
      category: "Sustentabilidad",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "8 min",
    },
  ]

  const categories = ["Todos", "Destinos", "Consejos", "Guías", "Documentación", "Tecnología", "Sustentabilidad"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1B4965] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              TurismoApp
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/vuelos" className="hover:text-[#CAE9FF]">
              Vuelos
            </Link>
            <Link href="/hospedaje" className="hover:text-[#CAE9FF]">
              Hospedaje
            </Link>
            <Link href="/autos" className="hover:text-[#CAE9FF]">
              Autos
            </Link>
            <Link href="/paquetes" className="hover:text-[#CAE9FF]">
              Paquetes
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1B4965] to-[#5FA8D3] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog de Viajes</h1>
          <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">
            Consejos, guías y las últimas tendencias en turismo para inspirar tu próxima aventura
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Búsqueda y Filtros */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#1B4965] text-white px-6 py-2 rounded-lg hover:bg-[#5FA8D3] transition-colors">
                Buscar
              </button>
            </div>
          </div>

          {/* Categorías */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full transition-colors ${
                  index === 0
                    ? "bg-[#1B4965] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-[#CAE9FF] hover:text-[#1B4965]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Artículo Destacado */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-8">Artículo Destacado</h2>
          <div className="bg-gradient-to-r from-[#CAE9FF] to-[#5FA8D3] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <span className="inline-block bg-[#1B4965] text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Destacado
                </span>
                <h3 className="text-3xl font-bold text-[#1B4965] mb-4">
                  Cómo Planificar el Viaje Perfecto: Guía Completa 2025
                </h3>
                <p className="text-[#1B4965] text-lg mb-6 leading-relaxed">
                  Una guía exhaustiva con todos los secretos para planificar un viaje inolvidable, desde la elección del
                  destino hasta los últimos detalles del itinerario.
                </p>
                <div className="flex items-center text-[#1B4965] mb-6">
                  <span className="mr-4">Por María González</span>
                  <span className="mr-4">•</span>
                  <span className="mr-4">20 de Enero, 2025</span>
                  <span className="mr-4">•</span>
                  <span>15 min de lectura</span>
                </div>
                <button className="bg-[#1B4965] text-white px-8 py-3 rounded-lg hover:bg-[#5FA8D3] transition-colors font-semibold">
                  Leer Artículo
                </button>
              </div>
              <div className="h-64 lg:h-auto bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagen del artículo destacado</span>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Artículos */}
        <section>
          <h2 className="text-3xl font-bold text-[#1B4965] mb-8">Últimos Artículos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Imagen del artículo</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-[#CAE9FF] text-[#1B4965] px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1B4965] mb-3 hover:text-[#5FA8D3] transition-colors cursor-pointer">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Por {post.author}</span>
                    <span>{post.date}</span>
                  </div>

                  <button className="w-full mt-4 bg-[#1B4965] text-white py-2 px-4 rounded-lg hover:bg-[#5FA8D3] transition-colors">
                    Leer Más
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-16 bg-[#1B4965] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Suscríbete a Nuestro Newsletter</h2>
          <p className="text-[#CAE9FF] text-lg mb-8 max-w-2xl mx-auto">
            Recibe los mejores consejos de viaje, ofertas exclusivas y las últimas tendencias directamente en tu email.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#5FA8D3]"
            />
            <button className="bg-[#5FA8D3] text-white px-6 py-3 rounded-lg hover:bg-[#62B6CB] transition-colors font-semibold">
              Suscribirse
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1B4965] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[#CAE9FF]">
              © 2025 TurismoApp - Olimpíada Nacional de Programación ETP. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
