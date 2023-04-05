import React from 'react'
import DiamondIcon from '@mui/icons-material/Diamond';
import styles from "./HomeSection.module.css"
import Image from 'next/image';
import { DiamondBullet } from '@component/assets';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Zbutton } from '@component/Components/CommonComponents';

function HomeSection2({ id, handleButtonClick }) {
  return (
    <div id={id} className={styles.HS2Container}>
      <div className={styles.HS2ContainerLeftSide} >
        <p className={styles.HS2LeftTag1} >ABOUT US</p>
        <h1 className={styles.HS2LeftTag2} >
          Work with Top Notch <span style={{ color: "#FF9700" }} >Designers and Developers</span> to get Amazing Products.
        </h1>
      </div>
      <div className={styles.HS2ContainerRightSide}>
        <div className={styles.HS2StrategyContainer} >
          <div className={styles.HS2RightTag1Container} >
            <Image src={DiamondBullet} className={styles.HS2DiamondBullet} alt="bullet point" />
            <span>STRATEGY</span>
          </div>
          <p className={styles.HS2RightStrategyContent} >
            Zweidevs is a service-oriented company providing creative and innovative solutions for your business domain.we create a strategy.
          </p>
          <div className={styles.HS2RightPoints} >
            <div className={styles.HS2RightContentItem} >
              <KeyboardDoubleArrowRightIcon style={{ color: "#ff9700" }} />
              <span>Market & Competitive Research</span>
            </div>
            <div className={styles.HS2RightContentItem} >
              <KeyboardDoubleArrowRightIcon style={{ color: "#ff9700" }} />
              <span>HubSpot CRM & Sales Funnel Strategy</span>
            </div>
            <div className={styles.HS2RightContentItem} >
              <KeyboardDoubleArrowRightIcon style={{ color: "#ff9700" }} />
              <span>Brand Positioning & Messaging</span>
            </div>
            <div className={styles.HS2RightContentItem} >
              <KeyboardDoubleArrowRightIcon style={{ color: "#ff9700" }} />
              <span>Marketing Growth Strategy</span>
            </div>
            <div className={styles.HS2RightContentItem} >
              <KeyboardDoubleArrowRightIcon style={{ color: "#ff9700" }} />
              <span>UX Consulting</span>
            </div>
            <div className={styles.HS2RightContentItem} >
              <KeyboardDoubleArrowRightIcon style={{ color: "#ff9700" }} />
              <span>Process Automation</span>
            </div>
          </div>
          <div className={styles.HS2ButtonContainer} >
            <Zbutton
              text="MORE"
              color="#ff9700"
              backgroundColor='white'
              width='130px'
              orangeShaddow={true}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSection2