// app/tabela/page.tsx
"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import tabela from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";
import artilheiros from "@/lib/data/artilheiros.json";
import goleiros from "@/lib/data/goleiros.json";

const getTime = (id: string) => times.find((t) => t.id === id);

const calcularClassificacao = () => {
  const stats: Record<string, any> = {};

  tabela.forEach((rodada) => {
    if (!rodada.realizada) return;
    rodada.jogos.forEach(({ casa, fora, golsCasa, golsFora }) => {
      if (golsCasa == null || golsFora == null) return;

      stats[casa] ??= { j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, pts: 0 };
      stats[fora] ??= { j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, pts: 0 };

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

  const todosOsTimes = times.map((t) => t.id);

  const classificacaoFinal = todosOsTimes.map((timeId) => {
    const d = stats[timeId] ?? {
      j: 0,
      v: 0,
      e: 0,
      d: 0,
      gp: 0,
      gc: 0,
      pts: 0,
    };
    return {
      timeId,
      ...d,
      sg: d.gp - d.gc,
    };
  });

  return classificacaoFinal.sort(
    (a, b) => b.pts - a.pts || b.sg - a.sg || b.gp - a.gp
  );
};

export default function TabelaPage() {
  const classificacao = calcularClassificacao();
  const jogosRealizados = tabela.flatMap((r) =>
    r.realizada ? r.jogos.map((j) => ({ ...j, rodada: r.rodada })) : []
  );
  const jogosPendentes = tabela.flatMap((r) =>
    !r.realizada ? r.jogos.map((j) => ({ ...j, rodada: r.rodada })) : []
  );

  return (
    <div className="flex-1 mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-secundary">
        Tabela do Torneio
      </h1>

      <Tabs defaultValue="classificacao" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="classificacao">Classificação</TabsTrigger>
          <TabsTrigger value="jogos">Jogos</TabsTrigger>
          <TabsTrigger value="artilheiros">Artilheiros</TabsTrigger>
          <TabsTrigger value="goleiros">Goleiros</TabsTrigger>
        </TabsList>

        <TabsContent value="classificacao">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-secundary text-white">
              <tr>
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
                const time = getTime(item.timeId);
                return (
                  <tr key={item.timeId} className="border-b hover:bg-zinc-50">
                    <td className="p-2 flex items-center gap-2">
                      <Image
                        src={time?.icone || ""}
                        alt={time?.nome || "Time"}
                        width={24}
                        height={24}
                      />
                      {time?.nome || item.timeId}
                    </td>
                    <td className="text-center">{item.pts}</td>
                    <td className="text-center">{item.j}</td>
                    <td className="text-center">{item.v}</td>
                    <td className="text-center">{item.e}</td>
                    <td className="text-center">{item.d}</td>
                    <td className="text-center">{item.gp}</td>
                    <td className="text-center">{item.gc}</td>
                    <td className="text-center">{item.sg}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="jogos">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold mb-2 text-secundary">
                Jogos Realizados
              </h3>
              <ul className="space-y-2">
                {jogosRealizados.map((j, i) => (
                  <li key={i} className="text-sm">
                    Rodada {j.rodada}: <strong>{getTime(j.casa)?.nome}</strong>{" "}
                    {j.golsCasa} x {j.golsFora}{" "}
                    <strong>{getTime(j.fora)?.nome}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-secundary">
                Jogos Pendentes
              </h3>
              <ul className="space-y-2">
                {jogosPendentes.map((j, i) => (
                  <li key={i} className="text-sm">
                    Rodada {j.rodada}: <strong>{getTime(j.casa)?.nome}</strong>{" "}
                    vs <strong>{getTime(j.fora)?.nome}</strong> - {j.data} às{" "}
                    {j.hora}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="artilheiros">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-highlight text-white">
              <tr>
                <th className="p-2 text-left">Jogador</th>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-center">Gols</th>
              </tr>
            </thead>
            <tbody>
              {artilheiros
                .sort((a, b) => b.gols - a.gols)
                .map((a, i) => (
                  <tr key={i} className="border-b hover:bg-zinc-50">
                    <td className="p-2">{a.jogador}</td>
                    <td className="p-2">{getTime(a.time)?.nome || a.time}</td>
                    <td className="p-2 text-center">{a.gols}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="goleiros">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-highlight text-white">
              <tr>
                <th className="p-2 text-left">Goleiro</th>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-center">Gols Sofridos</th>
              </tr>
            </thead>
            <tbody>
              {goleiros
                .sort((a, b) => a.golsSofridos - b.golsSofridos)
                .map((g, i) => (
                  <tr key={i} className="border-b hover:bg-zinc-50">
                    <td className="p-2">{g.jogador}</td>
                    <td className="p-2">{getTime(g.time)?.nome || g.time}</td>
                    <td className="p-2 text-center">{g.golsSofridos}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
