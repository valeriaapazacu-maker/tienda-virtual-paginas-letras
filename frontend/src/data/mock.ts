import type { Categoria, Producto } from "@/types"

export const categoriasMock: Categoria[] = [
  { id: 1, nombre: "Novela", descripcion: "" },
  { id: 2, nombre: "Ciencia", descripcion: "" },
  { id: 3, nombre: "Infantil", descripcion: "" },
]

export const productosMock: Producto[] = [
  { id: 1, nombre: "Cien años de soledad", descripcion: "Clásico de Gabriel García Márquez.", precio: 59.9, imagen: "https://picsum.photos/seed/libro1/300/400", stock: 12, categoria: 1, categoria_nombre: "Novela" },
  { id: 2, nombre: "Breve historia del tiempo", descripcion: "Divulgación científica de Stephen Hawking.", precio: 49.5, imagen: "https://picsum.photos/seed/libro2/300/400", stock: 8, categoria: 2, categoria_nombre: "Ciencia" },
  { id: 3, nombre: "El principito", descripcion: "Cuento ilustrado de Antoine de Saint-Exupéry.", precio: 29.9, imagen: "https://picsum.photos/seed/libro3/300/400", stock: 20, categoria: 3, categoria_nombre: "Infantil" },
  { id: 4, nombre: "La ciudad y los perros", descripcion: "Novela de Mario Vargas Llosa.", precio: 45, imagen: "https://picsum.photos/seed/libro4/300/400", stock: 10, categoria: 1, categoria_nombre: "Novela" },
]