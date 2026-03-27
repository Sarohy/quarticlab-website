import { useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import AboutImg from "../../public/assets/AboutUs/AboutUsMainImg.png";
import styles from "../styles/aboutNew.module.css";

/* ── data ────────────────────────────────────────── */

const stats = [
  { value: "412+", label: "Projects Completed" },
  { value: "682+", label: "Positive Reviews" },
  { value: "95+", label: "Team Members" },
  { value: "3.5M$", label: "Funding Raised" },
  { value: "99%", label: "Customer Satisfaction" },
];

const qualities = [
  {
    icon: "🎯",
    title: "Full-Stack Expertise",
    desc: "From mobile apps to blockchain protocols. No outsourcing.",
  },
  {
    icon: "💬",
    title: "Transparent Process",
    desc: "Weekly standups, shared dashboards, no surprises.",
  },
  {
    icon: "🚀",
    title: "Startup Speed, Enterprise Quality",
    desc: "We've built for funded startups and scaled with them.",
  },
];

const founders = [
  {
    name: "Abdul Rehman Sarohy",
    role: "Co Founder",
    img: "https://zweidevs-internal-prod.s3.ap-south-1.amazonaws.com/assets/Sarohy.svg",
    linkedin: "https://linkedin.com/in/abdul-rehman-sarohy-0b40b0128",
    instagram: "https://www.instagram.com/zweidevs.official",
    facebook: "https://www.facebook.com/zweidevs",
  },
  {
    name: "Ali Zain",
    role: "Co Founder",
    img: "https://zweidevs-internal-prod.s3.ap-south-1.amazonaws.com/assets/Ali.svg",
    linkedin: "https://linkedin.com/in/ali-zain-803416116",
    instagram: "https://www.instagram.com/zweidevs.official",
    facebook: "https://www.facebook.com/zweidevs",
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
      { threshold: 0.1 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── page ────────────────────────────────────────── */

export default function AboutNewPage() {
  useReveal(`.${styles.reveal}`);

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>About Us | Zweidevs</title>
        <meta
          content="Get to know Zweidevs - We are a team of tech enthusiasts passionate about creating digital solutions. Learn about our journey, values, and dedication to excellence in IT services."
          name="description"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>🏢 About Zweidevs</span>
          <h1 className={styles.heroH1}>
            We Are <span className={styles.heroAccent}>Zweidevs</span> — A
            Product-First Studio from Lahore
          </h1>
          <p className={styles.heroSub}>
            Founded in 2020, Zweidevs is a software studio building digital
            products for a global market. We specialize in AI, Blockchain, IoT,
            and full-stack development — with $0.5M in funding raised and 150+
            projects delivered across 3 continents.
          </p>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── MISSION ──────────────────────────── */}
      <MissionSection />

      {/* ─── STATS ────────────────────────────── */}
      <StatsSection />

      {/* ─── QUALITIES ────────────────────────── */}
      <QualitiesSection />

      {/* ─── FOUNDERS ─────────────────────────── */}
      <FoundersSection />

      {/* ─── CTA ──────────────────────────────── */}
      <section className={styles.ctaSec}>
        <div className={styles.container}>
          <div className={`${styles.ctaCard} ${styles.reveal}`}>
            <h2 className={styles.ctaH2}>
              Are You Ready For Meaningful Results?
            </h2>
            <p className={styles.ctaSub}>
              We can help you bring your vision to life with our expert team of
              designers and developers.
            </p>
            <button className={styles.btnPrimary} onClick={requestDemo}>
              Book a Meeting →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── sections ────────────────────────────────────── */

function MissionSection() {
  return (
    <section className={styles.missionSec}>
      <div className={`${styles.container} ${styles.missionInner}`}>
        <div className={`${styles.missionImg} ${styles.reveal}`}>
          <Image
            alt="About Zweidevs team"
            className={styles.missionImage}
            quality={100}
            src={AboutImg}
          />
        </div>
        <div className={`${styles.missionText} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Who We Are</span>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionDesc}>
            Zweidevs stands as the preeminent digital agency in the realm of
            business solutions. Our commitment to excellence and a
            service-oriented approach defines our very essence. We specialize in
            providing dynamic and groundbreaking solutions meticulously crafted
            to suit your unique business domain.
          </p>
          <p className={styles.missionDesc}>
            At Zweidevs, we not only meet but exceed your expectations, driven
            by a passion for delivering thoughtfully innovated, eye-catching
            products that leave a lasting impression. Our dedicated team takes
            immense pride in engineering your requirements into robust software
            solutions, harnessing the full potential of cutting-edge
            technologies spanning mobile, web, cloud, and e-commerce.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    refs.current.forEach(r => {
      if (r) {
        obs.observe(r);
      }
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.statsSec}>
      <div className={styles.container}>
        <h2 className={`${styles.statsHeading} ${styles.reveal}`}>
          Zweidevs Achievements Since 2020
        </h2>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div
              className={`${styles.statCard} ${styles.statReveal}`}
              key={s.label}
              ref={el => {
                refs.current[i] = el;
              }}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualitiesSection() {
  return (
    <section className={styles.qualitiesSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Zweidevs</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Why Choose Us
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Three reasons our clients keep coming back — and why you should
            choose Zweidevs for your next project.
          </p>
        </div>
        <div className={styles.qualitiesGrid}>
          {qualities.map((q, i) => (
            <div
              className={`${styles.qualityCard} ${styles.reveal}`}
              key={q.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={styles.qualityIcon}>{q.icon}</span>
              <h3 className={styles.qualityTitle}>{q.title}</h3>
              <p className={styles.qualityDesc}>{q.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersSection() {
  return (
    <section className={styles.foundersSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our Founders</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Our Expertise Will Help You
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Collectively, we possess a greater intellect than any one of us
            individually. We engage in passionate debates, embrace ongoing
            learning, and exhibit unwavering dedication as we guide our team
            towards establishing ourselves as the foremost technology partner.
          </p>
        </div>
        <div className={styles.foundersGrid}>
          {founders.map((f, i) => (
            <div
              className={`${styles.founderCard} ${styles.reveal}`}
              key={f.name}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={styles.founderImgWrap}>
                <Image
                  alt={`Zweidevs | ${f.name}`}
                  className={styles.founderImg}
                  height={140}
                  quality={100}
                  src={f.img}
                  width={140}
                />
              </div>
              <h3 className={styles.founderName}>{f.name}</h3>
              <p className={styles.founderRole}>{f.role}</p>
              <div className={styles.founderSocials}>
                <a
                  className={styles.socialLink}
                  href={f.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  className={styles.socialLink}
                  href={f.facebook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  className={styles.socialLink}
                  href={f.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
