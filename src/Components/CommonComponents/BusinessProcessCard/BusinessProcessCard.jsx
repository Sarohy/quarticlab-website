import styles from "./businessProcessCard.module.css";
import Timeline from "../Timeline";

const BusinessProcessCard = ({ heading, desc }) => {
  return (
    <div className={styles.root}>
      <label className={styles.heading}>{heading}</label>
      <label className={styles.desc}>{desc}</label>
      <Timeline />
    </div>
  );
};

export default BusinessProcessCard;
