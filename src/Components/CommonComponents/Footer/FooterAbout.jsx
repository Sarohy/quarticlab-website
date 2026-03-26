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
    <>
      <div
        className={`${styles.footerSlideLeft} ${
          inView ? styles.footerVisible : ""
        }`}
        ref={observerRef}
      >
        <div className={styles.footerAboutImageContainer}>
          <Image
            alt="zweidevs"
            className={styles.footerAboutImageContainerLogo}
            src={Logo}
            width={76}
          />
          <h3 className={styles.footerAboutHeading}>ZWEIDEVS</h3>
        </div>
        <p className={styles.footerAboutZweidevs}>
          {`
            Zweidevs provides dedicated \n
            remote teams that work closely with \n
            you to design and build your idea.
          `}
        </p>
      </div>
    </>
  );
};

export default FooterAbout;
