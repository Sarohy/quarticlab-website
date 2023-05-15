import { Box } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./servicesCard.module.css";

const ServicesCard = (props) => {
  const { cardData } = props;

  const animatedDivRefs = Array.from({ length: cardData.length }, () =>
    React.useRef(null)
  );

  const animatedNestedCardDivRefs = Array.from(
    { length: cardData.length },
    () => React.useRef(null)
  );

  // const animatedCardDetailsDivRefs = Array.from(
  //   { length: cardData.length },
  //   () => React.useRef(null)
  // );

  const animatedCardDetailsDivRefs = cardData.map((element, i) => {
    return element.footerImages.map((image, k) => {
      return React.useRef(null);
    });
  });

  console.log(animatedCardDetailsDivRefs);

  // const animatedCardDetailsDivRefs = Array.from(
  //   { length: cardData.length },
  //   () => React.useRef(Array.from({ length: cardData.footerImages.length }))
  // );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;

            // Code to handle animation
            // target.classList.remove("hidden");
            target.style.opacity = 1;
            target.classList.add(
              "animate__backInUp"
              // "animate__delay-1s"
            );
            target.addEventListener(
              "animationend",
              (e) => {
                e.stopPropagation();
                e.stopImmediatePropagation();
                animatedNestedCardDivRefs.forEach((ref) => {
                  observer2.observe(ref.current);
                });
              },
              { once: true }
            ); // Remove the event listener after it's triggered

            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;

            //target.classList.remove("hiddenNestedCard");
            target.style.opacity = 1;
            target.classList.add("animate__zoomIn", "animate__delay-1s");

            target.addEventListener(
              "animationend",
              (e) => {
                e.stopPropagation();
                e.stopImmediatePropagation();

                animatedCardDetailsDivRefs.forEach((i) => {
                  i.forEach((j) => {
                    observer3.observe(j.current);
                  });
                });
              },
              { once: true }
            ); // Remove the event listener after it's triggered

            observer2.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    const observer3 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, key) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.classList.add("animate__tada", "animate__delay-1s");
            target.style.opacity = 1;

            observer3.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    animatedDivRefs.forEach((ref) => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
            xl: "block",
            xxl: "block",
          },
        }}
      >
        {cardData.map((element, key) => (
          <div
            ref={animatedDivRefs[key]}
            key={key}
            // className="services-card-container animate__animated animate__backInRight animate__delay-1s"
            className={`${styles.hidden} services-card-container animate__animated`}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                  xxl: "flex",
                },
              }}
            >
              <div
                ref={animatedNestedCardDivRefs[key]}
                className={`${styles.hiddenNestedCard} animate__animated ${styles.servicesIconCardContainer}`}
              >
                <Image
                  className="services-icon"
                  src={element.cardIcon}
                  alt="web-dev-icon"
                  height={"auto"}
                />
                <div className="services-icon-card-title">
                  <div>
                    {element.cardIconTitle.firstLine}
                    <br></br>
                    {element.cardIconTitle.secondLine}
                  </div>
                </div>
              </div>
            </Box>

            <div
              className={`services-card-details-container`}
              //style={{ display: "none" }}
            >
              <span className={styles.servicesCardDetailsHeader}>
                {element.cardTitle}
              </span>
              <div className={styles.servicesCardDetails}>
                {element.cardDetails}{" "}
              </div>
              <div className={styles.servicesCardFooterContainer}>
                <span className={styles.servicesCardFooterHeader}>
                  {element.footerTitle}:
                </span>
                <div className={styles.servicesFooterImagesContainer}>
                  {element.footerImages &&
                    element.footerImages.map((image, imgkey) => (
                      <Image
                        key={imgkey}
                        ref={animatedCardDetailsDivRefs[key][imgkey]}
                        className={`${styles.hiddenCardDetailss} animate__animated services-footer-image`}
                        src={image}
                        alt={"node-icon"}
                        style={{ width: "auto", height: 38 }}
                        // height={20}
                        // width={"auto"}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Box>

      {/* mobile View */}
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            md: "none",
            lg: "none",
            xl: "none",
            xxl: "none",
          },
        }}
      >
        {cardData.map((element, key) => (
          <Box key={key}>
            <div className="services-icon-card-container-mobile">
              <Image
                className="services-icon"
                src={element.cardIcon}
                alt="web-dev-icon"
                height={"auto"}
              />
              <div className="services-icon-card-title">
                <div>
                  {element.cardIconTitle.firstLine}
                  <br></br>
                  {element.cardIconTitle.secondLine}
                </div>
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ServicesCard;
