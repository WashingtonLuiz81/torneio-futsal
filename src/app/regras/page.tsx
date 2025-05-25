import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamento | Taça Diego Monteiro de Futsal",
  description:
    "Confira as regras da 1ª Taça Diego Monteiro de Futsal organizada pelo Clube Recreativo Jequitibá.",
};

export default function RegrasPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[300px] w-full">
        <Image
          src="/assets/futsal-rules.png"
          alt="Regras do Torneio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bebas uppercase tracking-wide">
            Regulamento Geral
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-2 max-w-xl">
            Conheça todas as regras da 1ª Taça "Diego Monteiro" de Futsal do
            Clube Recreativo Jequitibá
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-zinc-800">
        <h2 className="text-2xl font-bold mb-6">I - Da finalidade</h2>
        <p className="mb-4">
          Art.1º - O campeonato tem por finalidade, o fortalecimento dos laços
          de amizade, da camaradagem e da motivação à prática desportiva entre
          os associados do Clube Recreativo Jequitibá.
        </p>

        <h2 className="text-2xl font-bold mb-6">II - Da organização</h2>
        <p className="mb-4">
          Art. 2º - O torneio ocorrerá nas manhãs de domingo com início
          programado para 11/05/2025 e término em 06/07/2025. Contará com uma
          junta disciplinar composta por 7 membros, onde um deles será o
          presidente e terá o Voto de Minerva.
        </p>

        <h2 className="text-2xl font-bold mb-6">III - Da disputa</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            5 equipes se enfrentam entre si. Classificam-se os 4 primeiros.
          </li>
          <li>Semi-final: 1º x 4º e 2º x 3º em jogo único.</li>
          <li>Final entre vencedores e disputa de 3º entre perdedores.</li>
          <li>
            Vitória: 3 pts, Empate: 1 pt, Derrota: 0 pt. Empates vão para 3
            pênaltis.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-6">IV - Das inscrições</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Sócios nascidos antes de 01/01/1991 podem participar.</li>
          <li>Jogadores fixos em uma equipe, não podem trocar.</li>
          <li>Uso de jogador irregular resulta em perda de pontos.</li>
          <li>
            Critérios de desempate: confronto direto, vitórias, saldo de gols,
            gols marcados, vermelhos, amarelos, sorteio.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-6">V - Dos equipamentos</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            Uso de caneleira é opcional. Brincos, correntes, etc. proibidos.
          </li>
          <li>
            Uniformes obrigatórios: camisa, calção, meia e tênis adequado.
          </li>
          <li>Equipe mandante troca uniforme se houver semelhança.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6">VI - Da competição</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Partidas com 2 tempos de 25 min e intervalo de 10 min.</li>
          <li>Tolerância de 15 min para início; W.O. aplica-se após isso.</li>
          <li>Número mínimo de jogadores: 3. Abaixo disso = W.O.</li>
          <li>Equipe ausente = desclassificada e seus jogos anulados.</li>
          <li>Segue regras oficiais de Futsal.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6">VII - Das punições</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Vermelho: expulso, fora da quadra e suspenso por 1 jogo +
            julgamento.
          </li>
          <li>3 amarelos = suspensão de 1 jogo. Zera na 2ª fase.</li>
        </ul>
      </section>
    </div>
  );
}
