import ChipCard from "@component/Components/CommonComponents/ChipCard/ChipCard";
import styles from "./productDevSection.module.css";

const ProductDevSection = ({ cardData, showNumers = true }) => {
  return (
    <div className={styles.root} style={{ color: "black" }}>
      <section
        className={`${styles.section} ${styles.stages}`}
        id="block_8d562957f1b7e6c78f6164c7edff347c"
      >
        <div className={`${styles.wrapper} stages__wrapper`}>
          <h2
            // className={`${styles.fontHeading} ${styles.heading}
            // ${styles.heading2}
            // ${styles.stages__heading}`}
            className={`${styles.heading}
            `}
          >
            {cardData.title || "Tech Stack"}
          </h2>
          {cardData.desc && (
            <p className={`${styles.caption} ${styles.stages__caption}`}>
              {cardData.desc}
            </p>
          )}
          <ul className={`${styles.stages__list}`}>
            {cardData.cardsData &&
              cardData.cardsData.map((card, key) => (
                <div key={key}>
                  <li className={`${styles.stages__item}`}>
                    <h3
                      // className={styles.cardTitle}
                      className={`${showNumers ? styles.stages__title : ""} ${
                        card.chipCard
                          ? styles.cardTitle
                          : `${styles.heading} ${styles.heading3}`
                      }`}
                      style={{
                        justifyContent: showNumers ? "center" : "start",
                      }}
                    >
                      {card.cardTitle}
                    </h3>
                    {card.chipData ? (
                      <ChipCard chipData={card.chipData} />
                    ) : (
                      <p className={`${styles.text} ${styles.stages__text}`}>
                        {card.cardDesc}
                      </p>
                    )}
                  </li>
                  {/* <hr color="#E6E8EC" style={{height: "0.1px"}} ></hr> */}
                  <div
                    className={styles.hrLine}
                    style={{
                      display:
                        key === cardData.cardsData.length - 1
                          ? "none"
                          : "block",
                    }}
                  ></div>
                </div>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductDevSection;
