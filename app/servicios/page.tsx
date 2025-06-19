import Link from "next/link"

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1B4965] mb-4">Nuestros Servicios</h1>
        <p className="text-gray-600 mb-8">Descubre todo lo que necesitas para tu próximo viaje</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/vuelos" className="block">
            <div className="bg-blue-500 rounded-lg p-6 text-white hover:shadow-lg transition-all">
              <h2 className="text-2xl font-bold mb-4">Vuelos</h2>
              <p className="mb-4">
                Encuentra los mejores vuelos a destinos nacionales e internacionales con las mejores tarifas del
                mercado.
              </p>
              <span className="inline-flex items-center text-sm font-semibold">Explorar →</span>
            </div>
          </Link>

          <Link href="/hospedaje" className="block">
            <div className="bg-green-500 rounded-lg p-6 text-white hover:shadow-lg transition-all">
              <h2 className="text-2xl font-bold mb-4">Hospedaje</h2>
              <p className="mb-4">
                Hoteles, resorts y alojamientos únicos para que tu estadía sea perfecta en cualquier destino.
              </p>
              <span className="inline-flex items-center text-sm font-semibold">Explorar →</span>
            </div>
          </Link>

          <Link href="/autos" className="block">
            <div className="bg-purple-500 rounded-lg p-6 text-white hover:shadow-lg transition-all">
              <h2 className="text-2xl font-bold mb-4">Alquiler de Autos</h2>
              <p className="mb-4">
                Alquila el vehículo perfecto para tu viaje. Desde económicos hasta vehículos de lujo.
              </p>
              <span className="inline-flex items-center text-sm font-semibold">Explorar →</span>
            </div>
          </Link>

          <Link href="/paquetes" className="block">
            <div className="bg-orange-500 rounded-lg p-6 text-white hover:shadow-lg transition-all">
              <h2 className="text-2xl font-bold mb-4">Paquetes</h2>
              <p className="mb-4">
                Experiencias completas que incluyen vuelo, hospedaje y actividades para un viaje inolvidable.
              </p>
              <span className="inline-flex items-center text-sm font-semibold">Explorar →</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-[#1B4965] text-white py-8 mt-12">
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
