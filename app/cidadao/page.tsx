"use client";

import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Loader2, Search } from "lucide-react";
import { origem } from "@/lib/origem";
import RespostaIA from "@/components/RespostaIA";

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
        body: JSON.stringify({ modo: "golpe-ia", conteudo: situacao, origem: origem() }),
      });
      const data = await res.json();
      if (data.error) setErro(data.error);
      else setResultado(data.resposta);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    }
    setCarregando(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Golpe ou IA?</h1>
          <p className="text-gray-500 text-sm">Proteção digital para cidadãos brasileiros</p>
        </div>
      </div>

      <p className="text-gray-600 mb-8">
        Criminosos usam IA para clonar vozes, criar deepfakes e aplicar golpes. Descreva uma situação
        suspeita e saiba se é golpe, como funciona e o que fazer.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {dicas.map(({ emoji, titulo, desc }) => (
          <div key={titulo} className="p-3 rounded-xl bg-white border border-gray-200 text-center shadow-sm">
            <div className="text-2xl mb-2">{emoji}</div>
            <div className="text-xs font-bold text-slate-900 mb-1">{titulo}</div>
            <div className="text-xs text-gray-500">{desc}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descreva a situação suspeita
        </label>
        <textarea
          maxLength={4000}
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
          placeholder="Ex: Recebi uma mensagem no WhatsApp de um número desconhecido dizendo ser meu filho e pedindo Pix urgente..."
          className="w-full h-36 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none text-sm shadow-sm"
        />
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">Exemplos de situações comuns:</p>
        <div className="flex flex-col gap-2">
          {exemplos.map((ex, i) => (
            <button
              key={i}
              onClick={() => setSituacao(ex)}
              className="text-left text-xs px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
            >
              🚨 {ex}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={analisar}
        disabled={!situacao.trim() || carregando}
        className="w-full py-4 rounded-xl bg-green-700 text-white font-bold text-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
      >
        {carregando ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Analisando...</>
        ) : (
          <><Search className="w-5 h-5" /> Analisar situação</>
        )}
      </button>

      {erro && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <span className="text-sm">{erro}</span>
        </div>
      )}

      {resultado && (
        <RespostaIA
          resposta={resultado}
          titulo="Análise de Segurança"
          icone={<CheckCircle className="w-5 h-5 text-green-600" />}
          caminho="/cidadao"
          chamada="Proteja sua família de golpes, teste você também"
          veredito="golpe"
          rodape={
            <span>
              🚨 <strong className="text-gray-600">Caiu em golpe?</strong> Ligue já para o seu banco e peça o
              bloqueio. No Brasil, faça o B.O. na delegacia online do seu estado ou ligue{" "}
              <strong className="text-gray-600">190</strong>. Nos EUA, denuncie em{" "}
              <strong className="text-gray-600">reportfraud.ftc.gov</strong>.
            </span>
          }
        />
      )}
    </div>
  );
}
