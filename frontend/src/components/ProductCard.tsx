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
}

export default function ProductCard({ nombre, descripcion, precio, imagen, categoria, stock }: ProductCardProps) {
  const precioFormato = Number(precio).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <Card className="group gap-0 border-0 bg-transparent py-0 text-center shadow-none">
      <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <img
          src={imagen}
          alt={nombre}
          className="h-full w-full object-cover shadow-md transition duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-col items-center px-1 pt-3">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500">{categoria}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold uppercase leading-tight text-neutral-900">{nombre}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{descripcion}</p>
        <p className="mt-2 text-lg font-extrabold text-neutral-950">S/. {precioFormato}</p>
        {stock !== undefined && (
          <Badge variant="outline" className="mt-1 text-[11px] font-normal text-neutral-600">
            Stock: {stock}
          </Badge>
        )}
        <Button className="mt-3 rounded-sm bg-neutral-950 px-6 hover:bg-neutral-700">Comprar</Button>
      </CardContent>
    </Card>
  )
}