import React, { useState } from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HSImg2, HSLogo, HSImg1 } from "@component/assets/HomeIcons";
import { InstantBookingButton, Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import "animate.css";
import { useRouter } from "next/router";
import HS1InstantBooking from "../../../assets/HomeIcons/HS1InstantBooking";

function HomeSection1() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className={styles.HS1Background}>
        {/* <div className={`${styles.HS1HeaderImage} `}>
          <Image
            className={styles.HS1Img1Height}
            src={HSImg1}
            alt={"client-image"}
          />
        </div> */}
        <div className={`${styles.HS1ContentContainer}`}>
          <div className="animate__delay-1s animate__animated animate__zoomIn">
            <div className={styles.HS1Content}>
              <span className={styles.HS1ContentLine} />
              <h1 className={styles.HS1Text}>
                Empowering <br /> Innovation
              </h1>
            </div>
            <div className={styles.HS1ContentButtonContainer}>
              <InstantBookingButton
                onClick={() => {
                  window.open(
                    "https://calendly.com/request-demo-zweidevs/30min",
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
          <div className="animate__delay-1s animate__animated animate__zoomIn">
            <Image
              className={styles.HSLogoContainer}
              src={HSLogo}
              alt={"zweidevs-logo"}
            />
          </div>
        </div>
        {/* <div className={styles.HS1FooterImage}>
          <Image
            className={styles.HS1Img2Height}
            src={HSImg2}
            alt={"footer-icon"}
          />
        </div> */}
      </div>
    </>
  );
}

export default HomeSection1;
