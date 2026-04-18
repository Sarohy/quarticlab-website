import { useInView } from "react-intersection-observer";
import QuarticMark from "@component/Components/CommonComponents/QuarticMark";
import styles from "./footer.module.css";

const FooterAbout = () => {
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      className={`${styles.footerSlideLeft} ${
        inView ? styles.footerVisible : ""
      }`}
      ref={observerRef}
    >
      <div className={styles.footerAboutImageContainer}>
        <div className={styles.footerLogoGlow}>
          <QuarticMark
            accent="oklch(58% 0.12 45)"
            bg="oklch(20% 0.05 255)"
            fg="oklch(95% 0.018 75)"
            size={36}
          />
        </div>
        <h3 className={styles.footerAboutHeading}>QUARTIC LAB</h3>
      </div>
      <p className={styles.footerAboutZweidevs}>
        We build instruments for people who build instruments. Four disciplines,
        one research environment.
      </p>
      <div className={styles.footerAboutTagline}>
        <span className={styles.taglineDash} />
        <span className={styles.taglineText}>Build precisely.</span>
      </div>
      <div className={styles.trustBadges}>
        <div className={styles.trustBadge}>
          <span className={styles.trustBadgeValue}>50+</span>
          <span className={styles.trustBadgeLabel}>Projects delivered</span>
        </div>
        <div className={styles.trustBadge}>
          <span className={styles.trustBadgeValue}>12h</span>
          <span className={styles.trustBadgeLabel}>Estimate turnaround</span>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout;
