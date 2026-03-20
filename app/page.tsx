import Link from "next/link";
import Image from "next/image";
import { Brain, Newspaper, Zap, Shield, Users, BookOpen, ArrowRight, CheckCircle } from "lucide-react";

const modules = [
  {
    href: "/aprender/detecta-fake",
    icon: Newspaper,
    color: "from-rose-500 to-orange-500",
    badge: "Mais popular",
    title: "Detecta Fake",
    desc: "Cole uma notícia e a IA ajuda você a descobrir se é verdadeira ou mentira. Aprenda a pensar criticamente.",
  },
  {
    href: "/aprender/prompt-lab",
    icon: Zap,
    color: "from-violet-500 to-blue-500",
    badge: "Interativo",
    title: "Prompt Lab",
    desc: "Converse com IA de verdade. Aprenda a fazer as perguntas certas e extrair respostas incríveis.",
  },
  {
    href: "/aprender/vies-na-maquina",
    icon: Brain,
    color: "from-amber-500 to-yellow-500",
    badge: "Importante",
    title: "Viés na Máquina",
    desc: "Descubra como a IA pode discriminar. Casos reais brasileiros: raça, gênero, região.",
  },
  {
    href: "/cidadao",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    badge: "Proteção",
    title: "Golpe ou IA?",
    desc: "Aprenda a identificar deepfakes, clonagem de voz e golpes de WhatsApp usando IA.",
  },
];

const forWho = [
  { icon: BookOpen, title: "Estudantes", desc: "Do fundamental ao ensino médio. Aprenda no seu ritmo, no seu jeito." },
  { icon: Users, title: "Professores", desc: "Planos de aula prontos alinhados à BNCC. Sem precisar ser especialista." },
  { icon: Shield, title: "Cidadãos", desc: "Adultos e famílias que querem se proteger e entender o mundo movido por IA." },
];

const stats = [
  { value: "100%", label: "Gratuito para escolas públicas" },
  { value: "PT-BR", label: "Conteúdo em português nativo" },
  { value: "IA Real", label: "Sem simulações — IA de verdade" },
];

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="IA Fala Brasil"
              width={160}
              height={160}
              className="rounded-2xl drop-shadow-2xl"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Novo no Brasil — IA acessível para todos
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Aprenda{" "}
            <span className="gradient-text">Inteligência<br />Artificial</span>{" "}
            do jeito brasileiro
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Prático, acessível e sem enrolação. Para estudantes, professores e qualquer cidadão
            que quer entender e usar IA no dia a dia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/aprender/prompt-lab"
              className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Experimentar agora <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/aprender"
              className="px-8 py-4 rounded-xl bg-slate-800 text-white font-bold text-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Ver todos os módulos
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-400">{value}</div>
              <div className="text-sm text-slate-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">O que você vai aprender</h2>
            <p className="text-slate-400">Módulos com IA de verdade integrada — não é teoria, é prática.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map(({ href, icon: Icon, color, badge, title, desc }) => (
              <Link key={href} href={href} className="group card-glow">
                <div className="h-full p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-emerald-400 text-sm font-medium">
                    Acessar módulo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="py-20 px-4 bg-slate-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Para quem é o IA Fala Brasil?</h2>
          <p className="text-slate-400 mb-12">Para todo mundo. Sem exceção.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {forWho.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para entender a IA que<br />
            <span className="gradient-text">está mudando o Brasil?</span>
          </h2>
          <p className="text-slate-400 mb-8">Comece agora. É gratuito. É em português. É pra você.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/aprender/prompt-lab"
              className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Começar agora <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/professor" className="px-8 py-4 rounded-xl border border-slate-700 text-slate-300 font-bold hover:border-slate-600 hover:text-white transition-colors">
              Sou professor
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            {["Sem cadastro obrigatório", "Funciona no celular", "Instale como app"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
