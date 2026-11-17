import { useState } from "react"
import Banner from "@/components/Banner"
import Header from "@/components/Header"
import Catalogo from "@/pages/Catalogo"

export default function App() {
  const [busqueda, setBusqueda] = useState("")

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header busqueda={busqueda} onBusqueda={setBusqueda} />
      <Banner />
      <Catalogo busqueda={busqueda} />
      <footer className="bg-neutral-950 py-6 text-center text-xs text-neutral-300">
        © 2026 Páginas &amp; Letras · Libros. Lecturas.
      </footer>
    </div>
  )
}