import ChipCard from "@component/Components/CommonComponents/ChipCard/ChipCard";
import styles from "./productDevSection.module.css";

const ProductDevSection = ({
  cardData,
  showNumers = true,
  showChip = false,
  chipData
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
            How we develop Web applications
          </h2>
          <p className={`${styles.caption} ${styles.stages__caption}`}>
            Syndicode offers full-cycle mobile application development services.
            We approach a project with the motivation to create a mutually
            beneficial relationship. Thus, our development team provides careful
            research, advises on smart choices, and provides support through all
            application lifecycle stages.{" "}
          </p>
          <ul className={`${styles.stages__list}`}>
            {cardData.map((card, key) => (
              <div key={key}>
                <li className={`${styles.stages__item}`}>
                  <h3
                    style={{
                      justifyContent: showNumers ? "center" : "start",
                    }}
                    className={`${styles.heading} ${styles.heading3} ${
                      showNumers ? styles.stages__title : ""
                    }`}
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
                    display: key === cardData.length - 1 ? "none" : "block",
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
