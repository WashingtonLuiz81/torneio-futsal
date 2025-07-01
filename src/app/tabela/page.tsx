// app/tabela/page.tsx
"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import tabela from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";
import artilheiros from "@/lib/data/artilheiros.json";
import goleiros from "@/lib/data/goleiros.json";
import { Trophy, XCircle, Medal } from "lucide-react";

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
        stats[casa].v++; stats[fora].d++; stats[casa].pts += 3;
      } else if (golsCasa < golsFora) {
        stats[fora].v++; stats[casa].d++; stats[fora].pts += 3;
      } else {
        stats[casa].e++; stats[fora].e++; stats[casa].pts++; stats[fora].pts++;
      }
    });
  });
  return times
    .map(t => {
      const d = stats[t.id] || { j:0,v:0,e:0,d:0,gp:0,gc:0,pts:0 };
      return { timeId: t.id, ...d, sg: d.gp - d.gc };
    })
    .sort((a, b) => b.pts - a.pts || b.sg - a.sg || b.gp - a.gp);
};

export default function TabelaPage() {
  const classificacao = calcularClassificacao();
  const jogos = tabela.flatMap(rodada =>
    rodada.jogos.map(j => ({
      ...j,
      rodada: rodada.rodada,
      fase: rodada.fase,
      realizada: rodada.realizada
    }))
  );
  const faseGrupos = jogos.filter(j => j.fase === "Classificacao");
  const faseMata = jogos.filter(j => j.fase !== "Classificacao");

  return (
    <div className="flex-1 mx-auto px-4 py-12 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-8 text-center text-secundary">
        Tabela do Torneio
      </h1>

      <Tabs defaultValue="jogos" className="w-full">
        <TabsList className="mb-6 justify-center">
          <TabsTrigger value="jogos">🏆 Jogos</TabsTrigger>
          <TabsTrigger value="classificacao">📊 Classificação</TabsTrigger>
          <TabsTrigger value="artilheiros">🥅 Artilheiros</TabsTrigger>
        </TabsList>

        <TabsContent value="jogos">
          <Tabs defaultValue="grupos">
            <TabsList className="mb-4 gap-4">
              <TabsTrigger value="grupos">Fase de Grupos</TabsTrigger>
              <TabsTrigger value="mata">Mata‑Mata</TabsTrigger>
            </TabsList>

            <TabsContent value="grupos">
              <div className="grid sm:grid-cols-2 gap-6">
                {faseGrupos.map((j, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
                    <div className="text-sm text-zinc-500 mb-1">Rodada {j.rodada}</div>
                    <div className="flex justify-between items-center font-semibold">
                      <span>{getTime(j.casa)?.nome}</span>
                      <span>
                        {j.realizada ? `${j.golsCasa} x ${j.golsFora}` : "vs"}
                      </span>
                      <span>{getTime(j.fora)?.nome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Mata-mata */}
            <TabsContent value="mata">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Semifinais */}
                <div className="space-y-6 w-full">
                  {faseMata
                    .filter((j) => j.fase === "semifinal")
                    .map((j, i) => (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-lg shadow min-w-[300px]"
                      >
                        <div className="flex flex-row justify-between text-sm text-zinc-500 mb-2">
                          <span>Semifinal {i+1}</span>
                          <span>{j.hora}h</span>
                        </div>

                        <div className="flex justify-between items-center font-semibold text-lg">
                          <span>{getTime(j.casa)?.nome}</span>
                          <span>
                            {j.realizada ? (
                              <>
                                {j.golsCasa}
                                {j.penaltiCasa && (
                                  <sup className="text-xs ml-1 align-super text-red-300">{`(${j.penaltiCasa})`}</sup>
                                )}
                                {" x "}
                                {j.golsFora}
                                {j.penaltiFora && (
                                  <sup className="text-xs ml-1 align-super text-red-300">{`(${j.penaltiFora})`}</sup>
                                )}
                              </>
                            ) : (
                              "–"
                            )}
                          </span>

                          <span>{getTime(j.fora)?.nome}</span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Troféu central */}
                <div className="relative w-full lg:w-1/3 flex justify-center">
                  <Image
                    src="/assets/trofeu.png"
                    alt="Troféu"
                    width={260}
                    height={260}
                    className="object-contain"
                  />
                </div>

                {/* Final e 3º lugar */}
                <div className="space-y-6 w-full lg:w-1/3">
                  {faseMata
                    .filter((j) => j.fase !== "semifinal")
                    .map((j, i) => (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-lg shadow min-w-[360px]"
                      >
                        <div className="text-sm text-zinc-500 mb-2">
                          {j.fase === "final" ? "Final" : "3º Lugar"}
                        </div>
                        <div className="flex justify-between items-center font-semibold text-lg">
                          <span>{getTime(j.casa)?.nome}</span>
                          <span>{j.realizada ? `${j.golsCasa} x ${j.golsFora}` : "–"}</span>
                          <span>{getTime(j.fora)?.nome}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Indicadores campeón / terceiro */}
              <div className="mt-6 text-center space-y-2">
                <div className="text-lg font-semibold">🏅 Campeão: —</div>
                <div className="text-lg">🥉 3º Lugar: —</div>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

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
              {classificacao.map((item, i) => {
                const time = getTime(item.timeId);
                const rowBg =
                  i < 4 ? "bg-green-100" :
                  i === classificacao.length - 1 ? "bg-red-100" : "";

                return (
                  <tr key={i} className={rowBg}>
                    <td className="p-2 flex items-center gap-2">
                      <Image
                        src={time?.icone || ""}
                        alt={time?.nome || ""}
                        width={24}
                        height={24}
                      />
                      {time?.nome}
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
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1 text-green-700">
              <Trophy className="w-4 h-4" /> <span>Classificados</span>
            </div>
            <div className="flex items-center gap-1 text-red-700">
              <XCircle className="w-4 h-4" /> <span>Eliminado</span>
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
                .slice()
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
      </Tabs>
    </div>
  );
}
