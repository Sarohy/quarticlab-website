import React from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HSImg2, HSLogo, HSImg1 } from "@component/assets/HomeIcons";
import { Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

function HomeSection1({ handleButtonClick }) {
  return (
    <>
      <div className={styles.HS1Background}>
        <div className={styles.HS1HeaderImage}>
          <Image className={styles.HS1Img1Height} src={HSImg1} alt="zweidevs" />
        </div>
        <div className={styles.HS1ContentContainer}>
          <div>
            <div className={styles.HS1Content}>
              <span className={styles.HS1ContentLine} />
              <span className={styles.HS1Text}>Empowering Innovation</span>
            </div>
            <div className={styles.HS1SubText}>
              Zweidevs provides dedicated teams work to design and build your
              idea.
            </div>
            <div className={styles.HS1ContentButtonContainer}>
              <Zbutton
                onClick={handleButtonClick}
                text="GET STARTED"
                color="#ff9700"
                backgroundColor="white"
                width="180px"
                orangeShaddow={true}
                showIcon={false}
                margin="0px 0px 10px 0px"
                icon={
                  <ArrowCircleRightOutlinedIcon
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "-20px",
                    }}
                  />
                }
              />
              <Zbutton
                onClick={handleButtonClick}
                text="Call us Now"
                color="white"
                backgroundColor="#FF9700"
                width="180px"
                whiteShaddow={true}
                showIcon={false}
                margin="0px 0px 10px 0px"
                icon={
                  <ArrowCircleRightOutlinedIcon
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "-20px",
                    }}
                  />
                }
              />
            </div>
          </div>
          <Image
            className={styles.HSLogoContainer}
            src={HSLogo}
            alt="zweidevs"
          />
        </div>
        <div className={styles.HS1FooterImage}>
          <Image className={styles.HS1Img2Height} src={HSImg2} alt="zweidevs" />
        </div>
      </div>
    </>
  );
}

export default HomeSection1;
