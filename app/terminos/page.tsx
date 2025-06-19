import Link from "next/link"

export default function TerminosPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Términos y Condiciones</h1>
          <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">Última actualización: 1 de Enero de 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-3">Información Importante</h2>
            <p className="text-blue-700">
              Al utilizar nuestros servicios, usted acepta estos términos y condiciones en su totalidad. Le recomendamos
              leer cuidadosamente este documento antes de realizar cualquier reserva.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">1. Definiciones</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>"TurismoApp"</strong> se refiere a la empresa TurismoApp S.A., con domicilio en Av. Corrientes
                1234, Ciudad Autónoma de Buenos Aires, Argentina.
              </p>
              <p>
                <strong>"Usuario"</strong> se refiere a cualquier persona que utilice nuestros servicios o plataforma.
              </p>
              <p>
                <strong>"Servicios"</strong> incluye todos los productos turísticos ofrecidos: vuelos, hospedaje,
                alquiler de autos, paquetes turísticos y servicios relacionados.
              </p>
              <p>
                <strong>"Plataforma"</strong> se refiere a nuestro sitio web, aplicación móvil y cualquier otro medio
                digital a través del cual ofrecemos nuestros servicios.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">2. Aceptación de los Términos</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Al acceder y utilizar nuestros servicios, usted acepta estar sujeto a estos términos y condiciones, así
                como a nuestra Política de Privacidad.
              </p>
              <p>Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.</p>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán
                en vigor inmediatamente después de su publicación en la plataforma.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">3. Uso de la Plataforma</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">3.1 Registro de Usuario</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Para utilizar ciertos servicios, debe crear una cuenta proporcionando información veraz y actualizada.
                </li>
                <li>Es responsable de mantener la confidencialidad de sus credenciales de acceso.</li>
                <li>Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">3.2 Uso Permitido</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar la plataforma únicamente para fines legales y de acuerdo con estos términos.</li>
                <li>Proporcionar información veraz y precisa al realizar reservas.</li>
                <li>Respetar los derechos de propiedad intelectual de TurismoApp y terceros.</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">3.3 Uso Prohibido</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar la plataforma para actividades ilegales o fraudulentas.</li>
                <li>Interferir con el funcionamiento normal de la plataforma.</li>
                <li>Intentar acceder a áreas restringidas o información de otros usuarios.</li>
                <li>Realizar reservas falsas o especulativas.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">4. Reservas y Pagos</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">4.1 Proceso de Reserva</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Las reservas se consideran confirmadas una vez completado el pago y recibida la confirmación por
                  email.
                </li>
                <li>
                  Los precios están sujetos a disponibilidad y pueden cambiar sin previo aviso hasta la confirmación.
                </li>
                <li>Todas las reservas están sujetas a los términos y condiciones específicos de cada proveedor.</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">4.2 Métodos de Pago</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Aceptamos tarjetas de crédito, débito, transferencias bancarias y otros métodos especificados.</li>
                <li>Los pagos se procesan de forma segura a través de plataformas certificadas.</li>
                <li>
                  El usuario es responsable de cualquier cargo adicional impuesto por su banco o entidad financiera.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">4.3 Precios y Tarifas</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Todos los precios están expresados en pesos argentinos salvo indicación contraria.</li>
                <li>Los precios incluyen impuestos aplicables salvo indicación contraria.</li>
                <li>Pueden aplicarse cargos adicionales por servicios especiales o modificaciones.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">5. Cancelaciones y Modificaciones</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">5.1 Políticas de Cancelación</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Las políticas de cancelación varían según el tipo de servicio y proveedor.</li>
                <li>
                  Las cancelaciones deben realizarse a través de nuestra plataforma o contactando a nuestro equipo.
                </li>
                <li>Los reembolsos están sujetos a las políticas específicas de cada reserva.</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">5.2 Modificaciones</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Las modificaciones están sujetas a disponibilidad y políticas del proveedor.</li>
                <li>Pueden aplicarse cargos adicionales por modificaciones.</li>
                <li>Algunas tarifas no permiten modificaciones.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">6. Responsabilidades</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">6.1 Responsabilidad de TurismoApp</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Actuamos como intermediarios entre usuarios y proveedores de servicios.</li>
                <li>No somos responsables por la calidad de los servicios prestados por terceros.</li>
                <li>Nuestra responsabilidad se limita al valor de la reserva realizada.</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">6.2 Responsabilidad del Usuario</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verificar la exactitud de la información proporcionada en las reservas.</li>
                <li>Cumplir con los requisitos de documentación y visas necesarios.</li>
                <li>Llegar puntualmente a los servicios contratados.</li>
                <li>Respetar las políticas y normas de los proveedores de servicios.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">7. Fuerza Mayor</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                No seremos responsables por el incumplimiento de nuestras obligaciones debido a circunstancias de fuerza
                mayor, incluyendo pero no limitándose a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Desastres naturales, pandemias, guerras o actos de terrorismo</li>
                <li>Huelgas, paros o conflictos laborales</li>
                <li>Fallas en sistemas de terceros o interrupciones de servicios públicos</li>
                <li>Cambios en regulaciones gubernamentales o restricciones de viaje</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">8. Propiedad Intelectual</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Todo el contenido de la plataforma, incluyendo textos, imágenes, logos, diseños y software, está
                protegido por derechos de propiedad intelectual.
              </p>
              <p>El usuario no puede reproducir, distribuir o modificar ningún contenido sin autorización expresa.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">9. Resolución de Disputas</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Cualquier disputa será resuelta mediante negociación directa. En caso de no llegar a un acuerdo, las
                partes se someterán a la jurisdicción de los tribunales de la Ciudad Autónoma de Buenos Aires,
                Argentina.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">10. Contacto</h2>
            <div className="space-y-4 text-gray-700">
              <p>Para consultas sobre estos términos y condiciones, puede contactarnos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: legal@turismoapp.com</li>
                <li>Teléfono: +54 11 4567-8900</li>
                <li>Dirección: Av. Corrientes 1234, Piso 8, CABA, Argentina</li>
              </ul>
            </div>
          </section>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-12">
            <p className="text-sm text-gray-600 text-center">
              Estos términos y condiciones constituyen el acuerdo completo entre TurismoApp y el usuario. Al utilizar
              nuestros servicios, confirma que ha leído, entendido y acepta estos términos.
            </p>
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
