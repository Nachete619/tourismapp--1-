import Link from "next/link"

export default function ContactoPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
          <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">
            Estamos aquí para ayudarte a planificar tu próxima aventura
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de Contacto */}
          <div>
            <h2 className="text-3xl font-bold text-[#1B4965] mb-8">Información de Contacto</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5FA8D3] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">📍</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1B4965] mb-2">Oficina Principal</h3>
                  <p className="text-gray-600">
                    Av. Corrientes 1234, Piso 8<br />
                    C1043AAZ Ciudad Autónoma de Buenos Aires
                    <br />
                    Argentina
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5FA8D3] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">📞</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1B4965] mb-2">Teléfonos</h3>
                  <p className="text-gray-600">
                    <strong>Ventas:</strong> +54 11 4567-8900
                    <br />
                    <strong>Atención al Cliente:</strong> +54 11 4567-8901
                    <br />
                    <strong>Emergencias 24hs:</strong> +54 11 4567-8902
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5FA8D3] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✉️</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1B4965] mb-2">Email</h3>
                  <p className="text-gray-600">
                    <strong>General:</strong> info@turismoapp.com
                    <br />
                    <strong>Ventas:</strong> ventas@turismoapp.com
                    <br />
                    <strong>Soporte:</strong> soporte@turismoapp.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5FA8D3] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">🕒</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1B4965] mb-2">Horarios de Atención</h3>
                  <p className="text-gray-600">
                    <strong>Lunes a Viernes:</strong> 9:00 - 19:00 hs
                    <br />
                    <strong>Sábados:</strong> 9:00 - 14:00 hs
                    <br />
                    <strong>Domingos:</strong> Cerrado
                    <br />
                    <strong>Emergencias:</strong> 24 horas, 365 días
                  </p>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#1B4965] mb-6">Síguenos en Redes Sociales</h3>
              <div className="flex space-x-4">
                {[
                  { name: "Facebook", url: "https://facebook.com/turismoapp" },
                  { name: "Instagram", url: "https://instagram.com/turismoapp" },
                  { name: "Twitter", url: "https://twitter.com/turismoapp" },
                  { name: "YouTube", url: "https://youtube.com/turismoapp" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#1B4965] rounded-full flex items-center justify-center text-white hover:bg-[#5FA8D3] transition-colors"
                  >
                    {social.name[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div>
            <h2 className="text-3xl font-bold text-[#1B4965] mb-8">Envíanos un Mensaje</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asunto *</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta-general">Consulta General</option>
                  <option value="cotizacion">Solicitar Cotización</option>
                  <option value="reclamo">Reclamo</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acepto-terminos"
                  className="h-4 w-4 text-[#5FA8D3] focus:ring-[#5FA8D3] border-gray-300 rounded"
                />
                <label htmlFor="acepto-terminos" className="ml-2 text-sm text-gray-600">
                  Acepto los{" "}
                  <Link href="/terminos" className="text-[#1B4965] hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacidad" className="text-[#1B4965] hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B4965] hover:bg-[#5FA8D3] text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-8 text-center">Nuestra Ubicación</h2>
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg">Mapa interactivo - Av. Corrientes 1234, Buenos Aires</p>
          </div>
        </div>
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
