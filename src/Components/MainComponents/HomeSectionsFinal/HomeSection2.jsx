import React, { useState } from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import {
  HS2Img1,
  HS2Img2,
  HS2Img3,
  HS2Img4,
  HS2Img5,
} from "@component/assets/HomeIcons";
import { Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

function HomeSection2({ handleButtonClick }) {
  const [selectedKey, setSelectedKey] = useState("hs2Img3");
  const cardData = [
    {
      key: "hs2Img1",
      image: HS2Img1,
      heading: "Block Chain Development",
      details: "",
    },
    {
      key: "hs2Img2",
      image: HS2Img2,
      heading: "DevOps Development",
      details: "",
    },
    {
      key: "hs2Img3",
      image: HS2Img3,
      heading: "Web Development",
      details:
        "We are your creative web development team, who aim to leverage the latest technological advances with thoughtful design and serious engineering to build tailored solutions for any industry.",
    },
    {
      key: "hs2Img4",
      image: HS2Img4,
      heading: "Ecommerce Development",
      details: "",
    },
    {
      key: "hs2Img5",
      image: HS2Img5,
      heading: "Mobile Development",
      details: "",
    },
  ];
  return (
    <>
      <div className={styles.HS2MainContainer}>
        <div className={styles.HS2ContentContainer}>
          <div className={styles.HS2Heading}>
            <span>Our Services</span> <hr className={styles.HS3ContentLine1} />
            <hr className={styles.HS3ContentLine2} />
          </div>
        </div>
        <div className={styles.HS2SubHeadContainer}>
          <div className={styles.HS2SubHeading}>
            Everything your business needs under one roof
          </div>
          <div className={styles.HS2Button}>
            <Zbutton
              onClick={handleButtonClick}
              text="See All"
              color="white"
              backgroundColor="#FF9700"
              width="120px"
              height="55px"
              whiteShaddow={true}
              showIcon={false}
              margin="0px 0px 10px 0px"
              icon={
                <ArrowCircleRightOutlinedIcon
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "4px",
                  }}
                />
              }
            />
          </div>
        </div>
        <div className={styles.HS2CardsContainer}>
          {cardData.map((item, index) => {
            return (
              <>
                <div
                  className={
                    selectedKey === item.key
                      ? `${styles.HS2Card} ${styles.HS2CardSelected}`
                      : `${styles.HS2Card} ${styles.HS2CardUnSelected}`
                  }
                  key={item.key}
                  onClick={() => {
                    setSelectedKey(item.key);
                  }}
                >
                  <div>
                    <Image src={item.image} alt="zweidevs" />
                  </div>
                  <div className={styles.HS2CardHeading}>{item.heading}</div>
                  <div className={styles.HS2CardDetails}>{item.details}</div>
                </div>
              </>
            );
          })}

          {/* <div className={styles.HS2CardUnSeclect}></div>
          <div className={styles.HS2CardUnSeclect}></div>
          <div className={styles.HS2CardUnSeclect}></div>
          <div
            className={styles.HS2CardUnSeclect}
            style={{ marginRight: "0%" }}
          ></div> */}
        </div>
      </div>
    </>
  );
}

export default HomeSection2;
