import Link from "next/link"

export default function CookiesPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Política de Cookies</h1>
          <p className="text-xl text-[#CAE9FF] max-w-3xl mx-auto">Última actualización: 1 de Enero de 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-orange-800 mb-3">¿Qué son las Cookies?</h2>
            <p className="text-orange-700">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio
              web. Nos ayudan a mejorar su experiencia y proporcionar servicios personalizados.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">1. Tipos de Cookies que Utilizamos</h2>
            <div className="space-y-6 text-gray-700">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1B4965] mb-3">🔧 Cookies Estrictamente Necesarias</h3>
                <p className="mb-3">
                  Estas cookies son esenciales para el funcionamiento del sitio web y no pueden desactivarse.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Autenticación de usuario y seguridad de sesión</li>
                  <li>Carrito de compras y proceso de reserva</li>
                  <li>Preferencias de idioma y región</li>
                  <li>Protección contra ataques CSRF</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Base legal:</strong> Interés legítimo para el funcionamiento del sitio
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1B4965] mb-3">📊 Cookies de Rendimiento y Análisis</h3>
                <p className="mb-3">Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Google Analytics para estadísticas de uso</li>
                  <li>Métricas de rendimiento del sitio</li>
                  <li>Análisis de patrones de navegación</li>
                  <li>Identificación de errores y problemas técnicos</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Base legal:</strong> Consentimiento del usuario
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1B4965] mb-3">⚙️ Cookies de Funcionalidad</h3>
                <p className="mb-3">
                  Permiten que el sitio web recuerde sus elecciones y proporcione funciones mejoradas.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Recordar preferencias de usuario</li>
                  <li>Configuraciones de accesibilidad</li>
                  <li>Historial de búsquedas recientes</li>
                  <li>Personalización de la interfaz</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Base legal:</strong> Consentimiento del usuario
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1B4965] mb-3">🎯 Cookies de Marketing y Publicidad</h3>
                <p className="mb-3">
                  Se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Seguimiento de conversiones</li>
                  <li>Remarketing y retargeting</li>
                  <li>Personalización de anuncios</li>
                  <li>Análisis de campañas publicitarias</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Base legal:</strong> Consentimiento del usuario
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">2. Cookies de Terceros</h2>
            <div className="space-y-4 text-gray-700">
              <p>Utilizamos servicios de terceros que pueden establecer sus propias cookies:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-600 mb-2">Análisis de tráfico web y comportamiento de usuarios</p>
                  <p className="text-xs text-gray-500">Duración: 2 años</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Google Ads</h4>
                  <p className="text-sm text-gray-600 mb-2">Seguimiento de conversiones y remarketing</p>
                  <p className="text-xs text-gray-500">Duración: 90 días</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Facebook Pixel</h4>
                  <p className="text-sm text-gray-600 mb-2">Optimización de anuncios en redes sociales</p>
                  <p className="text-xs text-gray-500">Duración: 180 días</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Hotjar</h4>
                  <p className="text-sm text-gray-600 mb-2">Análisis de experiencia de usuario</p>
                  <p className="text-xs text-gray-500">Duración: 1 año</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">3. Duración de las Cookies</h2>
            <div className="space-y-4 text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#1B4965] mb-3">🕐 Cookies de Sesión</h3>
                  <p>Se eliminan automáticamente cuando cierra su navegador. Se utilizan para:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Mantener su sesión activa</li>
                    <li>Recordar elementos en su carrito</li>
                    <li>Procesar formularios</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#1B4965] mb-3">📅 Cookies Persistentes</h3>
                  <p>Permanecen en su dispositivo durante un período específico. Se utilizan para:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Recordar sus preferencias</li>
                    <li>Análisis a largo plazo</li>
                    <li>Personalización de contenido</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">4. Cómo Gestionar las Cookies</h2>
            <div className="space-y-6 text-gray-700">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">🎛️ Centro de Preferencias de Cookies</h3>
                <p className="text-blue-700 mb-4">
                  Puede gestionar sus preferencias de cookies en cualquier momento a través de nuestro centro de
                  preferencias.
                </p>
                <button className="bg-[#1B4965] text-white px-6 py-3 rounded-lg hover:bg-[#5FA8D3] transition-colors">
                  Gestionar Preferencias de Cookies
                </button>
              </div>

              <h3 className="text-lg font-semibold text-[#1B4965]">Configuración del Navegador</h3>
              <p>También puede gestionar las cookies directamente desde su navegador:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Google Chrome</h4>
                  <p className="text-sm text-gray-600">
                    Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Mozilla Firefox</h4>
                  <p className="text-sm text-gray-600">Opciones → Privacidad y seguridad → Cookies y datos del sitio</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Safari</h4>
                  <p className="text-sm text-gray-600">Preferencias → Privacidad → Gestionar datos de sitios web</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1B4965] mb-2">Microsoft Edge</h4>
                  <p className="text-sm text-gray-600">Configuración → Privacidad, búsqueda y servicios → Cookies</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">5. Impacto de Deshabilitar Cookies</h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Importante</h3>
                <p className="text-yellow-700 mb-3">
                  Deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-yellow-700">
                  <li>Es posible que no pueda completar reservas</li>
                  <li>Sus preferencias no se guardarán</li>
                  <li>Algunas funciones personalizadas no estarán disponibles</li>
                  <li>La experiencia de usuario puede verse reducida</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">6. Cookies en Dispositivos Móviles</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                En dispositivos móviles, las cookies funcionan de manera similar. Puede gestionar las cookies a través
                de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Configuración del navegador móvil</li>
                <li>Configuración de privacidad del dispositivo</li>
                <li>Aplicaciones específicas de gestión de privacidad</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#1B4965] mb-2">Aplicación Móvil</h4>
                <p className="text-sm text-gray-600">
                  Si utiliza nuestra aplicación móvil, puede gestionar las preferencias de seguimiento en la
                  configuración de la aplicación o en la configuración de privacidad de su dispositivo.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">7. Actualizaciones de esta Política</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en nuestras prácticas o
                por razones operativas, legales o reglamentarias.
              </p>
              <p>
                Le notificaremos sobre cambios significativos a través de un aviso prominente en nuestro sitio web o por
                email si los cambios afectan materialmente sus derechos.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B4965] mb-4">8. Contacto</h2>
            <div className="space-y-4 text-gray-700">
              <p>Si tiene preguntas sobre nuestra política de cookies, puede contactarnos:</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-2">
                  <li>
                    <strong>Email:</strong> cookies@turismoapp.com
                  </li>
                  <li>
                    <strong>Teléfono:</strong> +54 11 4567-8900
                  </li>
                  <li>
                    <strong>Dirección:</strong> Av. Corrientes 1234, Piso 8, CABA, Argentina
                  </li>
                  <li>
                    <strong>Horario de atención:</strong> Lunes a Viernes, 9:00 - 18:00 hs
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-12">
            <h3 className="text-lg font-semibold text-green-800 mb-3">🍪 Resumen</h3>
            <p className="text-green-700">
              Utilizamos cookies para mejorar su experiencia, analizar el uso del sitio y personalizar el contenido.
              Puede gestionar sus preferencias en cualquier momento a través de nuestro centro de preferencias o la
              configuración de su navegador.
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
