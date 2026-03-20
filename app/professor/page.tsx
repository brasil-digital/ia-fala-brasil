import Link from "next/link";
import { Users, BookOpen, BarChart2, FileText, ArrowRight, CheckCircle } from "lucide-react";

const planos = [
  {
    titulo: "IA e Desinformação",
    disciplina: "Língua Portuguesa / Filosofia",
    serie: "8º ano – Ensino Médio",
    bncc: "EF89LP01 · EM13LP01",
    duracao: "2 aulas (50 min cada)",
  },
  {
    titulo: "Algoritmos no Cotidiano",
    disciplina: "Matemática / Tecnologia",
    serie: "6º ao 9º ano",
    bncc: "EF06MA04 · EF07MA04",
    duracao: "1 aula (50 min)",
  },
  {
    titulo: "Viés e Discriminação em IA",
    disciplina: "Sociologia / Ética",
    serie: "Ensino Médio",
    bncc: "EM13CHS201 · EM13CHS202",
    duracao: "2 aulas (50 min cada)",
  },
  {
    titulo: "IA e Mercado de Trabalho",
    disciplina: "Projeto de Vida / Orientação",
    serie: "2º e 3º Ensino Médio",
    bncc: "EM13EP01 · EM13EP02",
    duracao: "1 aula (50 min)",
  },
];

const recursos = [
  { icon: FileText, titulo: "Planos de aula prontos", desc: "Alinhados à BNCC, com objetivos, metodologia e avaliação" },
  { icon: BarChart2, titulo: "Acompanhamento de turma", desc: "Veja o progresso individual e coletivo dos alunos" },
  { icon: BookOpen, titulo: "Banco de atividades", desc: "Exercícios, dinâmicas e avaliações por disciplina" },
  { icon: Users, titulo: "Sem precisar ser tech", desc: "Interface pensada para professores de qualquer área" },
];

export default function ProfessorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
          🏫 Para educadores do Brasil
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Leve IA para a sua<br />
          <span className="gradient-text">sala de aula</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Planos de aula prontos, alinhados à BNCC, para ensinar IA de forma prática.
          Sem precisar ser especialista em tecnologia.
        </p>
      </div>

      {/* Recursos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {recursos.map(({ icon: Icon, titulo, desc }) => (
          <div key={titulo} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Icon className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-bold text-sm mb-1">{titulo}</h3>
            <p className="text-slate-500 text-xs">{desc}</p>
          </div>
        ))}
      </div>

      {/* Planos de aula preview */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Planos de Aula Disponíveis</h2>
        <div className="flex flex-col gap-3">
          {planos.map(({ titulo, disciplina, serie, bncc, duracao }) => (
            <div key={titulo} className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{titulo}</h3>
                <p className="text-sm text-slate-400">{disciplina} · {serie}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  📋 {bncc}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  ⏱ {duracao}
                </span>
              </div>
              <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors border border-slate-700 opacity-60 cursor-not-allowed">
                Em breve
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-slate-700 text-center">
        <h2 className="text-2xl font-bold mb-3">Seja o primeiro a acessar</h2>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto">
          O painel do professor está em desenvolvimento. Cadastre sua escola para acesso antecipado gratuito.
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <button className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
              Cadastrar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            {["100% gratuito para escolas públicas", "Sem cartão de crédito", "Cancele quando quiser"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Link para módulos */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 mb-4">Enquanto isso, experimente os módulos com seus alunos:</p>
        <Link
          href="/aprender"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors border border-slate-700"
        >
          <BookOpen className="w-4 h-4" /> Ver módulos de aprendizado
        </Link>
      </div>
    </div>
  );
}
