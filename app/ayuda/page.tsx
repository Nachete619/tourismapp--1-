import Link from "next/link"

export default function AyudaPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Centro de Ayuda</h1>
          <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más frecuentes sobre nuestros servicios
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Búsqueda */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en el centro de ayuda..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5FA8D3] focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#1B4965] text-white px-6 py-2 rounded-lg hover:bg-[#5FA8D3] transition-colors">
              Buscar
            </button>
          </div>
        </div>

        {/* Categorías de Ayuda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Reservas y Pagos",
              description: "Información sobre cómo realizar reservas, métodos de pago y confirmaciones",
              icon: "💳",
            },
            {
              title: "Modificaciones y Cancelaciones",
              description: "Políticas de cambios, cancelaciones y reembolsos",
              icon: "📝",
            },
            {
              title: "Documentación de Viaje",
              description: "Pasaportes, visas y documentos necesarios para viajar",
              icon: "📄",
            },
            {
              title: "Equipaje",
              description: "Políticas de equipaje, restricciones y recomendaciones",
              icon: "🧳",
            },
            {
              title: "Seguros de Viaje",
              description: "Información sobre seguros, coberturas y asistencia",
              icon: "🛡️",
            },
            {
              title: "Problemas Técnicos",
              description: "Ayuda con la plataforma, cuenta de usuario y problemas técnicos",
              icon: "⚙️",
            },
          ].map((categoria, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-4">{categoria.icon}</div>
              <h3 className="text-xl font-bold text-[#1B4965] mb-3">{categoria.title}</h3>
              <p className="text-gray-600">{categoria.description}</p>
            </div>
          ))}
        </div>

        {/* Preguntas Frecuentes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B4965] mb-12 text-center">Preguntas Frecuentes</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                pregunta: "¿Cómo puedo realizar una reserva?",
                respuesta:
                  "Puedes realizar una reserva directamente desde nuestra plataforma. Selecciona el servicio que deseas (vuelo, hospedaje, auto o paquete), completa los datos requeridos y procede al pago. Recibirás una confirmación por email.",
              },
              {
                pregunta: "¿Qué métodos de pago aceptan?",
                respuesta:
                  "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, Mercado Pago y efectivo en nuestras oficinas. Todos los pagos online están protegidos con encriptación SSL.",
              },
              {
                pregunta: "¿Puedo cancelar mi reserva?",
                respuesta:
                  "Sí, puedes cancelar tu reserva según las políticas de cancelación de cada servicio. Las condiciones varían según el tipo de producto y el tiempo de anticipación. Consulta los términos específicos en tu confirmación de reserva.",
              },
              {
                pregunta: "¿Necesito seguro de viaje?",
                respuesta:
                  "Aunque no es obligatorio, recomendamos encarecidamente contratar un seguro de viaje. Te protege ante imprevistos como cancelaciones, emergencias médicas, pérdida de equipaje y otros inconvenientes durante tu viaje.",
              },
              {
                pregunta: "¿Qué documentos necesito para viajar?",
                respuesta:
                  "Los documentos requeridos dependen del destino. Para viajes nacionales necesitas DNI. Para viajes internacionales generalmente se requiere pasaporte vigente y, en algunos casos, visa. Te asesoramos sobre los requisitos específicos de tu destino.",
              },
              {
                pregunta: "¿Ofrecen asistencia durante el viaje?",
                respuesta:
                  "Sí, contamos con asistencia 24/7 durante tu viaje. Puedes contactarnos por teléfono, email o WhatsApp ante cualquier emergencia o consulta. Nuestro equipo está disponible para ayudarte en todo momento.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#1B4965] mb-3">{faq.pregunta}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto de Emergencia */}
        <section className="bg-red-50 border border-red-200 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Asistencia de Emergencia 24/7</h2>
          <div className="text-center">
            <p className="text-red-700 mb-4">Si tienes una emergencia durante tu viaje, contáctanos inmediatamente:</p>
            <div className="space-y-2">
              <p className="text-xl font-bold text-red-800">📞 +54 11 4567-8902</p>
              <p className="text-lg text-red-700">📧 emergencias@turismoapp.com</p>
              <p className="text-lg text-red-700">💬 WhatsApp: +54 9 11 4567-8902</p>
            </div>
          </div>
        </section>

        {/* Recursos Adicionales */}
        <section>
          <h2 className="text-3xl font-bold text-[#1B4965] mb-8 text-center">Recursos Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#5FA8D3] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B4965] mb-3">Guías de Viaje</h3>
              <p className="text-gray-600 mb-4">
                Descarga nuestras guías completas con información útil sobre destinos populares.
              </p>
              <button className="bg-[#1B4965] text-white px-6 py-2 rounded-lg hover:bg-[#5FA8D3] transition-colors">
                Descargar Guías
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#5FA8D3] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B4965] mb-3">Tutoriales en Video</h3>
              <p className="text-gray-600 mb-4">
                Aprende a usar nuestra plataforma con nuestros tutoriales paso a paso.
              </p>
              <button className="bg-[#1B4965] text-white px-6 py-2 rounded-lg hover:bg-[#5FA8D3] transition-colors">
                Ver Videos
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#5FA8D3] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B4965] mb-3">Chat en Vivo</h3>
              <p className="text-gray-600 mb-4">Habla directamente con nuestros agentes de atención al cliente.</p>
              <button className="bg-[#1B4965] text-white px-6 py-2 rounded-lg hover:bg-[#5FA8D3] transition-colors">
                Iniciar Chat
              </button>
            </div>
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
