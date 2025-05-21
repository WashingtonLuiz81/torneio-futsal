"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

const nextMatchDate = new Date("2025-05-25T08:45:00");

export const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = nextMatchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-highlight text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bebas uppercase tracking-widest mb-4">
          Contagem para a próxima rodada
        </h2>

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
      </div>
    </section>
  );
};
