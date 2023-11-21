import React from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import FileSVG from "../../../../public/assets/serviceIcons/businessProcessIcons/file.svg";
import settingsSVG from "../../../../public/assets/serviceIcons/businessProcessIcons/settings.svg";
import searchSVG from "../../../../public/assets/serviceIcons/businessProcessIcons/search.png";
import oneSVG from "../../../../public/assets/serviceIcons/businessProcessIcons/one.svg";
import twoSVG from "../../../../public/assets/serviceIcons/businessProcessIcons/two.svg";
import threeSVG from "../../../../public/assets/serviceIcons/businessProcessIcons/three.svg";
import styles from "./timeline.module.css";

const cardData = [
  {
    logo: FileSVG,
    title: "Requirements Gathering",
    icon: oneSVG,
    desc: [
      "Requirements Definition",
      "Analyzing the requirements",
      "Documenting the process",
      "Provide initial design",
    ],
  },
  {
    logo: searchSVG,
    title: "Development & Testing",
    icon: twoSVG,
    desc: [
      "Requirements Definition",
      "Analyzing the requirements",
      "Documenting the process",
      "Provide initial design",
    ],
  },
  {
    logo: settingsSVG,
    title: "Support & Maintenance",
    icon: threeSVG,
    desc: [
      "Requirements Definition",
      "Analyzing the requirements",
      "Documenting the process",
      "Provide initial design",
    ],
  },
];

const LeftGrid = ({logo}) => (
  <div className={styles.fileIconContainer}>
    <Image width={112} height={112} src={logo} alt="file icon" />
  </div>
);

const RightGrid = ({ card }) => (
  <>
    <div>
      <div className={styles.oneIconContainer}>
        <Image src={card.icon} alt="one icon" />
      </div>
    </div>
    <label className={styles.title}>{card.title}</label>
    <div>
      <ul className={styles.li}>
        {card.desc.map((li, key) => (
          <li key={key}>{li}</li>
        ))}
      </ul>
    </div>
  </>
);
const Timeline = () => {
  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <div key={index} className={styles.mapRoot}>
          <Grid className={styles.leftGrid} item xs={5}>
            {index % 2 === 0 ? <LeftGrid logo={card.logo} /> : <RightGrid card={card} />}
          </Grid>
          <Grid className={styles.middleGrid} item xs={2}>
            <div className={index % 2 === 0 ? styles.hr: styles.hrBold}></div>
          </Grid>
          <Grid className={styles.rightGrid} item xs={5}>
            {index % 2 === 0 ? <RightGrid card={card} /> : <LeftGrid logo={card.logo} />}
          </Grid>
        </div>
      ))}
    </Grid>
  );
};

export default Timeline;
