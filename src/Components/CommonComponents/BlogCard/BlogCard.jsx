import styles from "./blogCard.module.css";
import React, { useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { Box } from "@mui/system";
import "animate.css";

export default function blogCard(props) {
  const { data, filter } = props;

  let animatedDivRefs = data.map(() => {
    return React.useRef(null);
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            // Code to handle animation
            // target.classList.remove("hidden");
            target.style.opacity = 1;
            target.classList.add(
              "animate__zoomIn",
              "animate__delay-1s",
              "animate__animated"
            );
            target.addEventListener(
              "animationend",
              (e) => {
                e.stopPropagation();
                e.stopImmediatePropagation();
                animatedNestedCardDivRefs.forEach((ref) => {
                  observer.observe(ref.current);
                });
              },
              { once: true }
            ); // Remove the event listener after it's triggered

            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    // animatedDivRefs.forEach((ref) => {
    //   observer.observe(ref.current);
    // });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {" "}
      <Grid container rowSpacing={3} columnSpacing={0}>
        {data &&
          data.map(
            (element, key) =>
              (element.category === filter || filter === "All") && (
                <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    //ref={animatedDivRefs[key]}
                    className={
                      "animate__animated animate__zoomIn animate__delay-1s"
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: 270,
                    }}
                    //ref={cardHeightRef}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={"auto"}
                        image={element.image}
                        alt="green iguana"
                      />
                      <CardContent
                        style={{
                          height: "auto",
                          //height: cardContentHeight + cardTitleHeight,
                        }}
                        sx={{ flexGrow: 1 }}
                        //    ref={cardContentRef}
                      >
                        <Typography
                          //     ref={cardTitleRef}
                          className={styles.blogCardContent}
                          gutterBottom
                          variant="h5"
                          style={{
                            minHeight: "3em",
                            //height: "auto",
                            //marginBottom: cardTitleHeight,
                            //   height: cardTitleHeight,
                          }}
                          component="div"
                          sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            //height: 27,
                          }}
                        >
                          {element.title}
                        </Typography>
                        <Typography
                          height={"5em"}
                          variant="body2"
                          color="text.secondary"
                        >
                          {element.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        style={{
                          color: "#6D6D6D",
                        }}
                        size="small"
                        color="primary"
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
          )}
      </Grid>
    </>
  );
}
