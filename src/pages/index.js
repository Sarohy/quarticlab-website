import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import ClientSvg1 from "../../public/assets/HomeIcons/clients/nick-angelov.png";
import ClientSvg2 from "../../public/assets/HomeIcons/clients/theresa.png";
import ClientSvg3 from "../../public/assets/HomeIcons/clients/rishi.png";
import ClientSvg4 from "../../public/assets/HomeIcons/clients/anton.png";
import ClientSvg5 from "../../public/assets/HomeIcons/clients/tony-malik.png";
import ClientSvg6 from "../../public/assets/HomeIcons/clients/tommy.png";
import {
  SERVICE_ICON_BY_SLUG,
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
import {
  getAllProjects,
  getAllReviews,
  getAllServices,
  submitContactForm,
} from "@component/firebase/firebaseRequests";
import { hasFunctionalConsent, useConsent } from "@component/utils/consent";
import COUNTRIES from "@component/utils/countries";
import styles from "../styles/landing.module.css";
import { SITE_URL } from "@component/utils/siteUrl";

/* ── data ────────────────────────────────────────── */

const slugMap = {
  "Web Development": "web-development",
  "Blockchain Development": "blockchain-development",
  "Mobile App Development": "mobile-app-development",
  "UI/UX Development": "uiux-development",
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

/* ── faq data ──────────────────────────────────────── */
const HOME_FAQS = [
  {
    a:
      "Quartic Lab is a full-stack software agency. We build AI, web, and" +
      " mobile products end-to-end for startups and enterprises \u2014 from" +
      " agentic AI automation to production Next.js apps to native" +
      " iOS/Android. One senior team, zero handoff overhead.",
    q: "What does Quartic Lab do?",
  },
  {
    a:
      "A scoped MVP ships in 6 to 12 weeks. The first two weeks are" +
      " scoping, architecture, and design. Weeks 3\u20138 are build and" +
      " internal QA. The final 2\u20134 weeks are user testing, polish, and" +
      " production deploy. Multi-product or AI-heavy MVPs trend toward" +
      " 10\u201314 weeks.",
    q: "How long does it take to ship an MVP with Quartic Lab?",
  },
  {
    a:
      "Dedicated pods start at $12,000 per month for a 4-person senior" +
      " team (engineer lead + two full-stack + one designer or MLOps)." +
      " Pods are billed weekly against fixed-scope sprints \u2014 not by the" +
      " hour \u2014 so you know the cost before the work starts.",
    q: "What does an outsourced product team from Quartic Lab cost?",
  },
  {
    a:
      "We\u2019re based in Lahore, Pakistan, and we run a daily 4\u20135 hour" +
      " overlap window with US East Coast clients (8\u202fPM\u20131\u202fAM PKT) and" +
      " full overlap with EU markets. Every pod has at least one engineer" +
      " who runs the overlap window for sync calls, code review, and demos.",
    q: "Where is Quartic Lab based and which time zones do you cover?",
  },
  {
    a:
      "Freelancers handle assigned tickets; we own outcomes. Every Quartic" +
      " Lab pod has a dedicated PM, in-house QA, and code review baked in" +
      " \u2014 so you set the deadline and the deliverable, and we own" +
      " everything between. Most clients who switch from freelancers to us" +
      " report 2\u20133\u00d7 more shipped functionality per dollar.",
    q:
      "How is Quartic Lab different from Upwork freelancers or a typical" +
      " offshore agency?",
  },
];

/* ── hero copy ──────────────────────────────────────── */
const HERO_KICKER =
  "FULL-STACK SOFTWARE AGENCY · EST. 2020 · LAHORE → WORLDWIDE";
const HERO_STRIP = [
  "50+ PROJECTS SHIPPED",
  "12H ESTIMATES",
  "2-WEEK SPRINTS",
  "30D FREE SUPPORT",
];

/* ── how we work (process) ──────────────────────────── */
const PROCESS_STEPS = [
  {
    num: "NODE 01 — DESIGN",
    lead: "Scope it like it’s ",
    em: "ours.",
    desc:
      "A senior engineer — not a sales rep — reads your brief and returns a" +
      " scope, timeline, and cost breakdown within 12 hours. Weeks one and two" +
      " cover architecture, design, and the sprint plan.",
    rows: [
      ["Estimate turnaround", "12 hours"],
      ["First response", "< 4 hours"],
      ["Deliverable", "scope · timeline · cost"],
    ],
  },
  {
    num: "NODE 02 — BUILD",
    lead: "Two-week sprints, ",
    em: "weekly demos.",
    desc:
      "Fixed-scope sprints billed weekly — not by the hour — so the cost is" +
      " known before work begins. Every Friday you see a working demo, not a" +
      " status report.",
    rows: [
      ["Sprint length", "2 weeks"],
      ["Demo cadence", "every Friday"],
      ["Billing", "fixed-scope, weekly"],
    ],
  },
  {
    num: "NODE 03 — SHIP",
    lead: "Production is the ",
    em: "finish line.",
    desc:
      "In-house QA, code review, and a dedicated PM are baked into every pod." +
      " A scoped MVP ships in 6–12 weeks; AI-heavy builds trend toward" +
      " 10–14.",
    rows: [
      ["MVP timeline", "6–12 weeks"],
      ["QA & review", "built into the pod"],
      ["Deploy", "production, not staging"],
    ],
  },
  {
    num: "NODE 04 — SCALE",
    lead: "We stay after ",
    em: "launch.",
    desc:
      "Every launch is backed by 30 days of free support, with a daily overlap" +
      " window for US East Coast and full EU coverage for syncs, reviews, and" +
      " demos.",
    rows: [
      ["Post-launch support", "30 days free"],
      ["US overlap", "4–5 h daily"],
      ["EU overlap", "full day"],
    ],
  },
];

/* ── page ────────────────────────────────────────── */

export default function LandingPage({
  projects = [],
  projectsError = false,
  services = [],
  servicesError = false,
  testimonials = defaultTestimonials,
}) {
  const consent = useConsent();
  const functionalOk = hasFunctionalConsent(consent);
  useReveal(`.${styles.reveal}`);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: HOME_FAQS.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

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
      <Seo
        canonical={`${SITE_URL}/`}
        description="Quartic Lab is a full-stack software agency. We build AI, web, and mobile products for startups and enterprises. Ship faster with one senior team."
        ogDescription="Full-stack software agency for startups & enterprises. AI, web, mobile."
        ogImage={`${SITE_URL}/og-image.png`}
        ogImageHeight="630"
        ogImageWidth="1200"
        ogTitle="Quartic Lab — Software that ships. Teams that stay."
        robots="index, follow"
        title="Quartic Lab — Software agency for startups &amp; enterprises"
        twitterDescription="Full-stack software agency for startups & enterprises. AI, web, mobile."
        twitterTitle="Quartic Lab — Software that ships. Teams that stay."
      >
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          type="application/ld+json"
        />
      </Seo>
      {functionalOk && (
        <Script
          src="https://widget.clutch.co/static/js/widget.js"
          strategy="lazyOnload"
        />
      )}

      {/* ─── HERO ─────────────────────────────── */}
      <HeroSection />

      {/* ─── SERVICES ─────────────────────────── */}
      <ServicesSection services={services} servicesError={servicesError} />

      {/* ─── HOW WE WORK ──────────────────────── */}
      <ProcessSection />

      {/* ─── PROJECTS ─────────────────────────── */}
      <ProjectsSection projects={projects} projectsError={projectsError} />

      {/* ─── TECH ─────────────────────────────── */}
      <TechSection />
      {/* ─── STATS ────────────────────────────── */}
      <StatsSection />

      {/* ─── TESTIMONIALS ─────────────────────── */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ─── FAQ ──────────────────────────────── */}
      <FaqSection />

      {/* ─── CONTACT ──────────────────────────── */}
      <ContactSection />
    </div>
  );
}

/* ── sections ────────────────────────────────────── */

function HeroSection() {
  const canvasRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);

  /* ── node-network canvas ── */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) {
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ctx = cv.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const parent = cv.parentElement;
    const mouse = { x: -9999, y: -9999 };
    const INK = "rgba(35,42,62,";
    const COPPER = "rgba(166,106,56,";
    const LINK = 130;
    let W = 0;
    let H = 0;
    let pts = [];
    let raf = 0;
    let rT = null;
    let visible = true;

    const size = () => {
      const r = parent.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(90, Math.floor((W * H) / 16000));
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: 1.4 + Math.random() * 1.8,
        });
      }
    };
    size();

    const onResize = () => {
      clearTimeout(rT);
      rT = setTimeout(size, 200);
    };
    const onMove = e => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("resize", onResize);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    const io = new IntersectionObserver(es => {
      visible = es[0].isIntersecting;
    });
    io.observe(cv);

    if (reduced) {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        ctx.fillStyle = INK + "0.45)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
      });
    } else {
      const step = () => {
        raf = requestAnimationFrame(step);
        if (!visible) {
          return;
        }
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) {
            p.vx *= -1;
          }
          if (p.y < 0 || p.y > H) {
            p.vy *= -1;
          }
          const dxm = mouse.x - p.x;
          const dym = mouse.y - p.y;
          const dm = Math.hypot(dxm, dym);
          if (dm < 160 && dm > 0.001) {
            p.x += (dxm / dm) * 0.5;
            p.y += (dym / dm) * 0.5;
          }
        }
        for (let a = 0; a < pts.length; a++) {
          for (let b = a + 1; b < pts.length; b++) {
            const dx = pts[a].x - pts[b].x;
            const dy = pts[a].y - pts[b].y;
            const d = Math.hypot(dx, dy);
            if (d < LINK) {
              ctx.strokeStyle = COPPER + 0.4 * (1 - d / LINK) + ")";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(pts[a].x, pts[a].y);
              ctx.lineTo(pts[b].x, pts[b].y);
              ctx.stroke();
            }
          }
        }
        for (let j = 0; j < pts.length; j++) {
          const q = pts[j];
          ctx.fillStyle = INK + "0.55)";
          ctx.beginPath();
          ctx.arc(q.x, q.y, q.r, 0, 7);
          ctx.fill();
        }
      };
      step();
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rT);
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      io.disconnect();
    };
  }, []);

  /* ── scramble kicker ── */
  useEffect(() => {
    const el = kickerRef.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = HERO_KICKER;
      return;
    }
    const glyphs = "◆#/\\+×—·01";
    const total = 46;
    let frame = 0;
    let tid = null;
    const tick = () => {
      let out = "";
      for (let i = 0; i < HERO_KICKER.length; i++) {
        const threshold = (i / HERO_KICKER.length) * total * 0.8;
        out +=
          frame > threshold
            ? HERO_KICKER[i]
            : HERO_KICKER[i] === " "
              ? " "
              : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
      if (frame++ < total) {
        tid = setTimeout(tick, 34);
      } else {
        el.textContent = HERO_KICKER;
      }
    };
    tick();
    return () => clearTimeout(tid);
  }, []);

  /* ── char-split headline ── */
  useEffect(() => {
    const node = headlineRef.current;
    if (!node) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timers = [];
    const split = n => {
      Array.prototype.slice.call(n.childNodes).forEach(k => {
        if (k.nodeType === 3) {
          const frag = document.createDocumentFragment();
          // Split on whitespace but keep words intact: each word becomes a
          // nowrap inline-block so the per-char spans can never break mid-word.
          k.textContent.split(/(\s+)/).forEach(part => {
            if (!part) {
              return;
            }
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }
            const word = document.createElement("span");
            word.className = styles.heroWord;
            part.split("").forEach(c => {
              const s = document.createElement("span");
              s.className = styles.heroChar;
              s.textContent = c;
              word.appendChild(s);
            });
            frag.appendChild(word);
          });
          n.replaceChild(frag, k);
        } else if (k.nodeType === 1) {
          split(k);
        }
      });
    };
    split(node);
    node.querySelectorAll(`.${styles.heroChar}`).forEach((c, i) => {
      timers.push(
        setTimeout(() => c.classList.add(styles.heroCharIn), 350 + i * 26),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <header className={styles.hero}>
      <canvas aria-hidden="true" className={styles.heroNet} ref={canvasRef} />
      <div className={`${styles.container} ${styles.heroInner}`}>
        <span className={styles.heroKicker} ref={kickerRef}>
          &nbsp;
        </span>
        <h1 className={styles.heroH1} ref={headlineRef}>
          <span className={styles.heroLine}>
            Software that <em>ships.</em>
          </span>
          <span className={styles.heroLine}>
            Teams that <em>stay.</em>
          </span>
        </h1>
        <div className={styles.heroFoot}>
          <p className={styles.heroSub}>
            Web, mobile, and AI products for startups and enterprises —
            designed, built, and deployed by one senior team with zero handoff
            overhead.
          </p>
          <div className={styles.heroCtas}>
            <Link className={styles.btnHeroPrimary} href="/contact">
              Start a project <span className={styles.heroArr}>→</span>
            </Link>
            <Link className={styles.btnHeroOutline} href="/projects">
              View work
            </Link>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className={styles.heroStrip}>
        {HERO_STRIP.map(s => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </header>
  );
}

function ServicesSection({ services, servicesError }) {
  const [active, setActive] = useState(0);
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.servicesHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              Services
            </span>
            <h2 className={styles.servicesTitle}>
              Multiple disciplines. One team. <em>Zero handoff.</em>
            </h2>
          </div>
          <p className={`${styles.servicesLead} ${styles.reveal}`}>
            Every engagement runs through a single senior pod — strategy,
            design, engineering, and deployment under one roof. Select a
            discipline to expand it.
          </p>
        </div>
        {servicesError ? (
          <p style={{ color: "#b3261e", textAlign: "center" }}>
            Unable to load services right now. Please try again later.
          </p>
        ) : (
          <div className={`${styles.panels} ${styles.reveal}`}>
            {services.map((s, i) => {
              const num = String(i + 1).padStart(2, "0");
              const on = active === i;
              const Icon = SERVICE_ICON_BY_SLUG[s.slug] || WebDevIcon;
              return (
                <div
                  className={`${styles.panel} ${on ? styles.panelOn : ""}`}
                  key={s.title}
                >
                  <button
                    aria-expanded={on}
                    aria-label={`Expand ${s.title}`}
                    className={styles.pRail}
                    onClick={() => setActive(i)}
                    type="button"
                  >
                    <span className={styles.pIx}>{num}</span>
                    <span className={styles.pVt}>{s.title}</span>
                    <span className={styles.pDot} />
                  </button>
                  <div className={styles.pBody}>
                    <span className={styles.pIx2}>QL/{num}</span>
                    <div aria-hidden="true" className={styles.pVisual}>
                      <Icon size={132} />
                    </div>
                    <div className={styles.pContent}>
                      <h3 className={styles.pTitle}>{s.title}</h3>
                      <p className={styles.pDesc}>{s.desc}</p>
                      <Link className={styles.pLink} href={s.href}>
                        EXPLORE →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.servicesCta}>
          <Link className={styles.btnOutline} href="/services">
            Explore all services
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const secRef = useRef(null);
  const drawRef = useRef(null);
  const nodeRefs = useRef([]);
  const stepRefs = useRef([]);

  useEffect(() => {
    const sec = secRef.current;
    const draw = drawRef.current;
    if (!sec || !draw) {
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const LEN = 760;
    const thresholds = [0.16, 0.42, 0.68, 0.94];
    const ON = "oklch(48% 0.11 42)";
    const OFF_FILL = "#eee8dc";
    const OFF_STROKE = "oklch(20% 0.05 255)";
    draw.style.strokeDasharray = LEN;
    draw.style.strokeDashoffset = LEN;

    const upd = () => {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = (vh * 0.65 - r.top) / r.height;
      p = Math.max(0, Math.min(1, p));
      if (reduced) {
        p = 1;
      }
      draw.style.strokeDashoffset = LEN * (1 - p);
      nodeRefs.current.forEach((n, i) => {
        if (!n) {
          return;
        }
        const hit = p >= thresholds[i];
        n.setAttribute("fill", hit ? ON : OFF_FILL);
        n.setAttribute("stroke", hit ? ON : OFF_STROKE);
        const step = stepRefs.current[i];
        // Latch: once a step is revealed it stays fully readable (a11y --
        // never drop text back to the 0.25-opacity inactive state on scroll-up).
        if (step && hit) {
          step.classList.add(styles.pstepOn);
        }
      });
    };
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
    return () => {
      window.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
    };
  }, []);

  return (
    <section className={styles.process} id="process" ref={secRef}>
      <div className={styles.container}>
        <div className={styles.servicesHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              How we work
            </span>
            <h2 className={styles.servicesTitle}>
              Four nodes. <em>One line.</em>
            </h2>
          </div>
          <p className={`${styles.servicesLead} ${styles.reveal}`}>
            Our mark is four connected nodes — and so is every engagement. The
            line below draws itself as you scroll through the way we ship.
          </p>
        </div>
        <div className={styles.procGrid}>
          <div aria-hidden="true" className={styles.procLine}>
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 800">
              <line
                stroke="oklch(20% 0.05 255 / 0.14)"
                strokeWidth="1.5"
                x1="32"
                x2="32"
                y1="20"
                y2="780"
              />
              <line
                ref={drawRef}
                stroke="oklch(48% 0.11 42)"
                strokeWidth="1.5"
                x1="32"
                x2="32"
                y1="20"
                y2="780"
              />
              {[120, 320, 520, 720].map((cy, i) => (
                <circle
                  cx="32"
                  cy={cy}
                  fill="#eee8dc"
                  key={cy}
                  r="7"
                  ref={el => {
                    nodeRefs.current[i] = el;
                  }}
                  stroke="oklch(20% 0.05 255)"
                  strokeWidth="1.6"
                />
              ))}
            </svg>
          </div>
          <div className={styles.procSteps}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                className={styles.pstep}
                key={s.num}
                ref={el => {
                  stepRefs.current[i] = el;
                }}
              >
                <div>
                  <span className={styles.psNum}>{s.num}</span>
                  <h3 className={styles.psTitle}>
                    {s.lead}
                    <em>{s.em}</em>
                  </h3>
                  <p className={styles.psDesc}>{s.desc}</p>
                </div>
                <div className={styles.psCard}>
                  {s.rows.map(([label, val]) => (
                    <div className={styles.psRow} key={label}>
                      <span>{label}</span>
                      <b>{val}</b>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ projects, projectsError }) {
  const stackRef = useRef(null);
  const featured = projects.slice(0, 6);

  /* sticky-stacking: each card scales/dims as the next rises over it */
  useEffect(() => {
    const root = stackRef.current;
    if (!root) {
      return;
    }
    const cards = Array.prototype.slice.call(
      root.querySelectorAll(`.${styles.wcard}`),
    );
    if (!cards.length) {
      return;
    }
    const TOP = 100;
    cards.forEach((c, i) => {
      c.style.top = `${TOP + i * 16}px`;
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const upd = () => {
      cards.forEach((c, i) => {
        if (i === cards.length - 1) {
          return;
        }
        const next = cards[i + 1];
        const r = next.getBoundingClientRect();
        const myTop = TOP + i * 16;
        const rMe = c.getBoundingClientRect();
        if (rMe.top <= myTop + 1) {
          const t = Math.max(
            0,
            Math.min(1, (myTop + rMe.height - r.top) / rMe.height),
          );
          c.style.transform = `scale(${1 - t * 0.05})`;
          c.style.filter = `brightness(${1 - t * 0.25})`;
        } else {
          c.style.transform = "";
          c.style.filter = "";
        }
      });
    };
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
    return () => {
      window.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
    };
  }, [projects]);

  return (
    <section className={styles.work} id="work">
      <div className={styles.container}>
        <div className={styles.servicesHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              Selected work
            </span>
            <h2 className={styles.servicesTitle}>
              Built here. <em>Running out there.</em>
            </h2>
          </div>
          <p className={`${styles.servicesLead} ${styles.reveal}`}>
            A few of the 50+ products we&apos;ve taken from brief to production.
            Cards stack as you scroll.
          </p>
        </div>
        {projectsError ? (
          <p style={{ color: "#b3261e", textAlign: "center" }}>
            Unable to load projects right now. Please try again later.
          </p>
        ) : (
          <div className={styles.wstack} ref={stackRef}>
            {featured.length === 0 && (
              <p style={{ textAlign: "center", opacity: 0.7 }}>
                Selected work is on its way. Meanwhile, see the full portfolio.
              </p>
            )}
            {featured.map(p => (
              <article className={styles.wcard} key={p.title}>
                <div className={styles.shot}>
                  {p.image ? (
                    <Image
                      alt={`${p.title}${
                        p.types?.length ? ` — ${p.types[0]} project` : ""
                      } by Quartic Lab`}
                      className={styles.shotImg}
                      fill
                      sizes="(max-width: 900px) 100vw, 55vw"
                      src={p.image}
                    />
                  ) : (
                    <div className={styles.shotPlaceholder} />
                  )}
                </div>
                <div className={styles.wcBody}>
                  <span className={styles.wcTag}>
                    {p.types?.length ? p.types.join(" · ") : "Selected work"}
                  </span>
                  <h3 className={styles.wcTitle}>{p.title}</h3>
                  <p className={styles.wcDesc}>{p.desc}</p>
                  {p.types?.length > 0 && (
                    <div className={styles.wcMeta}>
                      {p.types.map(t => (
                        <div key={t}>
                          <b>{t}</b>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
        <div className={styles.workCta}>
          <Link className={styles.btnHeroPrimary} href="/projects">
            View all projects <span className={styles.heroArr}>→</span>
          </Link>
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
              if (
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ) {
                setCount(stat.target);
                obs.unobserve(e.target);
                return;
              }
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
        <div className={styles.servicesHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              Why Quartic Lab
            </span>
            <h2 className={styles.servicesTitle}>
              Numbers that <em>speak for themselves</em>
            </h2>
          </div>
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

function TestimonialCard({ hidden, t }) {
  const avatar = t.avatarUrl || t.img;
  return (
    <article aria-hidden={hidden || undefined} className={styles.tq}>
      <p className={styles.tqText}>{t.text}</p>
      <footer className={styles.tqFoot}>
        {avatar ? (
          <Image
            alt={hidden ? "" : t.name}
            className={styles.tqAvatar}
            height={38}
            src={avatar}
            width={38}
          />
        ) : (
          <span aria-hidden="true" className={styles.tqAvatarFallback}>
            {t.name ? t.name.charAt(0).toUpperCase() : "?"}
          </span>
        )}
        <div className={styles.tqWho}>
          <b>{t.name}</b>
          {t.position && <span>{t.position}</span>}
        </div>
        {t.company && <span className={styles.tqCo}>{t.company}</span>}
      </footer>
    </article>
  );
}

function MarqueeRow({ items, keyPrefix, reversed }) {
  return (
    <div className={`${styles.tmrow} ${reversed ? styles.tmrowRev : ""}`}>
      {items.map(t => (
        <TestimonialCard key={`${keyPrefix}-${t.name}`} t={t} />
      ))}
      {items.map(t => (
        <TestimonialCard hidden key={`${keyPrefix}-dup-${t.name}`} t={t} />
      ))}
    </div>
  );
}

function TestimonialsSection({ testimonials }) {
  const mid = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, mid);
  const rowBRaw = testimonials.slice(mid);
  const rowB = rowBRaw.length ? rowBRaw : rowA;

  return (
    <section className={styles.testimonialsSec} id="testimonials">
      <div className={styles.container}>
        <div className={styles.servicesHead}>
          <div className={styles.reveal}>
            <span className={styles.eyebrow}>
              <i />
              Testimonials
            </span>
            <h2 className={styles.servicesTitle}>
              In their <em>own words</em>
            </h2>
          </div>
        </div>
      </div>
      <div className={`${styles.tmwrap} ${styles.reveal}`}>
        <MarqueeRow items={rowA} keyPrefix="a" reversed={false} />
        <MarqueeRow items={rowB} keyPrefix="b" reversed />
      </div>
      <div className={styles.container}>
        <div
          aria-label="Clutch reviews"
          className={styles.clutchBadgeInline}
          role="group"
        >
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
    </section>
  );
}

const TECH_HIGHLIGHT = new Set([
  "Next.js",
  "TypeScript",
  "Python",
  "React Native",
  "Anthropic",
  "CrewAI",
  "AWS",
  "Kubernetes",
]);

const techNamesFor = labels =>
  techCategories
    .filter(c => labels.includes(c.label))
    .flatMap(c => c.items.map(it => it.name));

function TechRow({ names, reversed }) {
  const run = () =>
    names.map((n, i) => (
      <span key={`${n}-${i}`}>
        {TECH_HIGHLIGHT.has(n) ? <b>{n}</b> : n}
        {" · "}
      </span>
    ));
  return (
    <div className={styles.techMqBox}>
      <div className={`${styles.techMq} ${reversed ? styles.techMqRev : ""}`}>
        <span className={styles.techRun}>{run()}</span>
        <span aria-hidden="true" className={styles.techRun}>
          {run()}
        </span>
      </div>
    </div>
  );
}

function TechSection() {
  const row1 = techNamesFor(["Frontend", "Backend", "Mobile"]);
  const row2 = techNamesFor([
    "AI / ML",
    "Automation",
    "Blockchain",
    "Cloud & DevOps",
    "Data",
    "Creative",
  ]);
  return (
    <section aria-label="Technologies we work with" className={styles.techSec}>
      <div className={`${styles.container} ${styles.techHead}`}>
        <span className={`${styles.eyebrow} ${styles.reveal}`}>
          <i />
          Technologies we work with
        </span>
      </div>
      <TechRow names={row1} reversed={false} />
      <TechRow names={row2} reversed />
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

function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className={styles.faqSec} id="faq">
      <div className={styles.container}>
        <div className={styles.faqHead}>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>
            <i />
            FAQ
          </span>
          <h2 className={`${styles.servicesTitle} ${styles.reveal}`}>
            Common <em>questions</em>
          </h2>
        </div>
        <div className={styles.faqList}>
          {HOME_FAQS.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div
                className={`${styles.faqItem} ${
                  open ? styles.faqItemOpen : ""
                }`}
                key={faq.q}
              >
                <button
                  aria-controls={`home-faq-answer-${i}`}
                  aria-expanded={open}
                  className={styles.faqQuestion}
                  onClick={() => setOpenIdx(open ? null : i)}
                >
                  {faq.q}
                  <span aria-hidden="true" className={styles.faqIcon}>
                    +
                  </span>
                </button>
                <div
                  className={`${styles.faqAnswer} ${
                    open ? styles.faqAnswerOpen : ""
                  }`}
                  id={`home-faq-answer-${i}`}
                  role="region"
                >
                  <p className={styles.faqAnswerText}>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
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
          "contact@quarticlab.com",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSec} id="contact">
      <div className={`${styles.container} ${styles.ctaGrid}`}>
        <div className={`${styles.ctaInfo} ${styles.reveal}`}>
          <span className={styles.eyebrow}>
            <i />
            Start your project
          </span>
          <h2 className={styles.ctaTitle}>
            Get a scope, timeline, and cost breakdown in <em>12 hours.</em>
          </h2>
          <p className={styles.ctaLead}>
            Share a few details about your idea. A senior engineer — not a sales
            rep — responds within 4 hours with next steps.
          </p>
        </div>
        <form
          className={`${styles.cform} ${styles.reveal}`}
          onSubmit={handleSubmit}
        >
          {alertMsg && (
            <div className={styles.fldFull}>
              <InlineAlert
                onClose={() => setAlertMsg(null)}
                severity={alertMsg.severity}
              >
                {alertMsg.message}
              </InlineAlert>
            </div>
          )}
          <div className={styles.fld}>
            <label htmlFor="landing-name">Your name</label>
            <input
              aria-describedby={errors.name ? "landing-name-err" : undefined}
              aria-invalid={errors.name ? true : undefined}
              aria-required="true"
              className={styles.fldInput}
              id="landing-name"
              name="name"
              onChange={handleChange}
              type="text"
              value={form.name}
            />
            {errors.name && (
              <span className={styles.fldErr} id="landing-name-err">
                {errors.name}
              </span>
            )}
          </div>
          <div className={styles.fld}>
            <label htmlFor="landing-email">Email address</label>
            <input
              aria-describedby={errors.email ? "landing-email-err" : undefined}
              aria-invalid={errors.email ? true : undefined}
              aria-required="true"
              className={styles.fldInput}
              id="landing-email"
              name="email"
              onChange={handleChange}
              type="email"
              value={form.email}
            />
            {errors.email && (
              <span className={styles.fldErr} id="landing-email-err">
                {errors.email}
              </span>
            )}
          </div>
          <div className={styles.fld}>
            <label htmlFor="landing-country">Country</label>
            <select
              className={styles.fldSelect}
              id="landing-country"
              name="country"
              onChange={handleChange}
              value={form.country}
            >
              <option value="">Select country</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.fld}>
            <label htmlFor="landing-phone">Phone number</label>
            <input
              className={styles.fldInput}
              id="landing-phone"
              name="contact"
              onChange={handleChange}
              type="tel"
              value={form.contact}
            />
          </div>
          <div className={`${styles.fld} ${styles.fldFull}`}>
            <label htmlFor="landing-description">Project details</label>
            <textarea
              aria-describedby={
                errors.description ? "landing-description-err" : undefined
              }
              aria-invalid={errors.description ? true : undefined}
              aria-required="true"
              className={styles.fldTextarea}
              id="landing-description"
              name="description"
              onChange={handleChange}
              placeholder="What are you building, and what does done look like?"
              value={form.description}
            />
            {errors.description && (
              <span className={styles.fldErr} id="landing-description-err">
                {errors.description}
              </span>
            )}
          </div>
          <button
            className={`${styles.btnHeroPrimary} ${styles.cformBtn}`}
            disabled={submitting}
            type="submit"
          >
            {submitting ? (
              "Sending..."
            ) : (
              <>
                Send message <span className={styles.heroArr}>→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
