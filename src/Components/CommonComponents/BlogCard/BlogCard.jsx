import styles from "./blogCard.module.css";
import React from "react";
import { Button, CardActionArea, CardActions, Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "animate.css";
import { useRouter } from "next/router";

export default function blogCard(props) {
  const { data, filter } = props;
  const router = useRouter();

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
                    className={
                      "animate__animated animate__zoomIn animate__delay-1s"
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: 270,
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={"152"}
                        image={element.image}
                        alt="green iguana"
                        width={"272"}
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent
                        style={{
                          height: "auto",
                        }}
                        sx={{ flexGrow: 1 }}
                      >
                        <Typography
                          className={styles.blogCardContent}
                          gutterBottom
                          variant="h5"
                          style={{
                            minHeight: "3em",
                          }}
                          component="div"
                          sx={{
                            fontSize: 18,
                            fontWeight: 600,
                          }}
                        >
                          {element.title}
                        </Typography>
                        <Typography
                          height={"5em"}
                          variant="body2"
                          color="text.secondary"
                          fontFamily="poppins"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: element.description,
                            }}
                          />
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
                        fontFamily="poppins"
                        onClick={() => {
                          router.push({
                            pathname: `/blog/${element.id}`,
                            query: { data: JSON.stringify(element) },
                          });
                        }}
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
