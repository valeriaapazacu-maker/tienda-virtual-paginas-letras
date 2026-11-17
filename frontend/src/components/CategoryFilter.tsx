import { Button } from "@/components/ui/button"
import type { Categoria } from "@/types"

interface Props {
  categorias: Categoria[]
  seleccionada: number | null
  onSelect: (id: number | null) => void
}

export default function CategoryFilter({ categorias, seleccionada, onSelect }: Props) {
  const estilo = (activa: boolean) =>
    activa
      ? "rounded-full bg-neutral-950 text-white hover:bg-neutral-700"
      : "rounded-full border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100"

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" className={estilo(seleccionada === null)} onClick={() => onSelect(null)}>
        Todas
      </Button>
      {categorias.map((c) => (
        <Button key={c.id} variant="outline" className={estilo(seleccionada === c.id)} onClick={() => onSelect(c.id)}>
          {c.nombre}
        </Button>
      ))}
    </div>
  )
}