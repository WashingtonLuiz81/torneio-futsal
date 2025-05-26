"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import tabela from "@/lib/data/tabela.json";

const matchDurationMinutes = 60;

export const CountdownSection = () => {
  const [nextMatchDate, setNextMatchDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<"countdown" | "live" | "waiting">(
    "waiting"
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Encontrar a próxima rodada com `realizada === false`
    const proximaRodada = tabela.find(
      (r) =>
        r.realizada === false &&
        r.jogos.some((j) => {
          const [h, m] = j.hora.split(":");
          const dataHora = new Date(
            `${j.data}T${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`
          );
          return dataHora > new Date();
        })
    );

    if (proximaRodada) {
      const jogo = proximaRodada.jogos[0]; // pega o primeiro jogo da rodada
      const [h, m] = jogo.hora.split(":");
      const dataHora = new Date(
        `${jogo.data}T${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`
      );
      setNextMatchDate(dataHora);
    }
  }, []);

  useEffect(() => {
    if (!nextMatchDate) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const start = nextMatchDate.getTime();
      const end = start + matchDurationMinutes * 60 * 1000;

      if (now >= start && now <= end) {
        setStatus("live");
        return;
      }

      if (now > end) {
        setStatus("waiting");
        return;
      }

      setStatus("countdown");
      const distance = start - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextMatchDate]);

  // Caso não tenha jogo válido, não renderiza nada
  if (!nextMatchDate) return null;

  return (
    <section className="bg-highlight text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bebas uppercase tracking-widest mb-4">
          Contagem para a próxima rodada
        </h2>

        {status === "countdown" && (
          <>
            <p className="font-sans text-lg mb-8">
              A bola vai rolar no dia{" "}
              <strong className="underline">
                {format(nextMatchDate, "EEEE, dd 'de' MMMM 'às' HH:mm'h'", {
                  locale: ptBR,
                })}
              </strong>
            </p>
            <div className="flex justify-center gap-6 text-4xl font-bold font-mono">
              <div className="text-center">
                <p>{String(timeLeft.days).padStart(2, "0")}</p>
                <span className="text-sm font-sans">dias</span>
              </div>
              <div className="text-center">
                <p>{String(timeLeft.hours).padStart(2, "0")}</p>
                <span className="text-sm font-sans">horas</span>
              </div>
              <div className="text-center">
                <p>{String(timeLeft.minutes).padStart(2, "0")}</p>
                <span className="text-sm font-sans">min</span>
              </div>
              <div className="text-center">
                <p>{String(timeLeft.seconds).padStart(2, "0")}</p>
                <span className="text-sm font-sans">seg</span>
              </div>
            </div>
          </>
        )}

        {status === "live" && (
          <p className="text-2xl font-bold animate-pulse text-green-300 mt-6">
            🟢 Bola rolando agora!
          </p>
        )}

        {status === "waiting" && (
          <p className="text-lg italic text-yellow-200 mt-6">
            ⏳ Aguardando atualização da tabela...
          </p>
        )}
      </div>
    </section>
  );
};
