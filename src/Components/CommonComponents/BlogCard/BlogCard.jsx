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
