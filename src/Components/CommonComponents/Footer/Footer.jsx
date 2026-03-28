import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const FooterAbout = dynamic(() => import("./FooterAbout"));
const FooterSocial = dynamic(() => import("./FooterSocial"));
const FooterServices = dynamic(() => import("./FooterServices"));
const FooterAllServices = dynamic(() => import("./FooterAllServices"));

import Logo from "../../../../public/assets/footerIcons/logo.svg";
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
              Get Your Project Estimate
              <span className={styles.ctaHighlight}> in 16 Hours</span>
            </h2>
            <p className={styles.ctaBannerDesc}>
              Share your idea — we&apos;ll send a detailed scope, timeline &
              cost breakdown within 16 hours. No strings attached.
            </p>
          </div>
          <div className={styles.ctaBannerActions}>
            <a
              className={styles.ctaBannerButton}
              href="https://calendly.com/request-demo-zweidevs/meeting"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={styles.ctaBtnIcon}>⚡</span>
              Get Free Estimate
            </a>
            <Link className={styles.ctaBannerSecondary} href="/contactUs">
              or send us a message →
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
            <Image alt="zweidevs" height={28} src={Logo} width={28} />
            <span className={styles.footerCopyright}>
              © {currentYear} Zweidevs. All Rights Reserved.
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
            <span className={styles.footerDot}>·</span>
            <Link className={styles.footerBottomLink} href="/how-we-work">
              How We Work
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
