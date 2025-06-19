"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import type { Profile } from "@/types/database"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  demoSignIn: (role: "client" | "admin") => Promise<void>
  isAdmin: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if we have a demo user in localStorage
    const demoUser = localStorage.getItem("demoUser")
    if (demoUser) {
      try {
        const parsedUser = JSON.parse(demoUser)
        setUser(parsedUser.user)
        setProfile(parsedUser.profile)
      } catch (error) {
        console.error("Error parsing demo user:", error)
        localStorage.removeItem("demoUser")
      }
    }

    // Check if Supabase is configured
    if (!isSupabaseAvailable) {
      console.warn("Supabase not configured, auth features limited to demo mode")
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseAvailable) {
      throw new Error(
        "Supabase no está configurado. Por favor usa los botones de demo o configura las variables de entorno.",
      )
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseAvailable) {
      throw new Error(
        "Supabase no está configurado. Por favor usa los botones de demo o configura las variables de entorno.",
      )
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    // Clear demo user if exists
    localStorage.removeItem("demoUser")

    setUser(null)
    setProfile(null)

    if (!isSupabaseAvailable) {
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  // Demo sign in function
  const demoSignIn = async (role: "client" | "admin") => {
    // Create a mock user and profile
    const mockUser = {
      id: role === "admin" ? "demo-admin-id" : "demo-client-id",
      email: role === "admin" ? "admin@demo.com" : "usuario@demo.com",
      user_metadata: {
        full_name: role === "admin" ? "Administrador Demo" : "Usuario Demo",
      },
    } as User

    const mockProfile: Profile = {
      id: mockUser.id,
      email: mockUser.email,
      full_name: mockUser.user_metadata.full_name,
      role: role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Save to localStorage for persistence
    localStorage.setItem("demoUser", JSON.stringify({ user: mockUser, profile: mockProfile }))

    // Update state
    setUser(mockUser)
    setProfile(mockProfile)
  }

  const isAdmin = profile?.role === "admin"

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    demoSignIn,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
