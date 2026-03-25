"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Play, Clock, BookOpen, ChevronRight } from "lucide-react";
import s from "./academia.module.css";

/* ── DATA ── */
const trilhas = [
  {
    icon: "🧠",
    bg: "#E6F5EC",
    titulo: "Fundamentos de IA",
    desc: "O que é IA, como aprende e por que importa para o Brasil.",
    aulas: 12,
    horas: "4h",
    progress: 0,
  },
  {
    icon: "⚙️",
    bg: "#E8F4FD",
    titulo: "Machine Learning",
    desc: "Modelos, dados e treinamento — sem precisar ser programador.",
    aulas: 10,
    horas: "3h30",
    progress: 0,
  },
  {
    icon: "⚖️",
    bg: "#FFF3CD",
    titulo: "Ética, Viés & Regulação",
    desc: "Discriminação algorítmica, LGPD e o PL de IA no Brasil.",
    aulas: 8,
    horas: "2h45",
    progress: 0,
  },
  {
    icon: "🏛️",
    bg: "#FCE8E8",
    titulo: "IA no Setor Público",
    desc: "Saúde, educação, segurança — como o governo usa IA hoje.",
    aulas: 9,
    horas: "3h",
    progress: 0,
  },
];

const artigos = [
  {
    tags: [{ label: "Técnico", cls: "tagTecnico" }],
    titulo: "Como os LLMs funcionam: explicação sem código",
    desc: "Uma explicação visual e acessível de como modelos de linguagem processam texto e geram respostas.",
    tempo: "8 min",
  },
  {
    tags: [{ label: "Ética & IA", cls: "tagEtica" }],
    titulo: "Viés racial em algoritmos de crédito no Brasil",
    desc: "Análise de casos reais em que modelos de IA reproduziram desigualdades históricas no acesso ao crédito.",
    tempo: "11 min",
  },
  {
    tags: [{ label: "Legislação", cls: "tagLegis" }],
    titulo: "PL 2338/2023: o que muda para empresas brasileiras",
    desc: "Guia prático sobre o Projeto de Lei de IA do Brasil — obrigações, prazos e impactos para cada setor.",
    tempo: "14 min",
  },
  {
    tags: [{ label: "Educação", cls: "tagEduc" }],
    titulo: "Como usar IA em sala de aula sem perder a autoria",
    desc: "Estratégias pedagógicas para professores integrarem IA de forma crítica e produtiva na BNCC.",
    tempo: "9 min",
  },
  {
    tags: [{ label: "Pesquisa BR", cls: "tagPesquisa" }],
    titulo: "Mapa da IA no Brasil: empresas, centros e iniciativas",
    desc: "Panorama completo do ecossistema de Inteligência Artificial brasileiro em 2025.",
    tempo: "12 min",
  },
  {
    tags: [{ label: "Técnico", cls: "tagTecnico" }, { label: "Ética & IA", cls: "tagEtica" }],
    titulo: "Deepfakes: como detectar e se proteger",
    desc: "Técnicas de verificação e ferramentas gratuitas para identificar vídeos e áudios gerados por IA.",
    tempo: "7 min",
  },
];

const videos = [
  { emoji: "🎓", bg: "#E6F5EC", titulo: "O que é Inteligência Artificial?", meta: "IA Fala Brasil · 12 min", duration: "12:04" },
  { emoji: "🤖", bg: "#E8F4FD", titulo: "ChatGPT vs. Gemini vs. Claude", meta: "IA Fala Brasil · 18 min", duration: "18:22" },
  { emoji: "⚖️", bg: "#FFF3CD", titulo: "Ética em IA: casos brasileiros", meta: "IA Fala Brasil · 15 min", duration: "15:47" },
  { emoji: "🛡️", bg: "#FCE8E8", titulo: "Como se proteger de golpes com IA", meta: "IA Fala Brasil · 10 min", duration: "10:31" },
];

const legislacao = [
  { flag: "🇧🇷", code: "PL 2338/2023", nome: "Marco Legal da IA", desc: "Regulamenta o desenvolvimento e uso de IA no Brasil. Em tramitação no Senado.", badge: "badgeTramita", badgeLabel: "Em tramitação" },
  { flag: "🇧🇷", code: "Lei 13.709/2018", nome: "LGPD", desc: "Lei Geral de Proteção de Dados. Vigente e aplicável a sistemas de IA.", badge: "badgeVigente", badgeLabel: "Vigente" },
  { flag: "🇧🇷", code: "Lei 12.965/2014", nome: "Marco Civil da Internet", desc: "Define direitos e deveres no ambiente digital brasileiro.", badge: "badgeVigente", badgeLabel: "Vigente" },
  { flag: "🇧🇷", code: "Estratégia Brasileira de IA", nome: "EBIA 2024–2028", desc: "Plano nacional para desenvolvimento responsável de IA no setor público.", badge: "badgeVigente", badgeLabel: "Vigente" },
  { flag: "🇪🇺", code: "EU AI Act", nome: "Regulamento Europeu de IA", desc: "Referência global para regulação por níveis de risco. Influencia o PL brasileiro.", badge: "badgeRef", badgeLabel: "Referência" },
];

const CHIPS = ["Todos", "Técnico", "Ética & IA", "Legislação", "Educação", "Pesquisa BR"];

const trending = [
  "Regulação de IA no Brasil",
  "ChatGPT na educação",
  "Deepfakes e eleições",
  "IA e mercado de trabalho",
  "LGPD aplicada a IA",
];

const perfis = [
  { icon: "🎒", titulo: "Estudante", desc: "Fundamental ao médio" },
  { icon: "📚", titulo: "Professor", desc: "Planos alinhados à BNCC" },
  { icon: "🏛️", titulo: "Gestor Público", desc: "IA no setor público" },
  { icon: "🧑‍💼", titulo: "Profissional", desc: "Aplicações no trabalho" },
];

const parceiros = ["USP", "INEP", "MEC", "CNPq", "Fiocruz", "IBGE"];

/* ── COMPONENT ── */
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
    const matchSearch = search === "" || a.titulo.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
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
              { num: "120+", label: "Artigos publicados" },
              { num: "4", label: "Trilhas de aprendizado" },
              { num: "48", label: "Vídeos disponíveis" },
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
        {/* CONTEÚDO */}
        <div>

          {/* TRILHAS */}
          {(activeChip === "Todos" && search === "") && (
            <section className={s.fadeIn}>
              <div className={s.sectionLabel}>Trilhas de Aprendizado</div>
              <h2 className={s.sectionTitle}>Comece do começo, vá até o fim</h2>
              <div className={s.trilhasGrid}>
                {trilhas.map(({ icon, bg, titulo, desc, aulas, horas, progress }) => (
                  <div key={titulo} className={s.trilhaCard}>
                    <div className={s.trilhaIcon} style={{ background: bg }}>{icon}</div>
                    <h4>{titulo}</h4>
                    <p>{desc}</p>
                    <div className={s.trilhaProgress}>
                      <div className={s.progressBar}>
                        <div className={s.progressFill} style={{ width: `${progress}%` }} />
                      </div>
                      <div className={s.progressMeta}>
                        <span>{aulas} aulas · {horas}</span>
                        <span>{progress}% concluído</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ARTIGOS */}
          <section className={s.articlesList}>
            <div className={`${s.sectionLabel} ${s.fadeIn}`}>Artigos</div>
            <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>
              {filteredArtigos.length === artigos.length ? "Últimas publicações" : `${filteredArtigos.length} resultado${filteredArtigos.length !== 1 ? "s" : ""}`}
            </h2>
            {filteredArtigos.length === 0 ? (
              <div className={s.fadeIn} style={{ textAlign: "center", padding: "3rem 0", color: "var(--muted)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
                <p>Nenhum artigo encontrado para "<strong>{search}</strong>"</p>
              </div>
            ) : (
              filteredArtigos.map(({ tags, titulo, desc, tempo }, i) => (
                <div key={titulo} className={`${s.articleItem} ${s.fadeIn}`} style={{ transitionDelay: `${i * 0.06}s` }}>
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
                </div>
              ))
            )}
          </section>

          {/* VÍDEOS */}
          {(activeChip === "Todos" && search === "") && (
            <section className={s.videosSection}>
              <div className={`${s.sectionLabel} ${s.fadeIn}`}>Vídeos</div>
              <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>Aprenda assistindo</h2>
              <div className={s.videosGrid}>
                {videos.map(({ emoji, bg, titulo, meta, duration }, i) => (
                  <div key={titulo} className={`${s.videoCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                    <div className={s.videoThumb} style={{ background: bg }}>
                      <span>{emoji}</span>
                      <div className={s.playBtn}><Play size={14} fill="white" /></div>
                      <div className={s.videoDuration}>{duration}</div>
                    </div>
                    <div className={s.videoInfo}>
                      <div className={s.videoTitle}>{titulo}</div>
                      <div className={s.videoMeta}>{meta}</div>
                    </div>
                  </div>
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
                {legislacao.map(({ flag, code, nome, desc, badge, badgeLabel }, i) => (
                  <div key={code} className={`${s.legisCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                    <div className={s.legisFlag}>{flag}</div>
                    <div className={s.legisCode}>{code}</div>
                    <div className={s.legisName}>{nome}</div>
                    <div className={s.legisDesc}>{desc}</div>
                    <span className={`${s.legisBadge} ${s[badge as keyof typeof s]}`}>{badgeLabel}</span>
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
              {perfis.map(({ icon, titulo, desc }) => (
                <button key={titulo} className={s.profileBtn}>
                  <span className={s.profileIcon}>{icon}</span>
                  <div className={s.profileBtnText}>
                    <h5>{titulo}</h5>
                    <p>{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className={`${s.sideCard} ${s.fadeIn}`} style={{ transitionDelay: ".1s" }}>
            <div className={s.sideCardTitle}>Em alta agora</div>
            <div className={s.trendList}>
              {trending.map((t, i) => (
                <div key={t} className={s.trendItem}>
                  <span className={s.trendNum}>#{i + 1}</span>
                  <span>{t}</span>
                  <ChevronRight size={14} style={{ marginLeft: "auto", flexShrink: 0, color: "var(--muted)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Certificado */}
          <div className={`${s.certCard} ${s.fadeIn}`} style={{ transitionDelay: ".2s" }}>
            <span className={s.certEmoji}>🏆</span>
            <div className={s.certTitle}>Certificado de Conclusão</div>
            <div className={s.certDesc}>Complete uma trilha e receba seu certificado digital IA Fala Brasil.</div>
            <Link href="/aprender" className={s.certBtn}>Iniciar trilha gratuita</Link>
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
