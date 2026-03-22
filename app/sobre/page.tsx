"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Sora, DM_Serif_Display } from "next/font/google";
import s from "./sobre.module.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

const missaoCards = [
  { icon: "🇧🇷", titulo: "Contexto brasileiro", desc: "Nada de exemplos importados. Golpes do WhatsApp, fake news no Facebook, viés em algoritmos de crédito — nossa realidade, nossa linguagem." },
  { icon: "🏫", titulo: "Educação pública primeiro", desc: "100% gratuito para escolas públicas. Acreditamos que o acesso à alfabetização em IA não pode ser um privilégio de escolas privadas." },
  { icon: "⚡", titulo: "IA de verdade, não simulação", desc: "Os módulos usam IA real integrada. O aluno aprende fazendo — conversando com a tecnologia, não lendo sobre ela." },
];

const numeros = [
  { num: "4", label: "Módulos ativos" },
  { num: "3", label: "Perfis atendidos" },
  { num: "R$ 0", label: "Para escolas públicas" },
  { num: "2026", label: "Ano de lançamento" },
];

const valores = [
  { icon: "🔍", titulo: "Transparência", desc: "Explicamos como a IA funciona, inclusive seus limites e riscos. Não romantizamos a tecnologia." },
  { icon: "🤝", titulo: "Acessibilidade real", desc: "Funciona no celular, sem cadastro obrigatório, em português sem jargão técnico." },
  { icon: "🛡️", titulo: "Proteção digital", desc: "Ensinamos não só a usar IA, mas a se defender dela — golpes, deepfakes e manipulação." },
  { icon: "📚", titulo: "Rigor pedagógico", desc: "Conteúdo alinhado à BNCC, desenvolvido para a realidade de professores de escolas públicas brasileiras." },
  { icon: "🇧🇷", titulo: "Soberania digital", desc: "Acreditamos que o Brasil precisa de cidadãos que entendam IA — não apenas consumidores de tecnologia importada." },
  { icon: "⚗️", titulo: "Inovação contínua", desc: "Novos módulos e ferramentas em desenvolvimento constante. O Brasil muda rápido, e a plataforma acompanha." },
];

export default function SobrePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    pageRef.current?.querySelectorAll(`.${s.fadeIn}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className={`${s.page} ${sora.variable} ${dmSerif.variable}`}>

      {/* HERO */}
      <div className={s.hero}>
        <div className={s.fadeIn}>
          <div className={s.badge}>Sobre o projeto</div>
          <h1 className={s.heroTitle}>
            Feito para o Brasil.<br /><em>De verdade.</em>
          </h1>
          <p className={s.heroDesc}>
            O IA Fala Brasil nasceu de uma convicção simples: toda pessoa no Brasil merece entender e usar
            Inteligência Artificial — independente de onde mora, quanto ganha ou qual escola frequentou.
          </p>
          <div className={s.heroActions}>
            <Link href="/aprender" className={s.btnPrimary}>Começar a aprender</Link>
            <Link href="/professor" className={s.btnGhost}>Sou professor</Link>
          </div>
        </div>

        <div className={`${s.founderCard} ${s.fadeIn}`} style={{ transitionDelay: ".2s" }}>
          <div className={s.founderAvatar}>👨‍💻</div>
          <h3 className={s.founderName}>Ronny Y Oliveira</h3>
          <div className={s.founderRole}>Fundador · Desenvolvedor · Autor</div>
          <blockquote className={s.founderQuote}>
            "A IA vai transformar o Brasil. Quero garantir que essa transformação seja para todos —
            não só para quem tem acesso a cursos caros ou fala inglês."
          </blockquote>
          <div className={s.founderSince}>
            <div className={s.sinceDot} />
            Em projetos de tecnologia desde 2020 · Brasil & EUA
          </div>
        </div>
      </div>

      {/* MISSÃO */}
      <section className={`${s.section} ${s.mission}`}>
        <div className={s.sectionInner}>
          <div className={`${s.sectionLabel} ${s.fadeIn}`}>Nossa missão</div>
          <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>Por que o IA Fala Brasil existe</h2>
          <p className={`${s.sectionSub} ${s.fadeIn}`}>
            O Brasil tem 213 milhões de pessoas. A maioria nunca teve contato real com IA — só ouviu falar.
            Criamos uma plataforma que muda isso, com conteúdo em português nativo, exemplos da realidade
            brasileira e tecnologia de verdade acessível a todos.
          </p>
          <div className={s.missionGrid}>
            {missaoCards.map(({ icon, titulo, desc }, i) => (
              <div key={titulo} className={`${s.missionCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={s.missionIcon}>{icon}</div>
                <h4>{titulo}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className={`${s.section} ${s.bgDefault}`}>
        <div className={s.sectionInner}>
          <div className={`${s.sectionLabel} ${s.fadeIn}`}>Impacto</div>
          <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>Crescendo junto com o Brasil</h2>
          <div className={s.numbersGrid}>
            {numeros.map(({ num, label }, i) => (
              <div key={label} className={`${s.numberCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={s.num}>{num}</div>
                <div className={s.numLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM ESTÁ POR TRÁS */}
      <section className={`${s.section} ${s.bgCard}`}>
        <div className={s.sectionInner}>
          <div className={`${s.sectionLabel} ${s.fadeIn}`}>Fundador</div>
          <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>Quem está por trás</h2>
          <div className={`${s.alignBanner} ${s.fadeIn}`}>
            <div className={s.alignLogo}>👨‍💻</div>
            <div className={s.alignText}>
              <h4>Ronny Y Oliveira — Desenvolvedor, Autor e Empreendedor Digital</h4>
              <p>
                Com projetos em tecnologia desde 2020, Ronny combina visão empreendedora e paixão por educação.
                Autor de livros lançados no <strong>Brasil e nos Estados Unidos</strong>, traz essa experiência
                editorial para o IA Fala Brasil — construindo conteúdo rigoroso, acessível e genuinamente brasileiro.
                Fundador do <strong>aplicativo Fala Brasil</strong>, Ronny usa tecnologia para abrir portas, não fechá-las.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className={`${s.section} ${s.bgDefault}`}>
        <div className={s.sectionInner}>
          <div className={`${s.sectionLabel} ${s.fadeIn}`}>Valores</div>
          <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>O que guia cada decisão</h2>
          <div className={s.valuesGrid}>
            {valores.map(({ icon, titulo, desc }, i) => (
              <div key={titulo} className={`${s.valueItem} ${s.fadeIn}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={s.valueIcon}>{icon}</div>
                <div>
                  <h4>{titulo}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALINHAMENTO */}
      <section className={`${s.section} ${s.bgCard}`}>
        <div className={s.sectionInner}>
          <div className={`${s.sectionLabel} ${s.fadeIn}`}>Educação</div>
          <h2 className={`${s.sectionTitle} ${s.fadeIn}`}>Alinhado com o que importa</h2>
          <p className={`${s.sectionSub} ${s.fadeIn}`}>
            Nossa plataforma foi desenvolvida respeitando os marcos regulatórios e diretrizes educacionais brasileiras.
          </p>
          <div className={`${s.alignBanner} ${s.fadeIn}`}>
            <div className={s.alignLogo}>📋</div>
            <div className={s.alignText}>
              <h4>Alinhado à BNCC</h4>
              <p>
                Os planos de aula e módulos seguem as competências digitais e de pensamento computacional da
                Base Nacional Comum Curricular — facilitando a adoção por professores de qualquer rede pública.
              </p>
            </div>
          </div>
          <div className={`${s.alignBanner} ${s.fadeIn}`} style={{ marginTop: "1.25rem", transitionDelay: ".15s" }}>
            <div className={s.alignLogo}>🔒</div>
            <div className={s.alignText}>
              <h4>Privacidade e LGPD</h4>
              <p>
                Não coletamos dados de menores sem consentimento. O acesso principal é sem cadastro.
                Operamos em conformidade com a Lei Geral de Proteção de Dados (LGPD) e diretrizes de uso ético de IA para educação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={s.ctaSection}>
        <h2 className={s.ctaTitle}>Junte-se ao movimento.</h2>
        <p className={s.ctaDesc}>Seja estudante, professor ou cidadão — seu lugar na era da IA começa aqui.</p>
        <div className={s.ctaActions}>
          <Link href="/aprender" className={s.ctaBtnWhite}>Começar a aprender</Link>
          <Link href="/professor" className={s.ctaBtnOutline}>Cadastrar minha escola</Link>
        </div>
      </section>

    </div>
  );
}
