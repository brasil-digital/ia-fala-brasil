import Link from "next/link";
import { Newspaper, Zap, Brain, ArrowRight, Lock } from "lucide-react";

const modulos = [
  {
    href: "/aprender/detecta-fake",
    icon: Newspaper,
    color: "from-rose-500 to-orange-500",
    titulo: "Detecta Fake",
    desc: "Cole uma notícia ou mensagem de WhatsApp e a IA analisa se é verdadeira, falsa ou precisar de verificação.",
    tags: ["Pensamento crítico", "Desinformação", "BNCC"],
    tempo: "5-10 min",
    nivel: "Todos",
    disponivel: true,
  },
  {
    href: "/aprender/prompt-lab",
    icon: Zap,
    color: "from-violet-500 to-blue-500",
    titulo: "Prompt Lab",
    desc: "Converse com IA de verdade. Aprenda a formular perguntas melhores e entenda como a IA responde.",
    tags: ["Engenharia de prompt", "IA generativa", "Prática"],
    tempo: "Livre",
    nivel: "Todos",
    disponivel: true,
  },
  {
    href: "/aprender/vies-na-maquina",
    icon: Brain,
    color: "from-amber-500 to-yellow-500",
    titulo: "Viés na Máquina",
    desc: "Entenda como a IA pode discriminar e reproduzir preconceitos. Casos reais com contexto brasileiro.",
    tags: ["Ética em IA", "Discriminação", "Direitos digitais"],
    tempo: "10-15 min",
    nivel: "Médio",
    disponivel: true,
  },
  {
    href: "#",
    icon: Brain,
    color: "from-slate-600 to-slate-700",
    titulo: "Como a IA Aprende",
    desc: "Redes neurais, dados de treino e aprendizado de máquina explicados com exemplos do dia a dia brasileiro.",
    tags: ["Machine Learning", "Fundamentos"],
    tempo: "15 min",
    nivel: "Básico",
    disponivel: false,
  },
];

export default function AprenderPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">Módulos de Aprendizado</h1>
        <p className="text-slate-400 text-lg">
          Aprenda IA na prática. Cada módulo usa IA de verdade — não é simulação.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {modulos.map(({ href, icon: Icon, color, titulo, desc, tags, tempo, nivel, disponivel }) => (
          <div key={titulo} className={`relative card-glow ${!disponivel ? "opacity-60" : ""}`}>
            {!disponivel && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                <Lock className="w-3 h-3" /> Em breve
              </div>
            )}
            <Link href={disponivel ? href : "#"} className={!disponivel ? "pointer-events-none" : ""}>
              <div className="h-full p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{titulo}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-500">
                    ⏱ {tempo} · {nivel}
                  </div>
                  {disponivel && (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      Acessar <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
