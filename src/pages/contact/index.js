import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { submitContactForm } from "@component/firebase/firebaseRequests";
import COUNTRIES from "@component/utils/countries";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "../../styles/contactNew.module.css";

/* ── data ────────────────────────────────────────── */
const contactMethods = [
  {
    desc: "We respond within 4 business hours.",
    detail: "contact@quarticlab.com",
    href: "mailto:contact@quarticlab.com",
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="20"
        viewBox="0 0 28 28"
        width="20"
      >
        <rect
          height="16"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.6"
          width="22"
          x="3"
          y="6"
        />
        <path
          d="M3 8l11 7 11-7"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    ),
    title: "Email us",
  },
  {
    desc: "Our Lahore office · Serving clients in US, EU, and MENA.",
    detail: "6-B, Block B Phase 1, Johar Town, Lahore",
    href: "https://maps.google.com/?q=Johar+Town+Lahore",
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="20"
        viewBox="0 0 28 28"
        width="20"
      >
        <path
          d="M14 3C9.58 3 6 6.58 6 11c0 6.5 8 14 8 14s8-7.5 8-14c0-4.42-3.58-8-8-8z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="14" cy="11" r="3" stroke="currentColor" strokeWidth="1.6" />
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
        height="20"
        viewBox="0 0 28 28"
        width="20"
      >
        <path
          d="M6 4h5l2 5-3 2a11 11 0 005 5l2-3 5 2v5a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    ),
    title: "Call us",
  },
];

const trustPoints = [
  "4-hour first response",
  "NDA before discovery",
  "Written estimate in 12 hours",
  "No sales call required",
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
    a: "Yes. We deliver a detailed estimate within 12 hours at no charge. For complex projects, we may offer a paid Discovery Sprint ($2,500, 1–2 weeks, credited toward the build if you proceed).",
    q: "Is the initial estimate free?",
  },
  {
    a: "Yes, always — and before we discuss any project specifics. Check the “I need an NDA” box in the form and we'll send one within 4 hours.",
    q: "Do you sign NDAs?",
  },
  {
    a: "Our minimum is $5,000. If your project is smaller, we'll refer you to a trusted freelancer in our network — for free.",
    q: "What if my project is too small?",
  },
  {
    a: "Our core team is in Lahore (PKT). We regularly overlap working hours with US East Coast, UK, EU, and GCC time zones. Every project has at least 3 hours of live overlap with the client's time zone.",
    q: "What time zones do you cover?",
  },
];

const CONTACT_KICKER =
  "CONTACT · 4H FIRST RESPONSE · 12H WRITTEN ESTIMATE · NO SALES CALL REQUIRED";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/contact#faq`,
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
      <Seo
        canonical={`${SITE_URL}/contact`}
        description="Talk to Quartic Lab. Share a brief, get a 12-hour estimate from a senior engineer — not a sales rep. Phone, email, and Lahore office."
        ogDescription="Talk to Quartic Lab. Share a brief, get a 12-hour estimate from a senior engineer — not a sales rep."
        ogTitle="Contact — Quartic Lab"
        title="Contact | Quartic Lab"
        twitterDescription="Talk to Quartic Lab. Share a brief, get a 12-hour estimate from a senior engineer — not a sales rep."
        twitterTitle="Contact — Quartic Lab"
      >
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          type="application/ld+json"
        />
      </Seo>

      {/* ─── HERO + CHANNELS ──────────────────── */}
      <HeroChannels />

      {/* ─── BRIEF FORM ───────────────────────── */}
      <FormSection />

      {/* ─── FAQ ──────────────────────────────── */}
      <FAQSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HERO + CHANNEL CARDS
   ══════════════════════════════════════════════════ */
function HeroChannels() {
  const kickerRef = useRef(null);

  /* scramble the hero kicker on mount */
  useEffect(() => {
    const el = kickerRef.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = CONTACT_KICKER;
      return;
    }
    const glyphs = "◆#/\\+×—·01";
    const total = 46;
    let frame = 0;
    let tid = null;
    const tick = () => {
      let out = "";
      for (let i = 0; i < CONTACT_KICKER.length; i++) {
        const threshold = (i / CONTACT_KICKER.length) * total * 0.8;
        out +=
          frame > threshold
            ? CONTACT_KICKER[i]
            : CONTACT_KICKER[i] === " "
              ? " "
              : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
      if (frame++ < total) {
        tid = setTimeout(tick, 34);
      } else {
        el.textContent = CONTACT_KICKER;
      }
    };
    tick();
    return () => clearTimeout(tid);
  }, []);

  return (
    <header className={styles.chero}>
      <div className={styles.container}>
        <span className={styles.kick} ref={kickerRef}>
          &nbsp;
        </span>
        <h1 className={styles.h1}>
          <span className={styles.ln}>
            <span>Tell us what</span>
          </span>
          <span className={styles.ln}>
            <span>
              you&apos;re <em>building.</em>
            </span>
          </span>
        </h1>
        <p className={styles.heroLead}>
          Share a brief of what you&apos;re building. A senior engineer &mdash;
          not a sales rep &mdash; will respond within 4 hours with a scope,
          timeline, and cost estimate. No discovery call required unless you
          want one.
        </p>

        <div className={styles.chanGrid}>
          {contactMethods.map((m, i) => (
            <a
              className={`${styles.chan} ${styles.reveal}`}
              href={m.href}
              key={m.title}
              rel="noopener noreferrer"
              style={{ transitionDelay: `${i * 90}ms` }}
              target={m.href.startsWith("http") ? "_blank" : undefined}
            >
              <span className={styles.ci}>{m.icon}</span>
              <h3 className={styles.chanTitle}>{m.title}</h3>
              <span className={styles.cv}>{m.detail}</span>
              <p className={styles.chanDesc}>
                {m.desc}
                {m.descNote && (
                  <>
                    <br />
                    {m.descNote}
                  </>
                )}
              </p>
            </a>
          ))}
        </div>

        <p className={`${styles.calNote} ${styles.reveal}`}>
          Outside Pakistan hours?{" "}
          <a
            className={styles.calLink}
            href="https://calendly.com/quarticlab/30min"
            rel="noopener noreferrer"
            target="_blank"
          >
            Book a 30-min call at a time that works for you →
          </a>
        </p>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════
   BRIEF FORM SECTION
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
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  /* ── bot protection ─────────────────────── */
  const [honeypot, setHoneypot] = useState("");
  const formLoadTime = useRef(Date.now());

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
    if (f && f.size > 10 * 1024 * 1024) {
      setFileError("File exceeds 10 MB. Please attach a smaller file.");
      setFile(null);
      return;
    }
    setFileError("");
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
    /* Silently reject bots: honeypot filled or form submitted faster
       than any human could read + fill it (~3 s). Show success so bots
       don't know they were blocked. */
    if (honeypot || Date.now() - formLoadTime.current < 3000) {
      setSubmitted(true);
      return;
    }
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
          "contact@quarticlab.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.briefSec} id="brief">
      <div className={`${styles.container} ${styles.briefGrid}`}>
        {/* ── aside ── */}
        <aside>
          <div className={styles.reveal}>
            <span className={styles.eb}>
              <i />
              Project brief form
            </span>
            <h2 className={styles.h2}>
              The fastest way to get a <em>real estimate</em>
            </h2>
            <p className={styles.briefLead}>
              Fill this out in 3 minutes. You&apos;ll get a scope, timeline,
              team composition, and cost breakdown within 12 business hours —
              written by a senior engineer, not a sales rep.
            </p>
          </div>

          <div className={`${styles.trust} ${styles.reveal}`}>
            {trustPoints.map(point => (
              <div className={styles.tr} key={point}>
                <span className={styles.tk}>&#10003;</span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <p className={`${styles.briefAside} ${styles.reveal}`}>
            PREFER EMAIL? SEND YOUR BRIEF DIRECTLY TO
            <br />
            CONTACT@QUARTICLAB.COM — SAME 4-HOUR CLOCK.
          </p>
        </aside>

        {/* ── form / success ── */}
        {submitted ? (
          <div className={`${styles.formOk} ${styles.reveal}`}>
            <b>Brief received.</b>
            <p>
              A senior engineer is reviewing it now and will reply within 4
              business hours with either a scope, timeline, and cost estimate —
              or clarifying questions if the brief needs more detail.
            </p>
            <ul className={styles.okLinks}>
              <li>
                <a
                  href="https://calendly.com/quarticlab/30min"
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
        ) : (
          <form
            className={`${styles.cform} ${styles.reveal}`}
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

            <div className={styles.fld}>
              <label htmlFor="cf-name">
                Full name <b>*</b>
              </label>
              <input
                autoComplete="name"
                className={errors.name ? styles.err : ""}
                id="cf-name"
                name="name"
                onChange={handleChange}
                type="text"
                value={form.name}
              />
              {errors.name && (
                <span className={styles.fieldError}>{errors.name}</span>
              )}
            </div>

            <div className={styles.fld}>
              <label htmlFor="cf-email">
                Email address <b>*</b>
              </label>
              <input
                autoComplete="email"
                className={errors.email ? styles.err : ""}
                id="cf-email"
                name="email"
                onChange={handleChange}
                type="email"
                value={form.email}
              />
              {errors.email && (
                <span className={styles.fieldError}>{errors.email}</span>
              )}
            </div>

            <div className={styles.fld}>
              <label htmlFor="cf-country">Country</label>
              <select
                id="cf-country"
                name="country"
                onChange={handleChange}
                value={form.country}
              >
                <option value="">Select country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fld}>
              <label htmlFor="cf-phone">Phone number</label>
              <input
                autoComplete="tel"
                id="cf-phone"
                name="contact"
                onChange={handleChange}
                placeholder="+92 300 1234567"
                type="text"
                value={form.contact}
              />
            </div>

            <div className={`${styles.fld} ${styles.full}`}>
              <label htmlFor="cf-service">
                Service interested in <b>*</b>
              </label>
              <select
                className={errors.service ? styles.err : ""}
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
                <option value="genai-automation">GenAI &amp; Automation</option>
                <option value="Not sure / Multiple">Not sure / Multiple</option>
              </select>
              {errors.service && (
                <span className={styles.fieldError}>{errors.service}</span>
              )}
            </div>

            <div className={`${styles.fld} ${styles.full}`}>
              <label htmlFor="cf-budget">Project budget</label>
              <select
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
              {form.budget === "Under $5K" && (
                <span className={styles.budgetNote}>
                  Under $5K is below our minimum — but we&apos;ll refer you to a
                  trusted freelancer.
                </span>
              )}
            </div>

            <div className={`${styles.fld} ${styles.full}`}>
              <label htmlFor="cf-desc">
                Project details <b>*</b>
              </label>
              <textarea
                className={errors.description ? styles.err : ""}
                id="cf-desc"
                name="description"
                onChange={handleChange}
                placeholder="What are you building, who is it for, and what does done look like?"
                required
                value={form.description}
              />
              {errors.description && (
                <span className={styles.fieldError}>{errors.description}</span>
              )}
            </div>

            <div className={`${styles.fld} ${styles.full}`}>
              <label htmlFor="cf-file">
                Attach a brief, deck, wireframe, or spec (optional)
              </label>
              <div className={`${styles.fdrop} ${file ? styles.has : ""}`}>
                <input
                  accept=".pdf,.docx,.png,.jpg,.jpeg,.zip"
                  aria-label="Attach a file"
                  id="cf-file"
                  onChange={handleFileChange}
                  type="file"
                />
                <span className={styles.fdT}>
                  Drop a file here or click to browse
                </span>
                <span className={styles.fdS}>
                  PDF, DOCX, PNG, JPG, ZIP — MAX 10 MB
                </span>
                {file && <span className={styles.fdFile}>{file.name}</span>}
              </div>
              {fileError && <span className={styles.fdErr}>{fileError}</span>}
            </div>

            <div className={`${styles.fld} ${styles.full} ${styles.ndaRow}`}>
              <label className={styles.nda}>
                <input
                  checked={form.nda}
                  name="nda"
                  onChange={handleChange}
                  type="checkbox"
                />
                <span className={styles.box}>&#10003;</span>
                <span className={styles.ndaText}>
                  I need an NDA signed before sharing details
                </span>
              </label>
            </div>

            {/* Honeypot — off-screen, invisible to real users.
                 Bots fill it; we silently discard the submission. */}
            <div aria-hidden="true" className={styles.hp}>
              <label htmlFor="cf-website">Website</label>
              <input
                autoComplete="off"
                id="cf-website"
                name="website"
                onChange={e => setHoneypot(e.target.value)}
                tabIndex={-1}
                type="text"
                value={honeypot}
              />
            </div>

            <button
              className={`${styles.submitBtn} ${
                submitting ? styles.btnSending : ""
              }`}
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Sending…" : "Send your brief"}
              <span className={styles.arr}>→</span>
            </button>
          </form>
        )}
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
        <div className={styles.faqHead}>
          <span className={`${styles.eb} ${styles.ebCenter} ${styles.reveal}`}>
            <i />
            FAQ
          </span>
          <h2 className={`${styles.faqTitle} ${styles.reveal}`}>
            Quick answers, <em>most-asked first</em>
          </h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div
              className={`${styles.faqItem} ${
                openIdx === i ? styles.faqOpen : ""
              }`}
              key={faq.q}
            >
              <button
                aria-controls={`faq-contact-answer-${i}`}
                aria-expanded={openIdx === i}
                className={styles.fq}
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
                {faq.q}
                <span aria-hidden="true" className={styles.ic}>
                  +
                </span>
              </button>
              <div
                aria-labelledby={`faq-contact-btn-${i}`}
                className={`${styles.fa} ${openIdx === i ? styles.faOpen : ""}`}
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
