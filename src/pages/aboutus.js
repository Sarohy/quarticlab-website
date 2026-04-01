import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AboutImg from "../../public/assets/AboutUs/AboutUsMainImg.png";
import styles from "../styles/aboutNew.module.css";

/* ── data ────────────────────────────────────────── */

const stats = [
  { label: "Projects Delivered", value: "150+" },
  { label: "Positive Reviews", value: "680+" },
  { label: "Countries Served", value: "12+" },
  { label: "Customer Satisfaction", value: "99%" },
];

const values = [
  {
    desc: "From mobile to blockchain to AI — one team, zero outsourcing.",
    icon: "🎯",
    title: "Full-Stack Expertise",
  },
  {
    desc: "Weekly demos, shared dashboards, and no surprises — ever.",
    icon: "💬",
    title: "Radical Transparency",
  },
  {
    desc: "Startup speed with enterprise-grade quality and security.",
    icon: "🚀",
    title: "Ship Fast, Ship Right",
  },
  {
    desc: "Your idea gets a scope, timeline, and cost in 12 hours.",
    icon: "⚡",
    title: "12-Hour Estimates",
  },
];

const processSteps = [
  {
    day: "Day 1",
    desc: "We learn your goals, constraints, budget, and timeline.",
    label: "Discovery Call",
  },
  {
    day: "Day 3–5",
    desc: "Scope, timeline, team composition, and detailed cost breakdown.",
    label: "Proposal & SOW",
  },
  {
    day: "Week 1",
    desc: "Repo setup, sprint board, CI/CD, and full team introduction.",
    label: "Kickoff & Sprint Planning",
  },
  {
    day: "Week 2+",
    desc: "2-week sprints with a live demo every Friday.",
    label: "Development Sprints",
  },
  {
    day: "Final Sprint",
    desc: "Full QA, staging environment, and dedicated client testing.",
    label: "QA & Staging",
  },
  {
    day: "Final Week",
    desc: "Deployment, documentation, and 30-day free support included.",
    label: "Launch & Handoff",
  },
];

const engagementModels = [
  {
    ctaLabel: "Start with Fixed Price",
    includes: [
      "Scoped requirements document",
      "Fixed timeline & budget",
      "2 rounds of revisions included",
      "No hidden costs",
    ],
    timeline: "Typical: 4–12 weeks",
    title: "Fixed Price",
    when: "Best for well-defined projects with clear scope.",
  },
  {
    ctaLabel: "Start with T&M",
    includes: [
      "Weekly billing",
      "Flexible scope",
      "Direct developer access",
      "Monthly reporting",
    ],
    timeline: "Typical: Ongoing",
    title: "Time & Material",
    when: "Best when requirements evolve as you build.",
  },
  {
    ctaLabel: "Start with Dedicated Team",
    includes: [
      "Senior devs + PM",
      "Daily standups",
      "Shared Slack & Jira",
      "30-day scale notice",
    ],
    timeline: "Typical: 3+ months",
    title: "Dedicated Team",
    when: "Best for long-term product work needing reliability.",
  },
];

const faqs = [
  {
    a: "We typically start at $5,000. For smaller scopes, we offer fixed-price packages.",
    q: "What\u2019s your minimum project size?",
  },
  {
    a: "Yes, always — before any discovery or scoping call.",
    q: "Do you sign NDAs?",
  },
  {
    a: "Yes. Every project has a dedicated PM and a shared Slack channel.",
    q: "Will we have a dedicated project manager?",
  },
  {
    a: "Yes. Our dedicated team model starts at $30/hr for senior developers.",
    q: "Can we hire a dedicated developer?",
  },
  {
    a: "30 days of free support is included. After that, we offer monthly retainer plans.",
    q: "What happens after launch?",
  },
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
      { threshold: 0.1 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── page ────────────────────────────────────────── */

export default function AboutPage() {
  const router = useRouter();
  useReveal(`.${styles.reveal}`);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className={styles.page}>
      <Head>
        <title>About Us | Zweidevs</title>
        <meta
          content="Zweidevs is a product-first software studio from Lahore. Learn about our values, process, engagement models, and what it's like to work with us."
          name="description"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>🏢 About Zweidevs</span>
          <h1 className={styles.heroH1}>
            We Build Software That{" "}
            <span className={styles.heroAccent}>Actually Ships</span>
          </h1>
          <p className={styles.heroSub}>
            Founded in 2020, Zweidevs is a product-first studio helping startups
            and enterprises bring ideas to market — fast. AI, Blockchain, IoT,
            and full-stack development across 3 continents.
          </p>
          <div className={styles.heroCtas}>
            <button
              className={styles.btnPrimary}
              onClick={() => router.push("/contactUs")}
            >
              Start a Project
            </button>
            <button
              className={styles.btnOutline}
              onClick={() =>
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                )
              }
            >
              ⚡ Get Estimate in 12 Hrs
            </button>
          </div>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── MISSION ──────────────────────────── */}
      <MissionSection />

      {/* ─── VALUES ───────────────────────────── */}
      <ValuesSection />

      {/* ─── STATS ────────────────────────────── */}
      <StatsSection />

      {/* ─── PROCESS TIMELINE ─────────────────── */}
      <ProcessSection />

      {/* ─── ENGAGEMENT MODELS ────────────────── */}
      <ModelsSection router={router} />

      {/* ─── FAQ ──────────────────────────────── */}
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* ─── CTA ──────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={`${styles.ctaBanner} ${styles.reveal}`}>
            <h2 className={styles.ctaTitle}>Ready to Build Something Great?</h2>
            <p className={styles.ctaDesc}>
              Get your project estimate in 12 hours. No commitment, no pressure
              — just clarity.
            </p>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                )
              }
            >
              ⚡ Get Free Estimate →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── section components ──────────────────────────── */

function MissionSection() {
  return (
    <section className={styles.missionSec}>
      <div className={`${styles.container} ${styles.missionInner}`}>
        <div className={`${styles.missionImg} ${styles.reveal}`}>
          <Image
            alt="About Zweidevs team"
            className={styles.missionImage}
            quality={100}
            src={AboutImg}
          />
        </div>
        <div className={`${styles.missionText} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Who We Are</span>
          <h2 className={styles.sectionTitle}>
            Your Engineering Partner, Not Just a Vendor
          </h2>
          <p className={styles.missionDesc}>
            We&apos;re a tight-knit team of engineers, designers, and product
            thinkers who embed into your workflow. We don&apos;t just write code
            — we challenge assumptions, propose better architectures, and own
            outcomes.
          </p>
          <p className={styles.missionDesc}>
            From early-stage MVPs to scaling enterprise platforms, we bring the
            same intensity: transparent communication, 2-week sprint cycles, and
            a relentless focus on shipping software that users actually love.
          </p>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className={styles.valuesSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Why Zweidevs</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            What Sets Us Apart
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Four principles that define every project we take on.
          </p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div
              className={`${styles.valueCard} ${styles.reveal}`}
              key={v.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    refs.current.forEach(r => {
      if (r) {
        obs.observe(r);
      }
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.statsSec}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div
              className={`${styles.statCard} ${styles.statReveal}`}
              key={s.label}
              ref={el => {
                refs.current[i] = el;
              }}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our Process</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            How a Typical Project Works
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Transparent milestones from first call to launch day.
          </p>
        </div>
        <div className={styles.timeline}>
          {processSteps.map((step, i) => (
            <div
              className={`${styles.timelineItem} ${styles.reveal}`}
              key={step.label}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.timelineDot}>{i + 1}</div>
              <div className={styles.timelineContent}>
                <span className={styles.timelineBadge}>{step.day}</span>
                <h3 className={styles.timelineLabel}>{step.label}</h3>
                <p className={styles.timelineDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelsSection({ router }) {
  return (
    <section className={styles.modelsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Engagement Models</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Choose How We Work Together
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Flexible models designed to fit your stage, budget, and timeline.
          </p>
        </div>
        <div className={styles.modelsGrid}>
          {engagementModels.map((m, i) => (
            <div
              className={`${styles.modelCard} ${styles.reveal}`}
              key={m.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={styles.modelTimeline}>{m.timeline}</span>
              <h3 className={styles.modelTitle}>{m.title}</h3>
              <p className={styles.modelWhen}>{m.when}</p>
              <ul className={styles.modelList}>
                {m.includes.map(item => (
                  <li className={styles.modelListItem} key={item}>
                    <span className={styles.modelCheck}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className={styles.modelCardBtn}
                onClick={() => router.push("/contactUs")}
              >
                {m.ctaLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ openFaq, setOpenFaq }) {
  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>FAQ</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Common Questions
          </h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div
              className={`${styles.faqItem} ${
                openFaq === i ? styles.faqItemOpen : ""
              }`}
              key={faq.q}
            >
              <button
                aria-expanded={openFaq === i}
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <span
                  className={`${styles.faqChevron} ${
                    openFaq === i ? styles.faqChevronOpen : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openFaq === i ? styles.faqAnswerOpen : ""
                }`}
              >
                <p className={styles.faqAnswerText}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
