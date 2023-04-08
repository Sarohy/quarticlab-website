import React from 'react'
import Zbutton from '../ZButton'
import styles from "./InstantBookingBanner.module.css"

function InstantBookingBanner({
    label = "Are you ready for meaningful results? We can help.",
    buttonText = "INSTANT BOOKING",
    buttonOnClick
}) {
    return (
        <div className={styles.iBBContainer} >
            <div className={styles.iBBContentContainer}>
                <p style={{color:"white"}} >{label}</p>
                <Zbutton text={buttonText} onClick={buttonOnClick} />
            </div>
        </div>
    )
}

export default InstantBookingBanner