import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Zbutton, ServiceCard } from '@component/Components/CommonComponents'
import { getAllServices } from '@component/firebase/firebaseRequests'
import routePaths from '@component/Constants/routePaths'
import styles from "./HomeSection.module.css"

function HomeSection4() {
  const [services, setServices] = useState([])
  const router = useRouter()

  useEffect(() => {
    getAllServices()
      .then(response => setServices(response))
      .catch(error => console.log("Error ==> ", error));
  }, [])

  return (
    <div className={styles.HS4Container}>
      <h1 className={styles.HS4Tag1} >OUR SERVICES</h1>
      <div className={styles.HS4Tag2Container} >
        <h1 className={styles.HS4Tag2}>Everything Your Brands</h1>
        <h1 className={styles.HS4Tag2}>Needs On One Roof</h1>
      </div>
      <div className={styles.HS4ServicesContainer} >
        {
          services.map(
            (service, index) => index < 2 && <ServiceCard
              key={service + index}
              className={styles.HS4CardClass}
              icon={service.serviceIcon}
              title={service.serviceTitle}
              description={service.serviceDescription}
            />

          )
        }
      </div>
      <Zbutton
        text="VIEW ALL"
        color="#ff9700"
        backgroundColor="white"
        orangeShaddow={true}
        width='150px'
        className={styles.HS4Button}
        onClick={() => router.push(routePaths.services)}
      />
    </div>
  )
}

export default HomeSection4