import React from "react";
import styles from "./AboutUs.module.css";
import { CD2Img1 } from "@component/assets/AboutUs";
import Image from "next/image";

const AboutUsCard2 = () => {
  return (
    <>
      <div className={styles.AUCard2MainContain}>
        <div className={styles.AUCard2ImgContent}>
          <div>
            <Image
              className={styles.AUCard2Img}
              src={CD2Img1}
              alt="card 2 about us"
            />
          </div>
          <div className={styles.AUCard2ImgDetail}>
            <p className={styles.AUCard2ImgDHeading}>Who We Are</p>
            <p className={styles.AUCard2ImgDSubHeading}>
              The Leading Digital Agency For Business Solutions
            </p>
            <p className={styles.AUCard2ImgDText}>
              Zweidevs is a service-oriented company providing creative and
              innovative solutions for your business domain. We believe in
              exceeding your expectations by delivering thoughtfully innovated
              eye-catching products on your desk
            </p>
            <p className={styles.AUCard2ImgDText}>
              Zweidevs is a service-oriented company providing creative and
              innovative solutions for your business domain. We believe in
              exceeding your expectations by delivering thoughtfully innovated
              eye-catching products on your desk.We believe in exceeding your
              expectations by delivering thoughtfully innovated eye-catching
              products on your desk
            </p>
          </div>
        </div>

        <div>
          <div className={styles.AUCardHeading}>
            <span>Zweidevs</span> <hr className={styles.AUCardHeadingLine1} />
            <hr className={styles.AUCardHeadingLine2} />
          </div>

          <div className={styles.AUCardDataContainer}>
            <p className={styles.AUCardDataHeading}>
              Developers with strong interpersonal skills
            </p>
            <p>
              We have manage to build a team of developers with strong
              interpersonal skills. Some qualities of our mobile app developers
              that you dont would love to learn about is:
            </p>
            <p className={styles.AUCardDataSubHeading}>Dedication & Focus</p>
            <p>
              Zweidevs has put together a team of mobile app developers who
              always do their best work. They put time and effort into your
              project to meet your needs. Hiring professional app developers
              with practical knowledge gives you an edge over your competitors
              so you can grow and reach potential customers in more innovative
              ways.
            </p>
            <p className={styles.AUCardDataSubHeading}>Budget Friendly</p>
            <p>
              Zweidevs has put together a team of mobile app developers who
              always do their best work. They put time and effort into your
              project to meet your needs. Hiring professional app developers
              with practical knowledge gives you an edge over your competitors
              so you can grow and reach potential customers in more innovative
              ways.
            </p>
            <p className={styles.AUCardDataSubHeading}>24/7 Support Team</p>
            <p>
              Zweidevshas put together a team of mobile app developers who
              always do their best work. They put time and effort into your
              project to meet your needs. Hiring professional app developers
              with practical knowledge gives you an edge over your competitors
              so you can grow and reach potential customers in more innovative
              ways.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsCard2;
