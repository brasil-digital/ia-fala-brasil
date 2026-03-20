"use client";

import { useState } from "react";
import { Newspaper, Search, AlertTriangle, CheckCircle, HelpCircle, Loader2 } from "lucide-react";

const exemplos = [
  "Governo vai distribuir R$ 5.000 para todos os brasileiros cadastrados no CPF. Clique no link para se cadastrar.",
  "Nova lei permite que médicos prescrevam cannabis para qualquer doença a partir de janeiro de 2025.",
  "Estudo da USP comprova que tomar café em jejum cura diabetes tipo 2 em 30 dias.",
];

export default function DetectaFakePage() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function analisar() {
    if (!texto.trim()) return;
    setCarregando(true);
    setResultado("");
    setErro("");
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modo: "detecta-fake", conteudo: texto }),
      });
      const data = await res.json();
      if (data.error) setErro(data.error);
      else setResultado(data.resposta);
    } catch {
      setErro("Erro de conexão. Verifique sua internet e tente novamente.");
    }
    setCarregando(false);
  }

  function formatarResposta(texto: string) {
    return texto.split("\n").map((linha, i) => {
      if (linha.startsWith("**") && linha.endsWith("**")) {
        return <h3 key={i} className="font-bold text-white mt-4 mb-1">{linha.replace(/\*\*/g, "")}</h3>;
      }
      if (linha.match(/^\*\*.*\*\*/)) {
        return <p key={i} className="text-slate-300 mb-1" dangerouslySetInnerHTML={{
          __html: linha.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>")
        }} />;
      }
      if (linha.startsWith("- ") || linha.startsWith("• ")) {
        return <li key={i} className="text-slate-300 ml-4 mb-1">{linha.slice(2)}</li>;
      }
      if (linha.trim() === "") return <br key={i} />;
      return <p key={i} className="text-slate-300 mb-2">{linha}</p>;
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">Detecta Fake</h1>
            <p className="text-slate-400 text-sm">Análise de desinformação com IA</p>
          </div>
        </div>
        <p className="text-slate-400">
          Cole qualquer texto — notícia, mensagem de WhatsApp, post de rede social — e a IA analisa
          se é verdadeiro, falso ou precisa de verificação. Aprenda a identificar desinformação.
        </p>
      </div>

      {/* Como usar */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: "📋", text: "Cole o texto suspeito" },
          { icon: "🤖", text: "A IA analisa em segundos" },
          { icon: "🧠", text: "Aprenda a pensar criticamente" },
        ].map(({ icon, text }) => (
          <div key={text} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center text-sm text-slate-400">
            <div className="text-2xl mb-1">{icon}</div>
            {text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Texto para analisar
        </label>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Cole aqui a notícia, mensagem ou post que você quer verificar..."
          className="w-full h-40 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none text-sm"
        />
        <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
          <span>{texto.length} caracteres</span>
          {texto.length > 2000 && <span className="text-amber-400">Texto muito longo — corte para melhores resultados</span>}
        </div>
      </div>

      {/* Exemplos */}
      <div className="mb-6">
        <p className="text-xs text-slate-500 mb-2">Exemplos para testar:</p>
        <div className="flex flex-col gap-2">
          {exemplos.map((ex, i) => (
            <button
              key={i}
              onClick={() => setTexto(ex)}
              className="text-left text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-slate-200 transition-colors truncate"
            >
              💬 {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Botão */}
      <button
        onClick={analisar}
        disabled={!texto.trim() || carregando}
        className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {carregando ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Analisando...</>
        ) : (
          <><Search className="w-5 h-5" /> Analisar com IA</>
        )}
      </button>

      {/* Erro */}
      {erro && (
        <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <span className="text-sm">{erro}</span>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-emerald-400">Análise da IA</span>
          </div>
          <div className="prose prose-sm max-w-none">
            {formatarResposta(resultado)}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Esta análise é gerada por IA e pode conter erros. Sempre verifique em fontes confiáveis como
                {" "}<strong className="text-slate-400">Agência Lupa, Aos Fatos, G1 e UOL</strong>.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
