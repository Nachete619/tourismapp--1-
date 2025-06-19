import Link from "next/link"

export default function PrivacidadPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Política de Privacidad</h1>
          <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">Última actualización: 1 de Enero de 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-3">Compromiso con su Privacidad</h2>
            <p className="text-green-700">
              En TurismoApp valoramos y respetamos su privacidad. Esta política explica cómo recopilamos, utilizamos y
              protegemos su información personal cuando utiliza nuestros servicios.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">1. Información que Recopilamos</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">1.1 Información Personal</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo, dirección de email y número de teléfono</li>
                <li>Información de facturación y datos de tarjetas de crédito</li>
                <li>Dirección postal y país de residencia</li>
                <li>Fecha de nacimiento y número de documento de identidad</li>
                <li>Información de pasaporte cuando sea necesaria para viajes internacionales</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">1.2 Información de Uso</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Páginas visitadas, tiempo de permanencia y patrones de navegación</li>
                <li>Dirección IP, tipo de navegador y sistema operativo</li>
                <li>Búsquedas realizadas y preferencias de viaje</li>
                <li>Historial de reservas y transacciones</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">1.3 Información de Terceros</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Información de redes sociales cuando se conecta a través de estas plataformas</li>
                <li>Datos de proveedores de servicios turísticos</li>
                <li>Información de verificación de identidad de servicios especializados</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">2. Cómo Utilizamos su Información</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">2.1 Prestación de Servicios</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Procesar y confirmar sus reservas</li>
                <li>Facilitar el pago de servicios turísticos</li>
                <li>Proporcionar atención al cliente y soporte técnico</li>
                <li>Enviar confirmaciones, actualizaciones y comunicaciones importantes</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">2.2 Mejora de Servicios</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalizar su experiencia en la plataforma</li>
                <li>Analizar patrones de uso para mejorar nuestros servicios</li>
                <li>Desarrollar nuevas funcionalidades y productos</li>
                <li>Realizar investigaciones de mercado y análisis estadísticos</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">2.3 Marketing y Comunicaciones</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enviar ofertas especiales y promociones (con su consentimiento)</li>
                <li>Newsletters y contenido relevante sobre viajes</li>
                <li>Encuestas de satisfacción y feedback</li>
                <li>Comunicaciones sobre cambios en nuestros servicios</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">3. Compartir Información</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">3.1 Proveedores de Servicios</h3>
              <p>Compartimos información necesaria con:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Aerolíneas, hoteles y otros proveedores turísticos para procesar reservas</li>
                <li>Procesadores de pagos para facilitar transacciones</li>
                <li>Servicios de verificación de identidad y prevención de fraude</li>
                <li>Proveedores de tecnología que nos ayudan a operar la plataforma</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">3.2 Requisitos Legales</h3>
              <p>Podemos divulgar información cuando:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sea requerido por ley o por autoridades competentes</li>
                <li>Sea necesario para proteger nuestros derechos legales</li>
                <li>Sea necesario para prevenir fraude o actividades ilegales</li>
                <li>Sea necesario para proteger la seguridad de usuarios o terceros</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">3.3 Transferencias Comerciales</h3>
              <p>
                En caso de fusión, adquisición o venta de activos, su información puede ser transferida como parte de la
                transacción.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">4. Seguridad de la Información</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">4.1 Medidas de Seguridad</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptación SSL/TLS para todas las transmisiones de datos</li>
                <li>Servidores seguros con acceso restringido y monitoreo 24/7</li>
                <li>Autenticación de dos factores para cuentas administrativas</li>
                <li>Auditorías regulares de seguridad y pruebas de penetración</li>
                <li>Capacitación continua del personal en seguridad de datos</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">4.2 Retención de Datos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conservamos información personal solo mientras sea necesario</li>
                <li>Los datos de transacciones se mantienen según requisitos legales</li>
                <li>Puede solicitar la eliminación de sus datos en cualquier momento</li>
                <li>Realizamos eliminación segura de datos cuando ya no son necesarios</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">5. Sus Derechos</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">5.1 Derechos de Acceso y Control</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Acceso:</strong> Solicitar una copia de la información personal que tenemos sobre usted
                </li>
                <li>
                  <strong>Rectificación:</strong> Corregir información inexacta o incompleta
                </li>
                <li>
                  <strong>Eliminación:</strong> Solicitar la eliminación de su información personal
                </li>
                <li>
                  <strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado y legible
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerse al procesamiento de sus datos para ciertos fines
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">5.2 Gestión de Comunicaciones</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Puede darse de baja de emails promocionales en cualquier momento</li>
                <li>Puede actualizar sus preferencias de comunicación en su cuenta</li>
                <li>Algunas comunicaciones de servicio son necesarias y no pueden desactivarse</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">5.3 Cómo Ejercer sus Derechos</h3>
              <p>Para ejercer cualquiera de estos derechos, contáctenos a través de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: privacidad@turismoapp.com</li>
                <li>Formulario en línea en su cuenta de usuario</li>
                <li>Teléfono: +54 11 4567-8900</li>
                <li>Correo postal: Av. Corrientes 1234, CABA, Argentina</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">6. Cookies y Tecnologías Similares</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#1B4965]">6.1 Tipos de Cookies</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio
                </li>
                <li>
                  <strong>Cookies de Rendimiento:</strong> Nos ayudan a entender cómo los usuarios interactúan con el
                  sitio
                </li>
                <li>
                  <strong>Cookies de Funcionalidad:</strong> Permiten recordar sus preferencias y configuraciones
                </li>
                <li>
                  <strong>Cookies de Marketing:</strong> Utilizadas para mostrar anuncios relevantes
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#1B4965]">6.2 Gestión de Cookies</h3>
              <p>Puede gestionar las cookies a través de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>La configuración de su navegador</li>
                <li>Nuestro centro de preferencias de cookies</li>
                <li>Herramientas de opt-out de terceros</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">7. Transferencias Internacionales</h2>
            <div className="space-y-4 text-gray-700">
              <p>Sus datos pueden ser transferidos y procesados en países fuera de Argentina cuando:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilice servicios de proveedores internacionales</li>
                <li>Realice reservas en destinos internacionales</li>
                <li>Utilicemos servicios en la nube con servidores globales</li>
              </ul>
              <p>Garantizamos que estas transferencias cumplan con las leyes de protección de datos aplicables.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">8. Menores de Edad</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información
                personal de menores sin el consentimiento de los padres o tutores legales.
              </p>
              <p>
                Si descubrimos que hemos recopilado información de un menor sin consentimiento, tomaremos medidas para
                eliminar esa información.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">9. Cambios en esta Política</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos actualizar esta política de privacidad ocasionalmente. Los cambios importantes serán notificados
                a través de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email a la dirección registrada en su cuenta</li>
                <li>Notificación prominente en nuestro sitio web</li>
                <li>Actualización de la fecha de "última modificación"</li>
              </ul>
              <p>
                Le recomendamos revisar esta política periódicamente para mantenerse informado sobre cómo protegemos su
                información.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">10. Contacto</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Si tiene preguntas sobre esta política de privacidad o sobre cómo manejamos su información personal,
                puede contactarnos:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-[#1B4965] mb-3">Oficial de Protección de Datos</h4>
                <ul className="space-y-2">
                  <li>
                    <strong>Email:</strong> privacidad@turismoapp.com
                  </li>
                  <li>
                    <strong>Teléfono:</strong> +54 11 4567-8900
                  </li>
                  <li>
                    <strong>Dirección:</strong> Av. Corrientes 1234, Piso 8, CABA, Argentina
                  </li>
                  <li>
                    <strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00 hs
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
            <p className="text-sm text-blue-700 text-center">
              Esta política de privacidad forma parte integral de nuestros términos y condiciones. Al utilizar nuestros
              servicios, confirma que ha leído y acepta esta política.
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
