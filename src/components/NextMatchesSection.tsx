// components/NextMatchesSection.tsx
import { CalendarDays, Clock } from "lucide-react";

type Match = {
  id: number;
  round: number;
  date: string;
  time: string;
  teamA: {
    name: string;
    color: string;
  };
  teamB: {
    name: string;
    color: string;
  };
};

const matches: Match[] = [
  {
    id: 1,
    round: 3,
    date: "2025-08-25",
    time: "19:00",
    teamA: { name: "Dragões", color: "#E63946" },
    teamB: { name: "Fênix", color: "#F4A261" },
  },
  {
    id: 2,
    round: 3,
    date: "2025-08-25",
    time: "20:00",
    teamA: { name: "Trovões", color: "#457B9D" },
    teamB: { name: "Lobos", color: "#2A9D8F" },
  },
  {
    id: 3,
    round: 3,
    date: "2025-08-26",
    time: "19:30",
    teamA: { name: "Panteras", color: "#1D3557" },
    teamB: { name: "Titãs", color: "#E76F51" },
  },
];

export const NextMatchesSection = () => {
  return (
    <section className="py-20 px-4 max-w-full">
      <div className="mx-auto max-w-[1024px]">
        <h2 className="text-3xl font-bebas uppercase text-center text-secondary mb-10 tracking-widest">
          Próximos Jogos - Rodada {matches[0].round}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white shadow-xl rounded-xl p-6 hover:scale-105 transition-transform duration-300 border-t-4 border-highlight"
            >
              <div className="flex items-center justify-between mb-4 text-zinc-600 text-sm font-sans">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  <span>
                    {new Date(match.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{match.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-right">
                  <p
                    className="text-xl font-bebas uppercase"
                    style={{ color: match.teamA.color }}
                  >
                    {match.teamA.name}
                  </p>
                </div>
                <span className="font-bebas text-2xl text-zinc-500">vs</span>
                <div className="flex-1 text-left">
                  <p
                    className="text-xl font-bebas uppercase"
                    style={{ color: match.teamB.color }}
                  >
                    {match.teamB.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
