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

/* ── slugify helper ─────────────────────────── */
const slugMap = {
  "Web Development": "web-development",
  "Blockchain Development": "blockchain-development",
  "Mobile App Development": "mobile-app-development",
  "UI/UX Development": "uiux-development",
  "Game Development": "game-development",
  "IOT Devices": "iot-devices",
  "Artificial Intelligence & Machine Learning":
    "artificial-intelligence-machine-learning",
  "DevOps & Cloud Services": "devops-cloud",
};

/* ── icon maps for dynamic Firestore data ──── */
const serviceIconMap = {
  "Web Development": WebDevIcon,
  "Blockchain Development": BlockchainIcon,
  "Mobile App Development": MobileDevIcon,
  "UI/UX Development": UIUXIcon,
  "Game Development": GameDevIcon,
  "IOT Devices": IOTDevIcon,
  "Artificial Intelligence & Machine Learning": AIDevIcon,
  "DevOps & Cloud Services": DevopsIcon,
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

          <div className={styles.servicesGrid}>
            {services.map((svc, i) => (
              <Link
                className={`${styles.serviceCard} ${styles.reveal}`}
                href={svc.slug ? `/servicesNew/${svc.slug}` : "/services"}
                key={svc.title}
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

                {/* tech bubbles */}
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
            ))}
          </div>
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
