"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Users, Shield, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const links = [
  { href: "/aprender", label: "Aprender", icon: BookOpen },
  { href: "/professor", label: "Professor", icon: Users },
  { href: "/cidadao", label: "Cidadão", icon: Shield },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="IA Fala Brasil"
            width={44}
            height={44}
            className="rounded-xl object-cover"
            priority
          />
          <span className="font-bold text-lg text-slate-900">
            IA <span className="text-green-700">Fala Brasil</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/aprender/prompt-lab"
            className="ml-2 px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-600 transition-colors shadow-sm"
          >
            Experimentar IA
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                pathname.startsWith(href)
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/aprender/prompt-lab"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-lg bg-green-700 text-white text-sm font-semibold text-center"
          >
            Experimentar IA
          </Link>
        </div>
      )}
    </nav>
  );
}
