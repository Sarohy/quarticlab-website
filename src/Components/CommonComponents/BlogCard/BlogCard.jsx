import styles from "./blogCard.module.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function blogCard(props) {
  const { data, filter } = props;
  const [cardHeight, setCardHeight] = React.useState("auto");
  const [cardTitleHeight, setCardTitleHeight] = React.useState("auto");
  const [cardContentHeight, setCardContentHeight] = React.useState("auto");
  const cardTitleRef = React.useRef(null);
  const cardContentRef = React.useRef(null);
  React.useEffect(() => {
    // get all card elements
    const cards = document.querySelectorAll(".MuiCard-root");
    const titleHeight = cardTitleRef.current?.clientHeight;
    const contentHeight = cardContentRef.current?.clientHeight;
    // get the height of the tallest card
    let maxHeight = 0;
    let maxTitleHeight = 0;
    let maxContentHeight = 0;

    cards.forEach((card) => {
      const height = card.clientHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
      if (titleHeight > maxTitleHeight) {
        maxTitleHeight = titleHeight;
      }
      if (contentHeight > maxContentHeight) {
        maxContentHeight = contentHeight;
      }
    });

    // set the height of all cards to the height of the tallest card
    setCardHeight(maxHeight);
    setCardContentHeight(maxContentHeight);
    setCardTitleHeight(maxTitleHeight);
  }, []);

  return (
    <>
      {" "}
      <Grid container rowSpacing={5} columnSpacing={0}>
        {data &&
          data.map(
            (element, key) =>
              (element.category === filter || filter === "All") && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // height={cardHeight + 10}
                    //minHeight="100vh"
                  >
                    <Card
                      //   style={{ height: cardHeight }}
                      key={key}
                      sx={{ width: 280 }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={element.image}
                          alt="green iguana"
                        />
                        <CardContent
                          style={{
                            height: cardContentHeight + cardTitleHeight,
                          }}
                          ref={cardContentRef}
                        >
                          <Typography
                            ref={cardTitleRef}
                            className={styles.blogCardContent}
                            gutterBottom
                            variant="h5"
                            style={{
                              marginBottom: cardTitleHeight,
                              //   height: cardTitleHeight,
                            }}
                            component="div"
                            sx={{
                              fontSize: 18,
                              fontWeight: 600,
                              height: 27,
                            }}
                          >
                            {element.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {element.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          style={{ color: "#6D6D6D" }}
                          size="small"
                          color="primary"
                        >
                          Read More
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              )
          )}
      </Grid>
    </>
  );
}
