import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/projectsNew.module.css";

import { getAllProjects } from "../firebase/firebaseRequests";

/* ── MUI ─────────────────────────────────────────── */
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SITE_URL = "https://www.quarticlab.com";

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

/* ── page ────────────────────────────────────────── */

export default function ProjectsNewPage({ projects = [] }) {
  const addRef = useReveal();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(
      projects.flatMap(p => (p.types.length ? p.types : [p.category || "Web"])),
    ),
  ];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter(
          p =>
            p.types.includes(activeCategory) || p.category === activeCategory,
        );

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
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
        <link href={`${SITE_URL}/projects`} rel="canonical" />
        <meta content="website" property="og:type" />
        <meta content={`${SITE_URL}/projects`} property="og:url" />
        <meta
          content="Portfolio | Quartic Lab — Web, Mobile & AI Projects"
          property="og:title"
        />
        <meta
          content={
            "Explore Quartic Lab's portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms."
          }
          property="og:description"
        />
        <meta
          content={`${SITE_URL}/assets/og-projects.jpg`}
          property="og:image"
        />
        <meta content="Quartic Lab" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          content="Portfolio | Quartic Lab — Web, Mobile & AI Projects"
          name="twitter:title"
        />
        <meta
          content={
            "Explore Quartic Lab's portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms."
          }
          name="twitter:description"
        />
        <meta
          content={`${SITE_URL}/assets/og-projects.jpg`}
          name="twitter:image"
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
          <span className={styles.heroBadge}>💼 Portfolio</span>
          <h1 className={styles.heroH1}>
            Everything Your Business Needs{" "}
            <span className={styles.heroAccent}>Under One Roof</span>
          </h1>
          <p className={styles.heroSub}>
            We&apos;ve worked across multiple verticals and a range of services
            to create engaging and innovative digital experiences.
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
          <Box display="flex" justifyContent="center">
            <ToggleButtonGroup
              aria-label="Project category filter"
              exclusive
              onChange={(_, val) => {
                if (val !== null) {
                  setActiveCategory(val);
                }
              }}
              sx={{
                flexWrap: "wrap",
                gap: 1,
                "& .MuiToggleButton-root": {
                  border: "1px solid #e0e0e0",
                  borderRadius: "24px !important",
                  color: "#596380",
                  fontSize: "13px",
                  fontWeight: 500,
                  px: 2.5,
                  py: 0.75,
                  textTransform: "none",
                  "&.Mui-selected": {
                    bgcolor: "#FF9700",
                    borderColor: "#FF9700",
                    color: "#fff",
                    "&:hover": { bgcolor: "#e08600" },
                  },
                },
              }}
              value={activeCategory}
            >
              {categories.map(cat => (
                <ToggleButton key={cat} value={cat}>
                  {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </div>
      </section>

      {/* ─── PROJECT LIST ─────────────────────── */}
      <section aria-label="Projects portfolio" className={styles.listSec}>
        <div className={styles.container}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>
              No projects in this category yet. Check back soon!
            </p>
          ) : (
            <div className={styles.projectsList}>
              {filtered.map((p, i) => (
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
                        alt={p.title}
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

      {/* ─── CTA BANNER ───────────────────────── */}
      <section
        aria-label="Start a project with Quartic Lab"
        className={styles.ctaSec}
      >
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div className={`${styles.ctaText} ${styles.reveal}`} ref={addRef}>
            <h2 className={styles.ctaH2}>Have a Project in Mind?</h2>
            <p className={styles.ctaSub}>
              Let&apos;s discuss how we can bring your vision to life with our
              expert team.
            </p>
          </div>
          <button
            aria-label="Book a meeting with Quartic Lab"
            className={`${styles.btnPrimary} ${styles.reveal}`}
            onClick={requestDemo}
            ref={addRef}
          >
            Book a Meeting →
          </button>
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
