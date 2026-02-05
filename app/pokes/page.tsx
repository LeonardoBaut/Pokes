import Image from "next/image";
import Link from "next/link";

// Función para obtener un listado con detalles básicos
async function getPokemonsList() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
  const data = await res.json();

  // Para mostrar "datos" en la card, necesitamos hacer un fetch por cada pokemon
  // o extraer el ID. Haremos un Promise.all para obtener tipos básicos.
  const detailedPokemons = await Promise.all(
    data.results.map(async (poke: any) => {
      const resDetail = await fetch(poke.url);
      const details = await resDetail.json();
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other.dream_world.front_default || details.sprites.front_default,
        type: details.types[0].type.name,
      };
    })
  );

  return detailedPokemons;
}

export default async function PokesPage() {
  const pokemons = await getPokemonsList();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-slate-700">Explorador de Pokémons</h2>
      
      {/* Grid Responsivo: 1 col (sm), 2 cols (md), 3 cols (lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.map((poke) => (
          <Link 
            href={`/pokes/${poke.id}`} 
            key={poke.id}
            className="block group"
          >
            <article className="
              bg-white p-6 rounded-2xl shadow-lg border border-slate-100
              hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 
              transition-all duration-300 flex flex-col items-center
            ">
              <div className="w-28 h-28 relative mb-4">
                <Image
                  src={poke.image}
                  alt={poke.name}
                  fill
                  className="object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                />
              </div>
              
              <h3 className="text-xl font-bold capitalize text-slate-800 mb-1">
                {poke.name}
              </h3>
              
              <span className="
                px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600
              ">
                Tipo: {poke.type}
              </span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}