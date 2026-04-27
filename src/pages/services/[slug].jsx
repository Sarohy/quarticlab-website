import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { SITE_URL } from "@component/utils/siteUrl";

/* ── offering icons — web ───────────────────── */
import designIcon from "../../../public/assets/serviceIcons/webServicesIcons/design.svg";
import backendIcon from "../../../public/assets/serviceIcons/webServicesIcons/backend.svg";
import ecommerceIcon from "../../../public/assets/serviceIcons/webServicesIcons/ecommerce.svg";
import frontendIcon from "../../../public/assets/serviceIcons/webServicesIcons/frontend.svg";
import fullstackIcon from "../../../public/assets/serviceIcons/webServicesIcons/fullstack.svg";

/* ── offering icons — mobile ────────────────── */
import hybirdMoboIcon from "../../../public/assets/serviceIcons/moboIcons/hybirdMobileIcon.svg";
import mobo2Icon from "../../../public/assets/serviceIcons/moboIcons/mobo2.svg";
import mobo3Icon from "../../../public/assets/serviceIcons/moboIcons/mobo3.svg";

/* ── offering icons — uiux ──────────────────── */
import uiux1Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux1.svg";
import uiux2Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux2.svg";
import uiux3Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux3.svg";
import uiux4Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux4.svg";
import uiux5Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux5.svg";

/* ── offering icons — iot ───────────────────── */
import iot1Icon from "../../../public/assets/serviceIcons/iotIcons/iot1.svg";
import iot2Icon from "../../../public/assets/serviceIcons/iotIcons/iot2.svg";
import iot3Icon from "../../../public/assets/serviceIcons/iotIcons/iot3.svg";
import iot4Icon from "../../../public/assets/serviceIcons/iotIcons/iot4.svg";
import iot5Icon from "../../../public/assets/serviceIcons/iotIcons/iot5.svg";
import iot6Icon from "../../../public/assets/serviceIcons/iotIcons/iot6.svg";
import iot7Icon from "../../../public/assets/serviceIcons/iotIcons/iot7.svg";
import iot8Icon from "../../../public/assets/serviceIcons/iotIcons/iot8.svg";

/* ── offering icons — ai ────────────────────── */
import ai1Icon from "../../../public/assets/serviceIcons/aiIcons/ai1.svg";
import ai2Icon from "../../../public/assets/serviceIcons/aiIcons/ai2.svg";
import ai3Icon from "../../../public/assets/serviceIcons/aiIcons/ai3.svg";
import ai4Icon from "../../../public/assets/serviceIcons/aiIcons/ai4.svg";
import ai5Icon from "../../../public/assets/serviceIcons/aiIcons/ai5.svg";
import ai6Icon from "../../../public/assets/serviceIcons/aiIcons/ai6.svg";

/* ── offering icons — devops ────────────────── */
import dev1Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev1.svg";
import dev2Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev2.svg";
import dev3Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev3.svg";
import dev4Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev4.svg";
import dev5Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev5.svg";
import dev6Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev6.svg";

/* ── offering icons — blockchain ────────────── */
import bc1Icon from "../../../public/assets/serviceIcons/BCIcons/bc1.svg";
import bc2Icon from "../../../public/assets/serviceIcons/BCIcons/bc2.svg";
import bc3Icon from "../../../public/assets/serviceIcons/BCIcons/bc3.svg";
import bc4Icon from "../../../public/assets/serviceIcons/BCIcons/bc4.svg";
import bc5Icon from "../../../public/assets/serviceIcons/BCIcons/bc5.svg";

/* ── project images ─────────────────────────── */
import Web1 from "../../../public/assets/HomeIcons/Project/Web1.png";
import Web2 from "../../../public/assets/HomeIcons/Project/Web2.png";
import Web3 from "../../../public/assets/HomeIcons/Project/Web3.png";
import Web4 from "../../../public/assets/HomeIcons/Project/Web4.png";
import Web5 from "../../../public/assets/HomeIcons/Project/Web5.png";
import Web6 from "../../../public/assets/HomeIcons/Project/Web6.png";
import Web7 from "../../../public/assets/HomeIcons/Project/Project4_image1.svg";
import Web8 from "../../../public/assets/HomeIcons/Project/Project6_image1.svg";
import Web9 from "../../../public/assets/HomeIcons/Project/Project5_image1.svg";
import Web10 from "../../../public/assets/HomeIcons/Project/Web10.png";
import Web11 from "../../../public/assets/HomeIcons/Project/Web11.png";
import Mobo1 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo1.png";
import Mobo2 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo2.png";
import Mobo3 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo3.png";
import Mobo4 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo4.png";
import GameDev1 from "../../../public/assets/serviceDetailsIcons/gdIcons/g1.png";
import GameDev2 from "../../../public/assets/serviceDetailsIcons/gdIcons/g2.png";
import iotP1 from "../../../public/assets/serviceDetailsIcons/iotIcons/iot1.png";
import iotP2 from "../../../public/assets/serviceDetailsIcons/iotIcons/iot2.png";
import iotP3 from "../../../public/assets/serviceDetailsIcons/iotIcons/iot3.png";
import ai1 from "../../../public/assets/serviceDetailsIcons/aiIcons/ai1.png";
import ai2 from "../../../public/assets/serviceDetailsIcons/aiIcons/ai2.png";
import ai3 from "../../../public/assets/serviceDetailsIcons/aiIcons/ai3.png";
import UiUX1 from "../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux1.png";
import UiUX2 from "../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux2.png";
import UiUX4 from "../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux4.png";
import DevOps1 from "../../../public/assets/serviceDetailsIcons/devOpsIcons/devOps1.png";
import bc1Proj from "../../../public/assets/serviceDetailsIcons/bcIcons/bc1.png";
import bc2Proj from "../../../public/assets/serviceDetailsIcons/bcIcons/bc2.png";

/* ── nav icons for "Other services" ─────────── */
import WebDevIcon from "../../../public/assets/serviceIcons/webdevIcon.svg";
import BlockchainIcon from "../../../public/assets/serviceIcons/blockchainIcon.svg";
import MobileDevIcon from "../../../public/assets/serviceIcons/MobDevIcon.svg";
import UIUXIcon from "../../../public/assets/serviceIcons/uiuxIcon.svg";
import IOTDevIcon from "../../../public/assets/serviceIcons/IOTIcon.svg";
import AIDevIcon from "../../../public/assets/serviceIcons/AIDevIcon.svg";
import DevopsIcon from "../../../public/assets/serviceIcons/devopsIcon.svg";

/* ── animated service illustrations ─────────── */
import ServiceDoodle from "@component/Components/CommonComponents/ServiceDoodles/ServiceDoodles";

/* ── firebase ───────────────────────────────── */
import {
  getAllServiceDetails,
  getProjectsByIds,
  getServiceBySlug,
} from "@component/firebase/firebaseRequests";

import styles from "./servicesNew.module.css";

/* ════════════════════════════════════════════
   CLIENT-SIDE ASSET LOOKUP MAPS
   Images and icons cannot live in Firestore,
   so we map string keys to static imports.
   ════════════════════════════════════════════ */

const iconMap = {
  /* web */
  designIcon,
  frontendIcon,
  backendIcon,
  fullstackIcon,
  ecommerceIcon,
  /* mobile */
  hybirdMoboIcon,
  mobo2Icon,
  mobo3Icon,
  /* uiux */
  uiux1Icon,
  uiux2Icon,
  uiux3Icon,
  uiux4Icon,
  uiux5Icon,
  /* iot */
  iot1Icon,
  iot2Icon,
  iot3Icon,
  iot4Icon,
  iot5Icon,
  iot6Icon,
  iot7Icon,
  iot8Icon,
  /* ai */
  ai1Icon,
  ai2Icon,
  ai3Icon,
  ai4Icon,
  ai5Icon,
  ai6Icon,
  /* devops */
  dev1Icon,
  dev2Icon,
  dev3Icon,
  dev4Icon,
  dev5Icon,
  dev6Icon,
  /* blockchain */
  bc1Icon,
  bc2Icon,
  bc3Icon,
  bc4Icon,
  bc5Icon,
};

const projectImageMap = {
  Web1,
  Web2,
  Web3,
  Web4,
  Web5,
  Web6,
  Web7,
  Web8,
  Web9,
  Web10,
  Web11,
  Mobo1,
  Mobo2,
  Mobo3,
  Mobo4,
  GameDev1,
  GameDev2,
  iotP1,
  iotP2,
  iotP3,
  ai1,
  ai2,
  ai3,
  UiUX1,
  UiUX2,
  UiUX4,
  DevOps1,
  bc1Proj,
  bc2Proj,
};

const navIconMap = {
  "web-development": WebDevIcon,
  "blockchain-development": BlockchainIcon,
  "mobile-development": MobileDevIcon,
  "ui-ux-design": UIUXIcon,
  "iot-development": IOTDevIcon,
  "ai-ml-development": AIDevIcon,
  devops: DevopsIcon,
  "genai-automation": AIDevIcon,
};

/* ════════════════════════════════════════════
   HELPERS — resolve Firestore keys to images
   ════════════════════════════════════════════ */

function resolveOfferings(offerings = []) {
  return offerings.map(o => ({
    ...o,
    icon: iconMap[o.iconKey] || ai1Icon,
  }));
}

function resolveProjects(projects = []) {
  return projects
    .map(p => ({
      ...p,
      image: projectImageMap[p.imageKey] || null,
    }))
    .filter(p => p.image);
}

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

/* ═══════════════════════════════════════════
   FAQ ITEM COMPONENT
   ═══════════════════════════════════════════ */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={styles.faqItem}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className={styles.faqQuestion}
        id={buttonId}
        onClick={() => setOpen(v => !v)}
        type="button"
      >
        <span>{item.q}</span>
        <span
          aria-hidden="true"
          className={`${styles.faqChevron} ${
            open ? styles.faqChevronOpen : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        aria-labelledby={buttonId}
        className={`${styles.faqAnswer} ${open ? styles.faqAnswerOpen : ""}`}
        id={panelId}
        role="region"
      >
        <p className={styles.faqAnswerText}>{item.a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INNER CONTENT — receives data from
   Firestore, resolves assets, renders page.
   Key={slug} ensures useReveal fires fresh.
   ═══════════════════════════════════════════ */
function ServiceDetailContent({ data, linkedProjects, otherServices, slug }) {
  const addRef = useReveal();
  const offerings = resolveOfferings(data.offerings);
  // Use Firestore-linked projects if available, else fall back to static imageKey projects
  const projects =
    linkedProjects && linkedProjects.length > 0
      ? linkedProjects
      : resolveProjects(data.projects);

  const serviceUrl = `${SITE_URL}/services/${slug}`;

  const faqSchema =
    Array.isArray(data.faq) && data.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${serviceUrl}#faq`,
          mainEntity: data.faq.map(item => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: data.category,
    description: data.heroSub || data.description,
    url: serviceUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Pakistan" },
    ],
  };

  return (
    <div className={styles.page}>
      <Seo
        canonical={serviceUrl}
        description={data.heroSub}
        ogDescription={data.heroSub}
        ogTitle={`${data.category} — Quartic Lab`}
        title={`${data.category} — Quartic Lab`}
        twitterDescription={data.heroSub}
        twitterTitle={`${data.category} — Quartic Lab`}
      >
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          type="application/ld+json"
        />
        {faqSchema && (
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            type="application/ld+json"
          />
        )}
      </Seo>

      {/* ── HERO ───────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>{data.category}</span>
          <h1 className={styles.heroH1}>
            {data.heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className={styles.heroAccent}>
              {data.heroTitle.split(" ").slice(-1)}
            </span>
          </h1>
          <p className={styles.heroSub}>{data.heroSub}</p>
          <div className={styles.heroCtas}>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                window.open("https://calendly.com/quarticlab/meeting", "_blank")
              }
            >
              Request a demo
            </button>
            <Link className={styles.btnOutline} href="/services">
              All services
            </Link>
          </div>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ── OVERVIEW ───────────────────────────── */}
      <section className={styles.overviewSec}>
        <div className={styles.container}>
          <div
            className={`${styles.overviewInner} ${styles.reveal}`}
            ref={addRef}
          >
            <div className={styles.overviewText}>
              <span className={styles.sectionTag}>{data.category}</span>
              <h2 className={styles.overviewHeading}>{data.heading}</h2>
              <p className={styles.overviewDesc}>{data.description}</p>
              <button
                className={styles.btnPrimary}
                onClick={() =>
                  window.open(
                    "https://calendly.com/quarticlab/meeting",
                    "_blank",
                  )
                }
              >
                Schedule a call
              </button>
            </div>
            <div className={styles.overviewVisual}>
              <ServiceDoodle slug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFERINGS ──────────────────────────── */}
      <section className={styles.offeringsSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>What we offer</span>
            <h2 className={styles.sectionTitle}>{data.category} Services</h2>
          </div>
          <div className={styles.offeringsGrid}>
            {offerings.map((o, i) => (
              <div
                className={`${styles.offeringCard} ${styles.reveal}`}
                key={o.title}
                ref={addRef}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className={styles.offeringIconWrap}>
                  <Image alt={o.title} height={28} src={o.icon} width={28} />
                </div>
                <h3 className={styles.offeringTitle}>{o.title}</h3>
                <p className={styles.offeringDesc}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────── */}
      {projects.length > 0 && (
        <section className={styles.projectsSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Portfolio</span>
              <h2 className={styles.sectionTitle}>{data.category} Projects</h2>
            </div>
            <div className={styles.projectsGrid}>
              {projects.map((p, i) => (
                <div
                  className={`${styles.projectCard} ${styles.reveal}`}
                  key={p.title}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className={styles.projectImgWrap}>
                    <span className={styles.projectIndex}>{i + 1}</span>
                    {(p.image || p.image_url) && (
                      <Image
                        alt={`${p.title} — ${data.category} project by Quartic Lab`}
                        className={styles.projectImg}
                        fill
                        sizes="(max-width: 590px) 100vw, 33vw"
                        src={p.image_url || p.image}
                      />
                    )}
                  </div>
                  <div className={styles.projectBody}>
                    <h3 className={styles.projectTitle}>{p.title}</h3>
                    <p className={styles.projectDesc}>
                      {p.desc || p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LET'S TALK 1 ──────────────────────── */}
      <section className={styles.letsTalkSec}>
        <div className={styles.container}>
          <div
            className={`${styles.letsTalkCard} ${styles.reveal}`}
            ref={addRef}
          >
            <div className={styles.letsTalkText}>
              <h3 className={styles.letsTalkTitle}>
                Do you have unique requirements?
              </h3>
              <p className={styles.letsTalkDesc}>
                We have the expertise to deliver you a custom solution no one
                else has.
              </p>
            </div>
            <button
              className={styles.letsTalkBtn}
              onClick={() =>
                window.open("https://calendly.com/quarticlab/meeting", "_blank")
              }
            >
              Schedule a call
            </button>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ───────────────────── */}
      {data.process && (
        <section className={styles.processSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Our process</span>
              <h2 className={styles.sectionTitle}>{data.process.title}</h2>
              {data.process.desc && (
                <p className={styles.sectionDesc}>{data.process.desc}</p>
              )}
            </div>
            <div className={styles.processTimeline}>
              {data.process.steps.map((step, i) => (
                <div
                  className={`${styles.processStep} ${styles.reveal}`}
                  key={step.title}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className={styles.processDot}>
                    <div className={styles.processDotInner} />
                  </div>
                  <span className={styles.processStepNum}>
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.processStepTitle}>{step.title}</h3>
                  <p className={styles.processStepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TARGET AUDIENCE ────────────────────── */}
      {data.audience && (
        <section className={styles.audienceSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Who we serve</span>
              <h2 className={styles.sectionTitle}>{data.audience.title}</h2>
              {data.audience.desc && (
                <p className={styles.sectionDesc}>{data.audience.desc}</p>
              )}
            </div>
            <div className={styles.audienceGrid}>
              {data.audience.cards.map((c, i) => (
                <div
                  className={`${styles.audienceCard} ${styles.reveal}`}
                  key={c.title}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <h3 className={styles.audienceCardTitle}>{c.title}</h3>
                  <p className={styles.audienceCardDesc}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK ─────────────────────────── */}
      {data.techStack && data.techStack.length > 0 && (
        <section className={styles.techStackSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Technology</span>
              <h2 className={styles.sectionTitle}>Tech stack</h2>
            </div>
            <div className={styles.techStackGrid}>
              {data.techStack.map(g => (
                <div className={styles.techStackGroup} key={g.group}>
                  <h3 className={styles.techStackGroupTitle}>{g.group}</h3>
                  <div className={styles.techChips}>
                    {g.chips.map(chip => (
                      <span className={styles.techChip} key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LET'S TALK 2 ──────────────────────── */}
      <section className={styles.letsTalkSec}>
        <div className={styles.container}>
          <div
            className={`${styles.letsTalkCard} ${styles.reveal}`}
            ref={addRef}
          >
            <div className={styles.letsTalkText}>
              <h3 className={styles.letsTalkTitle}>Ready to get started?</h3>
              <p className={styles.letsTalkDesc}>
                Let&apos;s talk about how we can help you build something great.
              </p>
            </div>
            <button
              className={styles.letsTalkBtn}
              onClick={() =>
                window.open("https://calendly.com/quarticlab/meeting", "_blank")
              }
            >
              Let&apos;s talk
            </button>
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES ─────────────────────── */}
      {otherServices.length > 0 && (
        <section className={styles.otherServicesSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Explore more</span>
              <h2 className={styles.sectionTitle}>Other services</h2>
            </div>
            <div className={styles.otherServicesGrid}>
              {otherServices.map((s, i) => (
                <Link
                  className={`${styles.otherServiceCard} ${styles.reveal}`}
                  href={`/services/${s.slug}`}
                  key={s.slug}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <div className={styles.otherServiceIcon}>
                    <Image
                      alt={s.category}
                      height={24}
                      src={navIconMap[s.slug] || AIDevIcon}
                      width={24}
                    />
                  </div>
                  <span className={styles.otherServiceLabel}>{s.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ────────────────────────────────── */}
      {data.faq && data.faq.length > 0 && (
        <section className={styles.faqSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>FAQ</span>
              <h2 className={styles.sectionTitle}>
                Frequently asked questions
              </h2>
            </div>
            <div className={styles.faqList}>
              {data.faq.map(item => (
                <FaqItem item={item} key={item.q} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────── */}
      <section className={styles.ctaSec}>
        <div className={styles.container}>
          <div className={`${styles.ctaCard} ${styles.reveal}`} ref={addRef}>
            <h2 className={styles.ctaTitle}>
              Not finding the right fit? Stay connected
            </h2>
            <p className={styles.ctaDesc}>
              We have the expertise to deliver you a custom solution no one else
              has. Book a free consultation today.
            </p>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                window.open("https://calendly.com/quarticlab/meeting", "_blank")
              }
            >
              Book a free consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE COMPONENT — receives SSR data
   ═══════════════════════════════════════════ */
export default function ServiceDetailPage({
  serviceData,
  otherServices,
  linkedProjects,
}) {
  if (!serviceData) {
    return (
      <div
        className={styles.page}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 16,
        }}
      >
        <h1 style={{ color: "var(--ql-oxford)" }}>Service not found</h1>
        <Link className={styles.btnPrimary} href="/services">
          Back to services
        </Link>
      </div>
    );
  }

  return (
    <ServiceDetailContent
      data={serviceData}
      key={serviceData.slug}
      linkedProjects={linkedProjects}
      otherServices={otherServices}
      slug={serviceData.slug}
    />
  );
}

/* ═══════════════════════════════════════════
   SSR — fetch service data from Firestore
   ═══════════════════════════════════════════ */
export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const [serviceData, allDetails] = await Promise.all([
      getServiceBySlug(slug),
      getAllServiceDetails(),
    ]);

    if (!serviceData) {
      return {
        props: { serviceData: null, otherServices: [], linkedProjects: [] },
      };
    }

    // Fetch referenced projects by Firestore document IDs
    const projectIds = Array.isArray(serviceData.projectIds)
      ? serviceData.projectIds.filter(Boolean)
      : [];
    const rawLinkedProjects = projectIds.length
      ? await getProjectsByIds(projectIds)
      : [];
    const linkedProjects = rawLinkedProjects
      .filter(p => p.is_active !== false)
      .map(p => ({
        title: p.title || "",
        desc: p.desc || p.description || "",
        image_url: p.image_url || p.image || p.imageUrl || null,
        types: Array.isArray(p.types) ? p.types : [],
        order: Number(p.order_no ?? p.order ?? 0),
      }))
      .sort((a, b) =>
        a.order === b.order
          ? a.title.localeCompare(b.title)
          : a.order - b.order,
      );

    // Build "other services" nav list (exclude current)
    const otherServices = (allDetails || [])
      .filter(s => s.slug !== slug)
      .map(s => ({
        slug: s.slug || "",
        category: s.category || "",
        order: Number(s.order ?? 0),
      }))
      .sort((a, b) =>
        a.order === b.order
          ? a.category.localeCompare(b.category)
          : a.order - b.order,
      );

    return {
      props: {
        serviceData,
        otherServices,
        linkedProjects,
      },
    };
  } catch {
    return {
      props: { serviceData: null, otherServices: [], linkedProjects: [] },
    };
  }
}
