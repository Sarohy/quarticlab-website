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
      "Frontend & backend dev",
      "Weekly Meeting",
      "QA Testing",
      "Deployment",
    ],
  },
  {
    logo: settingsSVG,
    title: "Support & Maintenance",
    icon: threeSVG,
    desc: ["Production Support", "Operational support", "On-going Support"],
  },
];

const LeftGrid = ({ logo, index }) => (
  <div className={styles.fileIconContainer}>
    <div
      className={styles.logo}
      style={{
        float: index % 2 === 0 ? "right" : "left",
      }}
    >
      <Image alt="file icon" fill src={logo} />
    </div>
  </div>
);

const RightGrid = ({ card }) => (
  <>
    <div>
      <div className={styles.oneIconContainer}>
        <Image alt="one icon" className={styles.oneIcon} fill src={card.icon} />
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
    <div className={styles.root}>
      <Grid container md={7} spacing={2} xs={11}>
        {cardData.map((card, index) => (
          <div className={styles.mapRoot} key={index}>
            <Grid
              className={index === 0 ? styles.leftGrid : styles.alignLeft}
              item
              xs={5}
            >
              {index % 2 === 0 ? (
                <LeftGrid index={index} logo={card.logo} />
              ) : (
                <RightGrid card={card} />
              )}
            </Grid>
            <Grid className={styles.middleGrid} item xs={2}>
              <div
                className={index % 2 === 0 ? styles.hr : styles.hrBold}
              ></div>
            </Grid>
            <Grid className={styles.rightGrid} item xs={5}>
              {index % 2 === 0 ? (
                <RightGrid card={card} />
              ) : (
                <LeftGrid logo={card.logo} />
              )}
            </Grid>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default Timeline;
