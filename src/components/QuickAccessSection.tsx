// components/QuickAccessSection.tsx
import Link from "next/link";
import { ListOrdered, Gavel, Users } from "lucide-react";

const items = [
  {
    icon: ListOrdered,
    title: "Classificação e Artilharia",
    description:
      "Veja a tabela atualizada com os melhores times e jogadores do torneio.",
    href: "/tabela",
    button: "Ver Tabela",
  },
  {
    icon: Gavel,
    title: "Regras do Torneio",
    description: "Entenda como funcionam os critérios, formatos e penalidades.",
    href: "/regras",
    button: "Ver Regras",
  },
  {
    icon: Users,
    title: "Times e Jogadores",
    description: "Conheça os elencos e as equipes participantes da competição.",
    href: "/times",
    button: "Ver Times",
  },
];

export const QuickAccessSection = () => {
  return (
    <section className="px-4 py-16 bg-backgroundLight text-zinc-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bebas text-secundary uppercase text-center mb-10">
          Acesso Rápido
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.href}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start gap-4 hover:shadow-lg hover:scale-105 transition"
              >
                <Icon className="w-8 h-8 text-highlight" />
                <h3 className="text-xl font-bebas text-secundary uppercase">
                  {item.title}
                </h3>
                <p className="text-sm font-sans text-zinc-600">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-auto bg-highlight text-white text-sm font-medium py-2 px-4 rounded hover:bg-primary transition-colors"
                >
                  {item.button}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
