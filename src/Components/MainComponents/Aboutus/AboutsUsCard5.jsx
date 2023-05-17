import React, { useState } from "react";
import { Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import styles from "./AboutUs.module.css";

const AboutUsCard5 = () => {
  return (
    <>
      <div className={styles.AUCd5Main}>
        <div className={styles.AUCd5Heading}>
          Are you ready for meaningful results? We can help.
        </div>
        <div className={styles.AUCd5Button}>
          <Zbutton
            onClick={""}
            text="Instant Booking"
            color="#ff9700"
            backgroundColor="white"
            width="227px"
            orangeShaddow={true}
            showIcon={false}
            margin="0px 0px 10px 0px"
            icon={
              <ArrowCircleRightOutlinedIcon
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "30%",
                  marginTop: "-2px",
                }}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default AboutUsCard5;
