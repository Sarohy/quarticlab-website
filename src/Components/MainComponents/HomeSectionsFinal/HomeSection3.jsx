import React, { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import HS3Img from "../../../../public/assets/HomeIcons/HS3Img.svg";
const BottomBorderButton = dynamic(
  () => import("@component/Components/CommonComponents/BottomBorderButton"),
);
import styles from "./HomeSection3.module.css";

function HomeSection3() {
  const animatedDivRefs = Array.from({ length: 3 }, () => React.useRef(null));
  const animatedImgRef = React.useRef(null);
  const router = useRouter();

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.HS3Visible);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    animatedDivRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    if (animatedImgRef.current) {
      observer.observe(animatedImgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.HS3MainContainer}>
        <div className={styles.HS3ContentContainer}>
          <div className={styles.HS3TabContainer}>
            <div
              className={`${styles.HS3ContentHeading} ${styles.HS3SlideLeft}`}
              ref={animatedDivRefs[0]}
            ></div>
            <h2
              className={`${styles.HS3ContentText} ${styles.HS3SlideLeft}`}
              ref={animatedDivRefs[1]}
              style={{ transitionDelay: "100ms" }}
            >
              Work With Top Notch Designers And Developers To Get Amazing
              Products.
            </h2>
            <p
              className={`${styles.HS3ContentSubText} ${styles.HS3FadeEl}`}
              ref={animatedDivRefs[2]}
              style={{ transitionDelay: "200ms" }}
            >
              Zweidevs is a service-oriented company providing creative and
              innovative solutions for your business domain. We believe in
              exceeding your expectations by delivering thoughtfully innovated
              eye-catching products on your desk. We take a pride in engineering
              your requirements into robust software using our mobile, web,
              cloud and e-commerce capabilities.
            </p>
            <div className={styles.HS3ContactContainer}>
              <BottomBorderButton
                onClick={() => {
                  router.push("/aboutus");
                }}
                text="Explore More"
              />
            </div>
          </div>
          <div
            className={`${styles.HS3ImgContainer} ${styles.HS3SlideRight}`}
            ref={animatedImgRef}
          >
            <Image
              alt="Zweidevs | Custom Software Development Services Company"
              className={styles.HS3ImgWidth}
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={HS3Img}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection3;
