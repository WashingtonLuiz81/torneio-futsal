// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative h-[50vh] w-full">
      {/* Imagem de fundo */}
      <Image
        src="/bg-futsal.jpg"
        alt="Futsal"
        fill
        className="object-cover"
        priority
      />

      {/* Camada escura para contraste */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Conteúdo */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bebas uppercase tracking-widest text-highlight drop-shadow-md">
          Torneio de Futsal 2025
        </h1>
        <p className="text-lg md:text-xl mt-4 font-sans text-zinc-100 max-w-2xl drop-shadow-sm">
          Fair play, paixão e amizade em quadra. Acompanhe tudo sobre o torneio
          que movimenta os veteranos!
        </p>
      </div>
    </section>
  );
}
