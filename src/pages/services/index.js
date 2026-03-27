import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { getAllServices } from "../../firebase/firebaseRequests";

/* ── service icons ──────────────────────────── */
import WebDevIcon from "../../../public/assets/serviceIcons/webdevIcon.svg";
import BlockchainIcon from "../../../public/assets/serviceIcons/blockchainIcon.svg";
import MobileDevIcon from "../../../public/assets/serviceIcons/MobDevIcon.svg";
import UIUXIcon from "../../../public/assets/serviceIcons/uiuxIcon.svg";
import GameDevIcon from "../../../public/assets/serviceIcons/GameDevIcon.svg";
import IOTDevIcon from "../../../public/assets/serviceIcons/IOTIcon.svg";
import AIDevIcon from "../../../public/assets/serviceIcons/AIDevIcon.svg";
import DevopsIcon from "../../../public/assets/serviceIcons/devopsIcon.svg";

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
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

/* ── slugify helper ─────────────────────────── */
const slugMap = {
  "Web Development": "web-development",
  "Mobile App Development": "mobile-development",
  "Blockchain Development": "blockchain-development",
  "AI/ML Development": "ai-ml-development",
  "IoT Development": "iot-development",
  "Game Development": "game-development",
  "GenAI & Automation": "genai-automation",
  "UI/UX Design": "ui-ux-design",
  DevOps: "devops",
};

/* ── icon maps for dynamic Firestore data ──── */
const serviceIconMap = {
  "Web Development": WebDevIcon,
  "Mobile App Development": MobileDevIcon,
  "Blockchain Development": BlockchainIcon,
  "AI/ML Development": AIDevIcon,
  "IoT Development": IOTDevIcon,
  "Game Development": GameDevIcon,
  "GenAI & Automation": OpenAIIcon,
  "UI/UX Design": UIUXIcon,
  DevOps: DevopsIcon,
};

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

/* ═══════════════════════════════════════════
  PAGE COMPONENT
  ═══════════════════════════════════════════ */
export default function ServicesNew({ services = [] }) {
  const addRef = useReveal();
  const genAiSvc = services.find(s => s.slug === "genai-automation");
  const regularSvcs = services.filter(s => s.slug !== "genai-automation");

  return (
    <div className={styles.page}>
      <Head>
        <title>
          IT Services — Web, Blockchain, AI, Mobile & More | Zweidevs
        </title>
        <meta
          content="Comprehensive IT Services — web and mobile app development, blockchain, AI, IoT, UI/UX, game development, DevOps and more. Elevate your digital presence with Zweidevs."
          name="description"
        />
      </Head>

      {/* ── HERO ───────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>Our Expertise</span>
          <h1 className={styles.heroH1}>
            Everything Your Business Needs{" "}
            <span className={styles.heroAccent}>Under One Roof</span>
          </h1>
          <p className={styles.heroSub}>
            Zweidevs is a professional agency that strives to enhance your
            journey through creative ideas, innovation, and unwavering
            determination. We leverage cutting-edge technology and robust
            strategies to cater to your needs.
          </p>
          <div className={styles.heroCtas}>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                )
              }
            >
              Schedule a Call
            </button>
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
            <span className={styles.sectionTag}>What We Do</span>
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionDesc}>
              From web and mobile to blockchain, AI and cloud — we build
              end-to-end digital solutions that scale with your ambitions.
            </p>
          </div>

          <Grid container spacing={3}>
            {genAiSvc && (
              <Grid item xs={12}>
                <Link
                  className={`${styles.serviceCard} ${styles.reveal}`}
                  href={`/services/${genAiSvc.slug}`}
                  ref={addRef}
                >
                  <Chip
                    label="New"
                    size="small"
                    sx={{ bgcolor: "success.light", mb: 1.5 }}
                  />
                  <div className={styles.serviceIconWrap}>
                    <Image
                      alt={genAiSvc.title}
                      className={styles.serviceIcon}
                      height={32}
                      src={genAiSvc.icon}
                      width={32}
                    />
                  </div>
                  <h3 className={styles.serviceCardTitle}>{genAiSvc.title}</h3>
                  <p className={styles.serviceCardDesc}>
                    {genAiSvc.desc ||
                      "Supercharge your business with Generative AI, " +
                        "autonomous AI Agents, and end-to-end " +
                        "Automation pipelines — built for your business."}
                  </p>
                  <span className={styles.serviceLink}>
                    Learn More <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Grid>
            )}
            {regularSvcs.map((svc, i) => (
              <Grid item key={svc.title} md={4} sm={6} xs={12}>
                <Link
                  className={`${styles.serviceCard} ${styles.reveal}`}
                  href={svc.slug ? `/services/${svc.slug}` : "/services"}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className={styles.serviceIconWrap}>
                    <Image
                      alt={svc.title}
                      className={styles.serviceIcon}
                      height={32}
                      src={svc.icon}
                      width={32}
                    />
                  </div>
                  <h3 className={styles.serviceCardTitle}>{svc.title}</h3>
                  <p className={styles.serviceCardDesc}>{svc.desc}</p>
                  <div className={styles.serviceCardFooter}>
                    {svc.techs.map(tech => (
                      <div
                        className={styles.techBubble}
                        key={tech.t}
                        title={tech.t}
                      >
                        <Image
                          alt={tech.t}
                          height={16}
                          src={tech.img}
                          width={16}
                        />
                      </div>
                    ))}
                  </div>
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
      <section className={styles.engageSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Engagement Models</span>
            <h2 className={styles.sectionTitle}>How We Engage</h2>
            <p className={styles.sectionDesc}>
              Choose the model that fits your project. We adapt to your
              timeline, budget, and team setup.
            </p>
          </div>
          <Grid container spacing={3}>
            {[
              {
                desc: "Defined scope. Clear timeline. Fixed budget. No surprises.",
                title: "Fixed Price",
              },
              {
                desc: "Flexible scope. Pay for what you use. Ideal for evolving products.",
                title: "Time & Material",
              },
              {
                desc: "Your team, our talent. Daily standups. 30-day notice to scale.",
                title: "Dedicated Team",
              },
            ].map(({ desc, title }) => (
              <Grid item key={title} md={4} xs={12}>
                <Card
                  className={styles.reveal}
                  ref={addRef}
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 24px rgba(43,42,53,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    p: 1,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <h3 className={styles.engageCardTitle}>{title}</h3>
                    <p className={styles.engageCardDesc}>{desc}</p>
                  </CardContent>
                  <CardActions sx={{ pb: 2, px: 2 }}>
                    <Button
                      component={Link}
                      href="/how-we-work"
                      size="small"
                      sx={{
                        color: "#FF9700",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "rgba(255,151,0,0.08)",
                        },
                      }}
                    >
                      Learn More →
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className={styles.ctaSec}>
        <div className={styles.container}>
          <div className={`${styles.ctaCard} ${styles.reveal}`} ref={addRef}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Business?
            </h2>
            <p className={styles.ctaDesc}>
              We have the expertise to deliver custom solutions no one else has.
              Let&apos;s discuss how we can help you achieve your goals.
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
              Book a Free Consultation
            </button>
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
        const icon = serviceIconMap[title] || WebDevIcon;
        const techNames = Array.isArray(svc.techs) ? svc.techs : [];
        const techs = techNames
          .map(name => {
            const img = techIconMap[name];
            if (!img) {
              return null;
            }
            return { img, t: name };
          })
          .filter(Boolean);
        const order = Number(svc.order_no ?? svc.order ?? 0);
        const slug = svc.slug || slugMap[title] || "";

        return { icon, title, desc, techs, order, slug };
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
