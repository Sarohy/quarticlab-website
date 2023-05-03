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
                    //minHeight="100vh"
                  >
                    <Card key={key} sx={{ width: 280 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={element.image}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            className={styles.blogCardContent}
                            gutterBottom
                            variant="h5"
                            component="div"
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
