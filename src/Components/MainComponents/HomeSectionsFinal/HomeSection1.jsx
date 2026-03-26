import Image from "next/image";
// import dynamic from "next/dynamic";
import HSLogo from "../../../../public/assets/HomeIcons/zweidevsLogo.svg";
// const InstantBookingButton = dynamic(
//   () => import("@component/Components/CommonComponents/InstantBookingButton"),
// );

import styles from "./HomeSection1.module.css";
import { InstantBookingButton } from "@component/Components/CommonComponents";

function HomeSection1() {
  return (
    <>
      <div className={styles.HS1Background}>
        <div className={`${styles.HS1ContentContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.HS1Content}>
              <span className={styles.HS1ContentLine} />
              <h1 className={styles.HS1Text}>
                Empowering <br /> Innovation
              </h1>
            </div>
            <div
              className={`${styles.HS1ContentButtonContainer} ${styles.instantButton1}`}
            >
              <InstantBookingButton
                customStyle={styles.bookinBtnStyle}
                onClick={() => {
                  window.open(
                    "https://calendly.com/request-demo-zweidevs/meeting",
                    "_blank",
                  );
                }}
                svgFill="#FF9701"
              />
            </div>
          </div>
          <div className={styles.heroLogo}>
            <Image
              alt="Zweidevs | Custom Software Development Services Company"
              className={styles.HSLogoContainer}
              priority
              src={HSLogo}
            />
          </div>
          <div
            className={`${styles.HS1ContentButtonContainer} ${styles.instantButton2}`}
          >
            <InstantBookingButton
              customStyle={styles.bookinBtnStyle}
              onClick={() => {
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                );
              }}
              svgFill="#FF9701"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection1;
