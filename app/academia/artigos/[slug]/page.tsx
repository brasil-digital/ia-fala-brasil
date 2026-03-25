import { getArtigo, artigos, type Block } from "../../_data/artigos";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import s from "./artigo.module.css";

export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "p":
      return <p key={i} className={s.paragraph}>{block.text}</p>;
    case "h2":
      return <h2 key={i} className={s.h2}>{block.text}</h2>;
    case "h3":
      return <h3 key={i} className={s.h3}>{block.text}</h3>;
    case "list":
      return (
        <ul key={i} className={s.list}>
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    case "callout":
      return (
        <div key={i} className={s.callout}>
          <div className={s.calloutIcon}>{block.icon}</div>
          <div>
            <div className={s.calloutTitle}>{block.title}</div>
            <p>{block.text}</p>
          </div>
        </div>
      );
    case "quote":
      return (
        <blockquote key={i} className={s.quote}>
          <p>"{block.text}"</p>
          {block.author && <cite>— {block.author}</cite>}
        </blockquote>
      );
    case "table":
      return (
        <div key={i} className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = getArtigo(slug);
  if (!artigo) notFound();

  return (
    <div className={s.page}>
      <div className={s.inner}>

        {/* Back */}
        <Link href="/academia" className={s.back}>
          <ArrowLeft size={16} /> Academia IA
        </Link>

        {/* Header */}
        <header className={s.header}>
          <div className={s.tags}>
            {artigo.tags.map((t) => (
              <span key={t.label} className={`${s.tag} ${s[t.cls as keyof typeof s]}`}>{t.label}</span>
            ))}
          </div>
          <h1 className={s.title}>{artigo.titulo}</h1>
          <p className={s.desc}>{artigo.desc}</p>
          <div className={s.meta}>
            <span><User size={13} /> {artigo.autor}</span>
            <span><Calendar size={13} /> {artigo.data}</span>
            <span><Clock size={13} /> {artigo.tempo} de leitura</span>
          </div>
        </header>

        {/* Content */}
        <article className={s.article}>
          {artigo.conteudo.map((block, i) => renderBlock(block, i))}
        </article>

        {/* Footer nav */}
        <div className={s.footer}>
          <Link href="/academia" className={s.backBtn}>
            <ArrowLeft size={16} /> Voltar para Academia IA
          </Link>
          <Link href="/aprender/prompt-lab" className={s.tryBtn}>
            Experimentar IA na prática →
          </Link>
        </div>

      </div>
    </div>
  );
}
