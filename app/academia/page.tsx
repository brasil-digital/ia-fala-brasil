"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Play, Clock, BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import s from "./academia.module.css";
import { artigos } from "./_data/artigos";
import { trilhas } from "./_data/trilhas";

const CHIPS = ["Todos", "Técnico", "Ética & IA", "Legislação", "Educação", "Pesquisa BR"];

const videos = [
  {
    emoji: "🎓",
    bg: "#E6F5EC",
    titulo: "O que é Inteligência Artificial? Explicado do zero",
    canal: "Manual do Mundo",
    duration: "14:22",
    href: "https://www.youtube.com/results?search_query=o+que+%C3%A9+intelig%C3%AAncia+artificial+manual+do+mundo",
  },
  {
    emoji: "🤖",
    bg: "#E8F4FD",
    titulo: "ChatGPT vs. Gemini vs. Claude: qual é o melhor em português?",
    canal: "Filipe Deschamps",
    duration: "18:05",
    href: "https://www.youtube.com/results?search_query=chatgpt+vs+gemini+vs+claude+portugu%C3%AAs",
  },
  {
    emoji: "⚖️",
    bg: "#FFF3CD",
    titulo: "Viés em algoritmos: como a IA discrimina sem querer",
    canal: "Código Fonte TV",
    duration: "16:48",
    href: "https://www.youtube.com/results?search_query=vi%C3%A9s+em+algoritmos+discrimina%C3%A7%C3%A3o+racial+IA",
  },
  {
    emoji: "🛡️",
    bg: "#FCE8E8",
    titulo: "Como se proteger de golpes com IA e deepfakes",
    canal: "IA Fala Brasil",
    duration: "10:31",
    href: "/cidadao",
  },
];

const legislacao = [
  {
    flag: "🇧🇷",
    code: "PL 2338/2023",
    nome: "Marco Legal da IA",
    desc: "Regulamenta o desenvolvimento e uso de IA no Brasil. Em tramitação no Senado.",
    badge: "badgeTramita",
    badgeLabel: "Em tramitação",
    href: "https://www.senado.leg.br/sdleg-getter/documento?dm=9347622&disposition=inline",
    slug: "pl-2338-2023-empresas-brasileiras",
  },
  {
    flag: "🇧🇷",
    code: "Lei 13.709/2018",
    nome: "LGPD",
    desc: "Lei Geral de Proteção de Dados. Vigente e aplicável a sistemas de IA.",
    badge: "badgeVigente",
    badgeLabel: "Vigente",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    slug: null,
  },
  {
    flag: "🇧🇷",
    code: "Lei 12.965/2014",
    nome: "Marco Civil da Internet",
    desc: "Define direitos e deveres no ambiente digital brasileiro.",
    badge: "badgeVigente",
    badgeLabel: "Vigente",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
    slug: null,
  },
  {
    flag: "🇧🇷",
    code: "Estratégia Brasileira de IA",
    nome: "EBIA 2024–2028",
    desc: "Plano nacional para desenvolvimento responsável de IA no setor público.",
    badge: "badgeVigente",
    badgeLabel: "Vigente",
    href: "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/transformacaodigital/inteligenciaartificial",
    slug: null,
  },
  {
    flag: "🇪🇺",
    code: "EU AI Act",
    nome: "Regulamento Europeu de IA",
    desc: "Referência global para regulação por níveis de risco. Influencia o PL brasileiro.",
    badge: "badgeRef",
    badgeLabel: "Referência",
    href: "https://artificialintelligenceact.eu/",
    slug: null,
  },
];

const trending = [
  "Regulação de IA no Brasil",
  "ChatGPT na educação",
  "Deepfakes e eleições",
  "IA e mercado de trabalho",
  "LGPD aplicada a IA",
];

const perfis = [
  { icon: "🎒", titulo: "Estudante", desc: "Fundamental ao médio", href: "/aprender" },
  { icon: "📚", titulo: "Professor", desc: "Planos alinhados à BNCC", href: "/professor" },
  { icon: "🏛️", titulo: "Gestor Público", desc: "IA no setor público", href: "/academia/trilha/ia-setor-publico" },
  { icon: "🧑‍💼", titulo: "Profissional", desc: "Aplicações no trabalho", href: "/academia/trilha/machine-learning" },
];

const trendingLinks: Record<string, string> = {
  "Regulação de IA no Brasil": "/academia/artigos/pl-2338-2023-empresas-brasileiras",
  "ChatGPT na educação": "/academia/artigos/ia-sala-de-aula-autoria",
  "Deepfakes e eleições": "/academia/artigos/deepfakes-detectar-proteger",
  "IA e mercado de trabalho": "/academia/artigos/mapa-ia-brasil",
  "LGPD aplicada a IA": "/academia/artigos/pl-2338-2023-empresas-brasileiras",
};

const parceiros = ["USP", "INEP", "MEC", "CNPq", "Fiocruz", "IBGE"];

export default function AcademiaPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeChip, setActiveChip] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(s.visible); }),
      { threshold: 0.1 }
    );
    pageRef.current?.querySelectorAll(`.${s.fadeIn}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredArtigos = artigos.filter((a) => {
    const matchChip = activeChip === "Todos" || a.tags.some((t) => t.label === activeChip);
    const matchSearch =
      search === "" ||
      a.titulo.toLowerCase().includes(search.toLowerCase()) ||
      a.desc.toLowerCase().includes(search.toLowerCase());
    return matchChip && matchSearch;
  });

  return (
    <div ref={pageRef} className={s.page}>

      {/* HERO */}
      <div className={s.hero}>
        <div className={s.heroInner}>
          <div className={s.heroBadge}>📚 Academia IA</div>
          <h1 className={s.heroTitle}>
            Aprenda IA com<br /><span>profundidade e contexto</span><br />brasileiro
          </h1>
          <p className={s.heroDesc}>
            Artigos, vídeos, trilhas de aprendizado e legislação — tudo em português,
            tudo alinhado à realidade do Brasil.
          </p>
          <div className={s.statsRow}>
            {[
              { num: "6", label: "Artigos completos" },
              { num: "4", label: "Trilhas de aprendizado" },
              { num: "30+", label: "Aulas disponíveis" },
              { num: "5", label: "Leis e regulamentos" },
            ].map(({ num, label }) => (
              <div key={label} className={s.statItem}>
                <div className={s.statNum}>{num}</div>
                <div className={s.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className={s.searchSection}>
        <div className={s.searchInner}>
          <div className={s.searchBar}>
            <Search className={s.searchIcon} size={18} />
            <input
              className={s.searchInput}
              placeholder="Buscar artigos, vídeos, tópicos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={s.chips}>
            {CHIPS.map((c) => (
              <button
                key={c}
                className={`${s.chip} ${activeChip === c ? s.chipActive : ""}`}
                onClick={() => setActiveChip(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className={s.mainLayout}>
        <div>

          {/* TRILHAS */}
          {activeChip === "Todos" && search === "" && (
            <section className={s.fadeIn}>
              <div className={s.sectionLabel}>Trilhas de Aprendizado</div>
              <h2 className={s.sectionTitle}>Comece do começo, vá até o fim</h2>
              <div className={s.trilhasGrid}>
                {trilhas.map(({ slug, icon, bg, titulo, desc, aulas, horas }) => (
                  <Link key={slug} href={`/academia/trilha/${slug}`} className={s.trilhaCard} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className={s.trilhaIcon} style={{ background: bg }}>{icon}</div>
                    <h4>{titulo}</h4>
                    <p>{desc}</p>
                    <div className={s.trilhaProgress}>
                      <div className={s.progressBar}>
                        <div className={s.progressFill} style={{ width: "0%" }} />
                      </div>
                      <div className={s.progressMeta}>
                        <span>{aulas.length} aulas · {horas}</span>
                        <span className={s.trilhaLink}>Ver trilha →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ARTIGOS */}
          <section className={s.articlesList}>
            <div className={`${s.sectionLabel} ${s.fadeIn}`}>Artigos</div>
            <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>
              {filteredArtigos.length === artigos.length
                ? "Últimas publicações"
                : `${filteredArtigos.length} resultado${filteredArtigos.length !== 1 ? "s" : ""}`}
            </h2>
            {filteredArtigos.length === 0 ? (
              <div className={s.fadeIn} style={{ textAlign: "center", padding: "3rem 0", color: "var(--muted)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
                <p>Nenhum artigo encontrado para &ldquo;<strong>{search}</strong>&rdquo;</p>
              </div>
            ) : (
              filteredArtigos.map(({ slug, tags, titulo, desc, tempo }, i) => (
                <Link
                  key={slug}
                  href={`/academia/artigos/${slug}`}
                  className={`${s.articleItem} ${s.fadeIn}`}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className={s.articleMeta}>
                    <div className={s.articleTags}>
                      {tags.map((t) => (
                        <span key={t.label} className={`${s.tag} ${s[t.cls as keyof typeof s]}`}>{t.label}</span>
                      ))}
                    </div>
                    <div className={s.articleTitle}>{titulo}</div>
                    <div className={s.articleDesc}>{desc}</div>
                  </div>
                  <div className={s.articleTime}>
                    <Clock size={12} style={{ display: "inline", marginRight: 4 }} />
                    {tempo}
                  </div>
                </Link>
              ))
            )}
          </section>

          {/* VÍDEOS */}
          {activeChip === "Todos" && search === "" && (
            <section className={s.videosSection}>
              <div className={`${s.sectionLabel} ${s.fadeIn}`}>Vídeos</div>
              <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>Aprenda assistindo</h2>
              <div className={s.videosGrid}>
                {videos.map(({ emoji, bg, titulo, canal, duration, href }, i) => (
                  <a
                    key={titulo}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`${s.videoCard} ${s.fadeIn}`}
                    style={{ transitionDelay: `${i * 0.08}s`, textDecoration: "none" }}
                  >
                    <div className={s.videoThumb} style={{ background: bg }}>
                      <span>{emoji}</span>
                      <div className={s.playBtn}><Play size={14} fill="white" /></div>
                      <div className={s.videoDuration}>{duration}</div>
                    </div>
                    <div className={s.videoInfo}>
                      <div className={s.videoTitle}>{titulo}</div>
                      <div className={s.videoMeta}>{canal}</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* LEGISLAÇÃO */}
          {(activeChip === "Todos" || activeChip === "Legislação") && search === "" && (
            <section className={s.legisSection}>
              <div className={`${s.sectionLabel} ${s.fadeIn}`}>Legislação</div>
              <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>Conheça as leis que regulam a IA</h2>
              <div className={s.legisGrid}>
                {legislacao.map(({ flag, code, nome, desc, badge, badgeLabel, href, slug }, i) => (
                  <div key={code} className={`${s.legisCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                    <div className={s.legisFlag}>{flag}</div>
                    <div className={s.legisCode}>{code}</div>
                    <div className={s.legisName}>{nome}</div>
                    <div className={s.legisDesc}>{desc}</div>
                    <span className={`${s.legisBadge} ${s[badge as keyof typeof s]}`}>{badgeLabel}</span>
                    <div className={s.legisLinks}>
                      {slug && (
                        <Link href={`/academia/artigos/${slug}`} className={s.legisBtn}>
                          Ver artigo →
                        </Link>
                      )}
                      <a href={href} target="_blank" rel="noopener noreferrer" className={s.legisBtnOut}>
                        Texto oficial <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* SIDEBAR */}
        <aside className={s.sidebar}>

          {/* Perfil */}
          <div className={`${s.sideCard} ${s.fadeIn}`}>
            <div className={s.sideCardTitle}>Filtrar por perfil</div>
            <div className={s.profileBtns}>
              {perfis.map(({ icon, titulo, desc, href }) => (
                <Link key={titulo} href={href} className={s.profileBtn} style={{ textDecoration: "none" }}>
                  <span className={s.profileIcon}>{icon}</span>
                  <div className={s.profileBtnText}>
                    <h5>{titulo}</h5>
                    <p>{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className={`${s.sideCard} ${s.fadeIn}`} style={{ transitionDelay: ".1s" }}>
            <div className={s.sideCardTitle}>Em alta agora</div>
            <div className={s.trendList}>
              {trending.map((t, i) => (
                <Link key={t} href={trendingLinks[t] ?? "/academia"} className={s.trendItem} style={{ textDecoration: "none" }}>
                  <span className={s.trendNum}>#{i + 1}</span>
                  <span>{t}</span>
                  <ChevronRight size={14} style={{ marginLeft: "auto", flexShrink: 0, color: "var(--muted)" }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Certificado */}
          <div className={`${s.certCard} ${s.fadeIn}`} style={{ transitionDelay: ".2s" }}>
            <span className={s.certEmoji}>🏆</span>
            <div className={s.certTitle}>Certificado de Conclusão</div>
            <div className={s.certDesc}>Complete uma trilha e receba seu certificado digital IA Fala Brasil.</div>
            <Link href="/academia/trilha/fundamentos-ia" className={s.certBtn}>Iniciar trilha gratuita</Link>
          </div>

          {/* Parceiros */}
          <div className={`${s.sideCard} ${s.fadeIn}`} style={{ transitionDelay: ".3s" }}>
            <div className={s.sideCardTitle}>Fontes e parceiros</div>
            <div className={s.partnerList}>
              {parceiros.map((p) => (
                <span key={p} className={s.partnerChip}>{p}</span>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
