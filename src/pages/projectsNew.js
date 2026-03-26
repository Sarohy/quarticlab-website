import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/projectsNew.module.css";

import aivst from "../../public/assets/projectsPage/aivst.png";
import audioCardio from "../../public/assets/projectsPage/audio-cardio.png";
import avail from "../../public/assets/projectsPage/Avail.png";
import hookedhealth from "../../public/assets/projectsPage/hookedhealth.png";
import cyberLegends from "../../public/assets/projectsPage/cyberLegends.png";
import humanana from "../../public/assets/projectsPage/humanana.png";
import freshTrack from "../../public/assets/projectsPage/freshTrack.png";
import blockcircle from "../../public/assets/projectsPage/blockcircle.png";
import edcite from "../../public/assets/projectsPage/edcite.png";
import neverleft from "../../public/assets/projectsPage/neverleft.png";
import officersurvay from "../../public/assets/projectsPage/officersurvay.png";
import pridepals from "../../public/assets/projectsPage/pridepals.png";
import RobobeeBot from "../../public/assets/projectsPage/RobobeeBot.png";
import trademimic from "../../public/assets/projectsPage/trademimic.png";
import twinciti from "../../public/assets/projectsPage/twinciti.png";
import venueGenie from "../../public/assets/projectsPage/venueGenie.png";
import yousolan from "../../public/assets/projectsPage/you-solan.png";

import AwsIcon from "../../public/assets/projectIcon/awsIcon.svg";
import NodeIcon from "../../public/assets/projectIcon/nodejsIcon.svg";
import ReactIcon from "../../public/assets/projectIcon/reactIcon.svg";
import RubyIcon from "../../public/assets/projectIcon/rorIcon.svg";

/* ── data ────────────────────────────────────────── */

const categories = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Apps" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "ai", label: "AI & ML" },
];

const allProjects = [
  {
    image: aivst,
    title: "AI VST",
    types: ["ai"],
    desc: "Enhance your audio recordings with advanced Plugins and Visual Studio tools, for professional-grade sound quality.",
  },
  {
    image: twinciti,
    title: "TwinCiti",
    types: ["ai"],
    desc: "TwinCiti provides a scalable infrastructure capable of supporting advanced applications ranging from 3D graphics to machine learning.",
  },
  {
    image: RobobeeBot,
    title: "RoboBee Bot",
    types: ["ai"],
    desc: "Communicate easily with Robobee Bot, your AI conversation partner who can converse via text, graphics, examples, and more.",
  },
  {
    image: neverleft,
    title: "Neverleft",
    types: ["mobile"],
    desc: "A more efficient method for managing venue operations that incorporates data analytics, enhanced event ticketing, and digital cloakroom ticketing.",
  },
  {
    image: yousolan,
    title: "You Salon",
    types: ["mobile"],
    desc: "You Salon offers online booking based on ratings and popularity, with salon history.",
  },
  {
    image: hookedhealth,
    title: "Hooked Health",
    types: ["mobile"],
    desc: "Discover a fitness and mindset training program designed for women to achieve metabolic advantage. Target specific body parts for faster results.",
  },
  {
    image: audioCardio,
    title: "AudioCardio",
    types: ["mobile"],
    desc: "Improve your hearing with the mobile app AudioCardio, which provides inaudible sound therapy to improve hearing and reduce tinnitus.",
  },
  {
    image: cyberLegends,
    title: "Cyber Legends",
    types: ["web"],
    desc: "Online learning platform for cyber security awareness in children with interactive tools for kids, parents, and educators.",
  },
  {
    image: edcite,
    title: "Edcite",
    types: ["web"],
    desc: "Revolutionizing K\u201312 education with interactive lessons, addressing online test challenges, and promoting instant student feedback.",
  },
  {
    image: officersurvay,
    title: "Officer Survey",
    types: ["web"],
    desc: "Building safer communities through tech-driven communication and surveys between people and law enforcement.",
  },
  {
    image: blockcircle,
    title: "Blockcircle",
    types: ["web"],
    desc: "Blockcircle provides competitive data, tools, and dynamic investing analytics to make well-informed decisions in the cryptocurrency market.",
  },
  {
    image: avail,
    title: "Avail Medical",
    types: ["web"],
    desc: "A website to stream Canada\u2019s medical marijuana program, offering online shopping experiences for diverse services and product options.",
  },
  {
    image: trademimic,
    title: "Isynced (Trademimic)",
    types: ["web"],
    desc: "The market\u2019s most affordable copy trading solution, optimizing earnings, minimizing risk, and delivering an unparalleled user experience.",
  },
  {
    image: freshTrack,
    title: "Fresh Track Canada",
    types: ["web"],
    desc: "Vancouver team since \u201996, personalized your vacations showcasing Canada\u2019s diverse experiences and passion for travel.",
  },
  {
    image: humanana,
    title: "Humanava",
    types: ["web"],
    desc: "Unleash your potential with personal development courses for a brighter future, and connect globally to discover hidden brilliance.",
  },
  {
    image: pridepals,
    title: "LinkTree",
    types: ["web"],
    desc: "Elevate manageability by consolidating your online presence seamlessly linking videos, music, podcasts, websites, social platforms, and more.",
  },
  {
    image: venueGenie,
    title: "Venue Genie",
    types: ["web"],
    desc: "Discover the future of event booking with over 360 locations, catering, and DJ packages, ensuring flawless experiences for gatherings.",
  },
];

const techIcons = [
  { src: ReactIcon, alt: "React.js", w: 36 },
  { src: NodeIcon, alt: "Node.js", w: 36 },
  { src: RubyIcon, alt: "Ruby on Rails", w: 36 },
  { src: AwsIcon, alt: "AWS", w: 26 },
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
      { threshold: 0.08 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── page ────────────────────────────────────────── */

export default function ProjectsNewPage() {
  const [active, setActive] = useState("all");
  const [filtered, setFiltered] = useState(allProjects);
  const [animKey, setAnimKey] = useState(0);

  useReveal(`.${styles.reveal}`);

  const handleFilter = key => {
    setActive(key);
    setAnimKey(prev => prev + 1);
    if (key === "all") {
      setFiltered(allProjects);
    } else {
      setFiltered(allProjects.filter(p => p.types.includes(key)));
    }
  };

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Portfolio - Zweidevs IT Projects Showcase</title>
        <meta
          content="Explore Our Portfolio - Witness our successful projects in web development, mobile app creation, blockchain solutions, and more."
          name="description"
        />
      </Head>

      {/* ─── HERO BANNER ──────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>💼 Portfolio</span>
          <h1 className={styles.heroH1}>
            Everything Your Business Needs{" "}
            <span className={styles.heroAccent}>Under One Roof</span>
          </h1>
          <p className={styles.heroSub}>
            We&apos;ve worked across multiple verticals and a range of services
            to create engaging and innovative digital experiences.
          </p>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── FILTER BAR ───────────────────────── */}
      <section className={styles.filterSec}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            {categories.map(c => (
              <button
                className={`${styles.filterBtn} ${
                  active === c.key ? styles.filterActive : ""
                }`}
                key={c.key}
                onClick={() => handleFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECT GRID ─────────────────────── */}
      <section className={styles.gridSec}>
        <div className={styles.container}>
          <div className={styles.grid} key={animKey}>
            {filtered.map((p, i) => (
              <div
                className={`${styles.card} ${styles.reveal}`}
                key={p.title}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={styles.cardImgWrap}>
                  <Image
                    alt={p.title}
                    className={styles.cardImg}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={p.image}
                  />
                  <div className={styles.cardOverlay}>
                    <div className={styles.cardTechs}>
                      {techIcons.map(t => (
                        <Image
                          alt={t.alt}
                          className={styles.techIcon}
                          height={t.w}
                          key={t.alt}
                          src={t.src}
                          width={t.w}
                        />
                      ))}
                    </div>
                    <button className={styles.demoBtn} onClick={requestDemo}>
                      Request Demo
                      <svg
                        className={styles.demoBtnIcon}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>
                    {p.types[0] === "ai"
                      ? "AI & ML"
                      : p.types[0] === "mobile"
                        ? "Mobile"
                        : "Web"}
                  </span>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── EMPTY STATE ──────────────────── */}
          {filtered.length === 0 && (
            <p className={styles.empty}>No projects found for this category.</p>
          )}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────── */}
      <section className={styles.ctaSec}>
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div className={`${styles.ctaText} ${styles.reveal}`}>
            <h2 className={styles.ctaH2}>Have a Project in Mind?</h2>
            <p className={styles.ctaSub}>
              Let&apos;s discuss how we can bring your vision to life with our
              expert team.
            </p>
          </div>
          <button
            className={`${styles.btnPrimary} ${styles.reveal}`}
            onClick={requestDemo}
          >
            Book a Meeting →
          </button>
        </div>
      </section>
    </div>
  );
}
