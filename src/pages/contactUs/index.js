import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Alert from "@mui/material/Alert";
import { submitContactForm } from "@component/firebase/firebaseRequests";
import HSLogo from "../../../public/assets/HomeIcons/zweidevsLogo.svg";
import styles from "../../styles/contactNew.module.css";

/* ── data ────────────────────────────────────────── */
const contactMethods = [
  {
    icon: "📧",
    title: "Email Us",
    detail: "hello@zweidevs.com",
    href: "mailto:hello@zweidevs.com",
    desc: "We typically respond within 24 hours.",
  },
  {
    icon: "📍",
    title: "Visit Us",
    detail: "6-B, Block B Phase 1, Johar Town, Lahore",
    href: "https://maps.google.com/?q=Johar+Town+Lahore",
    desc: "Our headquarters",
  },
  {
    icon: "📞",
    title: "Call Us",
    detail: "+92 309 444 6225",
    href: "tel:+923094446225",
    desc: "Mon – Fri, 9am – 6pm",
  },
];

const faqs = [
  {
    q: "What is the typical project timeline?",
    a: "Depending on scope, projects range from 4 weeks for MVPs to 6+ months for full-scale platforms. We provide a detailed timeline during the discovery phase.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Absolutely. We offer flexible support and maintenance packages to keep your product running smoothly after launch.",
  },
  {
    q: "What technologies do you specialise in?",
    a: "React, Next.js, React Native, Node.js, Python, Blockchain (Solidity), AWS, GCP and more — we choose the best stack for your needs.",
  },
  {
    q: "Can I hire a dedicated development team?",
    a: "Yes! We provide dedicated remote teams that integrate seamlessly with your existing workflow and culture.",
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
export default function ContactNewPage() {
  useReveal(`.${styles.reveal}`);

  return (
    <div className={styles.page}>
      <Head>
        <title>Contact | Zweidevs</title>
        <meta
          content="Get in touch with Zweidevs. Let's discuss your project, explore collaboration opportunities, or just say hello."
          name="description"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <HeroBanner />

      {/* ─── CONTACT METHODS ─────────────────── */}
      <ContactCards />

      {/* ─── FORM + MAP ──────────────────────── */}
      <FormSection />

      {/* ─── FAQ ──────────────────────────────── */}
      <FAQSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HERO BANNER
   ══════════════════════════════════════════════════ */
function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      {/* floating particles */}
      <span className={`${styles.particle} ${styles.p1}`} />
      <span className={`${styles.particle} ${styles.p2}`} />
      <span className={`${styles.particle} ${styles.p3}`} />
      <span className={`${styles.particle} ${styles.p4}`} />

      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <span className={styles.heroBadge}>💬 Let&apos;s Talk</span>
          <h1 className={styles.heroH1}>
            We&apos;d Love to <br />
            <span className={styles.heroAccent}>Hear From You</span>
          </h1>
          <p className={styles.heroSub}>
            Whether you have a groundbreaking idea, need a technical partner, or
            just want to explore possibilities — our team is ready to listen and
            deliver.
          </p>
          <div className={styles.heroScroll}>
            <span className={styles.scrollDot} />
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

/* ══════════════════════════════════════════════════
   CONTACT METHOD CARDS
   ══════════════════════════════════════════════════ */
function ContactCards() {
  return (
    <section className={styles.methodsSec}>
      <div className={styles.container}>
        <div className={styles.methodsGrid}>
          {contactMethods.map((m, i) => (
            <a
              className={`${styles.methodCard} ${styles.reveal}`}
              href={m.href}
              key={m.title}
              rel="noopener noreferrer"
              style={{ transitionDelay: `${i * 100}ms` }}
              target={m.href.startsWith("http") ? "_blank" : undefined}
            >
              <span className={styles.methodIcon}>{m.icon}</span>
              <h3 className={styles.methodTitle}>{m.title}</h3>
              <p className={styles.methodDetail}>{m.detail}</p>
              <p className={styles.methodDesc}>{m.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FORM + INFO SECTION
   ══════════════════════════════════════════════════ */
function FormSection() {
  const [allCountries, setAllCountries] = useState([]);
  const [form, setForm] = useState({
    budget: "",
    contact: "",
    country: "Pakistan",
    description: "",
    email: "",
    name: "",
    service: "",
  });
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
        budget: form.budget,
        country: form.country,
        description: form.description,
        email: form.email,
        name: form.name,
        phone: form.contact,
        service: form.service,
      });
      setAlertMsg({
        message: "Thanks! We\u2019ll get back to you within 24 hours.",
        severity: "success",
      });
      setForm({
        budget: "",
        contact: "",
        country: "Pakistan",
        description: "",
        email: "",
        name: "",
        service: "",
      });
    } catch {
      setAlertMsg({
        message:
          "Something went wrong. Please email us directly at " +
          "hello@zweidevs.com",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.formSec}>
      <div className={`${styles.container} ${styles.formInner}`}>
        {/* Left side info */}
        <div className={`${styles.formInfo} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Get In Touch</span>
          <h2 className={styles.sectionTitle}>
            Let&apos;s Build Something{" "}
            <span className={styles.accentText}>Great</span> Together
          </h2>
          <p className={styles.formInfoDesc}>
            Fill out the form and our team will get back to you within 24 hours.
            We&apos;re excited to learn about your vision.
          </p>

          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>⚡</span>
              <div>
                <strong>24hr Response</strong>
                <span>Quick turnaround guaranteed</span>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>🛡️</span>
              <div>
                <strong>NDA Protected</strong>
                <span>Your ideas stay safe</span>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>💬</span>
              <div>
                <strong>Free Consultation</strong>
                <span>No strings attached</span>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>🚀</span>
              <div>
                <strong>Agile Process</strong>
                <span>Transparent & iterative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side form */}
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

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cf-name">
                Full Name
              </label>
              <input
                className={styles.formInput}
                id="cf-name"
                name="name"
                onChange={handleChange}
                placeholder="John Doe"
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
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cf-email">
                Email Address
              </label>
              <input
                className={styles.formInput}
                id="cf-email"
                name="email"
                onChange={handleChange}
                placeholder="john@company.com"
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
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cf-country">
                Country
              </label>
              <select
                className={styles.formInput}
                id="cf-country"
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
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cf-phone">
                Phone Number
              </label>
              <input
                className={styles.formInput}
                id="cf-phone"
                name="contact"
                onChange={handleChange}
                placeholder="+92 300 1234567"
                required
                type="text"
                value={form.contact}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cf-service">
              Service Interested In
            </label>
            <select
              className={styles.formInput}
              id="cf-service"
              name="service"
              onChange={handleChange}
              value={form.service}
            >
              <option value="">Select a service (optional)</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Blockchain Development">
                Blockchain Development
              </option>
              <option value="AI/ML Development">AI/ML Development</option>
              <option value="IoT Development">IoT Development</option>
              <option value="Game Development">Game Development</option>
              <option value="GenAI & Automation">GenAI &amp; Automation</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cf-budget">
              Project Budget
            </label>
            <select
              className={styles.formInput}
              id="cf-budget"
              name="budget"
              onChange={handleChange}
              value={form.budget}
            >
              <option value="">Select a budget range (optional)</option>
              <option value="Under $5K">Under $5K</option>
              <option value="$5K–$15K">$5K&ndash;$15K</option>
              <option value="$15K–$50K">$15K&ndash;$50K</option>
              <option value="$50K+">$50K+</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cf-desc">
              Project Details
            </label>
            <textarea
              className={styles.formTextarea}
              id="cf-desc"
              name="description"
              onChange={handleChange}
              placeholder="Tell us about your project, goals, timeline, budget range..."
              required
              rows={5}
              value={form.description}
            />
            {errors.description && (
              <p
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  margin: "4px 0 0",
                }}
              >
                {errors.description}
              </p>
            )}
          </div>

          <button
            className={`${styles.btnPrimary} ${
              submitting ? styles.btnSending : ""
            }`}
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FAQ SECTION
   ══════════════════════════════════════════════════ */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = idx => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <section className={styles.faqSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>FAQ</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Frequently Asked Questions
          </h2>
          <p className={`${styles.faqSubtitle} ${styles.reveal}`}>
            Quick answers to the questions we get asked most often
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div
              className={`${styles.faqItem} ${styles.reveal} ${
                openIdx === i ? styles.faqOpen : ""
              }`}
              key={i}
              onClick={() => toggle(i)}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.q}</h3>
                <span className={styles.faqToggle}>
                  {openIdx === i ? "−" : "+"}
                </span>
              </div>
              <div className={styles.faqAnswer}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
