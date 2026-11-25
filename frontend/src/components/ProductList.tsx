import ProductCard from "@/components/ProductCard"
import type { Producto } from "@/types"

interface ProductListProps {
  productos: Producto[]
  onSeleccionar?: (producto: Producto) => void
}

export default function ProductList({ productos, onSeleccionar }: ProductListProps) {
  if (productos.length === 0) {
    return <p className="py-10 text-center text-sm text-neutral-500">No se encontraron libros con esos filtros.</p>
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
          descuento={p.descuento}
          precioFinal={p.precio_final}
          estadoStock={p.estado_stock}
          destacado={p.destacado}
          onSeleccionar={() => onSeleccionar?.(p)}
        />
      ))}
    </div>
  )
}