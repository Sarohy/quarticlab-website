import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import styles from "../styles/projectsNew.module.css";

import { getAllProjects } from "../firebase/firebaseRequests";
import { SITE_URL } from "../utils/siteUrl";

/* ── reveal hook (featured rows + CTA) ───────────── */
function useReveal() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    refs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
}

/* ── constants ───────────────────────────────────── */
const DISCIPLINES = [
  "All",
  "Web",
  "Mobile",
  "AI/ML",
  "Blockchain",
  "IoT",
  "DevOps",
  "Design",
];

const PORTFOLIO_KICKER =
  "PORTFOLIO · 50+ PRODUCTS SHIPPED · FINTECH / EDTECH / AI / SAAS / MARKETPLACES";

/* ── helpers ─────────────────────────────────────── */
// Stored types may be lowercase ("web", "ai/ml"); normalise to the
// canonical discipline label for display + matching.
function canonicalType(t) {
  const match = DISCIPLINES.find(
    d => d.toLowerCase() === String(t).toLowerCase(),
  );
  return match ?? String(t).charAt(0).toUpperCase() + String(t).slice(1);
}

function typeMatches(p, discipline) {
  const target = discipline.toLowerCase();
  return (p.types || []).some(t => String(t).toLowerCase() === target);
}

function projectTag(p) {
  const first = p.types?.[0] ? canonicalType(p.types[0]) : p.category;
  return [first, p.industry].filter(Boolean).join(" · ");
}

function projectTags(p) {
  const tags = (p.types || []).map(canonicalType);
  if (p.industry && !tags.includes(p.industry)) {
    tags.push(p.industry);
  }
  return tags;
}

function truncate(text, max = 150) {
  if (!text || text.length <= max) {
    return text || "";
  }
  const cut = text.lastIndexOf(" ", max);
  return `${text.slice(0, cut > 0 ? cut : max)}…`;
}

/* ── page ────────────────────────────────────────── */
export default function ProjectsNewPage({ projects = [] }) {
  const addRef = useReveal();
  const router = useRouter();
  const kickerRef = useRef(null);
  const [active, setActive] = useState(null);

  /* scramble the hero kicker on mount */
  useEffect(() => {
    const el = kickerRef.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = PORTFOLIO_KICKER;
      return;
    }
    const glyphs = "◆#/\\+×—·01";
    const total = 44;
    let frame = 0;
    let tid = null;
    const tick = () => {
      let out = "";
      for (let i = 0; i < PORTFOLIO_KICKER.length; i++) {
        const threshold = (i / PORTFOLIO_KICKER.length) * total * 0.8;
        out +=
          frame > threshold
            ? PORTFOLIO_KICKER[i]
            : PORTFOLIO_KICKER[i] === " "
              ? " "
              : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
      if (frame++ < total) {
        tid = setTimeout(tick, 34);
      } else {
        el.textContent = PORTFOLIO_KICKER;
      }
    };
    tick();
    return () => clearTimeout(tid);
  }, []);

  const activeDiscipline = (() => {
    if (!router.isReady) {
      return "All";
    }
    const d = router.query.discipline ? String(router.query.discipline) : "";
    return DISCIPLINES.find(x => x.toLowerCase() === d.toLowerCase()) ?? "All";
  })();

  const disciplineCounts = Object.fromEntries(
    DISCIPLINES.map(d => [
      d,
      d === "All"
        ? projects.length
        : projects.filter(p => typeMatches(p, d)).length,
    ]),
  );

  const filtered = projects.filter(
    p => activeDiscipline === "All" || typeMatches(p, activeDiscipline),
  );

  const featured = projects.slice(0, 3);
  const industriesCount = new Set(projects.map(p => p.industry).filter(Boolean))
    .size;

  const handleDiscipline = val => {
    const q = val === "All" ? {} : { discipline: val.toLowerCase() };
    router.push({ pathname: "/projects", query: q }, undefined, {
      shallow: true,
    });
  };

  /* ── JSON-LD structured data ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    description:
      "A curated list of custom software projects built by Quartic Lab, " +
      "covering web apps, mobile apps, AI & ML solutions, and blockchain " +
      "platforms.",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      item: {
        "@type": "SoftwareApplication",
        author: { "@type": "Organization", name: "Quartic Lab", url: SITE_URL },
        description: p.desc,
        name: p.title,
        ...(p.imageUrl ? { image: p.imageUrl } : {}),
      },
      position: i + 1,
    })),
    name: "Quartic Lab Portfolio — Software Development Projects",
    numberOfItems: projects.length,
    url: `${SITE_URL}/projects`,
  };

  return (
    <div className={styles.page}>
      <Seo
        canonical={`${SITE_URL}/projects`}
        description={
          "Explore Quartic Lab's portfolio of software projects spanning web " +
          "apps, mobile applications, AI & ML solutions, and blockchain " +
          "platforms. Trusted by global clients."
        }
        keywords={
          "software development portfolio, web app development, mobile app " +
          "development, AI ML projects, blockchain development, React " +
          "projects, Node.js projects, custom software"
        }
        ogDescription={
          "Explore Quartic Lab's portfolio of software projects spanning web " +
          "apps, mobile applications, AI & ML solutions, and blockchain " +
          "platforms."
        }
        ogTitle="Portfolio | Quartic Lab — Web, Mobile & AI Projects"
        title="Portfolio | Quartic Lab"
        twitterDescription={
          "Explore Quartic Lab's portfolio of software projects spanning web " +
          "apps, mobile applications, AI & ML solutions, and blockchain " +
          "platforms."
        }
        twitterTitle="Portfolio | Quartic Lab — Web, Mobile & AI Projects"
      >
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Seo>

      {/* ─── HERO ──────────────────────────────── */}
      <header className={styles.phero}>
        <div className={styles.container}>
          <span className={styles.kick} ref={kickerRef}>
            &nbsp;
          </span>
          <h1 className={styles.h1}>
            <span className={styles.ln}>
              <span>Built here.</span>
            </span>
            <span className={styles.ln}>
              <span>
                <em>Running out there.</em>
              </span>
            </span>
          </h1>
          <p className={styles.heroLead}>
            A selection from the 50+ products we&apos;ve taken from brief to
            production since 2020 — AI platforms, SaaS, marketplaces, and the
            automation systems behind them.
          </p>
          <div className={styles.pheroMeta}>
            <div className={styles.pm}>
              <b>50+</b>
              <i>Projects shipped</i>
            </div>
            <div className={styles.pm}>
              <b>{projects.length}</b>
              <i>In this portfolio</i>
            </div>
            <div className={styles.pm}>
              <b>{industriesCount || 6}</b>
              <i>Industries</i>
            </div>
            <div className={styles.pm}>
              <b>30d</b>
              <i>Support behind each</i>
            </div>
          </div>
        </div>
      </header>

      {/* ─── FEATURED ─────────────────────────── */}
      {featured.length > 0 && (
        <section className={styles.featSec}>
          <div className={styles.container}>
            <div className={styles.secHead}>
              <div className={styles.reveal} ref={addRef}>
                <span className={styles.eb}>
                  <i />
                  Case studies
                </span>
                <h2 className={styles.h2}>
                  A few builds, <em>up close</em>
                </h2>
              </div>
              <p className={`${styles.headLead} ${styles.reveal}`} ref={addRef}>
                The work we get asked about most — what it does, what it runs
                on, and what happened after launch.
              </p>
            </div>
            <div className={styles.feat}>
              {featured.map((p, i) => (
                <article
                  className={`${styles.frow} ${styles.reveal}`}
                  key={p.title}
                  onClick={() => setActive(p)}
                  ref={addRef}
                >
                  <div className={styles.fshot}>
                    {p.imageUrl ? (
                      <Image
                        alt={`${p.title} by Quartic Lab`}
                        className={styles.coverImg}
                        fill
                        sizes="(max-width: 1040px) 100vw, 55vw"
                        src={p.imageUrl}
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    ) : (
                      <div className={styles.imgPlaceholder} />
                    )}
                  </div>
                  <div className={styles.fbody}>
                    <span className={styles.fnum}>0{i + 1}</span>
                    <span className={styles.pwTag}>{projectTag(p)}</span>
                    <h3 className={styles.frowTitle}>{p.title}</h3>
                    <p className={styles.frowDesc}>{p.desc}</p>
                    <div className={styles.tags}>
                      {projectTags(p).map(t => (
                        <span className={styles.tg} key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FILTER BAR ───────────────────────── */}
      <div className={styles.fbar} id="grid">
        <div className={`${styles.container} ${styles.fbarIn}`}>
          <div
            aria-label="Filter projects"
            className={styles.fpills}
            role="group"
          >
            {DISCIPLINES.filter(
              d => d === "All" || disciplineCounts[d] > 0,
            ).map(d => (
              <button
                aria-pressed={activeDiscipline === d}
                className={`${styles.fpill} ${
                  activeDiscipline === d ? styles.on : ""
                }`}
                key={d}
                onClick={() => handleDiscipline(d)}
              >
                {d === "All" ? "ALL" : d.toUpperCase()}
              </button>
            ))}
          </div>
          <span className={styles.fcount}>
            <b>{filtered.length}</b> / {projects.length} PROJECTS
          </span>
        </div>
      </div>

      {/* ─── PROJECT GRID ─────────────────────── */}
      <section className={styles.gridSec}>
        <div className={styles.container}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>
              No projects in this category yet. Check back soon.
            </p>
          ) : (
            <div className={styles.pgrid} key={activeDiscipline}>
              {filtered.map((p, i) => (
                <button
                  aria-haspopup="dialog"
                  className={styles.pc}
                  key={p.title}
                  onClick={() => setActive(p)}
                  style={{ animationDelay: `${i * 45}ms` }}
                  type="button"
                >
                  <div className={styles.shot}>
                    {p.imageUrl ? (
                      <Image
                        alt={`${p.title} by Quartic Lab`}
                        className={styles.coverImg}
                        fill
                        sizes="(max-width: 680px) 100vw, (max-width: 1040px) 50vw, 33vw"
                        src={p.imageUrl}
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    ) : (
                      <div className={styles.imgPlaceholder} />
                    )}
                  </div>
                  <div className={styles.pcB}>
                    <span className={styles.pwTag}>{projectTag(p)}</span>
                    <h3 className={styles.pcTitle}>
                      {p.title}
                      <span className={styles.go}>OPEN +</span>
                    </h3>
                    <p className={styles.pcDesc}>{truncate(p.desc)}</p>
                    <div className={styles.tags}>
                      {projectTags(p).map(t => (
                        <span className={styles.tg} key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA BAND ─────────────────────────── */}
      <section className={styles.ctaSection}>
        <div aria-hidden="true" className={styles.ctaBg}>
          <svg viewBox="0 0 100 100">
            <g
              opacity=".6"
              stroke="oklch(93% 0.015 75)"
              strokeLinecap="round"
              strokeWidth="1.2"
            >
              <line x1="50" x2="82" y1="18" y2="50" />
              <line x1="50" x2="50" y1="18" y2="82" />
              <line x1="50" x2="18" y1="18" y2="50" />
              <line x1="82" x2="50" y1="50" y2="82" />
              <line x1="82" x2="18" y1="50" y2="50" />
              <line x1="50" x2="18" y1="82" y2="50" />
            </g>
            <g fill="none" stroke="oklch(58% 0.12 45)" strokeWidth="2">
              <circle cx="50" cy="18" r="6.5" />
              <circle cx="82" cy="50" r="6.5" />
              <circle cx="50" cy="82" r="6.5" />
              <circle cx="18" cy="50" r="6.5" />
            </g>
          </svg>
        </div>
        <div className={styles.container}>
          <span
            className={`${styles.eb} ${styles.ebCenter} ${styles.reveal}`}
            ref={addRef}
          >
            <i />
            Yours could be next
          </span>
          <h2 className={`${styles.ctaTitle} ${styles.reveal}`} ref={addRef}>
            Get a scoped estimate in <em>12 hours</em>
          </h2>
          <p className={`${styles.ctaDesc} ${styles.reveal}`} ref={addRef}>
            Scope, timeline, team composition, and cost — delivered to your
            inbox. No sales call required.
          </p>
          <div className={`${styles.ctaBtns} ${styles.reveal}`} ref={addRef}>
            <a
              className={styles.ctaBtnPrimary}
              href="https://calendly.com/quarticlab/30min"
              rel="noopener noreferrer"
              target="_blank"
            >
              Book a 30-min call <span className={styles.arr}>→</span>
            </a>
            <Link className={styles.ctaBtnSecondary} href="/contact">
              Send a brief instead
            </Link>
          </div>
          <p className={`${styles.ctaNote} ${styles.reveal}`} ref={addRef}>
            FIXED-SCOPE SPRINTS · WEEKLY DEMOS · 30 DAYS FREE SUPPORT
          </p>
        </div>
      </section>

      {/* ─── MODAL ────────────────────────────── */}
      <ProjectModal onClose={() => setActive(null)} project={active} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROJECT MODAL
   ══════════════════════════════════════════════════ */
function ProjectModal({ onClose, project }) {
  const [shown, setShown] = useState(false);
  const closeBtnRef = useRef(null);

  const requestClose = () => {
    setShown(false);
    setTimeout(onClose, 320);
  };

  useEffect(() => {
    if (!project) {
      return;
    }
    document.body.classList.add(styles.modOpen);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = null;
    if (reduced) {
      setShown(true);
    } else {
      raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShown(true)),
      );
    }
    closeBtnRef.current?.focus();

    const onKey = e => {
      if (e.key === "Escape") {
        requestClose();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove(styles.modOpen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <div
      aria-labelledby="mod-title"
      aria-modal="true"
      className={`${styles.mod} ${shown ? styles.modShown : ""}`}
      role="dialog"
    >
      <div className={styles.modOv} onClick={requestClose} />
      <div className={styles.modP}>
        <button
          aria-label="Close"
          className={styles.modX}
          onClick={requestClose}
          ref={closeBtnRef}
          type="button"
        >
          ✕
        </button>
        <div className={styles.modShot}>
          {project.imageUrl ? (
            <Image
              alt={project.title}
              className={styles.coverImg}
              fill
              sizes="(max-width: 920px) 100vw, 880px"
              src={project.imageUrl}
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          ) : (
            <div className={styles.imgPlaceholder} />
          )}
        </div>
        <div className={styles.modB}>
          <span className={styles.pwTag}>{projectTag(project)}</span>
          <h3 id="mod-title">{project.title}</h3>
          <p>{project.desc}</p>
          <div className={styles.tags}>
            {projectTags(project).map(t => (
              <span className={styles.tg} key={t}>
                {t}
              </span>
            ))}
          </div>
          <Link className={styles.modCta} href="/contact">
            Build something like this <span className={styles.arr}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── data fetching — SSR (always fresh from Firestore) ── */
export async function getServerSideProps() {
  try {
    const data = await getAllProjects();
    const projects = (data || [])
      .filter(p => p.is_active !== false)
      .map(p => ({
        category: p.category || p.types?.[0] || "Web",
        desc: p.desc || p.description || "",
        imageUrl: p.image_url || p.image || p.imageUrl || p.img || null,
        industry: p.industry || "",
        order: Number(p.order_no ?? p.order ?? 0),
        title: p.title || "",
        types: Array.isArray(p.types) ? p.types : p.type ? [p.type] : [],
      }))
      .sort((a, b) =>
        a.order === b.order
          ? a.title.localeCompare(b.title)
          : a.order - b.order,
      );
    return { props: { projects } };
  } catch (_) {
    return { props: { projects: [] } };
  }
}
