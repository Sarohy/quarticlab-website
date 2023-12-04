import { useState } from "react";
import styles from "./targetAudience.module.css";
import Image from "next/image";
const TargetAudience = ({ cardData }) => {
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleLiClick = index => {
    setSelectedIdx(index);
  };

  return (
    <div className={styles.root}>
      <section
        className={`${styles.section} ${styles.targetAudience}`}
        id="block_d2abff86038f5b61fa76041155df6b04"
      >
        <div className={` ${styles.wrapper} ${styles.targetAudience__wrapper}`}>
          <h2
            className={`${styles.fontHeading} ${styles.heading} ${styles.heading2} ${styles.targetAudience__heading}`}
          >
            {cardData.title}
          </h2>
          <p className={`${styles.caption} ${styles.targetAudience__caption}`}>
            {cardData.desc}
          </p>
          <ul
            className={` ${styles.targetAudience__list}`}
            // style={{ marginBottom: 136, border: "1px solid black" }}
          >
            {cardData.targetAudienceCardData.map((data, key) => (
              <li
                className={`${styles.targetAudience__item} ${
                  selectedIdx === key ? styles.targetAudience__itemActive : ""
                }`}
                key={key}
                onClick={() => handleLiClick(key)}
                // onMouseEnter={() => setHoveredIndex(key)}
                // onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  cursor: "pointer",
                  background: selectedIdx === key ? "#fff" : "",
                }}
              >
                <h3
                  className={`${styles.cardTitle} ${styles.heading} ${styles.heading3} ${styles.targetAudience__title}`}
                  style={{ background: "#fff" }}
                >
                  {data.cardTitle}
                  <div className={styles.targetAudience__arrow}>
                    {selectedIdx === key && (
                      <Image
                        alt="Arrow right"
                        decoding="async"
                        fill
                        src="/assets/serviceIcons/icon-arrow-right.svg"
                      />
                    )}
                  </div>
                </h3>
                <div style={{ marginTop: selectedIdx === key ? 50 : "" }}></div>
                <p
                  className={`${styles.targetAudience__text} ${styles.text}`}
                  style={{ display: selectedIdx === key ? "block" : "none" }}
                >
                  {data.cardDesc}
                </p>
              </li>
            ))}

            {/* <li className="target-audience__item ">
              <h3 className="heading heading--3 target-audience__title">
                Startups{" "}
                
              </h3>

            </li> */}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TargetAudience;
