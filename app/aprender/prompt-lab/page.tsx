"use client";

import { useState, useRef, useEffect } from "react";
import { Zap, Send, Loader2, RotateCcw, Info } from "lucide-react";

type Mensagem = { role: "user" | "assistant"; content: string };

const dicas = [
  "Seja específico: em vez de 'explique IA', tente 'explique IA para uma criança de 10 anos usando a analogia de um cachorro que aprende truques'",
  "Defina o formato: 'Responda em lista de 5 tópicos' ou 'Responda em menos de 3 frases'",
  "Dê contexto: 'Sou estudante do ensino médio em Salvador e preciso...'",
  "Peça exemplos: 'Me dê 3 exemplos do cotidiano brasileiro'",
  "Itere: Se a resposta não foi boa, diga 'Reformule sendo mais simples' ou 'Adicione mais detalhes sobre X'",
];

const sugestoes = [
  "O que é inteligência artificial? Explique como se eu tivesse 12 anos.",
  "Quais profissões no Brasil podem ser afetadas pela IA nos próximos 5 anos?",
  "Me dê 5 formas práticas de usar IA no meu dia a dia como estudante.",
  "Explique o que é ChatGPT em 3 parágrafos curtos.",
  "Como a IA é usada no sistema bancário brasileiro?",
];

export default function PromptLabPage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [dicaAtual, setDicaAtual] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  async function enviar(texto?: string) {
    const msg = texto || input.trim();
    if (!msg || carregando) return;
    setInput("");
    const novas: Mensagem[] = [...mensagens, { role: "user", content: msg }];
    setMensagens(novas);
    setCarregando(true);
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modo: "prompt-lab", conteudo: msg }),
      });
      const data = await res.json();
      setMensagens([...novas, { role: "assistant", content: data.resposta || data.error || "Erro inesperado." }]);
    } catch {
      setMensagens([...novas, { role: "assistant", content: "Erro de conexão. Tente novamente." }]);
    }
    setCarregando(false);
  }

  function formatarTexto(texto: string) {
    return texto.split("\n").map((linha, i) => {
      if (linha.match(/^\*\*(.*)\*\*$/)) {
        return <h3 key={i} className="font-bold text-slate-900 mt-3 mb-1">{linha.replace(/\*\*/g, "")}</h3>;
      }
      if (linha.startsWith("- ") || linha.startsWith("• ")) {
        return <li key={i} className="ml-4 mb-1">{linha.slice(2)}</li>;
      }
      if (linha.trim() === "") return <br key={i} />;
      return <p key={i} className="mb-1" dangerouslySetInnerHTML={{
        __html: linha.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      }} />;
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-6">

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Prompt Lab</h1>
          <p className="text-gray-500 text-sm">Converse com o Ronny IA — IA de verdade, em português</p>
        </div>
      </div>

      {/* Dica rotativa */}
      <div
        className="p-4 rounded-xl bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
        onClick={() => setDicaAtual((d) => (d + 1) % dicas.length)}
      >
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-blue-700 font-medium">Dica de Prompt ({dicaAtual + 1}/{dicas.length}) — clique para próxima</span>
            <p className="text-sm text-gray-700 mt-1">{dicas[dicaAtual]}</p>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex flex-col gap-4 min-h-64 max-h-[500px] overflow-y-auto bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        {mensagens.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center text-gray-400">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-sm">Olá! Sou o Ronny IA. Pergunte qualquer coisa sobre IA, tecnologia ou como posso ajudar no seu dia a dia.</p>
          </div>
        )}
        {mensagens.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === "user"
                ? "bg-green-700 text-white rounded-br-sm"
                : "bg-gray-100 text-gray-800 rounded-bl-sm border border-gray-200"
            }`}>
              {msg.role === "assistant" ? (
                <div>{formatarTexto(msg.content)}</div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {carregando && (
          <div className="flex justify-start">
            <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 text-gray-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Ronny está pensando...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Sugestões */}
      {mensagens.length === 0 && (
        <div>
          <p className="text-xs text-gray-400 mb-2">Sugestões para começar:</p>
          <div className="flex flex-col gap-2">
            {sugestoes.map((s) => (
              <button
                key={s}
                onClick={() => enviar(s)}
                className="text-left text-xs px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        {mensagens.length > 0 && (
          <button
            onClick={() => setMensagens([])}
            className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
            title="Nova conversa"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviar()}
            placeholder="Digite sua pergunta..."
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm shadow-sm"
          />
          <button
            onClick={() => enviar()}
            disabled={!input.trim() || carregando}
            className="px-4 py-3 rounded-xl bg-green-700 text-white hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
