export default function Banner() {
  return (
    <section className="mx-auto mt-6 max-w-6xl px-4">
      <div className="flex items-center justify-between overflow-hidden bg-stone-200 px-8 py-10 sm:px-14">
        <div>
          <h2 className="text-4xl font-extrabold uppercase leading-none text-neutral-950 sm:text-6xl">
            Nuevas<br />lecturas
          </h2>
          <p className="mt-3 text-lg font-bold text-stone-500 sm:text-2xl">Selección del mes</p>
          <p className="mt-6 text-sm font-semibold text-neutral-800">📦 Hacemos envíos a todo el Perú</p>
        </div>
        <img
          src="https://picsum.photos/seed/portada-banner/300/400"
          alt="Libro destacado"
          className="hidden h-56 w-44 object-cover shadow-2xl sm:block"
        />
      </div>
    </section>
  )
}