import Image from "next/image";
import { RatingIcon } from "@component/assets";
import styles from "./ReviewCard.module.css";

function ReviewCard({ clientName, rating, clientImage, reviewDescription }) {
  const ratingIcons = Array.from({ length: rating }, (_, index) => (
    <Image alt="rating" key={index} src={RatingIcon} width={15} />
  ));

  return (
    <div className={styles.reviewCardContainer}>
      <Image alt={"client-name"} src={clientImage} width={110} />
      <h1 className={styles.ReviewTitle}>{clientName}</h1>
      <div className={styles.ReviewRatingContainer}>{ratingIcons}</div>
      <p className={styles.reviewDescription}>{reviewDescription}</p>
    </div>
  );
}

export default ReviewCard;
