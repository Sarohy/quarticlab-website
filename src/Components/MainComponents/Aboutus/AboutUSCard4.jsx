import React, { useState } from "react";
import Image from "next/image";
import { CD4Img, CD4Img1, CD4Img2, CD4Img3 } from "@component/assets/AboutUs";
import styles from "./AboutUs.module.css";

const AboutUsCard4 = () => {
  const [cardKey, setCardKey] = useState(0);
  const elements = [
    {
      img: CD4Img,
      heading: "Abdulrehman",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
    },
    {
      img: CD4Img,
      heading: "Abdulrehman",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
    },
    {
      img: CD4Img,
      heading: "Abdulrehman",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
    },
    {
      img: CD4Img,
      heading: "Abdulrehman",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
    },
  ];
  return (
    <>
      <div className={styles.AUCd4Main}>
        <div>
          <div className={styles.AUCard4Heading}>
            <span>Our Team Members</span>{" "}
            <hr className={styles.AUCard4HeadingLine1} />
            <hr className={styles.AUCard4HeadingLine2} />
          </div>

          <div className={styles.AUCard4SubHeading}>
            Our Expertise Will Help You
          </div>
          <div className={styles.AUCard4Text}>
            Together we are smarter than each of us. We disagree passionately,
            learn continuously, and commit relentlessly as we lead our team
            towards becoming the most preferred tech partner for our growing set
            of clients.
          </div>
        </div>

        <div className={styles.AUCd4CardsContainer}>
          {elements.map((item, index) => {
            return (
              <>
                <div
                  className={styles.AUCd4Cards}
                  style={{ marginLeft: index != 0 ? "30px" : "" }}
                  key={index}
                  onClick={() => setCardKey(index)}
                >
                  <div>
                    <Image
                      src={item.img}
                      alt="zweidevs"
                      className={styles.AUCd4Img}
                    />
                  </div>
                  <div className={styles.AUCdCardHeading}>{item.heading}</div>
                  <div className={styles.AUCdCardSubHeading}>
                    {item.subHeading}
                  </div>
                  <div className={styles.AUCd4SocialContainer}>
                    <div
                      className={
                        cardKey == index
                          ? styles.AUCd4SocialSelected
                          : styles.AUCd4Social
                      }
                    >
                      <Image src={item.socialM1} alt="zweidevs" />
                    </div>
                    <div
                      className={
                        cardKey == index
                          ? styles.AUCd4SocialSelected
                          : styles.AUCd4Social
                      }
                    >
                      <Image src={item.socialM2} alt="zweidevs" />
                    </div>
                    <div
                      className={
                        cardKey == index
                          ? styles.AUCd4SocialSelected
                          : styles.AUCd4Social
                      }
                    >
                      <Image src={item.socialM3} alt="zweidevs" />
                    </div>
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
