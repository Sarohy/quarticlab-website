import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import AIDevIcon from "../../public/assets/serviceIcons/AIDevIcon.svg";
import Ai1Icon from "../../public/assets/serviceIcons/aiIcons/ai1.svg";
import OpenAIIcon from "../../public/assets/serviceIcons/openAIIcon.svg";
import PythonIcon from "../../public/assets/serviceIcons/py.svg";
import styles from "../styles/aiServices.module.css";

/* ── data ─────────────────────────────────── */

const serviceTiles = [
  {
    desc: "LLM-powered chatbots, content tools, and intelligent search.",
    emoji: null,
    icon: OpenAIIcon,
    title: "Generative AI Applications",
  },
  {
    desc: "Autonomous agents that plan, reason, and self-correct at scale.",
    emoji: null,
    icon: AIDevIcon,
    title: "Multi-Agent AI Systems",
  },
  {
    desc: "We map your workflows and identify where AI creates real ROI.",
    emoji: "\uD83D\uDD0D",
    icon: null,
    title: "AI Audit & Transformation",
  },
  {
    desc: "From notebook to production \u2014 with monitoring and versioning.",
    emoji: null,
    icon: PythonIcon,
    title: "MLOps & Model Deployment",
  },
  {
    desc: "Train models on your own data for domain-specific accuracy.",
    emoji: null,
    icon: Ai1Icon,
    title: "LLM Fine-tuning",
  },
  {
    desc: "Replace manual workflows with intelligent automation.",
    emoji: "\u26A1",
    icon: null,
    title: "Process Automation (RPA)",
  },
];

const industries = [
  "FinTech",
  "HealthTech",
  "E-commerce",
  "Legal",
  "Real Estate",
  "Logistics",
  "Education",
  "SaaS",
];

/* ── hooks ────────────────────────────────── */

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
      { threshold: 0.12 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── page ─────────────────────────────────── */

export default function AIServicesPage() {
  const router = useRouter();
  useReveal(`.${styles.reveal}`);

  return (
    <div className={styles.page}>
      <Head>
        <title>GenAI &amp; AI Automation | Quartic Lab</title>
        <meta
          content={
            "Production-grade Generative AI, autonomous agents, and " +
            "automation pipelines built by Quartic Lab for startups and " +
            "enterprises. Book a free AI scoping call."
          }
          name="description"
        />
      </Head>

      {/* ── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>🤖 AI Services</span>
          <h1 className={styles.heroH1}>
            AI That Works.{" "}
            <span className={styles.heroAccent}>Not AI That Hypes.</span>
          </h1>
          <p className={styles.heroSub}>
            Production-grade Generative AI, autonomous agents, and automation
            pipelines.
          </p>
          <div className={styles.heroCtas}>
            <button
              className={styles.btnPrimary}
              onClick={() => router.push("/contact")}
            >
              Talk to an AI Expert
            </button>
            <button
              className={styles.btnOutline}
              onClick={() => router.push("/projects")}
            >
              View AI Projects →
            </button>
          </div>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ── SERVICE TILES ─────────────────── */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>What We Build</span>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              Our AI Capabilities
            </h2>
            <p className={styles.sectionSubtitle}>
              End-to-end AI solutions &mdash; from strategy to production
              deployment.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {serviceTiles.map((tile, i) => (
              <div
                className={`${styles.serviceCard} ${styles.reveal}`}
                key={tile.title}
                style={{
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                <div className={styles.serviceIconWrap}>
                  {tile.icon ? (
                    <Image
                      alt={tile.title}
                      className={styles.serviceIcon}
                      height={28}
                      src={tile.icon}
                      width={28}
                    />
                  ) : (
                    <span className={styles.serviceEmoji}>{tile.emoji}</span>
                  )}
                </div>
                <h3 className={styles.serviceCardTitle}>{tile.title}</h3>
                <p className={styles.serviceCardDesc}>{tile.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────── */}
      <section className={styles.industries}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Industries</span>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              Industries We&apos;ve Automated
            </h2>
            <p className={styles.sectionSubtitle}>
              Our AI solutions have shipped across verticals.
            </p>
          </div>
          <div className={styles.chipGrid}>
            {industries.map(industry => (
              <span
                className={`${styles.chip} ${styles.reveal}`}
                key={industry}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaTitle}>
              Not sure if AI is right for your business?
            </h2>
            <p className={styles.ctaDesc}>
              Book a free 30-minute AI readiness call. We&apos;ll be honest.
            </p>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                window.open("https://calendly.com/quarticlab/meeting", "_blank")
              }
            >
              Book Free AI Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
