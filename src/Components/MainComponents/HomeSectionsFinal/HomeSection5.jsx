import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@mui/material/Card"));
const Carousel = dynamic(() => import("react-material-ui-carousel"), {
  ssr: false,
});
const StarOutlinedIcon = dynamic(
  () => import("@mui/icons-material/StarOutlined"),
);

import styles from "./HomeSection5.module.css";

import ClientSvg1 from "../../../../public/assets/HomeIcons/clients/nick-angelov.png";
import ClientSvg2 from "../../../../public/assets/HomeIcons/clients/theresa.png";
import ClientSvg3 from "../../../../public/assets/HomeIcons/clients/rishi.png";
import ClientSvg4 from "../../../../public/assets/HomeIcons/clients/anton.png";
import ClientSvg5 from "../../../../public/assets/HomeIcons/clients/tony-malik.png";
import ClientSvg6 from "../../../../public/assets/HomeIcons/clients/tommy.png";
import ClientSvg7 from "../../../../public/assets/HomeIcons/clients/eric-h.png";
import ClientSvg8 from "../../../../public/assets/HomeIcons/clients/phill.png";
import ClientSvg9 from "../../../../public/assets/HomeIcons/clients/farzin.png";
import ClientSvg10 from "../../../../public/assets/HomeIcons/clients/eric.png";

const otherItems = [
  {
    id: 1,
    elements: [
      {
        img: ClientSvg2,
        content: "Theresa",
        details:
          "Working with this fantastic team was an excellent experience. They excel at development and finding new solutions. Their expertise and talent are impressive.",
      },
      {
        img: ClientSvg3,
        content: "Rishi Sareen",
        details:
          "The team's exceptional communication resulted in the successful delivery of the project. It would be my pleasure to work with them again in the future.",
      },
      {
        img: ClientSvg1,
        content: "Nick Angelov",
        details:
          "Zweidevs met our expectations. They delivered the product that provided us with a high-quality base from which to move forward. I highly recommend them!",
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        img: ClientSvg4,
        content: "Anton Benz",
        details:
          "These developers were excellent to work with. I would definitely recommend them to anyone looking for great work, and I look forward to hiring them again.",
      },
      {
        img: ClientSvg5,
        content: "Tony Malik",
        details:
          "The Zweidevs team has extensive knowledge of the work, and after working with them for 5-6 months, they have become our go-to development company.",
      },
      {
        img: ClientSvg6,
        content: "Tommy Vacek",
        details:
          " Zweidevs' team did a fantastic job scoping our project. Their adaptability was impressive, and they always succeeded in exceeding our expectations.",
      },
    ],
  },
  {
    id: 3,
    elements: [
      {
        img: ClientSvg7,
        content: "Eric Halverson",
        details:
          " They completed the MVP framework for my website on schedule. The weekly demos kept me up-to-date on progress. I would definitely work with them again.",
      },
      {
        img: ClientSvg8,
        content: "Phil Stolaronek",
        details:
          "One of the best teams I have hired. What sets them apart is their attention to client needs; they take the time to understand our requirements thoroughly.",
      },
      {
        img: ClientSvg9,
        content: "Farzin Habib",
        details:
          "Zweidev's team demonstrates technical prowess and a commitment to best practices in every project, making them the ideal partner. They are trustworthy ones.",
      },
    ],
  },

  {
    id: 3,
    elements: [
      {
        img: ClientSvg10,
        content: "Eric Halverson",
        details:
          "They built out the framework for my MVP of a Real Estate website on time, on budget, and with the features requested. Weekly demos kept me informed of progress and all interactions were very friendly. Would work with again.",
      },
    ],
  },
];

const mobItems = [
  {
    id: 1,
    elements: [
      {
        img: ClientSvg2,
        content: "Theresa",
        details:
          "Working with this fantastic team was an excellent experience. They excel at development and finding new solutions. Their expertise and talent are impressive.",
      },
    ],
  },

  {
    id: 2,
    elements: [
      {
        img: ClientSvg3,
        content: "Rishi Sareen",
        details:
          "The team's exceptional communication resulted in the successful delivery of the project. It would be my pleasure to work with them again in the future.",
      },
    ],
  },
  {
    id: 3,
    elements: [
      {
        img: ClientSvg1,
        content: "Nick Angelov",
        details:
          "Zweidevs met our expectations. They delivered the product that provided us with a high-quality base from which to move forward. I highly recommend them!",
      },
    ],
  },

  {
    id: 4,
    elements: [
      {
        img: ClientSvg4,
        content: "Anton Benz",
        details:
          "These developers were excellent to work with. I would definitely recommend them to anyone looking for great work, and I look forward to hiring them again.",
      },
    ],
  },
  {
    id: 5,
    elements: [
      {
        img: ClientSvg5,
        content: "Tony Malik",
        details:
          "The Zweidevs team has extensive knowledge of the work, and after working with them for 5-6 months, they have become our go-to development company.",
      },
    ],
  },
  {
    id: 6,
    elements: [
      {
        img: ClientSvg6,
        content: "Tommy Vacek",
        details:
          " Zweidevs' team did a fantastic job scoping our project. Their adaptability was impressive, and they always succeeded in exceeding our expectations.",
      },
    ],
  },

  {
    id: 7,
    elements: [
      {
        img: ClientSvg7,
        content: "Eric Halverson",
        details:
          " They completed the MVP framework for my website on schedule. The weekly demos kept me up-to-date on progress. I would definitely work with them again.",
      },
    ],
  },

  {
    id: 8,
    elements: [
      {
        img: ClientSvg8,
        content: "Phil Stolaronek",
        details:
          "One of the best teams I have hired. What sets them apart is their attention to client needs; they take the time to understand our requirements thoroughly.",
      },
    ],
  },

  {
    id: 9,
    elements: [
      {
        img: ClientSvg9,
        content: "Farzin Habib",
        details:
          "Zweidev's team demonstrates technical prowess and a commitment to best practices in every project, making them the ideal partner. They are trustworthy ones.",
      },
    ],
  },

  {
    id: 10,
    elements: [
      {
        img: ClientSvg10,
        content: "Eric Halverson",
        details:
          "They built out the framework for my MVP of a Real Estate website on time, on budget, and with the features requested. Weekly demos kept me informed of progress and all interactions were very friendly. Would work with again.",
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
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              // width: "30px",
              backgroundColor: "#FF9700",
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
          interval={4000}
          navButtonsAlwaysVisible={true}
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
