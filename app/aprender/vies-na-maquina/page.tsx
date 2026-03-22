"use client";

import { useState } from "react";
import { Brain, Search, Loader2, AlertTriangle } from "lucide-react";

const cenarios = [
  "Um banco usa IA para aprovar crédito e moradores da periferia recebem menos aprovações. Como isso acontece?",
  "Um sistema de reconhecimento facial tem 95% de precisão para pessoas brancas mas apenas 65% para negros. Por quê?",
  "Um algoritmo de seleção de currículos aprende com histórico de contratações e descarta mulheres automaticamente.",
  "Uma IA de saúde treinada em dados do sudeste do Brasil funciona pior no Nordeste. Qual o problema?",
];

export default function ViesNaMaquinaPage() {
  const [cenario, setCenario] = useState("");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function analisar() {
    if (!cenario.trim()) return;
    setCarregando(true);
    setResultado("");
    setErro("");
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modo: "vies-na-maquina", conteudo: cenario }),
      });
      const data = await res.json();
      if (data.error) setErro(data.error);
      else setResultado(data.resposta);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    }
    setCarregando(false);
  }

  function formatarResposta(texto: string) {
    return texto.split("\n").map((linha, i) => {
      if (linha.match(/^\*\*(.*)\*\*$/)) {
        return <h3 key={i} className="font-bold text-slate-900 mt-4 mb-1">{linha.replace(/\*\*/g, "")}</h3>;
      }
      if (linha.startsWith("- ") || linha.startsWith("• ")) {
        return <li key={i} className="ml-4 mb-1 text-gray-700">{linha.slice(2)}</li>;
      }
      if (linha.trim() === "") return <br key={i} />;
      return <p key={i} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{
        __html: linha.replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-900'>$1</strong>")
      }} />;
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-400 flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Viés na Máquina</h1>
          <p className="text-gray-500 text-sm">Ética e discriminação em IA — contexto brasileiro</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-8">
        <p className="text-sm text-amber-800">
          <strong>Por que isso importa?</strong> Sistemas de IA são usados no Brasil para decidir crédito,
          contratações, segurança pública e saúde. Entender o viés é um direito do cidadão.
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descreva um cenário ou faça uma pergunta sobre viés em IA
        </label>
        <textarea
          value={cenario}
          onChange={(e) => setCenario(e.target.value)}
          placeholder="Ex: Como a IA pode discriminar pessoas negras em sistemas de crédito?"
          className="w-full h-36 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none text-sm shadow-sm"
        />
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">Cenários reais para explorar:</p>
        <div className="flex flex-col gap-2">
          {cenarios.map((c, i) => (
            <button
              key={i}
              onClick={() => setCenario(c)}
              className="text-left text-xs px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
            >
              ⚠️ {c}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={analisar}
        disabled={!cenario.trim() || carregando}
        className="w-full py-4 rounded-xl bg-amber-500 text-white font-bold text-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
      >
        {carregando ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Analisando...</>
        ) : (
          <><Search className="w-5 h-5" /> Analisar viés</>
        )}
      </button>

      {erro && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <span className="text-sm">{erro}</span>
        </div>
      )}

      {resultado && (
        <div className="mt-8 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-amber-600">Análise de Viés</span>
          </div>
          <div className="text-sm leading-relaxed">
            {formatarResposta(resultado)}
          </div>
        </div>
      )}
    </div>
  );
}
