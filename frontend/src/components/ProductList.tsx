import ProductCard from "@/components/ProductCard"
import type { Producto } from "@/types"

export default function ProductList({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return <p className="py-10 text-center text-neutral-500">No se encontraron productos.</p>
  }
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {productos.map((p) => (
        <ProductCard
          key={p.id}
          nombre={p.nombre}
          descripcion={p.descripcion}
          precio={p.precio}
          imagen={p.imagen}
          categoria={p.categoria_nombre}
          stock={p.stock}
        />
      ))}
    </div>
  )
}