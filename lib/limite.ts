// Limite de uso da IA por IP, em memória. Cada instância da Vercel tem o seu
// contador (não é exato), mas segura abuso e loop de requisições — o teto de
// gasto de verdade fica no painel da Anthropic.
const JANELAS = [
  { ms: 10 * 60 * 1000, max: 15 },      // 15 perguntas a cada 10 min
  { ms: 24 * 60 * 60 * 1000, max: 60 }, // 60 por dia
];

const usos = new Map<string, number[]>();

export function permitido(ip: string): boolean {
  const agora = Date.now();
  const maiorJanela = JANELAS[JANELAS.length - 1].ms;
  const lista = (usos.get(ip) ?? []).filter((t) => agora - t < maiorJanela);
  const estourou = JANELAS.some((j) => lista.filter((t) => agora - t < j.ms).length >= j.max);
  if (!estourou) lista.push(agora);
  usos.set(ip, lista);
  if (usos.size > 5000) {
    for (const [chave, ts] of usos) {
      if (!ts.length || agora - ts[ts.length - 1] > maiorJanela) usos.delete(chave);
    }
  }
  return !estourou;
}
