import styles from "./blogCard.module.css";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import "animate.css";
import { useRouter } from "next/router";

export default function blogCard(props) {
  const { data, filter } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <>
      {" "}
      <Grid columnSpacing={0} container rowSpacing={3}>
        {data &&
          data.map(
            (element, key) =>
              (element.category === filter || filter === "All") && (
                <Grid item key={key} lg={3} md={4} sm={6} xs={12}>
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
                        alt="green iguana"
                        component="img"
                        height={"152"}
                        image={element.image}
                        sx={{ objectFit: "contain" }}
                        width={"272"}
                      />
                      <CardContent
                        className={styles.CardContent}
                        sx={{ flexGrow: 1 }}
                      >
                        <Typography
                          className={`${styles.blogCardContent} ${styles.TypographyStyle}`}
                          component="div"
                          gutterBottom
                          sx={{
                            fontSize: 18,
                            fontWeight: 600,
                          }}
                          variant="h5"
                        >
                          {element.title}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          fontFamily="poppins"
                          height={"5em"}
                          variant="body2"
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
                        className={styles.ButtonStyle}
                        color="primary"
                        fontFamily="poppins"
                        onClick={() => {
                          router.push({
                            pathname: `/blog/${element.id}`,
                            query: { data: JSON.stringify(element) },
                          });
                        }}
                        size="small"
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ),
          )}
      </Grid>
    </>
  );
}
