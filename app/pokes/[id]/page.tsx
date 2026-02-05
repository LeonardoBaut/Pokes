import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fetch seguro que no explota
async function getPokemonDetail(id: string) {
  // 1. Evitar error con favicon o ids vacíos
  if (!id || id === 'favicon.ico') return null;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return null; // Devuelve null si es 404
    return res.json();
  } catch (error) {
    return null;
  }
}

// 2. Definir el tipo para params como Promise (Next.js 15 Standard)
type Props = {
  params: Promise<{ id: string }>;
};

export default async function PokemonDetailPage({ params }: Props) {
  // 3. ¡IMPORTANTE! Usamos await aquí para sacar el ID
  const { id } = await params;
  
  const pokemon = await getPokemonDetail(id);

  // Si no existe, mostrar pantalla 404
  if (!pokemon) return notFound();

  // Simplificar stats
  const stats = pokemon.stats.map((s: any) => ({
    name: s.stat.name,
    val: s.base_stat
  }));

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <Link href="/pokes" className="inline-block mb-4 text-blue-600 hover:underline">
        &larr; Volver al listado
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {/* Header con nombre */}
        <div className="bg-slate-800 p-6 text-center">
          <h1 className="text-4xl font-extrabold text-white capitalize">{pokemon.name}</h1>
          <p className="text-slate-400 font-mono mt-1">ID: #{pokemon.id}</p>
        </div>

        <div className="flex flex-col md:flex-row p-8 gap-8">
          {/* Imagen Grande */}
          <div className="w-full md:w-1/2 flex justify-center items-center bg-slate-50 rounded-xl p-4">
            <div className="relative w-60 h-60">
              <Image 
                src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Datos y Stats */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
               <div className="bg-blue-50 p-3 rounded-lg">
                 <p className="text-xs text-blue-500 uppercase font-bold">Peso</p>
                 <p className="text-lg font-bold text-slate-700">{pokemon.weight / 10} kg</p>
               </div>
               <div className="bg-blue-50 p-3 rounded-lg">
                 <p className="text-xs text-blue-500 uppercase font-bold">Altura</p>
                 <p className="text-lg font-bold text-slate-700">{pokemon.height / 10} m</p>
               </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-3 border-b pb-1">Estadísticas Base</h3>
              <div className="space-y-3">
                {stats.map((s: any) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1 uppercase font-semibold text-slate-500">
                      <span>{s.name}</span>
                      <span>{s.val}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400" 
                        style={{ width: `${Math.min(s.val, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}