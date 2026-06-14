import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { SITE_URL } from "../utils/siteUrl";
import styles from "../styles/aboutNew.module.css";

/* ── data ────────────────────────────────────────── */

// Aligned with the hero/mission prose (50+ products, 15-person team) and
// the homepage stats block — audit C5.
const stats = [
  { label: "Projects delivered", suffix: "+", target: 50 },
  { label: "Countries served", suffix: "+", target: 12 },
  { label: "Positive reviews", suffix: "+", target: 680 },
  { label: "Client satisfaction", suffix: "%", target: 99 },
];

const principles = [
  {
    desc: "From mobile to blockchain to AI — one team, zero outsourcing. Every discipline a product needs, staffed from the same senior bench.",
    title: "Full-stack expertise",
  },
  {
    desc: "Weekly demos, shared dashboards, and no surprises. Your Jira instance shows our burndown from day one.",
    title: "Radical transparency",
  },
  {
    desc: "Startup speed with enterprise-grade quality and security. Velocity that doesn’t come back as tech debt.",
    title: "Ship fast, ship right",
  },
  {
    desc: "Your idea gets a scope, timeline, and cost within 12 hours — written by a senior engineer, not a sales rep.",
    title: "12-hour estimates",
  },
];

const processSteps = [
  {
    day: "Day 0",
    desc: "NDA signed within 4 business hours of first contact. No discovery call starts without one.",
    label: "NDA signed",
  },
  {
    day: "Day 1",
    desc: "We learn your goals, constraints, budget, and timeline.",
    label: "Discovery call",
  },
  {
    day: "Day 3\u20135",
    desc: "Scope, timeline, team composition, and detailed cost breakdown.",
    label: "Proposal & SOW",
  },
  {
    day: "Week 1",
    desc: "Repo setup, sprint board, CI/CD, and full team introduction.",
    label: "Kickoff & sprint planning",
  },
  {
    day: "Week 2+",
    desc: "2-week sprints. Live demo every Friday at 4pm Pakistan / 9am New York. Burndown visible in your Jira instance from day one.",
    label: "Development sprints",
  },
  {
    day: "Final sprint",
    desc: "Full QA, staging environment, and dedicated client testing.",
    label: "QA & staging",
  },
  {
    day: "Final week",
    desc: "Deployment, documentation, and 30-day free support included.",
    label: "Launch & handoff",
  },
];

// Time-zone overlap bars \u2014 width (%) of the working day and left offset (%)
// across a 09:00 PKT \u2192 01:00 axis. "hot" marks live client overlap windows.
const timezones = [
  {
    hot: false,
    left: "3%",
    sub: "PKT \u00b7 HOME BASE",
    title: "LAHORE",
    width: "91%",
  },
  {
    hot: true,
    left: "25%",
    sub: "FULL EU OVERLAP",
    title: "LONDON",
    width: "50%",
  },
  {
    hot: true,
    left: "56%",
    sub: "4\u20135H DAILY OVERLAP",
    title: "NEW YORK",
    width: "44%",
  },
];

const weekDays = [
  {
    day: "MONDAY",
    desc: "Priorities confirmed against the sprint plan. Anything ambiguous gets a decision, not a deferral.",
    title: "Sprint sync",
  },
  {
    day: "TUE\u2013THU",
    desc: "Features land behind flags with code review and QA as they go. You can watch the board move \u2014 or not, your call.",
    title: "Heads-down build",
  },
  {
    day: "DAILY",
    desc: "A standing window in your timezone for questions, reviews, and unblocking \u2014 no \u201cwe\u2019ll get back to you tomorrow.\u201d",
    title: "Overlap window",
  },
  {
    day: "FRIDAY",
    desc: "Working software, clickable by you, every week. The sprint isn\u2019t done when the tickets close \u2014 it\u2019s done when you\u2019ve seen it run.",
    title: "The demo \u2014 4pm PKT / 9am NY",
  },
];

const faqs = [
  {
    a: "We typically start at $5,000. For smaller scopes, we offer fixed-price packages.",
    q: "What\u2019s your minimum project size?",
  },
  {
    a: "Yes, always \u2014 before any discovery or scoping call.",
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
  {
    a: "Our core team is in Lahore, Pakistan. We serve clients across North America, Europe, and the Middle East, and regularly overlap working hours with US East Coast, UK, and EU time zones.",
    q: "Where is your team based?",
  },
  {
    a: "You do. IP transfers to the client on final payment. This is standard in our contracts, and we\u2019re happy to sign custom IP assignment docs if your lawyer requires them.",
    q: "Who owns the IP of what you build?",
  },
  {
    a: "We absorb the first 10% of scope creep at no extra charge \u2014 it\u2019s in our standard contract. Beyond that, we pause, present the options (cut scope, extend timeline, or add budget), and only continue with written approval.",
    q: "What happens if the project goes over scope?",
  },
  {
    a: "Yes. Email contact@quarticlab.com and we\u2019ll send you our standard SOW template and MSA within the same business day.",
    q: "Can we see a sample contract before the discovery call?",
  },
  {
    a: "Every project has at least 3 hours of live overlap with the client\u2019s time zone. Our team regularly works US hours (EST\u00a0/\u00a0PST) for US clients, and EU hours for European clients. We never do 100% async handoffs.",
    q: "How do you handle time-zone differences?",
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

/* ── hero kicker ───────────────────────────────────── */
const ABOUT_KICKER =
  "ABOUT · EST. 2020 · 15+ SENIOR ENGINEERS · LAHORE → WORLDWIDE";

/* ── page ────────────────────────────────────────── */

export default function AboutPage() {
  const router = useRouter();
  useReveal(`.${styles.reveal}`);
  const [openFaq, setOpenFaq] = useState(null);
  const kickerRef = useRef(null);

  /* scramble the hero kicker on mount */
  useEffect(() => {
    const el = kickerRef.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = ABOUT_KICKER;
      return;
    }
    const glyphs = "◆#/\\+×—·01";
    const total = 46;
    let frame = 0;
    let tid = null;
    const tick = () => {
      let out = "";
      for (let i = 0; i < ABOUT_KICKER.length; i++) {
        const threshold = (i / ABOUT_KICKER.length) * total * 0.8;
        out +=
          frame > threshold
            ? ABOUT_KICKER[i]
            : ABOUT_KICKER[i] === " "
              ? " "
              : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
      if (frame++ < total) {
        tid = setTimeout(tick, 34);
      } else {
        el.textContent = ABOUT_KICKER;
      }
    };
    tick();
    return () => clearTimeout(tid);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/about#faq`,
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className={styles.page}>
      <Seo
        canonical={`${SITE_URL}/about`}
        description="Quartic Lab is a research-driven software studio from Lahore. Learn about our story, process, principles, and what it is like to work with us week to week."
        ogDescription="Quartic Lab is a research-driven software studio from Lahore. 15+ engineers serving clients across the US, Europe, and MENA since 2020."
        ogTitle="About Us — Quartic Lab"
        title="About Us — Quartic Lab"
        twitterDescription="Quartic Lab is a research-driven software studio from Lahore. 15+ engineers serving clients across the US, Europe, and MENA since 2020."
        twitterTitle="About Us — Quartic Lab"
      >
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          type="application/ld+json"
        />
      </Seo>

      {/* ─── HERO ─────────────────────────────── */}
      <header className={styles.aHero}>
        <div aria-hidden="true" className={styles.aHeroMark}>
          <svg viewBox="0 0 100 100">
            <g
              stroke="oklch(20% 0.05 255)"
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
            <g fill="none" stroke="oklch(48% 0.11 42)" strokeWidth="2">
              <circle cx="50" cy="18" r="6.5" />
              <circle cx="82" cy="50" r="6.5" />
              <circle cx="50" cy="82" r="6.5" />
              <circle cx="18" cy="50" r="6.5" />
            </g>
          </svg>
        </div>
        <div className={styles.container}>
          <span className={styles.aKick} ref={kickerRef}>
            &nbsp;
          </span>
          <h1 className={styles.aH1}>
            <span className={styles.aLn}>
              <span>We build software</span>
            </span>
            <span className={styles.aLn}>
              <span>
                that actually <em>ships.</em>
              </span>
            </span>
          </h1>
          <p className={styles.aLead}>
            Founded in 2020. A senior team of 15+ engineers, designers, and PMs
            in Lahore, Pakistan &mdash; serving clients across the US, Europe,
            and MENA. 50+ products shipped in web, mobile, AI, blockchain, and
            IoT.
          </p>
        </div>
      </header>

      {/* ─── STORY + IMPACT ───────────────────── */}
      <StorySection />

      {/* ─── PROCESS TIMELINE ─────────────────── */}
      <ProcessSection />

      {/* ─── PRINCIPLES ───────────────────────── */}
      <PrinciplesSection />

      {/* ─── TIME-ZONE OVERLAP ────────────────── */}
      <TimezoneSection />

      {/* ─── A WEEK IN THE POD ────────────────── */}
      <WeekSection />

      {/* ─── FAQ ──────────────────────────────── */}
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* ─── CTA ──────────────────────────────── */}
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
            className={`${styles.eyebrow} ${styles.eyebrowCenter} ${styles.reveal}`}
          >
            <i />
            Work with this team
          </span>
          <h2 className={`${styles.ctaTitle} ${styles.reveal}`}>
            Send us a brief. Get a scope back in <em>12 hours.</em>
          </h2>
          <p className={`${styles.ctaDesc} ${styles.reveal}`}>
            No sales call. No “let’s set up a discovery meeting.” Just a real
            estimate from a senior engineer.
          </p>
          <div className={`${styles.ctaBtns} ${styles.reveal}`}>
            <button
              className={styles.ctaBtnPrimary}
              onClick={() => router.push("/contact")}
            >
              Send your brief <span className={styles.ctaArr}>→</span>
            </button>
            <a
              className={styles.ctaBtnSecondary}
              href="https://calendly.com/quarticlab/30min"
              rel="noopener noreferrer"
              target="_blank"
            >
              Or book a 30-min call
            </a>
          </div>
          <p className={`${styles.ctaNote} ${styles.reveal}`}>
            FIXED-SCOPE SPRINTS · WEEKLY DEMOS · 30 DAYS FREE SUPPORT
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── section components ──────────────────────────── */

function StorySection() {
  return (
    <section className={styles.story}>
      <div className={styles.container}>
        {/* who we are — manifesto */}
        <div className={styles.maniIn}>
          <div className={`${styles.maniTxt} ${styles.reveal}`}>
            <p>
              &ldquo;Great developers are impossible to find &mdash; and the
              ones you find <em>disappear after launch.</em>&rdquo;
            </p>
            <p>
              We heard that complaint enough times to build the agency
              we&rsquo;d want to <em>hire.</em>
            </p>
          </div>
          <div className={`${styles.maniSide} ${styles.reveal}`}>
            <p>
              Quartic Lab started in 2020 as a partnership between two engineers
              who kept getting the same complaint from clients. So we built our
              answer to it &mdash; senior engineers who take ownership, push
              back on weak scope, and stick around long enough to see what we
              built actually work in production.
            </p>
            <p>
              Five years in, we&rsquo;re a 15-person team working in 2-week
              sprints with weekly demos. We&rsquo;ve shipped 50+ products across
              five continents &mdash; and we&rsquo;ve never lost a client
              mid-project.
            </p>
          </div>
        </div>

        {/* impact — stats ledger */}
        <div className={styles.sledger}>
          {stats.map((s, i) => (
            <LedgerStat delay={`${i * 90}ms`} key={s.label} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className={`${styles.principlesSec} ${styles.dark}`}>
      <div className={styles.container}>
        <div className={styles.secHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              Why Quartic Lab
            </span>
            <h2 className={styles.h2}>
              What sets us <em>apart</em>
            </h2>
          </div>
          <p className={`${styles.headLead} ${styles.reveal}`}>
            Four principles that define every project we take on.
          </p>
        </div>
        <div className={styles.prinList}>
          {principles.map((p, i) => (
            <div
              className={`${styles.prin} ${styles.reveal}`}
              key={p.title}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={styles.prinIx}>
                PR/{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.prinTitle}>{p.title}</h3>
              <p className={styles.prinDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LedgerStat({ delay, s }) {
  // Initialise with the final target so SSR and no-JS users
  // see the real number, not "0+". The count-up is progressive enhancement.
  const [count, setCount] = useState(s.target);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const target = s.target;
            const startTime = performance.now();
            const tick = now => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(eased * target));
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles.sl} ${styles.reveal}`}
      ref={ref}
      style={{ transitionDelay: delay }}
    >
      <b>
        {count}
        <sup>{s.suffix}</sup>
      </b>
      <span>{s.label}</span>
    </div>
  );
}

function ProcessSection() {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.secHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              Our process
            </span>
            <h2 className={styles.h2}>
              How a typical project <em>works</em>
            </h2>
          </div>
          <p className={`${styles.headLead} ${styles.reveal}`}>
            Transparent milestones from first call to launch day.
          </p>
        </div>
        <div className={styles.timeline}>
          {processSteps.map((step, i) => (
            <div
              className={`${styles.tlRow} ${styles.reveal}`}
              key={step.label}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={styles.tlYr}>{step.day}</span>
              <div>
                <h3 className={styles.tlTitle}>{step.label}</h3>
                <p className={styles.tlDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.supportCallout} ${styles.reveal}`}>
          <b className={styles.supportTag}>30 DAYS FREE</b>
          <span className={styles.supportText}>
            Every launch includes 30 days of free support &mdash; bug fixes,
            deploy issues, and minor changes, handled by the same team that
            built it, at no charge.
          </span>
        </div>
      </div>
    </section>
  );
}

function TimezoneSection() {
  return (
    <section className={styles.tzSection}>
      <div className={`${styles.container} ${styles.aboutSplit}`}>
        <div className={styles.reveal}>
          <span className={styles.eyebrow}>
            <i />
            Working across time zones
          </span>
          <h2 className={styles.h2}>
            Lahore builds while <em>you sleep</em>
          </h2>
          <p className={`${styles.headLead} ${styles.tzLead}`}>
            Our core team is in Lahore. We regularly work US hours (EST/PST) for
            US clients and EU hours for European clients — every project gets at
            least 3 hours of live overlap with your time zone, and we never do
            100% async handoffs.
          </p>
        </div>
        <div className={`${styles.tzCard} ${styles.reveal}`}>
          <span className={styles.eyebrow}>
            <i />A working day, three clocks
          </span>
          <div className={styles.tzRows}>
            {timezones.map(tz => (
              <div className={styles.tzr} key={tz.title}>
                <span className={styles.tzL}>
                  {tz.title}
                  <span>{tz.sub}</span>
                </span>
                <div className={styles.tzBar}>
                  <div
                    className={`${styles.tzFill} ${tz.hot ? styles.tzHot : ""}`}
                    style={{ "--w": tz.width, left: tz.left }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.tzScale}>
            <span>09:00 PKT</span>
            <span>15:00</span>
            <span>21:00</span>
            <span>01:00</span>
          </div>
          <p className={styles.tzNote}>
            EVERY PROJECT: 3+ HOURS LIVE OVERLAP · NEVER 100% ASYNC
          </p>
        </div>
      </div>
    </section>
  );
}

function WeekSection() {
  return (
    <section className={styles.weekSection}>
      <div className={styles.container}>
        <div className={styles.secHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              What working with us looks like
            </span>
            <h2 className={styles.h2}>
              A week in the <em>pod</em>
            </h2>
          </div>
        </div>
        <div className={styles.wkRows}>
          {weekDays.map((w, i) => (
            <div
              className={`${styles.wk} ${styles.reveal}`}
              key={w.day}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={styles.wkD}>{w.day}</span>
              <h3 className={styles.wkTitle}>{w.title}</h3>
              <p className={styles.wkDesc}>{w.desc}</p>
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
        <div className={styles.faqHead}>
          <span
            className={`${styles.eyebrow} ${styles.eyebrowCenter} ${styles.reveal}`}
          >
            <i />
            FAQ
          </span>
          <h2 className={`${styles.faqTitle} ${styles.reveal}`}>
            Common <em>questions</em>
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
                aria-controls={`faq-answer-${i}`}
                aria-expanded={openFaq === i}
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenFaq(openFaq === i ? null : i);
                  }
                }}
              >
                {faq.q}
                <span aria-hidden="true" className={styles.faqIc}>
                  +
                </span>
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openFaq === i ? styles.faqAnswerOpen : ""
                }`}
                id={`faq-answer-${i}`}
                role="region"
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
