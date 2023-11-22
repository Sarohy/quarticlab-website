import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import Carousel from "react-material-ui-carousel";
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardActionArea = dynamic(() => import("@mui/material/CardActionArea"));
const BottomBorderButton = dynamic(() =>
  import("@component/Components/CommonComponents/BottomBorderButton"),
);
import Project1_Image1 from "../../../../public/assets/HomeIcons/Project/Project1_image1.svg";
import Project2_Image1 from "../../../../public/assets/HomeIcons/Project/Project2_image1.svg";
import Project3_Image1 from "../../../../public/assets/HomeIcons/Project/Project3_image1.svg";
import Project4_Image1 from "../../../../public/assets/HomeIcons/Project/Project4_image1.svg";
import Project5_Image1 from "../../../../public/assets/HomeIcons/Project/Project5_image1.svg";
import Project6_Image1 from "../../../../public/assets/HomeIcons/Project/Project6_image1.svg";
import styles from "./serviceCarosuel.module.css";
import { Grid, useMediaQuery } from "@mui/material";

function HomeSection4() {
  const router = useRouter();

  const projectData = [
    {
      index: 1,
      image: Project1_Image1,
      title: "Hooked Health",
      content:
        "Hooked Health is a mobile application which enables the users to enjoy a leaner, healthier body through a 15-minute no-equipment workouts ",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 2,
      image: Project2_Image1,
      title: "AudioCardio",
      content:
        "AudioCardio is an evidence-based mobile app that delivers inaudible sound therapies designed to maintain and strengthen your hearing while providing relief from tinnitus by stimulating the cells inside your ear",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 3,
      image: Project3_Image1,
      title: "Seated",
      content:
        "Seated is a platform which enables the users to Make Reservations at Local Restaurants so that they can earn back on every dollar that the users spend at the restaurant",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 4,
      image: Project4_Image1,
      title: "Public Trust",
      content:
        "Public Trust Realty Group is a web-based platform that enables the users to search for a property and buy/rent a property",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 5,
      image: Project6_Image1,
      title: "Fresh Tracks",
      content:
        "FreshTracks is a web based portal for the travelers planning to travel across Canada where they can view personalized travel plans.",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 6,
      image: Project5_Image1,
      title: "Humanava",
      content:
        "Humanava is a web based Edtech platform, which provides Interactive, highly engaging courses for everyone in an organization.",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
  ];

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 960px)");

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
        <h2 className={styles.cardTitle}>{"Web Development Projects"}</h2>
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
          {chunkArray(projectData, chunkSize).map((chunk, index) => (
            <Grid
              className={styles.chunkArryGrid}
              container
              // gap={2}
              key={index}
              spacing={2}
            >
              {chunk.map((item, chunkKey) => {
                return (
                  <Grid item key={chunkKey} md={4} sm={6} xs={12}>
                    <Card className={styles.HS4Car} key={index}>
                      <CardActionArea>
                        <Image
                          alt={`${item?.title} | React.js, Ruby on Rails, AWS, Node.js, Express.js`}
                          className={styles.HS4CardImage}
                          quality={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={item?.image}
                          title={`${item?.title} | React.js, Ruby on Rails, AWS, Node.js, Express.js`}
                        />
                        <CardContent className={styles.HS4BelowContainer}>
                          <h2 className={styles.HSCardTitle}>{item?.title}</h2>
                          <p className={styles.HS4CardContent}>
                            {item?.content}
                          </p>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default HomeSection4;
