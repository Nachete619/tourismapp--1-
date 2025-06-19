export interface Database {
  public: {
    Tables: {
      productos: {
        Row: {
          id: string
          codigo: string
          nombre: string
          descripcion: string | null
          tipo: "vuelo" | "hospedaje" | "auto" | "paquete"
          precio: number
          precio_original: number | null
          stock: number
          imagen_url: string | null
          destacado: boolean
          activo: boolean
          destino: string | null
          duracion: string | null
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: {
          id?: string
          codigo: string
          nombre: string
          descripcion?: string | null
          tipo: "vuelo" | "hospedaje" | "auto" | "paquete"
          precio: number
          precio_original?: number | null
          stock?: number
          imagen_url?: string | null
          destacado?: boolean
          activo?: boolean
          destino?: string | null
          duracion?: string | null
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
        Update: {
          id?: string
          codigo?: string
          nombre?: string
          descripcion?: string | null
          tipo?: "vuelo" | "hospedaje" | "auto" | "paquete"
          precio?: number
          precio_original?: number | null
          stock?: number
          imagen_url?: string | null
          destacado?: boolean
          activo?: boolean
          destino?: string | null
          duracion?: string | null
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
      }
      usuarios: {
        Row: {
          id: string
          email: string
          nombre_completo: string | null
          telefono: string | null
          tipo_usuario: "cliente" | "admin"
          activo: boolean
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: {
          id: string
          email: string
          nombre_completo?: string | null
          telefono?: string | null
          tipo_usuario?: "cliente" | "admin"
          activo?: boolean
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
        Update: {
          id?: string
          email?: string
          nombre_completo?: string | null
          telefono?: string | null
          tipo_usuario?: "cliente" | "admin"
          activo?: boolean
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
      }
    }
  }
}

// Tipo para productos (usando nombres en español)
export type Producto = Database["public"]["Tables"]["productos"]["Row"]

// Tipo para usuarios
export type Usuario = Database["public"]["Tables"]["usuarios"]["Row"]

// Para compatibilidad con código existente, mantenemos el tipo Product como alias
export type Product = Producto
