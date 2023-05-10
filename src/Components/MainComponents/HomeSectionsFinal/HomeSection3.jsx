import React from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HS3Img, HS3Img1 } from "@component/assets/HomeIcons";
import styled from "styled-components";

function HomeSection3({ handleButtonClick }) {
  return (
    <>
      <div className={styles.HS3MainContainer}>
        <div className={styles.HS3ContentContainer}>
          <div className={styles.HS3TabContainer}>
            <div className={styles.HS3ContentHeading}>
              <span>About us</span> <hr className={styles.HS3ContentLine1} />
              <hr className={styles.HS3ContentLine2} />
            </div>
            <div className={styles.HS3ContentText}>
              Work with top notch designers and developers to get amazing
              products.
            </div>
            <div className={styles.HS3ContentSubText}>
              Zweidevs is a service-oriented company providing creative and
              innovative solutions for your business domain. We believe in
              exceeding your expectations by delivering thoughtfully innovated
              eye-catching products on your desk. We take a pride in engineering
              your requirements into robust software using our mobile, web,
              cloud and e-commerce capabilities.
            </div>
            <div className={styles.HS3ContactContainer}>
              {" "}
              <Image src={HS3Img1} alt="zweidevs" />
              <hr className={styles.HS3ContactLine1} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={styles.HSContactBook}>Instant Booking</div>
                <div className={styles.HS3ContactNum}>+92 333 1158255</div>
              </div>
            </div>
            <hr className={styles.HS3ContactLine2} />
          </div>
          <div className={styles.HS3ImgContainer}>
            <Image className={styles.HS3ImgWidth} src={HS3Img} alt="zweidevs" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection3;
