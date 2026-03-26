import React, { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import HS2Img1 from "../../../../public/assets/HomeIcons/HSImg1.svg";
import HS2Img2 from "../../../../public/assets/HomeIcons/HSImg2.svg";
import HS2Img3 from "../../../../public/assets/HomeIcons/HSImg3.svg";
import HS2Img4 from "../../../../public/assets/HomeIcons/HSImg4.svg";
import HS2Img5 from "../../../../public/assets/HomeIcons/HSImg5.svg";
const BottomBorderButton = dynamic(
  () => import("@component/Components/CommonComponents/BottomBorderButton"),
);
import styles from "./HomeSection2.module.css";
import { urls } from "@component/utils/urls";

function HomeSection2() {
  const router = useRouter();
  const headingRef = useRef(null);
  const animatedCardRefs = Array.from({ length: 5 }, () => React.useRef(null));

  const cardData = [
    {
      key: "hs2Img1",
      image: HS2Img1,
      heading: "Blockchain Development",
      href: urls.services.BC.url,
      details:
        "Blockchain is the backbone technology of digital cryptocurrency Bitcoin. We have a team of blockchain developers dedicated to ensuring accurate deployment.",
    },
    {
      key: "hs2Img2",
      image: HS2Img2,
      heading: "DevOps Development",
      href: urls.services.DevOPS.url,
      details:
        " DevOps facilitates the evolution and accelerated improvement of products. Our team ensures the correct deployment of applications and guarantees seamless automation execution.",
    },
    {
      key: "hs2Img3",
      image: HS2Img3,
      heading: "Web Development",
      href: urls.services.WebApp.url,
      details:
        "We are a creative web development team, who aim to leverage the latest technological advances with thoughtful design and serious engineering to build tailored solutions for any industry.",
    },
    {
      key: "hs2Img4",
      image: HS2Img4,
      heading: "Ecommerce Development",
      href: urls.services.Ecommerce.url,
      details:
        "Our team assist you in expanding the global reach of your product or business by seamlessly transitioning your offline stores to the global web.",
    },
    {
      key: "hs2Img5",
      image: HS2Img5,
      heading: "Mobile App Development",
      href: urls.services.MobileApp.url,
      details:
        "We specialize in developing sleek native and hybrid mobile apps, prioritizing customer satisfaction and performance at the core.",
    },
  ];

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    if (headingRef.current) { observer.observe(headingRef.current); }
    animatedCardRefs.forEach(ref => {
      if (ref.current) { observer.observe(ref.current); }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.HS2MainContainer}>
        <div className={styles.HS2ContentContainer}></div>
        <div className={styles.HS2SubHeadContainer}>
          <h2
            className={`${styles.HS2SubHeading} ${styles.fadeUpEl}`}
            ref={headingRef}
          >
            We Offer Everything That Your Business Needs
          </h2>
          <div className={styles.HS2Button}>
            <BottomBorderButton
              onClick={() => {
                router.push({ pathname: `/services` });
              }}
              text="See All"
            />
          </div>
        </div>
        <div className={styles.HS2CardsContainer}>
          {cardData.map((item, index) => (
            <div
              className={`${styles.HS2CardWrapper} ${styles.fadeUpEl}`}
              key={item.key}
              ref={animatedCardRefs[index]}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div
                className={styles.HS2Card}
                onClick={() => router.push(item.href)}
              >
                <div className={styles.HS2CardFront}>
                  <div className={styles.imageDiv}>
                    <Image
                      alt={`Zweidevs | ${item.heading}`}
                      height={80}
                      src={item.image}
                      width={80}
                    />
                  </div>
                  <h3 className={styles.HS2CardTitle}>{item.heading}</h3>
                </div>
                <div className={styles.HS2CardOverlay}>
                  <Image
                    alt={`Zweidevs | ${item.heading}`}
                    height={44}
                    src={item.image}
                    style={{ filter: "brightness(0) invert(1)" }}
                    width={44}
                  />
                  <h3 className={styles.HS2CardOverlayTitle}>{item.heading}</h3>
                  <p className={styles.HS2CardOverlayText}>{item.details}</p>
                  <span className={styles.HS2ViewLink}>View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeSection2;
