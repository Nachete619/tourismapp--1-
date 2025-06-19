"use client"

import type { ReactNode } from "react"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
