import Link from "next/link";
import dynamic from "next/dynamic";

const FooterAbout = dynamic(() => import("./FooterAbout"));
const FooterSocial = dynamic(() => import("./FooterSocial"));
const FooterServices = dynamic(() => import("./FooterServices"));
const FooterAllServices = dynamic(() => import("./FooterAllServices"));

import QuarticMark from "@component/Components/CommonComponents/QuarticMark";
import styles from "./footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerMainContainer}>
      {/* ── CTA Banner ───────────────────────── */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <div className={styles.ctaBannerContent}>
            <span className={styles.ctaBadge}>
              <span className={styles.ctaBadgeDot} />
              Avg. response: 4 hours
            </span>
            <h2 className={styles.ctaBannerTitle}>
              Get a full project estimate
              <span className={styles.ctaHighlight}> in 12 hours</span>
            </h2>
            <p className={styles.ctaBannerDesc}>
              Scope, timeline, team composition, and cost — delivered to your
              inbox. No sales call required.
            </p>
          </div>
          <div className={styles.ctaBannerActions}>
            <a
              className={styles.ctaBannerButton}
              href="https://calendly.com/request-demo-zweidevs/meeting"
              rel="noopener noreferrer"
              target="_blank"
            >
              Book a 30-min call
            </a>
            <Link className={styles.ctaBannerSecondary} href="/contactUs">
              Send a brief instead
            </Link>
          </div>
        </div>
      </div>

      {/* ── Top accent line ──────────────────── */}
      <div className={styles.footerAccentBar} />

      {/* ── Main grid ────────────────────────── */}
      <div className={styles.footerInner}>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footAboutWidth}>
            <FooterAbout />
          </div>
          <div className={styles.footNavWidth}>
            <FooterServices />
          </div>
          <div className={styles.footServiceWidth}>
            <FooterAllServices />
          </div>
          <div className={styles.footSocialWidth}>
            <FooterSocial />
          </div>
        </div>

        {/* ── Divider ────────────────────────── */}
        <div className={styles.footerDivider} />

        {/* ── Bottom bar ─────────────────────── */}
        <div className={styles.footerBottomBar}>
          <div className={styles.footerBottomLeft}>
            <QuarticMark size={24} />
            <span className={styles.footerCopyright}>
              {currentYear} Quartic Lab. All rights reserved.
            </span>
          </div>
          <div className={styles.footerBottomRight}>
            <Link className={styles.footerBottomLink} href="/contactUs">
              Contact
            </Link>
            <span className={styles.footerDot}>·</span>
            <Link className={styles.footerBottomLink} href="/aboutus">
              About
            </Link>
          </div>
        </div>

        {/* ── Legal row ──────────────────────── */}
        <div className={styles.footerLegalRow}>
          <Link className={styles.footerLegalLink} href="/privacy">
            Privacy Policy
          </Link>
          <span className={styles.footerDot}>·</span>
          <Link className={styles.footerLegalLink} href="/terms">
            Terms of Service
          </Link>
          <span className={styles.footerDot}>·</span>
          <Link className={styles.footerLegalLink} href="/cookies">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
