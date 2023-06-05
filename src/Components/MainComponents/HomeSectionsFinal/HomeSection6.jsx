import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import HomeSection6Counter from "./HomeSection6Counter";
import "animate.css";

function HomeSection6({ handleButtonClick }) {
  const animatedDivRefs = React.useRef(null);
  const animatedRefs = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__zoomIn",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    if (animatedRefs.current) {
      observer1.observe(animatedRefs.current);
    }

    if (animatedDivRefs.current) {
      observer.observe(animatedDivRefs.current);
    }

    return () => {
      observer.disconnect();
      observer1.disconnect();
    };
  }, []);
  return (
    <>
      <div className={styles.HS6MainContainer}>
        <div className={styles.HS6Heading}>Why Zweidevs</div>
        <div>
          <div className={styles.circlecontainer}>
            <div className={styles.since10}>
              <div>Since</div>
              <div className={styles.sinceyear}>2010</div>
            </div>
            <div className={styles.circularbar}>
              <img src="/HomeIcons/HS6-circularbar.svg" />
            </div>
            <a className={styles.deg0}>
              <Image
                src="/HomeIcons/HS6-customer.svg"
                alt="zweidevs"
                width={300}
                height={300}
              />
            </a>
            <a className={styles.deg45}>
              <Image
                src="/HomeIcons/HS6-funds.svg"
                alt="zweidevs"
                width={300}
                height={300}
              />
            </a>
            <a className={styles.deg90}>
              <Image
                src="/HomeIcons/HS6-team.svg"
                alt="zweidevs"
                width={300}
                height={300}
              />
            </a>
            <a className={styles.deg135}>
              <Image
                src="/HomeIcons/HS6-search.svg"
                alt="zweidevs"
                width={300}
                height={300}
              />
            </a>
            <a className={styles.deg180}>
              <Image
                src="/HomeIcons/projects-completed.svg"
                alt="zweidevs"
                width={300}
                height={300}
              />
            </a>
            <div className={styles.projectcompleted}>
              <HomeSection6Counter
                label={"Projects Completed"}
                number={"150"}
                duration={4}
                sign={"+"}
              />
            </div>
            <div className={styles.positivereviews}>
              <HomeSection6Counter
                label={"Positive Reviews"}
                number={"70"}
                duration={4}
                sign={"+"}
              />
            </div>
            <div className={styles.teammembers}>
              <HomeSection6Counter
                label={"Team Members"}
                number={"35"}
                duration={4}
                sign={"+"}
              />
            </div>
            <div className={styles.fundingraised}>
              <HomeSection6Counter
                label={"Funding Raised"}
                number={"3.5"}
                duration={2}
                sign={".5M $"}
              />
            </div>
            <div className={styles.customersatisfaction}>
              <HomeSection6Counter
                label={"Customer Satisfaction"}
                number={"99"}
                duration={2}
                sign={"%"}
              />
            </div>
            <div
              className={`${styles.linecontainer1} animate__delay-8s animate__animated animate__zoomIn`}
            ></div>
            <div className={styles.linecontainer2}></div>
            <div className={styles.linecontainer3}></div>
            <div className={styles.linecontainer4}></div>
            <div className={styles.linecontainer5}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection6;
