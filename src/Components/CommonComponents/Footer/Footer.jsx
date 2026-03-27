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
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
