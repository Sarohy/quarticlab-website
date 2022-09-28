import styles from "../styles/ColorLetters.module.css";

const ColorLetters = ({ strArray, main }) => {
  return (
    <span>
      {strArray.map((char, i) => (
        <span
          key={char + i}
          className={main ? `${styles.main}` : `${styles.textColor}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default ColorLetters;
