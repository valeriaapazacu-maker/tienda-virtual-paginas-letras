import { Fragment } from "react"

interface HeaderProps {
  busqueda: string
  onBusqueda: (texto: string) => void
}

const enlaces = ["Inicio", "Catálogo", "Novedades", "Ofertas", "Contacto"]

export default function Header({ busqueda, onBusqueda }: HeaderProps) {
  return (
    <header className="bg-white">
      <div className="bg-neutral-950 text-xs font-semibold text-white">
        <div className="mx-auto flex max-w-6xl justify-between px-4 py-2">
          <a href="#">Contacto</a>
          <a href="#">Mi cuenta</a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-5 sm:grid sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex w-full max-w-xs overflow-hidden rounded-full border-2 border-neutral-200 sm:max-w-none">
          <input
            value={busqueda}
            onChange={(e) => onBusqueda(e.target.value)}
            placeholder="Título, categoría o descripción"
            className="w-full px-4 py-2 text-sm outline-none"
          />
          <span className="flex items-center bg-neutral-950 px-4 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
        </div>

        <div className="order-first flex flex-col items-center sm:order-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-lg font-extrabold text-white">
            P&amp;L
          </div>
          <h1 className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">Páginas &amp; Letras</h1>
          <p className="text-xs text-neutral-500">Libros. Lecturas.</p>
        </div>

        <div className="flex items-center gap-2 sm:justify-self-end">
          <div className="relative">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" />
            </svg>
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">0</span>
          </div>
          <span className="text-sm font-semibold">Mi compra</span>
        </div>
      </div>

      <nav className="mx-auto max-w-6xl border-y border-neutral-200 px-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 py-3 text-sm text-neutral-800">
          {enlaces.map((e, i) => (
            <Fragment key={e}>
              {i > 0 && <li className="text-neutral-400">•</li>}
              <li><a href="#" className="hover:underline">{e}</a></li>
            </Fragment>
          ))}
        </ul>
      </nav>
    </header>
  )
}