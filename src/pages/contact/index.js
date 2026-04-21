import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { submitContactForm } from "@component/firebase/firebaseRequests";
import CountrySelect from "@component/Components/CommonComponents/CountrySelect/CountrySelect";
import QuarticMark from "@component/Components/CommonComponents/QuarticMark";
import styles from "../../styles/contactNew.module.css";

/* ── data ────────────────────────────────────────── */
const contactMethods = [
  {
    desc: "We respond within 4 business hours.",
    detail: "hello@quarticlab.com",
    href: "mailto:hello@quarticlab.com",
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="28"
        viewBox="0 0 28 28"
        width="28"
      >
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
    title: "Email us",
  },
  {
    desc: "Our Lahore office · Serving clients in US, EU, and MENA",
    detail: "6-B, Block B Phase 1, Johar Town, Lahore",
    href: "https://maps.google.com/?q=Johar+Town+Lahore",
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="28"
        viewBox="0 0 28 28"
        width="28"
      >
        <path
          d="M14 3C9.58 3 6 6.58 6 11c0 6.5 8 14 8 14s8-7.5 8-14c0-4.42-3.58-8-8-8z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Visit us",
  },
  {
    desc: "Mon – Fri, 9 AM – 6 PM Pakistan Time",
    descNote: "(11 PM – 8 AM US East · 4 AM – 1 PM London)",
    detail: "+92 309 444 6225",
    href: "tel:+923094446225",
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="28"
        viewBox="0 0 28 28"
        width="28"
      >
        <path
          d="M6 4h5l2 5-3 2a11 11 0 005 5l2-3 5 2v5a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Call us",
  },
];

const faqs = [
  {
    a: 'A senior engineer reviews your brief within 4 business hours. You\'ll get a written response with either (a) a scope, timeline, and cost estimate, or (b) clarifying questions if the brief needs more detail. No automated "someone will reach out" message.',
    q: "What happens after I submit this form?",
  },
  {
    a: "No. Our entire discovery process can be done over email and a shared doc. We only do live calls if you request one.",
    q: "Do I have to do a sales call?",
  },
  {
    a: "Yes. We deliver a detailed estimate within 12 hours at no charge. For complex projects, we may offer a paid Discovery Sprint ($2,500, 1\u20132 weeks, credited toward the build if you proceed).",
    q: "Is the initial estimate free?",
  },
  {
    a: "Yes, always \u2014 and before we discuss any project specifics. Check the \u201cI need an NDA\u201d box in the form and we'll send one within 4 hours.",
    q: "Do you sign NDAs?",
  },
  {
    a: "Our minimum is $5,000. If your project is smaller, we'll refer you to a trusted freelancer in our network \u2014 for free.",
    q: "What if my project is too small?",
  },
  {
    a: "Our core team is in Lahore (PKT). We regularly overlap working hours with US East Coast, UK, EU, and GCC time zones. Every project has at least 3 hours of live overlap with the client's time zone.",
    q: "What time zones do you cover?",
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

  const siteUrl = (
    process.env.NEXT_PUBLIC_URL || "https://www.quarticlab.com"
  ).replace(/\/$/, "");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/contact#faq`,
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Contact | Quartic Lab</title>
        <meta
          content="Talk to Quartic Lab. Share a brief, get a 12-hour estimate from a senior engineer — not a sales rep. Phone, email, and Lahore office."
          name="description"
        />
        <meta
          content="Contact — Quartic Lab"
          key="og:title"
          property="og:title"
        />
        <meta
          content="Talk to Quartic Lab. Share a brief, get a 12-hour estimate from a senior engineer — not a sales rep."
          key="og:description"
          property="og:description"
        />
        <meta
          content="Contact — Quartic Lab"
          key="twitter:title"
          name="twitter:title"
        />
        <meta
          content="Talk to Quartic Lab. Share a brief, get a 12-hour estimate from a senior engineer — not a sales rep."
          key="twitter:description"
          name="twitter:description"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          type="application/ld+json"
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
          <span className={styles.heroBadge}>Get in touch</span>
          <h1 className={styles.heroH1}>
            Tell us what{" "}
            <span className={styles.heroAccent}>you&apos;re building</span>
          </h1>
          <p className={styles.heroSub}>
            Share a brief of what you&apos;re building. A senior engineer (not a
            sales rep) will respond within 4 hours with a scope, timeline, and
            cost estimate — no discovery call required unless you want one.
          </p>
          <div className={styles.heroScroll}>
            <span className={styles.scrollDot} />
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroLogoRing}>
            <QuarticMark animated size={200} />
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
              {m.descNote && (
                <p className={styles.methodDescNote}>{m.descNote}</p>
              )}
            </a>
          ))}
        </div>
        <p className={styles.callbackNote}>
          Outside Pakistan hours?{" "}
          <a
            className={styles.callbackLink}
            href="https://calendly.com/quarticlab/meeting"
            rel="noopener noreferrer"
            target="_blank"
          >
            Book a 30-min call at a time that works for you →
          </a>
        </p>
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
    nda: false,
    service: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { checked, name, type, value } = e.target;
    if (name === "contact" && isNaN(value)) {
      return;
    }
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: checked }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
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
    if (!form.service) {
      errs.service = "Please select a service.";
    }
    if (!form.description.trim()) {
      errs.description = "Please describe your project.";
    }
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError(null);
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitContactForm({
        attachmentName: file?.name || "",
        budget: form.budget,
        country: form.country,
        description: form.description,
        email: form.email,
        name: form.name,
        ndaRequired: form.nda,
        phone: form.contact,
        service: form.service,
      });
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or email us directly at " +
          "hello@quarticlab.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className={styles.formSec}>
        <div className={styles.container}>
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>&#10003;</div>
            <h2 className={styles.successH2}>Got it. Check your inbox.</h2>
            <p className={styles.successDesc}>
              We&apos;ve received your brief. A senior engineer is reviewing it
              now and will respond within 4 business hours with next steps.
            </p>
            <p className={styles.successNext}>In the meantime:</p>
            <ul className={styles.successLinks}>
              <li>
                <a
                  href="https://calendly.com/quarticlab/meeting"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Book a 30-min call now
                </a>
              </li>
              <li>
                <Link href="/projects">Browse our case studies</Link>
              </li>
              <li>
                <Link href="/about">Read our process in detail</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSec}>
      <div className={`${styles.container} ${styles.formInner}`}>
        {/* Left side info */}
        <div className={`${styles.formInfo} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Project brief form</span>
          <h2 className={styles.sectionTitle}>
            The fastest way to get a{" "}
            <span className={styles.accentText}>real estimate</span>
          </h2>
          <p className={styles.formInfoDesc}>
            Fill this out in 3 minutes. You&apos;ll get a scope, timeline, team
            composition, and cost breakdown within 12 business hours — written
            by a senior engineer, not a sales rep.
          </p>

          <ul className={styles.trustList}>
            <li className={styles.trustItem}>&#10003; 4-hour first response</li>
            <li className={styles.trustItem}>&#10003; NDA before discovery</li>
            <li className={styles.trustItem}>
              &#10003; Written estimate in 12 hours
            </li>
            <li className={styles.trustItem}>
              &#10003; No sales call required
            </li>
          </ul>
        </div>

        {/* Right side form */}
        <form
          className={`${styles.contactForm} ${styles.reveal}`}
          onSubmit={handleSubmit}
        >
          {submitError && (
            <div className={styles.submitError}>
              <p>{submitError}</p>
              <button
                className={styles.retryBtn}
                onClick={() => setSubmitError(null)}
                type="button"
              >
                Retry
              </button>
            </div>
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
                <p className={styles.fieldError}>{errors.name}</p>
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
                <p className={styles.fieldError}>{errors.email}</p>
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
                type="text"
                value={form.contact}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cf-service">
              Service interested in *
            </label>
            <select
              className={`${styles.formInput} ${
                errors.service ? styles.inputError : ""
              }`}
              id="cf-service"
              name="service"
              onChange={handleChange}
              required
              value={form.service}
            >
              <option value="">Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="AI & Machine Learning">
                AI &amp; Machine Learning
              </option>
              <option value="Blockchain Development">
                Blockchain Development
              </option>
              <option value="IoT Development">IoT Development</option>
              <option value="DevOps & Cloud">DevOps &amp; Cloud</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Game Development">Game Development</option>
              <option value="Not sure / Multiple">Not sure / Multiple</option>
            </select>
            {errors.service && (
              <p className={styles.fieldError}>{errors.service}</p>
            )}
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
              <option value="$5K – $25K">
                $5K &ndash; $25K (typical fixed-price project)
              </option>
              <option value="$25K – $75K">
                $25K &ndash; $75K (mid-sized build)
              </option>
              <option value="$75K – $250K">
                $75K &ndash; $250K (full product + MVP)
              </option>
              <option value="$250K+">$250K+ (enterprise / platform)</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
            <p className={styles.fieldHint}>
              Under $5K is below our minimum — but we&apos;ll refer you to a
              trusted freelancer.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cf-desc">
              Project details *
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
              <p className={styles.fieldError}>{errors.description}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cf-file">
              Attach a brief, deck, wireframe, or spec (optional)
            </label>
            <input
              accept=".pdf,.docx,.png,.jpg,.jpeg,.zip"
              className={styles.formInputFile}
              id="cf-file"
              onChange={handleFileChange}
              type="file"
            />
            <p className={styles.fieldHint}>
              PDF, DOCX, PNG, JPG, ZIP — max 10 MB
            </p>
          </div>

          <div className={styles.formGroupCheck}>
            <input
              checked={form.nda}
              className={styles.checkInput}
              id="cf-nda"
              name="nda"
              onChange={handleChange}
              type="checkbox"
            />
            <label className={styles.checkLabel} htmlFor="cf-nda">
              I need an NDA signed before sharing details
            </label>
          </div>

          <button
            className={`${styles.btnPrimary} ${
              submitting ? styles.btnSending : ""
            }`}
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Sending\u2026" : "Send your brief"}
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
            Frequently asked questions
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
              key={faq.q}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <button
                aria-controls={`faq-contact-answer-${i}`}
                aria-expanded={openIdx === i}
                className={styles.faqQuestion}
                id={`faq-contact-btn-${i}`}
                onClick={() => toggle(i)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
                type="button"
              >
                <h3>{faq.q}</h3>
                <span aria-hidden="true" className={styles.faqToggle}>
                  {openIdx === i ? "\u2212" : "+"}
                </span>
              </button>
              <div
                aria-labelledby={`faq-contact-btn-${i}`}
                className={styles.faqAnswer}
                id={`faq-contact-answer-${i}`}
                role="region"
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
