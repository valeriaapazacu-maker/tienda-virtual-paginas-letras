import type { Categoria, Producto } from "@/types"

const API_URL = "http://127.0.0.1:8000/api"

async function get<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`)
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar ${ruta}`)
  }
  return respuesta.json()
}

export const getProductos = () => get<Producto[]>("/productos/")
export const getCategorias = () => get<Categoria[]>("/categorias/")