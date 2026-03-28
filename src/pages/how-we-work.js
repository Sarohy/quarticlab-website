import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/howWeWork.module.css";

/* ── data ─────────────────────────────────── */

const engagementModels = [
  {
    ctaLabel: "Start with Fixed Price",
    includes: [
      "Scoped requirements document",
      "Fixed timeline & budget",
      "2 rounds of revisions included",
      "No hidden costs",
    ],
    timeline: "Typical: 4\u201312 weeks",
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

const processSteps = [
  {
    day: "Day 1",
    desc: "We learn your goals, constraints, budget, and timeline.",
    label: "Discovery Call",
  },
  {
    day: "Day 3\u20135",
    desc: "Scope, timeline, team composition, and detailed cost breakdown.",
    label: "Proposal & SOW",
  },
  {
    day: "Week 1",
    desc: "Repo setup, sprint board, and full team introduction.",
    label: "Kickoff & Sprint Planning",
  },
  {
    day: "Week 2+",
    desc: "2-week sprints with a live demo every Friday.",
    label: "Development Sprints",
  },
  {
    day: "Final Sprint",
    desc: "Full QA, staging environment, and dedicated client testing period.",
    label: "QA & Staging",
  },
  {
    day: "Final Week",
    desc: "Deployment, full documentation, and 30-day free support included.",
    label: "Launch & Handoff",
  },
];

const faqs = [
  {
    a: "We typically work on projects starting at $5,000. For smaller scopes, we offer fixed-price packages.",
    q: "What\u2019s your minimum project size?",
  },
  {
    a: "Yes, always \u2014 before any discovery or scoping call.",
    q: "Do you sign NDAs?",
  },
  {
    a: "Yes. Every project has a PM and a dedicated Slack channel.",
    q: "Will we have a dedicated project manager?",
  },
  {
    a: "Yes. Our dedicated team model starts at $30/hr for a senior developer.",
    q: "Can we hire a dedicated developer?",
  },
  {
    a: "30 days of free support is included. After that, we offer monthly retainer plans.",
    q: "What happens after launch?",
  },
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

export default function HowWeWork() {
  const router = useRouter();
  useReveal(`.${styles.reveal}`);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className={styles.page}>
      <Head>
        <title>How We Work | Zweidevs</title>
        <meta
          content={
            "Transparency, speed, and zero surprises. " +
            "Learn about Zweidevs\u2019 engagement models, " +
            "project process, and what it\u2019s really " +
            "like to work with us."
          }
          name="description"
        />
      </Head>

      {/* ── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>⚙️ How We Work</span>
          <h1 className={styles.heroH1}>
            Our Process Is as Important{" "}
            <span className={styles.heroAccent}>as Our Product</span>
          </h1>
          <p className={styles.heroSub}>
            Transparency, speed, and zero surprises &mdash; that&apos;s how we
            operate.
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
              Book a Free Call
            </button>
          </div>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ── ENGAGEMENT MODELS ─────────────── */}
      <section className={styles.modelsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Engagement Models</span>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              How We Engage
            </h2>
          </div>
          <div className={styles.modelsGrid}>
            {engagementModels.map((m, i) => (
              <div
                className={`${styles.modelCard} ${styles.reveal}`}
                key={m.title}
                style={{
                  transitionDelay: `${i * 100}ms`,
                }}
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

      {/* ── PROCESS TIMELINE ──────────────── */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Process</span>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              A Typical Project at Zweidevs
            </h2>
          </div>
          <div className={styles.timeline}>
            {processSteps.map((step, i) => (
              <div
                className={`${styles.timelineItem} ${styles.reveal}`}
                key={step.label}
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
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

      {/* ── FAQ ───────────────────────────── */}
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

      {/* ── CTA ───────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaTitle}>Ready to Start Your Project?</h2>
            <p className={styles.ctaDesc}>
              Book a free discovery call. No commitment, no pressure.
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
              Book Free Discovery Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
