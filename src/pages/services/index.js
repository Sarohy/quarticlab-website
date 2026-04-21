import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { getAllServices } from "../../firebase/firebaseRequests";
import {
  SERVICE_ICON_BY_SLUG,
  SERVICE_ICON_MAP,
  WebDevIcon,
} from "@component/Components/CommonComponents/ServiceIcons";

/* ── tech icons ─────────────────────────────── */
import NodeIcon from "../../../public/assets/serviceIcons/node.svg";
import PythonIcon from "../../../public/assets/serviceIcons/py.svg";
import ReactIcon from "../../../public/assets/serviceIcons/react.svg";
import JSIcon from "../../../public/assets/serviceIcons/JS.svg";
import SolanaIcon from "../../../public/assets/serviceIcons/solanaIcon.svg";
import EthIcon from "../../../public/assets/serviceIcons/ethIcon.svg";
import AndroidIcon from "../../../public/assets/serviceIcons/androidIcon.svg";
import IOSIcon from "../../../public/assets/serviceIcons/iOSIcon.svg";
import FigmaIcon from "../../../public/assets/serviceIcons/figmaIcon.svg";
import SketchIcon from "../../../public/assets/serviceIcons/sketch.svg";
import UnityIcon from "../../../public/assets/serviceIcons/unityIcon.svg";
import BelenderIcon from "../../../public/assets/serviceIcons/blender.svg";
import RaspbarryPiIcon from "../../../public/assets/serviceIcons/raspbarryPiIcon.svg";
import ArduinoIcon from "../../../public/assets/serviceIcons/arduinoIcon.svg";
import PyTorch from "../../../public/assets/serviceIcons/pyTorch.svg";
import OpenAIIcon from "../../../public/assets/serviceIcons/openAIIcon.svg";
import AWSIcon from "../../../public/assets/serviceIcons/AWS.svg";
import AzureIcon from "../../../public/assets/serviceIcons/AzureIcon.svg";
import GoogleCloudIcon from "../../../public/assets/serviceIcons/googlecloudIcon.svg";
import Flutter from "../../../public/assets/serviceIcons/Flutter.svg";
import AngularIcon from "../../../public/assets/serviceIcons/angular.svg";
import NextIcon from "../../../public/assets/serviceIcons/next.svg";

import styles from "./servicesNew.module.css";

/* ── MUI ────────────────────────────────────── */
import Grid from "@mui/material/Grid";

/* ── icon maps for dynamic Firestore data ──── */
const serviceIconMap = SERVICE_ICON_MAP;

const techIconMap = {
  Android: AndroidIcon,
  Angular: AngularIcon,
  Arduino: ArduinoIcon,
  AWS: AWSIcon,
  Azure: AzureIcon,
  Blender: BelenderIcon,
  Ethereum: EthIcon,
  Figma: FigmaIcon,
  Flutter,
  GCP: GoogleCloudIcon,
  iOS: IOSIcon,
  JS: JSIcon,
  Next: NextIcon,
  Node: NodeIcon,
  OpenAI: OpenAIIcon,
  PyTorch,
  Python: PythonIcon,
  "React Native": ReactIcon,
  React: ReactIcon,
  RPi: RaspbarryPiIcon,
  Sketch: SketchIcon,
  Solana: SolanaIcon,
  Unity: UnityIcon,
};

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

/* ── helper components ──────────────────────── */

function ServiceIconRender({ size, slug, title }) {
  const Icon =
    SERVICE_ICON_BY_SLUG[slug] || serviceIconMap[title] || WebDevIcon;
  return (
    <div className={styles.serviceIconWrap}>
      <Icon size={size} />
    </div>
  );
}

function TechBubbles({ names = [] }) {
  if (!names.length) {
    return null;
  }
  return (
    <div className={styles.serviceCardFooter}>
      {names
        .filter(name => techIconMap[name])
        .map(name => (
          <div className={styles.techBubble} key={name} title={name}>
            <Image alt={name} height={16} src={techIconMap[name]} width={16} />
          </div>
        ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
  PAGE COMPONENT
  ═══════════════════════════════════════════ */
export default function ServicesNew({ services = [] }) {
  const addRef = useReveal();

  return (
    <div className={styles.page}>
      <Head>
        <title>Services | Quartic Lab</title>
        <meta
          content="Comprehensive IT Services — web and mobile app development, blockchain, AI, IoT, UI/UX, game development, DevOps and more. Elevate your digital presence with Quartic Lab."
          name="description"
        />
      </Head>

      {/* ── HERO ───────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>Our Expertise</span>
          <h1 className={styles.heroH1}>
            Eight disciplines. One senior team.{" "}
            <span className={styles.heroAccent}>Every project.</span>
          </h1>
          <p className={styles.heroSub}>
            Web, mobile, AI, blockchain, IoT, DevOps, design &mdash; delivered
            by the same senior team with zero outsourcing. Choose fixed-price,
            time-and-material, or dedicated team engagement. Project estimates
            in 12 hours.
          </p>
          <div className={styles.heroCtas}>
            <a
              className={styles.btnHeroPrimary}
              href="https://calendly.com/quarticlab/meeting"
              rel="noopener noreferrer"
              target="_blank"
            >
              Schedule a Call
            </a>
            <Link className={styles.btnOutline} href="#services">
              Explore Services ↓
            </Link>
          </div>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ── SERVICES GRID ──────────────────────── */}
      <section className={styles.servicesSec} id="services">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Services</span>
            <h2 className={styles.sectionTitle}>
              Everything needed to ship a product. Nothing that isn&apos;t.
            </h2>
            <p className={styles.sectionDesc}>
              Pick one discipline or the whole stack &mdash; we staff the
              project with senior engineers who&apos;ve shipped it before.
            </p>
          </div>

          <Grid container spacing={3}>
            {services.map((svc, i) => (
              <Grid item key={svc.title} xs={12}>
                <Link
                  className={`${styles.serviceCard} ${styles.reveal}`}
                  href={svc.slug ? `/services/${svc.slug}` : "/services"}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <ServiceIconRender
                    size={32}
                    slug={svc.slug}
                    title={svc.title}
                  />
                  <h3 className={styles.serviceCardTitle}>{svc.title}</h3>
                  <p className={styles.serviceCardDesc}>{svc.desc}</p>
                  <TechBubbles names={svc.techNames} />
                  <span className={styles.serviceLink}>
                    Learn More <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>

      {/* ── HOW WE ENGAGE ──────────────────────── */}
      <section className={styles.engageSec} id="engagement-models">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Engagement Models</span>
            <h2 className={styles.sectionTitle}>Three ways to work with us</h2>
            <p className={styles.sectionDesc}>
              Fixed price for scoped work, time &amp; material for evolving
              products, dedicated teams for long-term builds. Every engagement
              comes with a senior PM and weekly demos.
            </p>
          </div>
          <div className={styles.engageGrid}>
            {[
              {
                badge: null,
                cta: "Start a project",
                desc: "Ideal for well-defined projects. We scope every deliverable upfront, agree on a price, and deliver on schedule.",
                highlight: false,
                pricing:
                  "From $5,000 \u00b7 Scoped deliverable \u00b7 4\u201312 weeks typical",
                title: "Fixed Price",
              },
              {
                badge: null,
                cta: "Start a project",
                desc: "Best for evolving products. Sprint weekly, prioritise as you learn, and pay only for hours delivered.",
                highlight: false,
                pricing:
                  "From $30/hr \u00b7 Weekly billing \u00b7 Minimum 4 weeks",
                title: "Time & Material",
              },
              {
                badge: null,
                cta: "Build a team",
                desc: "For long-term builds. A full embedded team \u2014 engineers, a PM, and process \u2014 on monthly retainer.",
                highlight: false,
                pricing:
                  "From $30/hr per engineer \u00b7 Monthly retainer \u00b7 3+ month commitment",
                title: "Dedicated Team",
              },
              {
                badge: "Recommended starting point",
                cta: "Start a discovery sprint",
                desc: "Best for complex or unclear scope. 1\u20132 weeks of product and engineering discovery, ending with a signed scope, architecture doc, and fixed estimate. Credited toward the build if you proceed.",
                highlight: true,
                pricing:
                  "From $2,500 \u00b7 1\u20132 weeks \u00b7 Concrete deliverable",
                title: "Paid Discovery Sprint",
              },
            ].map(({ badge, cta, desc, highlight, pricing, title }) => (
              <div
                className={`${styles.engageCard} ${
                  highlight ? styles.engageCardHighlight : ""
                } ${styles.reveal}`}
                key={title}
                ref={addRef}
              >
                {badge && (
                  <span className={styles.engageCardBadge}>{badge}</span>
                )}
                <h3 className={styles.engageCardTitle}>{title}</h3>
                <p className={styles.engageCardDesc}>{desc}</p>
                <p className={styles.engagePricing}>{pricing}</p>
                <Link
                  className={
                    highlight ? styles.btnPrimary : styles.btnEngageOutline
                  }
                  href="/contact"
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOT A FIT ──────────────────────────── */}
      <section className={styles.notAFitSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Not a fit if&hellip;</span>
            <h2 className={styles.sectionTitle}>
              Who we&apos;re not the right team for
            </h2>
          </div>
          <div className={styles.notAFitGrid}>
            {[
              {
                desc: "We don\u2019t take on sub-$5K projects. If you need a single-page brochure site, we\u2019ll happily refer you to a freelancer who specialises in them.",
                title: "Budget under $5K",
              },
              {
                desc: "If \u201cship by Friday no matter what\u201d is the brief, we\u2019re not your team. Our sprints are 2 weeks, our estimates are honest, and we push back on scope that breaks on Monday.",
                title: "Shortest-path MVPs",
              },
              {
                desc: "We don\u2019t do pure body-shop staff-aug. Our dedicated team model comes with a PM, process, and accountability \u2014 not standalone contractors.",
                title: "Staff augmentation only",
              },
            ].map(({ desc, title }) => (
              <div
                className={`${styles.notAFitCard} ${styles.reveal}`}
                key={title}
                ref={addRef}
              >
                <h3 className={styles.notAFitCardTitle}>{title}</h3>
                <p className={styles.notAFitCardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className={styles.ctaSec}>
        <div className={styles.container}>
          <div className={`${styles.ctaCard} ${styles.reveal}`} ref={addRef}>
            <h2 className={styles.ctaTitle}>
              Get a scoped estimate in 12 hours
            </h2>
            <p className={styles.ctaDesc}>
              Tell us what you&apos;re building. We&apos;ll send back a scope,
              timeline, team composition, and cost &mdash; without a sales call.
            </p>
            <div className={styles.ctaBtns}>
              <Link className={styles.ctaBtnPrimary} href="/contact">
                Get your estimate
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
        const techNames = Array.isArray(svc.techs) ? svc.techs : [];
        const order = Number(svc.order_no ?? svc.order ?? 0);
        const slug = svc.slug || "";

        return { title, desc, techNames, order, slug };
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
