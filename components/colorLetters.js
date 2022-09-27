import styles from "../styles/ColorLetters.module.css";

const ColorLetters = ({ strArray }) => {
  return (
    <span className={styles.colorLetterContainer}>
      {strArray.map((char, i) => (
        <span key={char + i} className={`${styles.textColor}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default ColorLetters;
