import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/aboutNew.module.css";

/* ── data ────────────────────────────────────────── */

const stats = [
  { label: "projects delivered", suffix: "+", target: 150 },
  { label: "countries served", suffix: "+", target: 12 },
  { label: "positive reviews", suffix: "+", target: 680 },
  { label: "client satisfaction", suffix: "%", target: 99 },
];

const values = [
  {
    desc: "from mobile to blockchain to ai — one team, zero outsourcing.",
    title: "full-stack expertise",
  },
  {
    desc: "weekly demos, shared dashboards, and no surprises.",
    title: "radical transparency",
  },
  {
    desc: "startup speed with enterprise-grade quality and security.",
    title: "ship fast, ship right",
  },
  {
    desc: "your idea gets a scope, timeline, and cost within 12 hours.",
    title: "12-hour estimates",
  },
];

const processSteps = [
  {
    day: "day 1",
    desc: "we learn your goals, constraints, budget, and timeline.",
    label: "discovery call",
  },
  {
    day: "day 3\u20135",
    desc: "scope, timeline, team composition, and detailed cost breakdown.",
    label: "proposal & sow",
  },
  {
    day: "week 1",
    desc: "repo setup, sprint board, ci/cd, and full team introduction.",
    label: "kickoff & sprint planning",
  },
  {
    day: "week 2+",
    desc: "2-week sprints with a live demo every friday.",
    label: "development sprints",
  },
  {
    day: "final sprint",
    desc: "full qa, staging environment, and dedicated client testing.",
    label: "qa & staging",
  },
  {
    day: "final week",
    desc: "deployment, documentation, and 30-day free support included.",
    label: "launch & handoff",
  },
];

const engagementModels = [
  {
    ctaLabel: "start with fixed price",
    includes: [
      "scoped requirements document",
      "fixed timeline & budget",
      "2 rounds of revisions included",
      "no hidden costs",
    ],
    timeline: "typical: 4\u201312 weeks",
    title: "fixed price",
    when: "best for well-defined projects with clear scope.",
  },
  {
    ctaLabel: "start with t&m",
    includes: [
      "weekly billing",
      "flexible scope",
      "direct developer access",
      "monthly reporting",
    ],
    timeline: "typical: ongoing",
    title: "time & material",
    when: "best when requirements evolve as you build.",
  },
  {
    ctaLabel: "start with dedicated team",
    includes: [
      "senior devs + pm",
      "daily standups",
      "shared slack & jira",
      "30-day scale notice",
    ],
    timeline: "typical: 3+ months",
    title: "dedicated team",
    when: "best for long-term product work needing reliability.",
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

/* ── svg helpers ─────────────────────────────────── */

function StatIcon({ index }) {
  const icons = [
    <svg
      fill="none"
      key="layers"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>,
    <svg
      fill="none"
      key="globe"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>,
    <svg
      fill="none"
      key="chat"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="m9 10 2 2 4-4" />
    </svg>,
    <svg
      fill="none"
      key="target"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

function ValueIcon({ index }) {
  const icons = [
    <svg
      fill="none"
      key="crosshair"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" x2="18" y1="12" y2="12" />
      <line x1="6" x2="2" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
    </svg>,
    <svg
      fill="none"
      key="eye"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    <svg
      fill="none"
      key="zap"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>,
    <svg
      fill="none"
      key="clock"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

function MissionDoodle() {
  return (
    <svg
      className={styles.missionDoodle}
      fill="none"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="200"
        cy="200"
        r="160"
        stroke="oklch(20% 0.05 255 / 0.08)"
        strokeDasharray="6 8"
        strokeWidth="1"
      />
      <circle
        cx="200"
        cy="200"
        r="110"
        stroke="oklch(58% 0.12 45 / 0.15)"
        strokeWidth="1"
      />
      <circle
        cx="200"
        cy="200"
        r="60"
        stroke="oklch(58% 0.12 45 / 0.25)"
        strokeWidth="1.5"
      />
      <rect
        fill="oklch(20% 0.05 255)"
        height="48"
        rx="2"
        width="80"
        x="160"
        y="176"
      />
      <text
        dominantBaseline="central"
        fill="oklch(58% 0.12 45)"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fontWeight="600"
        letterSpacing="2"
        textAnchor="middle"
        x="200"
        y="200"
      >
        QUARTIC
      </text>
      {[
        { angle: 0, label: "DATA" },
        { angle: 90, label: "MODEL" },
        { angle: 180, label: "DEPLOY" },
        { angle: 270, label: "MEASURE" },
      ].map(node => {
        const rad = (node.angle * Math.PI) / 180;
        const cx = 200 + 110 * Math.cos(rad);
        const cy = 200 + 110 * Math.sin(rad);
        return (
          <g key={node.label}>
            <rect
              fill="oklch(58% 0.12 45 / 0.12)"
              height="28"
              rx="2"
              stroke="oklch(58% 0.12 45 / 0.3)"
              strokeWidth="1"
              width="56"
              x={cx - 28}
              y={cy - 14}
            />
            <text
              dominantBaseline="central"
              fill="oklch(58% 0.12 45)"
              fontFamily="var(--font-mono)"
              fontSize="8"
              fontWeight="500"
              letterSpacing="1.5"
              textAnchor="middle"
              x={cx}
              y={cy}
            >
              {node.label}
            </text>
            <line
              stroke="oklch(58% 0.12 45 / 0.15)"
              strokeDasharray="3 4"
              strokeWidth="1"
              x1={200 + 60 * Math.cos(rad)}
              x2={cx - 28 * Math.cos(rad)}
              y1={200 + 60 * Math.sin(rad)}
              y2={cy - 14 * Math.sin(rad)}
            />
          </g>
        );
      })}
      {[45, 135, 225, 315].map(deg => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            cx={200 + 160 * Math.cos(rad)}
            cy={200 + 160 * Math.sin(rad)}
            fill="oklch(58% 0.12 45 / 0.25)"
            key={deg}
            r="3"
          />
        );
      })}
    </svg>
  );
}

/* ── hooks ───────────────────────────────────────── */

function useCountUp(target, duration = 1600) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const start = useCallback(() => {
    if (started.current) {
      return;
    }
    started.current = true;
    const t0 = performance.now();
    const step = now => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return [count, start];
}

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
        <title>about us &mdash; quartic lab</title>
        <meta
          content="Quartic Lab is a research-driven software studio from Lahore. Learn about our values, process, engagement models, and what it is like to work with us."
          name="description"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>about quartic lab</span>
          <h1 className={styles.heroH1}>
            we build software that{" "}
            <span className={styles.heroAccent}>actually ships</span>
          </h1>
          <p className={styles.heroSub}>
            founded in 2020, quartic lab is a research-driven studio helping
            startups and enterprises bring ideas to market. ai, blockchain, iot,
            and full-stack development across 3 continents.
          </p>
          <div className={styles.heroCtas}>
            <button
              className={styles.btnPrimary}
              onClick={() => router.push("/contactUs")}
            >
              start a project
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
              get estimate in 12 hrs
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
            <h2 className={styles.ctaTitle}>ready to build something great?</h2>
            <p className={styles.ctaDesc}>
              get your project estimate in 12 hours. no commitment, no pressure
              &mdash; just clarity.
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
              get free estimate
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
        <div className={`${styles.missionVisual} ${styles.reveal}`}>
          <MissionDoodle />
        </div>
        <div className={`${styles.missionText} ${styles.reveal}`}>
          <span className={styles.sectionTag}>who we are</span>
          <h2 className={styles.sectionTitle}>
            your engineering partner, not just a vendor
          </h2>
          <p className={styles.missionDesc}>
            we&apos;re a tight-knit team of engineers, designers, and product
            thinkers who embed into your workflow. we don&apos;t just write code
            &mdash; we challenge assumptions, propose better architectures, and
            own outcomes.
          </p>
          <p className={styles.missionDesc}>
            from early-stage mvps to scaling enterprise platforms, we bring the
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
          <span className={styles.sectionTag}>why quartic lab</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            what sets us apart
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            four principles that define every project we take on.
          </p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div
              className={`${styles.valueCard} ${styles.reveal}`}
              key={v.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={styles.valueIcon}>
                <ValueIcon index={i} />
              </span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ delay, index, s }) {
  const [count, startCount] = useCountUp(s.target);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.statVisible);
            startCount();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startCount]);

  return (
    <div
      className={styles.statCard}
      ref={ref}
      style={{ transitionDelay: delay }}
    >
      <span className={styles.statIcon}>
        <StatIcon index={index} />
      </span>
      <div className={styles.statNum}>
        {count}
        {s.suffix}
      </div>
      <span className={styles.statLabel}>{s.label}</span>
    </div>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSec}>
      <div className={styles.statsBgDots} />
      <div className={styles.container}>
        <div className={styles.statsHeader}>
          <span className={styles.sectionTag}>impact &amp; scale</span>
          <h2 className={`${styles.sectionTitle} ${styles.statsTitleReveal}`}>
            numbers that speak
            <br />
            <span className={styles.statsAccentText}>for themselves</span>
          </h2>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <StatCard delay={`${i * 110}ms`} index={i} key={s.label} s={s} />
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
          <span className={styles.sectionTag}>our process</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            how a typical project works
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            transparent milestones from first call to launch day.
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
          <span className={styles.sectionTag}>engagement models</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            choose how we work together
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            flexible models designed to fit your stage, budget, and timeline.
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
          <span className={styles.sectionTag}>faq</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            common questions
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
