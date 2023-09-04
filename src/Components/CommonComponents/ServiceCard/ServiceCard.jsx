import React from 'react'
import Image from 'next/image'
import styles from "./ServiceCard.module.css"

function ServiceCard({ icon, title, description, onClick, className }) {
    return (
        <div className={`${className} ${styles.serviceCardContainer}`} >
            <Image width={50} src={icon} alt={"service-title"} />
            <div className={styles.serviceCardContentContainer}>
                <h1 className={styles.serviceCardTitle} >{title}</h1>
                <p className={styles.serviceCardContent}>
                    {description}
                </p>
                <button onClick={onClick} className={styles.serviceCardButton} >SEE MORE</button>
            </div>
        </div>
    )
}

export default ServiceCard