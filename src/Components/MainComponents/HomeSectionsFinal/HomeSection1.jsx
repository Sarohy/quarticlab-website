import React from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HSImg2, HSLogo, HSImg1 } from "@component/assets/HomeIcons";
import { Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import "animate.css";

function HomeSection1({ handleButtonClick }) {
  return (
    <>
      <div className={styles.HS1Background}>
        <div className={`${styles.HS1HeaderImage} `}>
          <Image className={styles.HS1Img1Height} src={HSImg1} alt={HSImg1} />
        </div>
        <div className={`${styles.HS1ContentContainer}`}>
          <div className="animate__delay-1s animate__animated animate__zoomIn">
            <div className={styles.HS1Content}>
              <span className={styles.HS1ContentLine} />
              <h1 className={styles.HS1Text}>
                Empowering <br /> Innovation
              </h1>
            </div>
            <h2 className={styles.HS1SubText}>
              Zweidevs provides dedicated teams work to design and build your
              idea.
            </h2>
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
          <div className="animate__delay-1s animate__animated animate__zoomIn">
            <Image
              className={styles.HSLogoContainer}
              src={HSLogo}
              alt={HSLogo}
            />
          </div>
        </div>
        <div className={styles.HS1FooterImage}>
          <Image className={styles.HS1Img2Height} src={HSImg2} alt={HSImg2} />
        </div>
      </div>
    </>
  );
}

export default HomeSection1;
