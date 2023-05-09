import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { getAllReviews } from '@component/firebase/firebaseRequests'
import { ReviewCard } from '@component/Components/CommonComponents'
import { groupArrayElements } from '@component/utils/helpers'
import styles from "./HomeSection.module.css"

function HomeSection5() {
  const [mobileView, setMobileView] = useState(null);
  const [reviews, setReviews] = useState({
    flattened: [],
    grouped: []
  });

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 760
        ? setMobileView(true)
        : setMobileView(false)
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    getAllReviews()
      .then(response => setReviews({
        flattened: response,
        grouped: groupArrayElements(response, 3)
      }))
      .catch(error => console.log("Error ==> ", error));
  }, [])

  const displayWeb = () => (
    <Carousel
      navButtonsAlwaysVisible
    >
      {
        reviews.grouped?.map(
          (reviewSet, i) =>
            <div key={reviewSet + i} className={styles.HS5ReviewCardsContainer} >
              {reviewSet?.map(
                (review, index) =>
                  <ReviewCard
                    key={review + index}
                    clientImage={review.clientImage}
                    clientName={review.clientName}
                    rating={review.clientRating}
                    reviewDescription={review.clientDescription}
                  />
              )}
            </div>)
      }
    </Carousel>
  )

  const displayMobile = () => (
    <Carousel
      navButtonsAlwaysVisible
    >
      {
        reviews.flattened?.map(review =>
          <ReviewCard
            clientImage={review.clientImage}
            clientName={review.clientName}
            rating={review.clientRating}
            reviewDescription={review.clientDescription}
          />
        )
      }
    </Carousel>
  )
  return (
    <div className={styles.HS5Container}>
      <h1 className={styles.HS5Tag1} >Client Feedback</h1>
      <div className={styles.HS5Tag2Container} >
        <h1 className={styles.HS5Tag2}>What Client Says About</h1>
        <h1 className={styles.HS5Tag2}>us</h1>
      </div>
      {mobileView ? displayMobile() : displayWeb()}
    </div>
  )
}

export default HomeSection5