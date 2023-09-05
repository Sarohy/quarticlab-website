import React from "react";
import Image from "next/image";
import { HSLogo } from "@component/assets/HomeIcons";
import { InstantBookingButton } from "@component/Components/CommonComponents";
import "animate.css";
import styles from "./HomeSection1.module.css";

function HomeSection1() {
  // const [isHovered, setIsHovered] = useState(false);
  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };
  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };
  return (
    <>
      <div className={styles.HS1Background}>
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
      </div>
    </>
  );
}

export default HomeSection1;
