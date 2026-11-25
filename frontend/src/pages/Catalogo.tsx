import { useEffect, useState } from "react"
import CategoryFilter from "@/components/CategoryFilter"
import ProductList from "@/components/ProductList"
import Recomendados from "@/components/Recomendados"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategorias, getProductos } from "@/services/api"
import type { Categoria, Producto } from "@/types"

const pill = "rounded-full border border-neutral-300 px-4 py-1.5 text-sm transition"

export default function Catalogo({ busqueda }: { busqueda: string }) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaSel, setCategoriaSel] = useState<number | null>(null)
  const [soloOfertas, setSoloOfertas] = useState(false)
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const [orden, setOrden] = useState("")
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    let activo = true
    Promise.all([getProductos(), getCategorias()])
      .then(([prods, cats]) => {
        if (!activo) return
        setProductos(prods)
        setCategorias(cats)
        setError(null)
      })
      .catch(() => {
        if (activo) setError("No se pudo cargar el catálogo. Verifica que el servidor Django esté en ejecución.")
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [recarga])

  function actualizar() {
    setCargando(true)
    setError(null)
    setRecarga((n) => n + 1)
  }

  const termino = busqueda.trim().toLowerCase()
  const productosFiltrados = productos
    .filter(
      (p) =>
        (categoriaSel === null || p.categoria === categoriaSel) &&
        (!soloOfertas || p.descuento > 0) &&
        (!soloDisponibles || p.stock > 0) &&
        (termino === "" || `${p.nombre} ${p.descripcion} ${p.categoria_nombre}`.toLowerCase().includes(termino))
    )
    .sort((a, b) => {
      if (orden === "precio-asc") return Number(a.precio_final) - Number(b.precio_final)
      if (orden === "precio-desc") return Number(b.precio_final) - Number(a.precio_final)
      if (orden === "nombre") return a.nombre.localeCompare(b.nombre, "es")
      return 0
    })

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-neutral-950">Nuestro catálogo</h2>
          <div className="mt-2 h-[3px] w-16 bg-neutral-950" />
        </div>
        <Button variant="outline" className="rounded-full border-neutral-300" onClick={actualizar}>
          Actualizar catálogo
        </Button>
      </div>

      <CategoryFilter categorias={categorias} seleccionada={categoriaSel} onSelect={setCategoriaSel} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={soloOfertas}
          onClick={() => setSoloOfertas((v) => !v)}
          className={`${pill} ${soloOfertas ? "bg-neutral-950 text-white" : "bg-white text-neutral-700"}`}
        >
          Solo ofertas
        </button>
        <button
          type="button"
          aria-pressed={soloDisponibles}
          onClick={() => setSoloDisponibles((v) => !v)}
          className={`${pill} ${soloDisponibles ? "bg-neutral-950 text-white" : "bg-white text-neutral-700"}`}
        >
          Solo disponibles
        </button>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          aria-label="Ordenar productos"
          className={`${pill} bg-white text-neutral-700`}
        >
          <option value="">Ordenar por</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="nombre">Nombre (A-Z)</option>
        </select>
      </div>

      {cargando && (
        <div>
          <p className="mb-4 text-sm font-semibold text-neutral-600">Cargando productos...</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className="aspect-[3/4] w-full" />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
      )}

      {!cargando && !error && <ProductList productos={productosFiltrados} onSeleccionar={setSeleccionado} />}
      {!cargando && !error && <Recomendados base={seleccionado} onSeleccionar={setSeleccionado} />}
    </main>
  )
}