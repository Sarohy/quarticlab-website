import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Logo from "../../../../public/assets/footerIcons/logo.svg";
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
          <Image
            alt="zweidevs"
            className={styles.footerAboutImageContainerLogo}
            height={42}
            src={Logo}
            width={42}
          />
        </div>
        <h3 className={styles.footerAboutHeading}>ZWEIDEVS</h3>
      </div>
      <p className={styles.footerAboutZweidevs}>
        Zweidevs provides dedicated remote teams that work closely with you to
        design and build your idea into a product that scales.
      </p>
      <div className={styles.footerAboutTagline}>
        <span className={styles.taglineDash} />
        <span className={styles.taglineText}>Turning ideas into reality</span>
      </div>
    </div>
  );
};

export default FooterAbout;
