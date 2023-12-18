import Image from "next/image";
import dynamic from "next/dynamic";
import Card from "@mui/material/Card";
const Carousel = dynamic(() => import("react-material-ui-carousel"));

import styles from "./serviceCarosuel.module.css";
import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

function HomeSection4({ cardTitle = "Web Development Projects", projectData }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 960px)");
  const [projectDataState, setProjectDataState] = useState(null);

  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    if (projectData) {
      setProjectDataState(null);
      const data = chunkArray(projectData, chunkSize);

      if (data) {
        setProjectDataState(data);
        setTimeout(() => {
          setRerenderKey(prevKey => prevKey + 1);
        }, 3000);
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
        <h2 className={styles.cardTitle}>{cardTitle}</h2>
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
            indicatorIconButtonProps={{
              style: {
                color: "#ACACAC",
              },
            }}
            key={rerenderKey}
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
                style={{ height: "100%" }}
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
                          title={`${item?.title} | React.js, Ruby on Rails, AWS, Node.js, Express.js`}
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

export default HomeSection4;
