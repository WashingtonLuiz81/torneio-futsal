"use client";

import times from "@/lib/data/times.json";
import jogadores from "@/lib/data/jogadores.json";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Times | Taça Diego Monteiro de Futsal",
  description:
    "Conheça as equipes participantes da 1ª Taça Diego Monteiro de Futsal.",
};

export default function TimesPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const teamData = times.find((t) => t.id === selectedTeam);
  const teamPlayers = jogadores.filter((j) => j.timeId === selectedTeam);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[300px] w-full">
        <Image
          src="/assets/futsal-teams.jpg"
          alt="Times Participantes"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bebas uppercase tracking-wide">
            Equipes Participantes
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-2 max-w-xl">
            Veja os escudos, cores e elencos dos times da Taça Diego Monteiro
          </p>
        </div>
      </section>

      {/* Times */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {times.map((time) => (
            <button
              key={time.id}
              onClick={() => setSelectedTeam(time.id)}
              className="bg-white border cursor-pointer rounded-xl shadow-md p-6 flex flex-col items-center gap-4 hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Ver jogadores do ${time.nome}`}
            >
              <Image
                src={time.icone}
                alt={`Logo do ${time.nome}`}
                width={100}
                height={100}
                className="object-contain"
              />
              <h3 className="text-lg font-bold text-center text-zinc-800">
                {time.nome}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>{teamData?.nome}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <h4 className="font-semibold mb-2">Elenco:</h4>
            <ul className="list-disc list-inside">
              {teamPlayers.map((j, i) => (
                <li key={i}>{j.nome}</li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
