import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Search } from "lucide-react"
import { SearchBar } from "@/components/search/search-bar"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1B4965] via-[#5FA8D3] to-[#62B6CB] text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
            Descubre el Mundo
            <span className="block text-[#CAE9FF] animate-in fade-in slide-in-from-right duration-1000 delay-300">
              con TurismoApp
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#CAE9FF] max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            Tu agencia de turismo de confianza. Vuelos, paquetes, autos y experiencias únicas te esperan.
          </p>

          {/* Barra de búsqueda mejorada */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
            <SearchBar />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-900">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#1B4965] hover:bg-[#CAE9FF] hover:text-[#1B4965] font-bold text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-white"
            >
              <Link href="/servicios">
                <Search className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:scale-110" />
                Explorar Servicios
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[#1B4965] font-bold text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <Link href="/paquetes">
                <Package className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:scale-110" />
                Ver Paquetes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
