import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import HSLogo from "../../public/assets/HomeIcons/zweidevsLogo.svg";
import HS3Img from "../../public/assets/HomeIcons/HS3Img.svg";
import HS2Img1 from "../../public/assets/HomeIcons/HSImg1.svg";
import HS2Img2 from "../../public/assets/HomeIcons/HSImg2.svg";
import HS2Img3 from "../../public/assets/HomeIcons/HSImg3.svg";
import HS2Img4 from "../../public/assets/HomeIcons/HSImg4.svg";
import HS2Img5 from "../../public/assets/HomeIcons/HSImg5.svg";
import longSvg from "../../public/assets/HomeIcons/slider-technologies.svg";
import Web1 from "../../public/assets/HomeIcons/Project/Web1.png";
import Mobo1 from "../../public/assets/serviceDetailsIcons/moboIcons/mobo1.png";
import Web4 from "../../public/assets/HomeIcons/Project/Web4.png";
import ClientSvg1 from "../../public/assets/HomeIcons/clients/nick-angelov.png";
import ClientSvg2 from "../../public/assets/HomeIcons/clients/theresa.png";
import ClientSvg3 from "../../public/assets/HomeIcons/clients/rishi.png";
import ClientSvg4 from "../../public/assets/HomeIcons/clients/anton.png";
import ClientSvg5 from "../../public/assets/HomeIcons/clients/tony-malik.png";
import ClientSvg6 from "../../public/assets/HomeIcons/clients/tommy.png";
import { getAllReviews } from "@component/firebase/firebaseRequests";
import { postAPIWithoutAuth } from "@component/pages/api/api";
import { urls } from "@component/utils/urls";
import styles from "../styles/landing.module.css";

/* ── data ────────────────────────────────────────── */
const services = [
  {
    icon: HS2Img1,
    title: "Blockchain Development",
    href: urls.services.BC.url,
    desc: "Blockchain is the backbone technology of digital cryptocurrency Bitcoin. We have a team of blockchain developers dedicated to ensuring accurate deployment.",
  },
  {
    icon: HS2Img2,
    title: "DevOps Development",
    href: urls.services.DevOPS.url,
    desc: "DevOps facilitates the evolution and accelerated improvement of products. Our team ensures correct deployment and guarantees seamless automation execution.",
  },
  {
    icon: HS2Img3,
    title: "Web Development",
    href: urls.services.WebApp.url,
    desc: "We are a creative web development team, leveraging the latest technology with thoughtful design and serious engineering for any industry.",
  },
  {
    icon: HS2Img4,
    title: "Ecommerce Development",
    href: urls.services.Ecommerce.url,
    desc: "Our team assists you in expanding the global reach of your business by seamlessly transitioning your offline stores to the global web.",
  },
  {
    icon: HS2Img5,
    title: "Mobile App Development",
    href: urls.services.MobileApp.url,
    desc: "We specialize in developing sleek native and hybrid mobile apps, prioritizing customer satisfaction and performance at the core.",
  },
];

const projects = [
  {
    image: Web1,
    title: "Cyber Legends",
    tag: "Ed-Tech",
    desc: "Ed-Tech and Gaming platform offering online cyber security learning services, equipping educators, parents and kids with interactive tools.",
  },
  {
    image: Mobo1,
    title: "Neverleft",
    tag: "Fintech",
    desc: "A more efficient method for managing venue operations that incorporates data analytics, enhanced event ticketing, and digital cloakroom ticketing.",
  },
  {
    image: Web4,
    title: "Blockcircle",
    tag: "Crypto",
    desc: "Blockcircle provides competitive data, proprietary tools, and dynamic investing analytics to enable well-informed decisions in the cryptocurrency market.",
  },
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

export default function LandingPage({ testimonials = defaultTestimonials }) {
  const router = useRouter();
  useReveal(`.${styles.reveal}`);

  return (
    <div className={styles.page}>
      <Head>
        <title>Zweidevs — Empowering Digital Innovation</title>
        <meta
          content="Welcome to Zweidevs - Your Gateway to Digital Innovation. Explore our IT services, from web development and blockchain solutions to mobile app development and AI-powered solutions."
          name="description"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <HeroSection router={router} />

      {/* ─── SERVICES ─────────────────────────── */}
      <ServicesSection router={router} />

      {/* ─── ABOUT ────────────────────────────── */}
      <AboutSection router={router} />

      {/* ─── PROJECTS ─────────────────────────── */}
      <ProjectsSection />

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
            Empowering <br />
            <span className={styles.heroAccent}>Innovation</span>
          </h1>
          <p className={styles.heroSub}>
            We engineer robust software using mobile, web, cloud &amp;
            blockchain capabilities — delivering thoughtfully innovated products
            that exceed expectations.
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
              Book a Meeting
            </button>
            <button
              className={styles.btnOutline}
              onClick={() => router.push("/services")}
            >
              Our Services →
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

function ServicesSection({ router }) {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>What We Do</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Everything Your Business Needs
          </h2>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
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
                  src={s.icon}
                  width={56}
                />
              </div>
              <h3 className={styles.serviceCardTitle}>{s.title}</h3>
              <p className={styles.serviceCardDesc}>{s.desc}</p>
              <span className={styles.serviceLink}>Learn more →</span>
            </div>
          ))}
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

function ProjectsSection() {
  return (
    <section className={styles.projectsSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Portfolio</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Our Top Projects
          </h2>
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((p, i) => (
            <div
              className={`${styles.projectCard} ${styles.reveal}`}
              key={p.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={styles.projectImgWrap}>
                <Image
                  alt={p.title}
                  className={styles.projectImg}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={p.image}
                />
                <span className={styles.projectTag}>{p.tag}</span>
              </div>
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <p className={styles.projectDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
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
      setValue(isFloat ? +(target * eased).toFixed(1) : Math.floor(target * eased));
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
      <div
        className={styles.statGlow}
        style={{ background: stat.accent }}
      />
      <div className={styles.statRing} style={{ borderColor: stat.accent }}>
        <span className={styles.statIcon}>{stat.icon}</span>
      </div>
      <span className={styles.statValue} style={{ color: stat.accent }}>
        {count}
        {stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
      <div
        className={styles.statBar}
        style={{ background: stat.accent }}
      />
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
            <StatCard
              delay={`${i * 120}ms`}
              key={s.label}
              stat={s}
            />
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
  return (
    <section className={styles.techSec}>
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
          Technologies We Work With
        </h2>
      </div>
      <div className={styles.techMarquee}>
        <Image alt="technologies" className={styles.techStrip} src={longSvg} />
        <Image alt="technologies" className={styles.techStrip} src={longSvg} />
      </div>
    </section>
  );
}

/* ── data fetching — SSR (testimonials from Firestore) ── */

export async function getServerSideProps() {
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
      .sort((a, b) => {
        if (a.order === b.order) {
          return a.name.localeCompare(b.name);
        }
        return a.order - b.order;
      });

    // Fallback to static testimonials if Firestore is empty or misconfigured
    if (!testimonials.length) {
      return { props: { testimonials: defaultTestimonials } };
    }

    return { props: { testimonials } };
  } catch (error) {
    return { props: { testimonials: defaultTestimonials } };
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
