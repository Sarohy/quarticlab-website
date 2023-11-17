import React from "react";
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
      <Image 
        src={WaveSVG}
        fill
        className={styles.waveImg}
        />
        </div>  
      <div className={`${styles.HS4MainContainer}`}>

       
        <Carousel
          className={styles.HS4CardContainer}
          animation="slide"
        >
          {chunkArray(cardData, 3).map((chunk, index) => (
            <Grid className={styles.gridContainer} gap={2} container spacing={2} key={index}>
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
                      className="services-icon"
                      height={"auto"}
                      src={element.cardIcon}
                      title={`Zweidevs | ${element.cardIconTitle.firstLine}`}
                    />
                    <div className="services-icon-card-title">
                      <h3>
                        {element.cardIconTitle.firstLine}
                        <br></br>
                        {element.cardIconTitle.secondLine}
                      </h3>
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
