import { getTrilha, trilhas, type Block } from "../../_data/trilhas";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, PlayCircle, HelpCircle, Zap, Video, ChevronRight, CheckCircle } from "lucide-react";
import s from "./trilha.module.css";

export function generateStaticParams() {
  return trilhas.map((t) => ({ slug: t.slug }));
}

const tipoIcon = {
  aula: PlayCircle,
  quiz: HelpCircle,
  pratica: Zap,
  video: Video,
};
const tipoLabel = {
  aula: "Aula",
  quiz: "Quiz",
  pratica: "Prática",
  video: "Vídeo",
};

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "p":
      return <p key={i} className={s.bp}>{block.text}</p>;
    case "h2":
      return <h2 key={i} className={s.bh2}>{block.text}</h2>;
    case "h3":
      return <h3 key={i} className={s.bh3}>{block.text}</h3>;
    case "list":
      return (
        <ul key={i} className={s.blist}>
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    case "callout":
      return (
        <div key={i} className={s.bcallout}>
          <div className={s.bcalloutIcon}>{block.icon}</div>
          <div>
            <div className={s.bcalloutTitle}>{block.title}</div>
            <p>{block.text}</p>
          </div>
        </div>
      );
    case "quote":
      return (
        <blockquote key={i} className={s.bquote}>
          <p>"{block.text}"</p>
          {block.author && <cite>— {block.author}</cite>}
        </blockquote>
      );
  }
}

export default function TrilhaPage({ params }: { params: { slug: string } }) {
  const trilha = getTrilha(params.slug);
  if (!trilha) notFound();

  return (
    <div className={s.page}>

      {/* HERO */}
      <div className={s.hero} style={{ "--icon-bg": trilha.bg } as React.CSSProperties}>
        <div className={s.heroInner}>
          <Link href="/academia" className={s.back}>
            <ArrowLeft size={15} /> Academia IA
          </Link>
          <div className={s.heroTop}>
            <div className={s.iconWrap} style={{ background: trilha.bg }}>
              {trilha.icon}
            </div>
            <div>
              <div className={s.trilhaBadge}>Trilha de Aprendizado</div>
              <h1 className={s.heroTitle}>{trilha.titulo}</h1>
              <p className={s.heroDesc}>{trilha.descLonga}</p>
              <div className={s.heroMeta}>
                <span><Clock size={14} /> {trilha.horas} de conteúdo</span>
                <span>📚 {trilha.aulas.length} aulas</span>
                <span>🎯 {trilha.publicoAlvo.split(",")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.mainLayout}>

        {/* LEFT: aulas list */}
        <main>
          {/* Objetivos */}
          <div className={s.objetivosCard}>
            <h2 className={s.objetivosTitle}>O que você vai aprender</h2>
            <ul className={s.objetivosList}>
              {trilha.objetivos.map((o) => (
                <li key={o}>
                  <CheckCircle size={16} className={s.checkIcon} />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Aulas */}
          <div className={s.aulasSection}>
            <h2 className={s.aulasTitle}>Conteúdo da trilha</h2>
            <div className={s.aulasList}>
              {trilha.aulas.map((aula, i) => {
                const Icon = tipoIcon[aula.tipo];
                const isExternal = !!aula.href;
                const href = aula.href ?? `#aula-${aula.id}`;

                return (
                  <Link
                    key={aula.id}
                    href={href}
                    className={`${s.aulaItem} ${isExternal ? s.aulaExternal : ""}`}
                    {...(isExternal ? {} : {})}
                  >
                    <div className={s.aulaNum}>{String(i + 1).padStart(2, "0")}</div>
                    <div className={`${s.aulaIconWrap} ${s[`tipo_${aula.tipo}`]}`}>
                      <Icon size={16} />
                    </div>
                    <div className={s.aulaMeta}>
                      <div className={s.aulaTitulo}>{aula.titulo}</div>
                      <div className={s.aulaInfo}>
                        <span className={s.aulaTag}>{tipoLabel[aula.tipo]}</span>
                        <span><Clock size={11} /> {aula.duracao}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className={s.aulaArrow} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Conteúdo inline das aulas que não têm href */}
          {trilha.aulas
            .filter((a) => !a.href && a.conteudo && a.conteudo.length > 0)
            .map((aula, idx) => (
              <div key={aula.id} id={`aula-${aula.id}`} className={s.aulaContent}>
                <div className={s.aulaContentHeader}>
                  <div className={`${s.aulaIconWrap} ${s[`tipo_${aula.tipo}`]}`}>
                    {(() => { const I = tipoIcon[aula.tipo]; return <I size={16} />; })()}
                  </div>
                  <div>
                    <div className={s.aulaContentNum}>Aula {trilha.aulas.findIndex(a => a.id === aula.id) + 1}</div>
                    <h3 className={s.aulaContentTitle}>{aula.titulo}</h3>
                  </div>
                </div>
                <div className={s.aulaContentBody}>
                  {aula.conteudo!.map((block, i) => renderBlock(block, i))}
                </div>
              </div>
            ))
          }
        </main>

        {/* SIDEBAR */}
        <aside className={s.sidebar}>
          <div className={s.sideCard}>
            <div className={s.sideTitle}>Sobre esta trilha</div>
            <div className={s.sideRow}><span>⏱️</span><span>{trilha.horas} de conteúdo</span></div>
            <div className={s.sideRow}><span>📚</span><span>{trilha.aulas.length} aulas</span></div>
            <div className={s.sideRow}><span>🎯</span><span>{trilha.publicoAlvo}</span></div>
            <div className={s.sideRow}><span>🏆</span><span>Certificado ao concluir</span></div>
          </div>

          <div className={s.certCard}>
            <span className={s.certEmoji}>🎓</span>
            <div className={s.certTitle}>Complete a trilha</div>
            <p className={s.certDesc}>Estude todas as aulas e receba seu certificado digital IA Fala Brasil.</p>
            <Link href="/academia" className={s.certBtn}>Ver todas as trilhas</Link>
          </div>

          <div className={s.sideCard}>
            <div className={s.sideTitle}>Outras trilhas</div>
            {trilhas.filter(t => t.slug !== trilha.slug).map(t => (
              <Link key={t.slug} href={`/academia/trilha/${t.slug}`} className={s.otherTrilha}>
                <span>{t.icon}</span>
                <span>{t.titulo}</span>
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
