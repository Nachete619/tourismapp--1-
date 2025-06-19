import Link from "next/link"
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1B4965] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6 group cursor-pointer">
              <Plane className="h-8 w-8 text-[#CAE9FF] transition-all duration-300 group-hover:text-white group-hover:scale-110" />
              <span className="ml-2 text-2xl font-bold transition-all duration-300 group-hover:text-[#CAE9FF]">
                TurismoApp
              </span>
            </div>
            <p className="text-[#CAE9FF] mb-6 text-lg leading-relaxed transition-colors duration-300 hover:text-white">
              Tu agencia de turismo de confianza. Ofrecemos los mejores paquetes, vuelos y experiencias para hacer de tu
              viaje algo inolvidable. Más de 10 años conectando personas con sus destinos soñados.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-[#CAE9FF] group cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2">
                <Mail className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-lg">info@turismoapp.com</span>
              </div>
              <div className="flex items-center text-[#CAE9FF] group cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2">
                <Phone className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-lg">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center text-[#CAE9FF] group cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2">
                <MapPin className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-lg">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-xl font-bold mb-6 transition-colors duration-300 hover:text-[#CAE9FF]">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/vuelos"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Vuelos
                </Link>
              </li>
              <li>
                <Link
                  href="/hospedaje"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Hospedaje
                </Link>
              </li>
              <li>
                <Link
                  href="/paquetes"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Paquetes
                </Link>
              </li>
              <li>
                <Link
                  href="/autos"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Alquiler de Autos
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-xl font-bold mb-6 transition-colors duration-300 hover:text-[#CAE9FF]">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/ayuda"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Blog de Viajes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal y Redes Sociales */}
          <div>
            <h3 className="text-xl font-bold mb-6 transition-colors duration-300 hover:text-[#CAE9FF]">Legal</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <Link
                  href="/terminos"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-[#CAE9FF] hover:text-white transition-all duration-300 hover:translate-x-2 block text-lg"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>

            {/* Redes Sociales */}
            <h4 className="text-lg font-semibold mb-4 text-[#CAE9FF]">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="bg-[#5FA8D3] p-3 rounded-full hover:bg-white hover:text-[#1B4965] transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="bg-[#5FA8D3] p-3 rounded-full hover:bg-white hover:text-[#1B4965] transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="bg-[#5FA8D3] p-3 rounded-full hover:bg-white hover:text-[#1B4965] transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                className="bg-[#5FA8D3] p-3 rounded-full hover:bg-white hover:text-[#1B4965] transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-[#5FA8D3] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#CAE9FF] transition-colors duration-300 hover:text-white text-lg">
              © 2025 TurismoApp - Olimpíada Nacional de Programación ETP. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/sitemap" className="text-[#CAE9FF] hover:text-white transition-colors duration-300 text-lg">
                Mapa del Sitio
              </Link>
              <Link
                href="/accesibilidad"
                className="text-[#CAE9FF] hover:text-white transition-colors duration-300 text-lg"
              >
                Accesibilidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
