import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/projectsNew.module.css";

import { getAllProjects } from "../firebase/firebaseRequests";

import AwsIcon from "../../public/assets/projectIcon/awsIcon.svg";
import NodeIcon from "../../public/assets/projectIcon/nodejsIcon.svg";
import ReactIcon from "../../public/assets/projectIcon/reactIcon.svg";
import RubyIcon from "../../public/assets/projectIcon/rorIcon.svg";

const SITE_URL = "https://www.zweidevs.com";

/* ── data ────────────────────────────────────────── */

const categories = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Apps" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "ai", label: "AI & ML" },
];

const techIcons = [
  { src: ReactIcon, alt: "React.js", w: 36 },
  { src: NodeIcon, alt: "Node.js", w: 36 },
  { src: RubyIcon, alt: "Ruby on Rails", w: 36 },
  { src: AwsIcon, alt: "AWS", w: 26 },
];

/* ── hooks ───────────────────────────────────────── */

function useReveal(selector) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) {
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── page ────────────────────────────────────────── */

export default function ProjectsNewPage({ projects = [] }) {
  const [active, setActive] = useState("all");
  const [filtered, setFiltered] = useState(projects);
  const [animKey, setAnimKey] = useState(0);

  useReveal(`.${styles.reveal}`);

  const handleFilter = key => {
    setActive(key);
    setAnimKey(prev => prev + 1);
    if (key === "all") {
      setFiltered(projects);
    } else {
      setFiltered(projects.filter(p => p.types?.includes(key)));
    }
  };

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
  };

  /* ── JSON-LD structured data for AI & search crawlers ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Zweidevs Portfolio — Software Development Projects",
    description:
      "A curated list of custom software projects built by Zweidevs, covering web apps, mobile apps, AI & ML solutions, and blockchain platforms.",
    url: `${SITE_URL}/projects`,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        description: p.desc,
        applicationCategory: getCategoryLabel(p.types?.[0]),
        operatingSystem: getOS(p.types?.[0]),
        ...(p.image ? { image: p.image } : {}),
        author: {
          "@type": "Organization",
          name: "Zweidevs",
          url: SITE_URL,
        },
      },
    })),
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Portfolio | Zweidevs — Web, Mobile &amp; AI Projects</title>
        <meta
          content="Explore Zweidevs' portfolio of software projects spanning web apps, mobile applications, AI & ML solutions, and blockchain platforms. Trusted by global clients."
          name="description"
        />
        <meta
          content="software development portfolio, web app development, mobile app development, AI ML projects, blockchain development, React projects, Node.js projects, custom software"
          name="keywords"
        />
        <link href={`${SITE_URL}/projects`} rel="canonical" />
        {/* Open Graph */}
        <meta content="website" property="og:type" />
        <meta content={`${SITE_URL}/projects`} property="og:url" />
        <meta
          content="Portfolio | Zweidevs — Web, Mobile & AI Projects"
          property="og:title"
        />
        <meta
          content="Explore Zweidevs' portfolio of software projects spanning web apps, mobile applications, AI & ML solutions, and blockchain platforms."
          property="og:description"
        />
        <meta
          content={`${SITE_URL}/assets/og-projects.jpg`}
          property="og:image"
        />
        <meta content="Zweidevs" property="og:site_name" />
        {/* Twitter Card */}
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          content="Portfolio | Zweidevs — Web, Mobile & AI Projects"
          name="twitter:title"
        />
        <meta
          content="Explore Zweidevs' portfolio of software projects spanning web apps, mobile applications, AI & ML solutions, and blockchain platforms."
          name="twitter:description"
        />
        <meta
          content={`${SITE_URL}/assets/og-projects.jpg`}
          name="twitter:image"
        />
        {/* JSON-LD */}
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

      {/* ─── FILTER BAR ───────────────────────── */}
      <section
        aria-label="Filter projects by category"
        className={styles.filterSec}
      >
        <div className={styles.container}>
          <div
            aria-label="Project category filters"
            className={styles.filterBar}
            role="group"
          >
            {categories.map(c => (
              <button
                aria-label={`Show ${c.label}`}
                aria-pressed={active === c.key}
                className={`${styles.filterBtn} ${
                  active === c.key ? styles.filterActive : ""
                }`}
                key={c.key}
                onClick={() => handleFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECT GRID ─────────────────────── */}
      <section aria-label="Projects portfolio grid" className={styles.gridSec}>
        <div className={styles.container}>
          <div className={styles.grid} key={animKey}>
            {filtered.map((p, i) => (
              <article
                aria-label={`${p.title} project`}
                className={`${styles.card} ${styles.reveal}`}
                key={p.title}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={styles.cardImgWrap}>
                  {p.image ? (
                    <Image
                      alt={`${p.title} — ${p.desc?.slice(0, 60)}`}
                      className={styles.cardImg}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={p.image}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className={styles.cardImgPlaceholder}
                    />
                  )}
                  <div className={styles.cardOverlay}>
                    <div className={styles.cardTechs}>
                      {techIcons.map(t => (
                        <Image
                          alt={t.alt}
                          className={styles.techIcon}
                          height={t.w}
                          key={t.alt}
                          src={t.src}
                          width={t.w}
                        />
                      ))}
                    </div>
                    <button
                      aria-label="Book a demo meeting with Zweidevs"
                      className={styles.demoBtn}
                      onClick={requestDemo}
                    >
                      Request Demo
                      <svg
                        aria-hidden="true"
                        className={styles.demoBtnIcon}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>
                    {p.types?.[0] === "ai"
                      ? "AI & ML"
                      : p.types?.[0] === "mobile"
                        ? "Mobile"
                        : "Web"}
                  </span>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* ─── EMPTY STATE ──────────────────── */}
          {filtered.length === 0 && (
            <p className={styles.empty}>No projects found for this category.</p>
          )}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────── */}
      <section
        aria-label="Start a project with Zweidevs"
        className={styles.ctaSec}
      >
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div className={`${styles.ctaText} ${styles.reveal}`}>
            <h2 className={styles.ctaH2}>Have a Project in Mind?</h2>
            <p className={styles.ctaSub}>
              Let&apos;s discuss how we can bring your vision to life with our
              expert team.
            </p>
          </div>
          <button
            aria-label="Book a meeting with Zweidevs"
            className={`${styles.btnPrimary} ${styles.reveal}`}
            onClick={requestDemo}
          >
            Book a Meeting →
          </button>
        </div>
      </section>
    </div>
  );
}

/* ── helpers ─────────────────────────────────────── */

function getCategoryLabel(type) {
  const map = {
    ai: "ArtificialIntelligence",
    web: "WebApplication",
    mobile: "MobileApplication",
  };
  return map[type] || "WebApplication";
}

function getOS(type) {
  if (type === "mobile") {
    return "Android, iOS";
  }
  return "Web browser";
}

/* ── data fetching — SSR (always fresh from Firestore) ── */

export async function getServerSideProps() {
  try {
    const data = await getAllProjects();
    const projects = (data || []).map(p => ({
      title: p.title || "",
      desc: p.desc || p.description || "",
      types: Array.isArray(p.types) ? p.types : p.type ? [p.type] : ["web"],
      image: p.image || p.imageUrl || null,
    }));
    return { props: { projects } };
  } catch (err) {
    return { props: { projects: [] } };
  }
}
