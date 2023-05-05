import { Box } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./servicesCard.module.css";

const ServicesCard = (props) => {
  const { cardData } = props;

  const animatedDivRefs = Array.from({ length: cardData.length }, () =>
    React.useRef(null)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Code to handle animation
            entry.target.classList.remove("hidden");
            entry.target.classList.add(
              // "animate__animated",
              // "animate__bounceIn"
              // "animate__animated",
              "animate__backInRight"
              // "animate__delay-1s"
            );
            observer.unobserve(entry.target);
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
              <div className="services-icon-card-container">
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

            <div className="services-card-details-container">
              <span className="services-card-details-header">
                {element.cardTitle}
              </span>
              <div className="services-card-details">
                {element.cardDetails}{" "}
              </div>
              <div className="services-card-footer-container">
                <span className="services-card-footer-header">
                  {element.footerTitle}:
                </span>
                <div className="services-footer-images-container">
                  {element.footerImages &&
                    element.footerImages.map((image, key) => (
                      <Image
                        key={key}
                        className="services-footer-image"
                        src={image}
                        alt={"node-icon"}
                        style={{ maxWidth: 60, minHeight: 28 }}
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
          <Box>
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
