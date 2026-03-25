import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, cidade, estado } = body;

    if (!nome || !email || !cidade || !estado) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/cadastros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        cidade: cidade.trim(),
        estado,
      }),
    });

    if (res.status === 409) {
      return NextResponse.json({ error: "Este e-mail já está cadastrado." }, { status: 409 });
    }

    if (!res.ok) {
      const err = await res.text();
      console.error("Supabase error:", res.status, err);
      return NextResponse.json({ error: `Supabase ${res.status}: ${err}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Catch error:", msg);
    return NextResponse.json({ error: `Erro: ${msg}` }, { status: 500 });
  }
}

export async function GET() {
  // Retorna total de cadastros para exibir no frontend
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/cadastros?select=count`,
      {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Prefer": "count=exact",
        },
      }
    );
    const count = res.headers.get("content-range")?.split("/")[1] ?? "0";
    return NextResponse.json({ total: parseInt(count, 10) || 0 });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}
