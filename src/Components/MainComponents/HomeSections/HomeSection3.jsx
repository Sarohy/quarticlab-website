import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Carousel from 'react-material-ui-carousel'
import { Zbutton } from '@component/Components/CommonComponents'
import { getAllProjects } from '@component/firebase/firebaseRequests'
import routesPaths from '@component/Constants/routePaths'
import styles from "./HomeSection.module.css"

function HomeSection3({ id }) {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const router = useRouter();

  const getProjectUrl = () => `${routesPaths.projects}/${projects[projectId]?.projectName?.replaceAll(" ", "_").replaceAll(".", "")}`

  const viewProject = (position) => (
    <Zbutton
      className={position === "top" ? styles.hidden : styles.hidden_}
      text="VIEW PROJECT"
      color="#ff9700"
      backgroundColor='white'
      onClick={() => router.push(getProjectUrl())}
    />
  )

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
      <h1 className={styles.HS3Tag1}>OUR WORK</h1>
      <div className={styles.HS3TopContainer} >
        <div className={styles.HS3Tag2Container} >
          <h1 className={styles.HS3Tag2}>We’ve Done Lot’s Of</h1>
          <h1 className={styles.HS3Tag2}>Awesome Projects</h1>
        </div>
        {viewProject("top")}
      </div>
      <div style={{}} >
        <Carousel
          className={styles.HS3Carousel}
          navButtonsAlwaysVisible
          next={(next) => setProjectId(next)}
          prev={(prev) => setProjectId(prev)}
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
      {viewProject("bottom")}
    </div>
  )
}

export default HomeSection3