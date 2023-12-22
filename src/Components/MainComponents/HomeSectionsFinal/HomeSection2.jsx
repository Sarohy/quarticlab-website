"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import HS2Img1 from "../../../../public/assets/HomeIcons/HSImg1.svg";
import HS2Img2 from "../../../../public/assets/HomeIcons/HSImg2.svg";
import HS2Img3 from "../../../../public/assets/HomeIcons/HSImg3.svg";
import HS2Img4 from "../../../../public/assets/HomeIcons/HSImg4.svg";
import HS2Img5 from "../../../../public/assets/HomeIcons/HSImg5.svg";
const BottomBorderButton = dynamic(() =>
  import("@component/Components/CommonComponents/BottomBorderButton"),
);
import styles from "./HomeSection2.module.css";
import { urls } from "@component/utils/urls";

function HomeSection2() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const animatedDivRefs = Array.from({ length: 2 }, () => React.useRef(null));
  const animatedHeadingRefs = Array.from({ length: 5 }, () =>
    React.useRef(null),
  );

  const myDivRef = useRef(null);

  const handleClickOutside = () => {
    // Check if the clicked element is outside the div
    if (myDivRef.current) {
      // If inside, remove focus and make it blur

      // myDivRef.current.style.background = 'red';
      // myDivRef.current.click();
      myDivRef.current.blur();
    }
  };

  useEffect(() => {
    // Add click event listener to the document body
    document.body.addEventListener("touchend", handleClickOutside);

    // Remove the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener("touchend", handleClickOutside);
    };
  }, [myDivRef, isHovered]);

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
      href: urls.services.WebApp.url,
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
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInLeft",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    const observer2 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__zoomIn");
        }
      });
    }, options);

    const observer3 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-1s",
          );
        }
      });
    }, options);

    animatedHeadingRefs.forEach(ref => {
      observer3.observe(ref.current);
    });

    animatedDivRefs.forEach(ref => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
      observer2.disconnect();
      observer3.disconnect();
    };
  }, []);
  return (
    <>
      <div className={styles.HS2MainContainer}>
        <div
          className={styles.HS2ContentContainer}
          ref={animatedDivRefs[0]}
        ></div>
        <div className={styles.HS2SubHeadContainer}>
          <h2 className={`${styles.HS2SubHeading}`} ref={animatedDivRefs[1]}>
            We Offer Everything That Your Business Needs
          </h2>
          <div className={styles.HS2Button}>
            <BottomBorderButton
              onClick={() => {
                router.push({
                  pathname: `/services`,
                });
              }}
              text="See All"
            />
          </div>
        </div>
        <div className={styles.HS2CardsContainer}>
          {cardData.map((item, index) => {
            return (
              <div
                className={styles.HS2CardMob}
                key={`${index}${item.key}`}
                // onClick={() => router.push(item.href)}
              >
                <div
                  className={styles.HS2FlipContainer}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setSelectedKey(index);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setSelectedKey(-1);
                  }}
                  onTouchStart={() => {
                    setIsHovered(true);
                    setSelectedKey(index);
                  }}
                  // onTouchCancel={() => {
                  //   setIsHovered(false);
                  //   setSelectedKey(-1);
                  // }}
                  // onTouchEnd={() => {
                  //   setIsHovered(false);
                  //   setSelectedKey(-1);
                  //   handleClickOutside();
                  // }}
                  ref={myDivRef}
                >
                  <div className={styles.HS2Flipper}>
                    <div
                      className={
                        isHovered && selectedKey == index
                          ? styles.HS2back
                          : styles.HS2front
                      }
                    >
                      <div className={styles.imageDiv}>
                        <Image
                          alt={`Zweidevs | ${item.heading}`}
                          className={styles.HS2SelectedImgWhite}
                          height={isHovered && selectedKey == index ? 40 : 80}
                          src={item.image}
                          width={isHovered && selectedKey == index ? 40 : 80}
                        />
                      </div>
                      <h3 ref={animatedHeadingRefs[index]}>{item.heading}</h3>
                      <div
                        className={
                          isHovered && selectedKey == index
                            ? ""
                            : styles.HS2back
                        }
                      >
                        <p>{item.details}</p>
                        <div
                          onClick={() => router.push(item.href)}
                          style={{
                            color: "white",
                            textAlign: "center",
                            textDecoration: "underline",
                          }}
                        >
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomeSection2;
