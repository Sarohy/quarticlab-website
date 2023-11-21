import Image from "next/image";
import WaveSVG from "../../../../public/assets/serviceIcons/waveSVG.svg";
import { Box, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import styles from "./servicesTechnologiesCard.module.css";

function ServicesTechnologiesCard({ cardData, cardTitle }) {
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  return (
    <div className={`${styles.relative}`}>
      <h2 className={styles.cardTitle}>{cardTitle}</h2>
      <div className={styles.waveImgContainer}>
        <Image alt="wave svg" className={styles.waveImg} fill src={WaveSVG} />
      </div>
      <div className={`${styles.HS4MainContainer}`}>
        <Carousel animation="slide" className={styles.HS4CardContainer}>
          {chunkArray(cardData, 3).map((chunk, index) => (
            <Grid
              className={styles.gridContainer}
              container
              gap={2}
              key={index}
              spacing={2}
            >
              {chunk.map((element, key) => (
                <Box
                  key={key}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "flex",
                      lg: "flex",
                      xl: "flex",
                      xxl: "flex",
                    },
                  }}
                >
                  <div
                    className={`${styles.hiddenNestedCard} animate__animated ${styles.servicesIconCardContainer}`}
                    // ref={animatedNestedCardDivRefs[key]}
                  >
                    <Image
                      alt={`${element.cardIconTitle.firstLine}`}
                      // className="services-icon"
                      className={styles.boxImage}
                      height={"auto"}
                      src={element.cardIcon}
                      title={`Zweidevs | ${element.cardIconTitle.firstLine}`}
                    />
                    <div className={styles.boxTitle}>
                      <label>
                        {element.cardIconTitle.firstLine}
                        <br></br>
                        {element.cardIconTitle.secondLine}
                      </label>
                    </div>
                  </div>
                </Box>
              ))}
            </Grid>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ServicesTechnologiesCard;
