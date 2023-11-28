import Image from "next/image";
import WaveSVG from "../../../../public/assets/serviceIcons/waveSVG.svg";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useRouter } from "next/router";
import styles from "./servicesTechnologiesCard.module.css";

function ServicesTechnologiesCard({ cardData, cardTitle }) {
  const isMobile = useMediaQuery("(max-width: 660px)");
  const isTablet = useMediaQuery("(max-width: 995px)");
  const router = useRouter();

  const getChunkSize = () => {
    if (isMobile) {
      return 1;
    }
    if (isTablet) {
      return 2;
    }
    return 3; // Default for larger screens
  };

  const chunkSize = getChunkSize();

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
          {chunkArray(cardData, chunkSize).map((chunk, index) => (
            <Grid
              className={styles.gridContainer}
              container
              gap={isMobile ? 0 : 2}
              key={index}
              spacing={isMobile ? 0 : 2}
            >
              {chunk.map((element, key) => (
                <Box key={key}>
                  <div
                    className={`${styles.hiddenNestedCard} animate__animated ${styles.servicesIconCardContainer}`}
                    onClick={() => router.push(element.href)}
                  >
                    {element.href}
                    <Image
                      alt={`${element.cardIconTitle.firstLine}`}
                      className={styles.boxImage}
                      height={"auto"}
                      src={element.cardIcon}
                      title={`Zweidevs | ${element.cardIconTitle.firstLine}`}
                    />
                    <div className={styles.boxTitle}>
                      <label className={styles.ptr}>
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
