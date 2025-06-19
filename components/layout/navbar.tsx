"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Plane,
  Package,
  Car,
  BarChart3,
  Settings,
  FileText,
  ShieldCheck,
  Building,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, profile, signOut, isAdmin } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const userMenuRef = useRef<HTMLDivElement>(null)

  const navigationItems = [
    { name: "Vuelos", href: "/vuelos", icon: Plane },
    { name: "Hospedaje", href: "/hospedaje", icon: Building },
    { name: "Autos", href: "/autos", icon: Car },
    { name: "Paquetes", href: "/paquetes", icon: Package },
    // Solo mostrar estadísticas para admins
    ...(isAdmin ? [{ name: "Estadísticas", href: "/estadisticas", icon: BarChart3 }] : []),
  ]

  const userItems = [
    { name: "Mis Reservas", href: "/mis-reservas", icon: FileText },
    { name: "Perfil", href: "/perfil", icon: User },
  ]

  const adminItems = [
    { name: "Panel de Admin", href: "/admin", icon: Settings },
    { name: "Estadísticas", href: "/estadisticas", icon: BarChart3 },
  ]

  const handleSignOut = async () => {
    await signOut()
    setIsUserMenuOpen(false)
    router.push("/")
  }

  const isDemoUser = user?.email?.includes("demo.com")

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B4965] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <Plane className="h-8 w-8 text-[#CAE9FF] transition-all duration-300 group-hover:text-white group-hover:scale-110" />
              <span className="ml-2 text-xl font-bold text-white transition-all duration-300 group-hover:text-[#CAE9FF]">
                TurismoApp
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <item.icon className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/carrito" className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    {items.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-[#62B6CB] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#5FA8D3]">
                        {items.length}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* User Dropdown Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105"
                  >
                    {isAdmin ? (
                      <ShieldCheck className="h-5 w-5 text-yellow-300 transition-transform duration-300 hover:scale-110" />
                    ) : (
                      <User className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                    )}
                    <span className="text-sm font-medium">
                      {profile?.full_name || user.email?.split("@")[0] || "Usuario"}
                    </span>
                    {isDemoUser && <Badge className="bg-blue-500 text-xs">Demo</Badge>}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-lg py-1 z-50">
                      {/* Información del usuario */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{profile?.full_name || "Usuario"}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {isAdmin && <Badge className="mt-1 bg-yellow-100 text-yellow-800 text-xs">Administrador</Badge>}
                      </div>

                      {/* Opciones del usuario */}
                      {userItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#CAE9FF] hover:text-[#1B4965] transition-all duration-200"
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.name}
                        </Link>
                      ))}

                      {/* Opciones de administrador */}
                      {isAdmin && (
                        <>
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <div className="px-4 py-2">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Administración
                              </p>
                            </div>
                            {adminItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#CAE9FF] hover:text-[#1B4965] transition-all duration-200"
                              >
                                <item.icon className="h-4 w-4 mr-3" />
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Cerrar sesión */}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105"
                >
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-[#62B6CB] hover:bg-[#5FA8D3] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link href="/auth/register">Registrarse</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105"
            >
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#1B4965] border-t border-[#5FA8D3] animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3 transition-transform duration-300 hover:scale-110" />
                {item.name}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t border-[#5FA8D3] pt-4">
                  {isDemoUser && (
                    <div className="px-3 py-2 text-sm text-[#CAE9FF] bg-blue-900 rounded-md mb-2 transition-all duration-300 hover:bg-blue-800">
                      {isAdmin ? "Modo Demo Admin" : "Modo Demo Usuario"}
                    </div>
                  )}
                  <Link
                    href="/carrito"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-3 transition-transform duration-300 hover:scale-110" />
                    Carrito ({items.length})
                  </Link>
                  {userItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3 transition-transform duration-300 hover:scale-110" />
                      {item.name}
                    </Link>
                  ))}
                  {isAdmin &&
                    adminItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5 mr-3 transition-transform duration-300 hover:scale-110" />
                        {item.name}
                      </Link>
                    ))}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-[#CAE9FF] hover:text-white hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:translate-x-2"
                  >
                    <LogOut className="h-5 w-5 mr-3 transition-transform duration-300 hover:scale-110" />
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-[#5FA8D3] pt-4 space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#CAE9FF] hover:text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-[#62B6CB] text-white hover:bg-[#5FA8D3] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
