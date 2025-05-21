import { Goal, ShieldCheck } from "lucide-react";

const topScorer = {
  name: "Carlos Souza",
  team: "Dragões",
  goals: 9,
  color: "#E63946",
};

const topGoalkeeper = {
  name: "Rodrigo Lima",
  team: "Lobos",
  goalsConceded: 2,
  color: "#2A9D8F",
};

export const TopPlayersSection = () => {
  return (
    <section className="py-20 px-4 max-w-full bg-gray-200">
      <div className="mx-auto max-w-[1024px]">
        <h2 className="text-3xl font-bebas uppercase text-center text-backgroundDark mb-10 tracking-widest">
          Destaques do Torneio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artilheiro - fundo branco */}
          <div className="bg-white shadow-xl rounded-xl p-6 hover:scale-105 transition-transform duration-300 border-l-4 border-highlight">
            <div className="flex items-center gap-4 mb-4 text-highlight">
              <Goal className="w-8 h-8" />
              <h3 className="text-2xl font-bebas uppercase tracking-wide">
                Artilheiro
              </h3>
            </div>
            <div className="font-sans text-zinc-700">
              <p
                className="text-xl font-semibold"
                style={{ color: topScorer.color }}
              >
                {topScorer.name}
              </p>
              <p className="text-sm text-zinc-500 mb-2">{topScorer.team}</p>
              <p className="text-lg font-bold">
                {topScorer.goals} gols marcados
              </p>
            </div>
          </div>

          {/* Goleiro - fundo escuro */}
          <div className="bg-secundary text-white shadow-xl rounded-xl p-6 hover:scale-105 transition-transform duration-300 border-l-4 border-highlight">
            <div className="flex items-center gap-4 mb-4 text-highlight">
              <ShieldCheck className="w-8 h-8" />
              <h3 className="text-2xl font-bebas uppercase tracking-wide">
                Goleiro menos vazado
              </h3>
            </div>
            <div className="font-sans">
              <p
                className="text-xl font-semibold"
                style={{ color: topGoalkeeper.color }}
              >
                {topGoalkeeper.name}
              </p>
              <p className="text-sm text-white/70 mb-2">{topGoalkeeper.team}</p>
              <p className="text-lg font-bold">
                Apenas {topGoalkeeper.goalsConceded} gols sofridos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
