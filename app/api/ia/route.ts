import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { permitido } from "@/lib/limite";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MAX_CARACTERES = 4000;
const ORIGENS_OK = ["https://www.iafalabrasil.com.br", "https://iafalabrasil.com.br", "http://localhost:3000"];

// Conta cada uso (modo + origem) no Supabase; se falhar, só ignora.
async function registrarUso(modo: string, origem: string) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/rest/v1/usos_ia`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}`, Prefer: "return=minimal" },
      body: JSON.stringify({ modo, origem }),
      signal: AbortSignal.timeout(3000),
    });
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const origemHeader = req.headers.get("origin");
    if (origemHeader && !ORIGENS_OK.includes(origemHeader) && !origemHeader.endsWith(".vercel.app")) {
      return NextResponse.json({ error: "Acesso não permitido." }, { status: 403 });
    }

    const { modo, conteudo, origem } = await req.json();

    if (!conteudo || typeof conteudo !== "string") {
      return NextResponse.json({ error: "Conteúdo inválido." }, { status: 400 });
    }
    if (conteudo.length > MAX_CARACTERES) {
      return NextResponse.json(
        { error: `Texto muito longo. Cole até ${MAX_CARACTERES} caracteres.` },
        { status: 400 },
      );
    }

    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "anon";
    if (!permitido(ip)) {
      return NextResponse.json(
        { error: "Você usou bastante a IA agora. Espere alguns minutos e tente de novo. 🙏" },
        { status: 429 },
      );
    }

    const prompts: Record<string, string> = {
      "detecta-fake": `Você é um especialista em verificação de fatos no Brasil. Analise o texto abaixo e responda em português:

1. **Veredito**: Verdadeiro / Falso / Parcialmente verdadeiro / Impossível verificar
2. **Análise**: O que está correto ou incorreto (máx. 3 parágrafos curtos)
3. **Sinais de alerta**: Liste até 5 características do texto que indicam manipulação (linguagem sensacionalista, ausência de fonte, etc.)
4. **O que buscar**: Sugira onde a pessoa pode verificar a informação (ex: G1, Agência Lupa, UOL, dados do IBGE)
5. **Dica educativa**: Uma lição sobre pensamento crítico relacionada a este caso

Seja direto, didático e use linguagem acessível. Não invente fatos.

Texto para analisar:
"""
${conteudo}
"""`,

      "prompt-lab": `Você é um assistente de IA educacional chamado "Ronny IA", criado para ensinar brasileiros sobre Inteligência Artificial de forma prática e acessível. Responda sempre em português brasileiro, de forma clara e amigável.

Mensagem do usuário: ${conteudo}`,

      "vies-na-maquina": `Você é um especialista em ética de IA e viés algorítmico com foco no contexto brasileiro. Analise o seguinte cenário ou pergunta e explique:

1. **Que tipo de viés existe aqui?** (racial, de gênero, socioeconômico, regional, etc.)
2. **Como isso acontece tecnicamente?** (dados de treino, correlações espúrias, etc.)
3. **Impacto no Brasil**: Como isso afeta especificamente a população brasileira?
4. **Exemplo real**: Dê um exemplo concreto de quando isso aconteceu (pode ser global ou brasileiro)
5. **O que fazer?**: Como o usuário pode se proteger ou questionar sistemas de IA

Use linguagem acessível. Seja honesto sobre as limitações da IA.

Cenário/Pergunta:
"""
${conteudo}
"""`,

      "golpe-ia": `Você é um especialista em segurança digital e proteção contra golpes com IA no Brasil. Analise o seguinte relato ou situação:

1. **Diagnóstico**: É um golpe? É IA sendo usada de forma maliciosa? Qual tipo?
2. **Como funciona**: Explique o mecanismo do golpe de forma simples
3. **Sinais de alerta**: O que a pessoa deveria ter percebido?
4. **O que fazer agora**: Passos imediatos (se foi vítima ou suspeita)
5. **Como se proteger**: Dicas práticas para não cair de novo
6. **Onde denunciar**: SaferNet, delegacia virtual, Procon, etc.

Use linguagem simples. Muitos usuários podem ser idosos ou pessoas com menos experiência digital.

Situação descrita:
"""
${conteudo}
"""`,
    };

    const modoValido = modo in prompts ? modo : "prompt-lab";
    const systemPrompt = prompts[modoValido];

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: systemPrompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    await registrarUso(modoValido, typeof origem === "string" ? origem.slice(0, 40) : "web");
    return NextResponse.json({ resposta: text });
  } catch (err) {
    console.error("[IA API Error]", err);
    return NextResponse.json({ error: "Erro ao processar. Tente novamente." }, { status: 500 });
  }
}
