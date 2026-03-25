"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Loader2, User, Mail, MapPin, ChevronDown } from "lucide-react";

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO",
];

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export default function CadastroForm() {
  const [form, setForm] = useState({ nome: "", email: "", cidade: "", estado: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/cadastro")
      .then((r) => r.json())
      .then((d) => setTotal(d.total ?? null))
      .catch(() => {});
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.status === 409) { setStatus("duplicate"); return; }
      if (!res.ok) { setErrorMsg(data.error ?? "Erro desconhecido."); setStatus("error"); return; }

      setStatus("success");
      if (total !== null) setTotal((t) => (t ?? 0) + 1);
    } catch {
      setErrorMsg("Sem conexão. Tente novamente.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Bem-vindo(a), {form.nome.split(" ")[0]}! 🎉
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Cadastro confirmado. Você será avisado(a) em primeira mão sobre novidades,
          planos e quando a assinatura for lançada.
        </p>
        {total !== null && (
          <p className="mt-4 text-xs text-green-700 font-semibold">
            Você é o(a) cadastrado(a) número {total} da plataforma 🇧🇷
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {total !== null && total > 0 && (
        <p className="text-center text-sm text-green-700 font-semibold mb-5">
          🇧🇷 {total.toLocaleString("pt-BR")} pessoa{total !== 1 ? "s" : ""} já cadastrada{total !== 1 ? "s" : ""}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        {/* Nome */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Seu nome completo"
            value={form.nome}
            onChange={set("nome")}
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={form.email}
            onChange={set("email")}
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
          />
        </div>

        {/* Cidade */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Sua cidade"
            value={form.cidade}
            onChange={set("cidade")}
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
          />
        </div>

        {/* Estado */}
        <div className="relative">
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={form.estado}
            onChange={set("estado")}
            required
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition appearance-none text-slate-900"
          >
            <option value="" disabled>Estado (UF)</option>
            {ESTADOS.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error messages */}
      {status === "error" && (
        <p className="text-red-600 text-sm text-center mb-3">{errorMsg}</p>
      )}
      {status === "duplicate" && (
        <p className="text-amber-600 text-sm text-center mb-3">
          Este e-mail já está cadastrado. Você já faz parte! 😊
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 rounded-xl bg-green-700 text-white font-bold text-base hover:bg-green-600 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {status === "loading" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Cadastrando...</>
        ) : (
          <>Criar minha conta gratuita <ArrowRight className="w-5 h-5" /></>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        Seus dados são protegidos pela LGPD. Sem spam. Cancele quando quiser.
      </p>
    </form>
  );
}
