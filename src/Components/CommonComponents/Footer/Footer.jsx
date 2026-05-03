import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { openPreferences } from "@component/utils/consent";

const FooterAbout = dynamic(() => import("./FooterAbout"));
const FooterSocial = dynamic(() => import("./FooterSocial"));
const FooterServices = dynamic(() => import("./FooterServices"));
const FooterAllServices = dynamic(() => import("./FooterAllServices"));

import styles from "./footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerMainContainer}>
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
            <Image
              alt="Quartic Lab mark"
              height={24}
              src="/mark-light.svg"
              style={{ display: "block" }}
              width={24}
            />
            <span className={styles.footerCopyright}>
              {currentYear} Quartic Lab. All rights reserved.
            </span>
          </div>
          <div className={styles.footerBottomRight}>
            <Link className={styles.footerBottomLink} href="/contact">
              Contact
            </Link>
            <span className={styles.footerDot}>·</span>
            <Link className={styles.footerBottomLink} href="/about">
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
          <span className={styles.footerDot}>·</span>
          <button
            className={styles.footerLegalLink}
            onClick={openPreferences}
            type="button"
          >
            Cookie preferences
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
