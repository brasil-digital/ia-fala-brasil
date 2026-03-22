"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen, ChevronDown, ChevronUp, CheckCircle,
  ArrowRight, Send, Loader2, FileText, BarChart2, Bell, Users
} from "lucide-react";

const beneficios = [
  { icon: FileText,   texto: "Planos de aula prontos, alinhados à BNCC" },
  { icon: BookOpen,   texto: "Acesso aos módulos de IA para usar com a turma" },
  { icon: Bell,       texto: "Novos materiais toda semana no seu e-mail" },
  { icon: BarChart2,  texto: "Painel de progresso da turma (em breve)" },
  { icon: Users,      texto: "Comunidade de professores que usam IA" },
];

const planos = [
  {
    titulo: "IA e Desinformação",
    disciplina: "Língua Portuguesa / Filosofia",
    serie: "8º ano – Ensino Médio",
    bncc: ["EF89LP01", "EM13LP01"],
    duracao: "2 aulas de 50 min",
    objetivo: "Capacitar os alunos a identificar notícias falsas e desinformação usando pensamento crítico e ferramentas de IA.",
    materiais: ["Celulares ou computadores com acesso à internet", "Acesso ao módulo Detecta Fake (iafalabrasil.com.br)"],
    atividades: [
      { tempo: "10 min", desc: "Roda de conversa: o professor pergunta quantos alunos já receberam uma notícia falsa no WhatsApp." },
      { tempo: "15 min", desc: "Explicação sobre como funciona a desinformação digital e como a IA pode ajudar na verificação." },
      { tempo: "20 min", desc: "Prática: cada aluno acessa o módulo Detecta Fake e analisa uma notícia real trazida pelo professor." },
      { tempo: "5 min",  desc: "Discussão coletiva: o que a IA identificou? Faz sentido? O que o aluno achou que ela errou?" },
      { tempo: "2ª aula — 50 min", desc: "Alunos buscam suas próprias notícias suspeitas, analisam com a ferramenta e apresentam para a turma." },
    ],
    avaliacao: "Produção de um post explicando para a família como identificar fake news, usando o que aprendeu na aula.",
    modulo: "/aprender/detecta-fake",
    moduloLabel: "Detecta Fake",
  },
  {
    titulo: "Conversando com Inteligência Artificial",
    disciplina: "Tecnologia / Projeto de Vida",
    serie: "6º ao 9º ano",
    bncc: ["EF06MA04", "EF07MA04", "BNCC Computação"],
    duracao: "1 aula de 50 min",
    objetivo: "Introduzir os alunos ao conceito de IA generativa e ensinar como formular boas perguntas para obter resultados úteis.",
    materiais: ["Celulares ou computadores", "Acesso ao Prompt Lab (iafalabrasil.com.br)"],
    atividades: [
      { tempo: "10 min", desc: "O professor mostra o Ronny IA e faz uma pergunta simples ao vivo para a turma ver a resposta." },
      { tempo: "10 min", desc: "Explica a diferença entre uma pergunta vaga e uma pergunta específica com exemplos práticos." },
      { tempo: "25 min", desc: "Desafio em duplas: cada dupla tenta conseguir a melhor resposta para um tema sorteado." },
      { tempo: "5 min",  desc: "Compartilhamento: qual dupla conseguiu a resposta mais útil? O que fizeram de diferente?" },
    ],
    avaliacao: "Cada aluno escreve 3 perguntas bem formuladas sobre um tema da matéria atual.",
    modulo: "/aprender/prompt-lab",
    moduloLabel: "Prompt Lab",
  },
  {
    titulo: "Viés e Discriminação em IA",
    disciplina: "Sociologia / Ética",
    serie: "Ensino Médio",
    bncc: ["EM13CHS201", "EM13CHS202"],
    duracao: "2 aulas de 50 min",
    objetivo: "Compreender como sistemas de IA podem reproduzir preconceitos e discriminação, com foco no contexto brasileiro.",
    materiais: ["Celulares ou computadores", "Acesso ao módulo Viés na Máquina (iafalabrasil.com.br)"],
    atividades: [
      { tempo: "15 min", desc: "O professor apresenta casos reais: reconhecimento facial que erra mais para pessoas negras, algoritmos de crédito discriminatórios." },
      { tempo: "15 min", desc: "Debate: por que uma máquina pode ser preconceituosa se foi programada por humanos?" },
      { tempo: "20 min", desc: "Prática: alunos exploram cenários de viés em IA no contexto brasileiro." },
      { tempo: "2ª aula — 50 min", desc: "Grupos elaboram uma cartilha de direitos digitais para distribuir na comunidade escolar." },
    ],
    avaliacao: "Produção em grupo da cartilha de direitos digitais.",
    modulo: "/aprender/vies-na-maquina",
    moduloLabel: "Viés na Máquina",
  },
  {
    titulo: "IA e Golpes Digitais",
    disciplina: "Educação para a Vida / Orientação",
    serie: "Todos os anos",
    bncc: ["EM13EP01", "Competências Digitais"],
    duracao: "1 aula de 50 min",
    objetivo: "Ensinar alunos e suas famílias a identificar golpes que usam IA, como clonagem de voz, deepfakes e phishing.",
    materiais: ["Celulares", "Acesso ao módulo Golpe ou IA? (iafalabrasil.com.br)"],
    atividades: [
      { tempo: "10 min", desc: "O professor reproduz um áudio de voz clonada por IA e pergunta: 'Vocês percebem que é falso?'" },
      { tempo: "15 min", desc: "Explicação dos tipos de golpe com IA mais comuns no Brasil: WhatsApp clonado, PIX falso, deepfake." },
      { tempo: "20 min", desc: "Prática: alunos descrevem situações suspeitas no módulo e aprendem a analisar o risco." },
      { tempo: "5 min",  desc: "Tarefa de casa: ensinar um familiar idoso uma coisa que aprendeu na aula." },
    ],
    avaliacao: "Relato escrito de como o aluno ensinou um familiar sobre golpes digitais.",
    modulo: "/cidadao",
    moduloLabel: "Golpe ou IA?",
  },
];

function FormularioCadastro() {
  const [nome, setNome]     = useState("");
  const [email, setEmail]   = useState("");
  const [escola, setEscola] = useState("");
  const [enviado, setEnviado]   = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro]     = useState("");

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    try {
      const res = await fetch("https://formspree.io/f/mvzwnkkg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ nome, email, escola }),
      });
      if (res.ok) setEnviado(true);
      else setErro("Erro ao enviar. Tente novamente.");
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    }
    setEnviando(false);
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Cadastro realizado!</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Entraremos em contato em breve com seus materiais e acesso antecipado ao painel completo.
        </p>
        <Link href="/aprender" className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-700 text-white font-bold text-sm hover:bg-green-600 transition-colors">
          Explorar módulos agora <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={cadastrar} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Seu nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm shadow-sm"
      />
      <input
        type="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm shadow-sm"
      />
      <input
        type="text"
        placeholder="Nome da escola e cidade"
        value={escola}
        onChange={(e) => setEscola(e.target.value)}
        required
        className="px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm shadow-sm"
      />
      {erro && <p className="text-red-500 text-sm">{erro}</p>}
      <button
        type="submit"
        disabled={enviando}
        className="w-full py-4 rounded-xl bg-green-700 text-white font-bold text-base hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md mt-1"
      >
        {enviando
          ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
          : <><Send className="w-4 h-4" /> Quero acesso gratuito</>
        }
      </button>
      <p className="text-xs text-gray-400 text-center">
        100% gratuito para escolas públicas · Sem spam · Cancele quando quiser
      </p>
    </form>
  );
}

export default function ProfessorPage() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <div>

      {/* ── HERO COM FORMULÁRIO ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* Esquerda — proposta de valor */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm mb-5">
              🏫 Para educadores do Brasil
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Leve IA para a sua sala de aula —{" "}
              <span className="gradient-text">sem precisar ser especialista</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              Planos de aula prontos, alinhados à BNCC, com IA de verdade integrada.
              Cadastre sua escola e receba tudo gratuitamente.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {beneficios.map(({ icon: Icon, texto }) => (
                <div key={texto} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-green-700" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{texto}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Vagas limitadas para acesso antecipado.</strong> Os primeiros professores
                cadastrados recebem suporte direto para implementar IA na sala de aula.
              </p>
            </div>
          </div>

          {/* Direita — formulário em destaque */}
          <div className="bg-white rounded-2xl border-2 border-green-200 shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                Cadastre sua escola
              </h2>
              <p className="text-gray-500 text-sm">
                Acesso gratuito. Sem burocracia. Começa hoje.
              </p>
            </div>
            <FormularioCadastro />
          </div>

        </div>
      </section>

      {/* ── PLANOS DE AULA ── */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Planos de Aula prontos para usar</h2>
            <p className="text-gray-500">Clique em cada plano para ver objetivos, atividades e avaliação completos.</p>
          </div>

          <div className="flex flex-col gap-4">
            {planos.map(({ titulo, disciplina, serie, bncc, duracao, objetivo, materiais, atividades, avaliacao, modulo, moduloLabel }, i) => (
              <div key={titulo} className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setAberto(aberto === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{titulo}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <span>{disciplina}</span>
                      <span>·</span>
                      <span>{serie}</span>
                      <span>·</span>
                      <span>⏱ {duracao}</span>
                    </div>
                  </div>
                  {aberto === i
                    ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  }
                </button>

                {aberto === i && (
                  <div className="px-5 pb-6 border-t border-gray-200 pt-5 flex flex-col gap-5">
                    <div className="flex flex-wrap gap-2">
                      {bncc.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                          📋 {tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-1">Objetivo</h4>
                      <p className="text-sm text-gray-600">{objetivo}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-2">Materiais necessários</h4>
                      <ul className="flex flex-col gap-1">
                        {materiais.map((m, j) => (
                          <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3">Passo a passo</h4>
                      <div className="flex flex-col gap-3">
                        {atividades.map((a, j) => (
                          <div key={j} className="flex gap-3">
                            <span className="text-xs px-2 py-1 rounded-lg bg-green-50 border border-green-200 text-green-700 font-mono shrink-0 h-fit whitespace-nowrap">
                              {a.tempo}
                            </span>
                            <p className="text-sm text-gray-600">{a.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-sm font-bold text-slate-700 mb-1">Avaliação sugerida</h4>
                      <p className="text-sm text-gray-600">{avaliacao}</p>
                    </div>

                    <Link
                      href={modulo}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-700 text-white font-bold text-sm hover:bg-green-600 transition-colors w-fit shadow-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      Acessar módulo: {moduloLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA REPETIDO NO FIM ── */}
      <section className="bg-green-700 py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Pronto para transformar sua sala de aula?
          </h2>
          <p className="text-green-100 mb-8">
            Cadastre sua escola agora e receba os materiais gratuitamente.
          </p>
          <a
            href="#topo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-green-700 font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
          >
            Cadastrar minha escola <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}
