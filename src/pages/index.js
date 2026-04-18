import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/router";
import QuarticMark from "@component/Components/CommonComponents/QuarticMark";
import HS3Img from "../../public/assets/HomeIcons/HS3Img.svg";
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
import ArduinoIcon from "../../public/assets/serviceIcons/arduinoIcon.svg";
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
import OpenClawIcon from "../../public/assets/serviceIcons/openclaw.svg";
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
import Alert from "@mui/material/Alert";
import CountrySelect from "@component/Components/CommonComponents/CountrySelect/CountrySelect";
import {
  getAllProjects,
  getAllReviews,
  getAllServices,
  submitContactForm,
} from "@component/firebase/firebaseRequests";
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

const techLogos = [
  { name: "React", src: ReactIcon },
  { name: "Next.js", src: NextIcon },
  { name: "Node.js", src: NodeIcon },
  { name: "TypeScript", src: TypeScriptIcon },
  { name: "Python", src: PythonIcon },
  { name: "Vue.js", src: VueIcon },
  { name: "Angular", src: AngularIcon },
  { name: "NestJS", src: NestIcon },
  { name: "GraphQL", src: GraphQLIcon },
  { name: "TailwindCSS", src: TailwindIcon },
  { name: "Three.js", src: ThreeJSIcon },
  { name: "Flutter", src: FlutterIcon },
  { name: "Swift", src: SwiftIcon },
  { name: "TensorFlow", src: TensorFlowIcon },
  { name: "PyTorch", src: PyTorchIcon },
  { name: "OpenAI", src: OpenAIIcon },
  { name: "LangChain", src: LangChainIcon },
  { name: "LangFlow", src: LangFlowIcon },
  { name: "HuggingFace", src: HuggingFaceIcon },
  { name: "Anthropic", src: AnthropicIcon },
  { name: "CrewAI", src: CrewAIIcon },
  { name: "Dify", src: DifyIcon },
  { name: "n8n", src: N8nIcon },
  { name: "OpenClaw", src: OpenClawIcon },
  { name: "Make", src: MakeIcon },
  { name: "Zapier", src: ZapierIcon },
  { name: "Ollama", src: OllamaIcon },
  { name: "Solidity", src: EthIcon },
  { name: "Solana", src: SolanaIcon },
  { name: "AWS", src: AWSIcon },
  { name: "Azure", src: AzureIcon },
  { name: "GCP", src: GCloudIcon },
  { name: "Docker", src: DockerIcon },
  { name: "Kubernetes", src: KubernetesIcon },
  { name: "Firebase", src: FirebaseIcon },
  { name: "MongoDB", src: MongoIcon },
  { name: "PostgreSQL", src: PostgresIcon },
  { name: "Redis", src: RedisIcon },
  { name: "Figma", src: FigmaIcon },
  { name: "Blender", src: BlenderIcon },
  { name: "Unity", src: UnityIcon },
  { name: "Arduino", src: ArduinoIcon },
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

const stats = [
  {
    target: 412,
    suffix: "+",
    label: "Projects completed",
    icon: "",
    accent: "var(--ql-copper)",
  },
  {
    target: 682,
    suffix: "+",
    label: "Positive reviews",
    icon: "",
    accent: "var(--ql-copper)",
  },
  {
    target: 95,
    suffix: "+",
    label: "Team members",
    icon: "",
    accent: "var(--ql-copper)",
  },
  {
    target: 3.5,
    suffix: "M$",
    label: "Funding raised",
    icon: "",
    accent: "var(--ql-copper)",
  },
  {
    target: 99,
    suffix: "%",
    label: "Client satisfaction",
    icon: "",
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

/* ── page ────────────────────────────────────────── */

export default function LandingPage({
  projects = [],
  projectsError = false,
  services = [],
  servicesError = false,
  testimonials = defaultTestimonials,
}) {
  const router = useRouter();
  useReveal(`.${styles.reveal}`);

  return (
    <div className={styles.page}>
      <Head>
        <title>Quartic Lab | AI, Blockchain &amp; Software Development</title>
        <meta
          content="Quartic Lab builds instruments for people who build instruments. Four tools — data, inference, simulation, interface — joined end-to-end."
          name="description"
        />
      </Head>
      <Script
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="lazyOnload"
      />

      {/* ─── HERO ─────────────────────────────── */}
      <HeroSection router={router} />

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

function HeroSection({ router }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <span className={styles.heroBadge}>Quartic Lab</span>
          <h1 className={styles.heroH1}>
            We build <span className={styles.heroAccent}>instruments</span> for
            people who build instruments.
          </h1>
          <p className={styles.heroSub}>
            Four tools — data, inference, simulation, interface — joined
            end-to-end. One research environment for teams that ship.
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
              Start a project
            </button>
            <button
              className={styles.btnOutline}
              onClick={() => router.push("/projects")}
            >
              View our work
            </button>
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
            <QuarticMark size={260} />
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
          <span className={styles.sectionTag}>What we do</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Everything your business needs
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
                <div
                  className={`${styles.serviceCard} ${styles.reveal}`}
                  key={s.title}
                  onClick={() => router.push(s.href)}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className={styles.serviceIconWrap}>
                    <Icon size={56} />
                  </div>
                  <h3 className={styles.serviceCardTitle}>{s.title}</h3>
                  <p className={styles.serviceCardDesc}>{s.desc}</p>
                  <span className={styles.serviceLink}>Learn more →</span>
                </div>
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

function AboutSection({ router }) {
  return (
    <section className={styles.about}>
      <div className={`${styles.container} ${styles.aboutInner}`}>
        <div className={`${styles.aboutText} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Who we are</span>
          <h2 className={styles.sectionTitle}>
            Precisely engineered software, shipped on time
          </h2>
          <p className={styles.aboutDesc}>
            Quartic Lab is a research-driven studio that turns ideas into
            production-grade platforms. We combine deep expertise in AI,
            blockchain, IoT and full-stack engineering with a transparent,
            milestone-based process. One team, four disciplines, zero guesswork.
          </p>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push("/aboutus")}
          >
            Learn more
          </button>
        </div>
        <div className={`${styles.aboutVisual} ${styles.reveal}`}>
          <Image
            alt="About Quartic Lab"
            className={styles.aboutImg}
            quality={100}
            src={HS3Img}
          />
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
            alt={p.title}
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
              className={styles.projectCarousel}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className={styles.projectTrack}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: translateX,
                  transition: noTransition ? "none" : undefined,
                }}
              >
                {looped.map((p, i) => (
                  <div className={styles.projectSlide} key={i}>
                    <ProjectCard p={p} />
                  </div>
                ))}
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

function useCountUp(target, isFloat, duration = 2000) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) {
      return;
    }
    started.current = true;
    const startTime = performance.now();
    const tick = now => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(
        isFloat ? +(target * eased).toFixed(1) : Math.floor(target * eased),
      );
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  return [value, start];
}

function StatCard({ stat, delay }) {
  const isFloat = !Number.isInteger(stat.target);
  const [count, startCount] = useCountUp(stat.target, isFloat);
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
            e.target.classList.add(styles.visible);
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
      className={`${styles.statCard} ${styles.statReveal}`}
      ref={ref}
      style={{ transitionDelay: delay }}
    >
      <div className={styles.statGlow} style={{ background: stat.accent }} />
      <div className={styles.statRing} style={{ borderColor: stat.accent }}>
        <span className={styles.statIcon}>{stat.icon}</span>
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
              {(t.companyLogoUrl || t.company) && (
                <div className={styles.testimonialCompanyTop}>
                  {t.companyLogoUrl && (
                    <Image
                      alt={t.company}
                      className={styles.testimonialCompanyLogoTop}
                      height={28}
                      src={t.companyLogoUrl}
                      width={56}
                    />
                  )}
                  <span className={styles.testimonialCompanyNameTop}>
                    {t.company}
                  </span>
                </div>
              )}
              <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
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
              </div>
            </div>
          ))}
        </div>
        <div className={styles.testimonialDots}>
          {testimonials.map((t, i) => (
            <button
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
  const track = techLogos.map(t => (
    <div className={styles.techItem} key={t.name}>
      <div className={styles.techItemIconWrap}>
        <Image
          alt={t.name}
          className={styles.techItemIcon}
          height={48}
          src={t.src}
          style={{ width: "auto", height: "auto", maxHeight: "48px" }}
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
    projects = (pData || [])
      .filter(p => p.is_active !== false)
      .map(p => ({
        title: p.title || "",
        desc: p.desc || p.description || "",
        types: Array.isArray(p.types) ? p.types : p.type ? [p.type] : [],
        image: p.image_url || p.image || p.imageUrl || p.img || null,
        order: Number(p.order_no ?? p.order ?? 0),
      }))
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
          <span className={styles.sectionTag}>Get in touch</span>
          <h2 className={styles.sectionTitle}>
            Let&apos;s build something together
          </h2>
          <p className={styles.contactDesc}>
            Have a project in mind? Fill out the form and our team will get back
            to you within 24 hours.
          </p>
          <div className={styles.contactHighlights}>
            <div className={styles.contactHighlight}>
              <span className={styles.contactHighlightIcon}>⚡</span>
              <span>24hr Response Time</span>
            </div>
            <div className={styles.contactHighlight}>
              <span className={styles.contactHighlightIcon}>🛡️</span>
              <span>NDA Protected</span>
            </div>
            <div className={styles.contactHighlight}>
              <span className={styles.contactHighlightIcon}>💬</span>
              <span>Free Consultation</span>
            </div>
          </div>
        </div>
        <form
          className={`${styles.contactForm} ${styles.reveal}`}
          onSubmit={handleSubmit}
        >
          {alertMsg && (
            <Alert
              onClose={() => setAlertMsg(null)}
              severity={alertMsg.severity}
              sx={{ mb: 2 }}
            >
              {alertMsg.message}
            </Alert>
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
            <CountrySelect
              id="landing-country"
              name="country"
              onChange={handleChange}
              value={form.country}
            />
            <input
              className={styles.formInput}
              name="contact"
              onChange={handleChange}
              placeholder="Phone Number"
              type="text"
              value={form.contact}
            />
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
