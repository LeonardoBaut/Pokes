import Image from "next/image";
import Link from "next/link";

// 1. Función para consumir la API (PokeAPI)
// Esto se ejecuta en el servidor, generando los elementos dinámicos
async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=7");
  const data = await res.json();
  
  // Mapeamos los resultados para obtener un objeto limpio con ID y Nombre
  return data.results.map((poke: any, index: number) => {
    // El ID real se puede extraer de la URL o usar el index + 1
    const id = index + 1;
    return {
      id: id,
      name: poke.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    };
  });
}

export default async function PokesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obtenemos los datos antes de renderizar
  const pokemons = await getPokemons();

  return (
    // 2. Contenedor Principal: Flex Column en móvil, Flex Row en Desktop (lg)
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      
      {/* --- INICIO DEL MENÚ --- */}
      <nav className="
        w-full lg:w-64 
        bg-slate-900 text-white 
        p-4 lg:p-6 
        flex-shrink-0
      ">
        <div className="mb-4 text-xl font-bold text-center lg:text-left text-yellow-400">
          PokeMenu
        </div>

        {/* Contenedor de Items: 
           - Móvil (sm): Flex Row con scroll horizontal (overflow-x)
           - Desktop (lg): Flex Column vertical
        */}
        <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
          {pokemons.map((poke: any) => (
            <Link 
              href={`/pokes/${poke.id}`} 
              key={poke.id}
              className="
                flex flex-col lg:flex-row items-center gap-3 
                p-3 rounded-xl 
                bg-slate-800 hover:bg-slate-700 
                transition-colors min-w-[100px] lg:min-w-0
                group
              "
            >
              <div className="relative w-12 h-12 lg:w-10 lg:h-10 group-hover:scale-110 transition-transform">
                <Image 
                  src={poke.image} 
                  alt={poke.name} 
                  fill
                  className="object-contain" // Asegura que la imagen no se deforme
                />
              </div>
              <span className="capitalize text-sm font-medium hidden sm:block lg:block">
                {poke.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
      {/* --- FIN DEL MENÚ --- */}

      {/* 3. Área de Contenido (Children) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-2">
                Zona de Detalles
            </h1>
            {children}
        </div>
      </main>

    </div>
  );
}