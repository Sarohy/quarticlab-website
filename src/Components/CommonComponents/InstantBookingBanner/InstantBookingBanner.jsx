import React from "react";
import Zbutton from "../ZButton";
import styles from "./InstantBookingBanner.module.css";

function InstantBookingBanner(props) {
  const { label, buttonText, buttonOnClick } = props;
  return (
    <div className={styles.iBBContainer}>
      <div className={styles.iBBContentContainer}>
        <p style={{ color: "white" }}>
          {label ? label : "Are you ready for meaningful results? We can help."}
        </p>
        <Zbutton
          text={buttonText ? buttonText : "INSTANT BOOKING"}
          onClick={buttonOnClick}
        />
      </div>
    </div>
  );
}

export default InstantBookingBanner;
