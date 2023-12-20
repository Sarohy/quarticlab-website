import dynamic from "next/dynamic";
import Image from "next/image";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Carousel = dynamic(() => import("react-material-ui-carousel"));
import { useMediaQuery } from "@mui/material";
import bgOrangeIcon from "../../../../public/assets/serviceIcons/webServicesIcons/bgOrangeIcon.svg";
import styles from "./offeringCard.module.css";

const OfferingCard = ({ heading, cardData }) => {
  const isMobile = useMediaQuery("(max-width: 420px)");
  return (
    <div className={styles.root}>
      <label className={styles.heading}>{heading}</label>

      {isMobile ? (
        <Carousel
          activeIndicatorIconButtonProps={{
            style: {
              margin: 1,
              color: "#FF9700",
              backgroundColor: "#FF9700",
            },
          }}
          animation="slide"
          className={styles.HS4CardContainer}
          indicatorIconButtonProps={{
            style: {
              color: "#ACACAC",
            },
          }}
        >
          {cardData.map((card, key) => (
            // <Grid item key={key} md={4} sm={6} xs={12}>
            <div className={styles.cardContainer} key={key}>
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
            // </Grid>
          ))}
        </Carousel>
      ) : (
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {cardData.map((card, key) => (
            <Grid
              item
              key={key}
              md={cardData.length === 4 ? 6 : 4}
              sm={6}
              xs={12}
            >
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
      )}
    </div>
  );
};

export default OfferingCard;
