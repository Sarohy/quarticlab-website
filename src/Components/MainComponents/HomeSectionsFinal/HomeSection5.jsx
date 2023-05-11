import React from "react";
import styles from "./HomeSection.module.css";
import Carousel from "react-material-ui-carousel";
import { Card } from "@mui/material";
import Image from "next/image";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { HS5Img1, HS5Img2, HS5Img3, HS3Img } from "@component/assets/HomeIcons";
const items = [
  {
    id: 1,
    elements: [
      {
        img: HS3Img,
        content: "Mudassir Malik",
        details:
          "We had a very complex task which they were able to build for us. They overcame many of the challenges that we faced along the way and were able to deliver a complete and functional software a week ahead of the deadline",
      },
      {
        img: HS5Img2,
        content: "Kyle",
        details:
          "Zweidevs has been great to work with. They follow a solid Agile process so all development work is well planned and clearly priced. Their code is solid and the end result was top notch!",
      },
      {
        img: HS5Img3,
        content: "Radu",
        details:
          "I found Zweidevs Team very professional and hard working. They just didn't only develop my web app but actually guided me as well through different phases. Thank you will definitely use your services again",
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        img: HS5Img1,
        content: "Mudassir",
        details:
          "We had a very complex task which they were able to build for us. They overcame many of the challenges that we faced along the way and were able to deliver a complete and functional software a week ahead of the deadline",
      },
      {
        img: HS5Img2,
        content: "Adbul Rehman",
        details:
          "Zweidevs has been great to work with. They follow a solid Agile process so all development work is well planned and clearly priced. Their code is solid and the end result was top notch!",
      },
      {
        img: HS5Img3,
        content: "Ali Zain",
        details:
          "I found Zweidevs Team very professional and hard working. They just didn't only develop my web app but actually guided me as well through different phases. Thank you will definitely use your services again",
      },
    ],
  },
  {
    id: 3,
    elements: [
      {
        img: HS5Img1,
        content: "Mudassir",
        details:
          "We had a very complex task which they were able to build for us. They overcame many of the challenges that we faced along the way and were able to deliver a complete and functional software a week ahead of the deadline",
      },
      {
        img: HS5Img2,
        content: "Adbul Rehman",
        details:
          "Zweidevs has been great to work with. They follow a solid Agile process so all development work is well planned and clearly priced. Their code is solid and the end result was top notch!",
      },
      {
        img: HS5Img3,
        content: "Ali Zain",
        details:
          "I found Zweidevs Team very professional and hard working. They just didn't only develop my web app but actually guided me as well through different phases. Thank you will definitely use your services again",
      },
    ],
  },
];

const cardItem = (items) => {
  return (
    <>
      <div className={styles.HS5CardDiv}>
        {items.map((item, index) => {
          return (
            <Card
              className={
                index % 2 != 0 ? styles.HS5OddCard : styles.HS5EvenCard
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={styles.HS5ImgContainer}>
                  <Image
                    src={item.img}
                    alt="zweidevs"
                    className={styles.HS5Img}
                  />
                </div>
                <div className={styles.HS5ContentContainer}>
                  <div className={styles.HS5ContentHeader}>{item.content}</div>
                  <div style={{ marginTop: "2.5%" }}>
                    {[0, 1, 3, 4, 5].map(() => {
                      return (
                        <StarOutlinedIcon className={styles.HSStarConatiner} />
                      );
                    })}
                  </div>
                  <div className={styles.HS5CardDetail}>{item.details}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};
function HomeSection5({ handleButtonClick }) {
  return (
    <>
      <div className={styles.HS5MainContainer}>
        <div>
          <div className={styles.HS5Heading}>
            <span>Client Feedback</span>{" "}
            <hr className={styles.HS3ContentLine1} />
            <hr className={styles.HS3ContentLine2} />
          </div>
        </div>
        <div className={styles.HS5SubHeading}>What Client Says About us</div>
        <Carousel
          className={styles.HS5Carousel}
          duration={1000}
          indicatorIconButtonProps={{
            style: {
              color: "#ECECEC",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#FF9700",
            },
          }}
          // indicatorContainerProps={{
          //   style: {
          //     marginTop: "-80px", // 5
          //   },
          // }}
        >
          {items.map((item) => {
            return cardItem(item.elements);
          })}
        </Carousel>
      </div>
    </>
  );
}

export default HomeSection5;
