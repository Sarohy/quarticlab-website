import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "animate.css";
import Image from "next/image";
import styles from "./footer.module.css";
import SocialMedia from "./SocialMedia";

const YourComponent = (props) => {
  const { logo, socialMediaData } = props;
  const ref1 = useRef(null);
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animateRef = useRef(null);

  useEffect(() => {
    if (animateRef.current && inView) {
      animateRef.current.classList.add(
        "animate__animated",
        "animate__slideInLeft"
      );
    }
  }, [inView]);

  return (
    <div ref={observerRef}>
      <div ref={animateRef}>
        <Image src={logo} alt="zweidevs" width={200} />
        <div className={styles.footerAboutZweidevs}>
          {`
            Zweidevs provides dedicated \n
            remote teams that work closely with \n
            you to design and build your idea.
          `}
        </div>
        <SocialMedia data={socialMediaData} />
      </div>
    </div>
  );
};

export default YourComponent;
