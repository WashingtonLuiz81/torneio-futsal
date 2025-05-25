// app/tabela/page.tsx
"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import tabela from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const getTimeById = (id: string) => times.find((t) => t.id === id);

// Função para calcular a classificação com base no tabela.json
const calcularClassificacao = () => {
  const stats: Record<string, any> = {};

  tabela.forEach((rodada) => {
    if (!rodada.realizada) return;

    rodada.jogos.forEach((jogo) => {
      const { casa, fora, golsCasa, golsFora } = jogo;
      if (golsCasa === null || golsFora === null) return;

      stats[casa] = stats[casa] || {
        j: 0,
        v: 0,
        e: 0,
        d: 0,
        gp: 0,
        gc: 0,
        sg: 0,
        pts: 0,
      };
      stats[fora] = stats[fora] || {
        j: 0,
        v: 0,
        e: 0,
        d: 0,
        gp: 0,
        gc: 0,
        sg: 0,
        pts: 0,
      };

      stats[casa].j++;
      stats[fora].j++;
      stats[casa].gp += golsCasa;
      stats[casa].gc += golsFora;
      stats[fora].gp += golsFora;
      stats[fora].gc += golsCasa;

      if (golsCasa > golsFora) {
        stats[casa].v++;
        stats[fora].d++;
        stats[casa].pts += 3;
      } else if (golsCasa < golsFora) {
        stats[fora].v++;
        stats[casa].d++;
        stats[fora].pts += 3;
      } else {
        stats[casa].e++;
        stats[fora].e++;
        stats[casa].pts++;
        stats[fora].pts++;
      }
    });
  });

  return Object.entries(stats)
    .map(([timeId, dados]) => ({
      timeId,
      ...dados,
      sg: dados.gp - dados.gc,
    }))
    .sort((a, b) => {
      return b.pts - a.pts || b.sg - a.sg || b.gp - a.gp;
    });
};

export default function TabelaPage() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const classificacao = calcularClassificacao();

  const jogosRealizados = tabela.flatMap((rodada) =>
    rodada.realizada
      ? rodada.jogos.map((jogo) => ({ ...jogo, rodada: rodada.rodada }))
      : []
  );

  const jogosPendentes = tabela.flatMap((rodada) =>
    !rodada.realizada
      ? rodada.jogos.map((jogo) => ({ ...jogo, rodada: rodada.rodada }))
      : []
  );

  return (
    <div>
      <section className="relative h-[300px] w-full">
        <Image
          src="/assets/futsal-hero.jpg"
          alt="Tabela do Torneio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-title uppercase tracking-wide">
            Tabela do Torneio
          </h1>
        </div>
      </section>

      <div className="px-4 py-4 text-sm text-zinc-600">
        <span className="text-zinc-400">Início /</span>{" "}
        <span className="text-zinc-700">Tabela</span>
      </div>

      <Tabs
        defaultValue="classificacao"
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="classificacao">Classificação</TabsTrigger>
          <TabsTrigger value="jogos">Jogos</TabsTrigger>
        </TabsList>

        <TabsContent value="classificacao">
          <table className="w-full text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-center">Pts</th>
                <th className="p-2 text-center">J</th>
                <th className="p-2 text-center">V</th>
                <th className="p-2 text-center">E</th>
                <th className="p-2 text-center">D</th>
                <th className="p-2 text-center">GP</th>
                <th className="p-2 text-center">GC</th>
                <th className="p-2 text-center">SG</th>
              </tr>
            </thead>
            <tbody>
              {classificacao.map((item) => {
                const time = getTimeById(item.timeId);
                return (
                  <tr
                    key={item.timeId}
                    className="border-b hover:bg-zinc-50 cursor-pointer"
                    onClick={() => setSelectedTime(item.timeId)}
                  >
                    <td className="p-2 font-medium">{time?.nome}</td>
                    <td className="p-2 text-center font-bold text-primary">
                      {item.pts}
                    </td>
                    <td className="p-2 text-center">{item.j}</td>
                    <td className="p-2 text-center">{item.v}</td>
                    <td className="p-2 text-center">{item.e}</td>
                    <td className="p-2 text-center">{item.d}</td>
                    <td className="p-2 text-center">{item.gp}</td>
                    <td className="p-2 text-center">{item.gc}</td>
                    <td className="p-2 text-center">{item.sg}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="jogos">
          <div className="mb-6">
            <h3 className="text-xl font-title mb-2 text-secondary">
              Jogos Realizados
            </h3>
            <ul className="space-y-2">
              {jogosRealizados.map((j, i) => (
                <li key={i} className="text-sm">
                  Rodada {j.rodada}:{" "}
                  <strong>{getTimeById(j.casa)?.nome}</strong> {j.golsCasa} x{" "}
                  {j.golsFora} <strong>{getTimeById(j.fora)?.nome}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-title mb-2 text-secondary">
              Jogos Pendentes
            </h3>
            <ul className="space-y-2">
              {jogosPendentes.map((j, i) => (
                <li key={i} className="text-sm">
                  Rodada {j.rodada}:{" "}
                  <strong>{getTimeById(j.casa)?.nome}</strong> vs{" "}
                  <strong>{getTimeById(j.fora)?.nome}</strong> - {j.data} às{" "}
                  {j.hora}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedTime} onOpenChange={() => setSelectedTime(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {getTimeById(selectedTime || "")?.nome || "Time"}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-zinc-600">
            <p>Mais detalhes do time podem ser mostrados aqui futuramente.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
