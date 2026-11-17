export interface Categoria {
  id: number
  nombre: string
  descripcion: string
}

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number | string
  imagen: string
  stock: number
  categoria: number
  categoria_nombre: string
}