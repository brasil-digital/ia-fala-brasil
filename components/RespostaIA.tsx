"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

const SITE = "https://www.iafalabrasil.com.br";

type Veredito = { rotulo: string; emoji: string; classe: string };

// Procura o veredito no começo da resposta (Detecta Fake e Golpe ou IA?).
export function acharVeredito(texto: string, tipo: "fato" | "golpe"): Veredito | null {
  const inicio = texto.slice(0, 600).toUpperCase();
  // O prompt pede "VEREDITO: ..." na 1ª linha; se o modelo esquecer, olha o começo do texto.
  const alvo = inicio.match(/VEREDITO:\s*\**\s*([^\n*]+)/)?.[1].trim() || inicio;
  const vermelho = "bg-red-50 border-red-300 text-red-800";
  const amarelo = "bg-amber-50 border-amber-300 text-amber-800";
  const verde = "bg-green-50 border-green-300 text-green-800";
  if (tipo === "golpe") {
    if (/N[ÃA]O (PARECE SER|PARECE|[ÉE]) (UM )?GOLPE/.test(alvo)) return { rotulo: "Não parece golpe", emoji: "✅", classe: verde };
    if (/CUIDADO|SUSPEIT/.test(alvo)) return { rotulo: "Precisa de cuidado", emoji: "⚠️", classe: amarelo };
    if (/[ÉE] (UM )?GOLPE|GOLPE CONFIRMADO|PROV[ÁA]VEL GOLPE/.test(alvo)) return { rotulo: "É golpe", emoji: "🚨", classe: vermelho };
    return null;
  }
  if (/PARCIALMENTE VERDADEIR/.test(alvo)) return { rotulo: "Parcialmente verdadeiro", emoji: "⚠️", classe: amarelo };
  if (/IMPOSS[ÍI]VEL VERIFICAR/.test(alvo)) return { rotulo: "Impossível verificar", emoji: "❔", classe: "bg-slate-50 border-slate-300 text-slate-700" };
  if (/\bFALS[OA]\b/.test(alvo)) return { rotulo: "Falso", emoji: "❌", classe: vermelho };
  if (/\bVERDADEIR[OA]\b/.test(alvo)) return { rotulo: "Verdadeiro", emoji: "✅", classe: verde };
  return null;
}

// **negrito** sem dangerouslySetInnerHTML (o texto pode repetir o que o usuário colou).
export function inline(texto: string): ReactNode[] {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") && parte.endsWith("**") && parte.length > 4 ? (
      <strong key={i} className="text-slate-900">{parte.slice(2, -2)}</strong>
    ) : (
      parte
    ),
  );
}

function renderizar(texto: string): ReactNode[] {
  return texto.split("\n").map((bruta, i) => {
    const linha = bruta.trim();
    if (!linha) return <div key={i} className="h-2" />;
    if (/^-{3,}$|^\*{3,}$/.test(linha)) return <hr key={i} className="my-4 border-gray-200" />;
    const titulo = linha.match(/^#{1,4}\s+(.*)$/);
    if (titulo) return <h3 key={i} className="font-bold text-slate-900 text-base mt-5 mb-2">{inline(titulo[1])}</h3>;
    if (/^\*\*[^*]+\*\*:?$/.test(linha)) return <h3 key={i} className="font-bold text-slate-900 text-base mt-5 mb-2">{linha.replace(/\*\*/g, "")}</h3>;
    const item = linha.match(/^[-•*]\s+(.*)$/);
    if (item) return <li key={i} className="ml-5 mb-1.5 list-disc text-gray-700">{inline(item[1])}</li>;
    const numerado = linha.match(/^(\d+)[.)]\s+(.*)$/);
    if (numerado) return (
      <p key={i} className="mb-1.5 text-gray-700 flex gap-2">
        <span className="font-semibold text-green-700">{numerado[1]}.</span>
        <span>{inline(numerado[2])}</span>
      </p>
    );
    return <p key={i} className="mb-2 text-gray-700">{inline(linha)}</p>;
  });
}

type Props = {
  resposta: string;
  titulo: string;
  icone: ReactNode;
  caminho: string;          // ex.: "/aprender/detecta-fake" — link do convite no WhatsApp
  chamada: string;          // ex.: "Verifique você também"
  veredito?: "fato" | "golpe";
  rodape?: ReactNode;
};

export default function RespostaIA({ resposta, titulo, icone, caminho, chamada, veredito: tipo, rodape }: Props) {
  const [copiado, setCopiado] = useState(false);
  const veredito = tipo ? acharVeredito(resposta, tipo) : null;
  const link = `${SITE}${caminho}?utm_source=whatsapp&utm_medium=compartilhar`;
  const mensagem = veredito
    ? `${veredito.emoji} Verifiquei no IA Fala Brasil: *${veredito.rotulo.toUpperCase()}*.\n\n${chamada}, é grátis: ${link}`
    : `🤖 Olha o que aprendi no IA Fala Brasil!\n\n${chamada}, é grátis: ${link}`;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(resposta);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  }

  return (
    <div className="mt-8 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-6 pt-5 pb-3">
        {icone}
        <span className="font-bold text-slate-900">{titulo}</span>
      </div>

      {veredito && (
        <div className={`mx-6 mb-2 px-4 py-3 rounded-xl border-2 font-extrabold text-lg flex items-center gap-2 ${veredito.classe}`}>
          <span className="text-2xl">{veredito.emoji}</span> {veredito.rotulo}
        </div>
      )}

      <div className="px-6 pb-4 text-sm leading-relaxed">
        {renderizar(veredito ? resposta.replace(/^.*VEREDITO:.*$/im, "").trim() : resposta)}
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(mensagem)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-[#25D366] text-white font-bold text-center hover:brightness-95 transition flex items-center justify-center gap-2 shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.38 9.38 0 0 1 9.44 9.45c0 5.2-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.3 11.3 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.36-11.37 0-3.03-1.18-5.89-3.33-8.03" />
          </svg>
          Compartilhar no WhatsApp
        </a>
        <button
          onClick={copiar}
          className="sm:w-auto px-5 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          {copiado ? <><Check className="w-4 h-4 text-green-600" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar análise</>}
        </button>
      </div>

      {rodape && <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-500">{rodape}</div>}
    </div>
  );
}
