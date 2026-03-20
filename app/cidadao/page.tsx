"use client";

import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Loader2, Search } from "lucide-react";

const exemplos = [
  "Recebi uma ligação do 'Banco do Brasil' dizendo que minha conta foi bloqueada. A voz parecia robótica. O que faço?",
  "Um vídeo do presidente declarando guerra circula no WhatsApp. Como saber se é deepfake?",
  "Minha filha recebeu mensagem do número do pai dela pedindo dinheiro urgente via Pix. É golpe?",
  "Um site me oferece R$ 300 por dia para testar produtos da Amazon usando IA. É real?",
];

const dicas = [
  { emoji: "📱", titulo: "Voz clonada", desc: "Ligue de volta para o número original. Voz de IA não atende ligação real." },
  { emoji: "🎥", titulo: "Deepfake", desc: "Olhe os olhos e os dentes. IA tem dificuldade com reflexos e detalhes finos." },
  { emoji: "💸", titulo: "Pix urgente", desc: "Ligue para a pessoa pelo número que você tem salvo. Nunca por contato novo." },
  { emoji: "🔒", titulo: "Dados pessoais", desc: "Nenhum banco pede senha, token ou código por mensagem ou ligação." },
];

export default function CidadaoPage() {
  const [situacao, setSituacao] = useState("");
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function analisar() {
    if (!situacao.trim()) return;
    setCarregando(true);
    setResultado("");
    setErro("");
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modo: "golpe-ia", conteudo: situacao }),
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
        return <h3 key={i} className="font-bold text-white mt-4 mb-1">{linha.replace(/\*\*/g, "")}</h3>;
      }
      if (linha.startsWith("- ") || linha.startsWith("• ")) {
        return <li key={i} className="ml-4 mb-1 text-slate-300">{linha.slice(2)}</li>;
      }
      if (linha.trim() === "") return <br key={i} />;
      return <p key={i} className="text-slate-300 mb-2" dangerouslySetInnerHTML={{
        __html: linha.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>")
      }} />;
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">Golpe ou IA?</h1>
          <p className="text-slate-400 text-sm">Proteção digital para cidadãos brasileiros</p>
        </div>
      </div>

      <p className="text-slate-400 mb-8">
        Criminosos usam IA para clonar vozes, criar deepfakes e aplicar golpes. Descreva uma situação
        suspeita e saiba se é golpe, como funciona e o que fazer.
      </p>

      {/* Dicas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {dicas.map(({ emoji, titulo, desc }) => (
          <div key={titulo} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-2xl mb-2">{emoji}</div>
            <div className="text-xs font-bold text-white mb-1">{titulo}</div>
            <div className="text-xs text-slate-500">{desc}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Descreva a situação suspeita
        </label>
        <textarea
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
          placeholder="Ex: Recebi uma mensagem no WhatsApp de um número desconhecido dizendo ser meu filho e pedindo Pix urgente..."
          className="w-full h-36 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none text-sm"
        />
      </div>

      <div className="mb-6">
        <p className="text-xs text-slate-500 mb-2">Exemplos de situações comuns:</p>
        <div className="flex flex-col gap-2">
          {exemplos.map((ex, i) => (
            <button
              key={i}
              onClick={() => setSituacao(ex)}
              className="text-left text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-slate-200 transition-colors"
            >
              🚨 {ex}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={analisar}
        disabled={!situacao.trim() || carregando}
        className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {carregando ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Analisando...</>
        ) : (
          <><Search className="w-5 h-5" /> Analisar situação</>
        )}
      </button>

      {erro && (
        <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <span className="text-sm">{erro}</span>
        </div>
      )}

      {resultado && (
        <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-emerald-400">Análise de Segurança</span>
          </div>
          <div className="text-sm leading-relaxed">
            {formatarResposta(resultado)}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500">
            🚨 Se você foi vítima de golpe: Boletim de Ocorrência online em{" "}
            <strong className="text-slate-400">delegaciaonline.ssp.sp.gov.br</strong>{" "}
            ou ligue <strong className="text-slate-400">197</strong> (Polícia Civil).
          </div>
        </div>
      )}
    </div>
  );
}
