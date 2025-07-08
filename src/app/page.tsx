// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CountdownSection } from "@/components/CountdownSection";
import { NextMatchesSection } from "@/components/NextMatchesSection";
import { QuickAccessSection } from "@/components/QuickAccessSection";
import { TopPlayersSection } from "@/components/TopPlayersSection";
import tabela from "@/lib/data/tabela.json";
import times from "@/lib/data/times.json";
import { X } from "lucide-react";

const getTime = (id: string) => times.find((t) => t.id === id);

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [campeao, setCampeao] = useState<{ nome: string; cor: string; icone: string } | null>(null);

  useEffect(() => {
    const finalRodada = tabela.find((r) => r.fase.toLowerCase() === "final");

    if (finalRodada?.realizada && finalRodada.jogos[0]?.golsCasa != null && finalRodada.jogos[0]?.golsFora != null) {
      const jogoFinal = finalRodada.jogos[0];
      const vencedorId =
        jogoFinal.golsCasa > jogoFinal.golsFora
          ? jogoFinal.casa
          : jogoFinal.golsFora > jogoFinal.golsCasa
          ? jogoFinal.fora
          : null;

      if (vencedorId) {
        const timeVencedor = getTime(vencedorId);
        if (timeVencedor) {
          setCampeao({
            nome: timeVencedor.nome,
            cor: timeVencedor.cor,
            icone: timeVencedor.icone,
          });
          setShowModal(true);
        }
      }
    }
  }, []);

  return (
    <>
      <section className="relative h-[50vh] w-full">
        <Image
          src="/assets/bg-futsal.jpg"
          alt="Futsal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bebas uppercase tracking-widest text-highlight drop-shadow-md">
            Torneio de Futsal Diego Monteiro
          </h1>
          <p className="text-lg md:text-xl mt-4 font-sans text-zinc-100 max-w-2xl drop-shadow-sm">
            Fair play, paixão e amizade em quadra. Acompanhe tudo sobre o
            torneio que movimenta os veteranos!
          </p>
        </div>
      </section>

      <NextMatchesSection />
      <TopPlayersSection />
      <CountdownSection />
      <QuickAccessSection />

      {/* Modal de Campeão com Fogos - sem som */}
      {showModal && campeao && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in">
          {/* Fogos animados usando CSS simples */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </div>

          <div className="relative bg-white text-center rounded-xl p-8 max-w-md mx-4 shadow-2xl border-4 border-highlight animate-zoom-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-zinc-500 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <Image
              src="/assets/trofeu.png"
              alt="Troféu"
              width={150}
              height={150}
              className="mx-auto mb-4 animate-bounce"
            />

            <h2 className="text-3xl md:text-4xl font-bebas uppercase tracking-widest mb-2 text-highlight">
              Campeão do Torneio Diego Monteiro
            </h2>

            <div className="flex flex-col items-center justify-center gap-2 mt-4">
              <Image
                src={campeao.icone}
                alt={campeao.nome}
                width={80}
                height={80}
                className="drop-shadow-md"
              />
              <span
                className="text-2xl md:text-3xl font-bold"
                style={{ color: campeao.cor }}
              >
                {campeao.nome}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
