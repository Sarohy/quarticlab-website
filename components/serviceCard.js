import Head from "next/head";
import styles from "../styles/ServiceCard.module.css";

const ServiceCard = (props) => {
  return (
    <div className={styles.card_items}>
      <div className={styles.card_items_icon}>
        <img src={props.icon} alt={props.icon_desc} />
      </div>
      <div className={styles.card_items_content}>
        <h3>{props.title}</h3>
        <p className={styles.serviceDisc}>{props.desc}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
