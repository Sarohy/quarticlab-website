import Link from "next/link";
import navLinks from "@component/Constants/navLinks";
import { openPreferences } from "@component/utils/consent";
import styles from "./footer.module.css";

const FOOTER_SERVICES = [
  { href: "/services/genai-automation", text: "GenAI & Automation" },
  { href: "/services/ai-ml-development", text: "AI / ML Development" },
  { href: "/services/web-development", text: "Web Development" },
  { href: "/services/mobile-development", text: "Mobile Apps" },
  { href: "/services/blockchain-development", text: "Blockchain" },
  { href: "/services/iot-development", text: "IoT Solutions" },
  { href: "/services/devops", text: "DevOps & Cloud" },
  { href: "/services/ui-ux-design", text: "UI/UX Design" },
];

const FOOTER_SOCIAL = [
  { href: "https://www.linkedin.com/company/quarticlab/", text: "LinkedIn" },
  { href: "https://www.facebook.com/quarticlab", text: "Facebook" },
  { href: "https://instagram.com/quarticlab", text: "Instagram" },
  { href: "https://youtube.com/@quarticlab", text: "YouTube" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.fGrid}>
          {/* ── Brand ──────────────────────────── */}
          <div className={styles.fBrand}>
            <Link className={styles.fBrandLink} href="/">
              <svg
                aria-hidden="true"
                className={styles.fMark}
                viewBox="0 0 100 100"
              >
                <g
                  opacity="0.75"
                  stroke="oklch(93% 0.015 75)"
                  strokeLinecap="round"
                  strokeWidth="2.4"
                >
                  <line x1="50" x2="82" y1="18" y2="50" />
                  <line x1="50" x2="50" y1="18" y2="82" />
                  <line x1="50" x2="18" y1="18" y2="50" />
                  <line x1="82" x2="50" y1="50" y2="82" />
                  <line x1="82" x2="18" y1="50" y2="50" />
                  <line x1="50" x2="18" y1="82" y2="50" />
                </g>
                <g
                  fill="oklch(14% 0.04 255)"
                  stroke="oklch(58% 0.12 45)"
                  strokeWidth="3.6"
                >
                  <circle cx="50" cy="18" r="8" />
                  <circle cx="82" cy="50" r="8" />
                  <circle cx="50" cy="82" r="8" />
                  <circle cx="18" cy="50" r="8" />
                </g>
              </svg>
              <span className={styles.fBn}>
                Quartic<span>LAB</span>
              </span>
            </Link>
            <p className={styles.fBrandText}>
              A full-service software agency building web, mobile, and AI
              products that ship and scale. Based in Lahore. Delivering
              worldwide.
            </p>
          </div>

          {/* ── Quick links ────────────────────── */}
          <div className={styles.fCol}>
            <h4 className={styles.fColTitle}>Quick links</h4>
            {navLinks.map(({ href, text }) => (
              <Link className={styles.fColLink} href={href} key={href}>
                {text}
              </Link>
            ))}
          </div>

          {/* ── Services ───────────────────────── */}
          <div className={styles.fCol}>
            <h4 className={styles.fColTitle}>Services</h4>
            {FOOTER_SERVICES.map(({ href, text }) => (
              <Link className={styles.fColLink} href={href} key={href}>
                {text}
              </Link>
            ))}
          </div>

          {/* ── Connect ────────────────────────── */}
          <div className={styles.fCol}>
            <h4 className={styles.fColTitle}>Connect</h4>
            {FOOTER_SOCIAL.map(({ href, text }) => (
              <a
                className={styles.fColLink}
                href={href}
                key={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {text}
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────── */}
        <div className={styles.fBot}>
          <span>© {year} Quartic Lab. All rights reserved.</span>
          <span className={styles.fMono}>f(x) = x⁴ · BUILT TO SHIP</span>
          <span className={styles.fLegal}>
            <Link href="/privacy">Privacy</Link>
            <span className={styles.fSep}>·</span>
            <Link href="/terms">Terms</Link>
            <span className={styles.fSep}>·</span>
            <Link href="/cookies">Cookies</Link>
            <span className={styles.fSep}>·</span>
            <button
              className={styles.fLegalBtn}
              onClick={openPreferences}
              type="button"
            >
              Cookie preferences
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
