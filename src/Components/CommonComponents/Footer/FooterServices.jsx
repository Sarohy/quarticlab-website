import Link from "next/link";
import { useRouter } from "next/router";
import navLinks from "@component/Constants/navLinks";
import { useInView } from "react-intersection-observer";
import styles from "./footer.module.css";

const FooterServices = () => {
  const router = useRouter();
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      className={`${styles.footerFadeEl} ${inView ? styles.footerVisible : ""}`}
      ref={observerRef}
      style={{ transitionDelay: "80ms" }}
    >
      <h3 className={styles.footerColumnTitle}>Quick Links</h3>
      <div className={styles.footerLinksList}>
        {navLinks.map(({ href, text }) => (
          <Link
            className={`${styles.footerLinkItem} ${
              router.pathname === href ? styles.colorOrange : ""
            }`}
            href={href}
            key={href}
          >
            <span className={styles.footerLinkArrow}>→</span>
            {text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterServices;
