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
          <Grid item key={key} md={4} sm={6} xs={12}>
            <div className={styles.cardContainer}>
              <div className={styles.cardBgImgContainer}>
                <Image
                  alt="bg icon"
                  className={styles.cardBgImg}
                  fill
                  src={bgOrangeIcon}
                />
              </div>
              <div className={styles.cardImageContainer}>
                <Image
                  alt="bg icon"
                  className={styles.cardImage}
                  fill
                  src={card.cardImage}
                />
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
