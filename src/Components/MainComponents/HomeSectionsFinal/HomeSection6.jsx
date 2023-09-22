import React, { useEffect } from "react";
import Image from "next/image";
import HomeSection6Counter from "./HomeSection6Counter";
import "animate.css";
import styles from "./HomeSection6.module.css";

function HomeSection6() {
  const animatedDivRefs = React.useRef(null);
  const animatedRefs = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__zoomIn",
            "animate__delay-0s",
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
    <div className={styles.HS6MainContainer}>
      <div className={styles.HS6Heading}>Why Zweidevs</div>
      <div>
        <div className={styles.circlecontainer}>
          <div className={styles.since10}>
            <div>Since</div>
            <div className={styles.sinceyear}>2010</div>
          </div>
          <div className={styles.circularbar}>
            <Image
              alt="home icon"
              height={100}
              src="/HomeIcons/HS6-circularbar.svg"
              width={100}
            />
          </div>
          <a className={styles.deg0}>
            <Image
              alt="zweidevs"
              height={300}
              src="/HomeIcons/HS6-customer.svg"
              width={300}
            />
          </a>
          <a className={styles.deg45}>
            <Image
              alt="zweidevs"
              height={300}
              src="/HomeIcons/HS6-funds.svg"
              width={300}
            />
          </a>
          <a className={styles.deg90}>
            <Image
              alt="zweidevs"
              height={300}
              src="/HomeIcons/HS6-team.svg"
              width={300}
            />
          </a>
          <a className={styles.deg135}>
            <Image
              alt="zweidevs"
              height={300}
              src="/HomeIcons/HS6-search.svg"
              width={300}
            />
          </a>
          <a className={styles.deg180}>
            <Image
              alt="zweidevs"
              height={300}
              src="/HomeIcons/projects-completed.svg"
              width={300}
            />
          </a>
          <div className={styles.projectcompleted}>
            <HomeSection6Counter
              duration={4}
              label={"Projects Completed"}
              number={"150"}
              sign={"+"}
            />
          </div>
          <div className={styles.positivereviews}>
            <HomeSection6Counter
              duration={4}
              label={"Positive Reviews"}
              number={"70"}
              sign={"+"}
            />
          </div>
          <div className={styles.teammembers}>
            <HomeSection6Counter
              duration={4}
              label={"Team Members"}
              number={"35"}
              sign={"+"}
            />
          </div>
          <div className={styles.fundingraised}>
            <HomeSection6Counter
              duration={2}
              label={"Funding Raised"}
              number={"3.5"}
              sign={".5M$"}
            />
          </div>
          <div className={styles.customersatisfaction}>
            <HomeSection6Counter
              duration={2}
              label={"Customer Satisfaction"}
              number={"99"}
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
  );
}

export default HomeSection6;
