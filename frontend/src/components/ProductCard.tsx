import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  nombre: string
  descripcion: string
  precio: number | string
  imagen: string
  categoria: string
  stock?: number
  descuento?: number
  precioFinal?: number | string
  estadoStock?: "agotado" | "bajo" | "disponible"
  destacado?: boolean
  onSeleccionar?: () => void
}

const formato = (valor: number | string) =>
  Number(valor).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export default function ProductCard({
  nombre,
  descripcion,
  precio,
  imagen,
  categoria,
  stock,
  descuento = 0,
  precioFinal,
  estadoStock = "disponible",
  destacado = false,
  onSeleccionar,
}: ProductCardProps) {
  const tieneDescuento = descuento > 0
  const agotado = estadoStock === "agotado"
  const textoStock = agotado
    ? "Agotado"
    : estadoStock === "bajo"
      ? `Últimas unidades: ${stock}`
      : `Stock: ${stock}`

  return (
    <Card
      onClick={onSeleccionar}
      className="group cursor-pointer gap-0 border-0 bg-transparent py-0 text-center shadow-none"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <img
          src={imagen}
          alt={nombre}
          className={`h-full w-full object-cover shadow-md transition duration-300 group-hover:scale-105 ${
            agotado ? "opacity-60 grayscale" : ""
          }`}
        />
        {tieneDescuento && (
          <span className="absolute left-2 top-2 rounded-sm bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
            -{descuento}%
          </span>
        )}
        {destacado && (
          <span className="absolute right-2 top-2 rounded-sm bg-neutral-950 px-2 py-0.5 text-xs font-semibold text-white">
            Destacado
          </span>
        )}
      </div>
      <CardContent className="flex flex-col items-center px-1 pt-3">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500">{categoria}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold uppercase leading-tight text-neutral-900">{nombre}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{descripcion}</p>

        <div className="mt-2 flex items-baseline gap-2">
          {tieneDescuento && (
            <span className="text-sm text-neutral-400 line-through">S/. {formato(precio)}</span>
          )}
          <span className={`text-lg font-extrabold ${tieneDescuento ? "text-red-600" : "text-neutral-950"}`}>
            S/. {formato(precioFinal ?? precio)}
          </span>
        </div>

        {stock !== undefined && (
          <Badge
            variant="outline"
            className={`mt-1 text-[11px] font-normal ${
              agotado
                ? "border-red-300 text-red-600"
                : estadoStock === "bajo"
                  ? "border-amber-400 text-amber-700"
                  : "text-neutral-600"
            }`}
          >
            {textoStock}
          </Badge>
        )}

        <Button
          disabled={agotado}
          className="mt-3 rounded-sm bg-neutral-950 px-6 hover:bg-neutral-700 disabled:opacity-50"
        >
          {agotado ? "Agotado" : "Comprar"}
        </Button>
      </CardContent>
    </Card>
  )
}