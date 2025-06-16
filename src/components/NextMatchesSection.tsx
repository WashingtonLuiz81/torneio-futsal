"use client";

import { CalendarDays, Clock } from "lucide-react";
import tabela from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";

const getTimeById = (id: string) => times.find((t) => t.id === id);

const getStatusDoJogo = (data: string, hora: string) => {
  const agora = new Date();

  const [horaStr, minutoStr] = hora.split(":");
  const [ano, mes, dia] = data.split("-").map(Number);
  const horaNum = Number(horaStr);
  const minutoNum = Number(minutoStr);

  const inicio = new Date(ano, mes - 1, dia, horaNum, minutoNum);
  const fim = new Date(inicio.getTime() + 60 * 60000); // 60 minutos

  if (isNaN(inicio.getTime())) return "invalido";
  if (agora < inicio) return "em_breve";
  if (agora >= inicio && agora <= fim) return "em_andamento";
  return "aguardando_atualizacao";
};

export const NextMatchesSection = () => {
  const proximaRodada = tabela.find((rodada) => rodada.realizada === false);

  if (!proximaRodada) {
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
        {proximaRodada.fase === 'classificacao' && (
          <h2 className="text-3xl font-bebas uppercase text-center text-secondary mb-10 tracking-widest">
            Próximos Jogos - Rodada ${proximaRodada.rodada}
          </h2>
        )}

        {proximaRodada.fase === 'semifinal' && (
        <h2 className="text-3xl font-bebas uppercase text-center text-secondary mb-10 tracking-widest">
            Semifinais
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {proximaRodada.jogos.map((jogo, idx) => {
            const timeA = getTimeById(jogo.casa);
            const timeB = getTimeById(jogo.fora);
            const status = getStatusDoJogo(jogo.data, jogo.hora);

            return (
              <div
                key={idx}
                className="w-full bg-white shadow-xl rounded-xl p-6 hover:scale-105 transition-transform duration-300 border-t-4 border-highlight"
              >
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
