import React from "react";
import Image from "next/image";
import {
  CD3Img1,
  CD3Img2,
  CD3Img3,
  CD3Img4,
  CD3Img5,
} from "@component/assets/AboutUs";
import styles from "./AboutUs.module.css";

const AboutUsCard = () => {
  const project = [
    {
      img: CD3Img1,
      count: "35 +",
      detail: "No. of Employees",
    },
    { img: CD3Img2, count: `150+`, detail: "Projects Completed" },
    {
      img: CD3Img4,
      count: `3.5M+`,
      detail: "Funding Raised",
    },
    { img: CD3Img4, count: `300+`, detail: "Hours Worked" },
    { img: CD3Img5, count: `70+`, detail: "Clients Served" },
  ];
  return (
    <>
      <div className={styles.AUCd3Main}>
        <div className={styles.AUCd3Heading}>
          Zweidevs Achievements since 2010
        </div>
        <div className={styles.AUCd3ProjectContainer}>
          {project.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className={styles.AUCd3ProjectItem}
                  style={{
                    marginTop: index == 1 ? "-3px" : index != 0 ? "1px" : "",
                  }}
                >
                  <div>
                    <Image src={item.img} alt="zweidevs" />
                  </div>
                  <div className={styles.AUCd3ProjectCount}> {item.count}</div>
                  <div className={styles.AUCd3ProjectDetail}>{item.detail}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutUsCard;
