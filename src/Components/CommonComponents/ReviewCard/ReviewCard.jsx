import React from 'react'
import Image from 'next/image'
import { RatingIcon } from '@component/assets'
import styles from "./ReviewCard.module.css"

function ReviewCard({ clientName, rating, clientImage, reviewDescription }) {
    const ratingIcons = Array.from({ length: rating }, (_, index) => (
        <Image key={index} width={15} src={RatingIcon} alt="rating" />
    ));

    return (
        <div className={styles.reviewCardContainer} >
            <Image width={110} src={clientImage} alt={clientName} />
            <h1 className={styles.ReviewTitle} >{clientName}</h1>
            <div className={styles.ReviewRatingContainer} >
                {ratingIcons}
            </div>
            <p className={styles.reviewDescription} >
                {reviewDescription}
            </p>
        </div>
    )
}

export default ReviewCard