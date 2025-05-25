// components/NextMatchesSection.tsx
"use client";

import { CalendarDays, Clock } from "lucide-react";
import tabela from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";

const getTimeById = (id: string) => times.find((t) => t.id === id);

export const NextMatchesSection = () => {
  const proximaRodada = tabela.find((r) => r.realizada === false);

  if (!proximaRodada) return null;

  return (
    <section className="py-20 px-4 max-w-full">
      <div className="mx-auto max-w-[1024px]">
        <h2 className="text-3xl font-bebas uppercase text-center text-secondary mb-10 tracking-widest">
          Próximos Jogos - Rodada {proximaRodada.rodada}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {proximaRodada.jogos.map((jogo, idx) => {
            const timeA = getTimeById(jogo.casa);
            const timeB = getTimeById(jogo.fora);
            return (
              <div
                key={idx}
                className="bg-white shadow-xl rounded-xl p-6 hover:scale-105 transition-transform duration-300 border-t-4 border-highlight max-w-[80%]"
              >
                <div className="flex items-center justify-between mb-8 text-zinc-600 text-sm font-sans">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>
                      {new Date(jogo.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{jogo.hora}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <p
                      className="text-xl font-bebas uppercase"
                      style={{ color: timeA?.cor || "#000" }}
                    >
                      {timeA?.nome || jogo.casa}
                    </p>
                  </div>
                  <span className="font-bebas text-2xl text-zinc-500">vs</span>
                  <div className="flex-1 text-left">
                    <p
                      className="text-xl font-bebas uppercase"
                      style={{ color: timeB?.cor || "#000" }}
                    >
                      {timeB?.nome || jogo.fora}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
