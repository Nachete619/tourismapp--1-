import Link from "next/link"

export default function NosotrosPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
          <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">
            Más de 15 años conectando personas con sus destinos soñados
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Nuestra Historia */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-8 text-center">Nuestra Historia</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                TurismoApp nació en 2009 con una visión simple pero poderosa: hacer que viajar sea accesible,
                emocionante y memorable para todos. Fundada por un equipo de apasionados viajeros, nuestra empresa
                comenzó como una pequeña agencia local en Buenos Aires.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                A lo largo de los años, hemos crecido hasta convertirnos en una de las agencias de turismo más
                confiables de Argentina, pero nunca hemos perdido nuestro toque personal y nuestro compromiso con la
                excelencia en el servicio.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Hoy, con más de 15 años de experiencia, seguimos innovando y adaptándonos a las necesidades cambiantes
                de nuestros clientes, siempre con el mismo objetivo: crear experiencias de viaje inolvidables.
              </p>
            </div>
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Imagen de la empresa</span>
            </div>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="mb-16">
          <div className="bg-[#CAE9FF] rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#1B4965] mb-8 text-center">Nuestra Misión</h2>
            <p className="text-[#1B4965] text-xl text-center leading-relaxed max-w-4xl mx-auto">
              "Inspirar y facilitar experiencias de viaje extraordinarias, conectando a las personas con culturas,
              destinos y aventuras que enriquezcan sus vidas y amplíen sus horizontes."
            </p>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-12 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Confianza",
                description: "Construimos relaciones duraderas basadas en la transparencia y la honestidad.",
              },
              {
                title: "Excelencia",
                description: "Nos esforzamos por superar las expectativas en cada detalle de nuestro servicio.",
              },
              {
                title: "Innovación",
                description: "Adoptamos nuevas tecnologías y enfoques para mejorar la experiencia de viaje.",
              },
              {
                title: "Pasión",
                description: "Amamos lo que hacemos y esa pasión se refleja en cada viaje que organizamos.",
              },
            ].map((valor, index) => (
              <div
                key={index}
                className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#5FA8D3] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{valor.title[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B4965] mb-3">{valor.title}</h3>
                <p className="text-gray-600">{valor.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-12 text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                position: "Directora General",
                description: "15 años de experiencia en la industria turística. Especialista en destinos europeos.",
              },
              {
                name: "Carlos Rodríguez",
                position: "Director de Operaciones",
                description: "Experto en logística de viajes y gestión de proveedores internacionales.",
              },
              {
                name: "Ana Martínez",
                position: "Jefa de Atención al Cliente",
                description: "Dedicada a garantizar la satisfacción y experiencia excepcional de nuestros clientes.",
              },
            ].map((miembro, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Foto</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B4965] mb-2">{miembro.name}</h3>
                <p className="text-[#5FA8D3] font-semibold mb-3">{miembro.position}</p>
                <p className="text-gray-600">{miembro.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certificaciones */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-8 text-center">Certificaciones y Reconocimientos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Certificación IATA",
              "Registro Nacional de Turismo",
              "Premio Excelencia TripAdvisor 2024",
              "Certificación ISO 9001",
            ].map((cert, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-[#1B4965] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="font-semibold text-gray-700">{cert}</p>
              </div>
            ))}
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
