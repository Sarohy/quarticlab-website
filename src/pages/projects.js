import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/projectsNew.module.css";

import { getAllProjects } from "../firebase/firebaseRequests";
import { SITE_URL } from "../utils/siteUrl";

/* ── reveal hook ─────────────────────────────────── */
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
      { threshold: 0.08 },
    );
    refs.current.forEach(el => {
      if (el) {
        observer.observe(el);
      }
    });
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

const INDUSTRIES = [
  "All",
  "EdTech",
  "FinTech",
  "Hospitality",
  "Marketplace",
  "AI-native SaaS",
  "HealthTech",
  "Consumer",
];

/* ── page ────────────────────────────────────────── */

export default function ProjectsNewPage({ projects = [] }) {
  const addRef = useReveal();
  const router = useRouter();
  const [displayCount, setDisplayCount] = useState(9);

  const activeDiscipline = (() => {
    if (!router.isReady) {
      return "All";
    }
    const d = router.query.discipline ? String(router.query.discipline) : "";
    return DISCIPLINES.find(x => x.toLowerCase() === d.toLowerCase()) ?? "All";
  })();

  const activeIndustry = (() => {
    if (!router.isReady) {
      return "All";
    }
    const ind = router.query.industry ? String(router.query.industry) : "";
    return INDUSTRIES.find(x => x.toLowerCase() === ind.toLowerCase()) ?? "All";
  })();

  useEffect(() => {
    setDisplayCount(9);
  }, [router.query.discipline, router.query.industry]);

  const industryBase =
    activeIndustry === "All"
      ? projects
      : projects.filter(p => p.industry === activeIndustry);

  const disciplineBase =
    activeDiscipline === "All"
      ? projects
      : projects.filter(p => p.types.includes(activeDiscipline));

  const disciplineCounts = Object.fromEntries(
    DISCIPLINES.map(d => [
      d,
      d === "All"
        ? industryBase.length
        : industryBase.filter(p => p.types.includes(d)).length,
    ]),
  );

  const industryCounts = Object.fromEntries(
    INDUSTRIES.map(ind => [
      ind,
      ind === "All"
        ? disciplineBase.length
        : disciplineBase.filter(p => p.industry === ind).length,
    ]),
  );

  const filtered = projects
    .filter(
      p => activeDiscipline === "All" || p.types.includes(activeDiscipline),
    )
    .filter(p => activeIndustry === "All" || p.industry === activeIndustry);

  const visible = filtered.slice(0, displayCount);
  const hasMore = filtered.length > displayCount;
  const isFiltered = activeDiscipline !== "All" || activeIndustry !== "All";

  const handleDiscipline = val => {
    const q = {};
    if (val !== "All") {
      q.discipline = val.toLowerCase();
    }
    if (activeIndustry !== "All") {
      q.industry = activeIndustry.toLowerCase();
    }
    router.push({ pathname: "/projects", query: q }, undefined, {
      shallow: true,
    });
  };

  const handleIndustry = val => {
    const q = {};
    if (activeDiscipline !== "All") {
      q.discipline = activeDiscipline.toLowerCase();
    }
    if (val !== "All") {
      q.industry = val.toLowerCase();
    }
    router.push({ pathname: "/projects", query: q }, undefined, {
      shallow: true,
    });
  };

  const clearFilters = () => {
    router.push({ pathname: "/projects" }, undefined, { shallow: true });
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
      <Head>
        <title>Portfolio | Quartic Lab</title>
        <meta
          content={
            "Explore Quartic Lab's portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms. Trusted by global clients."
          }
          key="description"
          name="description"
        />
        <meta
          content={
            "software development portfolio, web app development, mobile app " +
            "development, AI ML projects, blockchain development, React " +
            "projects, Node.js projects, custom software"
          }
          name="keywords"
        />
        <meta content={`${SITE_URL}/projects`} key="og:url" property="og:url" />
        <meta
          content="Portfolio | Quartic Lab — Web, Mobile & AI Projects"
          key="og:title"
          property="og:title"
        />
        <meta
          content={
            "Explore Quartic Lab's portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms."
          }
          key="og:description"
          property="og:description"
        />
        <meta
          content="Portfolio | Quartic Lab — Web, Mobile & AI Projects"
          key="twitter:title"
          name="twitter:title"
        />
        <meta
          content={
            "Explore Quartic Lab's portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms."
          }
          key="twitter:description"
          name="twitter:description"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>

      {/* ─── HERO BANNER ──────────────────────── */}
      <section aria-label="Portfolio hero banner" className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>Portfolio</span>
          <h1 className={styles.heroH1}>
            Work we&apos;ve <span className={styles.heroAccent}>shipped</span>
          </h1>
          <p className={styles.heroSub}>
            50+ products shipped across EdTech, FinTech, Hospitality, AI, and
            more. Filter by discipline or industry to find work most like yours.
          </p>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── CATEGORY FILTER ──────────────────── */}
      <section
        aria-label="Filter projects by category"
        className={styles.filterSec}
      >
        <div className={styles.container}>
          <div className={styles.filterGroup}>
            <span className={styles.filterGroupLabel}>Discipline</span>
            <div className={styles.filterGroupBtns}>
              {DISCIPLINES.filter(
                d => d === "All" || disciplineCounts[d] > 0,
              ).map(d => (
                <button
                  className={`${styles.filterBtn} ${
                    activeDiscipline === d ? styles.filterActive : ""
                  }`}
                  key={d}
                  onClick={() => handleDiscipline(d)}
                >
                  {d}
                  {d !== "All" && (
                    <span className={styles.filterCount}>
                      ({disciplineCounts[d]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterGroupLabel}>Industry</span>
            <div className={styles.filterGroupBtns}>
              {INDUSTRIES.filter(
                ind => ind === "All" || industryCounts[ind] > 0,
              ).map(ind => (
                <button
                  className={`${styles.filterBtn} ${
                    activeIndustry === ind ? styles.filterActive : ""
                  }`}
                  key={ind}
                  onClick={() => handleIndustry(ind)}
                >
                  {ind}
                  {ind !== "All" && (
                    <span className={styles.filterCount}>
                      ({industryCounts[ind]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {isFiltered && (
            <div className={styles.filterClearRow}>
              <button className={styles.filterClear} onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── PROJECT LIST ─────────────────────── */}
      <section aria-label="Projects portfolio" className={styles.listSec}>
        <div className={styles.container}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>
              No projects in this category yet. Check back soon.
            </p>
          ) : (
            <div className={styles.projectsList}>
              {visible.map((p, i) => (
                <div
                  className={`${styles.projectRow} ${
                    i % 2 !== 0 ? styles.projectRowReverse : ""
                  }`}
                  key={p.title}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={styles.projectImgSide}>
                    {p.imageUrl ? (
                      <Image
                        alt={`${p.title}${
                          p.types?.length
                            ? ` — ${p.types.join(", ")} project`
                            : ""
                        } by Quartic Lab`}
                        className={styles.projectRowImg}
                        fill
                        sizes="(max-width: 768px) 100vw, 52vw"
                        src={p.imageUrl}
                      />
                    ) : (
                      <div className={styles.projectImgPlaceholder} />
                    )}
                  </div>
                  <div className={styles.projectContentSide}>
                    {p.types?.length > 0 && (
                      <div className={styles.projectRowTags}>
                        {p.types.map(type => (
                          <span className={styles.projectTypeTag} key={type}>
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className={styles.projectRowTitle}>{p.title}</h2>
                    <p className={styles.projectRowDesc}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── LOAD MORE ─────────────────────────── */}
      {hasMore && (
        <section className={styles.loadMoreSec}>
          <div className={styles.container}>
            <button
              className={styles.loadMoreBtn}
              onClick={() => setDisplayCount(c => c + 9)}
            >
              Load more
            </button>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ───────────────────────── */}
      <section
        aria-label="Start a project with Quartic Lab"
        className={styles.ctaSec}
      >
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div className={`${styles.ctaText} ${styles.reveal}`} ref={addRef}>
            <h2 className={styles.ctaH2}>
              See something like what you&apos;re building?
            </h2>
            <p className={styles.ctaSub}>
              Send us a brief. We&apos;ll send back a scope, timeline, and cost
              within 12 hours — pointing to the relevant case study from our
              portfolio.
            </p>
          </div>
          <div className={`${styles.ctaBtns} ${styles.reveal}`} ref={addRef}>
            <Link className={styles.ctaBtnPrimary} href="/contact">
              Send your brief
            </Link>
            <a
              className={styles.ctaBtnSecondary}
              href="https://calendly.com/quarticlab/meeting"
              rel="noopener noreferrer"
              target="_blank"
            >
              Or book a 30-min call
            </a>
          </div>
        </div>
      </section>
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
