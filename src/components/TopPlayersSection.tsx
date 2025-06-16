"use client";

import goleirosData from "@/lib/data/goleiros.json";
import artilheirosData from "@/lib/data/artilheiros.json";
import tabelaData from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";
import { Goal, ShieldCheck } from "lucide-react";
import { Artilheiro } from "@/lib/types/types";

const getTimeName = (id: string) =>
  times.find((t) => t.id === id)?.nome || "Time";

const artilheiros = artilheirosData as Artilheiro[];
const tabela = tabelaData;

export const TopPlayersSection = () => {
  const topScorer = artilheiros.sort((a, b) => b.gols - a.gols)[0];

  // Calcular gols sofridos por time
  const golsSofridosPorTime: Record<string, number> = {};

  tabela.forEach((rodada) => {
    if (!rodada.realizada) return;

    rodada.jogos.forEach((jogo) => {
      if (jogo.golsCasa == null || jogo.golsFora == null) return;

      golsSofridosPorTime[jogo.casa] =
        (golsSofridosPorTime[jogo.casa] || 0) + jogo.golsFora;

      golsSofridosPorTime[jogo.fora] =
        (golsSofridosPorTime[jogo.fora] || 0) + jogo.golsCasa;
    });
  });

  const defesaMenosVazada = Object.entries(golsSofridosPorTime)
    .sort(([, golsA], [, golsB]) => golsA - golsB)[0];

  return (
    <section className="bg-zinc-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bebas uppercase text-center text-secundary mb-10 tracking-widest">
          Destaques do Torneio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artilheiro */}
          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-highlight hover:scale-105 transition">
            <div className="flex items-center gap-4 mb-4 text-highlight">
              <Goal className="w-7 h-7" />
              <h3 className="text-2xl font-bebas uppercase">Artilheiro</h3>
            </div>
            <p className="text-xl font-semibold text-zinc-800">
              {topScorer.jogador}
            </p>
            <p className="text-sm text-zinc-500 mb-2">
              {getTimeName(topScorer.time)}
            </p>
            <p className="text-lg font-bold">{topScorer.gols} gols</p>
          </div>

          {/* Defesa menos vazada */}
          {defesaMenosVazada ? (
            <div className="bg-secundary text-white shadow-md rounded-xl p-6 border-l-4 border-highlight hover:scale-105 transition">
              <div className="flex items-center gap-4 mb-4 text-highlight">
                <ShieldCheck className="w-7 h-7" />
                <h3 className="text-2xl font-bebas uppercase">
                  Defesa Menos Vazada
                </h3>
              </div>
              <p className="text-xl font-semibold">
                {getTimeName(defesaMenosVazada[0])}
              </p>
              <p className="text-lg font-bold">
                Sofreu {defesaMenosVazada[1]} gols
              </p>
            </div>
          ) : (
            <div className="bg-secundary text-white shadow-md rounded-xl p-6 border-l-4 border-highlight">
              <p className="text-white/80 italic">
                Nenhum dado disponível da defesa.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
