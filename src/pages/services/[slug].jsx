import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { SITE_URL } from "@component/utils/siteUrl";

/* ── project images (static fallback for non-linked projects) ── */
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

/* ── firebase ───────────────────────────────── */
import {
  getAllServiceDetails,
  getProjectsByIds,
  getServiceBySlug,
} from "@component/firebase/firebaseRequests";

import styles from "./servicesDetail.module.css";

/* ════════════════════════════════════════════
   Images cannot live in Firestore, so we map
   string keys to static imports.
   ════════════════════════════════════════════ */
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

function resolveProjects(projects = []) {
  return projects
    .map(p => ({ ...p, image: projectImageMap[p.imageKey] || null }))
    .filter(p => p.image);
}

/* ═══════════════════════════════════════════
   FAQ ITEM (revamped +/× accordion)
   ═══════════════════════════════════════════ */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={`${styles.faq} ${open ? styles.faqOpen : ""}`}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className={styles.fq}
        id={buttonId}
        onClick={() => setOpen(v => !v)}
        type="button"
      >
        {item.q}
        <span aria-hidden="true" className={styles.ic}>
          +
        </span>
      </button>
      <div
        aria-labelledby={buttonId}
        className={`${styles.fa} ${open ? styles.faOpen : ""}`}
        id={panelId}
        role="region"
      >
        <p>{item.a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DETAIL CONTENT
   ═══════════════════════════════════════════ */
function ServiceDetailContent({
  data,
  linkedProjects,
  num,
  otherServices,
  slug,
}) {
  const projects =
    linkedProjects && linkedProjects.length > 0
      ? linkedProjects
      : resolveProjects(data.projects);

  const serviceUrl = `${SITE_URL}/services/${slug}`;
  const titleWords = (data.heroTitle || data.category || "").split(" ");

  const faqSchema =
    Array.isArray(data.faq) && data.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${serviceUrl}#faq`,
          mainEntity: data.faq.map(item => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
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
      <header className={styles.dhero}>
        <span aria-hidden="true" className={styles.dnum}>
          {num}
        </span>
        <div className={styles.container}>
          <div className={styles.crumb}>
            <Link href="/services">SERVICES</Link>
            <span>/</span>
            <span>{(data.category || "").toUpperCase()}</span>
          </div>
          <span className={`${styles.eb} ${styles.dhFade}`}>
            <i />
            {data.category}
          </span>
          <h1 className={styles.h1}>
            {titleWords.map((word, i) => (
              <span className={styles.w} key={`${word}-${i}`}>
                <span style={{ transitionDelay: `${0.08 + i * 0.055}s` }}>
                  {i === titleWords.length - 1 ? <em>{word}</em> : word}
                  {i < titleWords.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </h1>
          <p className={`${styles.heroLead} ${styles.dhFade}`}>
            {data.heroSub}
          </p>
          <div className={`${styles.dheroCtas} ${styles.dhFade}`}>
            <a
              className={styles.btnPrimary}
              href="https://calendly.com/quarticlab/30min"
              rel="noopener noreferrer"
              target="_blank"
            >
              Request a demo <span className={styles.arr}>→</span>
            </a>
            <Link className={styles.btnOutline} href="/services">
              All services
            </Link>
          </div>
        </div>
      </header>

      {/* ── WHAT WE OFFER ──────────────────────── */}
      {data.offerings?.length > 0 && (
        <section className={styles.sec}>
          <div className={styles.container}>
            <div className={styles.secHead}>
              <div>
                <span className={styles.eb}>
                  <i />
                  What we offer
                </span>
                <h2 className={styles.h2}>
                  {data.category} <em>services</em>
                </h2>
              </div>
              {data.heading && (
                <p className={styles.headLead}>{data.heading}</p>
              )}
            </div>
            <div className={styles.offerGrid}>
              {data.offerings.map((o, i) => (
                <div className={styles.offer} key={o.title}>
                  <span className={styles.oIx}>
                    {num}.{i + 1}
                  </span>
                  <h3 className={styles.offerTitle}>{o.title}</h3>
                  <p className={styles.offerDesc}>{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS ────────────────────────────── */}
      {data.process?.steps?.length > 0 && (
        <section className={styles.secTight}>
          <div className={styles.container}>
            <div className={styles.secHead}>
              <div>
                <span className={styles.eb}>
                  <i />
                  Our process
                </span>
                <h2 className={styles.h2}>
                  How we <em>build it</em>
                </h2>
              </div>
            </div>
            <div className={styles.steps}>
              {data.process.steps.map((step, i) => (
                <div className={styles.step} key={step.title}>
                  <span className={styles.sNum}>
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED WORK (dark) ────────────────── */}
      {projects.length > 0 && (
        <section className={`${styles.sec} ${styles.dark}`}>
          <div className={styles.container}>
            <div className={styles.secHead}>
              <div>
                <span className={styles.eb}>
                  <i />
                  Related work
                </span>
                <h2 className={styles.h2}>
                  Shipped in this <em>discipline</em>
                </h2>
              </div>
            </div>
            <div className={styles.pwGrid}>
              {projects.map(p => (
                <div className={styles.pw} key={p.title}>
                  <div className={styles.pwShot}>
                    {(p.image_url || p.image) && (
                      <Image
                        alt={`${p.title} — ${data.category} project by Quartic Lab`}
                        className={styles.pwImg}
                        fill
                        sizes="(max-width: 680px) 100vw, 33vw"
                        src={p.image_url || p.image}
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    )}
                  </div>
                  <div className={styles.pwB}>
                    <span className={styles.pwTag}>
                      {p.types?.[0] || data.category}
                    </span>
                    <h3 className={styles.pwTitle}>{p.title}</h3>
                    <p className={styles.pwDesc}>{p.desc || p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHO WE SERVE ───────────────────────── */}
      {data.audience?.cards?.length > 0 && (
        <section className={styles.sec}>
          <div className={styles.container}>
            <div className={styles.secHead}>
              <div>
                <span className={styles.eb}>
                  <i />
                  Who we serve
                </span>
                <h2 className={styles.h2}>
                  We meet you <em>where you are</em>
                </h2>
              </div>
            </div>
            <div className={styles.serveGrid}>
              {data.audience.cards.map(c => (
                <div className={styles.serve} key={c.title}>
                  <h3 className={styles.serveTitle}>{c.title}</h3>
                  <p className={styles.serveDesc}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK ─────────────────────────── */}
      {data.techStack?.length > 0 && (
        <section className={styles.secTight}>
          <div className={styles.container}>
            <div className={styles.secHead}>
              <div>
                <span className={styles.eb}>
                  <i />
                  Technology
                </span>
                <h2 className={styles.h2}>
                  The <em>stack</em>
                </h2>
              </div>
            </div>
            <div className={styles.stackGrid}>
              {data.techStack.map(g => (
                <div className={styles.sg} key={g.group}>
                  <h4 className={styles.sgTitle}>{g.group}</h4>
                  <div className={styles.chips}>
                    {g.chips.map(chip => (
                      <span className={styles.chip} key={chip}>
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

      {/* ── FAQ ────────────────────────────────── */}
      {data.faq?.length > 0 && (
        <section className={styles.secTight}>
          <div className={styles.container}>
            <div className={styles.faqHead}>
              <span className={`${styles.eb} ${styles.ebCenter}`}>
                <i />
                FAQ
              </span>
              <h2 className={styles.faqTitle}>
                Frequently asked <em>questions</em>
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

      {/* ── OTHER SERVICES ─────────────────────── */}
      {otherServices.length > 0 && (
        <section className={styles.secTight}>
          <div className={styles.container}>
            <span className={styles.eb}>
              <i />
              Explore more
            </span>
            <h2 className={`${styles.h2} ${styles.othersTitle}`}>
              Other <em>services</em>
            </h2>
            <div className={styles.others}>
              {otherServices.map(s => (
                <Link
                  className={styles.other}
                  href={`/services/${s.slug}`}
                  key={s.slug}
                >
                  <b>{s.num}</b>
                  {s.category} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
          <span className={`${styles.eb} ${styles.ebCenter}`}>
            <i />
            Avg. response: 4 hours
          </span>
          <h2 className={styles.ctaTitle}>
            Get a full project estimate in <em>12 hours</em>
          </h2>
          <p className={styles.ctaDesc}>
            Scope, timeline, team composition, and cost — delivered to your
            inbox. No sales call required.
          </p>
          <div className={styles.ctaBtns}>
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
          <p className={styles.ctaNote}>
            FIXED-SCOPE SPRINTS · WEEKLY DEMOS · 30 DAYS FREE SUPPORT
          </p>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE COMPONENT — receives SSR data
   ═══════════════════════════════════════════ */
export default function ServiceDetailPage({
  linkedProjects,
  otherServices,
  serviceData,
  serviceNum,
}) {
  if (!serviceData) {
    return (
      <div className={styles.notFound}>
        <h1>Service not found</h1>
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
      num={serviceNum}
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
        props: {
          serviceData: null,
          otherServices: [],
          linkedProjects: [],
          serviceNum: "01",
        },
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

    // Stable display order for service numbering + "other services" list
    const byOrder = (a, b) => {
      const ao = Number(a.order ?? 0);
      const bo = Number(b.order ?? 0);
      return ao === bo
        ? (a.category || "").localeCompare(b.category || "")
        : ao - bo;
    };
    const sortedAll = (allDetails || []).slice().sort(byOrder);
    const numBySlug = {};
    sortedAll.forEach((s, i) => {
      numBySlug[s.slug] = String(i + 1).padStart(2, "0");
    });
    const serviceNum = numBySlug[slug] || "01";

    const otherServices = sortedAll
      .filter(s => s.slug !== slug)
      .map(s => ({
        slug: s.slug || "",
        category: s.category || "",
        num: numBySlug[s.slug] || "",
      }));

    return {
      props: { serviceData, otherServices, linkedProjects, serviceNum },
    };
  } catch {
    return {
      props: {
        serviceData: null,
        otherServices: [],
        linkedProjects: [],
        serviceNum: "01",
      },
    };
  }
}
