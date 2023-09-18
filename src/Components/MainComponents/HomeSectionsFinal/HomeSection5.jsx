import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@mui/material/Card"));
const Carousel = dynamic(() => import("react-material-ui-carousel"));
const StarOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/StarOutlined"),
);
import HS3Img from "../../../../public/assets/HomeIcons/HS3Img.svg";
import HS5Img1 from "../../../../public/assets/HomeIcons/HS5Img.svg";
import HS5Img2 from "../../../../public/assets/HomeIcons/HS5Img2.svg";
import HS5Img3 from "../../../../public/assets/HomeIcons/HS5Img3.svg";
import styles from "./HomeSection5.module.css";

const otherItems = [
  {
    id: 1,
    elements: [
      {
        img: HS3Img,
        content: "Theresa",
        details:
          "Amazing team to work with! Great at research, development, and finding new solutions. They are experienced and talented. They were also quite cooperative. Thanks!",
      },
      {
        img: HS5Img2,
        content: "Rishi Sareen",
        details:
          "Team was organized and communicated well. Project was completed professionally and I would hire them again for future projects!",
      },
      {
        img: HS5Img3,
        content: "Nick Angelov",
        details:
          "Zweidevs met our expectations. They were consistently professional and flexible and delivered a product that provides us with a high-quality base from which to move forward. I would use them again.",
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        img: HS5Img1,
        content: "Anton Benz",
        details:
          "Excellent to work with. Will hire them again and will recommend them to anyone looking for great work.",
      },
      {
        img: HS5Img2,
        content: "Tony Malik",
        details:
          "The team at Zweidevs has extensive knowledge of the work we requested. We have worked with them for over 5-6 months and have been very happy with production. We will hire them again soon. They are our go to people when it comes to software development.",
      },
      {
        img: HS5Img3,
        content: "Tommy Vacek",
        details:
          "The team at Zweidevs did a really good job of scoping the project out. We had the scope of our project increase due to learning more about our product space which caused some re-work but this is nothing that Zweidevs could prevent.",
      },
    ],
  },
  {
    id: 3,
    elements: [
      {
        img: HS5Img1,
        content: "Eric Halverson",
        details:
          "They built out the framework for my MVP of a Real Estate website on time, on budget, and with the features requested. Weekly demos kept me informed of progress and all interactions were very friendly. Would work with again.",
      },
      {
        img: HS5Img2,
        content: "Phil Stolaronek",
        details:
          "This team is really good to work with. Their communication is great and their English is very good. I recommend them.",
      },
      {
        img: HS5Img3,
        content: "Farzin Habib",
        details: "They pointed out the areas that we had missed thinking about",
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
        content: "Theresa",
        details:
          "Amazing team to work with! Great at research, development, and finding new solutions. They are experienced and talented. They were also quite cooperative. Thanks!",
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        img: HS3Img,
        content: "Rishi Sareen",
        details:
          "Team was organized and communicated well. Project was completed professionally and I would hire them again for future projects!",
      },
    ],
  },
  {
    id: 3,
    elements: [
      {
        img: HS3Img,
        content: "Nick Angelov",
        details:
          "Zweidevs met our expectations. They were consistently professional and flexible and delivered a product that provides us with a high-quality base from which to move forward. I would use them again.",
      },
    ],
  },
];

const cardItem = items => {
  return (
    <>
      {items.length == 1 ? (
        <div className={styles.HS5CardDiv}>
          {items.map((item, index) => {
            return (
              <div
                className={styles.HS5Content}
                key={`${index}${item.content}`}
              >
                <Card className={styles.HS5SingleCard}>
                  <div className={styles.HS5CardFlow}>
                    <div className={styles.HS5ImgContainer}>
                      <Image
                        alt={`${item.content} ${item.img}`}
                        className={styles.HS5Img}
                        src={item.img}
                      />
                    </div>
                    <div className={styles.HS5ContentContainer}>
                      <h3 className={styles.HS5ContentHeader}>
                        {item.content}
                      </h3>
                      <div className={styles.HS5ContentMargin}>
                        {[0, 1, 3, 4, 5].map(itemStar => {
                          return (
                            <StarOutlinedIcon
                              className={styles.HSStarConatiner}
                              key={`${item.content}${itemStar}`}
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
                <div className={styles.HS5ImageFlow}>
                  <div className={styles.HS5ImgContainer}>
                    <Image
                      alt={`${item.content} ${item.img}`}
                      className={styles.HS5Img}
                      src={item.img}
                    />
                  </div>
                  <div className={styles.HS5ContentContainer}>
                    <div className={styles.HS5ContentHeader}>
                      {item.content}
                    </div>
                    <div className={styles.HS5ItemMargin}>
                      {[0, 1, 3, 4, 5].map(itemStar => {
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
      if (window.innerWidth < 800) {
        setItemsArray(mobItems);
      } else {
        setItemsArray(otherItems);
      }
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

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInLeft",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    animatedDivRefs.forEach(ref => {
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
          <div className={styles.HS5Heading} ref={animatedDivRefs[0]}></div>
        </div>
        <h2 className={styles.HS5SubHeading} ref={animatedDivRefs[1]}>
          What Client Says About Us
        </h2>
        <Carousel
          activeIndicatorIconButtonProps={{
            style: {
              color: "#FF9700",
              cursor: "pointer",
              width: "30px",
            },
          }}
          className={styles.HS5Carousel}
          duration={1000}
          indicatorIconButtonProps={{
            style: {
              marginTop: "7%",
              color: "#ECECEC",
              cursor: "pointer",
            },
          }}
          interval={2000}
          swipe={true}
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
