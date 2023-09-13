import Image from "next/image";
import styles from "./ServiceCard.module.css";

function ServiceCard({ icon, title, description, onClick, className }) {
  return (
    <div className={`${className} ${styles.serviceCardContainer}`}>
      <Image alt={"service-title"} src={icon} width={50} />
      <div className={styles.serviceCardContentContainer}>
        <h1 className={styles.serviceCardTitle}>{title}</h1>
        <p className={styles.serviceCardContent}>{description}</p>
        <button className={styles.serviceCardButton} onClick={onClick}>
          SEE MORE
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
