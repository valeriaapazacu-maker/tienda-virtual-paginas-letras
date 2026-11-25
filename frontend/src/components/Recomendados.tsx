import { useEffect, useState } from "react"
import ProductList from "@/components/ProductList"
import { getProductos, getRecomendados } from "@/services/api"
import type { Producto } from "@/types"

interface RecomendadosProps {
  base: Producto | null
  onSeleccionar: (producto: Producto) => void
}

export default function Recomendados({ base, onSeleccionar }: RecomendadosProps) {
  const [items, setItems] = useState<Producto[]>([])

  useEffect(() => {
    let activo = true
    const peticion: Promise<Producto[]> = base
      ? getRecomendados(base.id)
      : getProductos().then((ps) => ps.filter((p) => p.destacado && p.stock > 0).slice(0, 4))

    peticion
      .then((datos) => {
        if (activo) setItems(datos)
      })
      .catch(() => {
        if (activo) setItems([])
      })
    return () => {
      activo = false
    }
  }, [base])

  if (items.length === 0) return null

  return (
    <section className="space-y-6 border-t border-neutral-200 pt-10">
      <div>
        <h2 className="text-2xl font-extrabold uppercase tracking-wide text-neutral-950">
          {base ? `Si te interesó "${base.nombre}"` : "Recomendados del mes"}
        </h2>
        <div className="mt-2 h-[3px] w-16 bg-neutral-950" />
        <p className="mt-2 text-sm text-neutral-500">
          {base
            ? "Libros de la misma categoría y otras ofertas para ti."
            : "Haz clic en un libro para ver recomendaciones según tu interés."}
        </p>
      </div>
      <ProductList productos={items} onSeleccionar={onSeleccionar} />
    </section>
  )
}