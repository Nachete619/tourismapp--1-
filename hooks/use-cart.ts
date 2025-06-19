"use client"

import { useContext } from "react"
import { CartContext } from "@/components/providers/cart-provider"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import type { Producto } from "@/types/database"

export function useCart() {
  const context = useContext(CartContext)
  const { user } = useAuth()
  const { toast } = useToast()

  console.log("🔍 DEBUG useCart - Context:", !!context)
  console.log("🔍 DEBUG useCart - User:", !!user)

  if (!context) {
    console.error("❌ useCart must be used within a CartProvider")
    throw new Error("useCart must be used within a CartProvider")
  }

  // Override all cart functions to require authentication
  const secureAddItem = (producto: Producto) => {
    console.log("🔍 DEBUG secureAddItem - Producto recibido:", producto)
    console.log("🔍 DEBUG secureAddItem - Usuario:", !!user)

    if (!user) {
      console.log("❌ DEBUG secureAddItem - Usuario no autenticado")
      toast({
        title: "🔒 Acceso Denegado",
        description: "Debes iniciar sesión para agregar productos al carrito",
        variant: "destructive",
      })
      return false
    }

    // Ensure precio and stock are numbers
    const productoWithNumbers = {
      ...producto,
      precio: typeof producto.precio === "string" ? Number.parseFloat(producto.precio) || 0 : producto.precio || 0,
      stock: typeof producto.stock === "string" ? Number.parseInt(producto.stock) || 0 : producto.stock || 0,
      precio_original:
        typeof producto.precio_original === "string"
          ? Number.parseFloat(producto.precio_original) || 0
          : producto.precio_original || 0,
    }

    console.log("🔍 DEBUG secureAddItem - Producto sanitizado:", productoWithNumbers)

    try {
      context.addItem(productoWithNumbers)
      console.log("✅ DEBUG secureAddItem - Producto agregado al contexto")
      return true
    } catch (error) {
      console.error("💥 DEBUG secureAddItem - Error:", error)
      return false
    }
  }

  const secureRemoveItem = (productId: string) => {
    if (!user) {
      toast({
        title: "🔒 Acceso Denegado",
        description: "Debes iniciar sesión para modificar el carrito",
        variant: "destructive",
      })
      return false
    }
    context.removeItem(productId)
    return true
  }

  const secureUpdateQuantity = (productId: string, quantity: number) => {
    if (!user) {
      toast({
        title: "🔒 Acceso Denegado",
        description: "Debes iniciar sesión para modificar el carrito",
        variant: "destructive",
      })
      return false
    }
    context.updateQuantity(productId, quantity)
    return true
  }

  const secureClearCart = () => {
    if (!user) {
      toast({
        title: "🔒 Acceso Denegado",
        description: "Debes iniciar sesión para acceder al carrito",
        variant: "destructive",
      })
      return false
    }
    context.clearCart()
    return true
  }

  return {
    // Only return cart data if user is authenticated
    items: user ? context.items : [],
    total: user ? context.total : 0,
    itemCount: user ? context.itemCount : 0,
    // Secure functions that check authentication
    addItem: secureAddItem,
    removeItem: secureRemoveItem,
    updateQuantity: secureUpdateQuantity,
    clearCart: secureClearCart,
    // Authentication status
    isAuthenticated: !!user,
  }
}
