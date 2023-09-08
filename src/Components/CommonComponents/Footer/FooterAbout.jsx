import { useEffect, useRef } from "react";
import { Logo } from "@component/assets/footerIcons";
import { useInView } from "react-intersection-observer";
import styles from "./footer.module.css";
import Image from "next/image";

const FooterAbout = () => {
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animateRef = useRef(null);

  useEffect(() => {
    if (animateRef.current && inView) {
      animateRef.current.classList.add(
        "animate__animated",
        "animate__slideInLeft",
      );
    }
  }, [inView]);

  return (
    <>
      <div ref={observerRef}>
        <div ref={animateRef}>
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
      </div>
    </>
  );
};

export default FooterAbout;
