import React, { useEffect, useState } from "react";
import styles from "./HomeSection.module.css";
import Carousel from "react-material-ui-carousel";
import { Card } from "@mui/material";
import Image from "next/image";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

import { HS5Img1, HS5Img2, HS5Img3, HS3Img } from "@component/assets/HomeIcons";

const otherItems = [
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

const mobItems = [
  {
    id: 1,
    elements: [
      {
        img: HS3Img,
        content: "Mudassir Malik",
        details:
          "We had a very complex task which they were able to build for us. They overcame many of the challenges that we faced along the way and were able to deliver a complete and functional software a week ahead of the deadline",
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        img: HS3Img,
        content: "Mujtaba",
        details:
          "We had a very complex task which they were able to build for us. They overcame many of the challenges that we faced along the way and were able to deliver a complete and functional software a week ahead of the deadline",
      },
    ],
  },
  {
    id: 3,
    elements: [
      {
        img: HS3Img,
        content: "usman",
        details:
          "We had a very complex task which they were able to build for us. They overcame many of the challenges that we faced along the way and were able to deliver a complete and functional software a week ahead of the deadline",
      },
    ],
  },
];

const cardItem = (items) => {
  return (
    <>
      {items.length == 1 ? (
        <div className={styles.HS5CardDiv}>
          {items.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
                key={`${index}${item.content}`}
              >
                <Card className={styles.HS5SingleCard}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className={styles.HS5ImgContainer}>
                      <Image
                        src={item.img}
                        alt={`${item.content} ${item.img}`}
                        className={styles.HS5Img}
                      />
                    </div>
                    <div className={styles.HS5ContentContainer}>
                      <h3 className={styles.HS5ContentHeader}>
                        {item.content}
                      </h3>
                      <div style={{ marginTop: "2.5%" }}>
                        {[0, 1, 3, 4, 5].map((itemStar) => {
                          return (
                            <StarOutlinedIcon
                              key={`${item.content}${itemStar}`}
                              className={styles.HSStarConatiner}
                            />
                          );
                        })}
                      </div>
                      <p className={styles.HS5CardDetail}>{item.details}</p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.HS5CardDiv}>
          {items.map((item, index) => {
            return (
              <Card
                className={
                  index % 2 != 0 ? styles.HS5OddCard : styles.HS5EvenCard
                }
                key={`${index}${item.content}`}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className={styles.HS5ImgContainer}>
                    <Image
                      src={item.img}
                      alt={`${item.content} ${item.img}`}
                      className={styles.HS5Img}
                    />
                  </div>
                  <div className={styles.HS5ContentContainer}>
                    <div className={styles.HS5ContentHeader}>
                      {item.content}
                    </div>
                    <div style={{ marginTop: "2.5%" }}>
                      {[0, 1, 3, 4, 5].map((itemStar) => {
                        return (
                          <StarOutlinedIcon
                            className={styles.HSStarConatiner}
                            key={`${itemStar}${item.content}`}
                          />
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
      )}
    </>
  );
};

function HomeSection5() {
  const animatedDivRefs = Array.from({ length: 2 }, () => React.useRef(null));

  const [itemsArray, setItemsArray] = useState([]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 800) setItemsArray(mobItems);
      else setItemsArray(otherItems);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    animatedDivRefs.forEach((ref) => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.HS5MainContainer}>
        <div>
          <div className={styles.HS5Heading} ref={animatedDivRefs[0]}>
            <p>Client Feedback</p> <hr className={styles.HS3ContentLine1} />
            <hr className={styles.HS3ContentLine2} />
          </div>
        </div>
        <h2 className={styles.HS5SubHeading} ref={animatedDivRefs[1]}>
          What Client Says About Us
        </h2>
        <Carousel
          swipe={true}
          className={styles.HS5Carousel}
          duration={1000}
          indicatorIconButtonProps={{
            style: {
              marginTop: "7%",
              color: "#ECECEC",
              cursor: "pointer",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#FF9700",
              cursor: "pointer",
              width: "30px",
            },
          }}
        >
          {itemsArray.map((item, index) => {
            return <div key={`${index}`}>{cardItem(item.elements)}</div>;
          })}
        </Carousel>
      </div>
    </>
  );
}

export default HomeSection5;
