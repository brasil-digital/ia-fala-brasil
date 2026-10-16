// De onde a pessoa veio (ex.: "fala_brasil_app"), lido do utm_source da 1ª página
// e guardado na sessão — vai junto com cada uso da IA para medir o app.
const CHAVE = "iafb_origem";

export function salvarOrigem() {
  try {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    if (utm) sessionStorage.setItem(CHAVE, utm.slice(0, 40));
  } catch {}
}

export function origem(): string {
  try {
    return sessionStorage.getItem(CHAVE) || "web";
  } catch {
    return "web";
  }
}
