import { useEffect, useState } from "react";
import Head from "next/head";
import Alert from "@mui/material/Alert";
import { submitContactForm } from "@component/firebase/firebaseRequests";
import CountrySelect from "@component/Components/CommonComponents/CountrySelect/CountrySelect";
import QuarticMark from "@component/Components/CommonComponents/QuarticMark";
import styles from "../../styles/contactNew.module.css";

/* ── data ────────────────────────────────────────── */
const contactMethods = [
  {
    desc: "we typically respond within 24 hours.",
    detail: "hello@quarticlab.com",
    href: "mailto:hello@quarticlab.com",
    icon: (
      <svg fill="none" height="28" viewBox="0 0 28 28" width="28">
        <rect
          height="16"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
          width="22"
          x="3"
          y="6"
        />
        <path
          d="M3 8l11 7 11-7"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "email us",
  },
  {
    desc: "our headquarters",
    detail: "6-B, Block B Phase 1, Johar Town, Lahore",
    href: "https://maps.google.com/?q=Johar+Town+Lahore",
    icon: (
      <svg fill="none" height="28" viewBox="0 0 28 28" width="28">
        <path
          d="M14 3C9.58 3 6 6.58 6 11c0 6.5 8 14 8 14s8-7.5 8-14c0-4.42-3.58-8-8-8z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "visit us",
  },
  {
    desc: "mon – fri, 9 am – 6 pm",
    detail: "+92 309 444 6225",
    href: "tel:+923094446225",
    icon: (
      <svg fill="none" height="28" viewBox="0 0 28 28" width="28">
        <path
          d="M6 4h5l2 5-3 2a11 11 0 005 5l2-3 5 2v5a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "call us",
  },
];

const faqs = [
  {
    a: "Depending on scope, projects range from 4 weeks for MVPs to 6+ months for full-scale platforms. We provide a detailed timeline during the discovery phase.",
    q: "What is the typical project timeline?",
  },
  {
    a: "We offer flexible support and maintenance packages to keep your product running smoothly after launch.",
    q: "Do you offer post-launch support?",
  },
  {
    a: "React, Next.js, React Native, Node.js, Python, Blockchain (Solidity), AWS, GCP and more — we choose the best stack for your needs.",
    q: "What technologies do you specialise in?",
  },
  {
    a: "Yes. We provide dedicated remote teams that integrate seamlessly with your existing workflow and culture.",
    q: "Can I hire a dedicated development team?",
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
        <title>Contact | Quartic Lab</title>
        <meta
          content="Get in touch with Quartic Lab. Let us discuss your project, explore collaboration opportunities, or just say hello."
          name="description"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <HeroBanner />

      {/* ─── CONTACT METHODS ─────────────────── */}
      <ContactCards />

      {/* ─── FORM + INFO ─────────────────────── */}
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

      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <span className={styles.heroBadge}>get in touch</span>
          <h1 className={styles.heroH1}>
            we would love to <br />
            <span className={styles.heroAccent}>hear from you</span>
          </h1>
          <p className={styles.heroSub}>
            whether you have a groundbreaking idea, need a technical partner, or
            just want to explore possibilities — our team is ready to listen and
            deliver.
          </p>
          <div className={styles.heroScroll}>
            <span className={styles.scrollDot} />
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroLogoRing}>
            <QuarticMark animated fg="oklch(95% 0.018 75)" size={100} />
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
  const [form, setForm] = useState({
    budget: "",
    contact: "",
    country: "",
    description: "",
    email: "",
    name: "",
    service: "",
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
        budget: form.budget,
        country: form.country,
        description: form.description,
        email: form.email,
        name: form.name,
        phone: form.contact,
        service: form.service,
      });
      setAlertMsg({
        message: "Thanks. We will get back to you within 24 hours.",
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
          "hello@quarticlab.com",
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
          <span className={styles.sectionTag}>get in touch</span>
          <h2 className={styles.sectionTitle}>
            let us build something{" "}
            <span className={styles.accentText}>great</span> together
          </h2>
          <p className={styles.formInfoDesc}>
            fill out the form and our team will get back to you within 24 hours.
            we are excited to learn about your vision.
          </p>

          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>
                <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 5v5l3 3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <div>
                <strong>24hr response</strong>
                <span>quick turnaround guaranteed</span>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>
                <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                  <rect
                    height="14"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="14"
                    x="3"
                    y="3"
                  />
                  <path
                    d="M7 10l2 2 4-4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <div>
                <strong>NDA protected</strong>
                <span>your ideas stay safe</span>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>
                <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                  <path
                    d="M3 5h14v10H7l-4 3V5z"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <div>
                <strong>free consultation</strong>
                <span>no strings attached</span>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>
                <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                  <path
                    d="M3 14l5-5 3 3 6-6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13 6h4v4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <div>
                <strong>agile process</strong>
                <span>transparent and iterative</span>
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
                Full name
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
                Email address
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
              <CountrySelect
                id="cf-country"
                name="country"
                onChange={handleChange}
                value={form.country}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cf-phone">
                Phone number
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
              Service interested in
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
              Project budget
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
              Project details
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
            {submitting ? "Sending..." : "Send message"}
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
          <span className={styles.sectionTag}>faq</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            frequently asked questions
          </h2>
          <p className={`${styles.faqSubtitle} ${styles.reveal}`}>
            quick answers to the questions we get asked most often
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div
              className={`${styles.faqItem} ${styles.reveal} ${
                openIdx === i ? styles.faqOpen : ""
              }`}
              key={faq.q}
              onClick={() => toggle(i)}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.q}</h3>
                <span className={styles.faqToggle}>
                  {openIdx === i ? "\u2212" : "+"}
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
