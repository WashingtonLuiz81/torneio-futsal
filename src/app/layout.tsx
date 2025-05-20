// app/layout.tsx
import { Header } from "@/components/header";
import "./globals.css";
import { Poppins, Bebas_Neue } from "next/font/google";
import { Footer } from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", // só tem um peso disponível
  variable: "--font-bebas",
  display: "swap",
});

export const metadata = {
  title: "Torneio de Futsal",
  description: "Site oficial do Torneio de Futsal Veterano",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${bebas.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
