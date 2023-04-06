import React from 'react'
import Carousel from 'react-material-ui-carousel'
import styles from "./HomeSection.module.css"
import { Zbutton } from '@component/Components/CommonComponents'
import Image from 'next/image'

const items = [
  {
    projectName: "Random Name #1",
    projectCategory: "FITNESS APPLICATION",
    projectImage: "https://i.imgur.com/tWZG0Nk.png",
    projectId: "id1"
  },
  {
    projectName: "Random Name #2",
    projectCategory: "Hello World!",
    projectImage: "https://i.imgur.com/tWZG0Nk.png",
    projectId: "id2"
  }
]

function HomeSection3({ id }) {
  return (
    <div
      id={id}
      className={styles.HS3Container}
    >
      <h5 className={styles.HS3Tag1}>OUR WORK</h5>
      <div className={styles.HS3TopContainer} >
        <h1 className={styles.HS3Tag2} >We’ve Done Lot’s Of Awesome Projects</h1>
        <Zbutton text="VIEW PROJECT" color="#ff9700" backgroundColor='white' />
      </div>
      <Carousel
        className={styles.HS3Carousel}
        navButtonsAlwaysVisible
        indicators={false}
        next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
      >
        {
          items.map(item => (
            <div className={styles.HS3CarouselContent} >
              <img height={400} src={item.projectImage} />
              <div className={styles.HS3ProjectDetailContainer} >
                <p className={styles.HS3ProjectType} >{item.projectCategory}</p>
                <h3 className={styles.HS3ProjectName} >{item.projectName}</h3>
              </div>

            </div>
          )
          )
        }
      </Carousel>
    </div>
  )
}

export default HomeSection3