import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — IA Fala Brasil",
  description: "Saiba como o IA Fala Brasil coleta, usa e protege seus dados.",
};

const link = "text-green-700 underline";

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-slate-800">
      <h1 className="text-3xl font-bold mb-2">Política de Privacidade</h1>
      <p className="text-sm text-slate-500 mb-8">Última atualização: 17 de novembro de 2026</p>

      <section className="space-y-6 text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Quem somos</h2>
          <p>
            O <strong>IA Fala Brasil</strong> (
            <a href="https://www.iafalabrasil.com.br" className={link}>
              www.iafalabrasil.com.br
            </a>
            ) é uma plataforma educacional gratuita de alfabetização em Inteligência Artificial para
            brasileiros, parte do projeto{" "}
            <a href="https://www.falabrasil.digital" className={link}>
              Fala Brasil
            </a>
            . O responsável pelo tratamento dos dados é a{" "}
            <strong>SOVEREIGN DIGITAL GROUP LLC</strong>. Contato:{" "}
            <a href="mailto:suporte@falabrasil.digital" className={link}>
              suporte@falabrasil.digital
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Dados que coletamos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cadastro (opcional):</strong> nome, e-mail, cidade e estado, somente se você
              preencher o formulário. Os módulos funcionam sem cadastro.
            </li>
            <li>
              <strong>Textos enviados aos módulos de IA:</strong> o texto que você cola ou digita é
              enviado à Anthropic (Claude) apenas para gerar a resposta. <strong>Não guardamos o
              texto nem a resposta</strong> em nossos servidores. Registramos só qual módulo foi
              usado e de onde a visita veio (por exemplo, &quot;app Fala Brasil&quot;), sem
              identificar você.
            </li>
            <li>
              <strong>Endereço IP:</strong> usado temporariamente, só na memória do servidor, para
              limitar o número de perguntas por pessoa e evitar abuso. Não é gravado em banco de
              dados.
            </li>
            <li>
              <strong>Estatísticas de visita:</strong> usamos o Vercel Web Analytics, que conta
              visitas de forma agregada e sem cookies.
            </li>
            <li>
              <strong>Chat de atendimento:</strong> se você usar o chat do site (Tawk.to), as
              mensagens e os dados que você informar nele são tratados por esse serviço para que
              possamos responder.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Como usamos os dados</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gerar as respostas dos módulos de aprendizado.</li>
            <li>Enviar novos módulos, alertas de golpes e novidades a quem se cadastrou.</li>
            <li>Responder dúvidas e pedidos de suporte.</li>
            <li>Medir o uso da plataforma de forma agregada, para melhorá-la.</li>
            <li>Cumprir obrigações legais, incluindo a LGPD (Lei 13.709/2018).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Com quem compartilhamos</h2>
          <p>Não vendemos nem alugamos seus dados. Eles passam apenas pelos serviços que fazem a plataforma funcionar:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              <strong>Anthropic</strong> — respostas da IA (
              <a href="https://www.anthropic.com/legal/privacy" className={link} target="_blank" rel="noopener noreferrer">
                política de privacidade
              </a>
              ).
            </li>
            <li>
              <strong>Vercel</strong> — hospedagem do site e estatísticas de visita.
            </li>
            <li>
              <strong>Supabase</strong> — armazenamento do cadastro.
            </li>
            <li>
              <strong>Tawk.to</strong> — chat de atendimento.
            </li>
            <li>Autoridades públicas, quando exigido por lei.</li>
          </ul>
          <p className="mt-2">
            Alguns desses serviços ficam fora do Brasil; a transferência ocorre para viabilizar o
            serviço que você pediu, nos termos da LGPD.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Cookies e armazenamento no navegador</h2>
          <p>
            O site não usa cookies de publicidade. Guardamos no seu navegador apenas a origem da
            visita durante a sessão, e o chat de atendimento pode usar cookies próprios para manter
            a conversa. Você pode limpar esses dados nas configurações do navegador.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Por quanto tempo guardamos</h2>
          <p>
            Os dados de cadastro ficam guardados até você pedir a exclusão. Os textos enviados aos
            módulos não são guardados.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Seus direitos (LGPD)</h2>
          <p>Você pode, a qualquer momento:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Confirmar se tratamos seus dados e acessá-los.</li>
            <li>Corrigir dados incompletos ou desatualizados.</li>
            <li>Pedir a exclusão do seu cadastro.</li>
            <li>Deixar de receber nossas mensagens e revogar o consentimento.</li>
            <li>Saber com quem compartilhamos seus dados.</li>
          </ul>
          <p className="mt-2">
            Basta escrever para{" "}
            <a href="mailto:suporte@falabrasil.digital" className={link}>
              suporte@falabrasil.digital
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Crianças e adolescentes</h2>
          <p>
            Os módulos podem ser usados sem cadastro, inclusive em sala de aula com o professor.
            O formulário de cadastro é para maiores de 18 anos; menores devem se cadastrar apenas
            com autorização dos pais ou responsáveis. Se identificarmos um cadastro de criança sem
            essa autorização, ele será excluído.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Segurança</h2>
          <p>
            Usamos conexão segura (HTTPS), acesso restrito aos dados de cadastro e limite de uso
            contra abuso. Nenhum sistema é 100% invulnerável, mas tratamos seus dados com cuidado.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">10. Alterações nesta política</h2>
          <p>
            Esta política pode ser atualizada. A data no topo indica a versão em vigor.
          </p>
        </div>
      </section>
    </div>
  );
}
