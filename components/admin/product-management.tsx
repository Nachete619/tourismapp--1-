"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Search, Download, Star, Package, Plane, Car, Building, MapPin, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase, isSupabaseAvailable } from "@/lib/supabase"
import type { Product } from "@/types/database"
import Image from "next/image"

interface ProductFormData {
  code: string
  name: string
  description: string
  type: string
  price: number
  original_price?: number
  stock: number
  image_url?: string
  destination?: string
  duration?: string
  featured: boolean
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    code: "",
    name: "",
    description: "",
    type: "vuelo",
    price: 0,
    original_price: 0,
    stock: 0,
    image_url: "",
    destination: "",
    duration: "",
    featured: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    // Always use mock data for preview/demo initially
    const mockProducts = [
      {
        id: "1",
        code: "VUE001",
        name: "Buenos Aires - Madrid",
        description: "Vuelo directo con Iberia, incluye equipaje",
        type: "vuelo",
        price: 850000,
        original_price: 950000,
        stock: 15,
        image_url: "/placeholder.svg?height=200&width=300",
        destination: "Madrid, España",
        duration: "13h 30m",
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        code: "HOT001",
        name: "Hotel Palacio Real",
        description: "Hotel 5 estrellas en el centro de Madrid",
        type: "hospedaje",
        price: 120000,
        original_price: 150000,
        stock: 8,
        image_url: "/placeholder.svg?height=200&width=300",
        destination: "Madrid, España",
        duration: "Por noche",
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        code: "CAR001",
        name: "Toyota Corolla 2024",
        description: "Auto económico, aire acondicionado, transmisión automática",
        type: "auto",
        price: 45000,
        stock: 5,
        image_url: "/placeholder.svg?height=200&width=300",
        destination: "Madrid, España",
        duration: "Por día",
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "4",
        code: "PAQ001",
        name: "Paquete Europa Clásica",
        description: "Tour completo por 5 países europeos",
        type: "paquete",
        price: 600000,
        original_price: 750000,
        stock: 3,
        image_url: "/placeholder.svg?height=200&width=300",
        destination: "Europa",
        duration: "15 días",
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "5",
        code: "VUE002",
        name: "Buenos Aires - París",
        description: "Vuelo con escala, Air France",
        type: "vuelo",
        price: 920000,
        stock: 12,
        image_url: "/placeholder.svg?height=200&width=300",
        destination: "París, Francia",
        duration: "16h 45m",
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    setLoading(false)

    // Only try Supabase if it's properly configured
    if (!isSupabaseAvailable) {
      setProducts(mockProducts)
      return
    }

    try {
      const { data, error } = await supabase.from("productos").select("*").order("created_at", { ascending: false })

      if (error) {
        console.warn("Supabase error, using mock data:", error.message)
        setProducts(mockProducts)
        return
      }

      if (data && data.length > 0) {
        // Mapear de español (BD) a inglés (código)
        const mappedProducts = data.map((dbProduct) => ({
          id: dbProduct.id,
          code: dbProduct.codigo,
          name: dbProduct.nombre,
          description: dbProduct.descripcion || "",
          type: dbProduct.tipo,
          price: dbProduct.precio,
          original_price: dbProduct.precio_oferta,
          stock: dbProduct.stock,
          image_url: dbProduct.imagen_url || "/placeholder.svg?height=200&width=300",
          destination: dbProduct.destino,
          duration: dbProduct.duracion_dias ? `${dbProduct.duracion_dias} días` : null,
          featured: dbProduct.destacado || false,
          created_at: dbProduct.created_at,
          updated_at: dbProduct.updated_at,
        }))

        console.log("Products loaded from Supabase:", mappedProducts.length)
        setProducts(mappedProducts)
      } else {
        console.log("No products found in Supabase, using mock data")
        setProducts(mockProducts)
      }
    } catch (error) {
      console.error("Error connecting to Supabase:", error)
      setProducts(mockProducts)
    }
  }

  const handleCreateProduct = async () => {
    if (!formData.name || !formData.code || formData.price <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    const mappedData = {
      codigo: formData.code,
      nombre: formData.name,
      descripcion: formData.description,
      tipo: formData.type,
      precio: formData.price,
      precio_oferta: formData.original_price || null,
      stock: formData.stock,
      imagen_url: formData.image_url || "/placeholder.svg?height=200&width=300",
      destino: formData.destination || null,
      disponible: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const newProduct = {
      id: Date.now().toString(),
      ...mappedData,
      // Keep these for local state compatibility
      code: formData.code,
      name: formData.name,
      description: formData.description,
      type: formData.type,
      price: formData.price,
      original_price: formData.original_price || null,
      image_url: formData.image_url || "/placeholder.svg?height=200&width=300",
      destination: formData.destination || null,
      duration: formData.duration || null,
      featured: formData.featured,
    }

    // Add to local state
    setProducts((prev) => [newProduct, ...prev])

    // Try Supabase if available
    if (isSupabaseAvailable) {
      try {
        const { error } = await supabase.from("productos").insert([mappedData])
        if (error) {
          console.error("Supabase insert failed:", error.message)
          toast({
            title: "Error de Base de Datos",
            description: `Error al guardar: ${error.message}`,
            variant: "destructive",
          })
          return
        } else {
          console.log("Product successfully inserted into Supabase")
        }
      } catch (error) {
        console.error("Error inserting to Supabase:", error)
        toast({
          title: "Error de Conexión",
          description: "No se pudo conectar con la base de datos",
          variant: "destructive",
        })
        return
      }
    }

    toast({
      title: "Producto Creado",
      description: "El producto se creó exitosamente",
    })

    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct || !formData.name || !formData.code || formData.price <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    const mappedData = {
      codigo: formData.code,
      nombre: formData.name,
      descripcion: formData.description,
      tipo: formData.type,
      precio: formData.price,
      precio_oferta: formData.original_price || null,
      stock: formData.stock,
      imagen_url: formData.image_url || editingProduct.image_url,
      destino: formData.destination || null,
      updated_at: new Date().toISOString(),
    }

    const updatedProduct = {
      ...editingProduct,
      ...mappedData,
      // Keep these for local state compatibility
      code: formData.code,
      name: formData.name,
      description: formData.description,
      type: formData.type,
      price: formData.price,
      original_price: formData.original_price || null,
      image_url: formData.image_url || editingProduct.image_url,
      destination: formData.destination || null,
      duration: formData.duration || null,
      featured: formData.featured,
    }

    // Update local state
    setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))

    // Try Supabase if available
    if (isSupabaseAvailable) {
      try {
        const { error } = await supabase.from("productos").update(mappedData).eq("id", editingProduct.id)

        if (error) {
          console.error("Supabase update failed:", error.message)
          toast({
            title: "Error de Base de Datos",
            description: `Error al actualizar: ${error.message}`,
            variant: "destructive",
          })
          return
        } else {
          console.log("Product successfully updated in Supabase")
        }
      } catch (error) {
        console.error("Error updating in Supabase:", error)
        toast({
          title: "Error de Conexión",
          description: "No se pudo conectar con la base de datos",
          variant: "destructive",
        })
        return
      }
    }

    toast({
      title: "Producto Actualizado",
      description: "Los cambios se guardaron exitosamente",
    })

    setEditingProduct(null)
    resetForm()
  }

  const handleDeleteProduct = async (productId: string) => {
    // Remove from local state
    setProducts((prev) => prev.filter((p) => p.id !== productId))

    // Try Supabase if available
    if (isSupabaseAvailable) {
      try {
        const { error } = await supabase.from("productos").delete().eq("id", productId)
        if (error) {
          console.warn("Supabase delete failed:", error.message)
        }
      } catch (error) {
        console.warn("Error deleting from Supabase:", error)
      }
    }

    toast({
      title: "Producto Eliminado",
      description: "El producto se eliminó exitosamente",
    })
  }

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      type: "vuelo",
      price: 0,
      original_price: 0,
      stock: 0,
      image_url: "",
      destination: "",
      duration: "",
      featured: false,
    })
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      code: product.code,
      name: product.name,
      description: product.description || "",
      type: product.type,
      price: product.price,
      original_price: product.original_price || 0,
      stock: product.stock,
      image_url: product.image_url || "",
      destination: product.destination || "",
      duration: product.duration || "",
      featured: product.featured,
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vuelo":
        return <Plane className="h-4 w-4" />
      case "hospedaje":
        return <Building className="h-4 w-4" />
      case "auto":
        return <Car className="h-4 w-4" />
      case "paquete":
        return <Package className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vuelo":
        return "bg-[#1B4965] text-white"
      case "hospedaje":
        return "bg-[#5FA8D3] text-white"
      case "auto":
        return "bg-[#62B6CB] text-white"
      case "paquete":
        return "bg-[#CAE9FF] text-[#1B4965]"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.destination?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || product.type === filterType
    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B4965]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1B4965]">Gestión de Productos</h2>
          <p className="text-gray-600">Administra el catálogo completo de productos</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1B4965] hover:bg-[#5FA8D3]" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white border shadow-2xl">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-xl font-bold text-[#1B4965]">Crear Nuevo Producto</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <ProductForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateProduct}
                onCancel={() => setIsCreateDialogOpen(false)}
                isEditing={false}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre, código o destino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="vuelo">Vuelos</SelectItem>
                <SelectItem value="hospedaje">Hospedaje</SelectItem>
                <SelectItem value="auto">Autos</SelectItem>
                <SelectItem value="paquete">Paquetes</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6">
        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay productos</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterType !== "all"
                  ? "No se encontraron productos con los filtros aplicados"
                  : "Comienza creando tu primer producto"}
              </p>
              {!searchTerm && filterType === "all" && (
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#1B4965] hover:bg-[#5FA8D3]">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Producto
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={product.image_url || "/placeholder.svg?height=96&width=96"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[#1B4965] text-lg">{product.name}</h3>
                          {product.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                              Destacado
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Badge className={getTypeColor(product.type)}>
                            {getTypeIcon(product.type)}
                            <span className="ml-1">{product.type}</span>
                          </Badge>
                          <span>•</span>
                          <span>Código: {product.code}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#1B4965]">${product.price.toLocaleString()}</div>
                        {product.original_price && product.original_price > product.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ${product.original_price.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      {product.destination && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {product.destination}
                        </div>
                      )}
                      {product.duration && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {product.duration}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        Stock: {product.stock}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Creado: {new Date(product.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-md bg-white border-2 shadow-2xl z-[100]">
                            <AlertDialogHeader className="space-y-3">
                              <AlertDialogTitle className="text-lg font-bold text-[#1B4965]">
                                ¿Eliminar producto?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-600">
                                Esta acción no se puede deshacer. El producto "{product.name}" será eliminado
                                permanentemente del sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="space-x-3 pt-4">
                              <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Eliminar Producto
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white border shadow-2xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-bold text-[#1B4965]">Editar Producto</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdateProduct}
              onCancel={() => setEditingProduct(null)}
              isEditing={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Product Form Component
interface ProductFormProps {
  formData: ProductFormData
  setFormData: (data: ProductFormData) => void
  onSubmit: () => void
  onCancel: () => void
  isEditing: boolean
}

function ProductForm({ formData, setFormData, onSubmit, onCancel, isEditing }: ProductFormProps) {
  return (
    <div className="space-y-6 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium text-gray-700">
            Código del Producto *
          </Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="Ej: VUE001"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Tipo de Producto *
          </Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vuelo">Vuelo</SelectItem>
              <SelectItem value="hospedaje">Hospedaje</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="paquete">Paquete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nombre del Producto *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ej: Buenos Aires - Madrid"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
          Descripción
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción detallada del producto..."
          rows={4}
          className="w-full resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium text-gray-700">
            Precio *
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="0"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="original_price" className="text-sm font-medium text-gray-700">
            Precio Original
          </Label>
          <Input
            id="original_price"
            type="number"
            value={formData.original_price}
            onChange={(e) => setFormData({ ...formData, original_price: Number(e.target.value) })}
            placeholder="0"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
            Stock *
          </Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            placeholder="0"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Destino
          </Label>
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="Ej: Madrid, España"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
            Duración
          </Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="Ej: 13h 30m"
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url" className="text-sm font-medium text-gray-700">
          URL de Imagen
        </Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
          Marcar como Producto Destacado
        </Label>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel} className="px-6">
          Cancelar
        </Button>
        <Button onClick={onSubmit} className="bg-[#1B4965] hover:bg-[#5FA8D3] px-6">
          {isEditing ? "Actualizar" : "Crear"} Producto
        </Button>
      </div>
    </div>
  )
}
