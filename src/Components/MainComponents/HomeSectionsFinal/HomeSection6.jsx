import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./HomeSection6.module.css";
import HomeSection6Counter from "./HomeSection6Counter";

function HomeSection6({ heading }) {
  const headingRef = React.useRef(null);
  const circleRef = React.useRef(null);

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.HS6Visible);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    if (circleRef.current) {
      observer.observe(circleRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.HS6MainContainer}>
      <div
        className={`${styles.HS6Heading} ${styles.HS6FadeEl}`}
        ref={headingRef}
      >
        {heading}
      </div>
      <div>
        <div
          className={`${styles.circlecontainer} ${styles.HS6FadeEl}`}
          ref={circleRef}
          style={{ transitionDelay: "150ms" }}
        >
          <div className={styles.since10}>
            <div>Since</div>
            <div className={styles.sinceyear}>2020</div>
          </div>
          <div className={styles.circularbar}>
            <Image
              alt="circularbar logo"
              height={100}
              src="/HomeIcons/HS6-circularbar.svg"
              width={100}
            />
          </div>
          <a className={styles.deg0}>
            <Image
              alt="Customr logo"
              height={300}
              src="/HomeIcons/HS6-customer.svg"
              width={300}
            />
          </a>
          <a className={styles.deg45}>
            <Image
              alt="funds logo"
              height={300}
              src="/HomeIcons/HS6-funds.svg"
              width={300}
            />
          </a>
          <a className={styles.deg90}>
            <Image
              alt="teams logo"
              height={300}
              src="/HomeIcons/HS6-team.svg"
              width={300}
            />
          </a>
          <a className={styles.deg135}>
            <Image
              alt="search logo"
              height={300}
              src="/HomeIcons/HS6-search.svg"
              width={300}
            />
          </a>
          <a className={styles.deg180}>
            <Image
              alt="projects completed logo"
              height={300}
              src="/HomeIcons/projects-completed.svg"
              width={300}
            />
          </a>
          <div className={styles.projectcompleted}>
            <HomeSection6Counter
              duration={4}
              label={"Projects Completed"}
              number={"412"}
              sign={"+"}
            />
          </div>
          <div className={styles.positivereviews}>
            <HomeSection6Counter
              duration={4}
              label={"Positive Reviews"}
              number={"682"}
              sign={"+"}
            />
          </div>
          <div className={styles.teammembers}>
            <HomeSection6Counter
              duration={4}
              label={"Team Members"}
              number={"95"}
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
              label={"Customr Satisfaction"}
              number={"99"}
              sign={"%"}
            />
          </div>
          <div className={styles.linecontainer1}></div>
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
