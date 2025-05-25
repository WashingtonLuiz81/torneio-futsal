"use client";

import goleirosData from "@/lib/data/goleiros.json";
import artilheirosData from "@/lib/data/artilheiros.json";
import times from "@/lib/data/times.json";
import { Goal, ShieldCheck } from "lucide-react";
import { Artilheiro, Goleiro } from "@/lib/types/types";

const getTimeName = (id: string) =>
  times.find((t) => t.id === id)?.nome || "Time";
const artilheiros = artilheirosData as Artilheiro[];
const goleiros = goleirosData as Goleiro[];

export const TopPlayersSection = () => {
  const topScorer = artilheiros.sort((a, b) => b.gols - a.gols)[0];
  const topGoalkeeper = goleiros.sort(
    (a, b) => a.golsSofridos - b.golsSofridos
  )[0];

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

          {/* Goleiro menos vazado */}
          <div className="bg-secundary text-white shadow-md rounded-xl p-6 border-l-4 border-highlight hover:scale-105 transition">
            <div className="flex items-center gap-4 mb-4 text-highlight">
              <ShieldCheck className="w-7 h-7" />
              <h3 className="text-2xl font-bebas uppercase">
                Goleiro Menos Vazado
              </h3>
            </div>
            <p className="text-xl font-semibold">{topGoalkeeper.jogador}</p>
            <p className="text-sm text-white/80 mb-2">
              {getTimeName(topGoalkeeper.time)}
            </p>
            <p className="text-lg font-bold">
              Sofreu {topGoalkeeper.golsSofridos} gols
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
