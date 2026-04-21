import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import QuarticMark from "@component/Components/CommonComponents/QuarticMark";
import ClientSvg1 from "../../public/assets/HomeIcons/clients/nick-angelov.png";
import ClientSvg2 from "../../public/assets/HomeIcons/clients/theresa.png";
import ClientSvg3 from "../../public/assets/HomeIcons/clients/rishi.png";
import ClientSvg4 from "../../public/assets/HomeIcons/clients/anton.png";
import ClientSvg5 from "../../public/assets/HomeIcons/clients/tony-malik.png";
import ClientSvg6 from "../../public/assets/HomeIcons/clients/tommy.png";
import {
  SERVICE_ICON_BY_SLUG,
  SERVICE_ICON_MAP,
  WebDevIcon,
} from "@component/Components/CommonComponents/ServiceIcons";
import AnthropicIcon from "../../public/assets/serviceIcons/anthropic.svg";
import AngularIcon from "../../public/assets/serviceIcons/angular.svg";

import AWSIcon from "../../public/assets/serviceIcons/AWS.svg";
import AzureIcon from "../../public/assets/serviceIcons/AzureIcon.svg";
import BlenderIcon from "../../public/assets/serviceIcons/blender.svg";
import CrewAIIcon from "../../public/assets/serviceIcons/crewai.svg";
import DifyIcon from "../../public/assets/serviceIcons/dify.svg";
import DockerIcon from "../../public/assets/serviceIcons/docker.svg";
import EthIcon from "../../public/assets/serviceIcons/ethIcon.svg";
import FigmaIcon from "../../public/assets/serviceIcons/figmaIcon.svg";
import FirebaseIcon from "../../public/assets/serviceIcons/firebase.svg";
import FlutterIcon from "../../public/assets/serviceIcons/Flutter.svg";
import GCloudIcon from "../../public/assets/serviceIcons/googlecloudIcon.svg";
import GraphQLIcon from "../../public/assets/serviceIcons/graphql.svg";
import HuggingFaceIcon from "../../public/assets/serviceIcons/huggingface.svg";
import KubernetesIcon from "../../public/assets/serviceIcons/kubernetes.svg";
import LangChainIcon from "../../public/assets/serviceIcons/langchain.svg";
import LangFlowIcon from "../../public/assets/serviceIcons/langflow.svg";
import MakeIcon from "../../public/assets/serviceIcons/make.svg";
import MongoIcon from "../../public/assets/serviceIcons/mongodb.svg";
import N8nIcon from "../../public/assets/serviceIcons/n8n.svg";
import NestIcon from "../../public/assets/serviceIcons/nestjs.svg";
import NextIcon from "../../public/assets/serviceIcons/next.svg";
import NodeIcon from "../../public/assets/serviceIcons/node.svg";
import OllamaIcon from "../../public/assets/serviceIcons/ollama.svg";

import OpenAIIcon from "../../public/assets/serviceIcons/openAIIcon.svg";
import PostgresIcon from "../../public/assets/serviceIcons/postgres.svg";
import PyTorchIcon from "../../public/assets/serviceIcons/pyTorch.svg";
import PythonIcon from "../../public/assets/serviceIcons/py.svg";
import ReactIcon from "../../public/assets/serviceIcons/react.svg";
import RedisIcon from "../../public/assets/serviceIcons/redis.svg";
import SolanaIcon from "../../public/assets/serviceIcons/solanaIcon.svg";
import SwiftIcon from "../../public/assets/serviceIcons/swift.svg";
import TailwindIcon from "../../public/assets/serviceIcons/tailwind.svg";
import TensorFlowIcon from "../../public/assets/serviceIcons/tensorflow.svg";
import ThreeJSIcon from "../../public/assets/serviceIcons/threejs.svg";
import TypeScriptIcon from "../../public/assets/serviceIcons/typescript.svg";
import UnityIcon from "../../public/assets/serviceIcons/unityIcon.svg";
import VueIcon from "../../public/assets/serviceIcons/vue.svg";
import ZapierIcon from "../../public/assets/serviceIcons/zapier.svg";
import CountrySelect from "@component/Components/CommonComponents/CountrySelect/CountrySelect";
import {
  getAllProjects,
  getAllReviews,
  getAllServices,
  submitContactForm,
} from "@component/firebase/firebaseRequests";
import { hasFunctionalConsent, useConsent } from "@component/utils/consent";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "../styles/landing.module.css";

/* ── data ────────────────────────────────────────── */

const serviceIconMap = SERVICE_ICON_MAP;

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

/* ── tech categories ─────────────────────── */
const techCategories = [
  {
    label: "Frontend",
    items: [
      { name: "React", src: ReactIcon },
      { name: "Next.js", src: NextIcon },
      { name: "Vue.js", src: VueIcon },
      { name: "Angular", src: AngularIcon },
      { name: "TailwindCSS", src: TailwindIcon },
      { name: "Three.js", src: ThreeJSIcon },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", src: NodeIcon },
      { name: "NestJS", src: NestIcon },
      { name: "Python", src: PythonIcon },
      { name: "GraphQL", src: GraphQLIcon },
      { name: "TypeScript", src: TypeScriptIcon },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "Flutter", src: FlutterIcon },
      { name: "Swift", src: SwiftIcon },
      { name: "React Native", src: ReactIcon },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "OpenAI", src: OpenAIIcon },
      { name: "LangChain", src: LangChainIcon },
      { name: "HuggingFace", src: HuggingFaceIcon },
      { name: "TensorFlow", src: TensorFlowIcon },
      { name: "PyTorch", src: PyTorchIcon },
      { name: "Anthropic", src: AnthropicIcon },
      { name: "CrewAI", src: CrewAIIcon },
      { name: "Ollama", src: OllamaIcon },
    ],
  },
  {
    label: "Automation",
    items: [
      { name: "n8n", src: N8nIcon },
      { name: "Make", src: MakeIcon },
      { name: "Zapier", src: ZapierIcon },
      { name: "Dify", src: DifyIcon },
      { name: "LangFlow", src: LangFlowIcon },
    ],
  },
  {
    label: "Blockchain",
    items: [
      { name: "Solidity", src: EthIcon },
      { name: "Solana", src: SolanaIcon },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", src: AWSIcon },
      { name: "Azure", src: AzureIcon },
      { name: "GCP", src: GCloudIcon },
      { name: "Docker", src: DockerIcon },
      { name: "Kubernetes", src: KubernetesIcon },
      { name: "Firebase", src: FirebaseIcon },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "MongoDB", src: MongoIcon },
      { name: "PostgreSQL", src: PostgresIcon },
      { name: "Redis", src: RedisIcon },
    ],
  },
  {
    label: "Creative",
    items: [
      { name: "Figma", src: FigmaIcon },
      { name: "Blender", src: BlenderIcon },
      { name: "Unity", src: UnityIcon },
    ],
  },
];

const defaultTestimonials = [
  {
    img: ClientSvg2,
    name: "Theresa",
    position: "Product Manager",
    company: "TechVentures",
    companyLogoUrl: null,
    text: "Working with this fantastic team was an excellent experience. They excel at development and finding new solutions. Their expertise and talent are impressive.",
  },
  {
    img: ClientSvg3,
    name: "Rishi Sareen",
    position: "CTO",
    company: "Sareen Solutions",
    companyLogoUrl: null,
    text: "The team's exceptional communication resulted in the successful delivery of the project. It would be my pleasure to work with them again in the future.",
  },
  {
    img: ClientSvg1,
    name: "Nick Angelov",
    position: "Founder",
    company: "Angelov Group",
    companyLogoUrl: null,
    text: "Quartic Lab met our expectations. They delivered the product that provided us with a high-quality base from which to move forward. Highly recommended.",
  },
  {
    img: ClientSvg4,
    name: "Anton Benz",
    position: "CEO",
    company: "BenzDigital",
    companyLogoUrl: null,
    text: "These developers were excellent to work with. I would definitely recommend them to anyone looking for great work, and I look forward to hiring them again.",
  },
  {
    img: ClientSvg5,
    name: "Tony Malik",
    position: "Director of Engineering",
    company: "Malik Enterprises",
    companyLogoUrl: null,
    text: "The Quartic Lab team has extensive knowledge of the work, and after working with them for 5-6 months, they have become our go-to development company.",
  },
  {
    img: ClientSvg6,
    name: "Tommy Vacek",
    position: "Project Lead",
    company: "Vacek Studio",
    companyLogoUrl: null,
    text: "The Quartic Lab team did a fantastic job scoping our project. Their adaptability was impressive, and they always succeeded in exceeding our expectations.",
  },
];

/* ── stat icons (unique, concept-specific, 24×24) ── */

/* Projects: four stacked layers suggesting a build stack */
const StatIconProjects = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M4 17l8 4 8-4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.2"
    />
    <path
      d="M4 12l8 4 8-4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.2"
    />
    <path
      d="M4 7l8 4 8-4-8-4-8 4z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.2"
    />
  </svg>
);

/* Reviews: speech bubble with a single checkmark inside */
const StatIconReviews = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M4 4h16v12H7l-3 4V4z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.2"
    />
    <path
      d="M8.5 10.5l2 2 4-4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
    />
  </svg>
);

/* Team: K₃ triangle graph — three connected nodes */
const StatIconTeam = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <line
      stroke="currentColor"
      strokeOpacity="0.55"
      strokeWidth="1"
      x1="12"
      x2="5"
      y1="5"
      y2="17"
    />
    <line
      stroke="currentColor"
      strokeOpacity="0.55"
      strokeWidth="1"
      x1="12"
      x2="19"
      y1="5"
      y2="17"
    />
    <line
      stroke="currentColor"
      strokeOpacity="0.55"
      strokeWidth="1"
      x1="5"
      x2="19"
      y1="17"
      y2="17"
    />
    <circle cx="12" cy="5" fill="currentColor" r="2.5" />
    <circle cx="5" cy="17" fill="currentColor" opacity="0.7" r="2.5" />
    <circle cx="19" cy="17" fill="currentColor" opacity="0.7" r="2.5" />
  </svg>
);

/* Funding: an upward arrow bursting through a horizontal bar */
const StatIconFunding = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M12 20V8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.4"
    />
    <path
      d="M8 12l4-5 4 5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
    />
    <path
      d="M5 15h14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeOpacity="0.45"
      strokeWidth="1.6"
    />
    <path
      d="M5 19h14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeOpacity="0.25"
      strokeWidth="1.2"
    />
  </svg>
);

/* Satisfaction: a precision target / bullseye */
const StatIconSatisfaction = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="1.1"
    />
    <circle
      cx="12"
      cy="12"
      r="5.5"
      stroke="currentColor"
      strokeOpacity="0.5"
      strokeWidth="1.1"
    />
    <circle cx="12" cy="12" fill="currentColor" r="2.5" />
    <path
      d="M12 3v2M12 19v2M3 12h2M19 12h2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeOpacity="0.3"
      strokeWidth="1"
    />
  </svg>
);

// Keep these targets consistent with the About page prose
// (15-person team, 50+ products shipped) — audit C5.
const stats = [
  {
    target: 50,
    suffix: "+",
    label: "Projects completed",
    Icon: StatIconProjects,
    accent: "var(--ql-copper)",
  },
  {
    target: 680,
    suffix: "+",
    label: "Positive reviews",
    Icon: StatIconReviews,
    accent: "var(--ql-copper)",
  },
  {
    target: 15,
    suffix: "+",
    label: "Team members",
    Icon: StatIconTeam,
    accent: "var(--ql-copper)",
  },
  {
    target: 3.5,
    suffix: "M$",
    label: "Funding raised",
    Icon: StatIconFunding,
    accent: "var(--ql-copper)",
  },
  {
    target: 99,
    suffix: "%",
    label: "Client satisfaction",
    Icon: StatIconSatisfaction,
    accent: "var(--ql-copper)",
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
      { threshold: 0.12 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── hero word cycle ────────────────────────────────── */
const HERO_WORDS = ["ships.", "scales.", "delivers."];

/* ── page ────────────────────────────────────────── */

export default function LandingPage({
  projects = [],
  projectsError = false,
  services = [],
  servicesError = false,
  testimonials = defaultTestimonials,
}) {
  const router = useRouter();
  const consent = useConsent();
  const functionalOk = hasFunctionalConsent(consent);
  useReveal(`.${styles.reveal}`);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Quartic Lab",
    description:
      "A full-service software agency building web, mobile, and AI products for startups and enterprises.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>
          Quartic Lab — Software Development Agency for Web, Mobile &amp; AI
        </title>
        <meta
          content="Quartic Lab builds web, mobile, and AI products for startups and enterprises. 50+ projects shipped across 3 continents. Get a 12-hour project estimate."
          key="description"
          name="description"
        />
        <meta
          content="Quartic Lab — Software Development Agency for Web, Mobile & AI"
          key="og:title"
          property="og:title"
        />
        <meta
          content="Quartic Lab builds web, mobile, and AI products for startups and enterprises. 50+ projects shipped across 3 continents."
          key="og:description"
          property="og:description"
        />
        <meta
          content="Quartic Lab — Software Development Agency for Web, Mobile & AI"
          key="twitter:title"
          name="twitter:title"
        />
        <meta
          content="Quartic Lab builds web, mobile, and AI products for startups and enterprises. 50+ projects shipped across 3 continents."
          key="twitter:description"
          name="twitter:description"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          type="application/ld+json"
        />
      </Head>
      {functionalOk && (
        <Script
          src="https://widget.clutch.co/static/js/widget.js"
          strategy="lazyOnload"
        />
      )}

      {/* ─── HERO ─────────────────────────────── */}
      <HeroSection />

      {/* ─── SERVICES ─────────────────────────── */}
      <ServicesSection
        router={router}
        services={services}
        servicesError={servicesError}
      />

      {/* ─── ABOUT ────────────────────────────── */}
      <AboutSection router={router} />

      {/* ─── PROJECTS ─────────────────────────── */}
      <ProjectsSection projects={projects} projectsError={projectsError} />

      {/* ─── STATS ────────────────────────────── */}
      <StatsSection />

      {/* ─── TESTIMONIALS ─────────────────────── */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ─── TECH ─────────────────────────────── */}
      <TechSection />

      {/* ─── CONTACT ──────────────────────────── */}
      <ContactSection />
    </div>
  );
}

/* ── sections ────────────────────────────────────── */

function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let tid;
    const id = setInterval(() => {
      setFading(true);
      tid = setTimeout(() => {
        setWordIdx(i => (i + 1) % HERO_WORDS.length);
        setFading(false);
      }, 350);
    }, 3200);
    return () => {
      clearInterval(id);
      clearTimeout(tid);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <span className={styles.heroBadge}>Quartic Lab</span>
          <h1 className={styles.heroH1}>
            Software that{" "}
            <span
              className={`${styles.heroAccentWord} ${
                fading ? styles.heroAccentFading : ""
              }`}
            >
              {HERO_WORDS[wordIdx]}
            </span>
            <span className={styles.heroCursor} /> Teams that{" "}
            <span className={styles.heroAccent}>stay.</span>
          </h1>
          <p className={styles.heroSub}>
            A full-stack software agency building web, mobile, and AI products
            for startups and enterprises. One senior team, four years shipping,
            zero handoff overhead.
          </p>
          <div className={styles.heroCtas}>
            <Link className={styles.btnHeroPrimary} href="/contact">
              Start a project
            </Link>
            <Link className={styles.btnHeroOutline} href="/projects">
              View our work
            </Link>
          </div>
          <div className={styles.clutchBadge}>
            <div
              className="clutch-widget"
              data-clutchcompany-id="1461075"
              data-expandifr="true"
              data-height="40"
              data-nofollow="false"
              data-scale="100"
              data-url="https://widget.clutch.co"
              data-widget-type="1"
            />
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroLogoRing}>
            <div className={styles.orbitRing1} />
            <div className={styles.orbitRing2} />
            <div className={styles.pulsePing} />
            <QuarticMark animated size={260} />
          </div>
        </div>
      </div>
      <div className={styles.heroWave} />
    </section>
  );
}

function ServicesSection({ router, services, servicesError }) {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Services</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Multiple disciplines. One team. Zero handoff overhead.
          </h2>
        </div>
        {servicesError ? (
          <p style={{ color: "#ef5350", textAlign: "center" }}>
            Unable to load services right now. Please try again later.
          </p>
        ) : (
          <div className={styles.servicesGrid}>
            {services.map((s, i) => {
              const Icon =
                SERVICE_ICON_BY_SLUG[s.slug] ||
                serviceIconMap[s.title] ||
                WebDevIcon;
              return (
                <Link
                  className={`${styles.serviceCard} ${styles.reveal}`}
                  href={s.href}
                  key={s.title}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className={styles.serviceIconWrap}>
                    <Icon size={56} />
                  </div>
                  <h3 className={styles.serviceCardTitle}>{s.title}</h3>
                  <p className={styles.serviceCardDesc}>{s.desc}</p>
                  <span className={styles.serviceLink}>Learn more →</span>
                </Link>
              );
            })}
          </div>
        )}
        <div className={styles.servicesCta}>
          <button
            className={styles.btnOutline}
            onClick={() => router.push("/services")}
          >
            Explore all services
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── About illustration — a researcher at a workstation
   Minimal line-art figure, oxford structure, copper accents.
   CSS keyframe animations injected via <style> tag inside SVG. ── */
function AboutDoodle() {
  return (
    <svg
      aria-hidden="true"
      className={styles.aboutDoodle}
      fill="none"
      focusable="false"
      viewBox="0 0 420 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes ql-blink {
            0%, 45% { opacity: 1; }
            50%, 95% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes ql-type {
            0%   { stroke-dashoffset: 60; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes ql-line-appear {
            from { opacity: 0; transform: translateX(-4px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes ql-float {
            0%, 100% { transform: translateY(0px); }
            50%      { transform: translateY(-4px); }
          }
          @keyframes ql-arm-type {
            0%, 100% { transform: rotate(0deg); }
            25%      { transform: rotate(-2deg); }
            75%      { transform: rotate(2deg); }
          }
          @keyframes ql-glow-pulse {
            0%, 100% { opacity: 0.18; }
            50%      { opacity: 0.35; }
          }
          @keyframes ql-node-ping {
            0%   { r: 3; opacity: 0.8; }
            100% { r: 10; opacity: 0; }
          }
          .ql-float-group {
            animation: ql-float 4s ease-in-out infinite;
            transform-origin: 210px 190px;
          }
          .ql-arm-l {
            animation: ql-arm-type 0.42s ease-in-out infinite;
            transform-origin: 188px 270px;
          }
          .ql-arm-r {
            animation: ql-arm-type 0.42s ease-in-out infinite reverse;
            transform-origin: 232px 270px;
          }
          .ql-cursor {
            animation: ql-blink 1.1s step-end infinite;
          }
          .ql-code-l1 {
            animation: ql-line-appear 0.35s ease-out 0.2s both;
          }
          .ql-code-l2 {
            animation: ql-line-appear 0.35s ease-out 0.6s both;
          }
          .ql-code-l3 {
            animation: ql-line-appear 0.35s ease-out 1.0s both;
          }
          .ql-code-l4 {
            animation: ql-line-appear 0.35s ease-out 1.4s both;
          }
          .ql-code-l5 {
            animation: ql-line-appear 0.35s ease-out 1.8s both;
          }
          .ql-screen-glow {
            animation: ql-glow-pulse 2.8s ease-in-out infinite;
          }
          .ql-ping {
            animation: ql-node-ping 1.8s ease-out infinite;
          }
        `}</style>
      </defs>

      {/* ── faint background grid ── */}
      {Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => (
          <circle
            cx={30 + col * 46}
            cy={30 + row * 52}
            fill="oklch(20% 0.05 255)"
            key={`g-${row}-${col}`}
            opacity="0.05"
            r="1.5"
          />
        )),
      )}

      {/* ── desk surface ── */}
      <rect
        fill="oklch(88% 0.03 70)"
        height="12"
        rx="2"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.2"
        width="280"
        x="70"
        y="318"
      />
      {/* desk legs */}
      <line
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.5"
        x1="100"
        x2="100"
        y1="330"
        y2="358"
      />
      <line
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.5"
        x1="320"
        x2="320"
        y1="330"
        y2="358"
      />

      {/* ── monitor stand ── */}
      <rect
        fill="oklch(88% 0.03 70)"
        height="8"
        rx="1"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1"
        width="36"
        x="192"
        y="310"
      />
      <line
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.2"
        x1="210"
        x2="210"
        y1="296"
        y2="318"
      />

      {/* ── monitor frame ── */}
      <rect
        fill="oklch(14% 0.04 255)"
        height="130"
        rx="3"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.5"
        width="192"
        x="114"
        y="164"
      />
      {/* screen bezel inset */}
      <rect
        fill="oklch(16% 0.045 255)"
        height="114"
        rx="2"
        width="176"
        x="122"
        y="172"
      />

      {/* ── screen ambient glow ── */}
      <rect
        className="ql-screen-glow"
        fill="oklch(58% 0.12 45)"
        height="114"
        rx="2"
        width="176"
        x="122"
        y="172"
      />

      {/* ── code lines on screen ── */}
      <g clipPath="url(#screenClip)" fontFamily="IBM Plex Mono, monospace">
        <clipPath id="screenClip">
          <rect height="114" rx="2" width="176" x="122" y="172" />
        </clipPath>

        {/* prompt line */}
        <text
          className="ql-code-l1"
          fill="oklch(58% 0.12 45)"
          fontSize="8.5"
          x="132"
          y="190"
        >
          ▸ quartic.init(config)
        </text>
        <text
          className="ql-code-l2"
          fill="oklch(75% 0.04 255)"
          fontSize="8.5"
          opacity="0.7"
          x="132"
          y="204"
        >
          &nbsp;&nbsp;loading modules...
        </text>
        <text
          className="ql-code-l3"
          fill="oklch(58% 0.12 45)"
          fontSize="8.5"
          opacity="0.9"
          x="132"
          y="218"
        >
          ✓ inference v2.4
        </text>
        <text
          className="ql-code-l4"
          fill="oklch(58% 0.12 45)"
          fontSize="8.5"
          opacity="0.9"
          x="132"
          y="232"
        >
          ✓ simulation v1.9
        </text>
        <text
          className="ql-code-l5"
          fill="oklch(75% 0.04 255)"
          fontSize="8.5"
          opacity="0.6"
          x="132"
          y="246"
        >
          &nbsp;&nbsp;pipeline ready
        </text>

        {/* blinking cursor */}
        <rect
          className="ql-cursor"
          fill="oklch(58% 0.12 45)"
          height="10"
          width="6"
          x="132"
          y="255"
        />
      </g>

      {/* ── floating person group (gentle up/down bob) ── */}
      <g className="ql-float-group">
        {/* torso */}
        <rect
          fill="oklch(88% 0.03 70)"
          height="62"
          rx="6"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="1.4"
          width="50"
          x="185"
          y="255"
        />

        {/* neck */}
        <rect
          fill="oklch(88% 0.03 70)"
          height="10"
          rx="2"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="1"
          width="14"
          x="203"
          y="246"
        />

        {/* head */}
        <ellipse
          cx="210"
          cy="232"
          fill="oklch(88% 0.03 70)"
          rx="20"
          ry="22"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="1.4"
        />

        {/* hair — short strokes */}
        <path
          d="M192 226 C192 208 228 208 228 226"
          fill="oklch(20% 0.05 255)"
          opacity="0.75"
        />

        {/* eyes */}
        <ellipse cx="203" cy="231" fill="oklch(20% 0.05 255)" rx="2" ry="2.5" />
        <ellipse cx="217" cy="231" fill="oklch(20% 0.05 255)" rx="2" ry="2.5" />
        {/* glasses */}
        <rect
          fill="none"
          height="7"
          rx="1.5"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1.1"
          width="12"
          x="197"
          y="227"
        />
        <rect
          fill="none"
          height="7"
          rx="1.5"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1.1"
          width="12"
          x="211"
          y="227"
        />
        <line
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
          x1="209"
          x2="211"
          y1="230.5"
          y2="230.5"
        />
        {/* glasses side arms */}
        <line
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
          x1="197"
          x2="192"
          y1="230.5"
          y2="230.5"
        />
        <line
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
          x1="223"
          x2="228"
          y1="230.5"
          y2="230.5"
        />

        {/* left arm (typing) */}
        <g className="ql-arm-l">
          <path
            d="M187 268 L166 290 L158 308"
            stroke="oklch(20% 0.05 255)"
            strokeLinecap="round"
            strokeWidth="5"
          />
          {/* hand */}
          <ellipse
            cx="155"
            cy="311"
            fill="oklch(88% 0.03 70)"
            rx="7"
            ry="5"
            stroke="oklch(20% 0.05 255)"
            strokeWidth="1"
          />
        </g>

        {/* right arm (typing) */}
        <g className="ql-arm-r">
          <path
            d="M233 268 L254 290 L262 308"
            stroke="oklch(20% 0.05 255)"
            strokeLinecap="round"
            strokeWidth="5"
          />
          {/* hand */}
          <ellipse
            cx="265"
            cy="311"
            fill="oklch(88% 0.03 70)"
            rx="7"
            ry="5"
            stroke="oklch(20% 0.05 255)"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* ── keyboard ── */}
      <rect
        fill="oklch(88% 0.03 70)"
        height="14"
        rx="2"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1"
        width="100"
        x="160"
        y="308"
      />
      {/* key rows */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect
          fill="oklch(80% 0.025 70)"
          height="4"
          key={i}
          rx="1"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="0.5"
          width="12"
          x={167 + i * 16}
          y="312"
        />
      ))}
      {[0, 1, 2, 3].map(i => (
        <rect
          fill="oklch(80% 0.025 70)"
          height="4"
          key={i}
          rx="1"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="0.5"
          width="12"
          x={175 + i * 16}
          y="318"
        />
      ))}

      {/* ── floating thought bubbles (concept nodes) ── */}
      {/* bubble 1 — data */}
      <g
        style={{
          animation: "ql-float 3.6s ease-in-out 0.4s infinite",
          transformOrigin: "80px 180px",
        }}
      >
        <circle
          cx="80"
          cy="180"
          fill="oklch(95% 0.018 75)"
          r="28"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill="oklch(58% 0.12 45)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="1.5"
          textAnchor="middle"
          x="80"
          y="178"
        >
          DATA
        </text>
        <text
          dominantBaseline="middle"
          fill="oklch(20% 0.05 255)"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="7"
          opacity="0.5"
          textAnchor="middle"
          x="80"
          y="190"
        >
          pipeline
        </text>
        {/* ping ring */}
        <circle
          className="ql-ping"
          cx="80"
          cy="180"
          fill="none"
          r="3"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
        />
        {/* connecting dashed line to figure */}
        <line
          opacity="0.2"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 3"
          strokeWidth="1"
          x1="108"
          x2="180"
          y1="180"
          y2="220"
        />
      </g>

      {/* bubble 2 — model */}
      <g
        style={{
          animation: "ql-float 4.2s ease-in-out 1.2s infinite",
          transformOrigin: "350px 200px",
        }}
      >
        <circle
          cx="350"
          cy="200"
          fill="oklch(95% 0.018 75)"
          r="28"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1.2"
        />
        <text
          dominantBaseline="middle"
          fill="oklch(58% 0.12 45)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="1.5"
          textAnchor="middle"
          x="350"
          y="197"
        >
          MODEL
        </text>
        <text
          dominantBaseline="middle"
          fill="oklch(20% 0.05 255)"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="7"
          opacity="0.5"
          textAnchor="middle"
          x="350"
          y="209"
        >
          v2.4
        </text>
        <circle
          className="ql-ping"
          cx="350"
          cy="200"
          fill="none"
          r="3"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
          style={{ animationDelay: "0.9s" }}
        />
        <line
          opacity="0.2"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 3"
          strokeWidth="1"
          x1="322"
          x2="248"
          y1="200"
          y2="224"
        />
      </g>

      {/* bubble 3 — ship */}
      <g
        style={{
          animation: "ql-float 3.0s ease-in-out 2.1s infinite",
          transformOrigin: "340px 100px",
        }}
      >
        <circle
          cx="340"
          cy="100"
          fill="oklch(95% 0.018 75)"
          r="24"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill="oklch(58% 0.12 45)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="1.5"
          textAnchor="middle"
          x="340"
          y="98"
        >
          SHIP
        </text>
        <text
          dominantBaseline="middle"
          fill="oklch(20% 0.05 255)"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="7"
          opacity="0.5"
          textAnchor="middle"
          x="340"
          y="110"
        >
          deploy
        </text>
      </g>

      {/* ── foot annotation ── */}
      <text
        fill="oklch(20% 0.05 255)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8.5"
        letterSpacing="1.5"
        opacity="0.2"
        textAnchor="end"
        x="416"
        y="392"
      >
        quartic lab · researcher in session
      </text>
    </svg>
  );
}

function AboutSection({ router }) {
  return (
    <section className={styles.about}>
      <div className={`${styles.container} ${styles.aboutInner}`}>
        <div className={`${styles.aboutText} ${styles.reveal}`}>
          <span className={styles.sectionTag}>About Quartic Lab</span>
          <h2 className={styles.sectionTitle}>
            A senior team that embeds like in-house engineers
          </h2>
          <p className={styles.aboutDesc}>
            Founded in 2020, Quartic Lab is a full-service software agency
            shipping web, mobile, and AI products for clients across the US,
            Europe, and MENA. We work in 2-week sprints with weekly demos,
            deliver 12-hour estimates on every new brief, and back every launch
            with 30 days of free support.
          </p>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push("/about")}
          >
            Learn more
          </button>
        </div>
        <div className={`${styles.aboutVisual} ${styles.reveal}`}>
          <AboutDoodle />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImgWrap}>
        {p.image ? (
          <Image
            alt={`${p.title}${
              p.types?.length ? ` — ${p.types[0]} project` : ""
            } by Quartic Lab`}
            className={styles.projectImg}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            src={p.image}
          />
        ) : (
          <div className={styles.projectImgPlaceholder} />
        )}
      </div>
      <div className={styles.projectBody}>
        <h3 className={styles.projectTitle}>{p.title}</h3>
        <p className={styles.projectDesc}>{p.desc}</p>
      </div>
    </div>
  );
}

const CAROUSEL_VISIBLE = 2;
const CAROUSEL_STEP = 2;

function ProjectsSection({ projects, projectsError }) {
  const router = useRouter();
  const total = projects.length;

  // Build looped array: [lastN clones, ...real, firstN clones]
  const looped =
    total > 0
      ? [
          ...projects.slice(-CAROUSEL_VISIBLE),
          ...projects,
          ...projects.slice(0, CAROUSEL_VISIBLE),
        ]
      : [];

  // idx starts at CAROUSEL_VISIBLE = first real slide
  const [idx, setIdx] = useState(CAROUSEL_VISIBLE);
  const [noTransition, setNoTransition] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-advance — just keep incrementing; clone detection handles wrap
  useEffect(() => {
    if (!total || total <= CAROUSEL_VISIBLE) {
      return;
    }
    if (paused) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setIdx(i => i + CAROUSEL_STEP);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [paused, total]);

  // After instant-jump render, re-enable transition on the next paint
  useEffect(() => {
    if (!noTransition) {
      return;
    }
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setNoTransition(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [noTransition]);

  // When CSS transition ends, detect clone zone and teleport seamlessly
  const handleTransitionEnd = () => {
    if (idx >= total + CAROUSEL_VISIBLE) {
      setNoTransition(true);
      setIdx(CAROUSEL_VISIBLE);
    } else if (idx < CAROUSEL_VISIBLE) {
      setNoTransition(true);
      setIdx(total);
    }
  };

  const prev = () => setIdx(i => i - CAROUSEL_STEP);
  const next = () => setIdx(i => i + CAROUSEL_STEP);

  const translateX = `translateX(calc(-${idx} * (100% / ${CAROUSEL_VISIBLE})))`;

  const dotCount = Math.ceil(total / CAROUSEL_STEP);
  const realIdx = (((idx - CAROUSEL_VISIBLE) % total) + total) % total;
  const activeDot = Math.floor(realIdx / CAROUSEL_STEP) % dotCount;

  return (
    <section className={styles.projectsSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Portfolio</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Selected work
          </h2>
        </div>
        {projectsError ? (
          <p style={{ color: "#ef5350", textAlign: "center" }}>
            Unable to load projects right now. Please try again later.
          </p>
        ) : (
          <>
            <div
              aria-label="Selected projects"
              aria-roledescription="carousel"
              className={styles.projectCarousel}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              role="region"
            >
              <div
                className={styles.projectTrack}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: translateX,
                  transition: noTransition ? "none" : undefined,
                }}
              >
                {looped.map((p, i) => {
                  const isClone =
                    i < CAROUSEL_VISIBLE || i >= total + CAROUSEL_VISIBLE;
                  return (
                    <div
                      aria-hidden={isClone || undefined}
                      className={styles.projectSlide}
                      key={i}
                    >
                      <ProjectCard p={p} />
                    </div>
                  );
                })}
              </div>
            </div>

            {total > CAROUSEL_VISIBLE && (
              <div className={styles.carouselControls}>
                <button
                  aria-label="Previous projects"
                  className={styles.carouselBtn}
                  onClick={prev}
                >
                  &#8592;
                </button>
                <div className={styles.carouselDots}>
                  {Array.from({ length: dotCount }, (_, i) => (
                    <button
                      aria-label={`Go to page ${i + 1}`}
                      className={`${styles.dot} ${
                        i === activeDot ? styles.dotActive : ""
                      }`}
                      key={i}
                      onClick={() =>
                        setIdx(CAROUSEL_VISIBLE + i * CAROUSEL_STEP)
                      }
                    />
                  ))}
                </div>
                <button
                  aria-label="Next projects"
                  className={styles.carouselBtn}
                  onClick={next}
                >
                  &#8594;
                </button>
              </div>
            )}
          </>
        )}
        <div className={styles.servicesCta}>
          <button
            className={styles.btnOutline}
            onClick={() => router.push("/projects")}
          >
            View all projects
          </button>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, delay }) {
  const isFloat = !Number.isInteger(stat.target);
  // SSR renders the final target value so crawlers and no-JS users
  // see "50+ Projects completed", not "0+". The scroll-into-view
  // count-up animation (below) is progressive enhancement only.
  const [count, setCount] = useState(stat.target);
  const ref = useRef(null);
  const started = useRef(false);
  const Icon = stat.Icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            if (!started.current) {
              started.current = true;
              const duration = 2000;
              const target = stat.target;
              const startTime = performance.now();
              const tick = now => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(
                  isFloat
                    ? +(target * eased).toFixed(1)
                    : Math.floor(target * eased),
                );
                if (progress < 1) {
                  requestAnimationFrame(tick);
                }
              };
              requestAnimationFrame(tick);
            }
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles.statCard} ${styles.statReveal}`}
      ref={ref}
      style={{ transitionDelay: delay }}
    >
      <div className={styles.statRing} style={{ borderColor: stat.accent }}>
        <span className={styles.statIcon} style={{ color: stat.accent }}>
          {Icon && <Icon />}
        </span>
      </div>
      <span className={styles.statValue} style={{ color: stat.accent }}>
        {count}
        {stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
      <div className={styles.statBar} style={{ background: stat.accent }} />
    </div>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSec}>
      <div className={styles.statsBgDots} />
      <div className={styles.container}>
        <div className={styles.statsHeader}>
          <span className={styles.sectionTag}>Why Quartic Lab</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Numbers that speak for themselves
          </h2>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <StatCard delay={`${i * 120}ms`} key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = idx => {
    clearInterval(intervalRef.current);
    setActive(idx);
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section className={styles.testimonialsSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Testimonials</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            What clients say about us
          </h2>
        </div>
        <div className={styles.testimonialCarousel}>
          {testimonials.map((t, i) => (
            <div
              className={`${styles.testimonialCard} ${
                i === active ? styles.testimonialActive : ""
              }`}
              key={t.name}
            >
              <span aria-hidden="true" className={styles.testimonialQuoteMark}>
                &ldquo;
              </span>
              <div aria-label="5 stars" className={styles.testimonialStars}>
                {[1, 2, 3, 4, 5].map(s => (
                  <span className={styles.testimonialStar} key={s}>
                    ★
                  </span>
                ))}
              </div>
              <p className={styles.testimonialText}>{t.text}</p>
              <div className={styles.testimonialAuthor}>
                {t.avatarUrl || t.img ? (
                  <Image
                    alt={t.name}
                    className={styles.testimonialAvatar}
                    height={48}
                    src={t.avatarUrl || t.img}
                    width={48}
                  />
                ) : (
                  <div className={styles.testimonialAvatarFallback}>
                    {t.name ? t.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
                <div className={styles.testimonialAuthorInfo}>
                  <span className={styles.testimonialName}>{t.name}</span>
                  {t.position && (
                    <span className={styles.testimonialPosition}>
                      {t.position}
                    </span>
                  )}
                </div>
                {t.companyLogoUrl ? (
                  <Image
                    alt={t.company || "Company logo"}
                    className={styles.testimonialCompanyLogo}
                    height={28}
                    src={t.companyLogoUrl}
                    width={80}
                  />
                ) : (
                  t.company && (
                    <span className={styles.testimonialCompanyBadge}>
                      {t.company}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          aria-label="Testimonial navigation"
          className={styles.testimonialDots}
          role="tablist"
        >
          {testimonials.map((t, i) => (
            <button
              aria-current={i === active ? "true" : undefined}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              className={`${styles.dot} ${
                i === active ? styles.dotActive : ""
              }`}
              key={t.name}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechSection() {
  const allLogos = techCategories.flatMap(cat => cat.items);
  const track = allLogos.map(t => (
    <div className={styles.techItem} key={t.name}>
      <div className={styles.techItemIconWrap}>
        <Image
          alt={t.name}
          className={styles.techItemIcon}
          height={48}
          src={t.src}
          style={{ height: "auto", maxHeight: "48px", width: "auto" }}
          width={48}
        />
      </div>
      <span className={styles.techItemLabel}>{t.name}</span>
    </div>
  ));
  return (
    <section className={styles.techSec}>
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
          Technologies we work with
        </h2>
      </div>
      <div className={styles.techMarquee}>
        <div className={styles.techTrack}>{track}</div>
        <div aria-hidden="true" className={styles.techTrack}>
          {track}
        </div>
      </div>
    </section>
  );
}

/* ── data fetching — SSR (testimonials from Firestore) ── */

export async function getServerSideProps() {
  // ── projects ───────────────────────────────────
  let projects = [];
  let projectsError = false;
  try {
    const pData = await getAllProjects();
    const seen = new Set();
    projects = (pData || [])
      .filter(p => p.is_active !== false)
      .map(p => ({
        title: p.title || "",
        desc: p.desc || p.description || "",
        types: Array.isArray(p.types) ? p.types : p.type ? [p.type] : [],
        image: p.image_url || p.image || p.imageUrl || p.img || null,
        order: Number(p.order_no ?? p.order ?? 0),
      }))
      // Dedupe by case-insensitive title so any data entry with the same
      // project added twice (audit A2) never reaches the carousel.
      .filter(p => {
        const key = p.title.trim().toLowerCase();
        if (!key || seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      })
      .sort((a, b) =>
        a.order === b.order
          ? a.title.localeCompare(b.title)
          : a.order - b.order,
      )
      .slice(0, 10);
  } catch (_) {
    projectsError = true;
  }
  // ── services ────────────────────────────────────
  let services = [];
  let servicesError = false;
  try {
    const svcData = await getAllServices();
    services = (svcData || [])
      .filter(svc => svc.is_active !== false)
      .map(svc => {
        const title = svc.title || "";
        const desc = svc.desc || svc.description || "";
        const order = Number(svc.order_no ?? svc.order ?? 0);
        const slug = svc.slug || slugMap[title] || "";
        const href = slug ? `/services/${slug}` : "/services";
        return { title, desc, order, href, slug };
      })
      .sort((a, b) =>
        a.order === b.order
          ? a.title.localeCompare(b.title)
          : a.order - b.order,
      )
      .slice(0, 8);
  } catch (_) {
    servicesError = true;
  }

  // ── testimonials ─────────────────────────────────
  try {
    const data = await getAllReviews();
    const testimonials = (data || [])
      .filter(r => r.is_active !== false)
      .map(r => ({
        name: r.name || "",
        text: r.text || r.review || r.desc || "",
        avatarUrl: r.avatar_url || r.avatar || r.img || r.image || null,
        company: r.company || "",
        companyLogoUrl: r.company_logo_url || null,
        position: r.position || "",
        order: Number(r.order_no ?? r.order ?? 0),
      }))
      .sort((a, b) =>
        a.order === b.order ? a.name.localeCompare(b.name) : a.order - b.order,
      );

    if (!testimonials.length) {
      return {
        props: {
          projects,
          projectsError,
          services,
          servicesError,
          testimonials: defaultTestimonials,
        },
      };
    }
    return {
      props: { projects, projectsError, services, servicesError, testimonials },
    };
  } catch (_) {
    return {
      props: {
        projects,
        projectsError,
        services,
        servicesError,
        testimonials: defaultTestimonials,
      },
    };
  }
}

function InlineAlert({ children, onClose, severity = "info" }) {
  const palette =
    severity === "success"
      ? { bg: "#e7f3ec", border: "#4caf50", fg: "#1b5e20" }
      : severity === "error"
        ? { bg: "#fdecea", border: "#d32f2f", fg: "#611a15" }
        : { bg: "#e8f4fd", border: "#2196f3", fg: "#0d3c61" };
  return (
    <div
      role="alert"
      style={{
        alignItems: "flex-start",
        background: palette.bg,
        borderLeft: `4px solid ${palette.border}`,
        borderRadius: 3,
        color: palette.fg,
        display: "flex",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        gap: 12,
        justifyContent: "space-between",
        lineHeight: 1.5,
        marginBottom: 16,
        padding: "12px 14px",
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
      {onClose && (
        <button
          aria-label="Dismiss"
          onClick={onClose}
          style={{
            background: "transparent",
            border: 0,
            color: palette.fg,
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            opacity: 0.7,
            padding: 0,
          }}
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    contact: "",
    country: "",
    description: "",
    email: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "contact" && isNaN(value)) {
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!form.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.description.trim()) {
      errs.description = "Please describe your project.";
    }
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setAlertMsg(null);
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitContactForm({
        country: form.country,
        description: form.description,
        email: form.email,
        name: form.name,
        phone: form.contact,
      });
      setAlertMsg({
        message: "Thanks! We\u2019ll get back to you within 24 hours.",
        severity: "success",
      });
      setForm({
        contact: "",
        country: "Pakistan",
        description: "",
        email: "",
        name: "",
      });
    } catch {
      setAlertMsg({
        message:
          "Something went wrong. Please email us directly at " +
          "hello@quarticlab.com",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSec} id="contact">
      <div className={`${styles.container} ${styles.contactInner}`}>
        <div className={`${styles.contactInfo} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Start your project</span>
          <h2 className={styles.sectionTitle}>
            Get a scope, timeline, and cost breakdown in 12 hours.
          </h2>
          <p className={styles.contactDesc}>
            Share a few details about your idea. A senior engineer (not a sales
            rep) will respond within 4 hours with next steps.
          </p>
        </div>
        <form
          className={`${styles.contactForm} ${styles.reveal}`}
          onSubmit={handleSubmit}
        >
          {alertMsg && (
            <InlineAlert
              onClose={() => setAlertMsg(null)}
              severity={alertMsg.severity}
            >
              {alertMsg.message}
            </InlineAlert>
          )}
          <div className={styles.formRow}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <input
                className={styles.formInput}
                name="name"
                onChange={handleChange}
                placeholder="Your Name"
                type="text"
                value={form.name}
              />
              {errors.name && (
                <p
                  style={{
                    color: "#d32f2f",
                    fontSize: "12px",
                    margin: "4px 0 0",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <input
                className={styles.formInput}
                name="email"
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                value={form.email}
              />
              {errors.email && (
                <p
                  style={{
                    color: "#d32f2f",
                    fontSize: "12px",
                    margin: "4px 0 0",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className={styles.formRow}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <CountrySelect
                id="landing-country"
                name="country"
                onChange={handleChange}
                value={form.country}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <input
                className={styles.formInput}
                name="contact"
                onChange={handleChange}
                placeholder="Phone Number"
                type="text"
                value={form.contact}
              />
            </div>
          </div>
          <textarea
            className={styles.formTextarea}
            name="description"
            onChange={handleChange}
            placeholder="Tell us about your project..."
            rows={5}
            value={form.description}
          />
          {errors.description && (
            <p
              style={{
                color: "#d32f2f",
                fontSize: "12px",
                margin: "-14px 0 10px",
              }}
            >
              {errors.description}
            </p>
          )}
          <button
            className={styles.btnPrimary}
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
