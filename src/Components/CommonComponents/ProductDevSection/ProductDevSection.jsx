import ChipCard from "@component/Components/CommonComponents/ChipCard/ChipCard";
import styles from "./productDevSection.module.css";

const ProductDevSection = ({
  cardData,
  showNumers = true,
  showChip = false,
  chipData,
}) => {
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
            {cardData.title}
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
                      className={`${styles.heading} ${styles.heading3} ${
                        showNumers ? styles.stages__title : ""
                      }`}
                      style={{
                        justifyContent: showNumers ? "center" : "start",
                      }}
                    >
                      {card.cardTitle}
                    </h3>
                    {showChip ? (
                      <ChipCard chipData={chipData} />
                    ) : (
                      <p className={`${styles.text} ${styles.stages__text}`}>
                        {card.cardDesc}
                      </p>
                    )}
                  </li>
                  {/* <hr color="#E6E8EC" style={{height: "0.1px"}} ></hr> */}
                  <div
                    style={{
                      backgroundColor: "#E6E8EC",
                      height: "1px",
                      width: "100%",
                      marginBottom: 50,
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
