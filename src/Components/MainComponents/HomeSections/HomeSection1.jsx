import React from 'react'
import styles from "./HomeSection.module.css"
import { HS1Image } from '@component/assets'
import Image from 'next/image'
import { Zbutton } from '@component/Components/CommonComponents'

function HomeSection1({ handleButtonClick }) {
  return (
    <div className={styles.HS1Container}>
      <div className={styles.HS1ContainerLeftSide}>
        <h4 className={styles.HS1Tag1}>PRODUCT <span style={{ color: "#ff9700", }} >DEVELOPMENT</span> SOLUTIONS</h4>
        <h1 className={styles.HS1Tag2}>EMPOWERED BY <span style={{ color: "#ff9700" }}>INNOVATION</span></h1>
        <Zbutton onClick={handleButtonClick} text="GET STARTED" color="#ff9700" backgroundColor='white' width='180px' orangeShaddow={true} />
      </div>
      <div className={styles.HS1ContainerRightSide}>
        <Image className={styles.HS1Image} src={HS1Image} alt="Zweidevs" />
      </div>
    </div>
  )
}

export default HomeSection1