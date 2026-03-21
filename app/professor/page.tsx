"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, ArrowRight, Send, Loader2 } from "lucide-react";

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
      { tempo: "5 min", desc: "Discussão coletiva: o que a IA identificou? Faz sentido? O que o aluno achou que ela errou?" },
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
    objetivo: "Introduzir os alunos ao conceito de IA generativa e ensinar como formular boas perguntas (prompts) para obter resultados úteis.",
    materiais: ["Celulares ou computadores", "Acesso ao Prompt Lab (iafalabrasil.com.br)"],
    atividades: [
      { tempo: "10 min", desc: "O professor mostra o que é o Ronny IA e faz uma pergunta simples ao vivo para a turma ver a resposta." },
      { tempo: "10 min", desc: "Explica a diferença entre uma pergunta vaga ('fala sobre futebol') e uma pergunta específica ('explique as regras do futebol para uma criança de 8 anos')." },
      { tempo: "25 min", desc: "Desafio em duplas: cada dupla tenta conseguir a melhor resposta possível para um tema sorteado pelo professor." },
      { tempo: "5 min", desc: "Compartilhamento: qual dupla conseguiu a resposta mais útil? O que fizeram de diferente?" },
    ],
    avaliacao: "Cada aluno escreve 3 perguntas bem formuladas sobre um tema da matéria atual e compartilha com o professor.",
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
      { tempo: "15 min", desc: "O professor apresenta casos reais: reconhecimento facial que erra mais para pessoas negras, algoritmos de crédito que discriminam moradores de periferia." },
      { tempo: "15 min", desc: "Debate: por que uma máquina pode ser preconceituosa se foi programada por humanos?" },
      { tempo: "20 min", desc: "Prática: alunos acessam o módulo e exploram cenários de viés em IA no contexto brasileiro." },
      { tempo: "2ª aula — 50 min", desc: "Grupos elaboram uma 'cartilha de direitos digitais' com dicas de como o cidadão pode se proteger de decisões injustas feitas por IA." },
    ],
    avaliacao: "Produção em grupo da cartilha de direitos digitais para ser distribuída na comunidade escolar.",
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
      { tempo: "10 min", desc: "O professor reproduz um áudio de voz clonada por IA (disponível no YouTube) e pergunta: 'Vocês percebem que é falso?'" },
      { tempo: "15 min", desc: "Explicação dos tipos de golpe com IA mais comuns no Brasil: WhatsApp clonado, PIX falso, deepfake de celebridades." },
      { tempo: "20 min", desc: "Prática: alunos descrevem situações suspeitas no módulo Golpe ou IA? e aprendem a analisar o risco." },
      { tempo: "5 min", desc: "Tarefa de casa: ensinar um familiar idoso uma coisa que aprendeu na aula." },
    ],
    avaliacao: "Relato escrito de como o aluno ensinou um familiar sobre golpes digitais.",
    modulo: "/cidadao",
    moduloLabel: "Golpe ou IA?",
  },
];

export default function ProfessorPage() {
  const [aberto, setAberto] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [escola, setEscola] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

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
          Planos de aula prontos, alinhados à BNCC, com atividades práticas usando IA de verdade.
          Sem precisar ser especialista em tecnologia.
        </p>
      </div>

      {/* Planos de aula */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Planos de Aula</h2>
        <div className="flex flex-col gap-4">
          {planos.map(({ titulo, disciplina, serie, bncc, duracao, objetivo, materiais, atividades, avaliacao, modulo, moduloLabel }, i) => (
            <div key={titulo} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">

              {/* Header do plano */}
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">{titulo}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-400">{disciplina}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400">{serie}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400">⏱ {duracao}</span>
                  </div>
                </div>
                {aberto === i
                  ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                }
              </button>

              {/* Conteúdo expandido */}
              {aberto === i && (
                <div className="px-5 pb-6 border-t border-slate-800 pt-5 flex flex-col gap-5">

                  {/* Tags BNCC */}
                  <div className="flex flex-wrap gap-2">
                    {bncc.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        📋 {tag}
                      </span>
                    ))}
                  </div>

                  {/* Objetivo */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 mb-1">Objetivo</h4>
                    <p className="text-sm text-slate-400">{objetivo}</p>
                  </div>

                  {/* Materiais */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 mb-2">Materiais necessários</h4>
                    <ul className="flex flex-col gap-1">
                      {materiais.map((m, j) => (
                        <li key={j} className="text-sm text-slate-400 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Atividades */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 mb-3">Passo a passo</h4>
                    <div className="flex flex-col gap-3">
                      {atividades.map((a, j) => (
                        <div key={j} className="flex gap-3">
                          <span className="text-xs px-2 py-1 rounded-lg bg-slate-800 text-emerald-400 font-mono shrink-0 h-fit">
                            {a.tempo}
                          </span>
                          <p className="text-sm text-slate-400">{a.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Avaliação */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <h4 className="text-sm font-bold text-slate-300 mb-1">Avaliação sugerida</h4>
                    <p className="text-sm text-slate-400">{avaliacao}</p>
                  </div>

                  {/* Link para o módulo */}
                  <Link
                    href={modulo}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-colors w-fit"
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

      {/* Formulário de cadastro */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-slate-700">
        <h2 className="text-2xl font-bold mb-2">Cadastre sua escola</h2>
        <p className="text-slate-400 mb-6">
          Receba novos planos de aula, atualizações e acesso antecipado ao painel completo do professor. Gratuito para escolas públicas.
        </p>

        {enviado ? (
          <div className="flex items-center gap-3 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-bold">Cadastro realizado!</p>
              <p className="text-sm opacity-80">Entraremos em contato em breve com novidades e acesso ao painel do professor.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={cadastrar} className="flex flex-col gap-4 max-w-lg">
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <input
              type="text"
              placeholder="Nome da escola e cidade"
              value={escola}
              onChange={(e) => setEscola(e.target.value)}
              required
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
            {erro && <p className="text-red-400 text-sm">{erro}</p>}
            <button
              type="submit"
              disabled={enviando}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {enviando
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                : <><Send className="w-4 h-4" /> Cadastrar escola</>
              }
            </button>
            <p className="text-xs text-slate-500">100% gratuito para escolas públicas. Sem spam.</p>
          </form>
        )}
      </div>
    </div>
  );
}
