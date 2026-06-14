import Link from "next/link";
import { useEffect, useRef } from "react";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { SITE_URL } from "@component/utils/siteUrl";

import { getAllServices } from "../../firebase/firebaseRequests";
import styles from "./servicesIndex.module.css";

/* ── reveal hook ────────────────────────────── */
function useReveal() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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

/* ── constants ──────────────────────────────── */
const SERVICES_KICKER =
  "OUR EXPERTISE · FIXED PRICE / T&M / DEDICATED TEAM · ESTIMATES IN 12H";

const ENGAGEMENT = [
  {
    cta: "Start a project",
    desc: "Ideal for well-defined projects. We scope every deliverable upfront, agree on a price, and deliver on schedule.",
    ix: "MODEL / A",
    terms: ["From $5,000", "Scoped deliverable", "4–12 weeks typical"],
    title: "Fixed Price",
  },
  {
    cta: "Start a project",
    desc: "Best for evolving products. Sprint weekly, prioritise as you learn, and pay only for hours delivered.",
    ix: "MODEL / B",
    terms: ["From $30/hr", "Weekly billing", "Minimum 4 weeks"],
    title: "Time & Material",
  },
  {
    cta: "Build a team",
    desc: "For long-term builds. A full embedded team — engineers, a PM, and process — on monthly retainer.",
    ix: "MODEL / C",
    terms: [
      "From $30/hr per engineer",
      "Monthly retainer",
      "3+ month commitment",
    ],
    title: "Dedicated Team",
  },
];

const NOT_A_FIT = [
  {
    desc: "We don’t take on sub-$5K projects. If you need a single-page brochure site, we’ll happily refer you to a freelancer who specialises in them.",
    title: "Budget under $5K",
  },
  {
    desc: "If “ship by Friday no matter what” is the brief, we’re not your team. Our sprints are 2 weeks, our estimates are honest, and we push back on scope that breaks on Monday.",
    title: "Shortest-path MVPs",
  },
  {
    desc: "We don’t do pure body-shop staff-aug. Our dedicated team model comes with a PM, process, and accountability — not standalone contractors.",
    title: "Staff augmentation only",
  },
];

/* ═══════════════════════════════════════════
  PAGE COMPONENT
  ═══════════════════════════════════════════ */
export default function ServicesNew({ services = [] }) {
  const addRef = useReveal();
  const kickerRef = useRef(null);

  /* scramble the hero kicker on mount */
  useEffect(() => {
    const el = kickerRef.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = SERVICES_KICKER;
      return;
    }
    const glyphs = "◆#/\\+×—·01";
    const total = 46;
    let frame = 0;
    let tid = null;
    const tick = () => {
      let out = "";
      for (let i = 0; i < SERVICES_KICKER.length; i++) {
        const threshold = (i / SERVICES_KICKER.length) * total * 0.8;
        out +=
          frame > threshold
            ? SERVICES_KICKER[i]
            : SERVICES_KICKER[i] === " "
              ? " "
              : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
      if (frame++ < total) {
        tid = setTimeout(tick, 34);
      } else {
        el.textContent = SERVICES_KICKER;
      }
    };
    tick();
    return () => clearTimeout(tid);
  }, []);

  return (
    <div className={styles.page}>
      <Seo
        canonical={`${SITE_URL}/services`}
        description="Web, mobile, AI/ML, GenAI, blockchain, IoT, UI/UX, and DevOps services from Quartic Lab. One senior team, 12-hour estimates on every brief."
        ogDescription="Web, mobile, AI/ML, GenAI, blockchain, IoT, UI/UX, and DevOps services from Quartic Lab. One senior team, 12-hour estimates on every brief."
        ogTitle="Services — Quartic Lab"
        title="Services | Quartic Lab"
        twitterDescription="Web, mobile, AI/ML, GenAI, blockchain, IoT, UI/UX, and DevOps services from Quartic Lab."
        twitterTitle="Services — Quartic Lab"
      />

      {/* ── HERO ───────────────────────────────── */}
      <header className={styles.shero}>
        <div className={styles.container}>
          <span className={styles.kick} ref={kickerRef}>
            &nbsp;
          </span>
          <h1 className={styles.h1}>
            <span className={styles.ln}>
              <span>Eight disciplines.</span>
            </span>
            <span className={styles.ln}>
              <span>One senior team.</span>
            </span>
            <span className={styles.ln}>
              <span>
                <em>Every project.</em>
              </span>
            </span>
          </h1>
          <p className={styles.heroLead}>
            Web, mobile, AI, blockchain, IoT, DevOps, design &mdash; delivered
            by the same senior team with zero outsourcing. Choose fixed-price,
            time-and-material, or dedicated team engagement. Project estimates
            in 12 hours.
          </p>
          <div className={styles.sheroCtas}>
            <a
              className={styles.btnPrimary}
              href="https://calendly.com/quarticlab/30min"
              rel="noopener noreferrer"
              target="_blank"
            >
              Schedule a call <span className={styles.arr}>→</span>
            </a>
            <Link className={styles.btnOutline} href="#services">
              Explore services ↓
            </Link>
          </div>
        </div>
      </header>

      {/* ── SERVICES GRID ──────────────────────── */}
      <section className={styles.servicesSec} id="services">
        <div className={styles.container}>
          <div className={styles.secHead}>
            <div className={styles.reveal} ref={addRef}>
              <span className={styles.eb}>
                <i />
                Services
              </span>
              <h2 className={styles.h2}>
                Everything needed to ship.
                <br />
                <em>Nothing that isn&apos;t.</em>
              </h2>
            </div>
            <p className={`${styles.headLead} ${styles.reveal}`} ref={addRef}>
              Pick one discipline or the whole stack &mdash; we staff the
              project with senior engineers who&apos;ve shipped it before.
            </p>
          </div>

          <div className={styles.sgrid}>
            {services.map((svc, i) => (
              <Link
                className={styles.scard}
                href={svc.slug ? `/services/${svc.slug}` : "/services"}
                key={svc.title}
              >
                <span className={styles.scGo}>OPEN →</span>
                <span className={styles.scIx}>
                  QL/{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.scardTitle}>{svc.title}</h3>
                <p className={styles.scardDesc}>{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS (dark) ───────────── */}
      <section
        className={`${styles.engageSec} ${styles.dark}`}
        id="engagement-models"
      >
        <div className={styles.container}>
          <div className={styles.secHead}>
            <div className={styles.reveal} ref={addRef}>
              <span className={styles.eb}>
                <i />
                Engagement models
              </span>
              <h2 className={styles.h2}>
                Three ways to <em>work with us</em>
              </h2>
            </div>
            <p className={`${styles.headLead} ${styles.reveal}`} ref={addRef}>
              Fixed price for scoped work, time &amp; material for evolving
              products, dedicated teams for long-term builds. Every engagement
              comes with a senior PM and weekly demos.
            </p>
          </div>

          <div className={styles.engageGrid}>
            {ENGAGEMENT.map((m, i) => (
              <div
                className={`${styles.ecard} ${styles.reveal}`}
                key={m.title}
                ref={addRef}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className={styles.eIx}>{m.ix}</span>
                <h3 className={styles.ecardTitle}>{m.title}</h3>
                <p className={styles.ecardDesc}>{m.desc}</p>
                <div className={styles.eTerms}>
                  {m.terms.map((t, j) => (
                    <span key={t}>
                      {j === 0 ? <b>{t}</b> : t}
                      <br />
                    </span>
                  ))}
                </div>
                <Link className={styles.btnDark} href="/contact">
                  {m.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className={`${styles.disc} ${styles.reveal}`} ref={addRef}>
            <div>
              <span className={styles.eIx}>Recommended starting point</span>
              <h3 className={styles.discTitle}>Paid Discovery Sprint</h3>
              <p className={styles.discDesc}>
                Best for complex or unclear scope. 1&ndash;2 weeks of product
                and engineering discovery, ending with a signed scope,
                architecture doc, and fixed estimate. Credited toward the build
                if you proceed.
              </p>
              <div className={styles.discTerms}>
                <b>From $2,500</b> &middot; 1&ndash;2 weeks &middot; Concrete
                deliverable
              </div>
            </div>
            <Link className={styles.btnPrimary} href="/contact">
              Start a discovery sprint <span className={styles.arr}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NOT A FIT ──────────────────────────── */}
      <section className={styles.notAFitSec}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <div className={styles.reveal} ref={addRef}>
              <span className={styles.eb}>
                <i />
                Not a fit if&hellip;
              </span>
              <h2 className={styles.h2}>
                Who we&apos;re <em>not</em> the right team for
              </h2>
            </div>
            <p className={`${styles.headLead} ${styles.reveal}`} ref={addRef}>
              Honest scoping starts with honest fit. Three things we&apos;ll
              tell you upfront, before you spend a call finding out.
            </p>
          </div>
          <div className={styles.notAFitGrid}>
            {NOT_A_FIT.map((item, i) => (
              <div
                className={`${styles.nf} ${styles.reveal}`}
                key={item.title}
                ref={addRef}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className={styles.nfX}>✕</span>
                <h3 className={styles.nfTitle}>{item.title}</h3>
                <p className={styles.nfDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND (dark) ────────────────────── */}
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
            Avg. response: 4 hours
          </span>
          <h2 className={`${styles.ctaTitle} ${styles.reveal}`} ref={addRef}>
            Get a full project estimate in <em>12 hours</em>
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
    </div>
  );
}

/* ── data fetching — SSR (always fresh from Firestore) ── */
export async function getServerSideProps() {
  try {
    const data = await getAllServices();
    const services = (data || [])
      .map(svc => {
        const title = svc.title || "";
        const desc = svc.desc || svc.description || "";
        const order = Number(svc.order_no ?? svc.order ?? 0);
        const slug = svc.slug || "";

        return { desc, order, slug, title };
      })
      .sort((a, b) => {
        if (a.order === b.order) {
          return a.title.localeCompare(b.title);
        }
        return a.order - b.order;
      });

    return { props: { services } };
  } catch (error) {
    return { props: { services: [] } };
  }
}
