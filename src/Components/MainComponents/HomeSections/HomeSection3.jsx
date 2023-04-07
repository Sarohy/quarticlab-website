import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import styles from "./HomeSection.module.css"
import { Zbutton } from '@component/Components/CommonComponents'
import { getAllProjects } from '@component/firebase/firebaseRequests'
import { useRouter } from 'next/router'

function HomeSection3({ id }) {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const router = useRouter();

  const getProjectUrl = () => `/work/${projects[projectId]?.projectName?.replaceAll(" ", "_").replaceAll(".", "")}`

  useEffect(() => {
    getAllProjects()
      .then(response => setProjects(response))
      .catch(error => console.log("Error ==> ", error));
  }, [])
  return (
    <div
      id={id}
      className={styles.HS3Container}
    >
      <h5 className={styles.HS3Tag1}>OUR WORK</h5>
      <div className={styles.HS3TopContainer} >
        <h1 className={styles.HS3Tag2} >We’ve Done Lot’s Of Awesome Projects</h1>
        <Zbutton className={styles.hidden} text="VIEW PROJECT" color="#ff9700" backgroundColor='white' onClick={() => router.push(getProjectUrl())} />
      </div>
      <div style={{}} >
        <Carousel
          className={styles.HS3Carousel}
          navButtonsAlwaysVisible
          next={(next, active) => {
            setProjectId(next)
            // console.log(`we left ${active}, and are now at ${next}`)
          }}
          prev={(prev, active) => {
            setProjectId(prev)
            // console.log(`we left ${active}, and are now at ${prev}`)
          }}
        >
          {
            projects.map((project, index) => (
              <div className={styles.HS3CarouselContent} key={project + index} >
                <img src={project.projectImage} className={styles.HS3imgStyle} alt={project.projectName} />
                <div className={styles.HS3ProjectDetailContainer} >
                  <p className={styles.HS3ProjectType} >{project.projectCategory}</p>
                  <h3 className={styles.HS3ProjectName} >{project.projectName}</h3>
                </div>

              </div>
            )
            )
          }
        </Carousel>
      </div>
      <Zbutton className={styles.hidden_} text="VIEW PROJECT" color="#ff9700" backgroundColor='white' onClick={() => router.push(getProjectUrl())} />
    </div>
  )
}

export default HomeSection3