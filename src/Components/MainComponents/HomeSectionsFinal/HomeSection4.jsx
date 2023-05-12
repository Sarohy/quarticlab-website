import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Zbutton } from "@component/Components/CommonComponents";
import styles from "./HomeSection.module.css";
import { HS4Img1, HS4Img2, HS4Img3 } from "@component/assets/HomeIcons";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
function HomeSection4({ handleButtonClick }) {
  const exp = [
    { index: 1, content: "Website Development" },
    { index: 2, content: "App Development" },
    { index: 3, content: " Graphics Designing" },
  ];

  const project = [
    {
      index: 1,
      cardURL: HS4Img1,
    },
    {
      index: 2,
      cardURL: HS4Img2,
    },
    {
      index: 3,
      cardURL: HS4Img3,
    },
  ];

  const [proKey, setProKey] = useState(1);

  return (
    <>
      <div className={styles.HS4MainContainer}>
        <div className={styles.HS4ContentHeadingContainer}>
          <div className={styles.HS4Heading}>
            <span>Our Experiences</span>{" "}
            <hr className={styles.HS3ContentLine1} />
            <hr className={styles.HS3ContentLine2} />
          </div>
        </div>
        <div className={styles.HS4SubHeading}>
          We`ve Done Lot`s Of Awesome Projects
        </div>
        <div className={styles.HS4ButtonContainer}>
          {exp.map((item) => {
            return (
              <div
                className={
                  proKey == item.index
                    ? styles.HS4SelectedButton
                    : styles.HS4UnselectButton
                }
                key={item.index}
                onClick={() => setProKey(item.index)}
              >
                <div>{item.content}</div>
                <div
                  className={
                    proKey != item.index ? styles.HS4ButtonUnderLine : ""
                  }
                  style={{
                    width:
                      item.index == 1 && proKey != item.index ? "300px" : "",
                  }}
                />
              </div>
            );
          })}

          {/* <div className={styles.HS4UnselectButton}>
            App Development
            <div className={styles.HS4ButtonUnderLine} />
          </div>
          <div className={styles.HS4UnselectButton}>
            Graphics Designing
            <div className={styles.HS4ButtonUnderLine} />
          </div> */}
        </div>
        <div className={styles.HSCardContainer}>
          <div className={styles.HS4Image1Con}>
            <div className={styles.HS4ContentContainer}>
              <div className={styles.HS4ContentHeading}>Elemetal Universe</div>
              <div className={styles.HS4ContentSubHeading}>
                NFT Marketplace and NFT Minting platform with NFT based PvP
                battle Game.
              </div>
              <div className={styles.HS4ContentSubSubHeading}>
                Django | React
              </div>
              <div>
                <Zbutton
                  onClick={""}
                  text="Request Demo"
                  color="orange"
                  backgroundColor="#FFFFFF"
                  width="168px"
                  whiteShaddow={true}
                  showIcon={false}
                  height="38px"
                />
              </div>
            </div>
          </div>
          <div className={styles.HS4Image2Con}></div>
          <div className={styles.HS4Image3Con}></div>
        </div>
        <div className={styles.HS4ArrowContainer}>
          <ArrowCircleLeftOutlinedIcon
            style={{
              width: "30px",
              height: "30px",
              color: "#FF9700",
              marginRight: "10px",
            }}
          />
          <ArrowCircleRightOutlinedIcon
            style={{ width: "30px", height: "30px", color: "#FF9700" }}
          />
        </div>
      </div>
    </>
  );
}

export default HomeSection4;
