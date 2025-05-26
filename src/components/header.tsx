"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import clsx from "clsx";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Tabela", href: "/tabela" },
    { label: "Regras", href: "/regras" },
    { label: "Times", href: "/times" },
  ];

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-secundary text-white">
      {/* Logo */}
      <Link
        href="/"
        className="font-bebas text-3xl uppercase tracking-wider text-highlight"
      >
        Futsal 2025
      </Link>

      {/* Navegação desktop */}
      <nav className="hidden md:flex gap-6 font-sans text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "transition-colors duration-200 hover:text-highlight",
              pathname === item.href ? "text-highlight" : "text-white"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Navegação mobile */}
      <div className="md:hidden">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button aria-label="Abrir menu">
              <Menu className="w-6 h-6 text-highlight" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="p-4 bg-white rounded-tl-lg border-none rounded-bl-lg w-4/5 max-w-xs">
            <DrawerTitle className="text-xl font-bebas text-secundary mb-4">
              Menu
            </DrawerTitle>
            <nav className="flex flex-col gap-4 font-sans text-base font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "transition-colors duration-200 hover:text-primary",
                    pathname === item.href ? "text-highlight" : "text-secundary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};
