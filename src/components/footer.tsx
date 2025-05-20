// components/Footer.tsx
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-secundary text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Créditos */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-highlight font-semibold">
            Torneio Futsal 2025
          </span>
          . Todos os direitos reservados.
        </p>

        {/* Links ou redes sociais */}
        <div className="flex gap-4 text-sm">
          <Link
            href="/regras"
            className="hover:text-highlight transition-colors duration-200"
          >
            Regras
          </Link>
          <Link
            href="/times"
            className="hover:text-highlight transition-colors duration-200"
          >
            Times
          </Link>
        </div>
      </div>
    </footer>
  );
};
