"use client"

import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function CartProtection() {
  const { user } = useAuth()
  const { itemCount } = useCart()
  const { toast } = useToast()

  const handleUnauthorizedClick = () => {
    toast({
      title: "🔒 Acceso Restringido",
      description: "Debes iniciar sesión para acceder al carrito",
      variant: "destructive",
    })
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleUnauthorizedClick}
        className="relative text-gray-400 cursor-not-allowed hover:text-gray-400"
      >
        <Lock className="h-5 w-5" />
        <span className="sr-only">Carrito bloqueado</span>
      </Button>
    )
  }

  return (
    <Button asChild variant="ghost" size="sm" className="relative">
      <Link href="/carrito">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#1B4965]">
            {itemCount}
          </Badge>
        )}
        <span className="sr-only">Carrito ({itemCount})</span>
      </Link>
    </Button>
  )
}
