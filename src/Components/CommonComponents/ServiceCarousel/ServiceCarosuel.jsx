import Image from "next/image";
import Card from "@mui/material/Card";
// const Carousel = dynamic(() => import("react-material-ui-carousel"));

import styles from "./serviceCarosuel.module.css";
import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import BottomBorderButton from "../BottomBorderButton";
import { useRouter } from "next/navigation";
import Carousel from "react-material-ui-carousel";

function ServiceCarosuel({
  cardTitle = "Web Development Projects",
  displayViewMoreButton = false,
  projectData,
  navButtonsAlwaysVisible = true,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 960px)");
  const [projectDataState, setProjectDataState] = useState(null);

  const [rerenderKey, setRerenderKey] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (projectData) {
      setProjectDataState(null);
      const data = chunkArray(projectData, chunkSize);

      if (data) {
        setProjectDataState(data);
        setTimeout(() => {
          setRerenderKey(prevKey => prevKey + 1);
        }, 4000);
      }
    }
    return () => {};
  }, [projectData]);

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
    <>
      <div className={styles.HS4MainContainer}>
        <div
          className={styles.titleContainer}
          style={{ display: displayViewMoreButton ? "flex" : "block" }}
        >
          <h2 className={styles.cardTitle}>{cardTitle}</h2>
          <div
            className={styles.viewProjectsBtn}
            style={{ display: displayViewMoreButton ? "flex" : "none" }}
          >
            <BottomBorderButton
              onClick={() => {
                router.push("/projects");
              }}
              text="More Projects"
            />
          </div>
        </div>
        {projectDataState && (
          <Carousel
            activeIndicatorIconButtonProps={{
              style: {
                margin: 1,
                color: "#FF9700",
                backgroundColor: "#FF9700",
              },
            }}
            animation="slide"
            className={`${styles.carousel}`}
            indicatorContainerProps={{
              style: {
                display: navButtonsAlwaysVisible ? "block" : "none",
              },
            }}
            indicatorIconButtonProps={{
              style: {
                color: "#ACACAC",
              },
            }}
            key={rerenderKey}
            navButtonsAlwaysVisible={navButtonsAlwaysVisible}
            style={{
              background: "red",
              height: "700px",
            }}
          >
            {projectDataState.map((chunk, index) => (
              <Grid
                className={`${styles.chunkArryGrid}`}
                container
                // gap={2}
                key={index}
                spacing={2}
                style={{ height: "550px" }}
              >
                {chunk.map((item, chunkKey) => {
                  return (
                    <Grid
                      className={styles.h100}
                      item
                      key={chunkKey}
                      md={4}
                      sm={6}
                      xs={12}
                    >
                      <Card className={styles.h100} key={index}>
                        <Image
                          alt={`${item?.title} | React.js, Ruby on Rails, AWS, Node.js, Express.js`}
                          className={styles.HS4CardImage}
                          quality={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={item?.image}
                        />
                        <div className={styles.contentRoot}>
                          <div className={styles.HS4BelowContainer}>
                            <h2 className={styles.HSCardTitle}>
                              {item?.title}
                            </h2>
                            <p className={styles.HS4CardContent}>
                              {item?.content}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default ServiceCarosuel;
