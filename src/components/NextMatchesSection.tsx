"use client";

import { CalendarDays, Clock } from "lucide-react";
import tabela from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";

const getTimeById = (id: string) => times.find((t) => t.id === id);

const getStatusDoJogo = (data: string, hora: string) => {
  const agora = new Date();
  const [horaStr, minutoStr] = hora.split(":");
  const [ano, mes, dia] = data.split("-").map(Number);

  const inicio = new Date(ano, mes - 1, dia, Number(horaStr), Number(minutoStr));
  const fim = new Date(inicio.getTime() + 60 * 60000); // 60 min duração

  if (isNaN(inicio.getTime())) return "invalido";
  if (agora < inicio) return "em_breve";
  if (agora >= inicio && agora <= fim) return "em_andamento";
  return "aguardando_atualizacao";
};

export const NextMatchesSection = () => {
  const proximosJogos = tabela
    .filter((rodada) => rodada.realizada === false)
    .flatMap((rodada) =>
      rodada.jogos.map((jogo) => ({
        ...jogo,
        rodada: rodada.rodada,
        fase: rodada.fase,
      }))
    );

  if (proximosJogos.length === 0) {
    return (
      <section className="py-20 px-4 max-w-full">
        <div className="mx-auto max-w-[1024px] text-center">
          <h2 className="text-3xl font-bebas uppercase text-secondary mb-4 tracking-widest">
            Próximos Jogos
          </h2>
          <p className="text-zinc-600 text-lg">
            Nenhum jogo agendado no momento.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 max-w-full">
      <div className="mx-auto max-w-[1024px]">
        <h2 className="text-3xl font-bebas uppercase text-center text-secondary mb-10 tracking-widest">
          Próximos Jogos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {proximosJogos.map((jogo, idx) => {
            const timeA = getTimeById(jogo.casa);
            const timeB = getTimeById(jogo.fora);
            const status = getStatusDoJogo(jogo.data, jogo.hora);

            // Definição do subtítulo com base na fase
            let subtitulo = "";
            if (jogo.fase.toLowerCase() === "classificacao") {
              subtitulo = `Rodada ${jogo.rodada}`;
            } else if (jogo.fase.toLowerCase() === "semifinal") {
              subtitulo = "Semifinal";
            } else if (jogo.fase.toLowerCase() === "final") {
              subtitulo = "Grande Final";
            } else if (jogo.fase.toLowerCase().includes("3º")) {
              subtitulo = "Disputa de 3º Lugar";
            }

            return (
              <div
                key={idx}
                className="w-full bg-white shadow-xl rounded-xl p-6 hover:scale-105 transition-transform duration-300 border-t-4 border-highlight"
              >
                <div className="text-center text-zinc-500 text-sm mb-4">
                  {subtitulo}
                </div>

                <div className="flex items-center justify-center mb-8 text-zinc-600 text-sm font-sans min-h-[20px]">
                  {status === "em_andamento" && (
                    <span className="text-highlight animate-pulse font-bold text-sm">
                      🟢 Bola rolando!
                    </span>
                  )}

                  {status === "aguardando_atualizacao" && (
                    <span className="text-yellow-600 italic text-sm">
                      ⏳ Aguardando atualização da tabela...
                    </span>
                  )}

                  {status === "invalido" && (
                    <span className="text-red-600 text-sm italic">
                      ⚠️ Erro ao interpretar data ou hora do jogo.
                    </span>
                  )}

                  {status === "em_breve" && (
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span>
                          {new Date(
                            Number(jogo.data.split("-")[0]),
                            Number(jogo.data.split("-")[1]) - 1,
                            Number(jogo.data.split("-")[2])
                          ).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{jogo.hora}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4 text-center">
                  <div className="flex-1">
                    <p
                      className="text-xl font-bebas uppercase"
                      style={{ color: timeA?.cor || "#000" }}
                    >
                      {timeA?.nome || jogo.casa}
                    </p>
                  </div>
                  <span className="font-bebas text-2xl text-zinc-500">vs</span>
                  <div className="flex-1">
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
