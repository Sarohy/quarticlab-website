import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const Grid = dynamic(() => import("@mui/material/Grid"));
import bgOrangeIcon from "../../../../public/assets/serviceIcons/webServicesIcons/bgOrangeIcon.svg";
import styles from "./offeringCard.module.css";

const OfferingCard = ({ heading, cardData }) => {
  return (
    <div className={styles.root}>
      <label className={styles.heading}>{heading}</label>
      <Grid container spacing={2}>
        {cardData.map((card, key) => (
          <Grid key={key} item xs={12} sm={6} md={4}>
            <div className={styles.cardContainer}>
              <div className={styles.cardBgImgContainer}>
                <Image className={styles.cardBgImg} fill src={bgOrangeIcon} />
              </div>
              <div className={styles.cardImageContainer}>
                <Image className={styles.cardImage} src={card.cardImage} fill />
              </div>
              <div className={styles.cardTitle}>{card.cardTitle}</div>
              <div className={styles.cardDesc}> {card.cardDesc}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OfferingCard;
