import React, { useEffect } from "react";
import Image from "next/image";
import {
  CD4Img,
  CD4Img1,
  CD4Img2,
  CD4Img3,
  CD4Founder1,
  CD4Founder2,
} from "@component/assets/AboutUs";
import styles from "./AboutUs.module.css";

const AboutUsCard4 = () => {
  const animatedHeadingRef = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__backInUp");
        }
      });
    }, options);

    if (animatedHeadingRef.current) {
      observer.observe(animatedHeadingRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const elements = [
    {
      img: CD4Founder2,
      heading: "Abdul Rehman Sarohy",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
      linkedIN: "https://linkedin.com/in/abdul-rehman-sarohy-0b40b0128",
    },
    {
      img: CD4Founder1,
      heading: "Ali Zain",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
      linkedIN: "https://linkedin.com/in/ali-zain-803416116",
    },
  ];

  return (
    <>
      <div className={styles.AUCd4Main}>
        <div ref={animatedHeadingRef}>
          <div className={styles.AUCard4Heading}>
            <p>Our Team Members</p>{" "}
            <hr className={styles.AUCard4HeadingLine1} />
            <hr className={styles.AUCard4HeadingLine2} />
          </div>

          <h2 className={styles.AUCard4SubHeading}>
            Our Expertise Will Help You
          </h2>
          <p className={styles.AUCard4Text}>
            Together we are smarter than each of us. We disagree passionately,
            learn continuously, and commit relentlessly as we lead our team
            towards becoming the most preferred tech partner for our growing set
            of clients.
          </p>
        </div>

        <div className={styles.AUCd4CardsContainer}>
          {elements.map((item, index) => {
            return (
              <>
                <div
                  className={styles.AUCd4Cards}
                  style={{ marginLeft: index != 0 ? "30px" : "" }}
                  key={index}
                >
                  <div>
                    <Image
                      src={item.img}
                      alt="zweidevs"
                      className={styles.AUCd4Img}
                    />
                  </div>
                  <h3 className={styles.AUCdCardHeading}>{item.heading}</h3>
                  <h4 className={styles.AUCdCardSubHeading}>
                    {item.subHeading}
                  </h4>
                  <div className={styles.AUCd4SocialContainer}>
                    <a
                      className={styles.AUCd4Social}
                      href="https://www.instagram.com/zweidevs.official"
                      target="_blank"
                    >
                      <Image src={item.socialM1} alt={item.socialM1} />
                    </a>
                    <a
                      className={styles.AUCd4Social}
                      href="https://www.facebook.com/zweidevs"
                      target="_blank"
                    >
                      <Image src={item.socialM2} alt={item.socialM2} />
                    </a>
                    <a
                      className={styles.AUCd4Social}
                      href={item.linkedIN}
                      target="_blank"
                    >
                      <Image src={item.socialM3} alt={item.socialM2} />
                    </a>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutUsCard4;
