import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import HSLogo from "../../public/assets/HomeIcons/zweidevsLogo.svg";
import HS3Img from "../../public/assets/HomeIcons/HS3Img.svg";
import ClientSvg1 from "../../public/assets/HomeIcons/clients/nick-angelov.png";
import ClientSvg2 from "../../public/assets/HomeIcons/clients/theresa.png";
import ClientSvg3 from "../../public/assets/HomeIcons/clients/rishi.png";
import ClientSvg4 from "../../public/assets/HomeIcons/clients/anton.png";
import ClientSvg5 from "../../public/assets/HomeIcons/clients/tony-malik.png";
import ClientSvg6 from "../../public/assets/HomeIcons/clients/tommy.png";
import WebDevIcon from "../../public/assets/serviceIcons/webdevIcon.svg";
import BlockchainIcon from "../../public/assets/serviceIcons/blockchainIcon.svg";
import MobileDevIcon from "../../public/assets/serviceIcons/MobDevIcon.svg";
import UIUXIcon from "../../public/assets/serviceIcons/uiuxIcon.svg";
import GameDevIcon from "../../public/assets/serviceIcons/GameDevIcon.svg";
import IOTDevIcon from "../../public/assets/serviceIcons/IOTIcon.svg";
import AIDevIcon from "../../public/assets/serviceIcons/AIDevIcon.svg";
import DevopsIcon from "../../public/assets/serviceIcons/devopsIcon.svg";
import ArduinoIcon from "../../public/assets/serviceIcons/arduinoIcon.svg";
import AWSIcon from "../../public/assets/serviceIcons/AWS.svg";
import EthIcon from "../../public/assets/serviceIcons/ethIcon.svg";
import FlutterIcon from "../../public/assets/serviceIcons/Flutter.svg";
import KerasIcon from "../../public/assets/serviceIcons/kerasIcon.svg";
import NextIcon from "../../public/assets/serviceIcons/next.svg";
import NodeIcon from "../../public/assets/serviceIcons/node.svg";
import OpenAIIcon from "../../public/assets/serviceIcons/openAIIcon.svg";
import PostgresIcon from "../../public/assets/serviceIcons/postgres.svg";
import PythonIcon from "../../public/assets/serviceIcons/py.svg";
import ReactIcon from "../../public/assets/serviceIcons/react.svg";
import UnityIcon from "../../public/assets/serviceIcons/unityIcon.svg";
import {
  getAllProjects,
  getAllReviews,
  getAllServices,
} from "@component/firebase/firebaseRequests";
import { postAPIWithoutAuth } from "@component/pages/api/api";
import styles from "../styles/landing.module.css";

/* ── data ────────────────────────────────────────── */

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
  { name: "Python", src: PythonIcon },
  { name: "Solidity", src: EthIcon },
  { name: "Flutter", src: FlutterIcon },
  { name: "TensorFlow", src: KerasIcon },
  { name: "AWS", src: AWSIcon },
  { name: "PostgreSQL", src: PostgresIcon },
  { name: "OpenAI", src: OpenAIIcon },
  { name: "Unity", src: UnityIcon },
  { name: "Arduino", src: ArduinoIcon },
];

const defaultTestimonials = [
  {
    img: ClientSvg2,
    name: "Theresa",
    text: "Working with this fantastic team was an excellent experience. They excel at development and finding new solutions. Their expertise and talent are impressive.",
  },
  {
    img: ClientSvg3,
    name: "Rishi Sareen",
    text: "The team's exceptional communication resulted in the successful delivery of the project. It would be my pleasure to work with them again in the future.",
  },
  {
    img: ClientSvg1,
    name: "Nick Angelov",
    text: "Zweidevs met our expectations. They delivered the product that provided us with a high-quality base from which to move forward. Highly recommended!",
  },
  {
    img: ClientSvg4,
    name: "Anton Benz",
    text: "These developers were excellent to work with. I would definitely recommend them to anyone looking for great work, and I look forward to hiring them again.",
  },
  {
    img: ClientSvg5,
    name: "Tony Malik",
    text: "The Zweidevs team has extensive knowledge of the work, and after working with them for 5-6 months, they have become our go-to development company.",
  },
  {
    img: ClientSvg6,
    name: "Tommy Vacek",
    text: "Zweidevs' team did a fantastic job scoping our project. Their adaptability was impressive, and they always succeeded in exceeding our expectations.",
  },
];

const stats = [
  {
    target: 412,
    suffix: "+",
    label: "Projects Completed",
    icon: "🚀",
    accent: "#ff9700",
  },
  {
    target: 682,
    suffix: "+",
    label: "Positive Reviews",
    icon: "⭐",
    accent: "#ffc107",
  },
  {
    target: 95,
    suffix: "+",
    label: "Team Members",
    icon: "👥",
    accent: "#4fc3f7",
  },
  {
    target: 3.5,
    suffix: "M$",
    label: "Funding Raised",
    icon: "💰",
    accent: "#66bb6a",
  },
  {
    target: 99,
    suffix: "%",
    label: "Customer Satisfaction",
    icon: "❤️",
    accent: "#ef5350",
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
        <title>Zweidevs | AI, Blockchain &amp; Software Development</title>
        <meta
          content="Welcome to Zweidevs - Your Gateway to Digital Innovation. Explore our IT services, from web development and blockchain solutions to mobile app development and AI-powered solutions."
          name="description"
        />
      </Head>

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
          <span className={styles.heroBadge}>🚀 Software Development</span>
          <h1 className={styles.heroH1}>
            Build Smarter. Ship Faster.{" "}
            <span className={styles.heroAccent}>Own the Future.</span>
          </h1>
          <p className={styles.heroSub}>
            We deliver AI, Blockchain, IoT, and custom software solutions — from
            MVP to enterprise scale. Trusted by 50+ clients across 3 continents.
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
              Book a Free Call
            </button>
            <button
              className={styles.btnOutline}
              onClick={() => router.push("/projects")}
            >
              View Our Work →
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroLogoRing}>
            <Image
              alt="Zweidevs logo"
              className={styles.heroLogo}
              priority
              src={HSLogo}
            />
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
          <span className={styles.sectionTag}>What We Do</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Everything Your Business Needs
          </h2>
        </div>
        {servicesError ? (
          <p style={{ color: "#ef5350", textAlign: "center" }}>
            Unable to load services right now. Please try again later.
          </p>
        ) : (
          <div className={styles.servicesGrid}>
            {services.map((s, i) => {
              const icon = serviceIconMap[s.title] || WebDevIcon;
              return (
                <div
                  className={`${styles.serviceCard} ${styles.reveal}`}
                  key={s.title}
                  onClick={() => router.push(s.href)}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className={styles.serviceIconWrap}>
                    <Image
                      alt={s.title}
                      className={styles.serviceIcon}
                      height={56}
                      src={icon}
                      width={56}
                    />
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
            Explore All Services →
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
          <span className={styles.sectionTag}>Who We Are</span>
          <h2 className={styles.sectionTitle}>
            Work With Top Notch Designers &amp; Developers
          </h2>
          <p className={styles.aboutDesc}>
            Zweidevs is a service-oriented company providing creative and
            innovative solutions for your business domain. We believe in
            exceeding your expectations by delivering thoughtfully innovated
            eye-catching products on your desk. We take pride in engineering
            your requirements into robust software using our mobile, web, cloud
            and e-commerce capabilities.
          </p>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push("/aboutus")}
          >
            Explore More
          </button>
        </div>
        <div className={`${styles.aboutVisual} ${styles.reveal}`}>
          <Image
            alt="About Zweidevs"
            className={styles.aboutImg}
            quality={100}
            src={HS3Img}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ projects, projectsError }) {
  const router = useRouter();
  return (
    <section className={styles.projectsSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Portfolio</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Our Top Projects
          </h2>
        </div>
        {projectsError ? (
          <p style={{ color: "#ef5350", textAlign: "center" }}>
            Unable to load projects right now. Please try again later.
          </p>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.map((p, i) => (
              <div
                className={`${styles.projectCard} ${styles.reveal}`}
                key={p.title}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={styles.projectImgWrap}>
                  {p.image ? (
                    <Image
                      alt={p.title}
                      className={styles.projectImg}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      src={p.image}
                    />
                  ) : (
                    <div className={styles.projectImgPlaceholder} />
                  )}
                  {p.types?.[0] && (
                    <span className={styles.projectTag}>{p.types[0]}</span>
                  )}
                </div>
                <div className={styles.projectBody}>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.servicesCta}>
          <button
            className={styles.btnOutline}
            onClick={() => router.push("/projects")}
          >
            View All Projects →
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
          <span className={styles.sectionTag}>Why Zweidevs</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Numbers That Speak for Themselves
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
            What Clients Say About Us
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
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                {t.img ? (
                  <Image
                    alt={t.name}
                    className={styles.testimonialAvatar}
                    height={48}
                    src={t.img}
                    width={48}
                  />
                ) : (
                  <div className={styles.testimonialAvatarFallback}>
                    {t.name ? t.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
                <span className={styles.testimonialName}>{t.name}</span>
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
      <Image
        alt={t.name}
        className={styles.techItemIcon}
        height={40}
        src={t.src}
        width={40}
      />
      <span className={styles.techItemLabel}>{t.name}</span>
    </div>
  ));
  return (
    <section className={styles.techSec}>
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
          Technologies We Work With
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
      .map(p => ({
        title: p.title || "",
        desc: p.desc || p.description || "",
        types: Array.isArray(p.types) ? p.types : p.type ? [p.type] : [],
        image: p.image || p.imageUrl || null,
        order: Number(p.order_no ?? p.order ?? 0),
      }))
      .sort((a, b) =>
        a.order === b.order
          ? a.title.localeCompare(b.title)
          : a.order - b.order,
      )
      .slice(0, 4);
  } catch (_) {
    projectsError = true;
  }
  // ── services ────────────────────────────────────
  let services = [];
  let servicesError = false;
  try {
    const svcData = await getAllServices();
    services = (svcData || [])
      .map(svc => {
        const title = svc.title || "";
        const desc = svc.desc || svc.description || "";
        const order = Number(svc.order_no ?? svc.order ?? 0);
        const slug = svc.slug || slugMap[title] || "";
        const href = slug ? `/services/${slug}` : "/services";
        return { title, desc, order, href };
      })
      .sort((a, b) =>
        a.order === b.order
          ? a.title.localeCompare(b.title)
          : a.order - b.order,
      )
      .slice(0, 6);
  } catch (_) {
    servicesError = true;
  }

  // ── testimonials ─────────────────────────────────
  try {
    const data = await getAllReviews();
    const testimonials = (data || [])
      .map(r => {
        const name = r.name || "";
        const text = r.text || r.review || r.desc || "";
        const img = r.img || r.image || r.avatar || null;
        const order = Number(r.order_no ?? r.order ?? 0);
        return { name, text, img, order };
      })
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
  const [allCountries, setAllCountries] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    country: "Pakistan",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(r => r.json())
      .then(data => {
        const list = data
          .map(c => c?.name?.common)
          .filter(Boolean)
          .sort();
        setAllCountries(list);
      })
      .catch(() => {});
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "contact" && isNaN(value)) {
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await postAPIWithoutAuth("/dev/contact", {
        name: form.name,
        email: form.email,
        phone_number: form.contact,
        country: form.country,
        des: form.description,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({
        name: "",
        email: "",
        contact: "",
        country: "Pakistan",
        description: "",
      });
    } catch {
      /* silent */
    }
  };

  return (
    <section className={styles.contactSec} id="contact">
      <div className={`${styles.container} ${styles.contactInner}`}>
        <div className={`${styles.contactInfo} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Get In Touch</span>
          <h2 className={styles.sectionTitle}>
            Let&apos;s Build Something Great Together
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
          {submitted && (
            <div className={styles.successToast}>
              ✅ Message sent! We&apos;ll be in touch soon.
            </div>
          )}
          <div className={styles.formRow}>
            <input
              className={styles.formInput}
              name="name"
              onChange={handleChange}
              placeholder="Your Name"
              required
              type="text"
              value={form.name}
            />
            <input
              className={styles.formInput}
              name="email"
              onChange={handleChange}
              placeholder="Email Address"
              required
              type="email"
              value={form.email}
            />
          </div>
          <div className={styles.formRow}>
            <select
              className={styles.formInput}
              name="country"
              onChange={handleChange}
              value={form.country}
            >
              {allCountries.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              className={styles.formInput}
              name="contact"
              onChange={handleChange}
              placeholder="Phone Number"
              required
              type="text"
              value={form.contact}
            />
          </div>
          <textarea
            className={styles.formTextarea}
            name="description"
            onChange={handleChange}
            placeholder="Tell us about your project..."
            required
            rows={5}
            value={form.description}
          />
          <button className={styles.btnPrimary} type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
