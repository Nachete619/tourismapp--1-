"use client"

import type React from "react"
import { createContext, useEffect, useState } from "react"
import type { Producto } from "@/types/database"
import { useAuth } from "@/hooks/use-auth"

interface CartItem extends Producto {
  cantidad: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (producto: Producto) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { user } = useAuth()

  // Clear cart immediately when user logs out
  useEffect(() => {
    if (!user) {
      setItems([])
      // Also clear any localStorage cart data
      if (typeof window !== "undefined") {
        const keys = Object.keys(localStorage)
        keys.forEach((key) => {
          if (key.startsWith("cart_")) {
            localStorage.removeItem(key)
          }
        })
      }
    }
  }, [user])

  // Load cart from localStorage ONLY if user is authenticated
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          console.log("🔍 DEBUG - Cargando carrito desde localStorage:", parsedCart)
          setItems(parsedCart)
        } catch (error) {
          console.error("Error loading cart:", error)
          setItems([])
        }
      }
    }
  }, [user])

  // Save cart to localStorage whenever items change (only for authenticated users)
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      console.log("🔍 DEBUG - Guardando carrito en localStorage:", items)
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items))
    }
  }, [items, user])

  const addItem = (producto: Producto) => {
    // STRICT: Absolutely no adding without authentication
    if (!user) {
      console.warn("Attempted to add item without authentication")
      return
    }

    console.log("🔍 DEBUG - Agregando producto al carrito:", producto)

    // Ensure all numeric values are properly converted
    const sanitizedProducto = {
      ...producto,
      precio: Number(producto.precio) || 0,
      stock: Number(producto.stock) || 0,
            precio_original: producto.precio_original ? Number(producto.precio_original) : null,
    }

    console.log("🔍 DEBUG - Producto sanitizado:", sanitizedProducto)

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === sanitizedProducto.id)

      if (existingItem) {
        console.log("🔍 DEBUG - Producto ya existe, incrementando cantidad")
        return currentItems.map((item) =>
          item.id === sanitizedProducto.id
            ? { ...item, cantidad: Math.min(Number(item.cantidad) + 1, Number(sanitizedProducto.stock)) }
            : item,
        )
      }

      console.log("🔍 DEBUG - Producto nuevo, agregando al carrito")
      return [...currentItems, { ...sanitizedProducto, cantidad: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    if (!user) {
      console.warn("Attempted to remove item without authentication")
      return
    }
    console.log("🔍 DEBUG - Eliminando producto del carrito:", productId)
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (!user) {
      console.warn("Attempted to update quantity without authentication")
      return
    }

    const numQuantity = Number(quantity) || 0
    console.log("🔍 DEBUG - Actualizando cantidad:", { productId, quantity: numQuantity })

    if (numQuantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.min(numQuantity, Number(item.stock) || 0)
          console.log("🔍 DEBUG - Nueva cantidad para", item.nombre, ":", newQuantity)
          return { ...item, cantidad: newQuantity }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    if (!user) {
      console.warn("Attempted to clear cart without authentication")
      return
    }
    console.log("🔍 DEBUG - Vaciando carrito")
    setItems([])
  }

  // Calculate totals with proper number handling
  const total = user
    ? items.reduce((sum, item) => {
        const itemPrecio = Number(item.precio) || 0
        const itemCantidad = Number(item.cantidad) || 0
        const subtotal = itemPrecio * itemCantidad
        console.log(`🔍 DEBUG - Calculando total para ${item.nombre}: ${itemPrecio} x ${itemCantidad} = ${subtotal}`)
        return sum + subtotal
      }, 0)
    : 0

  const itemCount = user
    ? items.reduce((sum, item) => {
        const itemCantidad = Number(item.cantidad) || 0
        return sum + itemCantidad
      }, 0)
    : 0

  console.log("🔍 DEBUG - Total del carrito:", total)
  console.log("🔍 DEBUG - Cantidad de items:", itemCount)

  const value = {
    items: user ? items : [], // Return empty array if not authenticated
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
