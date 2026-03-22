import Link from "next/link";
import Image from "next/image";
import { Target, Heart, BookOpen, Smartphone, ArrowRight, Globe, Star } from "lucide-react";

const missao = [
  {
    icon: Target,
    titulo: "Nossa Missão",
    desc: "Democratizar o acesso ao conhecimento em Inteligência Artificial para todos os brasileiros — de estudantes da escola pública ao cidadão comum — de forma prática, acessível e em português.",
  },
  {
    icon: Heart,
    titulo: "Nossos Valores",
    desc: "Educação gratuita e inclusiva, conteúdo 100% em português, contexto genuinamente brasileiro, ética no uso da tecnologia e respeito à diversidade do povo brasileiro.",
  },
  {
    icon: Globe,
    titulo: "Nossa Visão",
    desc: "Ser a principal plataforma de alfabetização em IA do Brasil, presente em escolas públicas e privadas de todos os estados, formando a geração que vai liderar o país na era da inteligência artificial.",
  },
];

const numeros = [
  { valor: "4", label: "Módulos ativos com IA real" },
  { valor: "2026", label: "Ano de lançamento" },
  { valor: "100%", label: "Gratuito para escolas públicas" },
  { valor: "PT-BR", label: "Conteúdo nativo em português" },
];

const projetos = [
  {
    icon: Smartphone,
    nome: "Fala Brasil",
    desc: "Aplicativo de tecnologia e comunicação desenvolvido para conectar brasileiros através da inovação digital.",
  },
  {
    icon: BookOpen,
    nome: "Livros Publicados",
    desc: "Obras lançadas no Brasil e nos Estados Unidos, levando conhecimento em tecnologia e inovação para leitores em dois países.",
  },
];

export default function SobrePage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white border-b border-gray-200 py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm mb-6">
            🇧🇷 Feito no Brasil, para o Brasil
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Sobre o <span className="gradient-text">IA Fala Brasil</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Uma plataforma criada com o propósito de colocar o Brasil na vanguarda
            da educação em Inteligência Artificial — acessível, prática e genuinamente brasileira.
          </p>
        </div>
      </section>

      {/* Números */}
      <section className="bg-green-700 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {numeros.map(({ valor, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-yellow-400 mb-1">{valor}</div>
              <div className="text-sm text-green-100">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Missão */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">O que nos move</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {missao.map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundador */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Quem está por trás</h2>

          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">

            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-green-700 to-blue-800 flex items-center justify-center shadow-lg">
                <span className="text-6xl font-extrabold text-white">R</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h3 className="text-2xl font-extrabold text-slate-900">Ronny Y Oliveira</h3>
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              </div>
              <p className="text-green-700 font-semibold mb-4">Fundador · Desenvolvedor · Autor</p>

              <div className="flex flex-col gap-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Com projetos em tecnologia desde <strong className="text-slate-800">2020</strong>,
                  Ronny Y Oliveira combina visão empreendedora e paixão por educação para criar
                  soluções digitais que impactam a vida real das pessoas.
                </p>
                <p>
                  Autor de livros lançados no <strong className="text-slate-800">Brasil e nos Estados Unidos</strong>,
                  Ronny leva sua experiência editorial para dentro do IA Fala Brasil — construindo
                  conteúdo que é ao mesmo tempo rigoroso, acessível e profundamente brasileiro.
                </p>
                <p>
                  O IA Fala Brasil nasce da mesma missão que guia todos os seus projetos:
                  <em className="text-slate-700"> usar tecnologia para abrir portas, não fechá-las.</em>
                </p>
              </div>

              {/* Projetos anteriores */}
              <div className="mt-8">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">Outros projetos</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {projetos.map(({ icon: Icon, nome, desc }) => (
                    <div key={nome} className="flex-1 p-4 rounded-xl bg-slate-50 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-green-700" />
                        <span className="font-bold text-slate-900 text-sm">{nome}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-50 text-center border-t border-gray-200">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Faça parte dessa missão</h2>
          <p className="text-gray-500 mb-8">
            Seja professor, estudante ou cidadão — o IA Fala Brasil foi feito para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/aprender"
              className="px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:bg-green-600 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Começar a aprender <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/professor"
              className="px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-colors shadow-sm"
            >
              Sou professor
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
